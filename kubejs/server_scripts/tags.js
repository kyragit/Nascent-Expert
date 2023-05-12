ServerEvents.tags('item', event => {
    // This doesn't actually work :(
    //event.add('map_atlases:sticky_crafting_items', ['immersiveengineering:hemp_fiber']) 

    event.remove('forge:ores/nickel', ['geolosys:limonite_ore', 'geolosys:deepslate_limonite_ore'])
    event.remove('forge:ores/emerald', ['geolosys:teallite_ore', 'geolosys:deepslate_teallite_ore'])
    event.remove('forge:ores/osmium', ['geolosys:platinum_ore', 'geolosys:deepslate_platinum_ore'])
    event.add('minecraft:coals', 'kubejs:lignite_coal')
    event.add('minecraft:coals', 'kubejs:bituminous_coal')
    event.add('geolosys:supports_sample', ['immersive_weathering:permafrost', 'minecraft:packed_ice', 'minecraft:blue_ice', 'minecraft:snow_block'])
    
    event.add('custom:backpack_hides', ['quark:ravager_hide', 'cnb:yeti_hide', 'nethersdelight:hoglin_hide'])

    for (let id of Ingredient.of('#regions_unexplored:logs').getItemIds()) {
        event.add('minecraft:logs', id)
    }
    for (let id of Ingredient.of(/^regions_unexplored:.*leaves/).getItemIds()) {
        event.add('minecraft:leaves', id)
    }
    let swords = [
        'watcher_claymore',
        'storms_edge',
        'stormbringer',
        'bramblethorn',
        'watching_warglaive',
        'toxic_longsword',
        'emberblade',
        'hearthflame',
        'soulkeeper',
        'twisted_blade',
        'soulstealer',
        'soulrender',
        'soulpyre',
        'frostfall',
        'molten_edge',
        'livyatan',
        'icewhisper',
        'arcanethyst',
        'thunderbrand',
        'mjolnir',
        'slumbering_lichblade',
        'waking_lichblade',
        'awakened_lichblade',
        'shadowsting',
    ]
    for (let sword of swords) {
        event.add('custom:artifact_weapons', `simplyswords:${sword}`)
    }
    for (let color of ['white', 'black', 'red', 'cyan', 'purple']) {
        event.add('custom:lich_staves', `graveyard:${color}_bone_staff`)
    }
    event.add('custom:necklaces', [
        'relics:reflection_necklace',
        'relics:jellyfish_necklace',
        'relics:holy_locket',
        'artifacts:panic_necklace',
        'artifacts:shock_pendant',
        'artifacts:cross_necklace',
        'artifacts:thorn_pendant',
        'artifacts:charm_of_sinking',
        'artifacts:flame_pendant',
    ])
    event.add('forge:dust/saltpeter', 'immersiveengineering:dust_saltpeter')
    event.add('forge:dusts/saltpeter', 'oldguns:niter')
    event.add('forge:dust/sulfur', 'immersiveengineering:dust_sulfur')
    event.add('forge:dusts/sulfur', 'oldguns:sulfur')
    event.add('curios:belt', 'supplementaries:quiver')
    event.add('forge:elytra', ['alexsmobs:tarantula_hawk_elytra', 'enigmaticlegacy:enigmatic_elytra'])
    
    let heavy_weapons = [
        'simplyswords:iron_claymore',
        'simplyswords:iron_greathammer',
        'simplyswords:iron_greataxe',
        'simplyswords:iron_halberd',
        'simplyswords:iron_scythe',
        'simplyswords:gold_claymore',
        'simplyswords:gold_greathammer',
        'simplyswords:gold_greataxe',
        'simplyswords:gold_halberd',
        'simplyswords:gold_scythe',
        'simplyswords:diamond_claymore',
        'simplyswords:diamond_greathammer',
        'simplyswords:diamond_greataxe',
        'simplyswords:diamond_halberd',
        'simplyswords:diamond_scythe',
        'simplyswords:netherite_claymore',
        'simplyswords:netherite_greathammer',
        'simplyswords:netherite_greataxe',
        'simplyswords:netherite_halberd',
        'simplyswords:netherite_scythe',
        'simplyswords:runic_claymore',
        'simplyswords:runic_greathammer',
        'simplyswords:runic_greataxe',
        'simplyswords:runic_halberd',
        'simplyswords:runic_scythe',
        'simplyswords:watcher_claymore',
        'simplyswords:hearthflame',
        'simplyswords:soulkeeper',
        'simplyswords:twisted_blade',
        'simplyswords:soulrender',
        'simplyswords:soulpyre',
        'simplyswords:frostfall',
        'simplyswords:livyatan',
        'simplyswords:molten_edge',
        'simplyswords:icewhisper',
        'simplyswords:arcanethyst',
        'simplyswords:thunderbrand',
        'simplyswords:mjolnir',
        'simplyswords:slumbering_lichblade',
        'simplyswords:waking_lichblade',
        'simplyswords:awakened_lichblade',
        'pyromancer:iron_mace',
        'pyromancer:golden_mace',
        'pyromancer:diamond_mace',
        'pyromancer:netherite_mace',
    ]

    event.add('custom:heavy_weapons', heavy_weapons)

    event.add('forge:tools/knives', ['mahoutsukai:dagger', 'graveyard:bone_dagger'])
    event.add('custom:teeth', ['meetyourfight:mossy_tooth', 'alexsmobs:bone_serpent_tooth', 'alexsmobs:shark_tooth', 'alexsmobs:cachalot_whale_tooth', 'alexsmobs:serrated_shark_tooth'])
    event.add('custom:aircraft', ['immersive_aircraft:airship', 'immersive_aircraft:biplane', 'immersive_aircraft:gyrodyne'])
})

ServerEvents.tags('minecraft:worldgen/biome', event => {
    const PLAINS = ['byg:allium_fields', 'byg:amaranth_fields', 'byg:autumnal_valley', 'byg:coconino_meadow', 'byg:firecracker_shrubland', 'byg:prairie', 'byg:temperate_grove']
    const DESERT = ['byg:mojave_desert', 'byg:atacama_desert', 'byg:windswept_desert']
    const BEACH = ['byg:rainbow_beach', 'byg:dacite_shore', 'byg:basalt_barrera']
    const SNOWY = ['byg:cardinal_tundra', 'byg:frosted_coniferous_forest', 'byg:frosted_taiga', 'byg:shattered_glacier', 'minecraft:ice_spikes', 'minecraft:jagged_peaks', 'minecraft:snowy_beach', 'minecraft:snowy_plains']
    const JUNGLE = ['byg:crag_gardens', 'byg:guiana_shield']

    event.add('minecraft:is_savanna', ['byg:baobab_savanna', 'byg:araucaria_savanna'])
    event.add('forge:is_desert', DESERT)
    event.add('alexsmobs:spawns_white_mantis_shrimp', ['byg:bayou', 'byg:cypress_swamplands'])
    event.add('dungeons_arise:has_structure/fishing_hut_biomes', BEACH)
    event.add('dungeons_arise:has_structure/lighthouse_biomes', BEACH)
    event.add('dungeons_arise:has_structure/giant_mushroom_biomes', PLAINS)
    event.add('dungeons_arise:has_structure/illager_campsite_biomes', PLAINS)
    event.add('dungeons_arise:has_structure/illager_windmill_biomes', PLAINS)
    event.add('dungeons_arise:has_structure/merchant_campsite_biomes', PLAINS)
    event.add('dungeons_arise:has_structure/shiraz_palace_biomes', DESERT)
    event.add('dungeons_arise:has_structure/small_prairie_house_biomes', PLAINS)
    event.add('dungeons_arise:has_structure/wishing_well_biomes', PLAINS)
    event.add('dungeons_plus:has_structure/has_leviathan', DESERT)
    event.add('dungeons_plus:has_structure/has_snowy_temple', SNOWY)
    event.add('byg:has_feature/palm_trees', ['byg:rainbow_beach'])
    event.add('immersive_weathering:has_sandstorm', DESERT)
    event.add('immersive_weathering:has_lakebed', DESERT)
    event.add('immersive_weathering:underground_desert', DESERT)
    event.add('neapolitan:has_feature/strawberry_bush', PLAINS)
    event.add('structory:has_structure/jungle_well', JUNGLE)
    event.add('structory:has_structure/northern_ruin', PLAINS)
    event.add('structory:has_structure/outcast_villager_desert', DESERT)
    event.removeAll('trolldom:has_structure/air_shrine')
    event.add('yungsextras:has_structure/desert_decorations', DESERT)
    event.add('yungsextras:has_structure/vanilla_desert_well', DESERT)
    event.add('collectorsreap:pomegranate_spawns', ['byg:warped_desert', 'byg:crimson_gardens', 'incendium:inverted_forest'])
    for (let biome of event.get('minecraft:is_forest').getObjectIds()) {
        event.add('collectorsreap:lime_spawns', biome)
    }
    for (let biome of event.get('minecraft:is_mountain').getObjectIds()) {
        event.add('collectorsreap:portobello_spawns', biome)
        event.add('neapolitan:has_feature/mint_pond', biome)
    }
    for (let biome of event.get('forge:is_snowy').getObjectIds()) {
        event.add('frozenup:chilloo_spawns_in', biome)
        event.add('frozenup:penguin_spawns_in', biome)
        event.add('frozenup:reindeer_spawns_in', biome)
        event.add('frozenup:has_structure/revamped_igloo', biome)
    }
    for (let biome of event.get('minecraft:is_savanna').getObjectIds()) {
        event.add('trolldom:has_structure/air_shrine', biome)
    }
    for (let biome of event.get('forge:is_desert').getObjectIds()) {
        event.add('trolldom:has_structure/air_shrine', biome)
    }

    let addTag = function(tag, tagToAdd) {
        for (let biome of event.get(tagToAdd).getObjectIds()) {
            event.add(tag, biome)
        }
    }
    addTag('idas:has_structure/abandonedhouse_biomes', 'minecraft:is_forest')
    addTag('idas:has_structure/acacia_biomes', 'minecraft:is_savanna')
    addTag('idas:has_structure/apothecary_abode_biomes', 'forge:is_dense/overworld')
    addTag('idas:has_structure/bazaar_biomes', 'forge:is_desert')
    addTag('idas:has_structure/bearclaw_inn_biomes', 'minecraft:is_forest')
    addTag('idas:has_structure/beekeepers_house_biomes', 'forge:is_plains')
    addTag('idas:has_structure/farmhouse_biomes', 'forge:is_plains')
    addTag('idas:has_structure/farmhouse_biomes', 'minecraft:is_taiga')
    addTag('idas:has_structure/hunters_cabin_biomes', 'minecraft:is_taiga')
    addTag('idas:has_structure/pillager_fortress_biomes', 'forge:is_dense/overworld')
    addTag('idas:has_structure/polar_bear_den_biomes', 'forge:is_snowy')
    addTag('idas:has_structure/redhorn_guild_biomes', 'minecraft:is_forest')
    addTag('idas:has_structure/tinkers_workshop_biomes', 'minecraft:is_forest')
    addTag('idas:has_structure/winter_wagon_biomes', 'forge:is_snowy')
    addTag('idas:has_structure/witches_treestump_biomes', 'minecraft:is_forest')
    addTag('idas:has_structure/wizardtower_biomes', 'minecraft:is_forest')

    addTag('wabi_sabi_structures:has_structure/abandoned_small_castle', 'forge:is_plains')
    addTag('wabi_sabi_structures:has_structure/badlands_dwelling', 'minecraft:is_badlands')
    addTag('wabi_sabi_structures:has_structure/bee_farm', 'minecraft:is_forest')
    addTag('wabi_sabi_structures:has_structure/beetroot_patch', 'forge:is_swamp')
    addTag('wabi_sabi_structures:has_structure/birch_mushroom_cave', 'idas:collections/idasbirch_forests')
    addTag('wabi_sabi_structures:has_structure/candlemaker_house', 'forge:is_plateau')
    addTag('wabi_sabi_structures:has_structure/concrete_mill_ruins_desert', 'forge:is_desert')
    addTag('wabi_sabi_structures:has_structure/effigy_patch_forest', 'minecraft:is_forest')
    addTag('wabi_sabi_structures:has_structure/effigy_patch_jungle', 'minecraft:is_jungle')
    addTag('wabi_sabi_structures:has_structure/effigy_patch_savanna', 'minecraft:is_savanna')
    addTag('wabi_sabi_structures:has_structure/effigy_patch_swamp', 'forge:is_swamp')
    addTag('wabi_sabi_structures:has_structure/firewatch_tower', 'minecraft:is_forest')
    addTag('wabi_sabi_structures:has_structure/frost_reactor_plant', 'forge:is_snowy')
    addTag('wabi_sabi_structures:has_structure/gallows', 'forge:is_spooky')
    addTag('wabi_sabi_structures:has_structure/lighthouse', 'forge:is_beach')
    addTag('wabi_sabi_structures:has_structure/lighthouse', 'minecraft:is_beach')
    addTag('wabi_sabi_structures:has_structure/lost_foot', 'forge:is_beach')
    addTag('wabi_sabi_structures:has_structure/lost_foot', 'minecraft:is_beach')
    addTag('wabi_sabi_structures:has_structure/lumpy_tower', 'forge:is_peak')
    addTag('wabi_sabi_structures:has_structure/memorial_of_tonkis', 'minecraft:is_jungle')
    addTag('wabi_sabi_structures:has_structure/mossy_roof_house', 'minecraft:is_forest')
    addTag('wabi_sabi_structures:has_structure/mossy_roof_shed', 'minecraft:is_forest')
    addTag('wabi_sabi_structures:has_structure/muddy_badlands_well', 'minecraft:is_badlands')
    addTag('wabi_sabi_structures:has_structure/old_stable', 'forge:is_plains')
    addTag('wabi_sabi_structures:has_structure/old_stable', 'minecraft:is_savanna')
    addTag('wabi_sabi_structures:has_structure/old_tiny_house', 'minecraft:is_taiga')
    addTag('wabi_sabi_structures:has_structure/pumpkin_field', 'forge:is_plains')
    addTag('wabi_sabi_structures:has_structure/pumpkin_field', 'minecraft:is_savanna')
    addTag('wabi_sabi_structures:has_structure/pumpkin_patch', 'forge:is_plains')
    addTag('wabi_sabi_structures:has_structure/pumpkin_patch', 'minecraft:is_savanna')
    addTag('wabi_sabi_structures:has_structure/rot_tree', 'forge:is_dense/overworld')
    addTag('wabi_sabi_structures:has_structure/sandy_hidey_hole', 'forge:is_desert')
    addTag('wabi_sabi_structures:has_structure/small_sphinx', 'forge:is_desert')
    addTag('wabi_sabi_structures:has_structure/spider_cellar', 'minecraft:is_jungle')
    addTag('wabi_sabi_structures:has_structure/spruce_berry_farm', 'forge:is_snowy')
    addTag('wabi_sabi_structures:has_structure/spruce_cabin', 'minecraft:is_taiga')
    addTag('wabi_sabi_structures:has_structure/tall_birch_house', 'idas:collections/idasbirch_forests')
    addTag('wabi_sabi_structures:has_structure/totem_pole', 'minecraft:is_taiga')
    addTag('wabi_sabi_structures:has_structure/tree_cage', 'forge:is_swamp')
    addTag('wabi_sabi_structures:has_structure/wandering_trader_cart', 'forge:is_dense/overworld')
    addTag('wabi_sabi_structures:has_structure/water_tower_forest', 'minecraft:is_forest')
    addTag('wabi_sabi_structures:has_structure/water_tower_oak', 'forge:is_plains')
    addTag('wabi_sabi_structures:has_structure/water_tower_savanna', 'minecraft:is_savanna')
    addTag('wabi_sabi_structures:has_structure/water_tower_spruce', 'minecraft:is_taiga')
    addTag('wabi_sabi_structures:has_structure/wheat_patch', 'forge:is_plains')
    addTag('wabi_sabi_structures:has_structure/wheat_patch', 'minecraft:is_savanna')

    addTag('cutehermitcrabs:hermit_crab_spawnable_biomes', 'forge:is_beach')
    addTag('cutehermitcrabs:hermit_crab_spawnable_biomes', 'minecraft:is_beach')

    addTag('structory:has_structure/firetower', 'minecraft:is_forest')
    addTag('structory:has_structure/jungle_well', 'minecraft:is_jungle')
    addTag('structory:has_structure/outcast_villager_desert', 'forge:is_desert')
    addTag('structory:has_structure/outcast_villager_grassy', 'forge:is_plains')

    addTag('towns_and_towers:has_structure/pillager_outpost_badlands', 'minecraft:is_badlands')
    addTag('towns_and_towers:has_structure/pillager_outpost_beach', 'minecraft:is_beach')
    addTag('towns_and_towers:has_structure/pillager_outpost_beach', 'forge:is_beach')
    addTag('towns_and_towers:has_structure/pillager_outpost_desert', 'forge:is_desert')
    addTag('towns_and_towers:has_structure/pillager_outpost_forest', 'minecraft:is_forest')
    addTag('towns_and_towers:has_structure/pillager_outpost_jungle', 'minecraft:is_jungle')
    addTag('towns_and_towers:has_structure/pillager_outpost_savanna', 'minecraft:is_savanna')
    addTag('towns_and_towers:has_structure/pillager_outpost_snowy', 'forge:is_snowy')
    addTag('towns_and_towers:has_structure/pillager_outpost_swamp', 'forge:is_swamp')
    addTag('towns_and_towers:has_structure/pillager_outpost_taiga', 'minecraft:is_taiga')
    addTag('towns_and_towers:has_structure/village_badlands_pueblo', 'minecraft:is_badlands')
    addTag('towns_and_towers:has_structure/village_forest_ruins', 'minecraft:is_forest')
    addTag('towns_and_towers:has_structure/village_jungle_tribal', 'minecraft:is_jungle')
    addTag('towns_and_towers:has_structure/village_swamp_boat', 'forge:is_swamp')
})

ServerEvents.tags('block', event => {
    event.remove('forge:bookshelves', ['quark:crimson_bookshelf', 'quark:warped_bookshelf'])
})

ServerEvents.tags('minecraft:entity_type', event => {
    event.add('custom:player_dummy', ['minecraft:player'])
    event.add('custom:zombie_dummy', ['minecraft:zombie'])
    event.add('custom:skeleton_dummy', ['minecraft:skeleton'])
    event.add('custom:wraith_dummy', ['quark:wraith', 'goety:wraith', 'graveyard:wraith'])
})