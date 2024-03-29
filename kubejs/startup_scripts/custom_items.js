const LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const TargetingConditions = Java.loadClass('net.minecraft.world.entity.ai.targeting.TargetingConditions')

StartupEvents.registry('item', event => {
    event.create('star_of_quintessence')
        .tooltip(Text.lightPurple('A glimmering star, made from the treasures of powerful enemies.'))
        .glow(true)
        .rarity('rare')
    event.create('powdered_determination')
        .tooltip(Text.lightPurple('All that willpower, that determination... Is it finally enough?'))
        .glow(true)
        .rarity('rare')
    event.create('swampjaw_rib')
        .tooltip(Text.darkGreen('A moss-covered rib bone, taken from the remains of the mighty Swampjaw.'))
        .glow(true)
        .rarity('epic')
    event.create('ethereal_bell')
        .tooltip(Text.aqua('The soul of the spirit Bellringer\'s golden bell, now bereft of its physical form.'))
        .glow(true)
        .rarity('epic')
    event.create('queen_of_diamonds')
        .tooltip(Text.red('A card from Dame Fortuna\'s casino deck, intricately decorated.'))
        .glow(true)
        .rarity('epic')

    event.create('lignite_coal')
        .texture('geolosys:items/lignite_coal')
        .burnTime(1200)
    event.create('bituminous_coal')
        .texture('geolosys:items/bituminous_coal')
        .burnTime(2000)
    event.create('bituminous_coal_coke')
        .texture('geolosys:items/bituminous_coal_coke')
        .burnTime(4000)
    event.create('lime')
    event.create('ceramic_dust')
    event.create('high_temperature_ceramic_dust')
    event.create('high_temperature_clay')
    event.create('high_temperature_brick')
    event.create('unfinished_coke_brick')
    event.create('lavaproof_brick')
    event.create('unfinished_blast_brick')
    event.create('ingot_mold')
    event.create('soul_of_a_pirate')
        .rarity('rare')
        .glow(true)
    event.create('effervescent_snowflake')
        .rarity('rare')
        .glow(true)
    event.create('pharaohs_ankh')
        .rarity('rare')
        .glow(true)
        .displayName('Pharaoh\'s Ankh')
    event.create('mark_of_the_accursed')
        .rarity('rare')
        .glow(true)
    event.create('eye_of_revelation')
        .rarity('epic')
        .glow(true)
    event.create('staff_core')
        .rarity('uncommon')
        .glow(true)
    event.create('industrial_fuel')
        .burnTime(6400)
    event.create('blaze_coated_charcoal')
        .burnTime(1600)

    event.create('portable_black_hole')
        .rarity('rare')
        .glow(true)
        .tooltip({text:"This seems like a bad idea...",color:"dark_purple"})
        .unstackable()
    event.create('unstable_vortex_generator')
        .rarity('rare')
        .glow(true)
        .tooltip({text:"Creates volatile wormholes.",color:"dark_purple"})
        .unstackable()
    event.create('ancient_core')
        .rarity('epic')
        .glow(true)
        .tooltip({text:"To create and destroy... is that all there is?",color:"#CC22F2",italic:true})
        .unstackable()
    event.create('unsettling_eye')
        .rarity('rare')
        .tooltip({text:"ITSWATCHINGYOUITSWATCHINGYOUITSWATCHINGYOUITS",color:"dark_red"})
    event.create('evoker_soul')
        .rarity('epic')
        .glow(true)
        .displayName('Evoker\'s Soul')
        .tooltip(Text.darkAqua('The key to the Illager\'s dark magic.'))
    event.create('staff_of_gaea')
        .rarity('rare')
        .tooltip({text:"The power of life at your fingertips. Consumes leaves or seeds to function.", color:"#00930C"})
        .unstackable()
        .useAnimation('bow')
        .useDuration(item => 72000)
        .use((level, player, hand) => {
            if (!level.server) {
                return false
            }
            let tryTakeLeaves = function(p) {
                let slot = p.inventory.find('#minecraft:leaves')
                if (slot == -1) {
                    if (p.inventory.find('#forge:seeds') != -1) {
                        slot = p.inventory.find('#forge:seeds')
                    } else {
                        return false
                    }
                }
                p.inventory.extractItem(slot, 1, false)
                return true
            }
            if (tryTakeLeaves(player)) {
                player.data.add('gaea_blessing_active', true)
                let recurse = function(p) {
                    if (p.data.getOrDefault('gaea_blessing_active', false)) {
                        if (tryTakeLeaves(p)) {
                            level.server.scheduleInTicks(15, later => {
                                later.server.runCommandSilent(`execute at ${p.username} run summon insanelib:area_effect_cloud_3d ~ ~ ~ {ReapplicationDelay:30,Particle:"minecraft:dust 0.25 1.0 0.25 0.5",CustomName:\'{"text":"Gaea\\\'s Blessing"}\',Radius:10.0f,Duration:15,Effects:[{"forge:id":"minecraft:regeneration",Duration:60,Amplifier:1,Ambient:0b,ShowParticles:1b,ShowIcon:1b}]}`)
                                recurse(p)
                            })
                        } else {
                            p.stopUsingItem()
                        }
                    }
                }
                recurse(player)
                return true
            } else {
                return false
            }
        })
        .finishUsing((itemstack, level, entity) => {
            return itemstack
        })
        .releaseUsing((itemstack, level, entity, tick) => {
            if (entity.player) {
                entity.data.add('gaea_blessing_active', false)
            }
        })
    
    event.create('parkour_guide_vault')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Vault')
        .tooltip(Text.aqua('Right-click to learn how to vault!'))
    event.create('parkour_guide_breakfall')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Breakfalls')
        .tooltip(Text.aqua('Right-click to learn how to break your falls!'))
    event.create('parkour_guide_catleap')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Cat Leap')
        .tooltip(Text.aqua('Right-click to learn how to cat leap!'))
    event.create('parkour_guide_cling')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Cling to Cliffs')
        .tooltip(Text.aqua('Right-click to learn how to cling to cliffs!'))
    event.create('parkour_guide_crawl')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Crawl & Slide')
        .tooltip(Text.aqua('Right-click to learn how to crawl and slide!'))
    event.create('parkour_guide_dodge')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Dodge')
        .tooltip(Text.aqua('Right-click to learn how to dodge!'))
    event.create('parkour_guide_flip')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Front Flip')
        .tooltip(Text.aqua('Right-click to learn how to do a front flip!'))
    event.create('parkour_guide_wallrun')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Wall Run')
        .tooltip(Text.aqua('Right-click to learn how to wall run!'))
    event.create('parkour_guide_wall_jump')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Wall Jump/Slide')
        .tooltip(Text.aqua('Right-click to learn how to wall jump and wall slide!'))
    event.create('parkour_guide_quick_turn')
        .unstackable()
        .rarity('rare')
        .glow(true)
        .texture('layer0', 'kubejs:item/parkour_guide')
        .displayName('Parkour Guide: Quick Turn')
        .tooltip(Text.aqua('Right-click to learn how to quick turn!'))
})

ItemEvents.modification(event => {
    event.modify('treasurebags:treasure_bag', item => {
        item.setFireResistant(true)
    })
    event.modify('gateways:gate_pearl', item => {
        item.setFireResistant(true)
    })
    event.modify('enigmaticlegacy:recall_potion', item => {
        item.setMaxStackSize(16)
    })
    event.modify('enigmaticlegacy:twisted_potion', item => {
        item.setMaxStackSize(16)
    })
})

const SAMPLES = [
    'uranium',
    'galena',
    'bauxite',
    'limonite',
    'hematite',
    'malachite',
    'coal',
    'lignite',
    'bituminous_coal',
    'gold',
    'azurite',
    'nickel',
    'iron',
    'sphalerite',
    'copper',
    'redstone',
    'zinc',
]

StartupEvents.registry('block', event => {
    for (let sample of SAMPLES) {
        event.create(`${sample}_sample`)
            .waterlogged()
            .material('clay')
            .tagBlock('minecraft:mineable/shovel')
            .hardness(0.1)
            .fullBlock(false)
            .noCollision()
            .notSolid()
            .box(3, 0, 3, 13, 4, 13, true)
            .createProperties()
            .offsetType('XZ')
    }
})

StartupEvents.registry('fluid', event => {
    event.create('molten_brass')
        .thickTexture(Color.rgba(221, 165, 0, 255))
        .bucketColor(Color.rgba(221, 165, 0, 255))
        .luminosity(8)
        .displayName('Molten Brass')
    event.create('molten_copper')
        .thickTexture(Color.rgba(221, 84, 0, 255))
        .bucketColor(Color.rgba(221, 84, 0, 255))
        .luminosity(8)
        .displayName('Molten Copper')
    event.create('molten_zinc')
        .thickTexture(Color.rgba(121, 150, 139, 255))
        .bucketColor(Color.rgba(121, 150, 139, 255))
        .luminosity(8)
        .displayName('Molten Zinc')
    event.create('molten_iron')
        .thickTexture(Color.rgba(201, 41, 0, 255))
        .bucketColor(Color.rgba(201, 41, 0, 255))
        .luminosity(8)
        .displayName('Molten Iron')
    event.create('molten_lead')
        .thickTexture(Color.rgba(36, 33, 56, 255))
        .bucketColor(Color.rgba(36, 33, 56, 255))
        .luminosity(8)
        .displayName('Molten Lead')
    event.create('molten_mixed_metal')
        .thickTexture(Color.rgba(73, 73, 73, 255))
        .bucketColor(Color.rgba(73, 73, 73, 255))
        .luminosity(8)
        .displayName('Molten Mixed Metal')
    event.create('molten_steel')
        .thickTexture(Color.rgba(105, 105, 105, 255))
        .bucketColor(Color.rgba(105, 105, 105, 255))
        .luminosity(8)
        .displayName('Molten Steel')
    event.create('mortar')
        .thinTexture(Color.rgba(147, 147, 147, 255))
        .bucketColor(Color.rgba(147, 147, 147, 255))
        .displayName('Mortar')
})
