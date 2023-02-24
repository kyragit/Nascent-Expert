const ITEMS = [
    'meetyourfight:fossil_bait',
    'meetyourfight:haunted_bell',
    'meetyourfight:devils_ante',
    'mahoutsukai:mortar_and_pestle',
    'mahoutsukai:mortar',
    'mahoutsukai:pestle',
    'mahoutsukai:hammer',
    'createaddition:diamond_grit',
    'farmersdelight:carrot_crate',
    'farmersdelight:potato_crate',
    'farmersdelight:beetroot_crate',
    'nomadictents:rigid_dirt',
    'nomadictents:yurt_wall',
    'nomadictents:yurt_roof',
    'nomadictents:bedouin_wall',
    'nomadictents:bedouin_roof',
    'nomadictents:indlu_wall',
    'simplyswords:brimstone_claymore',
    'structure_gel:red_gel',
    'structure_gel:blue_gel',
    'structure_gel:green_gel',
    'structure_gel:cyan_gel',
    'structure_gel:orange_gel',
    'structure_gel:yellow_gel',
    'structure_gel:data_handler',
    'structure_gel:dynamic_spawner',
    'structure_gel:building_tool',
    'quark:backpack',
    'paraglider:heart_container',
    'paraglider:stamina_vessel',
    'paraglider:spirit_orb',
    'paraglider:anti_vessel',
    'paraglider:essence',
    'paraglider:goddess_statue',
    'paraglider:kakariko_goddess_statue',
    'paraglider:goron_goddess_statue',
    'paraglider:rito_goddess_statue',
    'paraglider:horned_statue',
    'campanion:rope_bridge_planks',
]

const TEPEE_WALLS = [
    'blank',
    'channel',
    'creeper',
    'dreamcatcher',
    'eagle',
    'golem',
    'hope',
    'magic',
    'radial',
    'rain',
    'space',
    'sun',
    'triforce',
    'wedge',
    'zigzag',
]

const COLORS = [
    'black',
    'blue',
    'green',
    'red',
    'yellow',
    'lime',
    'orange',
    'magenta',
    'purple',
    'white',
    'pink',
    'brown',
    'gray',
    'light_gray',
    'cyan',
    'light_blue',
]

const GEOLOSYS_ORES = [
    'ancient_debris',
    'nether_gold',
    'autunite',
    'anthracite_coal',
    'sphalerite',
    'teallite',
    'bauxite',
    'quartz',
    'galena',
    'hematite',
    'cassiterite',
    'cinnabar',
    'malachite',
    'gold',
    'platinum',
    'azurite',
    'beryl',
    'limonite',
    'kimberlite',
    'coal',
    'lapis',
    'lignite',
    'bituminous_coal',
]

const GEOLOSYS_MATS = [
    'aluminum',
    'lead',
    'nickel',
    'platinum',
    'silver',
    'tin',
    'zinc',
]

JEIEvents.hideItems(event => {
    for (let item of ITEMS) {
        event.hide(item)
    }
    for (let wall of TEPEE_WALLS) {
        event.hide(`nomadictents:${wall}_tepee_wall`)
    }
    for (let color of COLORS) {
        event.hide(`nomadictents:${color}_shamiyana_wall`)
    }
    for (let ore of GEOLOSYS_ORES) {
        event.hide(`geolosys:${ore}_ore_sample`)
    }
    for (let mat of GEOLOSYS_MATS) {
        event.hide(`geolosys:${mat}_ingot`)
        event.hide(`geolosys:${mat}_nugget`)
        event.hide(`geolosys:${mat}_cluster`)
    }
    event.hide('geolosys:copper_nugget')
    event.hide('geolosys:ancient_debris_cluster')
    event.hide('geolosys:copper_cluster')
    event.hide('geolosys:gold_cluster')
    event.hide('geolosys:iron_cluster')
    event.hide('geolosys:nether_gold_cluster')
    event.hide('geolosys:osmium_cluster')
    event.hide('geolosys:uranium_cluster')
    event.hide('geolosys:anthracite_coal')
    event.hide('geolosys:lignite_coal')
    event.hide('geolosys:bituminous_coal')
    event.hide('geolosys:lignite_coal_coke')
    event.hide('geolosys:bituminous_coal_coke')
    event.hide('geolosys:peat_coal')
    event.hide('geolosys:peat')
    event.hide('geolosys:rhododendron')
    event.hide('geolosys:prospectors_pick')
    event.hide('#fantasyfurniture:craftable')
})

JEIEvents.information(event => {
    event.addItem('create:crimsite', 'Can be generated when water touches a lava source block with an iron block underneath.')
    event.addItem('minecraft:amethyst_block', 'Can be generated when water touches a lava source block with a diamond block on the side.')
    event.addItem('create:veridium', 'Can be generated when water touches flowing lava with a block of corundum underneath.')
    event.addItem('minecraft:tuff', 'Can be generated when water touches flowing lava with a budding amethyst block underneath.')
    event.addItem('minecraft:netherrack', 'Can be generated in a hot biome when water touches flowing lava with a magma block underneath.')
    event.addItem('create:scoria', 'Can be generated in a hot biome when water touches flowing lava with bedrock underneath.')
    event.addItem('create:scorchia', 'Can be generated in a cold biome when water touches flowing lava with bedrock underneath.')
    event.addItem('create:asurine', 'Can be generated in a cold biome when water touches flowing lava with a block of blue ice underneath.')
    event.addItem('create:ochrum', 'Can be generated in a desert biome when water touches flowing lava with ochrum on all sides except underneath.')
    event.addItem('minecraft:andesite', 'Can be generated when lava touches a water source block with andesite underneath.')
    event.addItem('create:limestone', 'Can be generated when lava touches a water source block with limestone on the side.')
    event.addItem('minecraft:calcite', 'Can be generated when lava touches a water source block with a bone block underneath.')
    event.addItem('minecraft:dripstone_block', 'Can be generated in a dripstone caves biome when lava touches a water source block.')
    event.addItem('minecraft:diorite', 'Can be generated when water touches flowing lava next to a block of diorite and a block of quartz.')
    event.addItem('minecraft:granite', 'Can be generated when water touches flowing lava with granite above and below it.')
    event.addItem('byg:soapstone', 'Can be generated in a cold biome when water touches flowing lava with clay underneath.')
    event.addItem('byg:pink_sandstone', 'Can be generated in an ocean biome when water touches flowing lava with glowstone underneath.')

    event.addItem('hexcasting:amethyst_dust', 'Can be created by exploding amethyst shards.')
    event.addItem('kubejs:star_of_quintessence', 'Can be powderized with an explosion.')
    event.addItem('create:andesite_alloy', 'They say that with enough determination, anything is possible...')
    event.addItem('endrem:nether_eye', 'In the nether, right click a block of netherite with an eye of ender while having the blessing of a fire shrine.')
    event.addItem('endrem:undead_eye', 'Give a zombie villager an eye of ender.')
    event.addItem('endrem:guardian_eye', 'Right click a guardian with an eye of ender while having the blessing of a water shrine.')

    event.addItem('kubejs:mark_of_the_accursed', [Text.string('Equip an item with the ').append(Text.red('Curse of Binding')).append('.').component()])
    event.addItem('kubejs:eye_of_revelation', [Text.string('Decrypt the ').append(Text.green('writings of the ancients')).append('.').component()])
})

ItemEvents.tooltip(event => {
    event.addAdvanced('gateways:gate_pearl', (item, advanced, text) => {
        if (item.nbtString.includes('custom:wither')) {
            text.add(Text.darkRed('Warning: very destructive!'))
        }
    })
})