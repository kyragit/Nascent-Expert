ServerEvents.genericLootTables(event => {
    createUniversalLootTables(event)
    dungeonsAriseLootTables(event)
    dimDungeonsLootTables(event)
    hexcastingLootTables(event)
    yungsLootTables(event)
    dugeonsPlusLootTables(event)
    bygLootTables(event)
    apotheosisLootTables(event)
    lostCastleLootTables(event)
    idasLootTables(event)
    minecraftLootTables(event)
    bygoneNetherLootTables(event)
    graveyardLootTables(event)
    dungeonsEnhancedLootTables(event)
})

ServerEvents.blockLootTables(event => {
    geolosysLootTables(event)
})

ServerEvents.entityLootTables(event => {
    vanillaEntityLootTables(event)
})

LootJS.modifiers(event => {
    event.disableWitherStarDrop()
    // Stops all eyes of ender generating as loot, anywhere
    event.addLootTableModifier(/.*/).removeLoot('minecraft:ender_eye').removeLoot(/create:(?:andesite_alloy|goggles|wrench|gearbox|large_cogwheel|cogwheel|shaft)/)
    event.addLootTableModifier(/^endrem:.*/).removeLoot(/.*/)
})

const PLENTIFUL = 'custom:loot_plentiful'
const COMMON = 'custom:loot_common'
const UNCOMMON = 'custom:loot_uncommon'
const RARE = 'custom:loot_rare'
const EPIC = 'custom:loot_epic'
const LEGENDARY = 'custom:loot_legendary'
const GODLY = 'custom:loot_godly'

function createUniversalLootTables(event) {

    const OVERWORLD_ARTIFACTS = [
        ['enigmaticlegacy:mining_charm', 1],
        ['enigmaticlegacy:escape_scroll', 1],
        ['enigmaticlegacy:forbidden_axe', 1],
        ['enigmaticlegacy:super_magnet_ring', 1],
        ['relics:aqua_walker', 1],
        ['relics:spatial_sign', 1],
        ['relics:rage_glove', 1],
        ['relics:holy_locket', 1],
        ['relics:midnight_robe', 1],
        ['relics:reflection_necklace', 1],
        ['relics:drowned_belt', 1],
        ['relics:ice_breaker', 1],
        ['simplyswords:storms_edge', 2],
        ['simplyswords:stormbringer', 2],
        ['simplyswords:toxic_longsword', 2],
        ['simplyswords:emberblade', 2],
        ['simplyswords:hearthflame', 2],
        ['simplyswords:soulkeeper', 2],
        ['simplyswords:arcanethyst', 2],
        ['artifacts:snorkel', 1],
        ['artifacts:vampiric_glove', 1],
        ['artifacts:bunny_hoppers', 1],
        ['artifacts:power_glove', 1],
        ['artifacts:feral_claws', 1],
        ['artifacts:crystal_heart', 1],
        ['kubejs:portable_black_hole', 3],
        ['kubejs:staff_of_gaea', 3],
    ]

    const ARTIFACT_CHARMS = [
        ['minecraft:fire_resistance', true, 1],
        ['minecraft:strong_swiftness', true, 1],
        ['minecraft:regeneration', true, 1],
        ['minecraft:strength', true, 1],
        ['minecraft:water_breathing', true, 1],
        ['apotheosis:resistance', true, 1],
        ['apotheosis:haste', true, 1],
        ['apotheosis:knowledge', true, 1],
        ['alexsmobs:poison_resistance', true, 1],
    ]
    
    const OVERWORLD_TREASURE = [
        ['enigmaticlegacy:insignia', 1],
        ['enigmaticlegacy:unholy_grail', 3],
        ['enigmaticlegacy:void_stone', 2],
        ['enigmaticlegacy:xp_scroll', 1],
        ['enigmaticlegacy:mega_sponge', 1],
        ['enigmaticlegacy:magnet_ring', 2],
        ['enigmaticlegacy:enchantment_transposer', 3],
        ['relics:spore_sac', 2],
        ['relics:ice_skates', 2],
        ['relics:horse_flute', 2],
        ['relics:hunter_belt', 1],
        ['relics:arrow_quiver', 1],
        ['relics:wool_mitten', 1],
        ['relics:leather_belt', 1],
        ['artifacts:plastic_drinking_hat', 1],
        ['artifacts:novelty_drinking_hat', 1],
        ['artifacts:night_vision_goggles', 1],
        ['artifacts:villager_hat', 1],
        ['artifacts:cloud_in_a_bottle', 1],
        ['artifacts:cross_necklace', 1],
        ['artifacts:panic_necklace', 1],
        ['artifacts:shock_pendant', 1],
        ['artifacts:flame_pendant', 1],
        ['artifacts:thorn_pendant', 1],
        ['artifacts:charm_of_sinking', 1],
        ['artifacts:helium_flamingo', 1],
        ['artifacts:digging_claws', 1],
        ['artifacts:fire_gauntlet', 1],
        ['artifacts:pocket_piston', 1],
        ['artifacts:golden_hook', 1],
        ['artifacts:steadfast_spikes', 1],
        ['artifacts:flippers', 1],
        ['artifacts:whoopee_cushion', 1],
        ['artifacts:umbrella', 1],
        ['artifacts:superstitious_hat', 1],
        ['artifacts:lucky_scarf', 1],
    ]

    const TREASURE_CHARMS = [
        ['minecraft:swiftness', true, 1],
        ['minecraft:night_vision', true, 1],
        ['minecraft:invisibility', true, 1],
        ['minecraft:slow_falling', true, 1],
        ['minecraft:leaping', true, 1],
        ['alexsmobs:knockback_resistance', true, 1],
        ['alexsmobs:clinging', true, 1],
        ['feathers:energized_potion', true, 1],
    ]
    
    const RUNIC_WEAPONS = [
        ['simplyswords:runic_longsword', 1],
        ['simplyswords:runic_twinblade', 1],
        ['simplyswords:runic_rapier', 1],
        ['simplyswords:runic_katana', 1],
        ['simplyswords:runic_sai', 1],
        ['simplyswords:runic_spear', 1],
        ['simplyswords:runic_glaive', 1],
        ['simplyswords:runic_cutlass', 1],
        ['simplyswords:runic_claymore', 1],
        ['simplyswords:runic_chakram', 1],
        ['simplyswords:runic_greataxe', 1],
        ['simplyswords:runic_greathammer', 1],
        ['simplyswords:runic_warglaive', 1],
        ['simplyswords:runic_scythe', 1],
    ]
    
    const OVERWORLD_VALUABLE = [
        ['enigmaticlegacy:extradimensional_eye', 9],
        ['enigmaticlegacy:recall_potion', 15],
        ['quark:bottled_cloud', 1],
        ['quark:red_rune', 1],
        ['quark:blue_rune', 1],
        ['quark:light_blue_rune', 1],
        ['quark:cyan_rune', 1],
        ['quark:green_rune', 1],
        ['quark:lime_rune', 1],
        ['quark:white_rune', 1],
        ['quark:gray_rune', 1],
        ['quark:light_gray_rune', 1],
        ['quark:black_rune', 1],
        ['quark:pink_rune', 1],
        ['quark:magenta_rune', 1],
        ['quark:orange_rune', 1],
        ['quark:yellow_rune', 1],
        ['quark:purple_rune', 1],
        ['quark:brown_rune', 1],
        ['quark:rainbow_rune', 1],
        ['dimdungeons:item_portal_key', 2],
        ['paraglider:paraglider', 2],
        ['paraglider:deku_leaf', 2],
        ['aquaculture:neptunium_ingot', 1],
    ]

    const VALUABLE_CHARMS = [
        ['minecraft:strong_regeneration', false, 1],
        ['minecraft:fire_resistance', false, 1],
        ['minecraft:slow_falling', false, 1],
        ['apotheosis:wither', true, 1],
        ['apotheosis:fatigue', true, 1],
        ['rottencreatures:freeze', true, 1],
        ['ecologics:sliding', true, 1],
        ['alexsmobs:poison_resistance', false, 1],
    ]

    const LORE_BOOKS = [
        Item.of('minecraft:written_book', '{author:"Unknown",pages:[\'{"text":">AUTOMATIC LOG ENTRY\\\\n>14:30:34 7/3/9727\\\\n>SUBSYSTEM 366E\\\\n>\\\\n>OVERWORLD INFRACTIONS DETECTED: 1\\\\n>NETHER INFRACTIONS DETECTED: 0\\\\n>END INFRACTIONS DETECTED: 0\\\\n>BEFORE INFRACTIONS DETECTED: 0\\\\n"}\',\'{"text":">BEYOND INFRACTIONS DETECTED: 0\\\\n>WITHIN INFRACTIONS DETECTED: 0\\\\n>AFTER INFRACTIONS DETECTED: 1,802\\\\n>OTHER INFRACTIONS DETECTED: 0\\\\n>DETERMINED THREAT PRIORITY: LOW\\\\n>ACTIONS TAKEN: 5\\\\n>ACTIONS SUCCESSFUL: 5"}\',\'{"text":">LOG ENTRY DESCRIPTION AGENT: A-376-B\\\\n>DESCRIPTION:\\\\n1,798 Threats in After determined non-actionable. The 4 remaining threats in After were forwarded to subsystem 13A. One overworld threat estimated to be an attempted unauthorized entry"}\',\'{"text":"into After United Minds spacetime. Entry was successfully blocked and countermeasures were taken, including automated electric strikes at the estimated area of infraction and deployment of AUM vehicles. Threat determined to be terminated.\\\\n>END LOG"}\'],title:"LOG ENTRY"}'),
        Item.of('minecraft:written_book', '{author:"Unknown Explorer",pages:[\'{"text":"1st Full Moon,\\\\n2599\\\\n\\\\nThe scorching desert heat gives way to fleeting comfort as the sun sets. The days have been long and draining, but my determination is undeterred. If I am to verify these rumors, I must adapt to these harsh conditions."}\',\'{"text":"1st Waning Gibbous,\\\\n2599\\\\n\\\\nA miracle or a mirage? In the distance, a faint outline; hope. If my eyes do not decieve me, a structure on the horizon. Tomorrow will bring answers."}\',\'{"text":"1st Last Quarter,\\\\n2599\\\\n\\\\nIt is no mirage. Before me is the grandest palace this side of the Alles; pristinely maintained with chromatic paint and lush trees. It is raised very far above the ground and vastly oversized, as if not built for my kind."}\',\'{"text":"The architecture is supremely advanced, with towers capped in bulbous domes and golden spires. It looks as though it was dropped here from another time. My heart races at the thought of exploring its every crevice."}\',\'{"text":"1st Waning Crescent,\\\\n2599\\\\n\\\\nI write this hidden in one of the many corners of this grand palace, for it seems it was not as unguarded as I had hoped. I am lucky to be well-prepared for such an encounter, but I will have to explore carefully."}\',\'{"text":"Already, I have stumbled across masterfully crafted and enchanted weapons and armor; if only I could carry it all back home. Nevertheless, my exploration will continue."}\',\'{"text":"2nd New Moon,\\\\n2599\\\\n\\\\nI have discovered something truly awful and marvelous. At the very peak of one of its mighty towers, a weapon unlike any I have seen. It is a halberd, and it surges with the power of thunder itself! Not only that, when wielded"}\',\'{"text":"and charged, it vaults me forward and through any foes in my path, killing them near instantly. I cannot risk losing such an artifact; I will bring it back immediately, along with a story unlike any other."}\'],title:"Lost Journal"}'),
        Item.of('minecraft:written_book', '{author:"A.C.P.C.G.",pages:[\'{"text":"Analysis on the Origin and Composition of the Spellstones\\\\n\\\\n\\\\nReport by the Alleq City Planar Communications Guild\\\\n\\\\n\\\\n\\\\n\\\\n\\\\nPublished 3991"}\',\'{"text":"Much discussion has been had regarding the Spellstones that the Guild has recently acquired from an unknown donor. Until recently, these were only known about from ancient writings and oral history (with one exception). This analysis hopes to demystify these items and their origin."}\',\'{"text":"The Guild now has three of these Spellstones, though it is now deemed probable that at least four exist. The following pages will describe each in detail."}\',\'{"text":"Will of the Ocean\\\\n\\\\nThis is the Spellstone with the earliest known written evidence of its existence, due to its relatively straightforward location. Its first appearance in the Overworld was very likely deep in the ocean, in the now-ruined ancient"}\',\'{"text":"monuments. Who created these monuments remains a mystery, though some oral accounts claim a group called the \\\\"guardians\\\\" were responsible. Regardless, what is known about this artifact is what it is made of; highly concentrated prismarine. It almost"}\',\'{"text":"certainly has some sort of power source in the center, but the Guild has elected not to destroy it to find out. The artifact has a very strong connection to Within, and it is hypothesized that the Spellstone itself is a conscious being, though this remains controversial. Little more is known of"}\',\'{"text":"its creation because of the difficulty inherent to studying Within. "}\',\'{"text":"Blazing Core\\\\n\\\\nThis Spellstone was first created in Beyond, and as such extra care had to be taken when handling it. It was likely crafted by the Beyond Mind itself, for the express purpose of luring in treasure hunters. And lure it did, for its first "}\',\'{"text":"documented discovery was in the Nether (during the Beyond occupation period). Its construction is not known exactly, but it seems to be made of some biological material. Perhaps it is best left unknown. "}\',\'{"text":"Heart of the Golem\\\\n\\\\nThis Spellstone is certainly the most well-known due to the public nature of its discovery and theft. Of course, it was first found in the Zamir Forest incident of 2656, before going missing for centuries. The Guild will not comment on the "}\',\'{"text":"controversy surrounding this event. This artifact is from Before, as it is a Golem\\\'s power source. It is made from what has now been dubbed \\\\"golemite\\\\". Many more of these likely exist, as it is now known that the Golems were prolific planar travellers. "}\',\'{"text":"Hypothesized Fourth Spellstone\\\\n\\\\nIt seems very likely that another Spellstone with connections to After exists. However, due to the current political climate, the Guild has elected not to publish any unverified hypotheses."}\'],title:"On Spellstones"}'),
    ]

    event.addGeneric('custom:lore_book', loot => {
        loot.addPool(pool => {
            for (let book of LORE_BOOKS) {
                pool.addItem(book, 1, 1)
            }
        })
    })

    event.addGeneric('custom:overworld_valuable', loot => {
        loot.addPool(pool => {
            for (let item of OVERWORLD_VALUABLE) {
                pool.addItem(item[0], item[1], 1)
            }
            for (let potion of VALUABLE_CHARMS) {
                pool.addItem(Item.of('apotheosis:potion_charm', `{Potion:"${potion[0]}",Unbreakable:${potion[1] ? '1b' : '0b'}}`), potion[2], 1)
            }
            pool.addLootTable('custom:lore_book').weight(1)
        })
    })
    event.addGeneric('custom:overworld_treasure', loot => {
        loot.addPool(pool => {
            for (let item of OVERWORLD_TREASURE) {
                pool.addItem(item[0], item[1], 1)
            }
            for (let potion of TREASURE_CHARMS) {
                pool.addItem(Item.of('apotheosis:potion_charm', `{Potion:"${potion[0]}",Unbreakable:${potion[1] ? '1b' : '0b'}}`), potion[2], 1)
            }
            pool.addLootTable('custom:random_scroll').weight(3)
            pool.addLootTable('custom:secret_book').weight(1)
        })
    })
    event.addGeneric('custom:runic_weapons', loot => {
        loot.addPool(pool => {
            for (let item of RUNIC_WEAPONS) {
                pool.addItem(item[0], item[1], 1)
            }
        })
    })
    event.addGeneric('custom:overworld_artifacts', loot => {
        loot.addPool(pool => {
            for (let item of OVERWORLD_ARTIFACTS) {
                pool.addItem(item[0], item[1], 1)
            }
            for (let potion of ARTIFACT_CHARMS) {
                pool.addItem(Item.of('apotheosis:potion_charm', `{Potion:"${potion[0]}",Unbreakable:${potion[1] ? '1b' : '0b'}}`), potion[2], 1)
            }
            pool.addLootTable('custom:random_scroll').weight(1)
            pool.addLootTable('custom:secret_book').weight(1)
        })
    })

    event.addGeneric('custom:loot_plentiful', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.05)
        })
    })
    event.addGeneric('custom:loot_common', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.1)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.02)
        })
        loot.addPool(pool => {
            pool.randomChance(0.1)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 5,
                quality: 0,
                rarity: 'common'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'uncommon'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.05)
        })
    })
    event.addGeneric('custom:loot_uncommon', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.15)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.05)
        })
        loot.addPool(pool => {
            pool.randomChance(0.2)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 0,
                rarity: 'common'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'uncommon'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.15)
        })
    })
    event.addGeneric('custom:loot_rare', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.25)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.075)
        })
        loot.addPool(pool => {
            pool.randomChance(0.5)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 10,
                quality: 0,
                rarity: 'uncommon'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 5,
                quality: 1,
                rarity: 'rare'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.4)
        })
    })
    event.addGeneric('custom:loot_epic', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.35)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.1)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_artifacts').randomChance(0.1)
        })
        loot.addPool(pool => {
            pool.randomChance(0.75)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 9,
                quality: 0,
                rarity: 'rare'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'epic'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.7)
        })
    })
    event.addGeneric('custom:loot_legendary', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.5)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.25)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_artifacts').randomChance(0.2)
        })
        loot.addPool(pool => {
            pool.randomChance(0.85)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 15,
                quality: 0,
                rarity: 'rare'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 4,
                quality: 2,
                rarity: 'epic'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'mythic'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.85)
        })
    })
    event.addGeneric('custom:loot_godly', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.75)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.5)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_artifacts').randomChance(0.35)
        })
        loot.addPool(pool => {
            pool.randomChance(1.0)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 8,
                quality: 0,
                rarity: 'rare'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 4,
                quality: 2,
                rarity: 'epic'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'mythic'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.95)
        })
    })
}

function addToLootTable(event, lootTable, tableToAdd, chance, count) {
    event.modify(lootTable, loot => {
        loot.addPool(pool => {
            pool.addLootTable(tableToAdd).count(count).randomChance(chance)
        })
    })
}

function addItemToLootTable(event, lootTable, item, chance, count) {
    event.modify(lootTable, loot => {
        loot.addPool(pool => {
            pool.addItem(item, 1, count).randomChance(chance)
        })
    })
}

function dungeonsAriseLootTables(event) {

    function dungeonsAriseLoot(event, chest, lootTable) {
        event.modify(`dungeons_arise:chests/${chest}`, loot => {
            loot.addPool(pool => {
                pool.addLootTable(lootTable)
            })
        })
    }

    dungeonsAriseLoot(event, 'abandoned_temple/abandoned_temple_top', EPIC)
    dungeonsAriseLoot(event, 'abandoned_temple/abandoned_temple_entrance', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_treasure', LEGENDARY)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_normal', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_rooms', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_supply', PLENTIFUL)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_barrels', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_gardens', UNCOMMON)
    dungeonsAriseLoot(event, 'ceryneian_hind/ceryneian_hind_treasure', EPIC)
    dungeonsAriseLoot(event, 'foundry/foundry_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/foundry/foundry_treasure', 'simplyswords:molten_edge', 0.65, 1)
    dungeonsAriseLoot(event, 'foundry/foundry_normal', UNCOMMON)
    addItemToLootTable(event, 'dungeons_arise:chests/foundry/foundry_normal', 'simplyswords:molten_edge', 0.05, 1)
    dungeonsAriseLoot(event, 'foundry/foundry_passage_normal', UNCOMMON)
    addItemToLootTable(event, 'dungeons_arise:chests/foundry/foundry_passage_normal', 'simplyswords:molten_edge', 0.1, 1)
    dungeonsAriseLoot(event, 'foundry/foundry_lava_pit', RARE)
    dungeonsAriseLoot(event, 'giant_mushroom/red_giant_mushroom', UNCOMMON)
    dungeonsAriseLoot(event, 'giant_mushroom/twin_giant_mushroom', UNCOMMON)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_supply', COMMON)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_normal', COMMON)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_theater', RARE)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/heavenly_challenger/heavenly_challenger_treasure', 'enigmaticlegacy:angel_blessing', 0.65, 1)
    dungeonsAriseLoot(event, 'heavenly_conqueror/heavenly_conqueror_normal', COMMON)
    dungeonsAriseLoot(event, 'heavenly_conqueror/heavenly_conqueror_barrels', COMMON)
    dungeonsAriseLoot(event, 'heavenly_conqueror/heavenly_conqueror_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_treasure', 'enigmaticlegacy:angel_blessing', 0.65, 1)
    dungeonsAriseLoot(event, 'heavenly_rider/heavenly_rider_normal', COMMON)
    dungeonsAriseLoot(event, 'heavenly_rider/heavenly_rider_barrels', COMMON)
    dungeonsAriseLoot(event, 'heavenly_rider/heavenly_rider_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_treasure', 'enigmaticlegacy:angel_blessing', 0.5, 1)
    dungeonsAriseLoot(event, 'illager_corsair/illager_corsair_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/illager_corsair/illager_corsair_treasure', 'kubejs:soul_of_a_pirate', 0.5, 1)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_barrels', PLENTIFUL)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_normal', COMMON)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_treasure', EPIC)
    dungeonsAriseLoot(event, 'illager_galley/illager_galley_treasure', RARE)
    addItemToLootTable(event, 'dungeons_arise:chests/illager_galley/illager_galley_treasure', 'kubejs:soul_of_a_pirate', 0.5, 1)
    dungeonsAriseLoot(event, 'illager_windmill/illager_windmill_barrels', COMMON)
    dungeonsAriseLoot(event, 'illager_windmill/illager_windmill_treasure', EPIC)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_top_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/infested_temple/infested_temple_top_treasure', 'simplyswords:bramblethorn', 0.17, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/infested_temple/infested_temple_top_treasure', 'kubejs:effervescent_snowflake', 0.2, 1)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_bookshelf', UNCOMMON)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_forge', RARE)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_garden', COMMON)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_normal', COMMON)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_supply', PLENTIFUL)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_table', UNCOMMON)
    dungeonsAriseLoot(event, 'jungle_tree_house/jungle_tree_house_treasure', RARE)
    dungeonsAriseLoot(event, 'lighthouse/lighthouse_top', RARE)
    dungeonsAriseLoot(event, 'mining_system/mining_system_barrels', COMMON)
    dungeonsAriseLoot(event, 'mining_system/mining_system_treasure', RARE)
    addItemToLootTable(event, 'dungeons_arise:chests/mining_system/mining_system_treasure', 'enigmaticlegacy:golem_heart', 0.5, 1)
    dungeonsAriseLoot(event, 'mushroom_mines/mushroom_mines_tools', UNCOMMON)
    dungeonsAriseLoot(event, 'mushroom_mines/mushroom_mines_treasure', EPIC)
    dungeonsAriseLoot(event, 'mushroom_village/mushroom_village_barrels', UNCOMMON)
    dungeonsAriseLoot(event, 'mushroom_village/mushroom_village_treasure', RARE)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/plague_asylum/plague_asylum_treasure', 'enigmaticlegacy:golem_heart', 0.5, 1)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_barrels', COMMON)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_cells', UNCOMMON)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_normal', COMMON)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_potions', RARE)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_storage', PLENTIFUL)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/scorched_mines/scorched_mines_treasure', 'enigmaticlegacy:golem_heart', 0.5, 1)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_barrels', COMMON)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_housing', COMMON)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_normal', COMMON)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_hub', UNCOMMON)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_normal', COMMON)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_treasure', EPIC)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_library_normal', UNCOMMON)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_normal', 'custom:secret_book', 0.03, 1)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_normal', 'custom:lore_book', 0.1, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_library_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure', 'simplyswords:soulpyre', 0.25, 1)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure', 'custom:secret_book', 0.1, 1)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure', 'custom:lore_book', 0.1, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_garden_normal', RARE)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_normal', 'enigmaticlegacy:animal_guidebook', 0.2, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_garden_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure', 'simplyswords:soulpyre', 0.5, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure', 'enigmaticlegacy:animal_guidebook', 0.5, 1)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_normal', COMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_rooms', UNCOMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_library', RARE)
    addToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_library', 'custom:secret_book', 0.1, 1)
    addToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_library', 'custom:lore_book', 0.1, 1)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_gardens', UNCOMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_towers', UNCOMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_treasure', 'simplyswords:thunderbrand', 0.4, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_treasure', 'enigmaticlegacy:hunter_guidebook', 0.4, 1)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_elite', GODLY)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_elite', 'simplyswords:thunderbrand', 0.5, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_elite', 'enigmaticlegacy:hunter_guidebook', 0.5, 1)
    dungeonsAriseLoot(event, 'small_blimp/small_blimp_treasure', EPIC)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_barrels', COMMON)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_rooms', COMMON)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_top_rooms', RARE)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_top_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/thornborn_towers/thornborn_towers_top_treasure', 'enigmaticlegacy:hunter_guidebook', 0.25, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/thornborn_towers/thornborn_towers_top_treasure', 'enigmaticlegacy:animal_guidebook', 0.25, 1)
    dungeonsAriseLoot(event, 'typhon/typhon_treasure', EPIC)
    dungeonsAriseLoot(event, 'undead_pirate_ship/undead_pirate_ship_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_treasure', 'kubejs:soul_of_a_pirate', 0.5, 1)
}

function dimDungeonsLootTables(event) {
    addToLootTable(event, 'dimdungeons:chests/chestloot_1', UNCOMMON, 1, 1)
    addToLootTable(event, 'dimdungeons:chests/chestloot_2', RARE, 1, 1)
    addToLootTable(event, 'dimdungeons:chests/chestloot_3', EPIC, 1, 1)
    addToLootTable(event, 'dimdungeons:chests/chestloot_4', LEGENDARY, 1, 1)
}

function hexcastingLootTables(event) {
    event.modify('hexcasting:grant_patchi_book', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/scroll_loot_few', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/scroll_loot_some', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/scroll_loot_many', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/amethyst_cluster', loot => {
        loot.clearPools()
    })
}

function yungsLootTables(event) {
    addToLootTable(event, 'betterdeserttemples:chests/food_storage', COMMON, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/lab', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/library', UNCOMMON, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'betterdeserttemples:chests/library', 'custom:lore_book', 0.1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/pharaoh_hidden', LEGENDARY, 1, 1)
    addItemToLootTable(event, 'betterdeserttemples:chests/pharaoh_hidden', 'kubejs:pharaohs_ankh', 0.67, 1)
    addToLootTable(event, 'betterdeserttemples:chests/statue', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/storage', PLENTIFUL, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/tomb', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/tomb_pharaoh', EPIC, 1, 1)
    addItemToLootTable(event, 'betterdeserttemples:chests/tomb_pharaoh', 'kubejs:pharaohs_ankh', 0.25, 1)
}

function dugeonsPlusLootTables(event) {
    addToLootTable(event, 'dungeons_plus:chests/leviathan/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/leviathan/rare', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/snowy_temple/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/snowy_temple/rare', EPIC, 1, 1)
    addItemToLootTable(event, 'dungeons_plus:chests/snowy_temple/rare', 'kubejs:effervescent_snowflake', 0.45, 1)
    addToLootTable(event, 'dungeons_plus:chests/soul_prison/common', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/soul_prison/golden_armor', RARE, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/soul_prison/rare', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/barrel', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/vex', RARE, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/vex_map', RARE, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/warped_garden/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/warped_garden/rare', EPIC, 1, 1)
}

function apotheosisLootTables(event) {
    addToLootTable(event, 'apotheosis:chests/chest_valuable', RARE, 1, 1)
    addToLootTable(event, 'apotheosis:chests/spawner_brutal', RARE, 1, 1)
    addToLootTable(event, 'apotheosis:chests/spawner_brutal_rotate', RARE, 1, 1)
    addToLootTable(event, 'apotheosis:chests/spawner_swarm', RARE, 1, 1)
}

function lostCastleLootTables(event) {
    addToLootTable(event, 'tlc:chests/biblio', UNCOMMON, 1, 1)
    addToLootTable(event, 'tlc:chests/dungeon', RARE, 1, 1)
    addToLootTable(event, 'tlc:chests/hided', EPIC, 1, 1)
    addToLootTable(event, 'tlc:chests/house', COMMON, 1, 1)
    addToLootTable(event, 'tlc:chests/throne', EPIC, 1, 1)
    addToLootTable(event, 'tlc:chests/treasure', LEGENDARY, 1, 1)
}

function bygLootTables(event) {
    event.modify('byg:advancement/biomepedia_gift', loot => {
        loot.clearPools()
    })
}

function geolosysLootTables(event) {
    const SAMPLE_MAP = [
        ['hematite', 'minecraft:iron_nugget'],
        ['limonite', 'minecraft:iron_nugget'],
        ['iron', 'minecraft:iron_nugget'],
        ['gold', 'minecraft:gold_nugget'],
        ['redstone', 'minecraft:redstone'],
        ['copper', 'create:copper_nugget'],
        ['malachite', 'create:copper_nugget'],
        ['azurite', 'create:copper_nugget'],
        ['zinc', 'create:zinc_nugget'],
        ['sphalerite', 'create:zinc_nugget'],
        ['bauxite', 'immersiveengineering:nugget_aluminum'],
        ['uranium', 'immersiveengineering:nugget_uranium'],
        ['nickel', 'immersiveengineering:nugget_nickel'],
        ['galena', 'immersiveengineering:nugget_lead'],
    ]
    
    const COALS = [
        ['coal', 'minecraft:coal'],
        ['lignite', 'kubejs:lignite_coal'],
        ['bituminous_coal', 'kubejs:bituminous_coal'],
    ]

    function sampleNuggetLoot(event, sample, nugget) {
        event.addBlock(`kubejs:${sample}_sample`, block => {
            block.addPool(pool => {
                pool.addItem(nugget, 1, {n: 3, p: 0.5})
            })
        })
    }
    
    function replaceOreDrop(event, ore, drop) {
        event.modifyBlock(ore, block => {
            block.clearPools()
            block.addPool(pool => {
                pool.addEntry({
                    type: "item",
                    weight: 1,
                    quality: 0,
                    name: drop,
                    functions: [
                        {
                            function: "apply_bonus",
                            enchantment: "minecraft:fortune",
                            formula: "ore_drops"
                        }
                    ]
                })
            })
        })
    }

    replaceOreDrop(event, 'geolosys:limonite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:deepslate_limonite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:hematite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:deepslate_hematite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:sphalerite_ore', 'create:raw_zinc')
    replaceOreDrop(event, 'geolosys:deepslate_sphalerite_ore', 'create:raw_zinc')
    replaceOreDrop(event, 'geolosys:malachite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:deepslate_malachite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:azurite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:deepslate_azurite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:gold_ore', 'minecraft:raw_gold')
    replaceOreDrop(event, 'geolosys:deepslate_gold_ore', 'minecraft:raw_gold')
    replaceOreDrop(event, 'geolosys:bauxite_ore', 'immersiveengineering:raw_aluminum')
    replaceOreDrop(event, 'geolosys:deepslate_bauxite_ore', 'immersiveengineering:raw_aluminum')
    replaceOreDrop(event, 'geolosys:lignite_ore', 'kubejs:lignite_coal')
    replaceOreDrop(event, 'geolosys:deepslate_lignite_ore', 'kubejs:lignite_coal')
    replaceOreDrop(event, 'geolosys:bituminous_coal_ore', 'kubejs:bituminous_coal')
    replaceOreDrop(event, 'geolosys:deepslate_bituminous_coal_ore', 'kubejs:bituminous_coal')

    for (let i of SAMPLE_MAP) {
        sampleNuggetLoot(event, i[0], i[1])
    }
    for (let i of COALS) {
        event.addBlock(`kubejs:${i[0]}_sample`, block => {
            block.addPool(pool => {
                pool.addItem(i[1], 1, {n: 1, p: 0.5})
            })  
        })
    }
}

function vanillaEntityLootTables(event) {
    event.modify('minecraft:elder_guardian', loot => {
        loot.clearPools()
        loot.addPool(pool => {
            pool.addEntry({
                type: 'item',
                weight: 1,
                name: 'treasurebags:treasure_bag',
                functions: [
                    {
                        function: 'treasurebags:set_bag_type',
                        type: 'custom:elder_guardian'
                    }
                ]
            })
        })
    })
    event.modify('artifacts:mimic', loot => {
        loot.clearPools()
        loot.addPool(pool => {
            pool.addEntry({
                type: 'loot_table',
                weight: 1,
                name: 'custom:loot_epic'
            })
        })
    })
}

function idasLootTables(event) {
    function idas(e, table, loot) {
        addToLootTable(e, `idas:chests/${table}`, loot, 1, 1)
    }
    idas(event, 'abandonedhouse/abandonedhouse', COMMON)
    idas(event, 'abandonedhouse/abandonedhouse_create', COMMON)
    idas(event, 'abandonedhouse/abandonedhouse_library', UNCOMMON)
    addToLootTable(event, 'idas:chests/abandonedhouse/abandonedhouse_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/abandonedhouse/abandonedhouse_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'ancient_mines/minesbasic', COMMON)
    idas(event, 'ancient_mines/minescreate', UNCOMMON)
    idas(event, 'ancient_mines/mineshall', EPIC)
    addItemToLootTable(event, 'idas:chests/ancient_mines/mineshall', 'enigmaticlegacy:golem_heart', 0.5, 1)
    idas(event, 'ancient_portal/ancient_portal_nether', RARE)
    idas(event, 'ancient_portal/ancient_portal_overworld', RARE)
    idas(event, 'ancient_statue/ancient_statue_jungle', UNCOMMON)
    idas(event, 'ancient_statue/ancient_statue_treasure_jungle', RARE)
    idas(event, 'ancient_statue/ancient_statue_treasure_desert', RARE)
    idas(event, 'ancient_statue/ancient_statue_treasure_plains', RARE)
    idas(event, 'apothecary_abode/apothecary_abode', UNCOMMON)
    idas(event, 'apothecary_abode/apothecary_abode_books', UNCOMMON)
    idas(event, 'bazaar/bazaar', COMMON)
    idas(event, 'bazaar/bazaar_food', PLENTIFUL)
    idas(event, 'bazaar/bazaar_tools', COMMON)
    idas(event, 'bearclaw_inn/bearclaw_inn_food', PLENTIFUL)
    idas(event, 'bearclaw_inn/bearclaw_inn_bedroom', COMMON)
    idas(event, 'beekeepers_house/beekeepers_food', PLENTIFUL)
    idas(event, 'beekeepers_house/beekeepers_bedroom', COMMON)
    idas(event, 'beekeepers_house/beekeepers_tools', UNCOMMON)
    idas(event, 'castle/castle', COMMON)
    idas(event, 'castle/castle_library', UNCOMMON)
    idas(event, 'castle/castle_throne', EPIC)
    idas(event, 'cottage/cottage', COMMON)
    idas(event, 'enchantingtower/enchantingtower_basic', COMMON)
    idas(event, 'enchantingtower/enchantingtower_library', UNCOMMON)
    idas(event, 'enchantingtower/enchantingtower_top', RARE)
    idas(event, 'haunted_manor/haunted_manor', COMMON)
    idas(event, 'haunted_manor/haunted_manor_tools', UNCOMMON)
    idas(event, 'haunted_manor/haunted_manor_library', UNCOMMON)
    addToLootTable(event, 'idas:chests/haunted_manor/haunted_manor_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/haunted_manor/haunted_manor_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'haunted_manor/haunted_manor_treasure', EPIC)
    idas(event, 'hauntedhouse/hauntedhouse', RARE)
    idas(event, 'labyrinth/labyrinth', UNCOMMON)
    idas(event, 'labyrinth/labyrinth_croc', RARE)
    idas(event, 'labyrinth/labyrinth_library', UNCOMMON)
    addToLootTable(event, 'idas:chests/labyrinth/labyrinth_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/labyrinth/labyrinth_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'labyrinth/labyrinth_tomb', EPIC)
    idas(event, 'labyrinth/labyrinth_treasure', LEGENDARY)
    addItemToLootTable(event, 'idas:chests/labyrinth/labyrinth_treasure', 'kubejs:pharaohs_ankh', 1, 1)
    idas(event, 'necromancers_spire/necromancers_spire', RARE)
    idas(event, 'pillager_fortress/pillager_basic', COMMON)
    idas(event, 'pillager_fortress/pillager_bedroom', UNCOMMON)
    idas(event, 'pillager_fortress/pillager_jail', RARE)
    idas(event, 'pillager_fortress/pillager_library', UNCOMMON)
    addToLootTable(event, 'idas:chests/pillager_fortress/pillager_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/pillager_fortress/pillager_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'sunken_ship/sunken_ship_supply', UNCOMMON)
    idas(event, 'sunken_ship/sunken_ship_treasure', RARE)
    addItemToLootTable(event, 'idas:chests/sunken_ship/sunken_ship_treasure', 'kubejs:soul_of_a_pirate', 0.2, 1)
    idas(event, 'tinkers_workshop/tinkers_workshop', COMMON)
    idas(event, 'tinkers_workshop/tinkers_workshop_basic', PLENTIFUL)
    idas(event, 'tinkers_workshop/tinkers_workshop_bedroom', UNCOMMON)
    idas(event, 'tinkers_workshop/tinkers_workshop_tools', RARE)
    idas(event, 'tinkers_workshop/tinkers_workshop_vault', LEGENDARY)
    idas(event, 'witches_treestump/witches_treestump', RARE)
    idas(event, 'wizardtower/wizardtower_basic', COMMON)
    idas(event, 'wizardtower/wizardtower_library', UNCOMMON)
    idas(event, 'wizardtower/wizardtower_top', RARE)
}

function minecraftLootTables(event) {
    addToLootTable(event, 'minecraft:chests/ancient_city', RARE, 0.5, 1)
    addToLootTable(event, 'minecraft:chests/ancient_city', EPIC, 0.2, 1)
    addToLootTable(event, 'minecraft:chests/ancient_city', LEGENDARY, 0.05, 1)
    addToLootTable(event, 'minecraft:chests/stronghold_library', 'custom:secret_book', 0.02, 1)
    addToLootTable(event, 'minecraft:chests/stronghold_library', 'custom:lore_book', 0.07, 1)
}

function bygoneNetherLootTables(event) {
    addToLootTable(event, 'bygonenether:chests/catacomb/treasure_rib', EPIC, 1, 1)
    addToLootTable(event, 'bygonenether:chests/citadel', EPIC, 1, 1)
}

function graveyardLootTables(event) {
    addToLootTable(event, 'graveyard:chests/crypt_loot', PLENTIFUL, 1, 1)
    addToLootTable(event, 'graveyard:chests/great_crypt_loot', EPIC, 1, 1)
    addToLootTable(event, 'graveyard:chests/large_loot', RARE, 1, 1)
    addToLootTable(event, 'graveyard:chests/medium_loot', UNCOMMON, 1, 1)
    addToLootTable(event, 'graveyard:chests/small_loot', COMMON, 1, 1)
}

function dungeonsEnhancedLootTables(event) {
    addToLootTable(event, 'dungeons_enhanced:chests/castle/armory', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/bedroom', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/cellar', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/coffin', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/library', 'custom:secret_book', 0.1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/library', 'custom:lore_book', 0.1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/quarters', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/spring', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/throne', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/deep_crypt', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/desert_tomb', COMMON, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/desert_tomb', 'kubejs:pharaohs_ankh', 0.2, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/elders_temple/elder_room', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/elders_temple/main', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/flying_dutchman', RARE, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/flying_dutchman', 'kubejs:soul_of_a_pirate', 0.33, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/ice_pit/armory', UNCOMMON, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/ice_pit/armory', 'kubejs:effervescent_snowflake', 0.33, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/jungle_monument/treasure', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/large_dungeon', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/miners_house', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/brewery', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/church', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/prison', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/treasure', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/mushroom_house', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/pillager_camp/general', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/pirate_ship', RARE, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/pirate_ship', 'kubejs:soul_of_a_pirate', 0.33, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/ruined/house', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/ruined_building', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/sunken_shrine', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/tower_of_the_undead/treasure', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/watch_tower', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/witch_tower', UNCOMMON, 1, 1)
}