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
    event.add('neapolotan:has_feature/strawberry_bush', PLAINS)
    event.add('structory:has_structure/jungle_well', JUNGLE)
    event.add('structory:has_structure/northern_ruin', PLAINS)
    event.add('structory:has_structure/outcast_villager_desert', DESERT)
    event.removeAll('trolldom:has_structure/air_shrine')
    event.add('trolldom:has_structure/air_shrine', DESERT.concat(['byg:baobab_savanna', 'byg:araucaria_savanna', 'minecraft:savanna']))
    event.add('yungsextras:has_structure/desert_decorations', DESERT)
    event.add('yungsextras:has_structure/vanilla_desert_well', DESERT)
    event.add('collectorsreap:pomegranate_spawns', ['byg:warped_desert', 'byg:crimson_gardens', 'incendium:inverted_forest'])
    for (let biome of event.get('minecraft:is_forest').getObjectIds()) {
        event.add('collectorsreap:lime_spawns', biome)
    }
    for (let biome of event.get('minecraft:is_mountain').getObjectIds()) {
        event.add('collectorsreap:portobello_spawns', biome)
    }
})

ServerEvents.tags('block', event => {
    event.remove('forge:bookshelves', ['quark:crimson_bookshelf', 'quark:warped_bookshelf'])
})