// Reloads the server on load to fix seed-dependent recipes
ServerEvents.loaded(event => {
    event.server.runCommandSilent('reload')
})

// Prevents summoning the Wither by breaking wither skulls if placed on soul sand
BlockEvents.placed('minecraft:wither_skeleton_skull', event => {
    if (checkAllDirs(event.block)) {
        event.cancel()
        event.block.popItem('minecraft:wither_skeleton_skull')
    }
})
BlockEvents.placed('minecraft:wither_skeleton_wall_skull', event => {
    if (checkAllDirs(event.block)) {
        event.cancel()
        event.block.popItem('minecraft:wither_skeleton_skull')
    }
})

function checkAllDirs(block) {
    let tag = 'minecraft:wither_summon_base_blocks'
    if (block.down.hasTag(tag)) {
        return true
    }
    if (block.up.hasTag(tag)) {
        return true
    }
    if (block.north.hasTag(tag)) {
        return true
    }
    if (block.south.hasTag(tag)) {
        return true
    }
    if (block.east.hasTag(tag)) {
        return true
    }
    if (block.west.hasTag(tag)) {
        return true
    }
    return false
}

// Deletes withers if still somehow spawned the normal way
EntityEvents.spawned('minecraft:wither', event => {
    if (event.entity.getFullNBT().get('Invul') > 0) {
        event.cancel()
    }
})

// Gives items on spawn
PlayerEvents.loggedIn(event => {
    if (!event.player.stages.has('starting_items')) {
        event.player.stages.add('starting_items')
        event.player.give('enigmaticlegacy:cursed_ring')
    }
})

// Andesite alloy obtaining
ItemEvents.rightClicked('kubejs:powdered_determination', event => {
    if (event.target.block == null) {
        return
    }
    if (event.target.block.id != 'minecraft:andesite') {
        return
    }
    event.target.block.popItem('16x create:andesite_alloy')
    event.player.stages.add('create')
    event.server.runCommandSilent(`execute in ${event.level.dimension} positioned ${event.target.block.x} ${event.target.block.y} ${event.target.block.z} run particle dust 1.0 0.0 0.95 1.0 ~ ~0.5 ~ 0.3 0.3 0.3 0.0 5 normal @a`)
    event.target.block.setBlockState(Blocks.AIR.defaultBlockState(), 0)
    event.item.count -= 1
    event.server.runCommand(`tellraw ${event.player.username} {"text":"As you sprinkle the dust upon the andesite, it melts and solidifies into something else. A new material, perhaps? Or a gift from the future...","color":"#BA00FC"}`)
})

// Portable black hole functionality
ItemEvents.rightClicked('kubejs:portable_black_hole', event => {
    let suck_strength = 0.5
    let blast_strength = 1.0
    event.level.getNearbyEntities(LivingEntity, TargetingConditions.forCombat(), event.player, AABB.ofSize(event.player.position(), 30, 10, 30)).forEach(entity => {
        entity.addMotion((event.player.x - entity.x) * suck_strength, (event.player.y - (entity.y + 1)) * suck_strength, (event.player.z - entity.z) * suck_strength)
        event.server.scheduleInTicks(10, later => {
            entity.addMotion((event.player.x - entity.x) * -blast_strength, (event.player.y - (entity.y + 1)) * -blast_strength, (event.player.z - entity.z) * -blast_strength)
        })
    })
    event.player.potionEffects.add('minecraft:slowness', 10, 5, false, false)
    event.server.scheduleInTicks(10, later => {
        event.level.createExplosion(event.player.x, event.player.y + 1.5, event.player.z).strength(5.0).damagesTerrain(false).explode()
        event.player.potionEffects.add('minecraft:speed', 100, 0, false, false)
    })
    for (let i = 0; i < 1000; i++) {
        let offset = [Utils.random.nextDouble(-15, 15), Utils.random.nextDouble(-5, 5), Utils.random.nextDouble(-15, 15)]
        event.server.runCommandSilent(`execute at ${event.player.username} run particle minecraft:reverse_portal ~${offset[0]} ~${offset[1] + 1.5} ~${offset[2]} ${-offset[0]} ${-offset[1]} ${-offset[2]} 1.5 0 normal @a`)
    }
    event.player.addItemCooldown('kubejs:portable_black_hole', 20)
})

// Custom eye obtaining
ItemEvents.rightClicked('minecraft:ender_eye', event => {
    if (event.target.block == null) {
        return
    }
    if (event.target.block.id != 'minecraft:netherite_block') {
        return
    }
    if (event.level.dimension != 'minecraft:the_nether') {
        return
    }
    if (!event.player.potionEffects.isActive('trolldom:fire_boon')) {
        return
    }
    event.target.block.popItem('endrem:nether_eye')
    event.target.block.setBlockState(Blocks.AIR.defaultBlockState(), 0)
    event.item.count -= 1
    event.server.runCommandSilent(`effect clear ${event.player.username} trolldom:fire_boon`)
    event.server.runCommandSilent(`execute in ${event.level.dimension} positioned ${event.target.block.x} ${event.target.block.y} ${event.target.block.z} run particle dust 1.0 0.0 0.0 1.0 ~ ~0.5 ~ 0.3 0.3 0.3 0.0 5 normal @a`)
})

ItemEvents.entityInteracted(event => {
    if (event.item.id != 'minecraft:ender_eye') {
        return
    }
    if (event.target.type != 'minecraft:zombie_villager') {
        return
    }
    event.item.count -= 1
    event.target.setItemSlot('mainhand', Item.of('endrem:undead_eye'))
    event.target.mergeFullNBT('{HandDropChances:[1.0f,1.0f]}')
})

ItemEvents.entityInteracted(event => {
    if (event.item.id != 'minecraft:ender_eye') {
        return
    }
    if (event.target.type != 'minecraft:guardian') {
        return
    }
    if (!event.player.potionEffects.isActive('trolldom:water_boon')) {
        return
    }
    event.player.addItemCooldown('endrem:guardian_eye', 2)
    event.target.kill()
    event.item.count -= 1
    event.server.runCommandSilent(`effect clear ${event.player.username} trolldom:water_boon`)
    event.server.runCommandSilent(`give ${event.player.username} endrem:guardian_eye`)
})

// Getting Paragliders to use Feathers
const PlayerMovement = Java.loadClass('tictim.paraglider.capabilities.PlayerMovement')
const FeathersHelper = Java.loadClass('com.elenai.feathers.api.FeathersHelper')

PlayerEvents.tick(event => {
    let h = PlayerMovement.of(event.player)
    if (h != null) {
        if (h.isParagliding()) {
            if (event.player.data.getOrDefault('paragliderFeatherTimer', 0) >= 20) {
                event.player.data.add('paragliderFeatherTimer', 0)
                if (!FeathersHelper.spendFeathers(event.player, 1)) {
                    event.player.potionEffects.add('feathers:cold', 200, 0, true, true)
                    h.setStamina(0)
                    h.setDepleted(true)
                    return
                } 
            }
            let timer = event.player.data.get('paragliderFeatherTimer')
            timer = timer == null ? 0 : timer
            timer++
            event.player.data.add('paragliderFeatherTimer', timer)
        }
    }
})

// Custom music
const TargetingConditions = Java.loadClass('net.minecraft.world.entity.ai.targeting.TargetingConditions')

EntityEvents.spawned('minecraft:wither', event => {
    if (event.entity.tags.contains('Music1')) {
        let dummy = event.level.createEntity('minecraft:bat')
        dummy.setFullNBT('{CustomName:\'{"text":"music_dummy"}\',CustomNameVisible:0b,Invulnerable:1b,NoGravity:1b,Silent:1b,NoAI:1b,PersistenceRequired:1b,ActiveEffects:[{Id:14,ShowParticles:0b,Duration:999999,Amplifier:0,Ambient:0b}]}')
        dummy.setPos(event.entity.position())
        event.level.addFreshEntity(dummy)
        event.level.getNearbyPlayers(TargetingConditions.forNonCombat(), event.entity, AABB.ofSize(event.entity.position(), 512, 512, 512)).forEach(player => {
            player.sendData('trigger_music_1', {entity: dummy.getStringUuid()})
        })
    }
})

PlayerEvents.advancement('enigmaticlegacy:main/cursed_ring', event => {
    event.addGameStage('cursed_ring')
})

PlayerEvents.advancement('custom:unlock_create', event => {
    event.player.stages.add('create')
})

FTBQuestsEvents.completed('7B2817643B1C1080', event => {
    event.player.unlockAdvancement('custom:unlock_create')
})

// Regex go brrrr
// Stops players from mining any create machines before it's unlocked
LootJS.modifiers(event => {
    event.addBlockLootModifier(/^create:(?:(?!seat|glass|window|layered|small|cut|pillar|ore|zinc|shingle|tile|asurine|crimsite|limestone|ochrum|scorc*h*ia|veridium).)*$/)
        .not(n => {
            n.hasAnyStage('create')
        })
        .removeLoot(ItemFilter.ALWAYS_TRUE)
})

// Sequence break prevention
PlayerEvents.inventoryChanged('create:andesite_alloy', event => {
    if (!event.hasGameStage('create')) {
        event.server.runCommand(`tellraw ${event.player.username} {"text":"Sequence break prevention initiated!","color":"dark_red"}`)
        event.player.drop(event.item, false)
        event.server.runCommandSilent(`clear ${event.player.username} create:andesite_alloy`)
        event.server.runCommand(`tellraw ${event.player.username} {"text":"If somehow you encountered this from the intended progression path, or you\'re a dirty cheater, click this message to disable sequence break detection (requires cheats to be enabled). If you found the item some other way, please submit a bug report <TODO: link>.","clickEvent":{"action":"run_command","value":"/advancement grant @s only custom:unlock_create"}}`)
    }
})

// Custom ring drops
EntityEvents.death('minecraft:elder_guardian', event => {
    if (!event.source.player) {
        return
    }
    if (!event.source.player.stages.has('cursed_ring')) {
        return
    }
    if (Utils.random.nextDouble(0.0, 1.0) < 0.5) {
        return
    }
    event.entity.block.popItem('enigmaticlegacy:guardian_heart')
})

const Builder = Java.loadClass('net.minecraft.world.level.storage.loot.LootContext$Builder')
const LootContextParamSets = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParamSets')

EntityEvents.death(event => {
    if (!event.source.player) {
        return
    }
    if (event.entity.animal || event.entity.ambientCreature || event.entity.waterCreature || event.entity.player || event.entity.isPeacefulCreature()) {
        return
    }
    let player_cursed = event.source.player.stages.has('cursed_ring')
    let chance_multiplier = player_cursed ? 0.85 : 0.65
    let count_multiplier = player_cursed ? 2.5 : 2.0
    let health = event.entity.maxHealth
    if (Utils.random.nextDouble(0.0, 1.0) < (chance_multiplier * health * Math.log10(health)) / 100.0) {
        event.entity.block.popItem(Item.of('createdeco:copper_coin', Math.round((count_multiplier * Math.sqrt(health) - 6.5) * Utils.random.nextDouble(0.67, 1.33))))
    }
    if (Utils.random.nextDouble(0.0, 1.0) < (chance_multiplier * health * Math.log10(health)) / 200.0) {
        event.entity.block.popItem(Item.of('createdeco:iron_coin', Math.round((count_multiplier * 0.5 * Math.sqrt(health) - 6.5) * Utils.random.nextDouble(0.67, 1.33))))
    }
    if (Utils.random.nextDouble(0.0, 1.0) < (chance_multiplier * health * Math.log10(health)) / 400.0) {
        event.entity.block.popItem(Item.of('createdeco:gold_coin', Math.round((count_multiplier * 0.25 * Math.sqrt(health) - 6.5) * Utils.random.nextDouble(0.67, 1.33))))
    }
    if (Utils.random.nextDouble(0.0, 1.0) < (chance_multiplier * health * Math.log10(health)) / 1000.0) {
        event.entity.block.popItem(Item.of('createdeco:netherite_coin', Math.round((count_multiplier * 0.1 * Math.sqrt(health) - 6.5) * Utils.random.nextDouble(0.67, 1.33))))
    }
    if (!player_cursed) {
        return
    }
    let builder = new Builder(event.server.getLevel(event.level.dimension))
    event.server.lootTables.get('custom:cursed_loot').getRandomItems(builder.create(LootContextParamSets.EMPTY)).forEach(item => {
        event.entity.block.popItem(item)
    })
    switch (event.entity.type) {
        case 'minecraft:witch':
            event.server.lootTables.get('custom:cursed_loot_witch').getRandomItems(builder.create(LootContextParamSets.EMPTY)).forEach(item => {
                event.entity.block.popItem(item)
            })
        default:
            return
    }
})

// Runic Tablet functionality
ItemEvents.rightClicked('simplyswords:runic_tablet', event => {
    const SIMPLY_SWORD_TYPES = [
        'longsword',
        'twinblade',
        'rapier',
        'katana',
        'sai',
        'spear',
        'glaive',
        'warglaive',
        'cutlass',
        'claymore',
        'greathammer',
        'greataxe',
        'chakram',
        'scythe',
        'halberd',
    ]
    event.player.block.popItem(`simplyswords:runic_${Utils.randomOf(Utils.random, SIMPLY_SWORD_TYPES)}`)
    event.item.count -= 1
})

// Raid treasure bags (I could not find a better way to do this....)
const Raider = Java.loadClass('net.minecraft.world.entity.raid.Raider')

EntityEvents.hurt(event => {
    if (event.entity instanceof Raider) {
        if (event.entity.hasActiveRaid()) {
            event.entity.addTag('is_raiding')
        }
    }
})

EntityEvents.death(event => {
    if (event.entity.tags.contains('is_raiding')) {
        if (Utils.random.nextDouble(0, 1) < 0.05) {
            event.entity.block.popItem(Item.of('treasurebags:treasure_bag', '{silentlib.LootContainer:{BagType:"custom:raid"}}'))
        }
    }
})

ItemEvents.rightClicked('kubejs:unstable_vortex_generator', event => {
    if (!event.server) {
        return
    }
    let nearby = event.level.getEntitiesOfClass(LivingEntity, AABB.ofSize(event.player.position(), 25, 7, 25))
    let positions = []
    nearby.forEach(entity => {
        positions.push(entity.position())
    })
    nearby.forEach(entity => {
        if (entity.player) {
            let pos = Utils.randomOf(Utils.random, positions)
            event.server.runCommandSilent(`tp ${entity.username} ${pos.x()} ${pos.y()} ${pos.z()}`)
        } else {
            entity.setPos(Utils.randomOf(Utils.random, positions))
        }
        event.server.runCommandSilent(`execute at ${entity.getStringUuid()} run particle minecraft:reverse_portal ~ ~1 ~ 0.25 0.25 0.25 2 50 normal @a`)
    })
    event.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:entity.enderman.teleport player @a ~ ~ ~ 1 1`)
    event.player.addItemCooldown('kubejs:unstable_vortex_generator', 20)
})

ItemEvents.entityInteracted(event => {
    if (event.item.id != 'minecraft:glass_bottle') {
        return
    }
    if (event.target.type != 'minecraft:cow') {
        return
    }
    if (!event.server) {
        return
    }
    event.server.scheduleInTicks(1, later => {
        later.server.runCommandSilent(`clear ${event.player.username} minecraft:potion{Potion:"davespotioneering:milk"} 1`)
    })
    event.player.give('neapolitan:milk_bottle')
})

const LIMITATIONS = [
    'BreakfallReady',
    'CatLeap',
    'ClimbUp',
    'ClingToCliff',
    'Crawl',
    'Dive',
    'Dodge',
    'FastRun',
    'Flipping',
    'HangDown',
    'HorizontalWallRun',
    'JumpFromBar',
    'QuickTurn',
    'Roll',
    'Slide',
    'Tap',
    'Vault',
    'WallJump',
    'WallSlide',
]

PlayerEvents.loggedIn(event => {
    if (!event.server) {
        return
    }
    if (!event.hasGameStage('first_log_in')) {
        event.addGameStage('first_log_in')
        event.server.runCommandSilent(`parcool limitation enable ${event.player.username}`)
        for (let limit of LIMITATIONS) {
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility ${limit} false`)
        }
    }
})

ItemEvents.rightClicked(event => {
    if (!event.server) {
        return
    }
    switch (event.item.id) {
        case 'kubejs:parkour_guide_quick_turn':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility QuickTurn true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to quick turn! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_wall_jump':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility WallJump true`)
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility WallSlide true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to wall jump and wall slide! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_wallrun':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility HorizontalWallRun true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to wall run! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_flip':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility Flipping true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to do a front flip! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_dodge':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility Dodge true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to dodge! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_crawl':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility Crawl true`)
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility Slide true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to crawl and slide! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_cling':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility ClingToCliff true`)
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility ClimbUp true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to cling to cliffs! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_catleap':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility CatLeap true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to cat leap! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_vault':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility Vault true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to vault! Read the quest book for more details.","color":"aqua"}`)
            break
        case 'kubejs:parkour_guide_breakfall':
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility BreakfallReady true`)
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility Roll true`)
            event.server.runCommandSilent(`parcool limitation set ${event.player.username} possibility Tap true`)
            event.server.runCommand(`tellraw ${event.player.username} {"text":"You have learned how to break your fall! Read the quest book for more details.","color":"aqua"}`)
            break    
        default:
            return
    }
})

ItemEvents.rightClicked('kubejs:unsettling_eye', event => {
    if (!event.server) {
        return
    }
    let arrow = Utils.random.nextDouble(0.0, 1.0) < 0.2 ? 'lightning' : 'blaze'
    for (let i = 0; i < 100; i++) {
        let offsetX = Utils.random.nextDouble(-1.0, 1.0)
        let offsetZ = Utils.random.nextDouble(-1.0, 1.0)
        let offsetY = Utils.random.nextDouble(0.5, 2.0)
        // normalize the vector
        let length = Math.sqrt((offsetX ** 2) + (offsetZ ** 2))
        offsetX /= length
        offsetZ /= length
        
        let speed = Utils.random.nextDouble(0.1, 2.0)
        event.server.runCommandSilent(`execute at ${event.player.username} run summon archers_paradox:${arrow}_arrow ~${offsetX} ~${offsetY} ~${offsetZ} {pickup:0b,life:1199,Motion:[${offsetX * speed}d, ${offsetY * speed}d, ${offsetZ * speed}d],crit:1b,damage:4.0}`)
    }
    event.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:entity.generic.explode master @a ~ ~ ~ 1 1`)
    if (Utils.random.nextDouble(0.0, 1.0) < 0.1) {
        for (let i = 0; i < 30; i++) {
            event.server.runCommandSilent(`tellraw ${event.player.username} [{"text":"<???> "},{"text":"I SEE YOU","color":"dark_red"}]`)
            event.server.runCommandSilent(`title ${event.player.username} title {"text":"I SEE YOU","color":"dark_red"}`)
            event.server.runCommandSilent(`title ${event.player.username} subtitle {"text":"I SEE YOU","color":"dark_red"}`)
            event.server.runCommandSilent(`title ${event.player.username} actionbar {"text":"I SEE YOU","color":"dark_red"}`)
            event.server.runCommandSilent(`execute at ${event.player.username} run playsound alexsmobs:april_fools_scream master ${event.player.username} ~ ~ ~ 1 0.75`)
        }
    }
    event.item.count -= 1
})

const AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const RARITY_MAP = {
    'common': 0.15,
    'uncommon': 0.25,
    'rare': 0.35,
    'epic': 0.45,
    'mythic': 0.55,
    'ancient': 0.65
}


LootJS.modifiers(event => {
    let speed_uuid = 'fa233e1c-4180-4865-b01b-bcce9785aca3'
    let damage_uuid = 'cb3f55d3-645c-4f38-a497-9c13a33db5cf'
    let speed_factor = 0.5
    event.addLootTableModifier(/.*/)
        .modifyLoot(ItemFilter.and(ItemFilter.or(Ingredient.of('#custom:heavy_weapons'), ItemFilter.AXE), ItemFilter.custom(item => {return item.nbt.contains('affix_data')})), loot => {
            let speed_attr
            let damage_attr
            loot.getAttributeModifiers('mainhand').forEach((attr, mod) => {
                if (mod.getId().toString() == speed_uuid) {
                    speed_attr = [attr, mod]
                }
                if (mod.getId().toString() == damage_uuid) {
                    damage_attr = [attr, mod]
                }
            })
            let rarity = loot.nbt.getCompound('affix_data').getString('rarity')
            loot.addAttributeModifier('generic.attack_speed', new AttributeModifier('Heavy Weapon AS Fix', ((1.0 / (1.0 - RARITY_MAP[rarity])) - 1.0) * speed_factor, 'multiply_total'), 'mainhand')
            loot.addAttributeModifier(speed_attr[0], speed_attr[1], 'mainhand')
            loot.addAttributeModifier(damage_attr[0], damage_attr[1], 'mainhand')
            return loot
        })
})

// Prevents falling out of the void in the tent dimension
EntityEvents.hurt(event => {
    if (!event.server) {
        return
    }
    if (!event.entity.player) {
        return
    }
    if (event.source != DamageSource.OUT_OF_WORLD) {
        return
    }
    // I can't check for the tent dimension specifically, since they're procedurally generated
    // Any new dimensions with intentional voids should be added here
    if (event.level.dimension == 'minecraft:the_end') {
        return
    }
    if (event.player.y < -20) {
        event.player.heal(20)
    }
    if (event.player.y > -66) {
        return
    }
    event.server.runCommandSilent(`effect give ${event.player.username} minecraft:slow_falling 1 0 true`)
    event.server.runCommandSilent(`execute at ${event.player.username} run tp ${event.player.username} 1 64.5 0`)
    event.server.runCommand(`tellraw ${event.player.username} {"text":"You're not dead!","color":"aqua"}`)
    event.cancel()
})

EntityEvents.death('minecraft:evoker', event => {
    if (!event.server) {
        return
    }
    if (!event.source.player) {
        return
    }
    let item = event.source.player.mainHandItem
    if (!item.hasTag('forge:tools/knives')) {
        return
    }
    if (!item.isEnchanted()) {
        return
    }
    let cursed = false
    item.allEnchantments.forEach((ench, level) => {
        if (ench.isCurse()) {
            cursed = true
        }
    })
    if (cursed) {
        event.entity.block.popItem('kubejs:evoker_soul')
        event.server.runCommandSilent(`execute at ${event.entity.getStringUuid()} run playsound minecraft:entity.generic.extinguish_fire master @a ~ ~ ~ 1 2`)
        event.server.runCommandSilent(`execute at ${event.entity.getStringUuid()} run playsound minecraft:entity.wither.hurt master @a ~ ~ ~ 1 0.5`)
        event.server.runCommandSilent(`execute at ${event.entity.getStringUuid()} run particle minecraft:soul ~ ~ ~ 0.5 1 0.5 0.03 10 normal @a`)
    }
})

// ---WARNING: MEGA SPOILERS BELOW!!---
// 
// IF YOU INTEND ON PLAYING THIS PACK, AVERT YOUR EYES!

/* <spoiler padding>
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* 
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* Seriously, you're robbing yourself of discovering something really cool if you read this!!
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*/

const WORD_LIST = {
    lightning: ['aer', 'purifactum', 'after', 'media', 'thundre', 'smite', 'obfus', 'nihil', 'inexor'],
    fireball: ['IGNIS', 'ANNIHIL', 'BEYOND', 'IMPES', 'ABOLEO', 'INFERNUM', 'EXCIEO', 'CHAOS', 'BODOM'],
    fireball_keys: ['BURN', 'ANNIHIL', 'HELL', 'IMPLODE', 'EXPUNGE', 'BEYOND'],
    slow: ['before', 'eternal', 'vetus', 'immort', 'terra', 'petra', 'antea', 'totum', 'gigas', 'tardus', 'dius'],
    colors: [['dark_purple', 'p'], ['blue', 'b'], ['green', 'g'], ['dark_red', 'r'], ['yellow', 'y'], ['white', 'w']],
    arrows: ['within', 'sapient', 'cognitio', 'mind', 'intra', 'unda', 'flux', 'animus', 'divus'],
}

let secret_words = {}
let first_tick = true

ServerEvents.tick(event => {
    if (first_tick) {
        first_tick = false
        let seed = event.server.getOverworld().getSeed()
        let random = Utils.newRandom(seed)

        let hill_key = generateHillKey(seed)
        let hill_key_str = hillKeyToString(hill_key)

        secret_words.lightning = `${Utils.randomOf(random, WORD_LIST.lightning)} ${Utils.randomOf(random, WORD_LIST.lightning)} ${Utils.randomOf(random, WORD_LIST.lightning)}`
        let lightning_book_deobf = [{"text":"3rd Waning Crescent, 4112\\\\n\\\\nMy experiments with drawing from After have achieved limited success. I\\\'ve managed to create a simple time vortex, briefly speeding up time in the immediate vicinity; although it was short-lived. Continued work appears fruitful."},{"text":"3rd New Moon,\\\\n4112\\\\n\\\\nIt seems that my work has attracted the attention of - well, I\\\'m not sure what exactly. All I can say for sure is that they originate from After, given the massive flying vessels they arrived in. Luckily, I am well-hidden for the"},{"text":"time being, but continued prodding into their plane could compromise my position. I will have to take a more careful approach."},{"text":"4th Full Moon,\\\\n4112\\\\n\\\\nThey finally left. I will resume study shortly."},{"text":"4th Waning Gibbous,\\\\n4112\\\\n\\\\nAstonishing. Using tablets of charged amethyst, I managed to open a stable vortex between two points; effectively teleporting objects from one to the other. With enough concentrated Media, it\\\'s possible to make a sort of tether "},{"text":"between the Overworld and After, dilating space and time around it. This can be exploited with some clever math to teleport anywhere I desire, though it isn\\\'t cheap or safe. "},{"text":"4th Last Quarter,\\\\n4112\\\\n\\\\nMy meddling has drawn their attention again. They didn\\\'t show up in person this time, though; it seems like they\\\'re trying to strike me remotely with lightning. Luckily, I\\\'m still well-hidden for now."},{"text":"4th New Moon,\\\\n4112\\\\n\\\\nThe earlier encounter gave me an idea. I might be able to exploit the beings After\\\'s lightning attacks to my benefit. I must study."},{"text":"5th Full Moon,\\\\n4112\\\\n\\\\nI have little time. I\\\'m on the run now. My idea worked, but I accidentally broadcasted my exact location. I must go."},{"text":"5th Waning Gibbous,\\\\n4112\\\\n\\\\nMy life will soon be over. It is only a matter of time before they find me, and they have all the time in the Universe. My only hope now is to send this journal somewhere else in the hope that someone else might continue"},{"text":`my research. To whomever might find this, I grant these three words:\\\\n\\\\n${secret_words.lightning}\\\\n\\\\nWhen spoken aloud, they will trick After\\\'s lightning defense system to strike at enemies around the user, but not the user themselves. Use it with`},{"text":"caution, and do better than I did. Goodbye."},{"text":`${hill_key_str[0][0]} ${hill_key_str[0][1]} ${hill_key_str[0][2]}`}]
        event.server.runCommandSilent(`data modify storage custom:secret_books lightning set value {author:"Unknown",title:"Cryptic Writing #1",pages:${obfuscateBookCaesarShift(lightning_book_deobf, seed)}}`)

        secret_words.fireball = `${Utils.randomOf(random, WORD_LIST.fireball)} ${Utils.randomOf(random, WORD_LIST.fireball)} ${Utils.randomOf(random, WORD_LIST.fireball)}`
        let fireball_key = Utils.randomOf(random, WORD_LIST.fireball_keys)
        let fireball_book_deobf = [{"text":"Entry #1\\\\n\\\\nAshurdan insisted that I keep log of my adventures in case something were to happen. He\\\'s being overly cautious, but I\\\'ll humor him nonetheless. "},{"text":"Entry #2\\\\n\\\\nWe\\\'ve opened a portal to \\\\\"Beyond\\\\\", as he calls it. It was far more complicated than getting to the Nether, and honestly I didn\\\'t understand most of it. We\\\'re going in tomorrow. I\\\'m not sure what to expect."},{"text":"Entry #3\\\\n\\\\nThis place, it... doesn\\\'t feel right. It\\\'s like a twisted mirror of our own, chaotic and uncontrollable. It\\\'s as though it wants to expand to every crevice, every nook of the Universe. I can feel it trying to worm its way into my head... it\\\'s horrifying. It\\\'s "},{"text":`telling me tBURNo BURN what the fBURN my handBURN BURN BURN\\\\n\\\\nSPEAK IT.\\\\n${secret_words.fireball}`},{"text":"Entry #4\\\\n\\\\nThey will all burn. Ashurdan first."},{"text":"To whomever finds this book, I implore you to put it down immediately. I am Ashurdan, and Brenna tried to kill me yesterday. It seems the forces Beyond found their way inside her mind. I would erase the words she spoke if I could, but they are burned into the very paper itself."},{"text":"Please, for your own sake, do not heed Its words; only pain lay ahead."},{"text":`${hill_key_str[1][0]} ${hill_key_str[1][1]} ${hill_key_str[1][2]}`}]
        event.server.runCommandSilent(`data modify storage custom:secret_books fireball set value {author:"Brenna",display:{Lore:[\'{"text":"${fireball_key}","color":"dark_red","bold":"true"}\']},title:"Cryptic Writing #2",pages:${obfuscateBookViginere(fireball_book_deobf, fireball_key)}}`)

        let slow_key = ''
        let slow_book_name = '['
        for (let char of 'Cryptic') {
            let color = Utils.randomOf(random, WORD_LIST.colors)
            slow_book_name += `{"text":"${char}","color":"${color[0]}"},`
            slow_key += color[1]
        }
        slow_book_name += '{"text":" "},'
        for (let char of 'Writing') {
            let color = Utils.randomOf(random, WORD_LIST.colors)
            slow_book_name += `{"text":"${char}","color":"${color[0]}"},`
            slow_key += color[1]
        }
        slow_book_name += '{"text":" "},'
        for (let char of '#3') {
            let color = Utils.randomOf(random, WORD_LIST.colors)
            slow_book_name += `{"text":"${char}","color":"${color[0]}"},`
            slow_key += color[1]
        }
        slow_book_name += '{"text":""}]'
        secret_words.slow = `${Utils.randomOf(random, WORD_LIST.slow)} ${Utils.randomOf(random, WORD_LIST.slow)} ${Utils.randomOf(random, WORD_LIST.slow)}`
        let slow_book_deobf = [{"text":"Excavation Log:\\\\n11th New Moon,\\\\n2656\\\\n\\\\nZamir Forest,\\\\nKingdom of Aurel\\\\n\\\\nReason for excavation: unexplained surface time anomalies"},{"text":"Week 1\\\\n\\\\nVery little progress. Excavation remains difficult due to thick permafrost. Some crew members have reported \\\\\"feeling strange\\\\\" during excavation. Upon further questioning, they report it to be due to cold temperatures."},{"text":"Week 2\\\\n\\\\nFinally broke through the permafrost. Stone appears typical of the area (asurine). Supplies are at predicted levels. Crew is having difficulty adapting to the cold conditions."},{"text":"Week 3\\\\n\\\\nLittle of note this week except a large section of atypical stone. Our geologists can\\\'t agree on the species. Further investigation is required to determine its origin. Crew has reported difficulty moving in the area, but the cause remains "},{"text":"unknown. Supplies are slightly lower than expected."},{"text":"Week 4\\\\n\\\\nOur geologists have agreed that the atypical stone sample is not, in fact, stone. It is some kind of heretofor unseen material, similar to ceramic, but much stronger. Descriptions are consistent with the unverified reports from the "},{"text":"alleged exploration of Before in 2651. Further excavation around the \\\\\"stone\\\\\" seem to suggest that it is connected to some sort of much larger structure. The crew have taken to calling it \\\\\"the finger\\\\\" because of its shape. We\\\'ve sent our courier to request a Mahou."},{"text":"Week 5\\\\n\\\\nThe Mahou arrived and her report is difficult to believe. She said that the \\\\\"finger\\\\\" is actually the thumb of a gargantuan buried humanoid structure. She estimates it to be about 500 meters tall. She reports that there is an entrance"},{"text":"to the interior of the \\\\\"golem\\\\\" (as she called it) on its palm. It would take an estimated 4 weeks to excavate that far with the current crew size. We\\\'ve requested more supplies due to the longer than expected excavation."},{"text":"Week 9\\\\n\\\\nIt would seem that the Mahou was not lying after all. We have unearthed a large circular door on the golem\\\'s palm. I\\\'m going with a small crew to investigate tomorrow."},{"text":"Week 10\\\\n\\\\nMy situation appears dire. There is too much to write down, but I will nonetheless. As soon as we entered, everything outside of the golem appeared to vanish. Only blackness remained where once was rock. Getting near the door to nothing"},{"text":"was extremely painful, like my body was tearing itself apart. The interior of this, it\\\'s... breathtaking. It looks eternal, older than time itself. Intricate symbols are carved into every wall, none of which anyone understands. It is very difficult to navigate here, it clearly is meant to be"},{"text":"standing upright. Our supplies are dangerously low. Our only hope now is to venture toward the center of the golem, perhaps there is a way out there. "},{"text":"Week ???\\\\n\\\\nWe\\\'ve lost track of all time. Somehow, no one is getting hungry, or thirsty, or anything. It\\\'s as though time were at a standstill. We cannot find a way into its core, all of the doors are sealed shut. We\\\'re going to see if its head is any different."},{"text":"Week ???\\\\n\\\\nIt\\\'s been... it feels like months. This thing must be even bigger on the inside somehow. We\\\'ve arrived at the head. It\\\'s some sort of grand control room, thousands of buttons and controls we can\\\'t hope to understand. In the center is some kind of handheld"},{"text":"device. We can only assume it will open any locked doors."},{"text":`???\\\\n\\\\nOur assumption was correct. We\\\'ve entered the main chamber of the golem. Its massive ruby heart spoke directly to our minds. It spoke:\\\\n\\\\n${secret_words.slow}\\\\n\\\\nOver, and over, and over again. I\\\'m quickly`},{"text":"losing sanity. "},{"text":"Last Entry\\\\n\\\\nThere\\\'s a device. Emma accidentally stepped in and she vanished. There are controls; directions. They must direct the device. I\\\'m sending this book somewhere else in case where I end up isn\\\'t safe. If you\\\'re reading this, I hope you learn the nature"},{"text":"of this being. Goodbye."},{"text":`${hill_key_str[2][0]} ${hill_key_str[2][1]} ${hill_key_str[2][2]}`}]
        event.server.runCommandSilent(`data modify storage custom:secret_books slow set value {display:{Name:\'${slow_book_name}\'},author:"Unknown",title:"Cryptic Writing #3",pages:${obfuscateBookPlayfair(slow_book_deobf, slow_key)}}`)
    
        secret_words.arrows = `${Utils.randomOf(random, WORD_LIST.arrows)} ${Utils.randomOf(random, WORD_LIST.arrows)} ${Utils.randomOf(random, WORD_LIST.arrows)}`
        let arrows_book_deobf = [{"text":"OFFICIAL COURT TRANSCRIPT\\\\n\\\\n11/12/5011\\\\n\\\\nCASE #12309\\\\n\\\\n\\\\n\\\\n\\\\n\\\\nVERIFIED BY THE DISTRICT OF AUREL CITY COURT "},{"text":"Judge: Court is now in session. The accused will now give their closing statement.\\\\n\\\\nAcc: Thank you. As I have demonstrated, my client has neither the mental state nor the motive to have been responsible for the victim\\\'s disappearance. She had a very good relationship with her "},{"text":"sister, and has been devastated by her vanishing. To suggest that she murdered her own sister just because of the conflicting witness accounts is frankly absurd. Both parties were of sound mind, an-\\\\n\\\\nPros: Objection, your honor. \\\\\"Sound mind\\\\\"? "},{"text":`Can I bring you attention to, uh... exhibit 14. Does this look like sound mind to you? \\\\n\\\\nNOTE: EXHIBIT 14\\\\n*A photo is inserted here. It depicts a destroyed bedroom with the words \\\\\"${secret_words.arrows}\\\\\" painted everywhere on the walls.*`},{"text":"Pros: Not only that, but the accused\\\'s account of the victim \\\\\"disappearing in a brilliant flash of multicolored light\\\\\" doesn\\\'t seem like sound mind to me.\\\\n\\\\nAcc: With all due respect, the mental state of the victim-\\\\n\\\\nJudge: I\\\'d like to hear "},{"text":"what the prosecutor has to say. Please, continue.\\\\n\\\\nPros: Thank you, your honor. As can be plainly seen by looking at the evidence, the victim was having some kind of mental break. I mean, she was writing about \\\\\"unlocking her inner mind\\\\\" and \\\\\"going Within\\\\\". To suggest  "},{"text":"that the accused was unaware of this fact is ludicrous. For crying out loud, she had painted all over the walls, \\\\n\\\\nCOURT NOTICE:\\\\nTHE TRANSCRIPT BEYOND THIS POINT HAS BEEN REDACTED."}]
        event.server.runCommandSilent(`data modify storage custom:secret_books arrows set value {author:"0119030909",title:"Cryptic Writing #4",pages:${obfuscateBookHill(arrows_book_deobf, hill_key)}}`)
    }
})

// -All Ciphers-

function bookToString(book) {
    let output = ''
    for (let i = 0; i < book.length; i++) {
        output += book[i].text
        if (!(i == book.length - 1)) {
            output += '¶' // Page break character
        }
    }
    return output
}

function stringToBook(str_raw) {
    let str = []
    for (let char of str_raw) {
        str.push(char)
    }
    let output = '['
    let finished = false
    let index = 0
    while (!finished) {
        output += '\'{"text":"'
        for (;; index++) {
            if (index == str.length) {
                finished = true
                break
            }
            if (str[index] == '¶') { // Page break character
                index++
                break
            }
            output += str[index]
        }
        output += `","clickEvent":{"action":"copy_to_clipboard","value":"${str_raw.replace(/¶/g, '')}"},"hoverEvent":{"action":"show_text","contents":{"text":"Click to Copy Book"}}}\',`
    }
    return output + ']'
}

// -Caesar Shift-

function obfuscateBookCaesarShift(book, seed) {
    return stringToBook(caesarShiftString(bookToString(book), (Math.abs(seed) % 25) + 1))
}

function caesarShiftString(str, amount) {
    // Yes, I know the charCodeAt() function exists. It doesn't work with KubeJS because it gets
    // converted to a Java char type for some reason.
    const LOWERCASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const UPPERCASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let output = ''
    let escape = false
    for (let char of str) {
        if (/[a-z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                output += LOWERCASE[(LOWERCASE.indexOf(char) + amount) % 26]
            }
        } else if (/[A-Z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                output += UPPERCASE[(UPPERCASE.indexOf(char) + amount) % 26]
            }
        } else {
            if (escape) {
                escape = false
            }
            if (char == '\\') {
                escape = true
            }
            output += char
        }
    }
    return output
}

// -Viginere-

function obfuscateBookViginere(book, key) {
    return stringToBook(vigenereString(bookToString(book), key, 0)[0])
}

function vigenereString(str, key_str, starting_key_index) {
    const LOWERCASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const UPPERCASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let key = []
    for (let char of key_str) {
        key.push(char)
    }
    let output = ''
    let escape = false
    let key_index = starting_key_index
    let key_length = key.length
    for (let char of str) {
        if (/[a-z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                let new_char = LOWERCASE[(LOWERCASE.indexOf(char) + (LOWERCASE.indexOf(key[key_index % key_length]) < 0 ? UPPERCASE.indexOf(key[key_index % key_length]) : LOWERCASE.indexOf(key[key_index % key_length]))) % 26]
                key_index++
                output += new_char
            }
        } else if (/[A-Z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                let new_char = UPPERCASE[(UPPERCASE.indexOf(char) + (LOWERCASE.indexOf(key[key_index % key_length]) < 0 ? UPPERCASE.indexOf(key[key_index % key_length]) : LOWERCASE.indexOf(key[key_index % key_length]))) % 26]
                key_index++
                output += new_char
            }
        } else {
            if (escape) {
                escape = false
            }
            if (char == '\\') {
                escape = true
            }
            output += char
        }
    }
    return [output, key_index % key_length]
}

// -Playfair-

function obfuscateBookPlayfair(book, key) {
    return stringToBook(playfairString(bookToString(book), key))
}

function playfairString(str_raw, key_with_repeats) {
    const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let key = []
    for (let char of key_with_repeats.toLowerCase().replace(/j/g, 'i')) {
        if (key.indexOf(char) < 0) {
            key.push(char)
        }
    }
    let grid = [
        [],
        [],
        [],
        [],
        [],
    ]
    key.reverse()
    let alphabet = LETTERS.filter((value, _index, _array) => key.indexOf(value) == -1).reverse()
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            let char = key.pop()
            char ? grid[row][column] = char : grid[row][column] = alphabet.pop()
        }
    }

    let grid_map = {}
    outer: for (let char of LETTERS) {
        for (let row = 0; row < 5; row++) {
            for (let column = 0; column < 5; column++) {
                if (grid[row][column] == char) {
                    grid_map[char] = [row, column]
                    continue outer
                }
            }
        }
    }

    // Decrypting this function is harder than decrypting the book...
    let encryptDigram = function(digram) {
        let is_uppercase_0 = false
        let is_uppercase_1 = false
        if (digram[0].toUpperCase() == digram[0]) {
            is_uppercase_0 = true
            digram[0] = digram[0].toLowerCase()
        }
        if (digram[1] && (digram[1].toUpperCase() == digram[1])) {
            is_uppercase_1 = true
            digram[1] = digram[1].toLowerCase()
        }

        let restoreCase = function(new_digram) {
            return [is_uppercase_0 ? new_digram[0].toUpperCase() : new_digram[0], is_uppercase_1 ? new_digram[1].toUpperCase() : new_digram[1]]
        }

        if (digram[0] == digram[1] || digram[1] == undefined) {
            return encryptDigram([digram[0], 'x'])
        }
        let grid_loc_0 = grid_map[digram[0]]
        let grid_loc_1 = grid_map[digram[1]]
        if (grid_loc_0[0] == grid_loc_1[0]) {
            return restoreCase([grid[grid_loc_0[0]][(grid_loc_0[1] + 1) % 5], grid[grid_loc_1[0]][(grid_loc_1[1] + 1) % 5]])
        }
        if (grid_loc_0[1] == grid_loc_1[1]) {
            return restoreCase([grid[(grid_loc_0[0] + 1) % 5][grid_loc_0[1]], grid[(grid_loc_1[0] + 1) % 5][grid_loc_1[1]]])
        }
        return restoreCase([grid[grid_loc_0[0]][grid_loc_1[1]], grid[grid_loc_1[0]][grid_loc_0[1]]])
    }

    let str = []
    for (let char of str_raw.replace(/j/g, 'i')) {
        str.push(char)
    }

    let output = ''
    let output_buffer = ''
    let wait_for_digram = ''
    let escape = false
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '\\') {
            escape = true
            output_buffer += str[i]
        } else if ((escape && str[i] == 'n') || !(/[a-zA-Z]/.test(str[i]))) {
            escape = false
            output_buffer += str[i]
        } else if (wait_for_digram == '') {
            wait_for_digram = str[i]
            escape = false
        } else {
            escape = false
            let new_chars = encryptDigram([wait_for_digram, str[i]])
            output += new_chars[0]
            output_buffer += new_chars[1]
            wait_for_digram = ''
        }

        if (wait_for_digram == '') {
            output += output_buffer
            output_buffer = ''
        }
        if (i == str.length - 1 && wait_for_digram != '') {
            let new_chars = encryptDigram([wait_for_digram, undefined])
            output += new_chars[0]
            output_buffer += new_chars[1]
            output += output_buffer
        }
    }
    return output
}

// -Hill-

function obfuscateBookHill(book, key) {
    return stringToBook(hillString(bookToString(book), key))
}

const HILL_MODULO = 95
const ASCII = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'


function hillString(str_raw, key) {
    let ascii_array = []
    for (let char of ASCII) {
        ascii_array.push(char)
    }
    let str = []
    for (let char of str_raw) {
        str.push(char)
    }

    let encryptTrigram = function(trigram) {
        let new_trigram = []
        for (let i = 0; i < 3; i++) {
            new_trigram[i] = ((key[i][0] * trigram[0]) + (key[i][1] * trigram[1]) + (key[i][2] * trigram[2])) % HILL_MODULO
        }
        return new_trigram
    }

    let output = ''
    let finished = false
    let insert = {
        0: '',
        1: '',
        2: '',
    }
    let current_trigram = []
    str.reverse()
    while (!finished) {
        let char = str.pop()
        if (char == undefined) {
            if (current_trigram.length == 0) {
                break
            }
            for (let i = 0; i < 3; i++) {
                current_trigram[i] = current_trigram[i] != undefined ? current_trigram[i] : 0
            }
            finished = true
        }
        if (!finished) {
            if (char == '\\') {
                if (str[str.length - 1] == 'n') {
                    str.pop()
                    insert[current_trigram.length] += '\\\\n'
                }
                continue
            }
            let char_code = ascii_array.indexOf(char)
            if (char_code == -1) {
                insert[current_trigram.length] += char
                continue
            } else {
                current_trigram.push(char_code)
            }
        }
        if (current_trigram.length == 3) {
            let new_trigram = encryptTrigram(current_trigram)
            for (let i = 0; i < 3; i++) {
                output += insert[i]
                insert[i] = ''
                let new_char = ascii_array[new_trigram[i]]
                if (new_char == '\'') {
                    output += ('\\' + new_char)
                } else if (new_char == '\\') {
                    output += '\\\\\\\\'
                } else if ((new_char == '\"') || new_char == '\\') {
                    output += ('\\\\' + new_char)
                } else {
                    output += new_char
                }
            }
            current_trigram = []
        }
    }
    return output
}

function generateHillKey(seed) {
    let matrix = [[],[],[]]
    let random = Utils.newRandom(seed)
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            matrix[row][column] = Math.abs(random.nextInt()) % HILL_MODULO
        }
    }
    let determinant = threeByThreeDeterminant(matrix)
    if ((determinant == 0) || (determinant % 5 == 0) || (determinant % 19 == 0)) {
        return generateHillKey(random.nextInt())
    }
    return matrix
}

function threeByThreeDeterminant(matrix) {
    return (matrix[0][0] * matrix[1][1] * matrix[2][2])/*aei*/ + (matrix[0][1] * matrix[1][2] * matrix[2][0])/*bfg*/ + (matrix[0][2] * matrix[1][0] * matrix[2][1])/*cdh*/ - (matrix[0][2] * matrix[1][1] * matrix[2][0])/*ceg*/ - (matrix[0][1] * matrix[1][0] * matrix[2][2])/*bdi*/ - (matrix[0][0] * matrix[1][2] * matrix[2][1])/*afh*/
}

function hillKeyToString(key) {
    const MAP = {
        '0': 'ZERO',
        '1': 'ONE',
        '2': 'TWO',
        '3': 'THREE',
        '4': 'FOUR',
        '5': 'FIVE',
        '6': 'SIX',
        '7': 'SEVEN',
        '8': 'EIGHT',
        '9': 'NINE',
    }

    let str_key = [[],[],[]]
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            let out = ''
            for (let char of `${key[row][column]}`) {
                out += MAP[char]
            }
            str_key[row][column] = out
        }
    }
    return str_key
}

// -Loot Tables-

ServerEvents.genericLootTables(event => {
    event.addGeneric('custom:secret_book', loot => {
        loot.addPool(pool => {
            function secretBookEntry(p, book) {
                p.addEntry({
                    type: 'item',
                    weight: 1,
                    quality: 0,
                    name: 'minecraft:written_book',
                    functions: [
                        {
                            function: 'copy_nbt',
                            source: {
                                type: 'storage',
                                source: 'custom:secret_books'
                            },
                            ops: [
                                {
                                    source: `${book}.author`,
                                    target: 'author',
                                    op: 'replace'
                                },
                                {
                                    source: `${book}.title`,
                                    target: 'title',
                                    op: 'replace'
                                },
                                {
                                    source: `${book}.pages`,
                                    target: 'pages',
                                    op: 'replace'
                                },
                                {
                                    source: `${book}.display`,
                                    target: 'display',
                                    op: 'replace'
                                }
                            ]
                        }
                    ]
                })
            }

            secretBookEntry(pool, 'lightning')
            secretBookEntry(pool, 'fireball')
            secretBookEntry(pool, 'slow')
            secretBookEntry(pool, 'arrows')
        })
    })
})

// -Word Effects-

const LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const Projectile = Java.loadClass('net.minecraft.world.entity.projectile.Projectile')

function revelation(event) {
    event.server.runCommandSilent(`give ${event.player.username} kubejs:eye_of_revelation`)
    event.server.runCommand(`tellraw ${event.player.username} {"text":"Your eyes have opened.","color":"#C7F845"}`)
    event.player.addTag('had_revelation')
}

PlayerEvents.chat(event => {
    switch (event.message) {
        //case 'spoil me':
        //    event.server.runCommand(`say ${secret_words.lightning}`)
        //    event.server.runCommand(`say ${secret_words.fireball}`)
        //    event.server.runCommand(`say ${secret_words.slow}`)
        //    event.server.runCommand(`say ${secret_words.arrows}`)
        //    event.cancel()
        //    return
        case secret_words.lightning:
            if (!event.player.getTags().contains('had_revelation')) {
                revelation(event)
            }
            event.level.getNearbyEntities(LivingEntity, TargetingConditions.forCombat(), event.player, AABB.ofSize(event.player.position(), 20, 5, 20)).forEach(entity => {
                event.server.scheduleInTicks(Utils.random.nextInt(1, 10), later => {
                    later.server.runCommandSilent(`summon minecraft:lightning_bolt ${entity.x} ${entity.y} ${entity.z}`)
                })
                event.server.scheduleInTicks(Utils.random.nextInt(10, 20), later => {
                    later.server.runCommandSilent(`summon minecraft:lightning_bolt ${entity.x} ${entity.y} ${entity.z}`)
                })
            })
            event.cancel()
            return
        case secret_words.fireball:
            if (!event.player.getTags().contains('had_revelation')) {
                revelation(event)
            }
            let nearby = event.level.getNearbyEntities(LivingEntity, TargetingConditions.forCombat(), event.player, AABB.ofSize(event.player.position(), 20, 5, 20))
            let target;
            if (nearby.isEmpty() || Math.random() < 0.2) {
                target = event.player
            } else {
                target = nearby[0]
            }
            if (Math.random() < 0.95) {
                for (let i = 0; i < 6; i++) {
                    event.server.scheduleInTicks(i * 2, later => {
                        let offsetX = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetX
                        }
                        let offsetY = Math.random() * 5.0 + 3.0
                        let offsetZ = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetZ
                        }
                        later.server.runCommandSilent(`execute at ${target.getStringUuid()} run summon minecraft:fireball ~${offsetX} ~${offsetY} ~${offsetZ} {power:[${-offsetX * 0.1}, ${-offsetY * 0.1}, ${-offsetZ * 0.1}]}`)
                    })
                }
                if (Math.random() < 0.33) {
                    if (Math.random() < 0.33) {
                        event.server.runCommand(`tellraw @a [{"text":"<${event.player.username}> "},{"text":"BURN","color":"dark_red"}]`)
                    } else {
                        event.server.runCommand(`tellraw @a "<${event.player.username}> BURN"`)
                    }
                }
            } else if (Math.random() < 0.75) {
                for (let i = 0; i < 10; i++) {
                    event.server.scheduleInTicks(i * 2, later => {
                        let offsetX = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetX
                        }
                        let offsetY = Math.random() * 5.0 + 3.0
                        let offsetZ = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetZ
                        }
                        later.server.runCommandSilent(`execute at ${target.getStringUuid()} run summon minecraft:wither_skull ~${offsetX} ~${offsetY} ~${offsetZ} {power:[${-offsetX * 0.1}, ${-offsetY * 0.1}, ${-offsetZ * 0.1}]}`)
                    })
                }
                event.server.runCommand(`tellraw @a [{"text":"<${event.player.username}> "},{"text":"ANNIHIL","color":"black"}]`)
            } else {
                for (let i = 0; i < 100; i++) {
                    event.server.scheduleInTicks(i * 2, later => {
                        let offsetX = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetX
                        }
                        let offsetY = Math.random() * 5.0 + 3.0
                        let offsetZ = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetZ
                        }
                        later.server.runCommandSilent(`execute at ${target.getStringUuid()} run summon minecraft:wither_skull ~${offsetX} ~${offsetY} ~${offsetZ} {power:[${-offsetX * 0.1}, ${-offsetY * 0.1}, ${-offsetZ * 0.1}]}`)
                    })
                }
                for (let i = 0; i < 10; i++) {
                    event.server.runCommand(`tellraw @a [{"text":"<${Math.random() > 0.15 ? event.player.username : 'BEYOND'}> "},{"text":"ANNIHIL","color":"black"}]`)
                    event.server.runCommand(`tellraw @a [{"text":"<${Math.random() > 0.15 ? event.player.username : 'BEYOND'}> "},{"text":"ANNIHIL","color":"dark_red"}]`)
                }
            }
            if (Math.random() < 0.01) {
                event.server.runCommandSilent(`tellraw ${event.player.username} [{"text":"<BEYOND> "},{"text":"SUFFER","color":"dark_red"}]`)
                for (let i = 5; i < 16; i += 5) {
                    event.server.scheduleInTicks(i, later => {
                        later.server.runCommandSilent(`execute at ${event.player.username} run summon alexsmobs:crimson_mosquito ~ ~4 ~ {CustomName:\'{"text":"Servant of Beyond","color":"dark_red"}\',CustomNameVisible:1b,Attributes:[{Name:"generic.max_health",Base:500.0},{Name:"generic.armor",Base:20.0},{Name:"generic.attack_damage",Base:10.0}],Health:500.0}`)
                    })
                }
            }
            event.cancel()
            return
        case secret_words.fireball.toLowerCase():
            event.server.runCommand(`tellraw ${event.player.username} "<BEYOND> LOUDER"`)
            event.cancel()
            return
        case secret_words.slow:
            if (!event.player.getTags().contains('had_revelation')) {
                revelation(event)
            }
            let duration = 300
            let radius = 20
            event.server.runCommandSilent(`execute at ${event.player.username} run summon insanelib:area_effect_cloud_3d ~ ~ ~ {CustomName:\'{"text":"Shard of Before"}\',ReapplicationDelay:0,Radius:${radius}.0f,Duration:${duration},Particle:"minecraft:ash",Effects:[{"forge:id":"minecraft:slowness",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b},{"forge:id":"minecraft:weakness",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b},{"forge:id":"minecraft:resistance",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b},{"forge:id":"minecraft:mining_fatigue",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b}]}`)
            let cast_pos = event.player.position()
            let affected_entities = {}
            for (let i = 0; i < duration; i++) {
                event.server.scheduleInTicks(i, later => {
                    event.player.level.getEntitiesOfClass(Projectile, AABB.ofSize(cast_pos, radius, radius, radius)).forEach(entity => {
                        if (affected_entities[entity.getStringUuid()] == undefined) {
                            affected_entities[entity.getStringUuid()] = [entity, entity.getDeltaMovement()]
                            entity.setDeltaMovement(Vec3.ZERO)
                            entity.setNoGravity(true)
                        } else {
                            entity.setDeltaMovement(Vec3.ZERO)
                        }
                    })
                })
                event.server.scheduleInTicks(duration + 1, later => {
                    for (let entity in affected_entities) {
                        affected_entities[entity][0].setNoGravity(false)
                        affected_entities[entity][0].setDeltaMovement(affected_entities[entity][1])
                    }
                })
            }
            event.cancel()
            return
        case secret_words.arrows:
            if (!event.player.getTags().contains('had_revelation')) {
                revelation(event)
            }
            if (event.player.data.get('arrows_spell_cooldown') == undefined) {
                let rad = 15.0
                let vert = 10.0
                event.player.potionEffects.add('minecraft:levitation', 100, 2, false, false)
                event.player.level.getEntitiesOfClass(LivingEntity, AABB.ofSize(event.player.position(), rad * 2, vert, rad * 2)).forEach(entity => {
                    if (entity.getStringUuid() != event.player.getStringUuid()) {
                        event.server.runCommandSilent(`effect give ${entity.getStringUuid()} minecraft:levitation 5 4 true`)
                        event.server.scheduleInTicks(100, later => {
                            entity.addMotion(0.0, -2.0, 0.0)
                        })
                    }
                })
                let init_pos = [event.player.x, event.player.y, event.player.z]
                for (let ticks = 0; ticks < 40; ticks++) {
                    event.server.scheduleInTicks(ticks, later => {
                        for (let i = 0; i < 150; i++) {
                            let offset = [Utils.random.nextDouble(-rad, rad), Utils.random.nextDouble(-1.5, 0.0), Utils.random.nextDouble(-rad, rad)]
                            event.server.runCommandSilent(`execute in ${event.player.level.dimension} run particle minecraft:reverse_portal ${init_pos[0] + offset[0]} ${init_pos[1] + offset[1]} ${init_pos[2] + offset[2]} 0 1 0 0.4 0 normal @a`)
                        }
                    })
                }
                event.server.runCommandSilent(`playsound minecraft:entity.wither.ambient master @a ${init_pos[0]} ${init_pos[1]} ${init_pos[2]} 50 0.5`)
                event.server.runCommandSilent(`playsound minecraft:block.amethyst_block.chime master @a ${init_pos[0]} ${init_pos[1]} ${init_pos[2]} 50 0.5`)
                event.server.scheduleInTicks(100, later => {
                    later.server.runCommandSilent(`playsound minecraft:entity.wither.shoot master @a ${init_pos[0]} ${init_pos[1]} ${init_pos[2]} 50 0.5`)
                })
                event.server.scheduleInTicks(40, later => {
                    later.server.runCommandSilent(`playsound minecraft:entity.wither.shoot master @a ${init_pos[0]} ${init_pos[1]} ${init_pos[2]} 50 0.65`)
                    let randomTarget = function() {
                        let nearby = []
                        event.player.level.getEntitiesOfClass(LivingEntity, AABB.ofSize(Vec3(event.player.x, event.player.y + 5.0, event.player.z), rad * 2, vert, rad * 2)).forEach(e => {
                            if (e.getStringUuid() != event.player.getStringUuid()) {
                                nearby.push(e)
                            }
                        })
                        let entity = Utils.randomOf(Utils.getRandom(), nearby)
                        return entity
                    }
                    for (let i = 0; i < 65; i++) {   
                        event.server.scheduleInTicks(i, last => {
                            let entity = randomTarget()
                            if (entity) {
                                let offset = [Utils.random.nextDouble(-3.0, 3.0), Utils.random.nextDouble(6.0, 12.0), Utils.random.nextDouble(-3.0, 3.0)]
                                let spawn_pos = [event.player.x + offset[0], event.player.y + offset[1], event.player.z + offset[2]]
                                let arrow = Utils.randomOf(Utils.random, ['archers_paradox:lightning_arrow', 'minecraft:arrow', 'archers_paradox:blaze_arrow', 'archers_paradox:quartz_arrow', 'archers_paradox:diamond_arrow', 'minecraft:spectral_arrow', 'apotheosis:obidian_arrow', 'minecraft:arrow', 'minecraft:arrow'])
                                last.server.runCommandSilent(`summon ${arrow} ${spawn_pos[0]} ${spawn_pos[1]} ${spawn_pos[2]} {SoundEvent:"minecraft:entity.drowned.shoot",life:1180,crit:1b,pickup:0b,Motion:[${-(spawn_pos[0] - entity.x)},${-(spawn_pos[1] - entity.y) + 0.1},${-(spawn_pos[2] - entity.z)}]}`)        
                            }
                        })
                    }
                })
                event.player.data.add('arrows_spell_cooldown', 3600)
            } else {
                let penalty = Utils.random.nextDouble(0.0, 1.0)
                if (penalty < 0.65) {
                    event.server.runCommand(`tellraw ${event.player.username} {"text":"Your mind stings from exhaustion...","color":"dark_purple"}`)
                    event.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:entity.wither.hurt master ${event.player.username} ~ ~ ~ 50 0.75`)
                    event.server.runCommandSilent(`effect give ${event.player.username} minecraft:instant_damage 1 1 true`)
                } else if (penalty < 0.85) {
                    event.server.runCommand(`tellraw ${event.player.username} {"text":"Your brain writhes in agony...","color":"dark_purple"}`)
                    event.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:entity.wither.hurt master ${event.player.username} ~ ~ ~ 50 0.5`)
                    event.player.attack(19)
                    event.entity.addExhaustion(500)
                } else if (penalty < 0.95) {
                    event.server.runCommand(`tellraw ${event.player.username} {"text":"Your mind turns inside out...","color":"dark_purple"}`)
                    event.player.potionEffects.add('minecraft:levitation', 100, 2, false, false)
                    event.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:entity.wither.ambient master ${event.player.username} ~ ~ ~ 50 0.5`)
                    event.server.scheduleInTicks(40, later => {
                        event.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:entity.wither.shoot master ${event.player.username} ~ ~ ~ 50 0.5`)
                        for (let i = 0; i < 65; i++) {   
                            event.server.scheduleInTicks(i, last => {
                                let offset = [Utils.random.nextDouble(-7.0, 7.0), Utils.random.nextDouble(-7.0, 7.0), Utils.random.nextDouble(-7.0, 7.0)]
                                let arrow = Utils.randomOf(Utils.random, ['archers_paradox:lightning_arrow', 'minecraft:arrow', 'archers_paradox:blaze_arrow', 'archers_paradox:quartz_arrow', 'archers_paradox:diamond_arrow', 'minecraft:spectral_arrow', 'apotheosis:obidian_arrow', 'minecraft:arrow', 'minecraft:arrow'])
                                last.server.runCommandSilent(`execute at ${event.player.username} run summon ${arrow} ~${offset[0]} ~${offset[1]} ~${offset[2]} {SoundEvent:"minecraft:entity.drowned.shoot",life:1180,crit:1b,pickup:0b,Motion:[${-offset[0]},${-offset[1]},${-offset[2]}]}`)
                            })
                        }
                    })
                } else {
                    event.server.runCommand(`tellraw ${event.player.username} {"text":"Your brain explodes from Within...","color":"dark_purple"}`)
                    event.player.potionEffects.add('minecraft:levitation', 60, 2, false, false)
                    event.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:entity.wither.ambient master ${event.player.username} ~ ~ ~ 50 0.5`)
                    event.server.scheduleInTicks(50, later => {
                        later.server.runCommandSilent(`execute at ${event.player.username} run playsound minecraft:block.end_portal_frame.fill master ${event.player.username} ~ ~ ~ 50 0.5`)
                        for (let i = 0; i < 1000; i++) {
                            let offset = [Utils.random.nextDouble(-15, 15), Utils.random.nextDouble(-5, 5), Utils.random.nextDouble(-15, 15)]
                            later.server.runCommandSilent(`execute at ${event.player.username} run particle minecraft:reverse_portal ~${offset[0]} ~${offset[1] + 1.5} ~${offset[2]} ${-offset[0]} ${-offset[1]} ${-offset[2]} 1.5 0 normal @a`)
                        }
                    })
                    if (event.player.level.dimension == 'minecraft:the_nether') {
                        event.server.scheduleInTicks(60, later => {
                            event.player.attack(15)
                            event.entity.addExhaustion(500)
                            later.server.runCommandSilent(`execute at ${event.player.username} in minecraft:overworld run tp ${event.player.username} ~ ~ ~`)
                        })
                    } else {
                        event.server.scheduleInTicks(60, later => {
                            event.player.attack(15)
                            event.entity.addExhaustion(500)
                            later.server.runCommandSilent(`execute at ${event.player.username} in minecraft:the_nether run tp ${event.player.username} ~ ~ ~`)
                        })
                    }
                }
            }
            event.cancel()
            return
        default:
            return
    }
})

PlayerEvents.tick(event => {
    if (event.player.data.get('arrows_spell_cooldown') != undefined) {
        let cooldown = event.player.data.get('arrows_spell_cooldown')
        if (cooldown > 0) {
            event.player.data.add('arrows_spell_cooldown', cooldown - 1)
        } else {
            event.player.data.remove('arrows_spell_cooldown')
            event.server.runCommand(`tellraw ${event.player.username} {"text":"Your mind is open once again.", "color":"dark_purple"}`)
        }
    }
})