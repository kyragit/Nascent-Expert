ServerEvents.tags('item', event => {
    event.add('map_atlases:sticky_crafting_items', ['immersiveengineering:hemp_fiber'])

    // const STICKY = ['alexsmobs:komodo_spit_bottle', 'alexsmobs:banana_slug_slime_block']
    // const LIQUID = ['alexsmobs:fish_oil', 'alexsmobs:poison_bottle']
    // const BINDING_NETHER = ['alexsmobs:blood_sac', 'alexsmobs:soul_heart']
    // const SKIN = ['alexsmobs:tarantula_hawk_wing_fragment', 'alexsmobs:shed_snake_skin']

    // const BONE = ['alexsmobs:moose_antler', 'alexsmobs:cachalot_whale_tooth', 'alexsmobs:serrated_shark_tooth', 'alexsmobs:gazelle_horn']
    // const ALLOY_NETHER = ['alexsmobs:dropbear_claw', 'alexsmobs:bone_serpent_tooth', 'alexsmobs:straddlite']
    // const HIDE = ['alexsmobs:spiked_scute', 'alexsmobs:kangaroo_hide', 'alexsmobs:crocodile_scute', 'minecraft:scute']
    // const GEM = ['alexsmobs:guster_eye']

    // for (let item of STICKY) {
    //     event.add('forge:natural_binding_sticky', item)
    // }
    // for (let item of LIQUID) {
    //     event.add('forge:natural_binding_liquid', item)
    // }
    // for (let item of BINDING_NETHER) {
    //     event.add('forge:natural_binding_nether', item)
    // }
    // for (let item of SKIN) {
    //     event.add('forge:natural_binding_skin', item)
    // }

    // for (let item of BONE) {
    //     event.add('forge:natural_alloy_bone', item)
    // }
    // for (let item of ALLOY_NETHER) {
    //     event.add('forge:natural_alloy_nether', item)
    // }
    // for (let item of HIDE) {
    //     event.add('forge:natural_alloy_hide', item)
    // }
    // for (let item of GEM) {
    //     event.add('forge:natural_alloy_gem', item)
    // }

    event.add('savage_and_ravage:explosion_immune', 'treasurebags:treasure_bag')
    event.add('savage_and_ravage:explosion_immune', 'gateways:gate_pearl')

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
})

ServerEvents.tags('block', event => {
    event.remove('forge:bookshelves', ['quark:crimson_bookshelf', 'quark:warped_bookshelf'])
})