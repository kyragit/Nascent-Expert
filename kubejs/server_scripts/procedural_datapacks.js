ServerEvents.highPriorityData(event => {

})

ServerEvents.lowPriorityData(event => {
    affixLootEntries(event)
    affixes(event)
    weaponAttributes(event)
    advancements(event)
    worldGen(event)
    wandererTrades(event)
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
                max_rarity: 'epic'
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

    event.addJson('custom:affix_loot_entries/musketeer_hat', {
        weight: 35,
        quality: 8.0,
        stack: {
            item: 'oldguns:musketeer_hat',
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
    event.addJson('custom:affix_loot_entries/horsemans_pot_helm', {
        weight: 35,
        quality: 8.0,
        stack: {
            item: 'oldguns:horsemans_pot_helm',
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

    event.addJson('custom:affix_loot_entries/shield_extra', {
        weight: 80,
        quality: 0,
        stack: {
            item: 'minecraft:shield',
            count: 1
        },
        type: 'SHIELD',
        dimensions: [
            'minecraft:overworld',
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'rare'
    })
    event.addJson('custom:affix_loot_entries/honey_crystal_shield', {
        weight: 40,
        quality: 0,
        stack: {
            item: 'the_bumblezone:honey_crystal_shield',
            count: 1
        },
        type: 'SHIELD',
        dimensions: [
            'minecraft:overworld',
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'epic'
    })
    event.addJson('custom:affix_loot_entries/shield_of_the_deep', {
        weight: 30,
        quality: 0,
        stack: {
            item: 'alexsmobs:shield_of_the_deep',
            count: 1
        },
        type: 'SHIELD',
        dimensions: [
            'minecraft:overworld',
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'mythic'
    })
    event.addJson('custom:affix_loot_entries/golden_mace', {
        weight: 80,
        quality: 0,
        stack: {
            item: 'pyromancer:golden_mace',
            count: 1
        },
        type: 'HEAVY_WEAPON',
        dimensions: [
            'minecraft:overworld',
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'rare'
    })
    event.addJson('custom:affix_loot_entries/iron_mace', {
        weight: 80,
        quality: 0,
        stack: {
            item: 'pyromancer:iron_mace',
            count: 1
        },
        type: 'HEAVY_WEAPON',
        dimensions: [
            'minecraft:overworld',
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'rare'
    })
    event.addJson('custom:affix_loot_entries/diamond_mace', {
        weight: 70,
        quality: 0,
        stack: {
            item: 'pyromancer:diamond_mace',
            count: 1
        },
        type: 'HEAVY_WEAPON',
        dimensions: [
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'epic'
    })
    event.addJson('custom:affix_loot_entries/netherite_mace', {
        weight: 50,
        quality: 0,
        stack: {
            item: 'pyromancer:netherite_mace',
            count: 1
        },
        type: 'HEAVY_WEAPON',
        dimensions: [
            'minecraft:the_nether',
            'minecraft:the_end'
        ],
        max_rarity: 'epic'
    })
}

function affixes(event) {

    let removeAffix = function(affix) {
        event.addJson(`apotheosis:affixes/${affix}`, {
            conditions: [
                {
                    type: 'forge:false'
                }
            ]
        })
    }

    let addAttributeAffix = function (name, attribute, operation, values, types) {
        event.addJson(`custom:affixes/${name}`, {
            type: 'apotheosis:attribute',
            attribute: attribute,
            operation: operation,
            values: values,
            types: types
        })
    }

    let addEffectAffix = function (name, effect, target, cooldown, values, types) {
        event.addJson(`custom:affixes/${name}`, {
            type: 'apotheosis:mob_effect',
            mob_effect: effect,
            target: target,
            cooldown: cooldown,
            values: values,
            types: types
        })
    }

    removeAffix('sword/attribute/elongated')
    removeAffix('sword/attribute/vampiric')

    addAttributeAffix(
        'vampiric',
        'apotheosis:life_steal',
        'MULTIPLY_BASE',
        {
            rare: {
                min: 0.01,
                steps: 9,
                step: 0.01
            },
            epic: {
                min: 0.1,
                steps: 5,
                step: 0.01
            },
            mythic: {
                min: 0.15,
                steps: 5,
                step: 0.01
            },
            ancient: {
                min: 0.2,
                steps: 10,
                step: 0.01
            }
        },
        [
            'sword',
            'trident'
        ]
    )

    addEffectAffix(
        'energizing',
        'feathers:energized',
        'ATTACK_SELF',
        100,
        {
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
            },
            ancient: {
                duration: {
                    min: 20,
                    steps: 20,
                    step: 1
                },
                amplifier: 1
            }
        },
        [
            'sword',
            'trident'
        ]
    )

    let mob_effects = [
        ['elusive', 'sword'],
        ['sophisticated', 'sword'],
        ['weakening', 'sword'],
        ['bolstering', 'armor'],
        ['revitalizing', 'armor'],
        ['swift', 'breaker'],
        ['caustic', 'heavy_weapon'],
        ['acidic', 'ranged'],
        ['ensnaring', 'ranged'],
        ['fleeting', 'ranged'],
        ['ivy_laced', 'ranged'],
        ['satanic', 'ranged'],
        ['shulkers', 'ranged'],
        ['devilish', 'shield'],
        ['venomous', 'shield'],
        ['withering', 'shield'],
    ]
    for (let effect of mob_effects) {
        removeAffix(`${effect[1]}/mob_effect/${effect[0]}`)
    }

    let light_weapons = ['sword', 'trident']
    let melee_weapons = ['heavy_weapon', 'sword', 'trident']
    let heavy_weapons = ['heavy_weapon']
    let armor = ['helmet', 'chestplate', 'leggings', 'boots']
    let shields = ['shield']
    let all_ranged = ['bow', 'crossbow', 'trident']
    let arrows = ['bow', 'crossbow']
    let breakers = ['shovel', 'pickaxe']

    let operations = {
        multiply_base: 'MULTIPLY_BASE',
        multiply_total: 'MULTIPLY_TOTAL',
        addition: 'ADDITION'
    }
    let targets = {
        attack_self: 'ATTACK_SELF',
        attack_target: 'ATTACK_TARGET',
        hurt_self: 'HURT_SELF',
        arrow_self: 'ARROW_SELF',
        arrow_target: 'ARROW_TARGET',
        block_attacker: 'BLOCK_ATTACKER',
        break_self: 'BREAK_SELF'
    }

    let lesserEffect = function(amplifier, duration, steps) {
        return {
            common: {
                duration: {
                    min: duration[0],
                    steps: steps[0],
                    step: 1
                },
                amplifier: amplifier
            },
            uncommon: {
                duration: {
                    min: duration[1],
                    steps: steps[1],
                    step: 1
                },
                amplifier: amplifier 
            },
            rare: {
                duration: {
                    min: duration[2],
                    steps: steps[2],
                    step: 1
                },
                amplifier: amplifier 
            }
        }
    }
    let greaterEffect = function(amplifier, duration, steps) {
        return {
            epic: {
                duration: {
                    min: duration[0],
                    steps: steps[0],
                    step: 1
                },
                amplifier: amplifier
            },
            mythic: {
                duration: {
                    min: duration[1],
                    steps: steps[1],
                    step: 1
                },
                amplifier: amplifier 
            }
        }
    }
    let ancientEffect = function(amplifier, duration, steps) {
        return {
            ancient: {
                duration: {
                    min: duration,
                    steps: steps,
                    step: 1
                },
                amplifier: amplifier
            }
        }
    }
    let globalEffect = function (amplifier, duration, steps) {
        return {
            common: {
                duration: {
                    min: duration[0],
                    steps: steps[0],
                    step: 1
                },
                amplifier: amplifier
            },
            uncommon: {
                duration: {
                    min: duration[1],
                    steps: steps[1],
                    step: 1
                },
                amplifier: amplifier 
            },
            rare: {
                duration: {
                    min: duration[2],
                    steps: steps[2],
                    step: 1
                },
                amplifier: amplifier 
            },
            epic: {
                duration: {
                    min: duration[3],
                    steps: steps[3],
                    step: 1
                },
                amplifier: amplifier 
            },
            mythic: {
                duration: {
                    min: duration[4],
                    steps: steps[4],
                    step: 1
                },
                amplifier: amplifier 
            },
            ancient: {
                duration: {
                    min: duration[5],
                    steps: steps[5],
                    step: 1
                },
                amplifier: amplifier 
            }
        }
    }

    addEffectAffix(
        'speed',
        'minecraft:speed',
        targets.attack_self,
        600,
        lesserEffect(0, [20, 30, 40], [10, 15, 20]),
        light_weapons
    )
    addEffectAffix(
        'greater_speed',
        'minecraft:speed',
        targets.attack_self,
        200,
        greaterEffect(1, [100, 200], [40, 80]),
        light_weapons
    )
    addEffectAffix(
        'ancient_speed',
        'minecraft:speed',
        targets.attack_self,
        100,
        ancientEffect(2, 200, 100),
        light_weapons
    )
    addEffectAffix(
        'haste',
        'minecraft:haste',
        targets.attack_self,
        600,
        lesserEffect(0, [20, 30, 40], [10, 15, 20]),
        light_weapons
    )
    addEffectAffix(
        'greater_haste',
        'minecraft:haste',
        targets.attack_self,
        200,
        greaterEffect(1, [100, 200], [40, 80]),
        light_weapons
    )
    addEffectAffix(
        'ancient_haste',
        'minecraft:haste',
        targets.attack_self,
        100,
        ancientEffect(2, 200, 100),
        light_weapons
    )
    addEffectAffix(
        'breaker_haste',
        'minecraft:haste',
        targets.break_self,
        600,
        lesserEffect(0, [20, 30, 40], [10, 15, 20]),
        breakers
    )
    addEffectAffix(
        'greater_breaker_haste',
        'minecraft:haste',
        targets.break_self,
        200,
        greaterEffect(1, [100, 200], [40, 80]),
        breakers
    )
    addEffectAffix(
        'ancient_breaker_haste',
        'minecraft:haste',
        targets.break_self,
        100,
        ancientEffect(2, 200, 100),
        breakers
    )
    addEffectAffix(
        'regen',
        'minecraft:regeneration',
        targets.attack_self,
        600,
        greaterEffect(0, [60, 120], [40, 60]),
        melee_weapons
    )
    addEffectAffix(
        'ancient_regen',
        'minecraft:regeneration',
        targets.attack_self,
        400,
        ancientEffect(1, 120, 60),
        melee_weapons
    )
    addEffectAffix(
        'sundering',
        'apotheosis:sundering',
        targets.attack_target,
        600,
        lesserEffect(0, [20, 30, 40], [10, 15, 20]),
        heavy_weapons
    )
    addEffectAffix(
        'greater_sundering',
        'apotheosis:sundering',
        targets.attack_target,
        400,
        greaterEffect(1, [100, 150], [50, 100]),
        heavy_weapons
    )
    addEffectAffix(
        'ancient_sundering',
        'apotheosis:sundering',
        targets.attack_target,
        400,
        ancientEffect(2, 200, 100),
        heavy_weapons
    )
    addEffectAffix(
        'knowledge',
        'apotheosis:knowledge',
        targets.attack_self,
        600,
        lesserEffect(0, [20, 30, 40], [10, 15, 20]),
        melee_weapons
    )
    addEffectAffix(
        'greater_knowledge',
        'apotheosis:knowledge',
        targets.attack_self,
        400,
        greaterEffect(1, [100, 150], [50, 100]),
        melee_weapons
    )
    addEffectAffix(
        'ancient_knowledge',
        'apotheosis:knowledge',
        targets.attack_self,
        400,
        ancientEffect(2, 200, 100),
        melee_weapons
    )
    addEffectAffix(
        'stunning',
        'relics:stun',
        targets.attack_target,
        600,
        globalEffect(0, [10, 20, 30, 40, 60, 100], [5, 7, 10, 15, 20, 25]),
        heavy_weapons
    )
    addEffectAffix(
        'volatile',
        'collectorsreap:volatility',
        targets.attack_self,
        600,
        globalEffect(0, [10, 20, 25, 30, 35, 40], [5, 5, 5, 7, 10, 10]),
        heavy_weapons
    )
    addEffectAffix(
        'corrosive',
        'collectorsreap:corrosion',
        targets.arrow_self,
        600,
        globalEffect(0, [10, 20, 30, 50, 80, 100], [5, 10, 10, 20, 20, 50]),
        arrows
    )
    addEffectAffix(
        'slippery',
        'ecologics:slippery',
        targets.attack_target,
        60,
        lesserEffect(0, [20, 30, 40], [5, 5, 5]),
        melee_weapons
    )
    addEffectAffix(
        'glowing',
        'minecraft:glowing',
        targets.arrow_target,
        0,
        globalEffect(0, [60, 80, 100, 200, 300, 400], [5, 10, 10, 20, 20, 50]),
        arrows
    )
    addEffectAffix(
        'instant_damage',
        'minecraft:instant_damage',
        targets.attack_target,
        300,
        greaterEffect(0, [1, 1], [1, 1]),
        heavy_weapons
    )
    addEffectAffix(
        'ancient_instant_damage',
        'minecraft:instant_damage',
        targets.attack_target,
        200,
        ancientEffect(1, 1, 1),
        heavy_weapons
    )
    addEffectAffix(
        'instant_health',
        'minecraft:instant_health',
        targets.attack_self,
        600,
        greaterEffect(0, [1, 1], [1, 1]),
        light_weapons
    )
    addEffectAffix(
        'ancient_instant_health',
        'minecraft:instant_health',
        targets.attack_self,
        300,
        ancientEffect(1, 1, 1),
        light_weapons
    )
    addEffectAffix(
        'hidden',
        'minecraft:invisibility',
        targets.arrow_self,
        600,
        greaterEffect(0, [200, 300], [60, 100]),
        arrows
    )
    addEffectAffix(
        'levitation',
        'minecraft:levitation',
        targets.attack_target,
        600,
        greaterEffect(0, [100, 140], [20, 30]),
        light_weapons
    )
    addEffectAffix(
        'ancient_levitation',
        'minecraft:levitation',
        targets.attack_target,
        300,
        ancientEffect(1, 200, 50),
        light_weapons
    )
    addEffectAffix(
        'resistance',
        'minecraft:resistance',
        targets.attack_self,
        600,
        lesserEffect(0, [20, 30, 40], [10, 15, 20]),
        heavy_weapons
    )
    addEffectAffix(
        'greater_resistance',
        'minecraft:resistance',
        targets.attack_self,
        400,
        greaterEffect(1, [100, 150], [50, 100]),
        heavy_weapons
    )
    addEffectAffix(
        'ancient_resistance',
        'minecraft:resistance',
        targets.attack_self,
        400,
        ancientEffect(2, 200, 100),
        heavy_weapons
    )
    addEffectAffix(
        'armor_resistance',
        'minecraft:resistance',
        targets.hurt_self,
        600,
        lesserEffect(0, [40, 60, 80], [10, 10, 10]),
        armor
    )
    addEffectAffix(
        'greater_armor_resistance',
        'minecraft:resistance',
        targets.hurt_self,
        600,
        greaterEffect(1, [100, 200], [40, 60]),
        armor
    )
    addEffectAffix(
        'ancient_armor_resistance',
        'minecraft:resistance',
        targets.hurt_self,
        600,
        ancientEffect(2, 400, 100),
        armor
    )
    addEffectAffix(
        'strength',
        'minecraft:strength',
        targets.attack_self,
        600,
        lesserEffect(0, [20, 30, 40], [10, 15, 20]),
        heavy_weapons
    )
    addEffectAffix(
        'greater_strength',
        'minecraft:strength',
        targets.attack_self,
        400,
        greaterEffect(1, [100, 150], [50, 100]),
        heavy_weapons
    )
    addEffectAffix(
        'ancient_strength',
        'minecraft:strength',
        targets.attack_self,
        400,
        ancientEffect(2, 200, 100),
        heavy_weapons
    )
    addEffectAffix(
        'withering',
        'minecraft:wither',
        targets.attack_target,
        600,
        greaterEffect(0, [100, 140], [20, 30]),
        melee_weapons
    )
    addEffectAffix(
        'ancient_withering',
        'minecraft:wither',
        targets.attack_target,
        400,
        ancientEffect(1, 200, 100),
        melee_weapons
    )
    addEffectAffix(
        'poison',
        'minecraft:poison',
        targets.arrow_target,
        600,
        lesserEffect(0, [60, 80, 100], [10, 10, 10]),
        arrows
    )
    addEffectAffix(
        'greater_poison',
        'minecraft:poison',
        targets.arrow_target,
        500,
        greaterEffect(1, [200, 250], [40, 50]),
        arrows
    )
    addEffectAffix(
        'ancient_poison',
        'minecraft:poison',
        targets.arrow_target,
        400,
        ancientEffect(2, 300, 50),
        arrows
    )
    addEffectAffix(
        'bleeding',
        'apotheosis:bleeding',
        targets.attack_target,
        600,
        lesserEffect(0, [40, 60, 80], [20, 20, 20]),
        light_weapons
    )
    addEffectAffix(
        'enderference',
        'cofh_core:enderference',
        targets.attack_target,
        0,
        greaterEffect(0, [200, 400], [100, 100]),
        melee_weapons
    )
    addEffectAffix(
        'night_vision',
        'minecraft:night_vision',
        targets.break_self,
        0,
        globalEffect(0, [600, 1200, 1600, 2000, 2400, 3000], [100, 100, 100, 100, 100, 100]),
        breakers
    )
    addEffectAffix(
        'water_breathing',
        targets.attack_self,
        1200,
        globalEffect(0, [200, 300, 400, 600, 800, 1000], [40, 40, 60, 60, 80, 80]),
        [
            'trident'
        ]
    )
    addEffectAffix(
        'saturation',
        'minecraft:saturation',
        targets.break_self,
        6000,
        globalEffect(0, [1, 2, 3, 4, 5, 6], [1, 1, 1, 1, 1, 1]),
        breakers
    )
    addEffectAffix(
        'shield_mining_fatigue',
        'minecraft:mining_fatigue',
        targets.block_attacker,
        600,
        globalEffect(0, [100, 200, 250, 300, 350, 400], [20, 20, 30, 30, 40, 40]),
        shields
    )
    addEffectAffix(
        'shield_weakness',
        'minecraft:weakness',
        targets.block_attacker,
        600,
        globalEffect(0, [100, 200, 250, 300, 350, 400], [20, 20, 30, 30, 40, 40]),
        shields
    )
    addEffectAffix(
        'shield_fear',
        'alexsmobs:fear',
        targets.block_attacker,
        600,
        greaterEffect(0, [100, 150], [20, 20]),
        shields
    )
    addEffectAffix(
        'ancient_shield_fear',
        'alexsmobs:fear',
        targets.block_attacker,
        600,
        ancientEffect(0, 200, 100),
        shields
    )
    addEffectAffix(
        'shield_instant_damage',
        'minecraft:instant_damage',
        targets.block_attacker,
        600,
        lesserEffect(0, [1, 1, 1], [1, 1, 1]),
        shields
    )
    addEffectAffix(
        'greater_shield_instant_damage',
        'minecraft:instant_damage',
        targets.block_attacker,
        500,
        greaterEffect(1, [1, 1], [1, 1]),
        shields
    )
    addEffectAffix(
        'ancient_shield_instant_damage',
        'minecraft:instant_damage',
        targets.block_attacker,
        400,
        ancientEffect(2, 1, 1),
        shields
    )
    addEffectAffix(
        'bow_slipping',
        'neapolitan:slipping',
        targets.arrow_target,
        600,
        globalEffect(0, [40, 60, 80, 100, 140, 200], [20, 30, 40, 50, 60, 70]),
        arrows
    )
    addEffectAffix(
        'vanilla_scent',
        'neapolitan:vanilla_scent',
        targets.hurt_self,
        1200,
        globalEffect(0, [100, 150, 200, 250, 300, 400], [20, 30, 40, 50, 60, 70]),
        armor
    )
    addEffectAffix(
        'knockback_resistance',
        'alexmobs:knockback_resistance',
        targets.hurt_self,
        800,
        globalEffect(0, [100, 150, 200, 250, 300, 400], [20, 30, 40, 50, 60, 70]),
        armor
    )
    addEffectAffix(
        'absorption',
        'minecraft:absorption',
        targets.hurt_self,
        600,
        lesserEffect(0, [400, 500, 600], [1, 1, 1]),
        armor
    )
    addEffectAffix(
        'greater_absorption',
        'minecraft:absorption',
        targets.hurt_self,
        600,
        greaterEffect(1, [500, 500], [100, 100]),
        armor
    )
    addEffectAffix(
        'ancient_absorption',
        'minecraft:absorption',
        targets.hurt_self,
        600,
        ancientEffect(2, 500, 100),
        armor
    )
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
    event.addJson('enigmaticlegacy:weapon_attributes/the_infinitum', {parent: 'bettercombat:mace'})
    event.addJson('goety:weapon_attributes/death_scythe', {parent: 'simplyswords:soulrender'})
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

    event.addJson('nethers_exoticism:advancements/nethers_exoticism_adv', {
        "display": {
          "background": "nethers_exoticism:textures/screens/ramboutan_log.png",
          "icon": {
            "item": "nethers_exoticism:kiwano_sapling"
          },
          "title": {
            "translate": "advancements.nethers_exoticism_adv.title"
          },
          "description": {
            "translate": "advancements.nethers_exoticism_adv.descr"
          },
          "frame": "task",
          "show_toast": false,
          "announce_to_chat": false,
          "hidden": false
        },
        "criteria": {
          "nethers_exoticism_adv": {
            "trigger": "minecraft:impossible"
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

function wandererTrades(event) {
    event.addJson('apotheosis:wanderer_trades/eye_of_ender', {
        conditions: [
            {
                type: 'forge:false'
            }
        ]
    })
    event.addJson('apotheosis:wanderer_trades/beacon', {
        conditions: [
            {
                type: 'forge:false'
            }
        ]
    })
}