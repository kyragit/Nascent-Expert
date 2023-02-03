ServerEvents.highPriorityData(event => {

})

ServerEvents.lowPriorityData(event => {
    affixLootEntries(event)
    affixes(event)
    weaponAttributes(event)
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
}