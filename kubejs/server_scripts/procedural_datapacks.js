ServerEvents.highPriorityData(event => {

})

ServerEvents.lowPriorityData(event => {
    affixLootEntries(event)
    affixes(event)
    weaponAttributes(event)
    advancements(event)
    worldGen(event)
})

function affixLootEntries(event) {
    // ---------- Simply Swords Affix Loot Entries ----------

    const SIMPLY_SWORD_TYPES = [
        ['longsword', 'SWORD'],
        ['twinblade', 'SWORD'],
        ['rapier', 'TRIDENT'],
        ['katana', 'SWORD'],
        ['sai', 'SWORD'],
        ['spear', 'TRIDENT'],
        ['glaive', 'SWORD'],
        ['warglaive', 'SWORD'],
        ['cutlass', 'SWORD'],
        ['claymore', 'SWORD'],
        ['greathammer', 'HEAVY_WEAPON'],
        ['greataxe', 'HEAVY_WEAPON'],
        ['chakram', 'SWORD'],
        ['scythe', 'SWORD'],
        ['halberd', 'SWORD'],
    ]

    for (let weapon of SIMPLY_SWORD_TYPES) {
        for (let mat of ['iron', 'gold']) {
            event.addJson(`custom:affix_loot_entries/${mat}_${weapon[0]}`, {
                weight: 60,
                quality: 3.0,
                stack: {
                    item: `simplyswords:${mat}_${weapon[0]}`,
                    count: 1,
                    nbt: '{Damage:0}'
                },
                type: weapon[1],
                dimensions: [
                    'minecraft:overworld',
                    'minecraft:the_nether',
                    'minecraft:the_end'
                ],
                max_rarity: 'rare'
            })
        }
        for (let mat of ['diamond', 'netherite']) {
            event.addJson(`custom:affix_loot_entries/${mat}_${weapon[0]}`, {
                weight: 60,
                quality: 3.0,
                stack: {
                    item: `simplyswords:${mat}_${weapon[0]}`,
                    count: 1,
                    nbt: '{Damage:0}'
                },
                type: weapon[1],
                dimensions: [
                    'minecraft:the_nether',
                    'minecraft:the_end'
                ],
                max_rarity: 'rare'
            })
        }
        event.addJson(`custom:affix_loot_entries/runic_${weapon[0]}`, {
            weight: 30,
            quality: 3.0,
            stack: {
                item: `simplyswords:runic_${weapon[0]}`,
                count: 1
            },
            type: weapon[1],
            dimensions: [
                'minecraft:overworld',
                'minecraft:the_nether',
                'minecraft:the_end'
            ],
            max_rarity: 'epic'
        })
    }

    event.addJson('custom:affix_loot_entries/spatula', {
        weight: 10,
        quality: 3.0,
        stack: {
            item: `cfm:spatula`,
            count: 1
        },
        type: 'SWORD',
        dimensions: [
            'minecraft:overworld',
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'mythic'
    })

    for (let armor of ['helmet', 'leggings', 'chestplate', 'boots']) {
        event.addJson(`custom:affix_loot_entries/neptunium_${armor}`, {
            weight: 18,
            quality: 3.0,
            stack: {
                item: `aquaculture:neptunium_${armor}`,
                count: 1
            },
            type: 'ARMOR',
            dimensions: [
                'minecraft:overworld',
                'minecraft:the_nether',
                'minecraft:the_end'
            ],
            max_rarity: 'epic'
        })
    }

    for (let item of [['pickaxe', 'BREAKER'], ['shovel', 'BREAKER'], ['axe', 'HEAVY_WEAPON'], ['sword', 'SWORD'], ['bow', 'BOW']]) {
        event.addJson(`custom:affix_loot_entries/neptunium_${item[0]}`, {
            weight: 18,
            quality: 3.0,
            stack: {
                item: `aquaculture:neptunium_${item[0]}`,
                count: 1
            },
            type: item[1],
            dimensions: [
                'minecraft:overworld',
                'minecraft:the_nether',
                'minecraft:the_end'
            ],
            max_rarity: 'epic'
        })
    }

    // ---------- Immersive Armors Affix Loot Entries ----------

    const ARMOR_TYPES = [
        ['bone', 80],
        ['wither', 60],
        ['warrior', 70],
        ['heavy', 60],
        ['robe', 60],
        ['slime', 55],
        ['divine', 40],
        ['prismarine', 65],
        ['wooden', 85],
        ['steampunk', 35],
    ]

    for (let mat of ARMOR_TYPES) {
        for (let piece of ['helmet', 'chestplate', 'leggings', 'boots']) {
            event.addJson(`custom:affix_loot_entries/${mat[0]}_${piece}`, {
                weight: mat[1],
                quality: 3.0,
                stack: {
                    item: `immersive_armors:${mat[0]}_${piece}`,
                    count: 1
                },
                type: 'ARMOR',
                dimensions: [
                    'minecraft:overworld',
                    'minecraft:the_nether',
                    'minecraft:the_end'
                ],
                max_rarity: 'rare'
            })
        }
    }

    for (let piece of ['helmet', 'chestplate', 'leggings', 'boots']) {
        event.addJson(`custom:affix_loot_entries/brimsteel_${piece}`, {
            weight: 40,
            quality: 3.0,
            stack: {
                item: `blazegear:brimsteel_${piece}`,
                count: 1
            },
            type: 'ARMOR',
            dimensions: [
                'minecraft:the_nether',
                'minecraft:the_end'
            ],
            max_rarity: 'epic'
        })
    }

    for (let item of [['pickaxe', 'BREAKER'], ['shovel', 'BREAKER'], ['axe', 'HEAVY_WEAPON'], ['sword', 'SWORD']]) {
        event.addJson(`custom:affix_loot_entries/brimsteel_${item[0]}`, {
            weight: 40,
            quality: 3.0,
            stack: {
                item: `blazegear:brimsteel_${item[0]}`,
                count: 1
            },
            type: item[1],
            dimensions: [
                'minecraft:the_nether',
                'minecraft:the_end'
            ],
            max_rarity: 'epic'
        })
    }
}

function affixes(event) {

        event.addJson('apotheosis:affixes/sword/attribute/elongated', {
            conditions: [
                {
                    type: 'forge:false'
                }
            ]
        })

        event.addJson('apotheosis:affixes/sword/attribute/vampiric', {
            conditions: [
                {
                    type: 'forge:false'
                }
            ]
        })
    
        event.addJson('custom:affixes/vampiric', {
            type: 'apotheosis:attribute',
            attribute: 'apotheosis:life_steal',
            operation: 'MULTIPLY_BASE',
            values: {
                rare: {
                    min: 0.05,
                    steps: 10,
                    step: 0.01
                },
                epic: {
                    min: 0.1,
                    steps: 10,
                    step: 0.01
                },
                mythic: {
                    min: 0.15,
                    steps: 10,
                    step: 0.01
                }
            },
            types: [
                'SWORD',
                'TRIDENT'
            ]
        })

        event.addJson('custom:affixes/energizing', {
            type: 'apotheosis:mob_effect',
            mob_effect: 'feathers:energized',
            target: 'ATTACK_SELF',
            cooldown: 100,
            values: {
                rare: {
                    duration: {
                        min: 20,
                        steps: 20,
                        step: 1
                    },
                    amplifier: 0
                },
                epic: {
                    duration: {
                        min: 20,
                        steps: 20,
                        step: 1
                    },
                    amplifier: 0
                },
                mythic: {
                    duration: {
                        min: 20,
                        steps: 20,
                        step: 1
                    },
                    amplifier: 0
                }
            },
            types: [
                'SWORD',
                'TRIDENT'
            ]
        })
}

function weaponAttributes(event) {
    for (let mat of ['iron', 'flint', 'golden', 'diamond', 'netherite']) {
        event.addJson(`farmersdelight:weapon_attributes/${mat}_knife`, {
            parent: 'bettercombat:dagger'
        })
    }

    event.addJson('mahoutsukai:weapon_attributes/theripper', {parent: 'simplyswords:soulstealer'})
    event.addJson('mahoutsukai:weapon_attributes/rule_breaker', {parent: 'bettercombat:dagger'})
    event.addJson('mahoutsukai:weapon_attributes/caliburn', {parent: 'bettercombat:coral_blade'})
    event.addJson('mahoutsukai:weapon_attributes/morgan', {parent: 'bettercombat:coral_blade'})
    event.addJson('mahoutsukai:weapon_attributes/clarent', {parent: 'bettercombat:sword'})
    event.addJson('savage_and_ravage:weapon_attributes/cleaver_of_beheading', {parent: 'bettercombat:claymore'})
    event.addJson('pyromancer:weapon_attributes/schmelzstern', {parent: 'simplyswords:hearthflame'})
    event.addJson('pyromancer:weapon_attributes/firelink', {parent: 'simplyswords:emberblade'})
    event.addJson('pyromancer:weapon_attributes/flammenklinge', {parent: 'bettercombat:claymore'})
    event.addJson('cfm:weapon_attributes/spatula', {parent: 'bettercombat:mace'})
}

function advancements(event) {
    event.addJson('custom:advancements/unlock_create', {
        criteria: {
            only_cheats: {
                trigger: 'minecraft:impossible'
            }
        }
    })
    // Hides other mod's stupid advancement showing in chat
    event.addJson('idas:advancements/idas_root', {
        display: {
            icon: {
                item: 'minecraft:filled_map'
            }
        },
        title: {
            translate: 'Integrated Dungeons and Structures'
        },
        description: {
            translate: 'Start exploring for structures!'
        },
        show_toast: false,
        announce_to_chat: false,
        hidden: true,
        background: 'minecraft:textures/block/purple_terracotta.png',
        citeria: {
            always: {
                trigger: 'minecraft:tick'
            }
        }
    })
}

function worldGen(event) {
    event.addJson('minecraft:worldgen/density_function/overworld/base_continents', {
        type:"add",
        argument1:{
            argument: {
              xz_scale: 0.18,
              y_scale: 0.0,
              noise: "minecraft:continentalness",
              shift_x: "minecraft:shift_x",
              shift_y: 0.0,
              shift_z: "minecraft:shift_z",
              type: "minecraft:shifted_noise"
            },
            type: "minecraft:flat_cache"
        },
        argument2: "continents:continent_bias"
    })
    for (let name of ['andesite', 'basalt', 'blackstone', 'calcite', 'crying_obsidian', 'diorite', 'granite', 'magma_block', 'smooth_basalt', 'terracotta', 'tuff']) {
        event.addJson(`immersive_weathering:fluid_generators/${name}`, {})
    }
}