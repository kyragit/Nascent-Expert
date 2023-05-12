const ITEMS = [
    'meetyourfight:fossil_bait',
    'meetyourfight:haunted_bell',
    'meetyourfight:devils_ante',
    'mahoutsukai:mortar_and_pestle',
    'mahoutsukai:mortar',
    'mahoutsukai:pestle',
    'mahoutsukai:hammer',
    'createaddition:diamond_grit',
    'farmersdelight:carrot_crate',
    'farmersdelight:potato_crate',
    'farmersdelight:beetroot_crate',
    'nomadictents:rigid_dirt',
    'nomadictents:yurt_wall',
    'nomadictents:yurt_roof',
    'nomadictents:bedouin_wall',
    'nomadictents:bedouin_roof',
    'nomadictents:indlu_wall',
    'simplyswords:brimstone_claymore',
    'structure_gel:red_gel',
    'structure_gel:blue_gel',
    'structure_gel:green_gel',
    'structure_gel:cyan_gel',
    'structure_gel:orange_gel',
    'structure_gel:yellow_gel',
    'structure_gel:data_handler',
    'structure_gel:dynamic_spawner',
    'structure_gel:building_tool',
    'paraglider:heart_container',
    'paraglider:stamina_vessel',
    'paraglider:spirit_orb',
    'paraglider:anti_vessel',
    'paraglider:essence',
    'paraglider:goddess_statue',
    'paraglider:kakariko_goddess_statue',
    'paraglider:goron_goddess_statue',
    'paraglider:rito_goddess_statue',
    'paraglider:horned_statue',
    'oldguns:bombard',
]

const TEPEE_WALLS = [
    'blank',
    'channel',
    'creeper',
    'dreamcatcher',
    'eagle',
    'golem',
    'hope',
    'magic',
    'radial',
    'rain',
    'space',
    'sun',
    'triforce',
    'wedge',
    'zigzag',
]

const COLORS = [
    'black',
    'blue',
    'green',
    'red',
    'yellow',
    'lime',
    'orange',
    'magenta',
    'purple',
    'white',
    'pink',
    'brown',
    'gray',
    'light_gray',
    'cyan',
    'light_blue',
]

const GEOLOSYS_ORES = [
    'ancient_debris',
    'nether_gold',
    'autunite',
    'anthracite_coal',
    'sphalerite',
    'teallite',
    'bauxite',
    'quartz',
    'galena',
    'hematite',
    'cassiterite',
    'cinnabar',
    'malachite',
    'gold',
    'platinum',
    'azurite',
    'beryl',
    'limonite',
    'kimberlite',
    'coal',
    'lapis',
    'lignite',
    'bituminous_coal',
]

const GEOLOSYS_MATS = [
    'aluminum',
    'lead',
    'nickel',
    'platinum',
    'silver',
    'tin',
    'zinc',
]

JEIEvents.hideItems(event => {
    for (let item of ITEMS) {
        event.hide(item)
    }
    for (let wall of TEPEE_WALLS) {
        event.hide(`nomadictents:${wall}_tepee_wall`)
    }
    for (let color of COLORS) {
        event.hide(`nomadictents:${color}_shamiyana_wall`)
    }
    for (let ore of GEOLOSYS_ORES) {
        event.hide(`geolosys:${ore}_ore_sample`)
    }
    for (let mat of GEOLOSYS_MATS) {
        event.hide(`geolosys:${mat}_ingot`)
        event.hide(`geolosys:${mat}_nugget`)
        event.hide(`geolosys:${mat}_cluster`)
    }
    event.hide('geolosys:copper_nugget')
    event.hide('geolosys:ancient_debris_cluster')
    event.hide('geolosys:copper_cluster')
    event.hide('geolosys:gold_cluster')
    event.hide('geolosys:iron_cluster')
    event.hide('geolosys:nether_gold_cluster')
    event.hide('geolosys:osmium_cluster')
    event.hide('geolosys:uranium_cluster')
    event.hide('geolosys:anthracite_coal')
    event.hide('geolosys:lignite_coal')
    event.hide('geolosys:bituminous_coal')
    event.hide('geolosys:lignite_coal_coke')
    event.hide('geolosys:bituminous_coal_coke')
    event.hide('geolosys:peat_coal')
    event.hide('geolosys:peat')
    event.hide('geolosys:rhododendron')
    event.hide('geolosys:prospectors_pick')
    event.hide('#fantasyfurniture:craftable')
})

JEIEvents.information(event => {
    event.addItem('create:crimsite', 'Can be generated when water touches a lava source block with an iron block underneath.')
    event.addItem('minecraft:amethyst_block', 'Can be generated when water touches a lava source block with a diamond block on the side.')
    event.addItem('create:veridium', 'Can be generated when water touches flowing lava with a block of corundum underneath.')
    event.addItem('minecraft:tuff', 'Can be generated when water touches flowing lava with a budding amethyst block underneath.')
    event.addItem('minecraft:netherrack', 'Can be generated in a hot biome when water touches flowing lava with a magma block underneath.')
    event.addItem('create:scoria', 'Can be generated in a hot biome when water touches flowing lava with bedrock underneath.')
    event.addItem('create:scorchia', 'Can be generated in a cold biome when water touches flowing lava with bedrock underneath.')
    event.addItem('create:asurine', 'Can be generated in a cold biome when water touches flowing lava with a block of blue ice underneath.')
    event.addItem('create:ochrum', 'Can be generated in a desert biome when water touches flowing lava with ochrum on all sides except underneath.')
    event.addItem('minecraft:andesite', 'Can be generated when lava touches a water source block with andesite underneath.')
    event.addItem('create:limestone', 'Can be generated when lava touches a water source block with limestone on the side.')
    event.addItem('minecraft:calcite', 'Can be generated when lava touches a water source block with a bone block underneath.')
    event.addItem('minecraft:dripstone_block', 'Can be generated in a dripstone caves biome when lava touches a water source block.')
    event.addItem('minecraft:diorite', 'Can be generated when water touches flowing lava next to a block of diorite and a block of quartz.')
    event.addItem('minecraft:granite', 'Can be generated when water touches flowing lava with granite above and below it.')
    event.addItem('byg:soapstone', 'Can be generated in a cold biome when water touches flowing lava with clay underneath.')
    event.addItem('byg:pink_sandstone', 'Can be generated in an ocean biome when water touches flowing lava with glowstone underneath.')

    event.addItem('hexcasting:amethyst_dust', 'Can be created by exploding amethyst shards.')
    event.addItem('kubejs:star_of_quintessence', 'Can be powderized with an explosion.')
    event.addItem('create:andesite_alloy', 'They say that with enough determination, anything is possible...')
    event.addItem('endrem:nether_eye', 'In the nether, right click a block of netherite with an eye of ender while having the blessing of a fire shrine.')
    event.addItem('endrem:undead_eye', 'Give a zombie villager an eye of ender.')
    event.addItem('endrem:guardian_eye', 'Right click a guardian with an eye of ender while having the blessing of a water shrine.')

    event.addItem('kubejs:mark_of_the_accursed', [Text.string('Equip an item with the ').append(Text.red('Curse of Binding')).append('.').component()])
    event.addItem('kubejs:eye_of_revelation', [Text.string('Decrypt the ').append(Text.green('writings of the ancients')).append('.').component()])

    event.addItem('oldguns:niter', 'Let a cauldron full of Liquid Niter boil over a heat source (like a campfire).')
    event.addItem('oldguns:nitrate_soil', 'Right-click a saturated block of Niter Bedding with a shovel.')
    event.addItem('oldguns:niter_bedding', 'Becomes saturated with niter over time when below farm animals or dripping dripstone.')
    event.addItem('oldguns:wet_high_grade_black_powder_cake', 'Crush a block of wet medium-grade black powder with a piston above and obsidian below.')
    event.addItem('oldguns:high_grade_black_powder_cake', 'Leave a wet high-grade black powder cake to dry in the sun.')

    event.addItem('kubejs:evoker_soul', 'The Dark Arts are a closely guarded secret. Perhaps some texts describing its practice still remain...')
})

ItemEvents.tooltip(event => {
    event.addAdvanced('gateways:gate_pearl', (item, advanced, text) => {
        if (item.nbtString.includes('custom:wither')) {
            text.add(Text.darkRed('Warning: very destructive!'))
        }
    })
    event.add('simplyswords:runic_tablet', Text.aqua('Right-click for a random runic weapon!'))
})

ClientEvents.highPriorityAssets(event => {
    event.addLang('item.quark.backpack', 'Small Backpack')

    event.addLang('sdrp.mainmenu', 'Awaiting a new journey')
    event.addLang('sdrp.logo', 'A Minecraft Modpack')
    event.addLang('sdrp.overworld.in', 'Traversing the Overworld')
    event.addLang('sdrp.overworld', 'Overworld')
    event.addLang('sdrp.the_nether.in', 'Suffering in the Nether')
    event.addLang('sdrp.the_nether', 'The Nether')
    event.addLang('sdrp.the_end.in', 'Conquering the End')
    event.addLang('sdrp.the_end', 'The End')
    event.addLang('sdrp.the_bumblezone.in', 'Trying not to get stung in the Bumblezone')
    event.addLang('sdrp.the_bumblezone', 'The Bumblezone')
    event.addLang('sdrp.dungeon_dimension.in', 'Completely lost in the Dungeon Dimension')
    event.addLang('sdrp.dungeon_dimension', 'The Dungeon Dimension')
    event.addLang('sdrp.build_dimension.in', 'In their own personal Building Dimension')
    event.addLang('sdrp.build_dimension', 'The Building Dimension')
    event.addLang('sdrp.reality_marble.in', 'Somewhere beyond your understanding')
    event.addLang('sdrp.reality_marble', 'Reality Marble')

    event.addLang('affix.custom:vampiric', 'Vampiric')
    event.addLang('affix.custom:vampiric.suffix', 'of Blood')
    event.addLang('affix.custom:energizing', 'Energizing')
    event.addLang('affix.custom:energizing.suffix', 'of the Feather')
    event.addLang('affix.custom:speed', 'Swift')
    event.addLang('affix.custom:speed.suffix', 'of Speed')
    event.addLang('affix.custom:greater_speed', 'Fleet-Footed')
    event.addLang('affix.custom:greater_speed.suffix', 'of Expiditiousness')
    event.addLang('affix.custom:ancient_speed', 'Lightspeed')
    event.addLang('affix.custom:ancient_speed.suffix', 'of Ancient Speed')
    event.addLang('affix.custom:haste', 'Dextrous')
    event.addLang('affix.custom:haste.suffix', 'of Dexterity')
    event.addLang('affix.custom:greater_haste', 'Fleet')
    event.addLang('affix.custom:greater_haste.suffix', 'of Alacrity')
    event.addLang('affix.custom:ancient_haste', 'Expiditious')
    event.addLang('affix.custom:ancient_haste.suffix', 'of Celerity')
    event.addLang('affix.custom:regen', 'Regenerative')
    event.addLang('affix.custom:regen.suffix', 'of Healing')
    event.addLang('affix.custom:ancient_regen', 'Gaea\'s')
    event.addLang('affix.custom:ancient_regen.suffix', 'of Ancient Healing')
    event.addLang('affix.custom:sundering', 'Sundering')
    event.addLang('affix.custom:sundering.suffix', 'of Shattering')
    event.addLang('affix.custom:greater_sundering', 'Greater Sundering')
    event.addLang('affix.custom:greater_sundering.suffix', 'of Fracturing')
    event.addLang('affix.custom:ancient_sundering', 'Ruinous')
    event.addLang('affix.custom:ancient_sundering.suffix', 'of Disintegration')
    event.addLang('affix.custom:stunning', 'Dazing')
    event.addLang('affix.custom:stunning.suffix', 'of Stunning')
    event.addLang('affix.custom:knowledge', 'Wise')
    event.addLang('affix.custom:knowledge.suffix', 'of Wisdom')
    event.addLang('affix.custom:greater_knowledge', 'Sophisticated')
    event.addLang('affix.custom:greater_knowledge.suffix', 'of Great Wisdom')
    event.addLang('affix.custom:ancient_knowledge', 'Genious')
    event.addLang('affix.custom:ancient_knowledge.suffix', 'of Ancient Knowledge')
    event.addLang('affix.custom:volatile', 'Volatile')
    event.addLang('affix.custom:volatile.suffix', 'of Volatility')
    event.addLang('affix.custom:corrosive', 'Corrosive')
    event.addLang('affix.custom:corrosive.suffix', 'of Corrosion')
    event.addLang('affix.custom:slippery', 'Slippery')
    event.addLang('affix.custom:slippery.suffix', 'of Slipperiness')
    event.addLang('affix.custom:glowing', 'Glowing')
    event.addLang('affix.custom:glowing.suffix', 'of Luminosity')
    event.addLang('affix.custom:instant_damage', 'Painful')
    event.addLang('affix.custom:instant_damage.suffix', 'of Pain')
    event.addLang('affix.custom:ancient_instant_damage', 'Agonizing')
    event.addLang('affix.custom:ancient_instant_damage.suffix', 'of Suffering')
    event.addLang('affix.custom:instant_health', 'Healing')
    event.addLang('affix.custom:instant_health.suffix', 'of Health')
    event.addLang('affix.custom:ancient_instant_health', 'Euphoric')
    event.addLang('affix.custom:ancient_instant_health.suffix', 'of Euphoria')
    event.addLang('affix.custom:hidden', 'Camouflaged')
    event.addLang('affix.custom:hidden.suffix', 'of Invisibility')
    event.addLang('affix.custom:levitation', 'Levitating')
    event.addLang('affix.custom:levitation.suffix', 'of Levitation')
    event.addLang('affix.custom:ancient_levitation', 'Anti-Gravity')
    event.addLang('affix.custom:ancient_levitation.suffix', 'of Anti-Gravity')
    event.addLang('affix.custom:resistance', 'Toughening')
    event.addLang('affix.custom:resistance.suffix', 'of Toughness')
    event.addLang('affix.custom:greater_resistance', 'Iron-Skinned')
    event.addLang('affix.custom:greater_resistance.suffix', 'of Ironskin')
    event.addLang('affix.custom:ancient_resistance', 'Unkillable')
    event.addLang('affix.custom:ancient_resistance.suffix', ', the Unkillable')
    event.addLang('affix.custom:armor_resistance', 'Toughening')
    event.addLang('affix.custom:armor_resistance.suffix', 'of Toughness')
    event.addLang('affix.custom:greater_armor_resistance', 'Iron-Skinned')
    event.addLang('affix.custom:greater_armor_resistance.suffix', 'of Ironskin')
    event.addLang('affix.custom:ancient_armor_resistance', 'Unkillable')
    event.addLang('affix.custom:ancient_armor_resistance.suffix', ', the Unkillable')
    event.addLang('affix.custom:strength', 'Strengthening')
    event.addLang('affix.custom:strength.suffix', 'of Strength')
    event.addLang('affix.custom:greater_strength', 'Barbaric')
    event.addLang('affix.custom:greater_strength.suffix', 'of Barbarism')
    event.addLang('affix.custom:ancient_strength', 'Unstoppable')
    event.addLang('affix.custom:ancient_strength.suffix', ', the Unstoppable')
    event.addLang('affix.custom:withering', 'Withering')
    event.addLang('affix.custom:withering.suffix', 'of Death')
    event.addLang('affix.custom:ancient_withering', 'Satanic')
    event.addLang('affix.custom:ancient_withering.suffix', 'of Beyond')
    event.addLang('affix.custom:poison', 'Poisonous')
    event.addLang('affix.custom:poison.suffix', 'of Poison')
    event.addLang('affix.custom:greater_poison', 'Venomous')
    event.addLang('affix.custom:greater_poison.suffix', 'of Venom')
    event.addLang('affix.custom:ancient_poison', 'Toxic')
    event.addLang('affix.custom:ancient_poison.suffix', 'of the Snake')
    event.addLang('affix.custom:bleeding', 'Serrated')
    event.addLang('affix.custom:bleeding.suffix', 'of Wounding')
    event.addLang('affix.custom:enderference', 'Anti-Ender')
    event.addLang('affix.custom:enderference.suffix', 'of Signal Interference')
    event.addLang('affix.custom:breaker_haste', 'Dextrous')
    event.addLang('affix.custom:breaker_haste.suffix', 'of Dexterity')
    event.addLang('affix.custom:greater_breaker_haste', 'Fleet')
    event.addLang('affix.custom:greater_breaker_haste.suffix', 'of Alacrity')
    event.addLang('affix.custom:ancient_breaker_haste', 'Expiditious')
    event.addLang('affix.custom:ancient_breaker_haste.suffix', 'of Celerity')
    event.addLang('affix.custom:night_vision', 'Luminescent')
    event.addLang('affix.custom:night_vision.suffix', 'of the Cat\'s Eye')
    event.addLang('affix.custom:water_breathing', 'Neptune\'s')
    event.addLang('affix.custom:water_breathing.suffix', 'of the Ocean')
    event.addLang('affix.custom:saturation', 'Saturating')
    event.addLang('affix.custom:saturation.suffix', '... It Looks Tasty')
    event.addLang('affix.custom:shield_mining_fatigue', 'Exhausting')
    event.addLang('affix.custom:shield_mining_fatigue.suffix', 'of Fatigue')
    event.addLang('affix.custom:shield_weakness', 'Weakening')
    event.addLang('affix.custom:shield_weakness.suffix', 'of Weakness')
    event.addLang('affix.custom:shield_fear', 'Terrifying')
    event.addLang('affix.custom:shield_fear.suffix', 'of Terror')
    event.addLang('affix.custom:ancient_shield_fear', 'Horrifying')
    event.addLang('affix.custom:ancient_shield_fear.suffix', 'of Horror')
    event.addLang('affix.custom:shield_instant_damage', 'Spiked')
    event.addLang('affix.custom:shield_instant_damage.suffix', 'of Pain')
    event.addLang('affix.custom:greater_shield_instant_damage', 'Razor-Sharp')
    event.addLang('affix.custom:greater_shield_instant_damage.suffix', 'of Agony')
    event.addLang('affix.custom:ancient_shield_instant_damage', 'Serrated')
    event.addLang('affix.custom:ancient_shield_instant_damage.suffix', 'of Searing Torment')
    event.addLang('affix.custom:bow_slipping', 'Oiled')
    event.addLang('affix.custom:bow_slipping.suffix', 'of Slipping')
    event.addLang('affix.custom:vanilla_scent', 'Sweet-Smelling')
    event.addLang('affix.custom:vanilla_scent.suffix', 'of Tranquility')
    event.addLang('affix.custom:absorption', 'Vitalizing')
    event.addLang('affix.custom:absorption.suffix', 'of Absorption')
    event.addLang('affix.custom:greater_absorption', 'Rejuvinating')
    event.addLang('affix.custom:greater_absorption.suffix', 'of Healthiness')
    event.addLang('affix.custom:ancient_absorption', 'Life-Creating')
    event.addLang('affix.custom:ancient_absorption.suffix', 'of Gaea')
})

//const VanillaTypes = Java.loadClass('mezz.jei.api.constants.VanillaTypes')
//
//NetworkEvents.fromServer('test', event => {
//    global.jeiRuntime.getIngredientManager().removeIngredientsAtRuntime(VanillaTypes.ITEM_STACK, [Item.of('minecraft:dirt')])
//})
//
//NetworkEvents.fromServer('untest', event => {
//    global.jeiRuntime.getIngredientManager().addIngredientsAtRuntime(VanillaTypes.ITEM_STACK, [Item.of('minecraft:dirt')])
//})