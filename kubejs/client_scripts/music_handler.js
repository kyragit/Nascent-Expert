const BossMusic = Java.loadClass('lykrast.meetyourfight.misc.BossMusic')

NetworkEvents.fromServer('trigger_music_1', event => {
    let id = UUID.fromString(event.data.getString('entity'))
    let dummy;
    for (let entity of event.level.getEntities(event.player, AABB.ofSize(event.player.position(), 512, 512, 512))) {
        Utils.server.runCommand(`say ${entity.getUuid()}`)
        if (entity.getUuid().equals(id)) {
            dummy = entity
            break
        }
    }
    Client.soundManager.play(new BossMusic(dummy, Utils.getSound('kubejs:music.wither')))
})