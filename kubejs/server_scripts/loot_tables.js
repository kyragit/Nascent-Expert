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
    event.addLootTableModifier(/.*/).removeLoot('minecraft:ender_eye')
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

    event.addGeneric('custom:overworld_valuable', loot => {
        loot.addPool(pool => {
            for (let item of OVERWORLD_VALUABLE) {
                pool.addItem(item[0], item[1], 1)
            }
            for (let potion of VALUABLE_CHARMS) {
                pool.addItem(Item.of('apotheosis:potion_charm', `{Potion:"${potion[0]}",Unbreakable:${potion[1] ? '1b' : '0b'}}`), potion[2], 1)
            }
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
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_barrels', PLENTIFUL)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_normal', COMMON)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_treasure', EPIC)
    dungeonsAriseLoot(event, 'illager_galley/illager_galley_treasure', RARE)
    dungeonsAriseLoot(event, 'illager_windmill/illager_windmill_barrels', COMMON)
    dungeonsAriseLoot(event, 'illager_windmill/illager_windmill_treasure', EPIC)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_top_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/infested_temple/infested_temple_top_treasure', 'simplyswords:bramblethorn', 0.17, 1)
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
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_library_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure', 'simplyswords:soulpyre', 0.25, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_garden_normal', RARE)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_normal', 'enigmaticlegacy:animal_guidebook', 0.2, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_garden_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure', 'simplyswords:soulpyre', 0.5, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure', 'enigmaticlegacy:animal_guidebook', 0.5, 1)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_normal', COMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_rooms', UNCOMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_library', RARE)
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
    addToLootTable(event, 'betterdeserttemples:chests/pharaoh_hidden', LEGENDARY, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/statue', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/storage', PLENTIFUL, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/tomb', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/tomb_pharaoh', EPIC, 1, 1)
}

function dugeonsPlusLootTables(event) {
    addToLootTable(event, 'dungeons_plus:chests/leviathan/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/leviathan/rare', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/snowy_temple/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/snowy_temple/rare', EPIC, 1, 1)
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
}