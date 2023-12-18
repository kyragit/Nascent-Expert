const LivingEquipmentChangeEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent')
const EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')
const EntityJoinLevelEvent = Java.loadClass('net.minecraftforge.event.entity.EntityJoinLevelEvent')

ForgeEvents.onEvent(LivingEquipmentChangeEvent, event => {
    if (event.getEntity().getTags().contains('recieved_curse_mark')) {
        return
    }
    if (!event.getEntity().player) {
        return
    }
    if (!event.getEntity().server) {
        return
    }
    if (event.getSlot() == EquipmentSlot.MAINHAND || event.getSlot() == EquipmentSlot.OFFHAND) {
        return
    }
    if (event.getTo().id == 'quark:backpack') {
        return
    }
    if (event.getTo().enchantments.get('minecraft:binding_curse') == undefined) {
        return
    }
    event.getEntity().server.runCommandSilent(`give ${event.getEntity().username} kubejs:mark_of_the_accursed`)
    event.getEntity().addTag('recieved_curse_mark')
    event.getEntity().server.runCommand(`tellraw ${event.getEntity().username} {"text":"You bear the mark... you are cursed. You must place your hand upon the stone.","italic":"true","color":"#B00000","clickEvent":{"action":"open_url","value":"https://www.youtube.com/watch?v=AJATwqY5muo"}}`)
})

StartupEvents.registry('sound_event', event => {
    event.create('music.wither')
})

ForgeEvents.onEvent(EntityJoinLevelEvent, (event) => {
    if (event.getEntity().isPlayer()) {
        if (event.getLevel().isClientSide()) {
            if (event.getLevel().getDimension().getNamespace() === 'nomadictents') {
                SDRP.setState('sdrp.tent.in', 'sdrp.tent', 'overworld')
            }
        }
    }
})