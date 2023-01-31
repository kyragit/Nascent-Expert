
const PONDER_ITEMS = [
    'dimdungeons:item_portal_key',
    'dimdungeons:item_blank_build_key',
    'dimdungeons:item_blank_teleporter_key',
    'dimdungeons:block_gilded_portal',
    'dimdungeons:block_portal_keyhole',
]

Ponder.registry(event => {
    event.create(PONDER_ITEMS)
        .scene(
            'dimdungeon_portal_1',
            'Creating a Dimensional Dungeons Portal',
            'kubejs:dimdungeon_portal',
            (scene, util) => {
                for (let y = 0; y < 3; y++) {
                    for (let x = 0; x < 7; x++) {
                        scene.world.showSection([x, y, 3], Facing.DOWN)
                    }
                    scene.idle(7)
                }
                scene.world.showSection([3, 3, 3], Facing.DOWN)
                scene.idle(20)
                scene.text(60, 'Use a filled Portal Key on the Portal Keystone', [3.5, 3.5, 3.5])   
                    .attachKeyFrame()
                scene.showControls(60, [3.5, 3.5, 3.5], 'down')
                    .rightClick()
                    .withItem('dimdungeons:item_portal_key')
                scene.idle(60)
                scene.world.modifyBlock([3, 3, 3], curState => curState.with('lit', true), false)
                scene.world.setBlocks([[3, 1, 3], [3, 2, 3]], 'dimdungeons:block_gold_portal')
                scene.playSound('minecraft:block.end_portal_frame.fill')
                scene.idle(100)
                scene.text(60, 'To use an Advanced Key, the portal must be upgraded', [3.5, 3.5, 3.5])
                    .attachKeyFrame()
                scene.showControls(60, [3.5, 3.5, 3.5], 'down')
                    .withItem('dimdungeons:item_blank_advanced_key')
                scene.idle(60)
                scene.world.showSection([2, 3, 3], Facing.DOWN)
                scene.idle(7)
                scene.world.showSection([4, 3, 3], Facing.DOWN)
                scene.idle(15)
                scene.world.showSection([0, 2, 2], Facing.SOUTH)
                scene.idle(7)
                scene.world.showSection([6, 2, 2], Facing.SOUTH)
                scene.idle(27)
                scene.text(60, 'The banners must either be purple or white', [0.5, 2.5, 2.5])
                    .attachKeyFrame()
                scene.idle(60)
            }
        )
})