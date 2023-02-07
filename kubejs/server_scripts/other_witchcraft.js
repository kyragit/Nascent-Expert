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

PlayerEvents.inventoryChanged('create:andesite_alloy', event => {
    if (!event.hasGameStage('create')) {
        event.server.runCommand(`tellraw ${event.player.username} {"text":"Sequence break prevention initiated!","color":"dark_red"}`)
        event.player.drop(event.item, false)
        event.server.runCommandSilent(`clear ${event.player.username} create:andesite_alloy`)
        event.server.runCommand(`tellraw ${event.player.username} {"text":"If somehow you encountered this from the intended progression path, or you\'re a dirty cheater, click this message to disable sequence break detection (requires cheats to be enabled). If you found the item some other way, please submit a bug report <TODO: link>.","clickEvent":{"action":"run_command","value":"/advancement grant @s only custom:unlock_create"}}`)
    }
})