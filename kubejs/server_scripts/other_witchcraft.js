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

const PlayerMovement = Java.loadClass('tictim.paraglider.capabilities.PlayerMovement')
const FeathersHelper = Java.loadClass('com.elenai.feathers.api.FeathersHelper')

PlayerEvents.tick(event => {
    let h = PlayerMovement.of(event.player)
    if (h != null) {
        if (h.isParagliding()) {
            if (event.player.data.getOrDefault('paragliderFeatherTimer', 0) >= 20) {
                event.player.data.add('paragliderFeatherTimer', 0)
                if (!FeathersHelper.spendFeathers(event.player, 1)) {
                    event.player.potionEffects.add('feathers:cold', 200, 0, true, true)
                    h.setStamina(0)
                    h.setDepleted(true)
                    return
                } 
            }
            let timer = event.player.data.get('paragliderFeatherTimer')
            timer = timer == null ? 0 : timer
            timer++
            event.player.data.add('paragliderFeatherTimer', timer)
        }
    }
})

const BossMusic = Java.loadClass('lykrast.meetyourfight.misc.BossMusic')

EntityEvents.spawned('minecraft:wither', event => {
    Client.soundManager.play(new BossMusic(event.entity, Utils.getSound('kubejs:music.wither')))
})