StartupEvents.registry('item', event => {
    // event.create('natural_binding').tooltip('A sticky mixture of natural materials.')
    // event.create('natural_alloy').tooltip('A tough alloy made from animal parts.')
    // event.create('ore_clump').tooltip('A blend of many raw metals.')
    event.create('star_of_quintessence')
        .tooltip(Text.lightPurple('A glimmering star, made from the treasures of powerful enemies.'))
        .glow(true)
        .rarity('rare')
    event.create('powdered_determination')
        .tooltip(Text.lightPurple('All that willpower, that determination... Is it finally enough?'))
        .glow(true)
        .rarity('rare')
    event.create('swampjaw_rib')
        .tooltip(Text.darkGreen('A moss-covered rib bone, taken from the remains of the mighty Swampjaw.'))
        .glow(true)
        .rarity('epic')
    event.create('ethereal_bell')
        .tooltip(Text.aqua('The soul of the spirit Bellringer\'s golden bell, now bereft of its physical form.'))
        .glow(true)
        .rarity('epic')
    event.create('queen_of_diamonds')
        .tooltip(Text.red('A card from Dame Fortuna\'s casino deck, intricately decorated.'))
        .glow(true)
        .rarity('epic')

    event.create('lignite_coal')
        .texture('geolosys:items/lignite_coal')
        .burnTime(1200)
    event.create('bituminous_coal')
        .texture('geolosys:items/bituminous_coal')
        .burnTime(2000)
    event.create('bituminous_coal_coke')
        .texture('geolosys:items/bituminous_coal_coke')
        .burnTime(4000)
    event.create('lime')
    event.create('ceramic_dust')
    event.create('high_temperature_ceramic_dust')
    event.create('high_temperature_clay')
    event.create('high_temperature_brick')
    event.create('unfinished_coke_brick')
    event.create('lavaproof_brick')
    event.create('unfinished_blast_brick')
    event.create('ingot_mold')
})

ItemEvents.modification(event => {
    event.modify('treasurebags:treasure_bag', item => {
        item.setFireResistant(true)
    })
    event.modify('gateways:gate_pearl', item => {
        item.setFireResistant(true)
    })
})

const SAMPLES = [
    'uranium',
    'galena',
    'bauxite',
    'limonite',
    'hematite',
    'malachite',
    'coal',
    'lignite',
    'bituminous_coal',
    'gold',
    'azurite',
    'nickel',
    'iron',
    'sphalerite',
    'copper',
    'redstone',
    'zinc',
]

StartupEvents.registry('block', event => {
    for (let sample of SAMPLES) {
        event.create(`${sample}_sample`)
            .waterlogged()
            .material('clay')
            .tagBlock('minecraft:mineable/shovel')
            .hardness(0.1)
            .fullBlock(false)
            .noCollision()
            .notSolid()
            .box(3, 0, 3, 13, 4, 13, true)
            .createProperties()
            .offsetType('XZ')
    }
})

WorldgenEvents.remove(event => {
    event.removeOres(ore => {
        ore.blocks = 'minecraft:dirt'
    })
})

StartupEvents.registry('fluid', event => {
    event.create('molten_brass')
        .thickTexture(Color.rgba(221, 165, 0, 255))
        .bucketColor(Color.rgba(221, 165, 0, 255))
        .luminosity(8)
        .displayName('Molten Brass')
    event.create('molten_copper')
        .thickTexture(Color.rgba(221, 84, 0, 255))
        .bucketColor(Color.rgba(221, 84, 0, 255))
        .luminosity(8)
        .displayName('Molten Copper')
    event.create('molten_zinc')
        .thickTexture(Color.rgba(121, 150, 139, 255))
        .bucketColor(Color.rgba(121, 150, 139, 255))
        .luminosity(8)
        .displayName('Molten Zinc')
    event.create('molten_iron')
        .thickTexture(Color.rgba(201, 41, 0, 255))
        .bucketColor(Color.rgba(201, 41, 0, 255))
        .luminosity(8)
        .displayName('Molten Iron')
    event.create('molten_lead')
        .thickTexture(Color.rgba(36, 33, 56, 255))
        .bucketColor(Color.rgba(36, 33, 56, 255))
        .luminosity(8)
        .displayName('Molten Lead')
    event.create('molten_mixed_metal')
        .thickTexture(Color.rgba(73, 73, 73, 255))
        .bucketColor(Color.rgba(73, 73, 73, 255))
        .luminosity(8)
        .displayName('Molten Mixed Metal')
    event.create('molten_steel')
        .thickTexture(Color.rgba(105, 105, 105, 255))
        .bucketColor(Color.rgba(105, 105, 105, 255))
        .luminosity(8)
        .displayName('Molten Steel')
    event.create('mortar')
        .thinTexture(Color.rgba(147, 147, 147, 255))
        .bucketColor(Color.rgba(147, 147, 147, 255))
        .displayName('Mortar')
})