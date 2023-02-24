
const CONDITIONS = [
    {
        replace: 'minecraft:stone',
        block: 'minecraft:andesite',
        below: 'minecraft:andesite',
    },
    {
        replace: 'minecraft:stone',
        block: 'create:limestone',
        side1: 'create:limestone',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'create:veridium',
        below: '#quark:corundum',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'minecraft:netherrack',
        below: 'minecraft:magma_block',
        biome: '#forge:is_hot/overworld',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'minecraft:diorite',
        side1: 'minecraft:diorite',
        side2: 'minecraft:quartz_block',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'minecraft:granite',
        above: 'minecraft:granite',
        below: 'minecraft:granite',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'create:scoria',
        biome: '#forge:is_hot/overworld',
        below: 'minecraft:bedrock',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'create:scorchia',
        biome: '#forge:is_cold/overworld',
        below: 'minecraft:bedrock',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'create:ochrum',
        side1: 'create:ochrum',
        side2: 'create:ochrum',
        above: 'create:ochrum',
        biome: '#forge:is_desert',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'create:asurine',
        below: 'minecraft:blue_ice',
        biome: '#forge:is_cold/overworld',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'byg:soapstone',
        below: 'minecraft:clay',
        biome: '#forge:is_cold/overworld',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'minecraft:tuff',
        below: 'minecraft:budding_amethyst',
    },
    {
        replace: 'minecraft:cobblestone',
        block: 'byg:pink_sandstone',
        below: 'minecraft:glowstone',
        biome: '#minecraft:is_ocean',
    },
    {
        replace: 'minecraft:stone',
        block: 'minecraft:dripstone_block',
        biome: 'minecraft:dripstone_caves',
    },
    {
        replace: 'minecraft:stone',
        block: 'minecraft:calcite',
        below: 'minecraft:bone_block',
    },
    {
        replace: 'minecraft:obsidian',
        block: 'create:crimsite',
        below: 'minecraft:iron_block',
    },
    {
        replace: 'minecraft:obsidian',
        block: 'minecraft:amethyst_block',
        side1: 'minecraft:diamond_block',
    },
]

// Custom cobblestone-style generators.

const ForgeBlockEvent = Java.loadClass('net.minecraftforge.event.level.BlockEvent')
const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const blockTags = ForgeRegistries.BLOCKS.tags()
const biomeTags = ForgeRegistries.BIOMES.tags()

ForgeEvents.onEvent(ForgeBlockEvent.FluidPlaceBlockEvent, event => {
    let biome = event.getLevel().getBiome(event.getLiquidPos())
    let below = event.getLevel().getBlockState(event.getLiquidPos().below()).getBlockHolder()
    let above = event.getLevel().getBlockState(event.getLiquidPos().above()).getBlockHolder()
    let north = event.getLevel().getBlockState(event.getLiquidPos().north()).getBlockHolder()
    let south = event.getLevel().getBlockState(event.getLiquidPos().south()).getBlockHolder()
    let east = event.getLevel().getBlockState(event.getLiquidPos().east()).getBlockHolder()
    let west = event.getLevel().getBlockState(event.getLiquidPos().west()).getBlockHolder()
    for (let condition of CONDITIONS) {
        if (!event.getNewState().getBlockHolder().is(condition.replace)) {
            continue
        }
        if (!isBiome(condition.biome, biome)) {
            continue
        }
        if (!isBlock(condition.below, below)) {
            continue
        }
        if (!isBlock(condition.above, above)) {
            continue
        }
        if (!isSide(condition.side1, north, south, east, west)) {
            continue
        }
        if (!isSide(condition.side2, north, south, east, west)) {
            continue
        }
        event.setNewState(Block.getBlock(condition.block).defaultBlockState())
        break
    }     
})

function isBiome(block, biome) {
    return (block ? (block.startsWith('#') ? biome.containsTag(biomeTags.createTagKey(block.substring(1, block.length))) : biome.is(block)) : true)
}

function isBlock(block, dir) {
    return (block ? (block.startsWith('#') ? dir.containsTag(blockTags.createTagKey(block.substring(1, block.length))) : dir.is(block)) : true)
}

function isSide(side, north, south, east, west) {
    return (side ? ((side.startsWith('#') ? north.containsTag(blockTags.createTagKey(side.substring(1, side.length))) : north.is(side)) | (side.startsWith('#') ? south.containsTag(blockTags.createTagKey(side.substring(1, side.length))) : south.is(side)) | (side.startsWith('#') ? east.containsTag(blockTags.createTagKey(side.substring(1, side.length))) : east.is(side)) | (side.startsWith('#') ? west.containsTag(blockTags.createTagKey(side.substring(1, side.length))) : west.is(side))) : true)
}

const LivingEquipmentChangeEvent = Java.loadClass('net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent')
const EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')

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
    if (event.getFrom().id == event.getTo().id) {
        return
    }
    if (event.getTo().enchantments.get('minecraft:binding_curse') == undefined) {
        return
    }
    event.getEntity().server.runCommandSilent(`give ${event.getEntity().username} kubejs:mark_of_the_accursed`)
    event.getEntity().addTag('recieved_curse_mark')
    event.getEntity().server.runCommand(`tellraw ${event.getEntity().username} {"text":"You bear the mark... you are cursed. You must place your hand upon the stone.","italic":"true","color":"#B00000","clickEvent":{"action":"open_url","value":"https://www.youtube.com/watch?v=AJATwqY5muo"}}`)
})