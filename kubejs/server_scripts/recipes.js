ServerEvents.recipes(event => {
    vanillaRecipes(event)
    createRecipes(event)
    createAdditionsRecipes(event)
    hexcastingRecipes(event)
    smallShipsRecipes(event)
    mahouTsukaiRecipes(event)
    immersiveEngineeringRecipes(event)
    sophisticatedBackpacksRecipes(event)
    dimDungeonsRecipes(event)
    gatewayRecipes(event)
    littleLogisticsRecipes(event)
    apotheosisRecipes(event)
    archersParadoxRecipes(event)
    miscRemovals(event)
    kubejsRecipes(event)
    simpleStorageRecipes(event)
    paragliderRecipes(event)
    immersiveAircraftRecipes(event)
    aquacultureRecipes(event)
    chunkLoaderRecipes(event)
    endRemRecipes(event)
    davesPotioneeringRecipes(event)
    enchantableStaffsRecipes(event)
    enigmaticLegacyRecipes(event)
    oldGunsRecipes(event)
    spelunkeryRecipes(event)
    coinRecipes(event)
    goetyRecipes(event)
})

//const HiddenRecipe = Java.loadClass('com.aizistral.enigmaticlegacy.crafting.HiddenRecipe')
//
//ServerEvents.recipes(event => {
//    HiddenRecipe.addRecipe(
//        Item.of('minecraft:dandelion'), 
//        [
//            Item.of('minecraft:dirt'), Item.of('minecraft:dirt'), Item.of('minecraft:dirt'),
//            Item.of('minecraft:dirt'), Item.of('minecraft:dirt'), Item.of('minecraft:dirt'), 
//            Item.of('minecraft:dirt'), Item.of('minecraft:dirt'), Item.of('minecraft:dirt')
//        ]
//    )
//})

// Blow up amethyst shards to get amethyst dust
LevelEvents.afterExplosion(event => {
    for (let entity of event.affectedEntities) {
        if (entity.item != null) {
            if (entity.item.id == 'minecraft:amethyst_shard') {
                entity.block.popItem(`${entity.item.count * 2}x hexcasting:amethyst_dust`)
            }
            if (entity.item.id == 'kubejs:star_of_quintessence') {
                entity.block.popItem(`${entity.item.count}x kubejs:powdered_determination`)
            }
            if (entity.item.id == 'treasurebags:treasure_bag' || entity.item.id == 'gateways:gate_pearl') {
                event.removeAffectedEntity(entity)
            }
        }
    }
})

function createRecipes(event) {
    const CREATE_STONES = [
        'crimsite',
        'veridium',
    ]

    for (let stone of CREATE_STONES) {
        event.remove({id:`create:crushing/${stone}_recycling`})
        event.remove({id:`create:crushing/${stone}`})
    }

    event.remove({id:'create:crafting/palettes/scorchia'})
    event.remove({id:'create:smelting/scoria'})

    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'create:crimsite'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.65,
                item: 'create:crushed_raw_iron'
            },
            {
                item: 'minecraft:iron_nugget'
            },
            {
                chance: 0.5,
                item: 'minecraft:iron_nugget'
            },
            {
                chance: 0.01,
                item: 'minecraft:diamond'
            }
        ]
    }).id('kubejs:crimsite_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'byg:pink_sandstone'
            }
        ],
        processingTime: 400,
        results: [
            {
                item: 'byg:pink_sand'
            },
            {
                chance: 0.5,
                item: 'byg:pink_sand'
            }
        ]
    }).id('kubejs:pink_sandstone_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'create:veridium'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.2,
                item: 'create:crushed_raw_copper'
            },
            {
                chance: 0.2,
                item: 'create:copper_nugget'
            }
        ]
    }).id('kubejs:veridium_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'create:scoria'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.2,
                item: 'create:crushed_raw_nickel'
            },
            {
                chance: 0.2,
                item: 'immersiveengineering:nugget_nickel'
            }
        ]
    }).id('kubejs:scoria_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'byg:soapstone'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.2,
                item: 'create:crushed_raw_lead'
            },
            {
                chance: 0.2,
                item: 'immersiveengineering:nugget_lead'
            },
            {
                chance: 0.1,
                item: 'create:crushed_raw_silver'
            },
            {
                chance: 0.1,
                item: 'immersiveengineering:nugget_silver'
            }
        ]
    }).id('kubejs:soapstone_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'create:scorchia'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.2,
                item: 'create:crushed_raw_aluminum'
            },
            {
                chance: 0.2,
                item: 'immersiveengineering:nugget_aluminum'
            },
            {
                chance: 0.05,
                item: 'create:crushed_raw_uranium'
            }
        ]
    }).id('kubejs:scorchia_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'minecraft:calcite'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.2,
                item: 'minecraft:bone_meal'
            }
        ]
    }).id('kubejs:calcite_crushing')
    event.remove({id:'create:crushing/prismarine_crystals'})
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'minecraft:prismarine_crystals'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.5,
                item: 'minecraft:prismarine_shard'
            },
            {
                chance: 0.1,
                item: 'minecraft:glowstone_dust'
            }
        ]
    }).id('kubejs:prismarine_crystals_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'minecraft:magma_block'
            }
        ],
        processingTime: 400,
        results: [
            {
                count: 3,
                item: 'minecraft:magma_cream'
            },
            {
                chance: 0.5,
                item: 'minecraft:magma_cream'
            }
        ]
    }).id('kubejs:magma_block_crushing')
    event.remove({id:'create:crushing/tuff'})
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'minecraft:tuff'
            }
        ],
        processingTime: 400,
        results: [
            {
                chance: 0.1,
                item: 'minecraft:iron_nugget'
            },
            {
                chance: 0.1,
                item: 'minecraft:gold_nugget'
            },
            {
                chance: 0.1,
                item: 'create:copper_nugget'
            },
            {
                chance: 0.1,
                item: 'create:zinc_nugget'
            },
            {
                chance: 0.1,
                item: 'immersiveengineering:nugget_silver'
            },
            {
                chance: 0.1,
                item: 'immersiveengineering:nugget_lead'
            },
            {
                chance: 0.1,
                item: 'immersiveengineering:nugget_nickel'
            }
        ]
    }).id('kubejs:tuff_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'create:crushed_raw_aluminum'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'immersiveengineering:dust_aluminum'
            }
        ]
    }).id('kubejs:crushed_aluminum_crushing')
    event.custom({
        type: 'create:crushing',
        ingredients: [
            {
                item: 'immersiveengineering:ingot_aluminum'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'immersiveengineering:dust_aluminum'
            }
        ]
    }).id('kubejs:aluminum_ingot_crushing')

    const CRUSHED_ORES = [
        'iron',
        'gold',
        'copper',
        'zinc',
    ]
    const CRUSHED_IE_ORES = [
        'silver',
        'lead',
        'nickel',
        'aluminum',
        'uranium',
    ]
    for (let ore of CRUSHED_ORES) {
        event.remove({id:`create:splashing/crushed_raw_${ore}`})
    }
    for (let ore of CRUSHED_IE_ORES) {
        event.remove({id:`create:splashing/immersiveengineering/crushed_raw_${ore}`})
    }
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_iron'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_iron'
            },
            {
                count: 3,
                item: 'minecraft:iron_nugget'
            },
            {
                chance: 0.3333,
                item: 'minecraft:iron_nugget'
            },
            {
                chance: 0.1,
                item: 'minecraft:redstone'
            }
        ]
    }).id('kubejs:crushed_iron_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_gold'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_gold'
            },
            {
                count: 3,
                item: 'minecraft:gold_nugget'
            },
            {
                chance: 0.3333,
                item: 'minecraft:gold_nugget'
            },
            {
                chance: 0.1,
                item: 'minecraft:quartz'
            }
        ]
    }).id('kubejs:crushed_gold_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_copper'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_copper'
            },
            {
                count: 3,
                item: 'create:copper_nugget'
            },
            {
                chance: 0.3333,
                item: 'create:copper_nugget'
            },
            {
                chance: 0.1,
                item: 'minecraft:clay_ball'
            },
            {
                chance: 0.1,
                item: 'minecraft:lapis_lazuli'
            }
        ]
    }).id('kubejs:crushed_copper_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_zinc'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_zinc'
            },
            {
                count: 3,
                item: 'create:zinc_nugget'
            },
            {
                chance: 0.3333,
                item: 'create:zinc_nugget'
            },
            {
                chance: 0.1,
                item: 'immersiveengineering:dust_saltpeter'
            }
        ]
    }).id('kubejs:crushed_zinc_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_silver'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_silver'
            },
            {
                count: 3,
                item: 'immersiveengineering:nugget_silver'
            },
            {
                chance: 0.3333,
                item: 'immersiveengineering:nugget_silver'
            },
            {
                chance: 0.1,
                item: 'immersiveengineering:dust_sulfur'
            }
        ]
    }).id('kubejs:crushed_silver_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_lead'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_lead'
            },
            {
                count: 3,
                item: 'immersiveengineering:nugget_lead'
            },
            {
                chance: 0.3333,
                item: 'immersiveengineering:nugget_lead'
            },
            {
                chance: 0.6666,
                item: 'immersiveengineering:nugget_silver'
            }
        ]
    }).id('kubejs:crushed_lead_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_nickel'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_nickel'
            },
            {
                count: 3,
                item: 'immersiveengineering:nugget_nickel'
            },
            {
                chance: 0.3333,
                item: 'immersiveengineering:nugget_nickel'
            },
            {
                chance: 0.6666,
                item: 'minecraft:iron_nugget'
            }
        ]
    }).id('kubejs:crushed_nickel_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_aluminum'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_aluminum'
            },
            {
                count: 3,
                item: 'immersiveengineering:nugget_aluminum'
            },
            {
                chance: 0.3333,
                item: 'immersiveengineering:nugget_aluminum'
            },
            {
                chance: 0.1,
                item: 'minecraft:emerald'
            }
        ]
    }).id('kubejs:crushed_aluminum_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'create:crushed_raw_uranium'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'create:crushed_raw_uranium'
            },
            {
                count: 3,
                item: 'immersiveengineering:nugget_uranium'
            },
            {
                chance: 0.3333,
                item: 'immersiveengineering:nugget_uranium'
            }
        ]
    }).id('kubejs:crushed_uranium_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'byg:blue_sand'
            }
        ],
        results: [
            {
                chance: 0.6666,
                item: 'minecraft:lapis_lazuli'
            }
        ]
    }).id('kubejs:blue_sand_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'byg:purple_sand'
            }
        ],
        results: [
            {
                chance: 0.1,
                item: 'minecraft:lapis_lazuli'
            },
            {
                chance: 0.1,
                item: 'hexcasting:amethyst_dust'
            },
            {
                chance: 0.01,
                item: 'minecraft:diamond'
            }
        ]
    }).id('kubejs:purple_sand_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'byg:white_sand'
            }
        ],
        results: [
            {
                chance: 0.5,
                item: 'minecraft:bone_meal'
            },
            {
                chance: 0.05,
                item: 'minecraft:bone'
            }
        ]
    }).id('kubejs:white_sand_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'byg:windswept_sand'
            }
        ],
        results: [
            {
                chance: 0.5,
                item: 'minecraft:redstone'
            },
            {
                chance: 0.1,
                item: 'create:rose_quartz'
            },
            {
                chance: 0.05,
                item: 'minecraft:emerald'
            }
        ]
    }).id('kubejs:windswept_sand_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'byg:black_sand'
            }
        ],
        results: [
            {
                chance: 0.2,
                item: 'create:rose_quartz'
            }
        ]
    }).id('kubejs:black_sand_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'byg:quartzite_sand'
            }
        ],
        results: [
            {
                chance: 0.5,
                item: 'minecraft:quartz'
            }
        ]
    }).id('kubejs:quartzite_sand_washing')
    event.custom({
        type: 'create:splashing',
        ingredients: [
            {
                item: 'byg:pink_sand'
            }
        ],
        results: [
            {
                chance: 0.5,
                item: 'minecraft:redstone'
            },
            {
                chance: 0.1,
                item: 'hexcasting:amethyst_dust'
            },
            {
                chance: 0.03,
                item: 'minecraft:amethyst_shard'
            },
            {
                chance: 0.1,
                item: 'minecraft:glowstone_dust'
            }
        ]
    }).id('kubejs:pink_sand_washing')

    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'create:asurine'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'byg:blue_sand'
            }
        ]
    }).id('kubejs:asurine_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'create:crimsite'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'byg:purple_sand'
            }
        ]
    }).id('kubejs:crimsite_milling')
    event.remove({id:'create:milling/calcite'})
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'minecraft:calcite'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'byg:white_sand'
            }
        ]
    }).id('kubejs:calcite_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'byg:pink_sandstone'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'byg:pink_sand'
            }
        ]
    }).id('kubejs:pink_sandstone_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'create:scorchia'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'byg:black_sand'
            }
        ]
    }).id('kubejs:scorchia_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'create:scoria'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'byg:windswept_sand'
            }
        ]
    }).id('kubejs:scoria_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'minecraft:diorite'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'byg:quartzite_sand'
            }
        ]
    }).id('kubejs:diorite_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'minecraft:brick'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'kubejs:ceramic_dust'
            }
        ]
    }).id('kubejs:brick_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'create:limestone'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'kubejs:lime'
            }
        ]
    }).id('kubejs:limestone_milling')
    event.custom({
        type: 'create:milling',
        ingredients: [
            {
                item: 'minecraft:netherrack'
            }
        ],
        processingTime: 250,
        results: [
            {
                item: 'create:cinder_flour'
            }
        ]
    }).id('kubejs:cinder_flour_milling')

    event.remove({id:'create:mixing/andesite_alloy_from_zinc'})
    event.remove({id:'create:mixing/andesite_alloy'})
    event.custom({
        type: 'create:compacting',
        ingredients: [
            {
                item: 'minecraft:andesite'
            },
            {
                item: 'minecraft:andesite'
            },
            {
                item: 'minecraft:andesite'
            },
            {
                item: 'minecraft:andesite'
            },
            {
                item: 'minecraft:iron_ingot'
            },
            {
                item: 'create:zinc_ingot'
            }
        ],
        results: [
            {
                item: 'create:andesite_alloy'
            }
        ]
    }).id('kubejs:andesite_alloy_compacting')
    event.remove({id:'create:item_application/andesite_casing_from_log'})
    event.remove({id:'create:item_application/andesite_casing_from_log_using_deployer'})
    event.remove({id:'create:item_application/andesite_casing_from_wood'})
    event.remove({id:'create:item_application/andesite_casing_from_wood_using_deployer'})
    event.remove({id:'create:item_application/brass_casing_from_log'})
    event.remove({id:'create:item_application/brass_casing_from_log_using_deployer'})
    event.remove({id:'create:item_application/brass_casing_from_wood'})
    event.remove({id:'create:item_application/brass_casing_from_wood_using_deployer'})
    event.remove({id:'create:item_application/copper_casing_from_log'})
    event.remove({id:'create:item_application/copper_casing_from_log_using_deployer'})
    event.remove({id:'create:item_application/copper_casing_from_wood'})
    event.remove({id:'create:item_application/copper_casing_from_wood_using_deployer'})
    event.custom({
        type: 'create:compacting',
        ingredients: [
            {
                item: 'create:andesite_alloy'
            },
            {
                item: 'create:andesite_alloy'
            },
            {
                item: 'create:andesite_alloy'
            },
            {
                tag: 'forge:stripped_logs'
            },
            {
                tag: 'forge:stripped_logs'
            },
            {
                tag: 'forge:stripped_logs'
            },
            {
                item: 'create:copper_sheet'
            },
            {
                item: 'immersiveengineering:plate_lead'
            },
            {
                item: 'create:iron_sheet'
            }
        ],
        results: [
            {
                item: 'create:andesite_casing'
            }
        ]
    }).id('kubejs:andesite_casing_compacting')
    event.custom({
        type: 'create:compacting',
        ingredients: [
            {
                item: 'create:andesite_casing'
            },
            {
                item: 'minecraft:copper_block'
            },
            {
                item: 'minecraft:copper_block'
            }
        ],
        results: [
            {
                item: 'create:copper_casing'
            }
        ]
    }).id('kubejs:copper_casing_compacting')
    event.custom({
        type: 'create:compacting',
        ingredients: [
            {
                item: 'minecraft:slime_block'
            },
            {
                amount: 1000,
                fluid: 'minecraft:lava'
            }
        ],
        results: [
            {
                item: 'minecraft:magma_block'
            }
        ]
    }).id('kubejs:magma_block_compacting')

    event.shaped(
        'create:mechanical_press',
        [
            ' S ',
            'DWD',
            ' I '
        ],
        {
            S: 'create:shaft',
            D: 'minecraft:diamond',
            W: '#minecraft:logs',
            I: 'minecraft:iron_block'
        }
    ).id('kubjes:mechanical_press_expensive')

    event.remove({id:'create:crafting/materials/rose_quartz'})
    event.remove({id:'create:crafting/materials/electron_tube'})

    event.remove({id:'create:mixing/brass_ingot'})
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'superheated',
        ingredients: [
            {
                item: 'minecraft:copper_ingot'
            }
        ],
        results: [
            {
                amount: 144,
                fluid: 'kubejs:molten_copper'
            }
        ]
    }).id('kubejs:copper_melting')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'superheated',
        ingredients: [
            {
                item: 'create:zinc_ingot'
            }
        ],
        results: [
            {
                amount: 144,
                fluid: 'kubejs:molten_zinc'
            }
        ]
    }).id('kubejs:zinc_melting')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'superheated',
        ingredients: [
            {
                item: 'minecraft:iron_ingot'
            }
        ],
        results: [
            {
                amount: 144,
                fluid: 'kubejs:molten_iron'
            }
        ]
    }).id('kubejs:iron_melting')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'superheated',
        ingredients: [
            {
                item: 'immersiveengineering:ingot_lead'
            }
        ],
        results: [
            {
                amount: 144,
                fluid: 'kubejs:molten_lead'
            }
        ]
    }).id('kubejs:lead_melting')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'superheated',
        ingredients: [
            {
                item: 'create:brass_ingot'
            }
        ],
        results: [
            {
                amount: 144,
                fluid: 'kubejs:molten_brass'
            }
        ]
    }).id('kubejs:brass_melting')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'superheated',
        ingredients: [
            {
                item: 'immersiveengineering:ingot_steel'
            }
        ],
        results: [
            {
                amount: 144,
                fluid: 'kubejs:molten_steel'
            }
        ]
    }).id('kubejs:steel_melting')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'heated',
        ingredients: [
            {
                amount: 16,
                fluid: 'kubejs:molten_copper'
            },
            {
                amount: 16,
                fluid: 'kubejs:molten_zinc'
            }
        ],
        results: [
            {
                amount: 16,
                fluid: 'kubejs:molten_brass'
            }
        ]
    }).id('kubejs:molten_brass_mixing')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'heated',
        ingredients: [
            {
                amount: 16,
                fluid: 'kubejs:molten_iron'
            },
            {
                amount: 16,
                fluid: 'kubejs:molten_lead'
            }
        ],
        results: [
            {
                amount: 16,
                fluid: 'kubejs:molten_mixed_metal'
            }
        ]
    }).id('kubejs:molten_mixed_metal_mixing')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                amount: 16,
                fluid: 'kubejs:molten_mixed_metal'
            },
            {
                item: 'create:andesite_alloy'
            },
            {
                tag: 'forge:stripped_logs'
            }
        ],
        results: [
            {
                item: 'create:andesite_casing'
            }
        ]
    }).id('kubejs:andesite_casing_mixing')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'heated',
        ingredients: [
            {
                item: 'minecraft:quartz'
            },
            {
                item: 'minecraft:redstone_block'
            }
        ],
        results: [
            {
                item: 'create:rose_quartz'
            }
        ]
    }).id('kubejs:rose_quartz_mixing')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'minecraft:andesite'
            },
            {
                amount: 16,
                fluid: 'kubejs:molten_iron'
            },
            {
                amount: 16,
                fluid: 'kubejs:molten_zinc'
            }
        ],
        results: [
            {
                item: 'create:andesite_alloy'
            }
        ]
    }).id('kubejs:andesite_alloy_mixing')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'create:rose_quartz'
            },
            {
                tag: 'forge:sand'
            },
            {
                tag: 'forge:sand'
            },
            {
                tag: 'forge:sand'
            },
            {
                tag: 'forge:sand'
            }
        ],
        results: [
            {
                item: 'create:polished_rose_quartz'
            }
        ]
    }).id('kubejs:polished_rose_quartz_mixing')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'byg:quartzite_sand'
            },
            {
                item: 'immersiveengineering:dust_aluminum'
            },
            {
                item: 'kubejs:ceramic_dust'
            }
        ],
        results: [
            {
                item: 'kubejs:high_temperature_ceramic_dust'
            }
        ]
    }).id('kubejs:high_temp_ceramic_mixing')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                tag: 'forge:sand'
            },
            {
                tag: 'forge:sand'
            },
            {
                tag: 'forge:sand'
            },
            {
                tag: 'forge:sand'
            },
            {
                item: 'kubejs:lime'
            },
            {
                item: 'kubejs:lime'
            },
            {
                item: 'kubejs:lime'
            },
            {
                item: 'kubejs:lime'
            },
            {
                amount: 1000,
                fluid: 'minecraft:water'
            }
        ],
        results: [
            {
                amount: 1000,
                fluid: 'kubejs:mortar'
            }
        ]
    }).id('kubejs:mortar_mixing')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'kubejs:high_temperature_brick'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                amount: 500,
                fluid: 'minecraft:lava'
            }
        ],
        results: [
            {
                item: 'kubejs:lavaproof_brick'
            }
        ]
    }).id('kubejs:lavaproof_brick_mixing')
    event.custom({
        type: 'create:mixing',
        heatRequirement: 'heated',
        ingredients: [
            {
                item: 'createaddition:gold_rod'
            },
            {
                amount: 1000,
                fluid: 'minecraft:lava'
            },
            {
                amount: 1000,
                fluid: 'create:potion',
                nbt: '{Potion:"minecraft:long_fire_resistance"}'
            }
        ],
        results: [
            {
                item: 'minecraft:blaze_rod'
            }
        ]
    }).id('kubejs:blaze_rod_mixing')

    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'create:andesite_casing'
            },
            {
                amount: 576,
                fluid: 'kubejs:molten_brass'
            }
        ],
        results: [
            {
                item: 'create:brass_casing'
            }
        ]
    }).id('kubejs:brass_casing')
    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'create:andesite_casing'
            },
            {
                amount: 576,
                fluid: 'kubejs:molten_copper'
            }
        ],
        results: [
            {
                item: 'create:copper_casing'
            }
        ]
    }).id('kubejs:copper_casing_filling')
    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'create:polished_rose_quartz'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_mixed_metal'
            }
        ],
        results: [
            {
                item: 'create:electron_tube'
            }
        ]
    }).id('kubejs:electron_tube_filling')
    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'kubejs:high_temperature_ceramic_dust'
            },
            {
                amount: 500,
                fluid: 'minecraft:water'
            }
        ],
        results: [
            {
                item: 'kubejs:high_temperature_clay'
            }
        ]
    }).id('kubejs:high_temp_clay_filling')
    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'create:electron_tube'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_steel'
            }
        ],
        results: [
            {
                item: 'createaddition:capacitor'
            }
        ]
    }).id('kubejs:capacitor_filling')

    event.blasting('kubejs:high_temperature_brick', 'kubejs:high_temperature_clay').id('kubejs:high_temp_brick')

    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'kubejs:ingot_mold'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_brass'
            }
        ],
        results: [
            {
                item: 'create:brass_ingot'
            },
            {
                item: 'kubejs:ingot_mold'
            }
        ]
    }).id('kubejs:brass_ingot_from_molten')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'kubejs:ingot_mold'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_copper'
            }
        ],
        results: [
            {
                item: 'minecraft:copper_ingot'
            },
            {
                item: 'kubejs:ingot_mold'
            }
        ]
    }).id('kubejs:copper_ingot_from_molten')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'kubejs:ingot_mold'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_iron'
            }
        ],
        results: [
            {
                item: 'minecraft:iron_ingot'
            },
            {
                item: 'kubejs:ingot_mold'
            }
        ]
    }).id('kubejs:iron_ingot_from_molten')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'kubejs:ingot_mold'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_zinc'
            }
        ],
        results: [
            {
                item: 'create:zinc_ingot'
            },
            {
                item: 'kubejs:ingot_mold'
            }
        ]
    }).id('kubejs:zinc_ingot_from_molten')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'kubejs:ingot_mold'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_lead'
            }
        ],
        results: [
            {
                item: 'immersiveengineering:ingot_lead'
            },
            {
                item: 'kubejs:ingot_mold'
            }
        ]
    }).id('kubejs:lead_ingot_from_molten')
    event.custom({
        type: 'create:mixing',
        ingredients: [
            {
                item: 'kubejs:ingot_mold'
            },
            {
                amount: 144,
                fluid: 'kubejs:molten_steel'
            }
        ],
        results: [
            {
                item: 'immersiveengineering:ingot_steel'
            },
            {
                item: 'kubejs:ingot_mold'
            }
        ]
    }).id('kubejs:steel_ingot_from_molten')

    event.remove({id:'create:sequenced_assembly/precision_mechanism'})
    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: {
            item: 'create:golden_sheet'
        },
        loops: 9,
        results: [
            {
                chance: 120.0,
                item: 'create:precision_mechanism'
            },
            {
                chance: 8.0,
                item: 'create:golden_sheet'
            },
            {
                chance: 8.0,
                item: 'create:andesite_alloy'
            },
            {
                chance: 5.0,
                item: 'create:cogwheel'
            },
            {
                chance: 3.0,
                item: 'minecraft:gold_nugget'
            },
            {
                chance: 2.0,
                item: 'create:shaft'
            },
            {
                chance: 2.0,
                item: 'create:crushed_gold_ore'
            },
            {
                item: 'minecraft:iron_ingot'
            },
            {
                item: 'minecraft:clock'
            }
        ],
        sequence: [
            {
                type: 'create:deploying',
                ingredients: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    },
                    {
                        item: 'immersiveengineering:nugget_silver'
                    }
                ],
                results: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    }
                ]
            },
            {
                type: 'create:pressing',
                ingredients: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    }
                ],
                results: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    }
                ]
            },
            {
                type: 'create:deploying',
                ingredients: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    },
                    {
                        item: 'create:andesite_alloy'
                    }
                ],
                results: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    }
                ]
            },
            {
                type: 'create:pressing',
                ingredients: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    }
                ],
                results: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    }
                ]
            },
            {
                type: 'create:filling',
                ingredients: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    },
                    {
                        amount: 16,
                        fluid: 'kubejs:molten_mixed_metal'
                    }
                ],
                results: [
                    {
                        item: 'create:incomplete_precision_mechanism'
                    }
                ]
            }
        ],
        transitionalItem: {
            item: 'create:incomplete_precision_mechanism'
        }
    }).id('kubejs:precision_mechanism_sequenced_assembly')
    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: {
            item: 'kubejs:high_temperature_brick'
        },
        loops: 3,
        results: [
            {
                item: 'immersiveengineering:cokebrick'
            }
        ],
        sequence: [
            {
                type: 'create:filling',
                ingredients: [
                    {
                        item: 'kubejs:unfinished_coke_brick'
                    },
                    {
                        amount: 250,
                        fluid: 'kubejs:mortar'
                    }
                ],
                results: [
                    {
                        item: 'kubejs:unfinished_coke_brick'
                    }
                ]
            },
            {
                type: 'create:deploying',
                ingredients: [
                    {
                        item: 'kubejs:unfinished_coke_brick'
                    },
                    {
                        item: 'kubejs:high_temperature_brick'
                    }
                ],
                results: [
                    {
                        item: 'kubejs:unfinished_coke_brick'
                    }
                ]
            }
        ],
        transitionalItem: {
            item: 'kubejs:unfinished_coke_brick'
        }
    }).id('kubejs:coke_brick_assembly')
    event.custom({
        type: 'create:sequenced_assembly',
        ingredient: {
            item: 'kubejs:lavaproof_brick'
        },
        loops: 3,
        results: [
            {
                item: 'immersiveengineering:blastbrick'
            }
        ],
        sequence: [
            {
                type: 'create:filling',
                ingredients: [
                    {
                        item: 'kubejs:unfinished_blast_brick'
                    },
                    {
                        amount: 250,
                        fluid: 'kubejs:mortar'
                    }
                ],
                results: [
                    {
                        item: 'kubejs:unfinished_blast_brick'
                    }
                ]
            },
            {
                type: 'create:deploying',
                ingredients: [
                    {
                        item: 'kubejs:unfinished_blast_brick'
                    },
                    {
                        item: 'kubejs:lavaproof_brick'
                    }
                ],
                results: [
                    {
                        item: 'kubejs:unfinished_blast_brick'
                    }
                ]
            }
        ],
        transitionalItem: {
            item: 'kubejs:unfinished_blast_brick'
        }
    }).id('kubejs:blast_brick_assembly')
}

function createAdditionsRecipes(event) {
    const REMOVALS = [
        'mechanical_crafting/electric_motor',
        'mechanical_crafting/alternator',
        'mechanical_crafting/accumulator',
        'mechanical_crafting/tesla_coil',
        'crafting/connector',
        'crafting/redstone_relay',
        'crafting/capacitor_1',
        'crafting/capacitor_2',
        'crafting/spool',
        'crafting/copper_spool',
        'crafting/gold_spool',
        'crafting/festive_spool',
        'compacting/seed_oil',
        'mixing/bioethanol',
    ]
    for (let id of REMOVALS) {
        event.remove({id:`createaddition:${id}`})
    }

    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            '  PP ',
            'PPCMP',
            'RRRXW',
            'PPCMP',
            '  PP '
        ],
        key: {
            P: {
                item: 'immersiveengineering:plate_steel'
            },
            R: {
                item: 'immersiveengineering:stick_steel'
            },
            C: {
                item: 'immersiveengineering:coil_lv'
            },
            M: {
                item: 'create:precision_mechanism'
            },
            X: {
                item: 'createaddition:capacitor'
            },
            W: {
                item: 'immersiveengineering:connector_lv'
            }
        },
        result: {
            item: 'createaddition:alternator'
        }
    }).id('kubejs:alternator_mech_crafting')

    event.shapeless('createaddition:electric_motor', ['createaddition:alternator']).id('kubejs:electric_motor_convert')
    event.shapeless('createaddition:alternator', ['createaddition:electric_motor']).id('kubejs:alternator_convert')

    event.remove({id:'createaddition:rolling/copper_plate'})
    event.custom({
        type: 'createaddition:rolling',
        input: {
            item: 'create:copper_sheet'
        },
        result: {
            count: 2,
            item: 'immersiveengineering:wire_copper'
        }
    }).id('kubejs:copper_wire_rolling')
}

function hexcastingRecipes(event) {
    event.remove({id: 'hexcasting:slate'})
    event.recipes.minecraft.crafting_shaped(
        'hexcasting:slate',
        [
            '   ',
            'DCD',
            'AAA'
        ],
        {
            D: 'hexcasting:amethyst_dust',
            C: 'hexcasting:charged_amethyst',
            A: 'create:andesite_alloy'
        }
    ).id('kubejs:slate')
    event.recipes.summoningrituals
        .altar('minecraft:diamond')
        .itemOutput('hexcasting:charged_amethyst')
        .input('4x minecraft:amethyst_shard')
        .input('4x minecraft:quartz')
        .input('4x minecraft:glowstone_dust')
        .input('4x minecraft:redstone')
        .blockBelow('minecraft:amethyst_block')

    event.remove({id:'hexcasting:spellbook'})
    event.shaped(
        'hexcasting:spellbook',
        [
            'GBA',
            'GEA',
            'GBA'
        ],
        {
            G: 'minecraft:gold_nugget',
            B: 'minecraft:writable_book',
            E: 'minecraft:enchanted_book',
            A: 'hexcasting:charged_amethyst'
        }
    ).id('kubejs:spellbook')

    event.custom({
        type: 'create:mixing',
        heatRequirement: 'heated',
        ingredients: [
            {
                item: 'minecraft:redstone'
            },
            {
                item: 'minecraft:redstone'
            },
            {
                item: 'minecraft:glowstone_dust'
            },
            {
                item: 'minecraft:glowstone_dust'
            },
            {
                item: 'minecraft:amethyst_shard'
            },
            {
                item: 'minecraft:amethyst_shard'
            },
            {
                item: 'minecraft:amethyst_shard'
            },
            {
                item: 'minecraft:amethyst_shard'
            }
        ],
        results: [
            {
                item: 'hexcasting:charged_amethyst'
            }
        ]
    }).id('kubejs:charged_amethyst_mixing')
}

function vanillaRecipes(event) {
    event.remove({id: 'minecraft:map'})
    event.recipes.minecraft.crafting_shapeless(
        '4x minecraft:map',
        ['4x minecraft:paper', '#forge:dyes']
    ).id('kubejs:map')
    event.recipes.minecraft.crafting_shaped(
        '3x minecraft:torch',
        [
            'C  ',
            'S  ',
            '   '
        ],
        {
            C: 'kubejs:lignite_coal',
            S: '#forge:rods/wooden'
        }
    ).id('kubejs:torch_from_lignite')
    event.recipes.minecraft.crafting_shaped(
        '5x minecraft:torch',
        [
            'C  ',
            'S  ',
            '   '
        ],
        {
            C: 'kubejs:bituminous_coal',
            S: '#forge:rods/wooden'
        }
    ).id('kubejs:torch_from_bituminous')
    event.shaped(
        'minecraft:chest',
        [
            'WWW',
            'W W',
            'WWW'
        ],
        {
            W: '#minecraft:planks'
        }
    ).id('kubejs:chest_fixed')
    event.shaped(
        '4x minecraft:chest',
        [
            'WWW',
            'W W',
            'WWW'
        ],
        {
            W: '#minecraft:logs'
        }
    ).id('kubejs:logs_to_chest_fixed')

    for (let item of [['common', 8], ['uncommon', 4], ['rare', 2], ['epic', 1]]) {
        event.recipes.summoningrituals
            .altar(Ingredient.of('minecraft:glass_bottle'))
            .itemOutput(Ingredient.of('minecraft:dragon_breath'))
            .input(Ingredient.of('apotheosis:gem_dust', 4))
            .input(Ingredient.of(`apotheosis:${item[0]}_material`, item[1]))
    }
}

function smallShipsRecipes(event) {
    event.shaped(
        '8x smallships:cannonball_item',
        [
            ' L ',
            'LLL',
            ' L '
        ],
        {
            L: '#forge:ingots/lead'
        }
    ).id('kubejs:cannonball')

    event.shaped(
        'smallships:cannon_item',
        [
            '  S',
            'LLL',
            ' WW'
        ],
        {
            S: '#forge:string',
            L: '#forge:storage_blocks/lead',
            W: '#minecraft:planks'
        }
    ).id('kubejs:cannon')
}

function mahouTsukaiRecipes(event) {
    event.remove({input: 'mahoutsukai:mortar_and_pestle'})
    event.remove({input: 'mahoutsukai:hammer'})
    event.remove({id: 'mahoutsukai:mortar_and_pestle'})
    event.remove({id: 'mahoutsukai:pestle'})
    event.remove({id: 'mahoutsukai:mortar'})
    event.remove({id: 'mahoutsukai:hammer'})
    event.remove({id: 'createaddition:crushing/diamond'})
    event.remove({id: 'createaddition:crafting/diamond_grit_sandpaper'})

    event.shapeless(
        'createaddition:diamond_grit_sandpaper',
        [
            'minecraft:paper',
            'mahoutsukai:powdered_diamond'
        ]
    ).id('kubejs:diamond_grit_sandpaper')

    event.custom({
        type: 'create:crushing',
        ingredients: [
            Ingredient.of('minecraft:diamond')
        ],
        results: [
            Item.of('mahoutsukai:powdered_diamond')
        ],
        processingTime: 100
    }).id('kubejs:powdered_diamond')

    event.custom({
        type: 'create:crushing',
        ingredients: [
            Ingredient.of('minecraft:emerald')
        ],
        results: [
            Item.of('mahoutsukai:powdered_emerald')
        ],
        processingTime: 100
    }).id('kubejs:powdered_emerald')

    event.custom({
        type: 'create:crushing',
        ingredients: [
            Ingredient.of('minecraft:ender_pearl')
        ],
        results: [
            Item.of('mahoutsukai:powdered_ender')
        ],
        processingTime: 100
    }).id('kubejs:powdered_ender')

    event.custom({
        type: 'create:crushing',
        ingredients: [
            Ingredient.of('minecraft:ender_eye')
        ],
        results: [
            Item.of('mahoutsukai:powdered_eye')
        ],
        processingTime: 100
    }).id('kubejs:powdered_eye')

    event.custom({
        type: 'create:crushing',
        ingredients: [
            Ingredient.of('minecraft:gold_ingot')
        ],
        results: [
            Item.of('mahoutsukai:powdered_gold')
        ],
        processingTime: 100
    }).id('kubejs:powdered_gold')

    event.custom({
        type: 'create:crushing',
        ingredients: [
            Ingredient.of('minecraft:iron_ingot')
        ],
        results: [
            Item.of('mahoutsukai:powdered_iron')
        ],
        processingTime: 100
    }).id('kubejs:powdered_iron')

    event.custom({
        type: 'create:crushing',
        ingredients: [
            Ingredient.of('minecraft:quartz')
        ],
        results: [
            Item.of('mahoutsukai:powdered_quartz')
        ],
        processingTime: 100
    }).id('kubejs:powdered_quartz')

    for (let mat of ['iron', 'steel', 'copper', 'gold', 'brass', 'aluminum']) {
        event.remove({id:`createaddition:rolling/${mat}_ingot`})
    }
    event.custom({
        type: 'createaddition:rolling',
        input: {
            item: 'minecraft:iron_ingot'
        },
        result: {
            item: 'immersiveengineering:stick_iron'
        }
    }).id('kubejs:iron_rod_rolling')
    event.custom({
        type: 'createaddition:rolling',
        input: {
            item: 'immersiveengineering:ingot_steel'
        },
        result: {
            item: 'immersiveengineering:stick_steel'
        }
    }).id('kubejs:steel_rod_rolling')
    event.custom({
        type: 'createaddition:rolling',
        input: {
            item: 'immersiveengineering:ingot_aluminum'
        },
        result: {
            item: 'immersiveengineering:stick_aluminum'
        }
    }).id('kubejs:aluminum_rod_rolling')
    event.custom({
        type: 'createaddition:rolling',
        input: {
            item: 'minecraft:gold_ingot'
        },
        result: {
            item: 'createaddition:gold_rod'
        }
    }).id('kubejs:gold_rod_rolling')
    event.custom({
        type: 'createaddition:rolling',
        input: {
            item: 'create:brass_ingot'
        },
        result: {
            item: 'createaddition:brass_rod'
        }
    }).id('kubejs:brass_rod_rolling')
    event.custom({
        type: 'createaddition:rolling',
        input: {
            item: 'minecraft:copper_ingot'
        },
        result: {
            item: 'createaddition:copper_rod'
        }
    }).id('kubejs:copper_rod_rolling')
}

function immersiveEngineeringRecipes(event) {
    const IE_PLATES = [
        'aluminum',
        'lead',
        'silver',
        'nickel',
        'uranium',
        'electrum',
        'steel',
        'iron',
        'gold',
        'copper',
        'constantan',
    ]
    
    const IE_DUSTS = [
        'aluminum',
        'lead',
        'silver',
        'nickel',
        'uranium',
        'iron',
        'gold',
        'copper',
    ]

    for (let plate of IE_PLATES) {
        event.remove({id:`immersiveengineering:crafting/plate_${plate}_hammering`})
    }
    for (let metal of ['iron', 'gold', 'copper']) {
        event.remove({id:`immersiveengineering:metalpress/plate_${metal}`})
    }
    event.custom({
        type: 'immersiveengineering:metal_press',
        mold: 'immersiveengineering:mold_plate',
        result: {
            item: 'create:golden_sheet'
        },
        input: {
            item: 'minecraft:gold_ingot'
        },
        energy: 2400
    }).id('kubejs:metal_press_gold_sheet')
    event.custom({
        type: 'immersiveengineering:metal_press',
        mold: 'immersiveengineering:mold_plate',
        result: {
            item: 'create:copper_sheet'
        },
        input: {
            item: 'minecraft:copper_ingot'
        },
        energy: 2400
    }).id('kubejs:metal_press_copper_sheet')
    event.custom({
        type: 'immersiveengineering:metal_press',
        mold: 'immersiveengineering:mold_plate',
        result: {
            item: 'create:iron_sheet'
        },
        input: {
            item: 'minecraft:iron_ingot'
        },
        energy: 2400
    }).id('kubejs:metal_press_iron_sheet')
    event.remove({id:'immersiveengineering:crafting/hammer'})
    event.recipes.minecraft.crafting_shaped(
        'immersiveengineering:hammer',
        [
            ' AS',
            ' WA',
            'W  '
        ],
        {
            A: 'create:andesite_alloy',
            W: '#forge:rods/wooden',
            S: '#forge:string'
        }
    ).id('kubejs:engineers_hammer')
    for (let dust of IE_DUSTS) {
        event.remove({id: `immersiveengineering:crafting/hammercrushing_${dust}`})
        event.remove({id: `immersiveengineering:crafting/raw_hammercrushing_${dust}`})
    }
    for (let dust of ['electrum', 'constantan']) {
        event.remove({id: `immersiveengineering:crafting/${dust}_mix`})
    }
    event.remove({id: 'immersiveengineering:crafting/alloybrick'})
    event.remove({id: 'immersiveengineering:crafting/blastbrick'})
    event.remove({id: 'immersiveengineering:crafting/cokebrick'})
    event.remove({id: 'immersiveengineering:crafting/stick_iron'})
    event.remove({id: 'immersiveengineering:crafting/stick_steel'})
    event.remove({id: 'immersiveengineering:crafting/stick_aluminum'})

    event.remove({id:'immersiveengineering:blastfurnace/fuel_charcoal'})
    event.remove({id:'immersiveengineering:blastfurnace/fuel_charcoal_block'})
    event.remove({id:'immersiveengineering:blastfurnace/bituminous_coal_coke'})
    event.remove({id:'immersiveengineering:blastfurnace/lignite_coal_coke'})
    event.custom({
        type: 'immersiveengineering:blast_furnace_fuel',
        input: {
            item: 'kubejs:bituminous_coal_coke'
        },
        time: 1800
    })
    event.custom({
        type: 'immersiveengineering:blast_furnace_fuel',
        input: {
            item: 'kubejs:industrial_fuel'
        },
        time: 600
    })
}

function sophisticatedBackpacksRecipes(event) {
    event.remove({mod: 'sophisticatedbackpacks'})
    event.remove({output: 'quark:backpack'})
    event.shaped(
        'sophisticatedbackpacks:backpack',
        [
            'SLS',
            'SCS',
            'LRL'
        ],
        {
            S: '#forge:string',
            L: '#forge:leather',
            C: '#forge:chests',
            R: '#custom:backpack_hides'
        }
    ).id('kubejs:backpack')
    event.custom({
        type: 'sophisticatedbackpacks:backpack_upgrade',
        conditions: [
            {
                type: 'sophisticatedcore:item_enabled',
                itemRegistryName: 'sophisticatedbackpacks:iron_backpack'
            }
        ],
        pattern: [
            'FZF',
            'IBI',
            'FCF'
        ],
        key: {
            B: {
                item: 'sophisticatedbackpacks:backpack'
            },
            F: {
                item: 'immersiveengineering:hemp_fabric'
            },
            Z: {
                item: 'create:zinc_block'
            },
            I: {
                item: 'minecraft:iron_block'
            },
            C: {
                item: 'minecraft:copper_block'
            }
        },
        result: {
            item: 'sophisticatedbackpacks:iron_backpack'
        }
    }).id('kubejs:iron_backpack')
    event.custom({
        type: 'sophisticatedbackpacks:backpack_upgrade',
        conditions: [
            {
                type: 'sophisticatedcore:item_enabled',
                itemRegistryName: 'sophisticatedbackpacks:gold_backpack'
            }
        ],
        pattern: [
            'ROR',
            'GBG',
            'ROR'
        ],
        key: {
            B: {
                item: 'sophisticatedbackpacks:iron_backpack'
            },
            R: {
                item: 'minecraft:blaze_rod'
            },
            O: {
                item: 'minecraft:crying_obsidian'
            },
            G: {
                item: 'minecraft:gold_block'
            }
        },
        result: {
            item: 'sophisticatedbackpacks:gold_backpack'
        }
    }).id('kubejs:gold_backpack')
    event.custom({
        type: 'sophisticatedbackpacks:backpack_upgrade',
        conditions: [
            {
                type: 'sophisticatedcore:item_enabled',
                itemRegistryName: 'sophisticatedbackpacks:diamond_backpack'
            }
        ],
        pattern: [
            'ASA',
            'DBD',
            'ASA'
        ],
        key: {
            B: {
                item: 'sophisticatedbackpacks:gold_backpack'
            },
            A: {
                item: 'hexcasting:charged_amethyst'
            },
            S: {
                item: 'create:sturdy_sheet'
            },
            D: {
                item: 'minecraft:diamond_block'
            }
        },
        result: {
            item: 'sophisticatedbackpacks:diamond_backpack'
        }
    }).id('kubejs:diamond_backpack')
    event.custom({
        type: 'sophisticatedbackpacks:backpack_upgrade',
        conditions: [
            {
                type: 'sophisticatedcore:item_enabled',
                itemRegistryName: 'sophisticatedbackpacks:netherite_backpack'
            }
        ],
        pattern: [
            'MSM',
            'NBN',
            'MVM'
        ],
        key: {
            B: {
                item: 'sophisticatedbackpacks:diamond_backpack'
            },
            M: {
                item: 'alexsmobs:mimicream'
            },
            N: {
                item: 'minecraft:netherite_block'
            },
            S: {
                item: 'minecraft:nether_star'
            },
            V: {
                item: 'alexsmobs:void_worm_eye'
            }
        },
        result: {
            item: 'sophisticatedbackpacks:netherite_backpack'
        }
    }).id('kubejs:netherite_backpack')

    event.recipes.minecraft.crafting_shaped(
        'sophisticatedbackpacks:upgrade_base',
        [
            'SLS',
            'LHL',
            'SLS'
        ],
        {
            S: '#forge:string',
            L: '#forge:leather',
            H: 'immersiveengineering:hemp_fabric'
        }
    ).id('kubejs:upgrade_base')

    event.shaped(
        'sophisticatedbackpacks:pickup_upgrade',
        [
            'SHS',
            'HBH',
            'SHS'
        ],
        {
            S: 'immersiveengineering:hemp_fiber',
            H: 'minecraft:hopper',
            B: 'sophisticatedbackpacks:upgrade_base'
        }
    ).id('kubejs:pickup_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_pickup_upgrade',
        'sophisticatedbackpacks:pickup_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_pickup_upgrade')

    event.shaped(
        'sophisticatedbackpacks:filter_upgrade',
        [
            'SHS',
            'HBH',
            'SHS'
        ],
        {
            S: 'immersiveengineering:hemp_fiber',
            H: '#minecraft:wool',
            B: 'sophisticatedbackpacks:upgrade_base'
        }
    ).id('kubejs:filter_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_filter_upgrade',
        'sophisticatedbackpacks:filter_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_filter_upgrade')

    event.shaped(
        'sophisticatedbackpacks:restock_upgrade',
        [
            'SHS',
            'HBH',
            'SHS'
        ],
        {
            S: 'immersiveengineering:hemp_fiber',
            H: '#forge:stone',
            B: 'sophisticatedbackpacks:upgrade_base'
        }
    ).id('kubejs:restock_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_restock_upgrade',
        'sophisticatedbackpacks:restock_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_restock_upgrade')

    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:magnet_upgrade',
        'sophisticatedbackpacks:pickup_upgrade',
        'enigmaticlegacy:magnet_ring'
    ).id('kubejs:magnet_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_magnet_upgrade',
        'sophisticatedbackpacks:magnet_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_magnet_upgrade_1')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_magnet_upgrade',
        'sophisticatedbackpacks:advanced_pickup_upgrade',
        'enigmaticlegacy:magnet_ring'
    ).id('kubejs:advanced_magnet_upgrade_2')

    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:void_upgrade',
        'sophisticatedbackpacks:pickup_upgrade',
        'enigmaticlegacy:void_stone'
    ).id('kubejs:void_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_void_upgrade',
        'sophisticatedbackpacks:void_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_void_upgrade_1')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_void_upgrade',
        'sophisticatedbackpacks:advanced_pickup_upgrade',
        'enigmaticlegacy:void_stone'
    ).id('kubejs:advanced_void_upgrade_2')

    event.shapeless(
        'sophisticatedbackpacks:deposit_upgrade',
        ['sophisticatedbackpacks:restock_upgrade']
    ).id('kubejs:deposit_upgrade')
    event.shapeless(
        'sophisticatedbackpacks:restock_upgrade',
        ['sophisticatedbackpacks:deposit_upgrade']
    ).id('kubejs:restock_from_deposit_upgrade')
    event.shapeless(
        'sophisticatedbackpacks:advanced_deposit_upgrade',
        ['sophisticatedbackpacks:advanced_restock_upgrade']
    ).id('kubejs:advanced_deposit_upgrade_1')
    event.shapeless(
        'sophisticatedbackpacks:advanced_restock_upgrade',
        ['sophisticatedbackpacks:advanced_deposit_upgrade']
    ).id('kubejs:advanced_restock_from_deposit_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_deposit_upgrade',
        'sophisticatedbackpacks:deposit_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_deposit_upgrade_2')

    event.shaped(
        'sophisticatedbackpacks:refill_upgrade',
        [
            'SHS',
            'HBH',
            'SHS'
        ],
        {
            S: 'immersiveengineering:hemp_fiber',
            H: '#minecraft:planks',
            B: 'sophisticatedbackpacks:upgrade_base'
        }
    ).id('kubejs:refill_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_refill_upgrade',
        'sophisticatedbackpacks:refill_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_refill_upgrade')

    event.shaped(
        'sophisticatedbackpacks:crafting_upgrade',
        [
            'SHS',
            'HBH',
            'SHS'
        ],
        {
            S: 'immersiveengineering:hemp_fiber',
            H: 'minecraft:crafting_table',
            B: 'sophisticatedbackpacks:upgrade_base'
        }
    ).id('kubejs:crafting_upgrade')

    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:jukebox_upgrade',
        'sophisticatedbackpacks:upgrade_base',
        'minecraft:jukebox'
    ).id('kubejs:jukebox_upgrade')

    event.shaped(
        'sophisticatedbackpacks:tool_swapper_upgrade',
        [
            'SZS',
            'VBX',
            'SCS'
        ],
        {
            S: 'immersiveengineering:hemp_fiber',
            Z: 'minecraft:iron_pickaxe',
            X: 'minecraft:iron_axe',
            C: 'minecraft:iron_sword',
            V: 'minecraft:iron_shovel',
            B: 'sophisticatedbackpacks:upgrade_base'
        }
    ).id('kubejs:tool_swapper_upgrade')
    event.recipes.minecraft.smithing(
        'sophisticatedbackpacks:advanced_tool_swapper_upgrade',
        'sophisticatedbackpacks:tool_swapper_upgrade',
        'minecraft:gold_ingot'
    ).id('kubejs:advanced_tool_swapper_upgrade')
    event.shaped(
        'quark:backpack',
        [
            'ILI',
            'LCL',
            'ILI'
        ],
        {
            I: 'minecraft:iron_ingot',
            L: '#forge:leather',
            C: '#forge:chests'
        }
    ).id('kubejs:quark_backpack')
}

function dimDungeonsRecipes(event) {
    event.remove({id: 'dimdungeons:recipe_block_portal_keyhole'})
    event.shaped(
        'dimdungeons:block_portal_keyhole',
        [
            'EEE',
            'EGE',
            'EEE'
        ],
        {
            E: 'minecraft:ender_pearl',
            G: 'dimdungeons:block_gilded_portal'
        }
    ).id('kubejs:portal_keyhole')
    event.shaped(
        'dimdungeons:block_key_charger',
        [
            'EAE',
            'GGG',
            'SSS'
        ],
        {
            E: 'minecraft:ender_pearl',
            A: '#minecraft:anvil',
            G: 'dimdungeons:block_gilded_portal',
            S: 'minecraft:stone_bricks'
        }
    ).id('kubejs:key_inscriber')
}

function gatewayRecipes(event) {
    const MOBS = ['blaze', 'creeper', 'enderman', 'ghast', 'magma_cube', 'shulker', 'skeleton', 'slime', 'spider', 'witch', 'zombie']

    const RANDOM_ITEMS_1 = [['minecraft:rabbit_foot', 3], ['minecraft:prismarine_shard', 16], ['minecraft:prismarine_crystals', 16], ['minecraft:nautilus_shell', 2], ['minecraft:honeycomb', 16], ['minecraft:name_tag', 3]]
    const RANDOM_ITEMS_2 = [['minecraft:poisonous_potato', 4], ['minecraft:golden_carrot', 8], ['minecraft:pumpkin_pie', 4], ['minecraft:glistering_melon_slice', 8], ['minecraft:pufferfish', 4], ['minecraft:beetroot_soup', 4], ['minecraft:glow_berries', 8]]
    const RANDOM_ITEMS_3 = [['#quark:runes', 1], ['#forge:heads', 2], ['#minecraft:music_discs', 1], ['minecraft:totem_of_undying', 2]]
    const RANDOM_ITEMS_4 = [['minecraft:trident', 1], ['savage_and_ravage:wand_of_freezing', 1], ['alexsmobs:tendon_whip', 1], ['alexsmobs:blood_sprayer', 1], ['savage_and_ravage:cleaver_of_beheading', 1]]
    const RANDOM_ITEMS_5 = [['ecologics:azalea_log', 64], ['minecraft:mangrove_log', 64], ['byg:aspen_log', 64], ['byg:cherry_log', 64], ['byg:jacaranda_log', 64], ['byg:maple_log', 64], ['byg:holly_log', 64], ['byg:fir_log', 64]]
    const RANDOM_ITEMS_6 = [['minecraft:netherite_ingot', 3], ['#forge:storage_blocks/iron', 8], ['#forge:storage_blocks/gold', 8], ['#forge:storage_blocks/copper', 8], ['#forge:storage_blocks/diamond', 4], ['#forge:storage_blocks/aluminum', 8], ['#forge:storage_blocks/silver', 8], ['#forge:storage_blocks/lead', 8], ['#forge:storage_blocks/nickel', 8], ['#forge:storage_blocks/uranium', 4]]
    const RANDOM_ITEMS_7 = [['#minecraft:candles', 16], ['#forge:stained_glass_panes', 64], ['#minecraft:wool_carpets', 64], ['#forge:concrete', 64], ['#forge:dyes', 64], ['#quark:corundum', 16], ['#the_bumblezone:super_candles', 8], ['#fairylights:lights', 16], ['#cfm:general', 8]]
    const RANDOM_ITEMS_8 = [['farmersdelight:rice_roll_medley_block', 8], ['farmersdelight:shepherds_pie_block', 8], ['farmersdelight:honey_glazed_ham_block', 8], ['farmersdelight:stuffed_pumpkin_block', 8], ['farmersdelight:grilled_salmon', 16], ['farmersdelight:squid_ink_pasta', 16], ['farmersdelight:steak_and_potatoes', 16], ['farmersdelight:hamburger', 16], ['farmersdelight:chicken_sandwich', 16], ['farmersdelight:roasted_mutton_chops', 16], ['farmersdelight:chocolate_pie', 16], ['farmersdelight:apple_pie', 16]]

    const RANDOM_ITEMS_LIST = [RANDOM_ITEMS_1, RANDOM_ITEMS_2, RANDOM_ITEMS_3, RANDOM_ITEMS_3, RANDOM_ITEMS_4, RANDOM_ITEMS_5, RANDOM_ITEMS_6, RANDOM_ITEMS_7, RANDOM_ITEMS_7, RANDOM_ITEMS_8, RANDOM_ITEMS_8]

    let world_seed = Utils.server != null ? Math.abs(Utils.server.getOverworld().getSeed()) : Number.MAX_SAFE_INTEGER

    event.remove({id: 'meetyourfight:fossil_bait'})
    event.remove({id: 'meetyourfight:haunted_bell'})
    event.remove({id: 'meetyourfight:devils_ante'})

    for (let mob of MOBS) {
        event.remove({id: `gateways:${mob}_gate`})
        event.remove({id: `gateways:${mob}_gate_large`})
        event.remove({id: `gateways:${mob}_gate_small`})
    }

    event.shaped(
        'minecraft:bell',
        [
            'WWW',
            'IBI',
            ' I '
        ],
        {
            W: '#minecraft:wooden_slabs',
            I: 'minecraft:gold_ingot',
            B: 'minecraft:gold_block'
        }
    ).id('kubejs:bell')

    event.shaped(
        Item.of('gateways:gate_pearl', '{gateway:"custom:swampjaw"}'),
        [
            'DED',
            'ETE',
            'DED'
        ],
        {
            D: 'minecraft:diamond',
            E: 'minecraft:ender_pearl',
            T: 'meetyourfight:mossy_tooth'
        }
    ).id('kubejs:swampjaw_gate_pearl')

    event.shaped(
        Item.of('gateways:gate_pearl', '{gateway:"custom:bellringer"}'),
        [
            'DED',
            'EPE',
            'DED'
        ],
        {
            D: 'minecraft:diamond',
            E: 'minecraft:ender_pearl',
            P: 'meetyourfight:phantoplasm'
        }
    ).id('kubejs:bellringer_gate_pearl')

    event.shaped(
        Item.of('gateways:gate_pearl', '{gateway:"custom:dame_fortuna"}'),
        [
            'DED',
            'EFE',
            'DED'
        ],
        {
            D: 'minecraft:diamond',
            E: 'minecraft:ender_pearl',
            F: 'meetyourfight:fortunes_favor'
        }
    ).id('kubejs:dame_fortuna_gate_pearl')

    event.shaped(
        Item.of('gateways:gate_pearl', '{gateway:"custom:wither"}'),
        [
            'DED',
            'ESE',
            'DED'
        ],
        {
            D: 'minecraft:diamond',
            E: 'minecraft:ender_pearl',
            S: 'minecraft:nether_star'
        }
    ).id('kubejs:wither_gate_pearl')

    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:ender_pearl'))
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway:"custom:wither"}'))
        .input(Ingredient.of('minecraft:wither_skeleton_skull', 4))
        .input(Ingredient.of('#minecraft:soul_fire_base_blocks', 64))
        .input(Ingredient.of('kubejs:swampjaw_rib'))
        .input(Ingredient.of('kubejs:ethereal_bell'))
        .input(Ingredient.of('kubejs:queen_of_diamonds'))
        .sacrifice('minecraft:villager', 4)
        .sacrificeRegion(5, 2)

    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:ender_pearl'))
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway:"custom:swampjaw"}'))
        .input(Ingredient.of('minecraft:bone_block', 8))
        .input(Ingredient.of('minecraft:blue_orchid', 8))
        .input(Ingredient.of('minecraft:bone', 8))
        .input(Ingredient.of('minecraft:lily_pad', 8))
        .sacrifice('alexsmobs:alligator_snapping_turtle')
        .sacrificeRegion(5, 2)

    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:ender_pearl'))
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway:"custom:swampjaw"}'))
        .input(Ingredient.of('minecraft:bone_block', 8))
        .input(Ingredient.of('minecraft:blue_orchid', 8))
        .input(Ingredient.of('minecraft:bone', 8))
        .input(Ingredient.of('minecraft:lily_pad', 8))
        .sacrifice('alexsmobs:terrapin')
        .sacrificeRegion(5, 2)

    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:ender_pearl'))
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway:"custom:swampjaw"}'))
        .input(Ingredient.of('minecraft:bone_block', 8))
        .input(Ingredient.of('minecraft:blue_orchid', 8))
        .input(Ingredient.of('minecraft:bone', 8))
        .input(Ingredient.of('minecraft:lily_pad', 8))
        .sacrifice('minecraft:turtle')
        .sacrificeRegion(5, 2)

    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:ender_pearl'))
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway:"custom:bellringer"}'))
        .input(Ingredient.of('minecraft:bell', 4))
        .input(Ingredient.of('#minecraft:soul_fire_base_blocks', 4))
        .input(Ingredient.of('minecraft:glowstone', 4))
        .input(Ingredient.of('minecraft:netherite_scrap', 4))
        .input(Ingredient.of('minecraft:golden_apple', 4))
        .input(Ingredient.of('minecraft:gold_block', 4))
        .input(Ingredient.of('minecraft:soul_lantern', 4))
        .sacrifice('alexsmobs:soul_vulture')
        .sacrificeRegion(5, 2)
    
    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:ender_pearl'))
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway:"custom:bellringer"}'))
        .input(Ingredient.of('minecraft:bell', 4))
        .input(Ingredient.of('#minecraft:soul_fire_base_blocks', 4))
        .input(Ingredient.of('minecraft:glowstone', 4))
        .input(Ingredient.of('minecraft:netherite_scrap', 4))
        .input(Ingredient.of('minecraft:golden_apple', 4))
        .input(Ingredient.of('minecraft:gold_block', 4))
        .input(Ingredient.of('minecraft:soul_lantern', 4))
        .sacrifice('quark:wraith')
        .sacrificeRegion(5, 2)
    
    // Makes three random altar recipes based on world seed
    let i = 0
    let random = Utils.newRandom(world_seed)
    while (i < 3) {
        let r1 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        let r2 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        let r3 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        let r4 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        let r5 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        let r6 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        let r7 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        let r8 = Utils.randomOf(random, Utils.randomOf(random, RANDOM_ITEMS_LIST))
        event.recipes.summoningrituals
            .altar(Ingredient.of('minecraft:ender_pearl'))
            .itemOutput(Item.of('gateways:gate_pearl', '{gateway:"custom:dame_fortuna"}'))
            .input(Ingredient.of(r1[0], r1[1]))
            .input(Ingredient.of(r2[0], r2[1]))
            .input(Ingredient.of(r3[0], r3[1]))
            .input(Ingredient.of(r4[0], r4[1]))
            .input(Ingredient.of(r5[0], r5[1]))
            .input(Ingredient.of(r6[0], r6[1]))
            .input(Ingredient.of(r7[0], r7[1]))
            .input(Ingredient.of(r8[0], r8[1]))
        i++
    }
}

function littleLogisticsRecipes(event) {
    event.remove({mod: 'littlelogistics'})
    event.shaped(
        'littlelogistics:rapid_hopper',
        [
            '   ',
            'BHB',
            ' R '
        ],
        {
            B: 'create:brass_ingot',
            H: 'minecraft:hopper',
            R: 'minecraft:redstone_block'
        }
    ).id('kubejs:rapid_hopper')
    event.shaped(
        'littlelogistics:conductors_wrench',
        [
            '  C',
            ' AR',
            'A  '
        ],
        {
            C: 'littlelogistics:spring',
            A: 'create:andesite_alloy',
            R: 'minecraft:red_dye'
        }
    ).id('kubejs:conductors_wrench')
    event.shaped(
        'littlelogistics:barge',
        [
            '   ',
            'ABA',
            'AAA'
        ],
        {
            B: '#minecraft:chest_boats',
            A: 'create:andesite_alloy'
        }
    ).id('kubejs:chest_barge')
    event.shaped(
        'littlelogistics:fishing_barge',
        [
            ' F ',
            'ABA',
            'AAA'
        ],
        {
            B: '#minecraft:boats',
            A: 'create:andesite_alloy',
            F: 'minecraft:fishing_rod'
        }
    ).id('kubejs:fishing_barge')
    event.shaped(
        'littlelogistics:seater_barge',
        [
            ' S ',
            'ABA',
            'AAA'
        ],
        {
            B: '#minecraft:boats',
            A: 'create:andesite_alloy',
            S: '#create:seats'
        }
    ).id('kubejs:seater_barge')
    event.shaped(
        'littlelogistics:fluid_barge',
        [
            ' T ',
            'ABA',
            'AAA'
        ],
        {
            B: '#minecraft:boats',
            A: 'create:andesite_alloy',
            T: 'create:fluid_tank'
        }
    ).id('kubejs:fluid_barge')
    event.shaped(
        'littlelogistics:tug',
        [
            ' A ',
            'ASA',
            'AAA'
        ],
        {
            S: 'create:steam_engine',
            A: 'create:andesite_alloy'
        }
    ).id('kubejs:steam_tug')
    event.shaped(
        '4x littlelogistics:spring',
        [
            '   ',
            'SCS',
            'CSC'
        ],
        {
            S: '#forge:string',
            C: 'minecraft:chain'
        }
    ).id('kubejs:vehicle_chain')
    event.shaped(
        '2x littlelogistics:transmitter_component',
        [
            ' E ',
            ' G ',
            ' A '
        ],
        {
            E: 'minecraft:ender_pearl',
            G: 'minecraft:glowstone_dust',
            A: 'create:andesite_alloy'
        }
    ).id('kubejs:transmitter_component')
    event.shaped(
        '2x littlelogistics:receiver_component',
        [
            ' E ',
            ' R ',
            ' A '
        ],
        {
            E: 'minecraft:ender_pearl',
            R: 'minecraft:redstone',
            A: 'create:andesite_alloy'
        }
    ).id('kubejs:receiver_component')
    event.shaped(
        'littlelogistics:tug_route',
        [
            ' R ',
            'ICI',
            ' R '
        ],
        {
            R: 'minecraft:redstone',
            I: 'minecraft:iron_nugget',
            C: 'littlelogistics:transmitter_component'
        }
    ).id('kubejs:tug_route')
    event.shaped(
        'littlelogistics:locomotive_route',
        [
            ' I ',
            'RCR',
            ' I '
        ],
        {
            R: 'minecraft:redstone',
            I: 'minecraft:iron_nugget',
            C: 'littlelogistics:transmitter_component'
        }
    ).id('kubejs:locomotive_route')
    event.shaped(
        'littlelogistics:seater_car',
        [
            '   ',
            'AMA',
            'AAA'
        ],
        {
            M: 'minecraft:minecart',
            A: 'create:andesite_alloy'
        }
    ).id('kubejs:train_car')
    event.shapeless(
        'littlelogistics:chest_car',
        [
            'littlelogistics:seater_car',
            '#forge:chests'
        ]
    ).id('kubejs:chest_car')
    event.shapeless(
        'littlelogistics:fluid_car',
        [
            'littlelogistics:seater_car',
            'create:fluid_tank'
        ]
    ).id('kubejs:fluid_car')
    event.shapeless(
        'littlelogistics:steam_locomotive',
        [
            'littlelogistics:seater_car',
            'create:steam_engine'
        ]
    ).id('kubejs:steam_locomotive')
    event.shapeless(
        'littlelogistics:fluid_hopper',
        [
            'minecraft:hopper',
            'create:fluid_tank'
        ]
    ).id('kubejs:fluid_hopper')
    event.shaped(
        '2x littlelogistics:tug_dock',
        [
            'SSS',
            'CSC',
            'AAA'
        ],
        {
            A: 'create:andesite_alloy',
            C: 'littlelogistics:spring',
            S: '#forge:stone'
        }
    ).id('kubejs:tug_dock')
    event.shaped(
        '2x littlelogistics:barge_dock',
        [
            'SSS',
            'SCS',
            'AAA'
        ],
        {
            A: 'create:andesite_alloy',
            C: 'littlelogistics:spring',
            S: '#forge:stone'
        }
    ).id('kubejs:barge_dock')
    event.shaped(
        '3x littlelogistics:guide_rail_corner',
        [
            'RSR',
            'SCS',
            'AAA'
        ],
        {
            A: 'create:andesite_alloy',
            C: 'littlelogistics:spring',
            R: 'minecraft:powered_rail',
            S: '#forge:stone'
        }
    ).id('kubejs:guide_rail_corner')
    event.shaped(
        '8x littlelogistics:guide_rail_tug',
        [
            'SRS',
            'SCS',
            'AAA'
        ],
        {
            A: 'create:andesite_alloy',
            C: 'littlelogistics:spring',
            R: 'minecraft:powered_rail',
            S: '#forge:stone'
        }
    ).id('kubejs:guide_rail_tug')
    event.shaped(
        '2x littlelogistics:vessel_detector',
        [
            'SCS',
            'SOS',
            'SSS'
        ],
        {
            O: 'minecraft:observer',
            C: 'littlelogistics:spring',
            S: '#forge:stone'
        }
    ).id('kubejs:vessel_detector')
    event.shaped(
        '4x littlelogistics:switch_rail',
        [
            'R  ',
            'RR ',
            'R  '
        ],
        {
            R: 'minecraft:rail'
        }
    ).id('kubejs:switch_rail')
    event.shaped(
        '5x littlelogistics:junction_rail',
        [
            ' R ',
            'RRR',
            ' R '
        ],
        {
            R: 'minecraft:rail'
        }
    ).id('kubejs:junction_rail')
    event.shaped(
        '4x littlelogistics:tee_junction_rail',
        [
            '   ',
            'RRR',
            ' R '
        ],
        {
            R: 'minecraft:rail'
        }
    ).id('kubejs:tee_junction_rail')
    event.shapeless(
        'littlelogistics:automatic_switch_rail',
        [
            'littlelogistics:switch_rail',
            'littlelogistics:receiver_component'
        ]
    ).id('kubejs:automatic_switch_rail')
    event.shapeless(
        'littlelogistics:automatic_tee_junction_rail',
        [
            'littlelogistics:tee_junction_rail',
            'littlelogistics:receiver_component'
        ]
    ).id('kubejs:automatic_tee_junction_rail')
    event.shaped(
        '3x littlelogistics:car_dock_rail',
        [
            ' R ',
            'CRC',
            ' R '
        ],
        {
            R: 'minecraft:rail',
            C: 'littlelogistics:spring'
        }
    ).id('kubejs:car_dock_rail')
    event.shaped(
        '2x littlelogistics:locomotive_dock_rail',
        [
            ' C ',
            ' R ',
            ' R '
        ],
        {
            R: 'minecraft:rail',
            C: 'littlelogistics:spring'
        }
    ).id('kubejs:locomotive_dock_rail')
}

function apotheosisRecipes(event) {
    event.remove({id:'apotheosis:potion_charm'})
    event.remove({id:'apotheosis:enchanting/infused_seashelf'})
    event.remove({id:'apotheosis:enchanting/infused_hellshelf'})
    event.custom({
        type: 'apotheosis:enchanting',
        input: {
            item: 'apotheosis:seashelf'
        },
        requirements: {
            eterna: 22.5,
            quanta: 50.0,
            arcana: 10.0
        },
        max_requirements: {
            eterna: 22.5,
            quanta: 55.0,
            arcana: 11.0
        },
        display_level: 5,
        result: {
            item: 'apotheosis:infused_seashelf',
            count: 1
        }
    }).id('kubejs:infused_seashelf')
    event.custom({
        type: 'apotheosis:enchanting',
        input: {
            item: 'apotheosis:hellshelf'
        },
        requirements: {
            eterna: 22.5,
            arcana: 30.0
        },
        max_requirements: {
            eterna: 22.5,
            quanta: 0.0,
            arcana: 35.0
        },
        display_level: 5,
        result: {
            item: 'apotheosis:infused_hellshelf',
            count: 1
        }
    }).id('kubejs:infused_hellshelf')

    event.shapeless('minecraft:command_block', 'minecraft:command_block').id('apotheosis:heart_seashelf')
    event.shapeless('minecraft:command_block', 'minecraft:command_block').id('apotheosis:crystal_seashelf')
    event.shapeless('minecraft:command_block', 'minecraft:command_block').id('apotheosis:blazing_hellshelf')
    event.shapeless('minecraft:command_block', 'minecraft:command_block').id('apotheosis:glowing_hellshelf')
    event.shapeless('minecraft:command_block', 'minecraft:command_block').id('apotheosis:prismatic_web')
    event.custom({
        type: 'summoningrituals:altar',
        catalyst: {
            item: 'apotheosis:infused_seashelf'
        },
        outputs: [
            {
                item: 'apotheosis:heart_seashelf'
            }
        ],
        inputs: [
            {
                ingredient: {
                    item: 'minecraft:prismarine_shard'
                },
                count: 16
            },
            {
                ingredient: {
                    item: 'minecraft:prismarine_crystals'
                },
                count: 16
            },
            {
                ingredient: {
                    item: 'minecraft:heart_of_the_sea'
                },
                count: 1
            }
        ],
        sacrifices: {
            mobs: [
                {
                    mob: 'minecraft:guardian'
                }
            ],
            region: {x: 10, y: 10, z: 10}
        },
        recipe_time: 200
    }).id('kubejs:heart_seashelf')
    event.custom({
        type: 'summoningrituals:altar',
        catalyst: {
            item: 'apotheosis:infused_seashelf'
        },
        outputs: [
            {
                item: 'apotheosis:crystal_seashelf'
            }
        ],
        inputs: [
            {
                ingredient: {
                    item: 'minecraft:sea_lantern'
                },
                count: 4
            },
            {
                ingredient: {
                    item: 'minecraft:amethyst_block'
                },
                count: 4
            }
        ],
        recipe_time: 200
    }).id('kubejs:crystal_seashelf')
    event.custom({
        type: 'summoningrituals:altar',
        catalyst: {
            item: 'apotheosis:infused_hellshelf'
        },
        outputs: [
            {
                item: 'apotheosis:blazing_hellshelf'
            }
        ],
        inputs: [
            {
                ingredient: {
                    item: 'minecraft:blaze_powder'
                },
                count: 16
            },
            {
                ingredient: {
                    item: 'minecraft:quartz'
                },
                count: 16
            },
            {
                ingredient: {
                    item: 'minecraft:wither_skeleton_skull'
                },
                count: 1
            }
        ],
        sacrifices: {
            mobs: [
                {
                    mob: 'minecraft:blaze'
                }
            ],
            region: {x: 10, y: 10, z: 10}
        },
        recipe_time: 200
    }).id('kubejs:blazing_hellshelf')
    event.custom({
        type: 'summoningrituals:altar',
        catalyst: {
            item: 'apotheosis:infused_hellshelf'
        },
        outputs: [
            {
                item: 'apotheosis:glowing_hellshelf'
            }
        ],
        inputs: [
            {
                ingredient: {
                    item: 'minecraft:glowstone'
                },
                count: 4
            },
            {
                ingredient: {
                    item: 'minecraft:gold_block'
                },
                count: 4
            }
        ],
        recipe_time: 200
    }).id('kubejs:glowing_hellshelf')

    event.custom({
        type: 'apotheosis:enchanting',
        input: {
            item: 'simplyswords:slumbering_lichblade'
        },
        requirements: {
            eterna: 20.0,
            quanta: 100.0,
            arcana: 0.0
        },
        max_requirements: {
            eterna: 50.0,
            quanta: 100.0,
            arcana: 0.0
        },
        display_level: 5,
        result: {
            item: 'simplyswords:waking_lichblade',
            count: 1
        }
    }).id('kubejs:waking_lichblade_enchanting')
    event.recipes.minecraft.smithing(
        'simplyswords:awakened_lichblade',
        'simplyswords:waking_lichblade',
        '#custom:lich_staves'
    ).id('kubejs:awakened_lichblade_smithing')
    event.shaped(
        'apotheosis:ender_lead',
        [
            ' GE',
            'GLG',
            'EG '
        ],
        {
            G: 'minecraft:gold_ingot',
            E: 'minecraft:ender_pearl',
            L: 'minecraft:lead'
        }
    ).id('apotheosis:ender_lead')
}

function archersParadoxRecipes(event) {
    event.remove({mod:'archers_paradox'})
    function fletch(event, arrow, count, ing1, ing2, ing3) {
        event.custom({
            type: 'apotheosis:fletching',
            ingredients: [
                {
                    item: ing1
                },
                {
                    item: ing2
                },
                {
                    item: ing3
                }
            ],
            result: {
                item: `archers_paradox:${arrow}`,
                count: count
            }
        }).id(`kubejs:${arrow}_fletching`)
    }
    fletch(event, 'quartz_arrow', 6, 'minecraft:quartz', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'diamond_arrow', 6, 'minecraft:diamond', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'prismarine_arrow', 6, 'minecraft:prismarine_shard', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'slime_arrow', 6, 'minecraft:slime_ball', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'ender_arrow', 6, 'minecraft:ender_pearl', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'training_arrow', 12, 'minecraft:leather', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'challenge_arrow', 24, 'minecraft:experience_bottle', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'phantasmal_arrow', 4, 'minecraft:phantom_membrane', 'minecraft:spectral_arrow', 'minecraft:phantom_membrane')
    fletch(event, 'shulker_arrow', 12, 'minecraft:shulker_shell', 'minecraft:end_rod', 'minecraft:feather')
    fletch(event, 'blaze_arrow', 6, 'minecraft:blaze_powder', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'frost_arrow', 6, 'minecraft:packed_ice', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'lightning_arrow', 32, 'minecraft:heart_of_the_sea', 'minecraft:stick', 'minecraft:feather')
    fletch(event, 'spore_arrow', 6, 'minecraft:red_mushroom', 'minecraft:stick', 'minecraft:feather')

    event.custom({
        type: 'apotheosis:fletching',
        ingredients: [
            {
                item: 'alexsmobs:shark_tooth'
            },
            {
                item: 'minecraft:stick'
            },
            {
                item: 'minecraft:kelp'
            }
        ],
        result: {
            item: 'alexsmobs:shark_tooth_arrow',
            count: 12
        }
    }).id('kubejs:shark_tooth_arrow_fletching')

    event.shaped(
        'supplementaries:quiver',
        [
            'SL ',
            'L L',
            'LL '
        ],
        {
            S: '#forge:string',
            L: '#forge:leather'
        }
    ).id('kubejs:quiver')
}

function miscRemovals(event) {
    for (let item of ['carrot', 'potato', 'beetroot']) {
        event.remove({id: `farmersdelight:${item}_crate`})
    }
    event.remove({mod: 'geolosys'})
    event.remove({mod: 'simplyswords'})
    event.remove({mod: 'computercraft'})
    event.remove({output: 'immersiveengineering:nugget_copper'})
    event.remove({output: 'minecraft:ender_eye'})
    event.remove({id:'minecraft:pressing/zinc_sheet'})
    event.remove({mod:'immersive_armors'})
    event.remove({mod:'laserio'})
    event.remove({mod:'endrem'})
    event.remove({mod:'magic_doorknob'})
    event.remove({mod:'blazegear'})
    event.remove({mod:'villagertools'})
}

function kubejsRecipes(event) {
    event.shaped(
        'summoningrituals:altar', 
        [
            'CSC',
            'GRG',
            'WWW'
        ],
        {
            C: '#minecraft:candles',
            S: 'minecraft:wither_skeleton_skull',
            G: 'minecraft:gold_block',
            R: 'minecraft:red_wool',
            W: '#minecraft:planks'
        }
    ).id('kubejs:altar')

    event.remove({id: 'create:crafting/materials/andesite_alloy'})
    event.remove({id: 'create:crafting/materials/andesite_alloy_from_zinc'})

    // event.recipes.summoningrituals
    //     .altar(Ingredient.of("#forge:slimeballs"))
    //     .itemOutput('kubejs:natural_binding')
    //     .input(Ingredient.of('#forge:natural_binding_sticky'))
    //     .input(Ingredient.of('#forge:natural_binding_liquid'))
    //     .input(Ingredient.of('#forge:natural_binding_nether'))
    //     .input(Ingredient.of('#forge:natural_binding_skin'))

    // event.recipes.summoningrituals
    //     .altar("kubejs:ore_clump")
    //     .itemOutput('kubejs:natural_alloy')
    //     .input(Ingredient.of('#forge:natural_alloy_bone'))
    //     .input(Ingredient.of('#forge:natural_alloy_nether'))
    //     .input(Ingredient.of('#forge:natural_alloy_hide'))
    //     .input(Ingredient.of('#forge:natural_alloy_gem'))

    // event.recipes.summoningrituals
    //     .altar("minecraft:diamond")
    //     .itemOutput('kubejs:ore_clump')
    //     .input(Ingredient.of('#forge:raw_materials/iron', 32))
    //     .input(Ingredient.of('#forge:raw_materials/copper', 32))
    //     .input(Ingredient.of('#forge:raw_materials/gold', 32))
    //     .input(Ingredient.of('#forge:raw_materials/zinc', 32))
    //     .input(Ingredient.of('#forge:raw_materials/aluminum', 32))
    //     .input(Ingredient.of('#forge:raw_materials/nickel', 32))
    //     .input(Ingredient.of('#forge:raw_materials/silver', 32))
    //     .input(Ingredient.of('#forge:raw_materials/lead', 32))

    // event.recipes.summoningrituals
    //     .altar("minecraft:andesite")
    //     .itemOutput('16x create:andesite_alloy')
    //     .input('kubejs:natural_binding')
    //     .input('kubejs:natural_alloy')
    //     .input('kubejs:star_of_quintessence')
    //     .recipeTime(200)
    //     .blockBelow('minecraft:diamond_block')

    event.recipes.summoningrituals
        .altar("minecraft:nether_star")
        .itemOutput('kubejs:star_of_quintessence')
        .input('meetyourfight:mossy_tooth')
        .input('meetyourfight:phantoplasm')
        .input('meetyourfight:fortunes_favor')
    
    event.shaped(
        '4x kubejs:ingot_mold',
        [
            'OOO',
            'O O',
            'OOO'
        ],
        {
            O: 'minecraft:obsidian'
        }
    ).id('kubejs:ingot_mold')

    event.custom({
        type: 'immersiveengineering:coke_oven',
        result: {
            item: 'kubejs:bituminous_coal_coke'
        },
        input: {
            item: 'kubejs:bituminous_coal'
        },
        creosote: 500,
        time: 1800
    }).id('kubejs:bituminous_coal_coke_oven')
    event.custom({
        type: 'immersiveengineering:coke_oven',
        result: {
            item: 'kubejs:industrial_fuel'
        },
        input: {
            item: 'kubejs:blaze_coated_charcoal'
        },
        creosote: 500,
        time: 1800
    }).id('kubejs:industrial_fuel_coke_oven')

    event.custom({
        type: 'create:mixing',
        heatRequirement: 'heated',
        ingredients: [
            {
                item: 'minecraft:charcoal'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            }
        ],
        results: [
            {
                item: 'kubejs:blaze_coated_charcoal'
            }
        ]
    }).id('kubejs:blaze_coated_charcoal_mixing')

    event.custom({
        type: 'create:mixing',
        heatRequirement: 'heated',
        ingredients: [
            {
                item: 'minecraft:ender_pearl'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                item: 'minecraft:blaze_powder'
            },
            {
                fluid: 'create:potion',
                amount: 1000,
                nbt: '{Potion:"minecraft:long_invisibility"}'
            }
        ],
        results: [
            {
                item: 'minecraft:ender_eye'
            }
        ]
    }).id('kubejs:ender_eye_mixing')
    event.remove({id:'magic_mirror:magic_mirror'})
    event.shaped(
        '2x magic_mirror:magic_mirror',
        [
            'TST',
            'ASA',
            'TST'
        ],
        {
            T: 'minecraft:tinted_glass',
            A: 'hexcasting:amethyst_dust',
            S: 'immersiveengineering:ingot_silver'
        }
    ).id('kubejs:magic_mirror')
}

function simpleStorageRecipes(event) {
    event.remove({mod:'toms_storage'})
    event.shaped(
        'toms_storage:ts.inventory_connector',
        [
            'AWA',
            'WCW',
            'AWA'
        ],
        {
            A: 'create:andesite_alloy',
            W: '#minecraft:logs',
            C: 'storagedrawers:controller'
        }
    ).id('kubejs:inventory_connector')
    event.shaped(
        'toms_storage:ts.storage_terminal',
        [
            ' CA',
            'CHA',
            ' CA'
        ],
        {
            A: 'create:andesite_alloy',
            H: '#forge:chests',
            C: 'toms_storage:ts.inventory_cable'
        }
    ).id('kubejs:storage_terminal')
    event.shaped(
        '2x toms_storage:ts.trim',
        [
            'WCW',
            'CAC',
            'WCW'
        ],
        {
            A: 'create:andesite_alloy',
            C: '#forge:chests',
            W: '#minecraft:logs'
        }
    ).id('kubejs:trim')
    event.shaped(
        'toms_storage:ts.open_crate',
        [
            'WBW',
            'WTW',
            'WBW'
        ],
        {
            B: '#forge:barrels',
            T: 'toms_storage:ts.trim',
            W: '#minecraft:logs'
        }
    ).id('kubejs:open_crate')
    event.shaped(
        '8x toms_storage:ts.inventory_cable',
        [
            'WWW',
            'GAG',
            'WWW'
        ],
        {
            G: '#forge:glass',
            A: 'create:andesite_alloy',
            W: '#minecraft:logs'
        }
    ).id('kubejs:inventory_cable')
    event.shaped(
        '8x toms_storage:ts.inventory_cable_framed',
        [
            'CCC',
            'CSC',
            'CCC'
        ],
        {
            C: 'toms_storage:ts.inventory_cable',
            S: 'minecraft:stick'
        }
    ).id('kubejs:inventory_cable_framed')
    event.shaped(
        '4x toms_storage:ts.inventory_cable_connector',
        [
            ' C ',
            'CBC',
            ' C '
        ],
        {
            C: 'toms_storage:ts.inventory_cable',
            B: 'toms_storage:ts.inventory_connector'
        }
    ).id('kubejs:inventory_cable_connector')
    event.shapeless(
        'toms_storage:ts.inventory_cable_connector_filtered',
        [
            'toms_storage:ts.inventory_cable_connector',
            'minecraft:paper'
        ]
    ).id('kubejs:inventory_cable_connector_filtered')
    event.shapeless(
        'toms_storage:ts.inventory_cable_connector_framed',
        [
            'toms_storage:ts.inventory_cable_connector',
            'minecraft:stick'
        ]
    ).id('kubejs:inventory_cable_connector_framed')
    event.shaped(
        'toms_storage:ts.crafting_terminal',
        [
            'ACA',
            'CTC',
            'ACA'
        ],
        {
            A: 'create:andesite_alloy',
            T: 'toms_storage:ts.storage_terminal',
            C: 'minecraft:crafting_table'
        }
    ).id('kubejs:crafting_terminal')
    event.shapeless(
        'toms_storage:ts.paint_kit',
        [
            '#forge:dyes/red',
            '#forge:dyes/green',
            '#forge:dyes/blue',
            '#forge:dyes/black',
            'minecraft:bucket'
        ]
    ).id('kubejs:paint_kit')
    event.shaped(
        'toms_storage:ts.level_emitter',
        [
            'BBB',
            'RCB',
            'BBB'
        ],
        {
            B: 'create:brass_nugget',
            R: 'minecraft:redstone_torch',
            C: 'toms_storage:ts.inventory_cable'
        }
    ).id('kubejs:level_emitter')
    event.shaped(
        'toms_storage:ts.inventory_hopper_basic',
        [
            'BBB',
            'HCB',
            'BBB'
        ],
        {
            B: 'create:brass_nugget',
            H: 'minecraft:hopper',
            C: 'toms_storage:ts.inventory_cable'
        }
    ).id('kubejs:inventory_hopper_basic')
    event.shaped(
        'toms_storage:ts.inventory_proxy',
        [
            'CCC',
            'CAC',
            'CCC'
        ],
        {
            C: 'toms_storage:ts.inventory_cable',
            A: 'create:andesite_casing'
        }
    ).id('kubejs:inventory_proxy')
    event.remove({id:'storagedrawers:controller'})
    event.shaped(
        'storagedrawers:controller',
        [
            'AAA',
            'CVC',
            'ADA'
        ],
        {
            A: 'create:andesite_alloy',
            C: 'minecraft:comparator',
            V: 'create:item_vault',
            D: 'minecraft:diamond'
        }
    ).id('kubejs:drawer_controller')
}

function paragliderRecipes(event) {
    event.remove({mod:'paraglider'})
    event.shaped(
        'paraglider:paraglider',
        [
            'LHL',
            'LSL',
            '   '
        ],
        {
            L: '#forge:leather',
            H: '#custom:backpack_hides',
            S: 'minecraft:stick'
        }
    ).id('kubejs:paraglider')
    event.shaped(
        'paraglider:deku_leaf',
        [
            'LLL',
            'LPL',
            'LLL'
        ],
        {
            L: '#minecraft:leaves',
            P: 'paraglider:paraglider'
        }
    ).id('kubejs:deku_leaf')
}

function immersiveAircraftRecipes(event) {
    event.remove({mod:'immersive_aircraft'})
    event.custom({
        type: 'create:compacting',
        heatRequirement: 'heated',
        ingredients: [
            {
                tag: 'forge:treated_wood'
            },
            {
                tag: 'forge:treated_wood'
            },
            {
                tag: 'forge:treated_wood'
            },
            {
                tag: 'forge:treated_wood'
            },
            {
                item: 'immersiveengineering:plate_steel'
            },
            {
                item: 'immersiveengineering:plate_steel'
            },
            {
                item: 'immersiveengineering:plate_steel'
            },
            {
                item: 'immersiveengineering:plate_steel'
            }
        ],
        results: [
            {
                item: 'immersive_aircraft:hull'
            }
        ]
    }).id('kubejs:hull_compacting')
    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            ' PRP ',
            'PSCSP',
            'PMBMP',
            ' PPP '
        ],
        key: {
            P: {
                item: 'immersiveengineering:plate_steel'
            },
            R: {
                item: 'immersiveengineering:stick_steel'
            },
            S: {
                item: 'create:steam_engine'
            },
            C: {
                item: 'create:brass_casing'
            },
            M: {
                item: 'create:precision_mechanism'
            },
            B: {
                item: 'immersive_aircraft:boiler'
            }
        },
        result: {
            item: 'immersive_aircraft:engine'
        }
    }).id('kubejs:engine_mech_crafting')
    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            'BBB',
            'BCB',
            'BBB'
        ],
        key: {
            C: {
                item: 'create:copper_casing'
            },
            B: {
                item: 'kubejs:high_temperature_brick'
            }
        },
        result: {
            item: 'immersive_aircraft:boiler'
        }
    }).id('kubejs:boiler_mech_crafting')
    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            'HHHH',
            'HHHH',
            'HHHH',
            'HHHH'
        ],
        key: {
            H: {
                item: 'immersiveengineering:hemp_fabric'
            }
        },
        result: {
            item: 'immersive_aircraft:sail'
        }
    }).id('kubejs:sail_mech_crafting')
    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            'PPRPP'
        ],
        key: {
            R: {
                item: 'immersiveengineering:stick_steel'
            },
            P: {
                item: 'immersiveengineering:plate_steel'
            }
        },
        result: {
            item: 'immersive_aircraft:propeller'
        }
    }).id('kubejs:propeller_mech_crafting')
    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            ' SSS ',
            ' S S ',
            'H E H',
            ' HHH '
        ],
        key: {
            S: {
                item: 'immersive_aircraft:sail'
            },
            H: {
                item: 'immersive_aircraft:hull'
            },
            E: {
                item: 'immersive_aircraft:engine'
            }
        },
        result: {
            item: 'immersive_aircraft:airship'
        }
    }).id('kubejs:airship_mech_crafting')
    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            '   P   ',
            'HHHEHHH',
            ' HHSHH ',
            '   H   ',
            '  HHH  '
        ],
        key: {
            S: {
                tag: 'create:seats'
            },
            H: {
                item: 'immersive_aircraft:hull'
            },
            E: {
                item: 'immersive_aircraft:engine'
            },
            P: {
                item: 'immersive_aircraft:propeller'
            }
        },
        result: {
            item: 'immersive_aircraft:biplane'
        }
    }).id('kubejs:biplane_mech_crafting')
    event.custom({
        type: 'create:mechanical_crafting',
        pattern: [
            '   P   ',
            '   R   ',
            'HS R SH',
            ' HHMHH '
        ],
        key: {
            S: {
                item: 'immersive_aircraft:sail'
            },
            H: {
                item: 'immersive_aircraft:hull'
            },
            R: {
                item: 'immersiveengineering:stick_steel'
            },
            P: {
                item: 'immersive_aircraft:propeller'
            },
            M: {
                item: 'create:precision_mechanism'
            }
        },
        result: {
            item: 'immersive_aircraft:gyrodyne'
        }
    }).id('kubejs:gyrodyne_mech_crafting')
}

function aquacultureRecipes(event) {
    for (let mat of ['wooden', 'stone', 'iron', 'gold', 'diamond']) {
        event.remove({id: `aquaculture:${mat}_fillet_knife`})
    }
}

function chunkLoaderRecipes(event) {
    for (let type of ['basic', 'advanced', 'ultimate']) {
        event.remove({id: `chunkloaders:${type}_chunk_loader`})
    }
    event.shaped(
        'chunkloaders:basic_chunk_loader',
        [
            'AOA',
            'OEO',
            'AOA'
        ],
        {
            A: 'create:andesite_alloy',
            O: 'minecraft:obsidian',
            E: 'minecraft:ender_pearl'
        }
    ).id('kubejs:basic_chunk_loader')
    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'chunkloaders:basic_chunk_loader'
            },
            {
                fluid: 'kubejs:molten_brass',
                amount: 144
            }
        ],
        results: [
            {
                item: 'chunkloaders:advanced_chunk_loader'
            }
        ]
    }).id('kubejs:advanced_chunk_loader')
    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'chunkloaders:advanced_chunk_loader'
            },
            {
                fluid: 'create:potion',
                nbt: '{Potion:"minecraft:swiftness"}',
                amount: 1000
            }
        ],
        results: [
            {
                item: 'chunkloaders:ultimate_chunk_loader'
            }
        ]
    }).id('kubejs:ultimate_chunk_loader')
}

function endRemRecipes(event) {
    event.recipes.summoningrituals
        .altar(Ingredient.of('kubejs:soul_of_a_pirate'))
        .itemOutput(Item.of('endrem:black_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
    event.recipes.summoningrituals
        .altar(Ingredient.of('kubejs:effervescent_snowflake'))
        .itemOutput(Item.of('endrem:cold_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
    event.recipes.summoningrituals
        .altar(Ingredient.of('kubejs:pharaohs_ankh'))
        .itemOutput(Item.of('endrem:old_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
    event.recipes.summoningrituals
        .altar(Ingredient.of('kubejs:mark_of_the_accursed'))
        .itemOutput(Item.of('endrem:cursed_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
    event.recipes.summoningrituals
        .altar(Ingredient.of('bygonenether:warped_ender_pearl'))
        .itemOutput(Item.of('endrem:corrupted_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
        .input(Ingredient.of('minecraft:gilded_blackstone', 4))
        .input(Ingredient.of('minecraft:netherite_ingot', 4))
    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:rabbit_foot'))
        .itemOutput(Item.of('endrem:evil_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
        .sacrifice('minecraft:rabbit', 16)
        .sacrifice('minecraft:villager', 4)
        .sacrificeRegion(10, 3)
    event.recipes.summoningrituals
        .altar(Ingredient.of('hexcasting:uuid_colorizer'))
        .itemOutput(Item.of('endrem:magical_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
        .input(Ingredient.of('hexcasting:edified_log', 4))
        .blockBelow('minecraft:budding_amethyst')
    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:nether_star'))
        .itemOutput(Item.of('endrem:wither_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:spider_eye'))
        .itemOutput(Item.of('endrem:witch_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
        .sacrifice('minecraft:witch', 4)
        .sacrificeRegion(5, 3)
        .mobOutput(
            SummoningOutput.mob('minecraft:potion')
                .data({Item:{Count:1,id:"minecraft:potion",tag:{CustomPotionEffects:[{Id:19,Amplifier:2,Duration:600,Ambient:0,ShowParticles:1,ShowIcon:1}],CustomPotionColor:2212428}}})
        )
    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:conduit'))
        .itemOutput(Item.of('endrem:exotic_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))
    event.recipes.summoningrituals
        .altar(Ingredient.of('kubejs:eye_of_revelation'))
        .itemOutput(Item.of('endrem:cryptic_eye'))
        .input(Ingredient.of('minecraft:ender_eye', 4))

    event.recipes.minecraft.smithing(
        'endrem:lost_eye',
        'minecraft:ender_eye',
        '#custom:artifact_weapons'
    ).id('kubejs:lost_eye_smithing')

    event.custom({
        type: 'create:filling',
        ingredients: [
            {
                item: 'minecraft:ender_eye'
            },
            {
                fluid: 'create:potion',
                amount: 1000,
                nbt: '{Potion:"alexsmobs:poison_resistance"}'
            }
        ],
        results: [
            {
                item: 'endrem:rogue_eye'
            }
        ]
    }).id('kubejs:rogue_eye_filling')
}

function davesPotioneeringRecipes(event) {
    event.remove({id:'davespotioneering:potioneer_gauntlet'})
    event.custom({
        type: 'apotheosis:enchanting',
        input: {
            item: 'davespotioneering:netherite_gauntlet'
        },
        requirements: {
            eterna: 20.0,
            quanta: 50.0,
            arcana: 57.5
        },
        max_requirements: {
            eterna: 20.0,
            quanta: 50.0,
            arcana: 57.5
        },
        display_level: 5,
        result: {
            item: 'davespotioneering:potioneer_gauntlet',
            count: 1
        }
    }).id('kubejs:potioneer_gauntlet_enchanting')

    event.remove({id:'davespotioneering:potion_injector'})
    event.shaped(
        'davespotioneering:potion_injector',
        [
            'HIH',
            'IBI',
            'HIH'
        ],
        {
            H: 'minecraft:hopper',
            I: 'minecraft:iron_block',
            B: 'minecraft:brewing_stand'
        }
    ).id('kubejs:potion_injector')
}

function enchantableStaffsRecipes(event) {
    event.recipes.summoningrituals
        .altar(Ingredient.of('quark:rainbow_rune'))
        .itemOutput(Ingredient.of('kubejs:staff_core'))
        .input(Ingredient.of('minecraft:diamond'))
        .input(Ingredient.of('minecraft:amethyst_shard'))
        .input(Ingredient.of('minecraft:netherite_scrap'))
        .input(Ingredient.of('minecraft:quartz'))
        .input(Ingredient.of('apotheosis:gem_dust'))
        .sacrifice('minecraft:enderman')
        .sacrificeRegion(7, 3)
    for (let staff of ['iron', 'reinforced_iron', 'gold', 'reinforced_gold', 'netherite', 'plated_netherite']) {
        event.remove({id:`enchantable_staffs:${staff}_staff`})
    }
    event.shaped(
        'enchantable_staffs:iron_staff',
        [
            '  B',
            ' C ',
            'B  '
        ],
        {
            B: 'minecraft:iron_block',
            C: 'kubejs:staff_core'
        }
    ).id('kubejs:iron_staff')
    event.shaped(
        'enchantable_staffs:gold_staff',
        [
            '  B',
            ' C ',
            'B  '
        ],
        {
            B: 'minecraft:gold_block',
            C: 'kubejs:staff_core'
        }
    ).id('kubejs:gold_staff')
    event.shaped(
        'enchantable_staffs:netherite_staff',
        [
            '  B',
            ' C ',
            'B  '
        ],
        {
            B: 'minecraft:netherite_ingot',
            C: 'kubejs:staff_core'
        }
    ).id('kubejs:netherite_staff')
    event.recipes.minecraft.smithing(
        'enchantable_staffs:reinforced_iron_staff',
        'enchantable_staffs:iron_staff',
        'minecraft:emerald_block'
    ).id('kubejs:reinforced_iron_staff')
    event.recipes.minecraft.smithing(
        'enchantable_staffs:reinforced_gold_staff',
        'enchantable_staffs:gold_staff',
        'minecraft:diamond_block'
    ).id('kubejs:reinforced_gold_staff')
    event.recipes.minecraft.smithing(
        'enchantable_staffs:plated_netherite_staff',
        'enchantable_staffs:netherite_staff',
        'minecraft:gold_block'
    ).id('kubejs:plated_netherite_staff')
}

function enigmaticLegacyRecipes(event) {
    event.shaped(
        'enigmaticlegacy:earth_heart',
        [
            'GSG',
            'SHS',
            'GSG'
        ],
        {
            G: 'apotheosis:gem_dust',
            S: 'apotheosis:rare_material',
            H: 'minecraft:heart_of_the_sea'
        }
    ).id('kubejs:earth_heart')
    event.custom({
        type: 'enigmaticlegacy:crafting_shaped_cursed',
        pattern: [
            ' E ',
            'BHB',
            'EPE'
        ],
        key: {
            E: {
                item: 'minecraft:ender_pearl'
            },
            B: {
                item: 'minecraft:blaze_powder'
            },
            H: {
                item: 'enigmaticlegacy:earth_heart'
            },
            P: {
                tag: 'minecraft:music_discs'
            }
        },
        result: {
            item: 'enigmaticlegacy:twisted_heart'
        }
    }).id('kubejs:twisted_heart')
    event.shaped(
        'enigmaticlegacy:twisted_mirror',
        [
            'SRS',
            'RTR',
            'SRS'
        ],
        {
            S: 'immersiveengineering:ingot_silver',
            R: 'minecraft:respawn_anchor',
            T: 'enigmaticlegacy:twisted_heart'
        }
    ).id('kubejs:twisted_mirror')
    event.shaped(
        'enigmaticlegacy:darkest_scroll',
        [
            ' S ',
            'STS',
            ' S '
        ],
        {
            S: 'enigmaticlegacy:thicc_scroll',
            T: 'enigmaticlegacy:twisted_heart'
        }
    ).id('kubejs:darkest_scroll')
    event.custom({
        type: 'apotheosis:enchanting',
        input: {
            item: 'enigmaticlegacy:darkest_scroll'
        },
        requirements: {
            eterna: 0.0,
            quanta: 100.0,
            arcana: 0.0
        },
        max_requirements: {
            eterna: 50.0,
            quanta: 100.0,
            arcana: 10.0
        },
        display_level: 5,
        result: {
            item: 'enigmaticlegacy:cursed_scroll',
            count: 1
        }
    }).id('kubejs:cursed_scroll')
    event.recipes.summoningrituals
        .altar(Ingredient.of('enigmaticlegacy:darkest_scroll'))
        .itemOutput(Ingredient.of('enigmaticlegacy:avarice_scroll'))
        .sacrifice('minecraft:piglin')
        .sacrifice('minecraft:piglin')
        .sacrifice('minecraft:piglin')
        .sacrifice('minecraft:piglin')
        .sacrificeRegion(10, 5)
        .blockBelow('minecraft:gold_block')
    event.shaped(
        'enigmaticlegacy:berserk_charm',
        [
            'BBB',
            'NTN',
            'BBB'
        ],
        {
            B: 'alexsmobs:blood_sac',
            N: 'minecraft:netherite_ingot',
            T: 'enigmaticlegacy:twisted_heart'
        }
    ).id('kubejs:berserk_charm')
    event.shaped(
        '8x enigmaticlegacy:twisted_potion',
        [
            'WWW',
            'WTW',
            'WWW'
        ],
        {
            W: 'minecraft:glass_bottle',
            T: 'enigmaticlegacy:twisted_heart'
        }
    ).id('kubejs:twisted_potion')
    event.smithing(
        'enigmaticlegacy:infernal_shield',
        'minecraft:shield',
        'enigmaticlegacy:twisted_heart'
    ).id('kubejs:infernal_shield')
    event.shaped(
        'enigmaticlegacy:soul_compass',
        [
            'SRS',
            'RTR',
            'SRS'
        ],
        {
            S: 'minecraft:gold_ingot',
            R: 'minecraft:compass',
            T: 'enigmaticlegacy:twisted_heart'
        }
    ).id('kubejs:soul_compass')
    event.shaped(
        'enigmaticlegacy:curse_transposer',
        [
            'WWW',
            'WTW',
            'WWW'
        ],
        {
            W: 'minecraft:enchanted_book',
            T: 'enigmaticlegacy:twisted_heart'
        }
    ).id('kubejs:curse_transposer')
    event.shapeless(
        'enigmaticlegacy:the_acknowledgment',
        [
            'minecraft:book',
            'minecraft:lantern'
        ]
    ).id('kubejs:the_acknowledgment')
    event.smithing(
        'enigmaticlegacy:the_twist',
        'enigmaticlegacy:the_acknowledgment',
        'enigmaticlegacy:twisted_heart'
    ).id('kubejs:the_twist')
    event.smithing(
        'enigmaticlegacy:the_infinitum',
        'enigmaticlegacy:the_twist',
        'enigmaticlegacy:abyssal_heart'
    ).id('kubejs:the_infinitum')
    event.shaped(
        'enigmaticlegacy:iron_ring',
        [
            'NIN',
            'I I',
            'NIN'
        ],
        {
            I: 'minecraft:iron_ingot',
            N: 'minecraft:iron_nugget'
        }
    ).id('kubejs:iron_ring')
    event.smithing(
        'enigmaticlegacy:desolation_ring',
        'enigmaticlegacy:iron_ring',
        'enigmaticlegacy:abyssal_heart'
    ).id('kubejs:desolation_ring')
    event.smithing(
        'enigmaticlegacy:eldritch_amulet',
        '#custom:necklaces',
        'enigmaticlegacy:abyssal_heart'
    ).id('kubejs:eldritch_amulet')
    event.recipes.summoningrituals
        .altar(Ingredient.of('enigmaticlegacy:twisted_heart'))
        .itemOutput(Ingredient.of('enigmaticlegacy:soul_crystal'))
        .input(Ingredient.of('minecraft:diamond_block', 4))
        .input(Ingredient.of('#meetyourfight:boss_drop'))
        .input(Ingredient.of('minecraft:totem_of_undying'))
        .input(Ingredient.of('quark:rainbow_rune'))
        .sacrifice('quark:wraith')
        .sacrifice('minecraft:phantom')
        .sacrificeRegion(10, 5)
    event.remove({id:'enigmaticlegacy:cursed_stone'})
    event.shaped(
        'enigmaticlegacy:cursed_stone',
        [
            'NTN',
            'LSL',
            'NTN'
        ],
        {
            N: 'minecraft:netherite_ingot',
            T: 'enigmaticlegacy:twisted_heart',
            L: 'minecraft:lava_bucket',
            S: 'minecraft:nether_star'
        }
    ).id('kubejs:cursed_stone')
}

function oldGunsRecipes(event) {
    event.remove({id:'oldguns:mortar_and_pestle'})
    event.custom({
        type: 'oldguns:gunsmiths_bench_shaped',
        conditions: [],
        pattern: [
            ' L ',
            'S S',
            ' S '
        ],
        key: {
            L: {
                item: 'minecraft:lever'
            },
            S: {
                tag: 'forge:stone'
            }
        },
        result: {
            item: 'oldguns:mortar_and_pestle',
            nbt: {
                Damage: 0
            }
        }
    }).id('kubejs:mortar_and_pestle_gunsmith')
    event.custom({
        type: 'oldguns:gunsmiths_bench_shapeless',
        conditions: [],
        ingredients: [
            {
                item: 'minecraft:honey_bottle'
            },
            {
                tag: 'minecraft:wool'
            },
            {
                tag: 'forge:rods/wooden'
            },
            {
                tag: 'forge:leather'
            },
            {
                tag: 'minecraft:logs'
            },
            {
                item: 'minecraft:lever'
            }
        ],
        result: {
            item: 'oldguns:repair_kit',
            nbt: {
                Damage: 0
            }
        }
    }).id('kubejs:repair_kit_alt_gunsmith')
}

function spelunkeryRecipes(event) {
    event.remove({id:'spelunkery:mixing/portal_fluid'})
    event.remove({id:'spelunkery:emptying/crying_obsidian'})
    event.remove({id:'spelunkery:emptying/portal_fluid'})
    event.remove({id:'spelunkery:diamond_grindstone'})
}

function coinRecipes(event) {
    let mats = ['copper', 'iron', 'gold', 'netherite']
    for (let mat of mats) {
        event.remove({id:`createdeco:${mat}_coin`})
        event.remove({id:`createdeco:${mat}_coinstack`})
        event.shapeless(
            `createdeco:${mat}_coinstack`,
            [
                `9x createdeco:${mat}_coin`
            ]
        ).id(`kubejs:${mat}_coinstack`)
        event.shapeless(
            `9x createdeco:${mat}_coin`,
            [
                `createdeco:${mat}_coinstack`
            ]
        ).id(`kubejs:${mat}_coin_from_coinstack`)
    }
    event.shapeless(
        'createdeco:iron_coin',
        [
            '4x createdeco:copper_coin'
        ]
    ).id('kubejs:coin_copper_to_iron')
    event.shapeless(
        '4x createdeco:copper_coin',
        [
            'createdeco:iron_coin'
        ]
    ).id('kubejs:coin_iron_to_copper')
    event.shapeless(
        'createdeco:gold_coin',
        [
            '8x createdeco:iron_coin'
        ]
    ).id('kubejs:coin_iron_to_gold')
    event.shapeless(
        '8x createdeco:iron_coin',
        [
            'createdeco:gold_coin'
        ]
    ).id('kubejs:coin_gold_to_iron')
    event.shapeless(
        'createdeco:netherite_coin',
        [
            '4x createdeco:gold_coin'
        ]
    ).id('kubejs:coin_gold_to_netherite')
    event.shapeless(
        '4x createdeco:gold_coin',
        [
            'createdeco:netherite_coin'
        ]
    ).id('kubejs:coin_netherite_to_gold')
    event.shapeless(
        '6x createdeco:copper_coin',
        [
            'minecraft:emerald'
        ]
    ).id('kubejs:coin_emerald_to_copper')
    event.remove({id:'spelunkery:emerald_shard'})
    event.remove({id:'spelunkery:emerald_from_shard'})
}

function tagOrItem(input) {
    return input.startsWith('#') ? {tag: input.split('#')[1]} : {item: input}
}

function goetyRecipes(event) {
    event.remove({id:'goety:cursed_infuser'})
    event.shaped(
        'goety:cursed_infuser',
        [
            '   ',
            'OEO',
            'SLS'
        ],
        {
            O: 'minecraft:crying_obsidian',
            E: 'kubejs:evoker_soul',
            S: 'minecraft:stone_brick_slab',
            L: 'minecraft:lapis_block'
        }
    ).id('kubejs:cursed_infuser')
    let cursedInfuser = function(input, result, time, id) {
        event.custom({
            type: 'goety:cursed_infuser_recipes',
            ingredient: tagOrItem(input),
            result: result,
            cookingTime: time
        }).id(id)
    }
    event.remove({id:'goety:cursed_ingot_craft'})
    event.remove({id:'goety:cursed_ingot_burner'})
    cursedInfuser('graveyard:dark_iron_ingot', 'goety:cursed_ingot', 60, 'kubejs:cursed_ingot_dark_iron')
    cursedInfuser('immersiveengineering:ingot_silver', 'goety:cursed_ingot', 60, 'kubejs:cursed_ingot_silver')
    cursedInfuser('immersiveengineering:ingot_uranium', 'goety:cursed_ingot', 60, 'kubejs:cursed_ingot_uranium')
    event.remove({id:'goety:magic_emerald_craft'})
    event.remove({id:'goety:savage_tooth_craft'})
    event.remove({id:'goety:haunted/haunted_sapling_craft'})
    event.remove({id:'goety:empty_focus_craft'})
    event.remove({id:'goety:shade/shade_stone_craft'})
    let ritualCraft = function(activator, craft_type, cost, duration, inputs, result, id) {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i] = tagOrItem(inputs[i])
        }
        event.custom({
            type: 'goety:ritual',
            ritual_type: 'goety:craft',
            activation_item: tagOrItem(activator),
            craftType: craft_type,
            soulCost: cost,
            duration: duration,
            ingredients: inputs,
            result: {
                item: result
            }
        }).id(id + '_manual_only')
    }
    let ritualCraftSacrifice = function(activator, craft_type, cost, duration, inputs, sacrifice_tag, sacrifice_display, result, id) {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i] = tagOrItem(inputs[i])
        }
        event.custom({
            type: 'goety:ritual',
            ritual_type: 'goety:craft',
            activation_item: tagOrItem(activator),
            craftType: craft_type,
            soulCost: cost,
            duration: duration,
            ingredients: inputs,
            entity_to_sacrifice: {
                tag: sacrifice_tag,
                display_name: sacrifice_display
            },
            result: {
                item: result
            }
        }).id(id + '_manual_only')
    }
    event.remove({id:'goety:empty_focus_burner'})
    cursedInfuser('hexcasting:charged_amethyst', 'goety:empty_focus', 100, 'kubejs:empty_focus')
    event.remove({id:'goety:animation_core'})
    ritualCraft(
        'goety:empty_focus', 'animation', 10, 15, 
        [
            'minecraft:minecart', 
            '#forge:feathers', 
            'minecraft:ender_pearl', 
            'minecraft:sugar'
        ], 
        'goety:animation_core', 
        'kubejs:animation_core'
    )
    event.remove({id:'goety:hunger_core'})
    ritualCraft(
        'goety:empty_focus', 'animation', 10, 15, 
        [
            'minecraft:rotten_flesh',
            '#goety:meat',
            'minecraft:pufferfish',
            'minecraft:spider_eye',
            'goety:savage_tooth',
            'minecraft:poisonous_potato',
            'farmersdelight:organic_compost',
            'farmersdelight:rotten_tomato'
        ],
        'goety:hunger_core',
        'kubejs:hunger_core'
    )
    event.remove({id:'goety:wind_core'})
    ritualCraft(
        'goety:empty_focus', 'sky', 10, 15, 
        [
            'minecraft:phantom_membrane', 
            '#forge:feathers', 
            'quark:bottled_cloud', 
            'hexcasting:amethyst_dust'
        ], 
        'goety:wind_core', 
        'kubejs:wind_core'
    )
    event.remove({id:'goety:mystic_core'})
    ritualCraft(
        'goety:empty_focus', 'magic', 10, 15, 
        [
            'hexcasting:charged_amethyst', 
            'minecraft:enchanted_book', 
            'apotheosis:gem_dust', 
            'irons_spellbooks:arcane_essence'
        ], 
        'goety:mystic_core', 
        'kubejs:mystic_core'
    )
    event.remove({id:'goety:focus/biting_focus'})
    ritualCraft(
        'goety:mystic_core', 'magic', 25, 40, 
        [
            'goety:magic_emerald', 
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            '#custom:teeth',
            '#custom:teeth',
            '#custom:teeth',
            '#custom:teeth',
            'goety:savage_tooth',
            'goety:savage_tooth',
            'goety:savage_tooth',
            'goety:savage_tooth',
        ], 
        'goety:biting_focus', 
        'kubejs:biting_focus'
    )
    event.remove({id:'goety:focus/feast_focus'})
    ritualCraft(
        'goety:biting_focus', 'magic', 30, 40, 
        [
            'minecraft:ender_pearl', 
            'minecraft:ender_pearl',
            'minecraft:ender_pearl',
            'minecraft:ender_pearl',
        ], 
        'goety:feast_focus', 
        'kubejs:feast_focus'
    )
    event.remove({id:'goety:focus/teeth_focus'})
    ritualCraft(
        'goety:biting_focus', 'magic', 30, 40,
        [
            'goety:savage_tooth',
            'goety:savage_tooth',
            'goety:savage_tooth',
            'goety:savage_tooth'
        ],
        'goety:teeth_focus',
        'kubejs:teeth_focus'
    )
    event.remove({id:'goety:focus/barricade_focus'})
    ritualCraft(
        'goety:mystic_core', 'magic', 30, 60,
        [
            '#forge:stone',
            '#forge:stone',
            '#forge:stone',
            '#forge:stone',
            'supplementaries:bomb',
            'supplementaries:bomb',
            'supplementaries:bomb_spiky',
            'supplementaries:bomb_spiky',
            'minecraft:amethyst_block',
            'minecraft:amethyst_block',
            'minecraft:obsidian',
            'minecraft:obsidian'
        ],
        'goety:barricade_focus',
        'kubejs:barricade_focus'
    )
    event.remove({id:'goety:focus/vexing_focus'})
    ritualCraft(
        'goety:animation_core', 'animation', 50, 60,
        [
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:animation_core',
            'goety:hunger_core',
            'goety:wind_core',
            'goety:wind_core',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'minecraft:totem_of_undying',
            'minecraft:totem_of_undying',
        ],
        'goety:vexing_focus',
        'kubejs:vexing_focus'
    )
    event.remove({id:'goety:focus/fire_breath_focus'})
    ritualCraft(
        'goety:empty_focus', 'magic', 25, 40,
        [
            '#minecraft:coals',
            '#minecraft:coals',
            '#minecraft:coals',
            '#minecraft:coals',
            'minecraft:gunpowder',
            'minecraft:gunpowder',
            'minecraft:gunpowder',
            'minecraft:gunpowder',
            'minecraft:campfire',
            'minecraft:campfire',
            'minecraft:flint_and_steel',
            'minecraft:flint_and_steel'
        ],
        'goety:fire_breath_focus',
        'kubejs:fire_breath_focus'
    )
    event.remove({id:'goety:focus/iceology_focus'})
    ritualCraft(
        'goety:wind_core', 'storm', 25, 60,
        [
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'minecraft:blue_ice',
            'minecraft:blue_ice',
            'minecraft:blue_ice',
            'minecraft:blue_ice',
            'savage_and_ravage:wand_of_freezing',
            'minecraft:powder_snow_bucket',
            'kubejs:effervescent_snowflake',
            'minecraft:powder_snow_bucket',
        ],
        'goety:iceology_focus',
        'kubejs:iceology_focus'
    )
    event.remove({id:'goety:focus/illusion_focus'})
    ritualCraftSacrifice(
        'goety:animation_core', 'animation', 25, 60,
        [
            'magic_mirror:magic_mirror',
            'magic_mirror:magic_mirror',
            'magic_mirror:magic_mirror',
            'magic_mirror:magic_mirror',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
        ],
        'custom:player_dummy', 'Player',
        'goety:illusion_focus',
        'kubejs:illusion_focus'
    )
    event.remove({id:'goety:focus/soul_bolt_focus'})
    ritualCraft(
        'goety:soul_light_focus', 'magic', 25, 40,
        [
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:ectoplasm',
            'goety:ectoplasm',
            'goety:ectoplasm',
            'goety:ectoplasm',
            'quark:soul_bead',
            'quark:soul_bead',
            'quark:soul_bead',
            'quark:soul_bead',
        ],
        'goety:soul_bolt_focus',
        'kubejs:soul_bolt_focus'
    )
    event.remove({id:'goety:focus/soul_light_focus'})
    ritualCraft(
        'goety:empty_focus', 'magic', 50, 10,
        [
            'minecraft:soul_lantern',
            'minecraft:soul_lantern',
            'minecraft:soul_lantern',
            'minecraft:soul_lantern',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
        ],
        'goety:soul_light_focus',
        'kubejs:soul_light_focus'
    )
    event.remove({id:'goety:focus/glow_light_focus'})
    ritualCraft(
        'goety:empty_focus', 'magic', 50, 10,
        [
            'minecraft:lantern',
            'minecraft:lantern',
            'minecraft:lantern',
            'minecraft:lantern',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
        ],
        'goety:glow_light_focus',
        'kubejs:glow_light_focus'
    )
    event.remove({id:'goety:focus/lightning_focus'})
    ritualCraft(
        'goety:wind_core', 'storm', 50, 100,
        [
            'goety:soul_ruby',
            'minecraft:trident',
            'minecraft:heart_of_the_sea',
            'minecraft:lightning_rod',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
        ],
        'goety:lightning_focus',
        'kubejs:lightning_focus'
    )
    event.remove({id:'goety:focus/sonic_boom_focus'})
    ritualCraft(
        'goety:hunger_core', 'magic', 50, 100,
        [
            'goety:soul_ruby',
            'minecraft:sculk_sensor',
            'minecraft:sculk_shrieker',
            'minecraft:sculk_catalyst',
            'minecraft:echo_shard',
            'minecraft:echo_shard',
            'minecraft:echo_shard',
            'minecraft:echo_shard',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
        ],
        'goety:sonic_boom_focus',
        'kubejs:sonic_boom_focus'
    )
    event.remove({id:'goety:focus/launch_focus'})
    ritualCraft(
        'goety:wind_core', 'sky', 50, 100,
        [
            '#custom:aircraft',
            'minecraft:phantom_membrane',
            'minecraft:phantom_membrane',
            'minecraft:phantom_membrane',
        ],
        'goety:launch_focus',
        'kubejs:launch_focus'
    )
    event.remove({id:'goety:focus/rotting_focus'})
    ritualCraftSacrifice(
        'goety:animation_core', 'necroturgy', 25, 40,
        [
            'minecraft:rotten_flesh',
            'minecraft:rotten_flesh',
            'minecraft:rotten_flesh',
            'minecraft:rotten_flesh',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
        ],
        'custom:zombie_dummy', 'Zombie',
        'goety:rotting_focus',
        'kubejs:rotting_focus'
    )
    event.remove({id:'goety:focus/osseous_focus'})
    ritualCraftSacrifice(
        'goety:animation_core', 'necroturgy', 25, 40,
        [
            'minecraft:bone',
            'minecraft:arrow',
            'minecraft:bone',
            'minecraft:arrow',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
        ],
        'custom:skeleton_dummy', 'Skeleton',
        'goety:osseous_focus',
        'kubejs:osseous_focus'
    )
    event.remove({id:'goety:focus/spooky_focus'})
    ritualCraftSacrifice(
        'goety:animation_core', 'necroturgy', 50, 40,
        [
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:magic_emerald',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
        ],
        'custom:wraith_dummy', 'Wraith',
        'goety:spooky_focus',
        'kubejs:spooky_focus'
    )

    event.remove({id:'goety:dark_scythe'})
    ritualCraft(
        'minecraft:iron_hoe', 'forge', 25, 60,
        [
            'goety:hunger_core',
            'goety:hunger_core',
            'goety:hunger_core',
            'goety:hunger_core',
            'goety:savage_tooth',
            'goety:savage_tooth',
            'goety:cursed_ingot',
            'goety:cursed_ingot',
            '#goety:haunted_logs',
            '#goety:haunted_logs',
            'apotheosis:common_material',
            'apotheosis:common_material',
        ],
        'goety:dark_scythe',
        'kubejs:dark_scythe'
    )
    event.remove({id:'goety:death_scythe'})
    ritualCraft(
        'goety:dark_scythe', 'forge', 100, 100,
        [
            'goety:unholy_blood',
            'minecraft:dragon_breath',
            'goety:soul_ruby',
            'minecraft:dragon_breath',
            'goety:ectoplasm',
            'goety:ectoplasm',
            'goety:ectoplasm',
            'goety:ectoplasm',
            'minecraft:netherite_ingot',
            'minecraft:netherite_ingot',
            'kubejs:evoker_soul',
            'hexcasting:uuid_colorizer',
        ],
        'goety:death_scythe',
        'kubejs:death_scythe'
    )
    event.remove({id:'goety:undeath_potion'})
    ritualCraftSacrifice(
        'goety:unholy_blood', 'lich', 1000, 60,
        [
            'minecraft:totem_of_undying',
            'goety:totem_of_souls',
            'minecraft:enchanted_golden_apple',
            'kubejs:mark_of_the_accursed',
            'goety:soul_ruby',
            '#custom:lich_staves',
            'apotheosis:mythic_material',
            '#curios:spellstone',
            'minecraft:lava_bucket',
            'minecraft:ghast_tear',
            'the_bumblezone:honey_bucket',
            'minecraft:wither_skeleton_skull',
        ],
        'forge:villagers', 'Villager',
        'goety:undeath_potion',
        'kubejs:undeath_potion'
    )
    event.remove({id:'goety:dark_fabric'})
    event.shaped(
        'goety:dark_fabric',
        [
            'SIS',
            'IAI',
            'SIS'
        ],
        {
            S: 'graveyard:corruption',
            I: 'immersiveengineering:hemp_fabric',
            A: 'apotheosis:uncommon_material'
        }
    ).id('kubejs:dark_fabric')
    event.remove({id:'goety:magic_fabric'})
    event.shaped(
        'goety:magic_fabric',
        [
            'SIS',
            'IAI',
            'SIS'
        ],
        {
            S: 'minecraft:magma_cream',
            I: 'immersiveengineering:hemp_fabric',
            A: 'apotheosis:uncommon_material'
        }
    ).id('kubejs:magic_fabric')
    event.remove({id:'goety:occult_fabric'})
    event.shaped(
        'goety:occult_fabric',
        [
            'SIS',
            'IAI',
            'SIS'
        ],
        {
            S: 'hexcasting:amethyst_dust',
            I: 'immersiveengineering:hemp_fabric',
            A: 'apotheosis:uncommon_material'
        }
    ).id('kubejs:occult_fabric')
    event.remove({id:'goety:spirit_fabric'})
    event.shaped(
        'goety:spirit_fabric',
        [
            'SIS',
            'IAI',
            'SIS'
        ],
        {
            S: 'goety:ectoplasm',
            I: 'immersiveengineering:hemp_fabric',
            A: 'apotheosis:uncommon_material'
        }
    ).id('kubejs:spirit_fabric')
    event.remove({id:'goety:cursed_metal_block_burner'})
    event.remove({id:'goety:totem_of_roots'})
    event.remove({id:'goety:totem_of_souls'})
    event.shaped(
        'goety:totem_of_roots',
        [
            'GEG',
            'ETE',
            'GEG'
        ],
        {
            G: 'minecraft:gold_ingot',
            E: 'goety:magic_emerald',
            T: 'minecraft:totem_of_undying'
        }
    ).id('kubejs:totem_of_roots')
    cursedInfuser('goety:totem_of_roots', 'goety:totem_of_souls', 200, 'kubejs:totem_of_souls')
    event.remove({id:'goety:dark_wand'})
    event.recipes.summoningrituals
        .altar(Ingredient.of('minecraft:stick'))
        .input(Ingredient.of('goety:magic_fabric'))
        .input(Ingredient.of('goety:empty_focus'))
        .input(Ingredient.of('minecraft:lapis_lazuli'))
        .itemOutput('goety:dark_wand')
    event.remove({id:'goety:soul_absorber'})
    ritualCraft(
        'goety:cursed_infuser', 'forge', 40, 100,
        [
            '#goety:shade_stone',
            'goety:cursed_metal_block',
            '#goety:shade_stone',
            'goety:cursed_metal_block',
            'minecraft:hopper',
            'goety:hunger_core',
            'minecraft:hopper',
            'goety:hunger_core',
        ],
        'goety:soul_absorber',
        'kubejs:soul_absorber'
    )
    event.remove({id:'goety:witch_robe'})
    ritualCraft(
        'minecraft:brewing_stand', 'storm', 30, 100,
        [
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'minecraft:nether_wart',
            'goety:dark_fabric',
            'minecraft:nether_wart',
            'goety:dark_fabric',
            'minecraft:glowstone_dust',
            'goety:dark_fabric',
            'minecraft:glowstone_dust',
            'goety:dark_fabric',
        ],
        'goety:witch_robe',
        'kubejs:witch_robe'
    )
    event.remove({id:'goety:arca'})
    ritualCraft(
        'goety:cursed_cage', 'forge', 100, 100,
        [
            'minecraft:lodestone',
            'goety:totem_of_souls',
            'minecraft:respawn_anchor',
            'minecraft:recovery_compass',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            '#goety:shade_stone',
            '#goety:shade_stone',
            '#goety:shade_stone',
            '#goety:shade_stone',
        ],
        'goety:arca',
        'kubejs:arca'
    )
    event.remove({id:'goety:grave_glove'})
    ritualCraft(
        'davespotioneering:rudimentary_gauntlet', 'necroturgy', 50, 40,
        [
            '#forge:leather',
            '#forge:leather',
            '#forge:leather',
            '#forge:leather',
            'goety:spirit_fabric',
            'goety:magic_fabric',
            'goety:spirit_fabric',
            'goety:dark_fabric',
        ],
        'goety:grave_glove',
        'kubejs:grave_glove'
    )
    event.remove({id:'goety:ring_of_want'})
    ritualCraft(
        'enigmaticlegacy:iron_ring', 'magic', 25, 60,
        [
            'minecraft:gold_ingot',
            'minecraft:gold_ingot',
            'minecraft:gold_ingot',
            'minecraft:gold_ingot',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'goety:soul_emerald',
            'minecraft:diamond',
            'minecraft:diamond',
            'minecraft:diamond',
            'minecraft:diamond',
        ],
        'goety:ring_of_want',
        'kubejs:ring_of_want'
    )
    event.remove({id:'goety:summon_storm'})
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:summon',
        activation_item: {
            item: 'minecraft:clock'
        },
        craftType: 'air',
        entity_to_summon: 'goety:storm_util',
        soulCost: 10,
        duration: 10,
        ingredients: [
            {
                item: 'quark:bottled_cloud'
            },
            {
                item: 'quark:bottled_cloud'
            },
            {
                item: 'minecraft:water_bucket'
            },
            {
                item: 'minecraft:water_bucket'
            }
        ],
        result: {
            item: 'goety:jei_dummy/none'
        }
    }).id('kubejs:summon_storm_manual_only')
    event.remove({id:'goety:summon_skeleton_horse'})
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:summon_tamed',
        activation_item: {
            tag: 'forge:leather'
        },
        craftType: 'necroturgy',
        entity_to_sacrifice: {
            tag: 'forge:horses',
            display_name: 'Horse'
        },
        entity_to_summon: 'minecraft:skeleton_horse',
        soulCost: 10,
        duration: 30,
        ingredients: [
            {
                item: 'minecraft:bone'
            },
            {
                item: 'minecraft:bone'
            },
            {
                item: 'minecraft:bone'
            },
            {
                item: 'minecraft:bone'
            }
        ],
        result: {
            item: 'goety:jei_dummy/none'
        }
    }).id('kubejs:summon_skeleton_horse_manual_only')
    event.remove({id:'goety:summon_zombie_horse'})
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:summon_tamed',
        activation_item: {
            tag: 'forge:leather'
        },
        craftType: 'necroturgy',
        entity_to_sacrifice: {
            tag: 'forge:horses',
            display_name: 'Horse'
        },
        entity_to_summon: 'minecraft:zombie_horse',
        soulCost: 10,
        duration: 30,
        ingredients: [
            {
                item: 'minecraft:rotten_flesh'
            },
            {
                item: 'minecraft:rotten_flesh'
            },
            {
                item: 'minecraft:rotten_flesh'
            },
            {
                item: 'minecraft:rotten_flesh'
            }
        ],
        result: {
            item: 'goety:jei_dummy/none'
        }
    }).id('kubejs:summon_zombie_horse_manual_only')
    event.remove({id:'goety:summon_apostle'})
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:summon',
        activation_item: {
            item: 'minecraft:netherite_ingot'
        },
        craftType: 'sabbath',
        entity_to_summon: 'goety:summon_apostle',
        soulCost: 10,
        duration: 100,
        ingredients: [
            {
                item: 'goety:witch_hat'
            },
            {
                item: 'goety:witch_hat'
            },
            {
                item: 'goety:witch_hat'
            },
            {
                item: 'goety:witch_hat'
            }
        ],
        result: {
            item: 'goety:jei_dummy/none'
        }
    }).id('kubejs:summon_apostle_manual_only')
    event.remove({id:'goety:necro_cape'})
    ritualCraft(
        'goety:dark_robe', 'necroturgy', 50, 100,
        [
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'minecraft:gold_ingot',
            'minecraft:gold_ingot',
            '#custom:backpack_hides',
            '#custom:backpack_hides',
        ],
        'goety:necro_cape',
        'kubejs:necro_cape'
    )
    event.remove({id:'goety:necro_crown'})
    ritualCraft(
        'goety:dark_hat', 'necroturgy', 50, 100,
        [
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:occult_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'goety:spirit_fabric',
            'minecraft:bone',
            'minecraft:bone',
            'minecraft:bone',
            'minecraft:bone',
        ],
        'goety:necro_crown',
        'kubejs:necro_crown'
    )
    event.custom({
        type: 'apotheosis:enchanting',
        input: {
            item: 'minecraft:amethyst_shard'
        },
        requirements: {
            eterna: 10.0,
            quanta: 20.0,
            arcana: 0.0
        },
        max_requirements: {
            eterna: 50.0,
            quanta: 100.0,
            arcana: 0.0
        },
        display_level: 5,
        result: {
            item: 'goety:empty_focus',
            count: 1
        }
    }).id('kubejs:empty_focus_enchanting')
}