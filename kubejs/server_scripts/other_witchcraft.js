// Reloads the server on load to fix seed-dependent recipes
ServerEvents.loaded(event => {
    event.server.runCommandSilent('reload')
})

// Prevents summoning the Wither by breaking wither skulls if placed on soul sand
BlockEvents.placed('minecraft:wither_skeleton_skull', event => {
    if (checkAllDirs(event.block)) {
        event.cancel()
        event.block.popItem('minecraft:wither_skeleton_skull')
    }
})
BlockEvents.placed('minecraft:wither_skeleton_wall_skull', event => {
    if (checkAllDirs(event.block)) {
        event.cancel()
        event.block.popItem('minecraft:wither_skeleton_skull')
    }
})

function checkAllDirs(block) {
    let tag = 'minecraft:wither_summon_base_blocks'
    if (block.down.hasTag(tag)) {
        return true
    }
    if (block.up.hasTag(tag)) {
        return true
    }
    if (block.north.hasTag(tag)) {
        return true
    }
    if (block.south.hasTag(tag)) {
        return true
    }
    if (block.east.hasTag(tag)) {
        return true
    }
    if (block.west.hasTag(tag)) {
        return true
    }
    return false
}

// Deletes withers if still somehow spawned the normal way
EntityEvents.spawned('minecraft:wither', event => {
    if (event.entity.getFullNBT().get('Invul') > 0) {
        event.cancel()
    }
})

// Gives items on spawn
PlayerEvents.loggedIn(event => {
    if (!event.player.stages.has('starting_items')) {
        event.player.stages.add('starting_items')
        event.player.give('enigmaticlegacy:cursed_ring')
    }
})

ItemEvents.rightClicked('kubejs:powdered_determination', event => {
    if (event.target.block == null) {
        return
    }
    if (event.target.block.id != 'minecraft:andesite') {
        return
    }
    event.target.block.popItem('16x create:andesite_alloy')
    event.server.runCommandSilent(`execute positioned ${event.target.block.x} ${event.target.block.y} ${event.target.block.z} run particle dust 1.0 0.0 0.95 1.0 ~ ~0.5 ~ 0.3 0.3 0.3 0.0 5 normal @a`)
    event.target.block.setBlockState(Blocks.AIR.defaultBlockState(), 0)
    event.item.count -= 1
    event.server.runCommand(`tellraw ${event.player.username} {"text":"As you sprinkle the dust upon the andesite, it melts and solidifies into something else. A new material, perhaps? Or a gift from the future...","color":"#BA00FC"}`)
})

ServerEvents.lowPriorityData(event => {
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
})