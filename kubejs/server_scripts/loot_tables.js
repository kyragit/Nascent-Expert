ServerEvents.genericLootTables(event => {
    createUniversalLootTables(event)
    dungeonsAriseLootTables(event)
    dimDungeonsLootTables(event)
    hexcastingLootTables(event)
    yungsLootTables(event)
    dugeonsPlusLootTables(event)
    bygLootTables(event)
    apotheosisLootTables(event)
    lostCastleLootTables(event)
    idasLootTables(event)
    minecraftLootTables(event)
    bygoneNetherLootTables(event)
    graveyardLootTables(event)
    dungeonsEnhancedLootTables(event)
    incendiumLootTables(event)
    cursedLootTables(event)
    treasureBagLootTables(event)
    structoryLootTables(event)
})

// [structure, weight, decoration, zoom, name]
const MAP_STRUCTURES = [
    ['dungeons_arise:bandit_towers', 1, 'target_x', 2, Text.gold('Bandit Towers Explorer\'s Map')],
    ['dungeons_arise:keep_kayra', 1, 'target_x', 2, Text.green('Keep Kayra Explorer\'s Map')],
    ['dungeons_arise:thornborn_towers', 1, 'target_x', 2, Text.green('Thornborn Towers Explorer\'s Map')],
    ['dungeons_arise:foundry', 1, 'target_x', 2, Text.red('Foundry Explorer\'s Map')],
    ['dungeons_arise:heavenly_challenger', 1, 'target_x', 2, Text.aqua('Heavenly Challenger Explorer\'s Map')],
    ['dungeons_arise:infested_temple', 1, 'target_x', 2, Text.darkGreen('Infested Temple Explorer\'s Map')],
    ['dungeons_arise:plague_asylum', 1, 'target_x', 2, Text.darkGray('Plague Asylum Explorer\'s Map')],
    ['dungeons_arise:shiraz_palace', 1, 'target_x', 2, Text.gold('Shiraz Palace Explorer\'s Map')],
    ['betterdeserttemples:desert_temple', 1, 'target_x', 2, Text.gold('Desert Temple Explorer\'s Map')],
    ['betteroceanmonuments:ocean_monument', 1, 'target_x', 2, Text.blue('Ocean Monument Explorer\'s Map')],
    ['idas:ancient_mines', 1, 'target_x', 2, Text.darkGray('Ancient Mines Explorer\'s Map')],
    ['idas:labyrinth', 1, 'target_x', 2, Text.gold('Labyrinth Explorer\'s Map')],
    ['idas:pillager_fortress', 1, 'target_x', 2, Text.gray('Pillager Fortress Explorer\'s Map')],
    ['idas:tinkers_workshop', 1, 'target_x', 2, Text.white('Tinker\'s Workshop Explorer\'s Map')],
    ['graveyard:lich_prison', 1, 'target_x', 2, Text.red('Lich Prison Explorer\'s Map')],
    ['trolldom:water_shrine', 1, 'target_x', 2, Text.blue('Water Shrine Explorer\'s Map')],
    ['trolldom:earth_shrine', 1, 'target_x', 2, Text.green('Earth Shrine Explorer\'s Map')],
    ['trolldom:air_shrine', 1, 'target_x', 2, Text.yellow('Air Shrine Explorer\'s Map')],
]

const MAP_STRUCTURES_NETHER = [
    ['trolldom:fire_shrine', 1, 'target_x', 2, Text.red('Fire Shrine Explorer\'s Map')],
    ['bygonenether:piglin_manor', 1, 'target_x', 2, Text.red('Piglin Manor Explorer\'s Map')],
    ['betterfortresses:fortress', 1, 'target_x', 2, Text.red('Nether Fortress Explorer\'s Map')],
]

// Map function needs a tag, so I make a new tag for each structure
ServerEvents.tags('minecraft:worldgen/structure', event => {
    for (let structure of MAP_STRUCTURES) {
        event.add(`custom:dummy_tags/${structure[0].split(':')[1]}`, structure[0])
    }
    for (let structure of MAP_STRUCTURES_NETHER) {
        event.add(`custom:dummy_tags/${structure[0].split(':')[1]}`, structure[0])
    }
})

ServerEvents.genericLootTables(event => {
    event.addGeneric('custom:structure_map', loot => {
        loot.addPool(pool => {
            for (let structure of MAP_STRUCTURES) {
                pool.addItem('minecraft:map')
                .addCondition({
                    condition: 'location_check',
                    predicate: {
                        dimension: 'minecraft:overworld'
                    }
                })
                .weight(structure[1])
                .addFunction({
                    function: 'exploration_map',
                    destination: `custom:dummy_tags/${structure[0].split(':')[1]}`,
                    decoration: structure[2],
                    zoom: structure[3],
                    search_radius: 50
                })
                .name(structure[4])
            }
        })
    })
    event.addGeneric('custom:structure_map_nether', loot => {
        loot.addPool(pool => {
            for (let structure of MAP_STRUCTURES_NETHER) {
                pool.addItem('minecraft:map')
                .addCondition({
                    condition: 'location_check',
                    predicate: {
                        dimension: 'minecraft:the_nether'
                    }
                })
                .weight(structure[1])
                .addFunction({
                    function: 'exploration_map',
                    destination: `custom:dummy_tags/${structure[0].split(':')[1]}`,
                    decoration: structure[2],
                    zoom: structure[3],
                    search_radius: 50
                })
                .name(structure[4])
            }
        })
    })
})

ServerEvents.blockLootTables(event => {
    geolosysLootTables(event)
    event.modifyBlock('#forge:ores/redstone', loot => {
        loot.addPool(pool => {
            pool.rolls = {n: 1, p: 0.1}
            pool.addItem('spelunkery:cinnabar')
        })
    })
})

LootJS.modifiers(event => {
    event.disableWitherStarDrop()
    // Stops all eyes of ender generating as loot, anywhere
    event.addLootTableModifier(/.*/).removeLoot('minecraft:ender_eye').removeLoot(/create:(?:andesite_alloy|goggles|wrench|gearbox|large_cogwheel|cogwheel|shaft)/)
    event.addLootTableModifier(/^endrem:.*/).removeLoot(/.*/)
    event.addLootTableModifier(/^blazegear:inject.*/).removeLoot(/.*/)
    event.addLootTableModifier(/^incendium:artifact.*/).randomChance(0.75).addLoot('enigmaticlegacy:blazing_core')
    event.addLootTableModifier('dreamland:grant_book_on_first_join').removeLoot(/.*/)
    event.addLootTableModifier('simplyswords:grant_book_on_first_join').removeLoot(/.*/)
    event.addLootTableModifier('parcool:grant_parcool_guide').removeLoot(/.*/)
    event.addLootTableModifier('immersiveengineering:chests/engineers_house').removeLoot(/.*/)
    event.addLootTableModifier(/immersiveengineering:gameplay.*/).removeLoot(/.*/)
    event.addLootTableModifier(/treasurebags:entity_group.*/).removeLoot(/.*/)
    // i hate this so much
    event.addLootTableModifier(/^wabi_sabi_structures:chests.*/).apply(ctx => {
        ctx.server.lootTables.get('custom:loot_common').getRandomItems(new Builder(ctx.server.getLevel(ctx.level.dimension)).create(LootContextParamSets.EMPTY)).forEach(item => {
            ctx.addLoot(item)
        })
    })
})

const PLENTIFUL = 'custom:loot_plentiful'
const COMMON = 'custom:loot_common'
const UNCOMMON = 'custom:loot_uncommon'
const RARE = 'custom:loot_rare'
const EPIC = 'custom:loot_epic'
const LEGENDARY = 'custom:loot_legendary'
const GODLY = 'custom:loot_godly'

const NETHER_COMMON = 'custom:nether_loot_common'
const NETHER_UNCOMMON = 'custom:nether_loot_uncommon'
const NETHER_RARE = 'custom:nether_loot_rare'
const NETHER_EPIC = 'custom:nether_loot_epic'
const NETHER_LEGENDARY = 'custom:nether_loot_legendary'
const NETHER_GODLY = 'custom:nether_loot_godly'

function createUniversalLootTables(event) {

    const OVERWORLD_ARTIFACTS = [
        ['enigmaticlegacy:mining_charm', 1],
        ['enigmaticlegacy:escape_scroll', 1],
        ['enigmaticlegacy:forbidden_axe', 1],
        ['enigmaticlegacy:super_magnet_ring', 1],
        ['relics:aqua_walker', 1],
        ['relics:spatial_sign', 1],
        ['relics:rage_glove', 1],
        ['relics:holy_locket', 1],
        ['relics:midnight_robe', 1],
        ['relics:reflection_necklace', 1],
        ['relics:drowned_belt', 1],
        ['relics:ice_breaker', 1],
        ['simplyswords:storms_edge', 2],
        ['simplyswords:stormbringer', 2],
        ['simplyswords:toxic_longsword', 2],
        ['simplyswords:emberblade', 2],
        ['simplyswords:hearthflame', 2],
        ['simplyswords:soulkeeper', 2],
        ['simplyswords:arcanethyst', 2],
        ['artifacts:snorkel', 1],
        ['artifacts:vampiric_glove', 1],
        ['artifacts:bunny_hoppers', 1],
        ['artifacts:power_glove', 1],
        ['artifacts:feral_claws', 1],
        ['artifacts:crystal_heart', 1],
        ['kubejs:portable_black_hole', 2],
        ['kubejs:staff_of_gaea', 2],
        ['kubejs:unstable_vortex_generator', 2],
        ['davespotioneering:potioneer_gauntlet', 1],
        ['simplyswords:slumbering_lichblade', 1],
    ]

    const ARTIFACT_CHARMS = [
        ['minecraft:fire_resistance', true, 1],
        ['minecraft:strong_swiftness', true, 1],
        ['minecraft:regeneration', true, 1],
        ['minecraft:strength', true, 1],
        ['minecraft:water_breathing', true, 1],
        ['apotheosis:resistance', true, 1],
        ['apotheosis:haste', true, 1],
        ['apotheosis:knowledge', true, 1],
        ['alexsmobs:poison_resistance', true, 1],
    ]
    
    const OVERWORLD_TREASURE = [
        ['enigmaticlegacy:insignia', 1],
        ['enigmaticlegacy:unholy_grail', 3],
        ['enigmaticlegacy:void_stone', 2],
        ['enigmaticlegacy:xp_scroll', 1],
        ['enigmaticlegacy:mega_sponge', 1],
        ['enigmaticlegacy:magnet_ring', 2],
        ['enigmaticlegacy:enchantment_transposer', 3],
        ['relics:spore_sac', 2],
        ['relics:ice_skates', 2],
        ['relics:horse_flute', 2],
        ['relics:hunter_belt', 1],
        ['relics:arrow_quiver', 1],
        ['relics:wool_mitten', 1],
        ['relics:leather_belt', 1],
        ['artifacts:plastic_drinking_hat', 1],
        ['artifacts:novelty_drinking_hat', 1],
        ['artifacts:night_vision_goggles', 1],
        ['artifacts:villager_hat', 1],
        ['artifacts:cloud_in_a_bottle', 1],
        ['artifacts:cross_necklace', 1],
        ['artifacts:panic_necklace', 1],
        ['artifacts:shock_pendant', 1],
        ['artifacts:flame_pendant', 1],
        ['artifacts:thorn_pendant', 1],
        ['artifacts:charm_of_sinking', 1],
        ['artifacts:helium_flamingo', 1],
        ['artifacts:digging_claws', 1],
        ['artifacts:fire_gauntlet', 1],
        ['artifacts:pocket_piston', 1],
        ['artifacts:golden_hook', 1],
        ['artifacts:steadfast_spikes', 1],
        ['artifacts:flippers', 1],
        ['artifacts:whoopee_cushion', 1],
        ['artifacts:umbrella', 1],
        ['artifacts:superstitious_hat', 1],
        ['artifacts:lucky_scarf', 1],
        ['magic_doorknob:magic_doorknob_iron', 1],
        ['magic_doorknob:magic_doorknob_gold', 1],
        ['magic_doorknob:magic_doorknob_diamond', 1],
        ['kubejs:staff_core', 1],
    ]

    const TREASURE_CHARMS = [
        ['minecraft:swiftness', true, 1],
        ['minecraft:night_vision', true, 1],
        ['minecraft:invisibility', true, 1],
        ['minecraft:slow_falling', true, 1],
        ['minecraft:leaping', true, 1],
        ['alexsmobs:knockback_resistance', true, 1],
        ['alexsmobs:clinging', true, 1],
        ['feathers:energized_potion', true, 1],
    ]
    
    const RUNIC_WEAPONS = [
        ['simplyswords:runic_longsword', 1],
        ['simplyswords:runic_twinblade', 1],
        ['simplyswords:runic_rapier', 1],
        ['simplyswords:runic_katana', 1],
        ['simplyswords:runic_sai', 1],
        ['simplyswords:runic_spear', 1],
        ['simplyswords:runic_glaive', 1],
        ['simplyswords:runic_cutlass', 1],
        ['simplyswords:runic_claymore', 1],
        ['simplyswords:runic_chakram', 1],
        ['simplyswords:runic_greataxe', 1],
        ['simplyswords:runic_greathammer', 1],
        ['simplyswords:runic_warglaive', 1],
        ['simplyswords:runic_scythe', 1],
        ['simply_swords:runic_tablet', 3],
    ]
    
    const OVERWORLD_VALUABLE = [
        ['enigmaticlegacy:extradimensional_eye', 9],
        ['enigmaticlegacy:recall_potion', 15],
        ['quark:bottled_cloud', 1],
        ['quark:red_rune', 1],
        ['quark:blue_rune', 1],
        ['quark:light_blue_rune', 1],
        ['quark:cyan_rune', 1],
        ['quark:green_rune', 1],
        ['quark:lime_rune', 1],
        ['quark:white_rune', 1],
        ['quark:gray_rune', 1],
        ['quark:light_gray_rune', 1],
        ['quark:black_rune', 1],
        ['quark:pink_rune', 1],
        ['quark:magenta_rune', 1],
        ['quark:orange_rune', 1],
        ['quark:yellow_rune', 1],
        ['quark:purple_rune', 1],
        ['quark:brown_rune', 1],
        ['quark:rainbow_rune', 1],
        ['dimdungeons:item_portal_key', 2],
        ['paraglider:paraglider', 2],
        ['paraglider:deku_leaf', 2],
        ['aquaculture:neptunium_ingot', 1],
        ['magic_doorknob:magic_doorknob_wood', 1],
        ['magic_doorknob:magic_doorknob_stone', 1],
        ['kubejs:unsettling_eye', 1],
    ]

    const VALUABLE_CHARMS = [
        ['minecraft:strong_regeneration', false, 1],
        ['minecraft:fire_resistance', false, 1],
        ['minecraft:slow_falling', false, 1],
        ['apotheosis:wither', true, 1],
        ['apotheosis:fatigue', true, 1],
        ['rottencreatures:freeze', true, 1],
        ['ecologics:sliding', true, 1],
        ['alexsmobs:poison_resistance', false, 1],
    ]

    const NETHER_VALUABLE = [
        ['enigmaticlegacy:golden_ring', 1],
        ['pyromancer:blazing_quill', 1],
        ['pyromancer:membrane_quill', 1],
        ['pyromancer:fungus_quill', 1],
        ['pyromancer:burrito', 1],
        ['magic_doorknob:magic_doorknob_netherite', 1],
    ]

    const NETHER_TREASURE = [
        ['enigmaticlegacy:monster_charm', 1],
        ['enigmaticlegacy:mending_mixture', 1],
        ['pyromancer:blazing_journal', 1],
        ['pyromancer:smoldering_twig', 1],
        ['pyromancer:sizzling_hand', 1],
        ['pyromancer:call_of_flames', 1],
    ]

    const NETHER_ARTIFACTS = [
        ['simplyswords:mjolnir', 1],
        ['simplyswords:frostfall', 1],
        ['simplyswords:soulstealer', 1],
        ['simplyswords:watcher_claymore', 1],
        ['pyromancer:hellblaze_quill', 1],
        ['pyromancer:court_of_embers', 1],
        ['pyromancer:schizoid_helm', 1],
        ['pyromancer:lantern_of_blazing_souls', 1],
    ]

    const LORE_BOOKS = [
        Item.of('minecraft:written_book', '{author:"Unknown",pages:[\'{"text":">AUTOMATIC LOG ENTRY\\\\n>14:30:34 7/3/9727\\\\n>SUBSYSTEM 366E\\\\n>\\\\n>OVERWORLD INFRACTIONS DETECTED: 1\\\\n>NETHER INFRACTIONS DETECTED: 0\\\\n>END INFRACTIONS DETECTED: 0\\\\n>BEFORE INFRACTIONS DETECTED: 0\\\\n"}\',\'{"text":">BEYOND INFRACTIONS DETECTED: 0\\\\n>WITHIN INFRACTIONS DETECTED: 0\\\\n>AFTER INFRACTIONS DETECTED: 1,802\\\\n>OTHER INFRACTIONS DETECTED: 0\\\\n>DETERMINED THREAT PRIORITY: LOW\\\\n>ACTIONS TAKEN: 5\\\\n>ACTIONS SUCCESSFUL: 5"}\',\'{"text":">LOG ENTRY DESCRIPTION AGENT: A-376-B\\\\n>DESCRIPTION:\\\\n1,798 Threats in After determined non-actionable. The 4 remaining threats in After were forwarded to subsystem 13A. One overworld threat estimated to be an attempted unauthorized entry"}\',\'{"text":"into After United Minds spacetime. Entry was successfully blocked and countermeasures were taken, including automated electric strikes at the estimated area of infraction and deployment of AUM vehicles. Threat determined to be terminated.\\\\n>END LOG"}\'],title:"LOG ENTRY"}'),
        Item.of('minecraft:written_book', '{author:"Unknown Explorer",pages:[\'{"text":"1st Full Moon,\\\\n2599\\\\n\\\\nThe scorching desert heat gives way to fleeting comfort as the sun sets. The days have been long and draining, but my determination is undeterred. If I am to verify these rumors, I must adapt to these harsh conditions."}\',\'{"text":"1st Waning Gibbous,\\\\n2599\\\\n\\\\nA miracle or a mirage? In the distance, a faint outline; hope. If my eyes do not decieve me, a structure on the horizon. Tomorrow will bring answers."}\',\'{"text":"1st Last Quarter,\\\\n2599\\\\n\\\\nIt is no mirage. Before me is the grandest palace this side of the Alles; pristinely maintained with chromatic paint and lush trees. It is raised very far above the ground and vastly oversized, as if not built for my kind."}\',\'{"text":"The architecture is supremely advanced, with towers capped in bulbous domes and golden spires. It looks as though it was dropped here from another time. My heart races at the thought of exploring its every crevice."}\',\'{"text":"1st Waning Crescent,\\\\n2599\\\\n\\\\nI write this hidden in one of the many corners of this grand palace, for it seems it was not as unguarded as I had hoped. I am lucky to be well-prepared for such an encounter, but I will have to explore carefully."}\',\'{"text":"Already, I have stumbled across masterfully crafted and enchanted weapons and armor; if only I could carry it all back home. Nevertheless, my exploration will continue."}\',\'{"text":"2nd New Moon,\\\\n2599\\\\n\\\\nI have discovered something truly awful and marvelous. At the very peak of one of its mighty towers, a weapon unlike any I have seen. It is a halberd, and it surges with the power of thunder itself! Not only that, when wielded"}\',\'{"text":"and charged, it vaults me forward and through any foes in my path, killing them near instantly. I cannot risk losing such an artifact; I will bring it back immediately, along with a story unlike any other."}\'],title:"Lost Journal #1"}'),
        Item.of('minecraft:written_book', '{author:"A.C.P.C.G.",pages:[\'{"text":"Analysis on the Origin and Composition of the Spellstones\\\\n\\\\n\\\\nReport by the Alleq City Planar Communications Guild\\\\n\\\\n\\\\n\\\\n\\\\n\\\\nPublished 3991"}\',\'{"text":"Much discussion has been had regarding the Spellstones that the Guild has recently acquired from an unknown donor. Until recently, these were only known about from ancient writings and oral history (with one exception). This analysis hopes to demystify these items and their origin."}\',\'{"text":"The Guild now has three of these Spellstones, though it is now deemed probable that at least four exist. The following pages will describe each in detail."}\',\'{"text":"Will of the Ocean\\\\n\\\\nThis is the Spellstone with the earliest known written evidence of its existence, due to its relatively straightforward location. Its first appearance in the Overworld was very likely deep in the ocean, in the now-ruined ancient"}\',\'{"text":"monuments. Who created these monuments remains a mystery, though some oral accounts claim a group called the \\\\"guardians\\\\" were responsible. Regardless, what is known about this artifact is what it is made of; highly concentrated prismarine. It almost"}\',\'{"text":"certainly has some sort of power source in the center, but the Guild has elected not to destroy it to find out. The artifact has a very strong connection to Within, and it is hypothesized that the Spellstone itself is a conscious being, though this remains controversial. Little more is known of"}\',\'{"text":"its creation because of the difficulty inherent to studying Within. "}\',\'{"text":"Blazing Core\\\\n\\\\nThis Spellstone was first created in Beyond, and as such extra care had to be taken when handling it. It was likely crafted by the Beyond Mind itself, for the express purpose of luring in treasure hunters. And lure it did, for its first "}\',\'{"text":"documented discovery was in the Nether (during the Beyond occupation period). Its construction is not known exactly, but it seems to be made of some biological material. Perhaps it is best left unknown. "}\',\'{"text":"Heart of the Golem\\\\n\\\\nThis Spellstone is certainly the most well-known due to the public nature of its discovery and theft. Of course, it was first found in the Zamir Forest incident of 2656, before going missing for centuries. The Guild will not comment on the "}\',\'{"text":"controversy surrounding this event. This artifact is from Before, as it is a Golem\\\'s power source. It is made from what has now been dubbed \\\\"golemite\\\\". Many more of these likely exist, as it is now known that the Golems were prolific planar travellers. "}\',\'{"text":"Hypothesized Fourth Spellstone\\\\n\\\\nIt seems very likely that another Spellstone with connections to After exists. However, due to the current political climate, the Guild has elected not to publish any unverified hypotheses."}\'],title:"On Spellstones"}'),
        Item.of('minecraft:written_book', '{author:"Unknown Explorer",pages:[\'{"text":"3rd Last Quarter,\\\\n2600\\\\n\\\\nThe days on the high seas drag on and on. Oh, how I long for sweet land... \\\\nNevertheless, I must persist. Who knows what may await my discovery?"}\',\'{"text":"3rd Waxing Gibbous,\\\\n2600\\\\n\\\\nThe captain seems confident that land will arrive soon. I know not his reasons, but that is what I pay him for! \\\\nAmazing news! I was just informed as I write this that land has been spotted! I must prepare."}\',\'{"text":"3rd Full Moon,\\\\n2600\\\\n\\\\nWe have arrived at an unfamiliar land. The flora here is consistent with the rumours... it remains to be seen how true they are. "}\',\'{"text":"4th First Quarter,\\\\n2600\\\\n\\\\nWhat I am looking at is hard to believe, despite it being before my own two eyes. A gargantuan sandstone keep, with intricate stained glass windows and expertly carved roofing. It is hard to even describe how large it is; to my "}\',\'{"text":"eyes it appears over 200 meters high! My heart races at the thought of exploring this grand building."}\',\'{"text":"4th Waning Crescent,\\\\n2600\\\\n\\\\nAs expected, this place is heavily guarded; though nothing I am not capable of. The inside of this keep is even grander than I could have imagined. An enormous staircase ascends to the heavens, each step "}\',\'{"text":"well taller than I am. I can see some sort of grand gardens at the top, so high up I feel dizzy thinking about it. What, and who, this place was built for elude any explanation. I must reach the top."}\',\'{"text":"4th New Moon,\\\\n2600\\\\n\\\\nEven my trained legs can barely withstand climbing this keep, not to mention the inhabitants providing resistance. I am hiding in the building\\\'s library, nearing its zenith. I should take care t"}\',\'{"text":"4th Waxing Crescent,\\\\n2600\\\\n\\\\nApologies, I was rudely interrupted. I have reached the gardens, but I am not safe yet. New entry soon."}\',\'{"text":"4th Full Moon,\\\\n2600\\\\n\\\\nI have managed to escape alive. That place is exceptionally dangerous, even I could barely manage; but my discoveries are well worth it. Its peak hid luxurious gardens, decadent beyond any city I have ever visited.  "}\',\'{"text":"I would spend an eternity there, if not for its hostile guardians. Within its foliage, I have discovered an otherworldy weapon. It is a large battleaxe, one head brilliant orange and the other vibrant cyan. It seems to vibrate slightly, feeling as if it could tear itself apart at"}\',\'{"text":"any moment. It is not merely decorative, however. When held, I can feel its energies leak into my soul; and at will, I can unleash them, warping space itself and enhancing my abilities. Its power is unreal, and terrifying. I will return at once, with another incredible discovery."}\'],title:"Lost Journal #2"}'),
        Item.of('minecraft:written_book', '{author:"Unknown",pages:[\'{"text":"CLASSIFIED DOCUMENTATION\\\\n\\\\nReading or distributing this text without explicit clearance from class A personnel is punishable by silencing.\\\\n\\\\n "}\',\'{"text":"INTERVIEW RECORDING\\\\nSUBJECT 044\\\\n01/30/5015\\\\n\\\\nInt: Interviewer\\\\nSub: Subject\\\\nNote: Transcriber notes"}\',\'{"text":"Int: How did you learn about [REDACTED]?\\\\n\\\\nSub: Within.\\\\n\\\\nInt: That is impossible. Within does not communicate directly.\\\\n\\\\nNote: Subject remains silent.\\\\n\\\\nInt: How did you contact Within?"}\',\'{"text":"Sub: I accepted its presence.\\\\n\\\\nInt: I know you\\\'re lying.\\\\n\\\\nNote: Subject remains silent.\\\\n\\\\nInt: How did you contact Within?\\\\n\\\\nNote: Subject begins levitating."}\',\'{"text":"Int: Cease immediately!\\\\n\\\\nSub: I AM AB-\\\\n\\\\nNote: Interviewer neutralized subject.\\\\n\\\\nInt: Wake up.\\\\n\\\\nSub: I do not sleep.\\\\n\\\\nInt: Tell me how you contacted it, or I\\\'m sending you back."}\',\'{"text":"Sub: 10/10/5001, Kingdom Park.\\\\n\\\\nNote: Interviewer is visibly disturbed.\\\\n\\\\nInt: We\\\'re done her-\\\\n\\\\nSub: I KNOW [REDACTED]\\\\n\\\\nInterview has been redacted beyond this point."}\'],title:"CLASSIFIED"}'),
        Item.of('minecraft:written_book', '{author:"Unknown",pages:[\'{"text":"Oh, Overworld\\\\n\\\\nLand of secrets aplenty\\\\n\\\\nFor the planes were hurled\\\\n\\\\nFrom the Aether empty"}\',\'{"text":"Looking Within\\\\n\\\\nSomething of a feeling\\\\n\\\\nWhere waters begin\\\\n\\\\nLeaving my mind reeling"}\',\'{"text":"So far Beyond\\\\n\\\\nWorse even than hell\\\\n\\\\nIf I were to respond\\\\n\\\\nYou\\\'d be my cell"}\',\'{"text":"Echoes Before\\\\n\\\\nOf times long past\\\\n\\\\nAnd while they talk of more\\\\n\\\\nIt was already their last"}\',\'{"text":"Flying through After\\\\n\\\\nGreat cities of clouds\\\\n\\\\nAnd never look backward\\\\n\\\\nWhere progress enshrouds"}\',\'{"text":"Oh, Overworld\\\\n\\\\nHow you feel like home\\\\n\\\\nBut without the others\\\\n\\\\nI\\\'d feel so alone"}\'],title:"An Ode"}'),
        Item.of('minecraft:written_book', '{author:"A.I.N.",pages:[\'{"text":"BREAKING NEWS\\\\n\\\\n12/12/9721\\\\n\\\\nAfter Independent News "}\',\'{"text":"AUM APPROVES FUNDING FOR EXTRAPLANAR RESEARCH\\\\n\\\\nThis morning, After United Minds have officially approved 10,000,000,000c for extraplanar research. The reported goal of this project is to secure AUM spacetime and investigate"}\',\'{"text":"meta-planar travel. The decision has recieved both praise and criticism. The Interplanar Peace Coalition has stated that it is \\\\"promoting the needless slaughter of innocent non-After beings\\\\", whereas the Anti-Communication Union has supported the decision."}\'],title:"BREAKING NEWS"}'),
        Item.of('minecraft:written_book', '{author:"Unknown",pages:[\'{"text":"The Illagers are a frequent scourge upon civilian life. They are well-organized, and guard many secrets of the arcane arts. I hope this book will assist in their destruction."}\',\'{"text":"Pillagers\\\\n\\\\nPillagers are the grunts of the Illager army. They are little more than trained crossbowmen, and must frequently travel in large groups to acheive much of anything."}\',\'{"text":"Vindicators\\\\n\\\\nVindicators are axe-wielding maniacs. They are extremely deadly, but lack any sort of ranged training. Use ranged weapons to your advantage against them."}\',\'{"text":"Ravagers\\\\n\\\\nRavagers are a truly terrifying sight on the battlefield. They are giant, malformed beasts whos only goal is violence. It is unknown how these abominations were created."}\',\'{"text":"Evokers\\\\n\\\\nEvokers are among the high-ranking officers of the Illager army for their dark magical powers. They wield evil forces beyond our knowledge. It is said that a cursed knife or dagger is strong enough to tear apart their soul; though"}\',\'{"text":"these are likely simply rumours."}\',\'{"text":"Illusioners\\\\n\\\\nIllusioners are very rarely seen, but it seems likely that they also commune with dark forces. More accounts are required for a detailed description."}\'],title:"The Illagers"}'),
        Item.of('minecraft:written_book', '{author:"Unknown",pages:[\'{"text":"*This book is blank, but upon opening it you begin hearing a conversation coming from the pages.*\\\\n\\\\nVoice 1: *Unintelligible yelling*\\\\n\\\\nVoice 2: Target locked. Firing in 3... 2... 1...\\\\n\\\\n*A loud explosion-like sound can be heard.*"}\',\'{"text":"Voice 2: Missed.\\\\n\\\\nVoice 3: Core power below fifty percent. Sustaining major damage at torso and hands. \\\\n\\\\nVoice 1: There\\\'s more! I repeat, more enemy aircraft have just warped in!\\\\n\\\\n*Sounds of commotion.*"}\',\'{"text":"Voice 2: Firing again.\\\\n\\\\n*Another explosion.*\\\\n\\\\nVoice 2: Direct hit. Recharging hand cannon.\\\\n\\\\n*You hear a very loud noise followed by blaring alarms.*\\\\n\\\\nVoice 3: Major hull damage. The Core is"}\',\'{"text":"suggesting retreat.\\\\n\\\\nVoice 4: Retreating to nearest intersection.\\\\n\\\\n*You hear an otherworldy noise. It is then suddenly much quieter.*\\\\n\\\\nVoice 1: I can\\\'t believe this. Our history, our greatness... "}\',\'{"text":"Voice 4: I wish we could go back to the way things were.\\\\n\\\\n*Muffled sounds of agreement.*\\\\n\\\\nVoice 2: So where did we end up?\\\\n\\\\nVoice 4: It looks like, uh... hold on.\\\\n\\\\nVoice 4: Looks like the"}\',\'{"text":"Overworld, uh, somewhere they call Zamir Forest.\\\\n\\\\nVoice 3: Hold on, something weird is going on...\\\\n\\\\n*You hear another otherworldy noise, followed by chaos.*\\\\n\\\\nVoice 1: What the hell just happened??"}\',\'{"text":"Voice 3: Oh no. Oh no no no no-\\\\n\\\\nVoice 4: We got transported underground somehow.\\\\n\\\\nVoice 3: The Core, it\\\'s...\\\\n\\\\nVoice 2: Dead?\\\\n\\\\nVoice 3: Well, it might as well be."}\',\'{"text":"*A deathly silence.*\\\\n\\\\nVoice 1: How far underground?\\\\n\\\\nVoice 4: We\\\'re completely submerged.\\\\n\\\\n*Another silence.*\\\\n\\\\nVoice 1: Well then, we better get going. \\\\n\\\\nVoice 3: What? You"}\',\'{"text":"mean the emergency escape portals?\\\\n\\\\nVoice 1: What other choice do we have?\\\\n\\\\n*More silence.*\\\\n\\\\nVoice 2: Well, if this is it... thanks for everything.\\\\n\\\\n*The sound stops. The book closes itself.*"}\'],title:"Final Moments"}'),
    ]

    event.addGeneric('custom:lore_book', loot => {
        loot.addPool(pool => {
            for (let book of LORE_BOOKS) {
                pool.addItem(book, 1, 1)
            }
        })
    })

    event.addGeneric('custom:parkour_guide', loot => {
        let guides = ['vault', 'breakfall', 'catleap', 'cling', 'crawl', 'dodge', 'flip', 'wallrun', 'wall_jump', 'quick_turn']
        loot.addPool(pool => {
            for (let guide of guides) {
                pool.addItem(`kubejs:parkour_guide_${guide}`, 1, 1)
            }
        })
    })

    event.addGeneric('custom:overworld_valuable', loot => {
        loot.addPool(pool => {
            for (let item of OVERWORLD_VALUABLE) {
                pool.addItem(item[0], item[1], 1)
            }
            for (let potion of VALUABLE_CHARMS) {
                pool.addItem(Item.of('apotheosis:potion_charm', `{Potion:"${potion[0]}",Unbreakable:${potion[1] ? '1b' : '0b'}}`), potion[2], 1)
            }
            
        })
        loot.addPool(pool => {
            pool.randomChance(0.05)
            pool.addLootTable('custom:lore_book')
        })
    })
    event.addGeneric('custom:overworld_treasure', loot => {
        loot.addPool(pool => {
            for (let item of OVERWORLD_TREASURE) {
                pool.addItem(item[0], item[1], 1)
            }
            for (let potion of TREASURE_CHARMS) {
                pool.addItem(Item.of('apotheosis:potion_charm', `{Potion:"${potion[0]}",Unbreakable:${potion[1] ? '1b' : '0b'}}`), potion[2], 1)
            }
            pool.addLootTable('custom:random_scroll').weight(3)
        })
        loot.addPool(pool => {
            pool.randomChance(0.1)
            pool.addLootTable('custom:parkour_guide')
        })
        loot.addPool(pool => {
            pool.randomChance(0.075)
            pool.addLootTable('custom:lore_book').weight(2)
            pool.addLootTable('custom:secret_book').weight(1)
        })
        loot.addPool(pool => {
            pool.randomChance(0.17)
            pool.addLootTable('custom:structure_map')
        })
    })
    event.addGeneric('custom:runic_weapons', loot => {
        loot.addPool(pool => {
            for (let item of RUNIC_WEAPONS) {
                pool.addItem(item[0], item[1], 1)
            }
        })
    })
    event.addGeneric('custom:overworld_artifacts', loot => {
        loot.addPool(pool => {
            for (let item of OVERWORLD_ARTIFACTS) {
                pool.addItem(item[0], item[1], 1)
            }
            for (let potion of ARTIFACT_CHARMS) {
                pool.addItem(Item.of('apotheosis:potion_charm', `{Potion:"${potion[0]}",Unbreakable:${potion[1] ? '1b' : '0b'}}`), potion[2], 1)
            }
            pool.addLootTable('custom:random_scroll').weight(1)
            pool.addLootTable('custom:secret_book').weight(1)
        })
        loot.addPool(pool => {
            pool.randomChance(0.2)
            pool.addLootTable('custom:parkour_guide')
        })
    })
    event.addGeneric('custom:nether_valuable', loot => {
        loot.addPool(pool => {
            for (let item of NETHER_VALUABLE) {
                pool.addItem(item[0], item[1], 1)
            }
        })
    })
    event.addGeneric('custom:nether_treasure', loot => {
        loot.addPool(pool => {
            for (let item of NETHER_TREASURE) {
                pool.addItem(item[0], item[1], 1)
            }
        })
    })
    event.addGeneric('custom:nether_artifacts', loot => {
        loot.addPool(pool => {
            for (let item of NETHER_ARTIFACTS) {
                pool.addItem(item[0], item[1], 1)
            }
        })
    })


    event.addGeneric('custom:loot_plentiful', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.05)
        })
    })
    event.addGeneric('custom:loot_common', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.1)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.02)
        })
        loot.addPool(pool => {
            pool.randomChance(0.1)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 5,
                quality: 0,
                rarity: 'common'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'uncommon'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.05)
        })
    })
    event.addGeneric('custom:loot_uncommon', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.15)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.05)
        })
        loot.addPool(pool => {
            pool.randomChance(0.2)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 0,
                rarity: 'common'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'uncommon'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.15)
        })
    })
    event.addGeneric('custom:loot_rare', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.25)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.075)
        })
        loot.addPool(pool => {
            pool.randomChance(0.5)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 10,
                quality: 0,
                rarity: 'uncommon'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 5,
                quality: 1,
                rarity: 'rare'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.4)
        })
    })
    event.addGeneric('custom:loot_epic', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.35)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.1)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_artifacts').randomChance(0.1)
        })
        loot.addPool(pool => {
            pool.randomChance(0.75)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 9,
                quality: 0,
                rarity: 'rare'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'epic'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.7)
        })
    })
    event.addGeneric('custom:loot_legendary', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.5)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.25)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_artifacts').randomChance(0.2)
        })
        loot.addPool(pool => {
            pool.randomChance(0.85)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 15,
                quality: 0,
                rarity: 'rare'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 4,
                quality: 2,
                rarity: 'epic'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'mythic'
            })
        })
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_gem',
                weight: 1,
                quality: 0
            }).randomChance(0.85)
        })
        loot.addPool(pool => {
            pool.randomChance(0.01)
            pool.addItem('kubejs:ancent_core')
        })
    })
    event.addGeneric('custom:loot_godly', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_valuable').randomChance(0.75)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_treasure').randomChance(0.5)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:overworld_artifacts').randomChance(0.35)
        })
        loot.addPool(pool => {
            pool.randomChance(0.025)
            pool.addItem('kubejs:ancent_core')
        })
        loot.addPool(pool => {
            pool.randomChance(1.0)
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 8,
                quality: 0,
                rarity: 'rare'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 4,
                quality: 2,
                rarity: 'epic'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 1,
                rarity: 'mythic'
            })
        })
        loot.addPool(pool => {
           pool.addEntry({
               type: 'apotheosis:random_gem',
               weight: 1,
               quality: 0
           }).randomChance(0.95)
        })
    })

    event.addGeneric('custom:nether_loot_common', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:loot_uncommon')
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_valuable').randomChance(0.1)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_treasure').randomChance(0.05)
        })
    })
    event.addGeneric('custom:nether_loot_uncommon', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:loot_rare')
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_valuable').randomChance(0.15)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_treasure').randomChance(0.1)
        })
    })
    event.addGeneric('custom:nether_loot_rare', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:loot_epic')
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_valuable').randomChance(0.2)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_treasure').randomChance(0.15)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_artifacts').randomChance(0.02)
        })
    })
    event.addGeneric('custom:nether_loot_epic', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:loot_legendary')
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_valuable').randomChance(0.25)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_treasure').randomChance(0.2)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_artifacts').randomChance(0.05)
        })
    })
    event.addGeneric('custom:nether_loot_legendary', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:loot_godly')
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_valuable').randomChance(0.33)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_treasure').randomChance(0.25)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_artifacts').randomChance(0.1)
        })
    })
    event.addGeneric('custom:nether_loot_godly', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:loot_godly')
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_valuable').randomChance(0.5)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_treasure').randomChance(0.35)
        })
        loot.addPool(pool => {
            pool.addLootTable('custom:nether_artifacts').randomChance(0.25)
        })
    })

    event.addGeneric('custom:affix_item', loot => {
        loot.addPool(pool => {
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 13,
                quality: 0,
                rarity: 'rare'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 9,
                quality: 0,
                rarity: 'epic'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 3,
                quality: 0,
                rarity: 'mythic'
            })
            pool.addEntry({
                type: 'apotheosis:random_affix_item',
                weight: 1,
                quality: 0,
                rarity: 'ancient'
            })
        })
    })
    event.addGeneric('custom:artifact_lesser', loot => {
        loot.addPool(pool => {
            pool.addItem('artifacts:plastic_drinking_hat').weight(5)
            pool.addItem('artifacts:novelty_drinking_hat').weight(1)
            pool.addItem('artifacts:night_vision_goggles').weight(4)
            pool.addItem('artifacts:superstitious_hat').weight(2)
            pool.addItem('artifacts:scarf_of_invisibility').weight(1)
            pool.addItem('artifacts:cross_necklace').weight(1)
            pool.addItem('artifacts:panic_necklace').weight(3)
            pool.addItem('artifacts:shock_pendant').weight(1)
            pool.addItem('artifacts:flame_pendant').weight(2)
            pool.addItem('artifacts:thorn_pendant').weight(1)
            pool.addItem('artifacts:charm_of_sinking').weight(4)
            pool.addItem('artifacts:obsidian_skull').weight(3)
            pool.addItem('artifacts:antidote_vessel').weight(1)
            pool.addItem('artifacts:universal_attractor').weight(5)
            pool.addItem('artifacts:digging_claws').weight(4)
            pool.addItem('artifacts:feral_claws').weight(1)
            pool.addItem('artifacts:power_glove').weight(2)
            pool.addItem('artifacts:fire_gauntlet').weight(2)
            pool.addItem('artifacts:pocket_piston').weight(6)
            pool.addItem('artifacts:golden_hook').weight(2)
            pool.addItem('artifacts:kitty_slippers').weight(1)
            pool.addItem('artifacts:running_shoes').weight(2)
            pool.addItem('artifacts:flippers').weight(3)
            pool.addItem('artifacts:whoopee_cushion').weight(1)
            pool.addItem('relics:reflection_necklace').weight(3)
            pool.addItem('relics:drowned_belt').weight(2)
            pool.addItem('relics:hunter_belt').weight(3)
            pool.addItem('relics:ice_skates').weight(3)
            pool.addItem('relics:bastion_ring').weight(5)
            pool.addItem('relics:ice_breaker').weight(2)
            pool.addItem('relics:blazing_flask').weight(2)
            pool.addItem('relics:leather_belt').weight(10)
            pool.addItem('relics:horse_flute').weight(8)
            pool.addItem('relics:wool_mitten').weight(3)
            pool.addItem('relics:amphibian_boot').weight(1)
            pool.addItem('enigmaticlegacy:xp_scroll').weight(3)
            pool.addItem('enigmaticlegacy:ender_ring').weight(4)
            pool.addItem('enigmaticlegacy:magnet_ring').weight(6)
            pool.addItem('enigmaticlegacy:void_stone').weight(3)
        })
    })
    event.addGeneric('custom:artifact_greater', loot => {
        loot.addPool(pool => {
            pool.addItem('artifacts:snorkel').weight(5)
            pool.addItem('artifacts:lucky_scarf').weight(4)
            pool.addItem('artifacts:cloud_in_a_bottle').weight(2)
            pool.addItem('artifacts:crystal_heart').weight(6)
            pool.addItem('artifacts:helium_flamingo').weight(1)
            pool.addItem('artifacts:vampiric_glove').weight(3)
            pool.addItem('artifacts:aqua_dashers').weight(1)
            pool.addItem('artifacts:bunny_hoppers').weight(4)
            pool.addItem('artifacts:steadfast_spikes').weight(4)
            pool.addItem('relics:spatial_sign').weight(3)
            pool.addItem('relics:magma_walker').weight(2)
            pool.addItem('relics:aqua_walker').weight(4)
            pool.addItem('relics:midnight_robe').weight(3)
            pool.addItem('relics:jellyfish_necklace').weight(5)
            pool.addItem('relics:rage_glove').weight(3)
            pool.addItem('relics:holy_locket').weight(6)
            pool.addItem('relics:magic_mirror').weight(1)
            pool.addItem('relics:spore_sack').weight(5)
            pool.addItem('relics:roller_skates').weight(4)
            pool.addItem('relics:shadow_glaive').weight(2)
        })
    })
    event.addJson('custom:enchanted_book_level_10', {
        pools: [
            {
                rolls: 1,
                entries: [
                    {
                        type: 'item',
                        name: 'minecraft:book',
                        weight: 1,
                        functions: [
                            {
                                function: 'enchant_with_levels',
                                treasure: false,
                                levels: {
                                    type: 'uniform',
                                    min: 8,
                                    max: 12
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    })
}

function addToLootTable(event, lootTable, tableToAdd, chance, count) {
    event.modify(lootTable, loot => {
        loot.addPool(pool => {
            pool.addLootTable(tableToAdd).count(count).randomChance(chance)
        })
    })
}

function addItemToLootTable(event, lootTable, item, chance, count) {
    event.modify(lootTable, loot => {
        loot.addPool(pool => {
            pool.addItem(item, 1, count).randomChance(chance)
        })
    })
}

function dungeonsAriseLootTables(event) {

    function dungeonsAriseLoot(event, chest, lootTable) {
        event.modify(`dungeons_arise:chests/${chest}`, loot => {
            loot.addPool(pool => {
                pool.addLootTable(lootTable)
            })
        })
    }

    dungeonsAriseLoot(event, 'abandoned_temple/abandoned_temple_top', EPIC)
    dungeonsAriseLoot(event, 'abandoned_temple/abandoned_temple_entrance', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_treasure', LEGENDARY)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_normal', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_rooms', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_supply', PLENTIFUL)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_barrels', COMMON)
    dungeonsAriseLoot(event, 'bandit_towers/bandit_towers_gardens', UNCOMMON)
    dungeonsAriseLoot(event, 'ceryneian_hind/ceryneian_hind_treasure', EPIC)
    dungeonsAriseLoot(event, 'foundry/foundry_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/foundry/foundry_treasure', 'simplyswords:molten_edge', 0.65, 1)
    dungeonsAriseLoot(event, 'foundry/foundry_normal', UNCOMMON)
    addItemToLootTable(event, 'dungeons_arise:chests/foundry/foundry_normal', 'simplyswords:molten_edge', 0.05, 1)
    dungeonsAriseLoot(event, 'foundry/foundry_passage_normal', UNCOMMON)
    addItemToLootTable(event, 'dungeons_arise:chests/foundry/foundry_passage_normal', 'simplyswords:molten_edge', 0.1, 1)
    dungeonsAriseLoot(event, 'foundry/foundry_lava_pit', RARE)
    dungeonsAriseLoot(event, 'giant_mushroom/red_giant_mushroom', UNCOMMON)
    dungeonsAriseLoot(event, 'giant_mushroom/twin_giant_mushroom', UNCOMMON)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_supply', COMMON)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_normal', COMMON)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_theater', RARE)
    dungeonsAriseLoot(event, 'heavenly_challenger/heavenly_challenger_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/heavenly_challenger/heavenly_challenger_treasure', 'enigmaticlegacy:angel_blessing', 0.65, 1)
    dungeonsAriseLoot(event, 'heavenly_conqueror/heavenly_conqueror_normal', COMMON)
    dungeonsAriseLoot(event, 'heavenly_conqueror/heavenly_conqueror_barrels', COMMON)
    dungeonsAriseLoot(event, 'heavenly_conqueror/heavenly_conqueror_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_treasure', 'enigmaticlegacy:angel_blessing', 0.65, 1)
    dungeonsAriseLoot(event, 'heavenly_rider/heavenly_rider_normal', COMMON)
    dungeonsAriseLoot(event, 'heavenly_rider/heavenly_rider_barrels', COMMON)
    dungeonsAriseLoot(event, 'heavenly_rider/heavenly_rider_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/heavenly_conqueror/heavenly_conqueror_treasure', 'enigmaticlegacy:angel_blessing', 0.5, 1)
    dungeonsAriseLoot(event, 'illager_corsair/illager_corsair_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/illager_corsair/illager_corsair_treasure', 'kubejs:soul_of_a_pirate', 0.5, 1)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_barrels', PLENTIFUL)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_normal', COMMON)
    dungeonsAriseLoot(event, 'illager_fort/illager_fort_treasure', EPIC)
    dungeonsAriseLoot(event, 'illager_galley/illager_galley_treasure', RARE)
    addItemToLootTable(event, 'dungeons_arise:chests/illager_galley/illager_galley_treasure', 'kubejs:soul_of_a_pirate', 0.5, 1)
    dungeonsAriseLoot(event, 'illager_windmill/illager_windmill_barrels', COMMON)
    dungeonsAriseLoot(event, 'illager_windmill/illager_windmill_treasure', EPIC)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_top_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/infested_temple/infested_temple_top_treasure', 'simplyswords:bramblethorn', 0.17, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/infested_temple/infested_temple_top_treasure', 'kubejs:effervescent_snowflake', 0.2, 1)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_bookshelf', UNCOMMON)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_forge', RARE)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_garden', COMMON)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_normal', COMMON)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_supply', PLENTIFUL)
    dungeonsAriseLoot(event, 'infested_temple/infested_temple_room_table', UNCOMMON)
    dungeonsAriseLoot(event, 'jungle_tree_house/jungle_tree_house_treasure', RARE)
    dungeonsAriseLoot(event, 'lighthouse/lighthouse_top', RARE)
    dungeonsAriseLoot(event, 'mining_system/mining_system_barrels', COMMON)
    dungeonsAriseLoot(event, 'mining_system/mining_system_treasure', RARE)
    addItemToLootTable(event, 'dungeons_arise:chests/mining_system/mining_system_treasure', 'enigmaticlegacy:golem_heart', 0.5, 1)
    dungeonsAriseLoot(event, 'mushroom_mines/mushroom_mines_tools', UNCOMMON)
    dungeonsAriseLoot(event, 'mushroom_mines/mushroom_mines_treasure', EPIC)
    dungeonsAriseLoot(event, 'mushroom_village/mushroom_village_barrels', UNCOMMON)
    dungeonsAriseLoot(event, 'mushroom_village/mushroom_village_treasure', RARE)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/plague_asylum/plague_asylum_treasure', 'enigmaticlegacy:golem_heart', 0.5, 1)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_barrels', COMMON)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_cells', UNCOMMON)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_normal', COMMON)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_potions', RARE)
    dungeonsAriseLoot(event, 'plague_asylum/plague_asylum_storage', PLENTIFUL)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/scorched_mines/scorched_mines_treasure', 'enigmaticlegacy:golem_heart', 0.5, 1)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_barrels', COMMON)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_housing', COMMON)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_normal', COMMON)
    dungeonsAriseLoot(event, 'scorched_mines/scorched_mines_hub', UNCOMMON)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_normal', COMMON)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_treasure', EPIC)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_library_normal', UNCOMMON)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_normal', 'custom:secret_book', 0.03, 1)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_normal', 'custom:lore_book', 0.1, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_library_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure', 'simplyswords:soulpyre', 0.25, 1)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure', 'custom:secret_book', 0.1, 1)
    addToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_library_treasure', 'custom:lore_book', 0.1, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_garden_normal', RARE)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_normal', 'enigmaticlegacy:animal_guidebook', 0.2, 1)
    dungeonsAriseLoot(event, 'keep_kayra/keep_kayra_garden_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure', 'simplyswords:soulpyre', 0.5, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/keep_kayra/keep_kayra_garden_treasure', 'enigmaticlegacy:animal_guidebook', 0.5, 1)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_normal', COMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_rooms', UNCOMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_library', RARE)
    addToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_library', 'custom:secret_book', 0.1, 1)
    addToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_library', 'custom:lore_book', 0.1, 1)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_gardens', UNCOMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_towers', UNCOMMON)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_treasure', LEGENDARY)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_treasure', 'simplyswords:thunderbrand', 0.4, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_treasure', 'enigmaticlegacy:hunter_guidebook', 0.4, 1)
    dungeonsAriseLoot(event, 'shiraz_palace/shiraz_palace_elite', GODLY)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_elite', 'simplyswords:thunderbrand', 0.5, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/shiraz_palace/shiraz_palace_elite', 'enigmaticlegacy:hunter_guidebook', 0.5, 1)
    dungeonsAriseLoot(event, 'small_blimp/small_blimp_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/small_blimp/small_blimp_treasure', 'enigmaticlegacy:angel_blessing', 0.33, 1)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_barrels', COMMON)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_rooms', COMMON)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_top_rooms', RARE)
    dungeonsAriseLoot(event, 'thornborn_towers/thornborn_towers_top_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/thornborn_towers/thornborn_towers_top_treasure', 'enigmaticlegacy:hunter_guidebook', 0.25, 1)
    addItemToLootTable(event, 'dungeons_arise:chests/thornborn_towers/thornborn_towers_top_treasure', 'enigmaticlegacy:animal_guidebook', 0.25, 1)
    dungeonsAriseLoot(event, 'typhon/typhon_treasure', EPIC)
    dungeonsAriseLoot(event, 'undead_pirate_ship/undead_pirate_ship_treasure', EPIC)
    addItemToLootTable(event, 'dungeons_arise:chests/undead_pirate_ship/undead_pirate_ship_treasure', 'kubejs:soul_of_a_pirate', 0.5, 1)
}

function dimDungeonsLootTables(event) {
    addToLootTable(event, 'dimdungeons:chests/chestloot_1', UNCOMMON, 1, 1)
    addToLootTable(event, 'dimdungeons:chests/chestloot_2', RARE, 1, 1)
    addToLootTable(event, 'dimdungeons:chests/chestloot_3', EPIC, 1, 1)
    addToLootTable(event, 'dimdungeons:chests/chestloot_4', LEGENDARY, 1, 1)
}

function hexcastingLootTables(event) {
    event.modify('hexcasting:grant_patchi_book', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/scroll_loot_few', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/scroll_loot_some', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/scroll_loot_many', loot => {
        loot.clearPools()
    })
    event.modify('hexcasting:inject/amethyst_cluster', loot => {
        loot.clearPools()
    })
}

function yungsLootTables(event) {
    addToLootTable(event, 'betterdeserttemples:chests/food_storage', COMMON, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/lab', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/library', UNCOMMON, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'betterdeserttemples:chests/library', 'custom:lore_book', 0.1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/pharaoh_hidden', LEGENDARY, 1, 1)
    addItemToLootTable(event, 'betterdeserttemples:chests/pharaoh_hidden', 'kubejs:pharaohs_ankh', 0.67, 1)
    addItemToLootTable(event, 'betterdeserttemples:chests/pharaoh_hidden', 'simplyswords:shadowsting', 0.5, 1)
    addToLootTable(event, 'betterdeserttemples:chests/statue', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/storage', PLENTIFUL, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/tomb', RARE, 1, 1)
    addToLootTable(event, 'betterdeserttemples:chests/tomb_pharaoh', EPIC, 1, 1)
    addItemToLootTable(event, 'betterdeserttemples:chests/tomb_pharaoh', 'kubejs:pharaohs_ankh', 0.25, 1)
    addItemToLootTable(event, 'betterdeserttemples:chests/tomb_pharaoh', 'simplyswords:shadowsting', 0.33, 1)
    addToLootTable(event, 'betterfortresses:chests/hall', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'betterfortresses:chests/keep', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'betterfortresses:chests/puzzle', NETHER_EPIC, 1, 1)
    addItemToLootTable(event, 'betterfortresses:chests/puzzle', 'enigmaticlegacy:blazing_core', 0.75, 1)
    addToLootTable(event, 'betterfortresses:chests/quarters', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'betterfortresses:chests/storage', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'betterfortresses:chests/worship', NETHER_RARE, 1, 1)
    addToLootTable(event, 'betterstrongholds:chests/armory', UNCOMMON, 1, 1)
    addToLootTable(event, 'betterstrongholds:chests/common', COMMON, 1, 1)
    addToLootTable(event, 'betterstrongholds:chests/crypt', UNCOMMON, 1, 1)
    addToLootTable(event, 'betterstrongholds:chests/grand_library', UNCOMMON, 1, 1)
    addToLootTable(event, 'betterstrongholds:chests/grand_library', 'custom:secret_book', 0.1, 1)
    addToLootTable(event, 'betterstrongholds:chests/grand_library', 'custom:lore_book', 0.15, 1)
    addToLootTable(event, 'betterstrongholds:chests/library_md', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'betterstrongholds:chests/library_md', 'custom:lore_book', 0.1, 1)
    addToLootTable(event, 'betterstrongholds:chests/trap', EPIC, 1, 1)
    addToLootTable(event, 'betterstrongholds:chests/treasure', RARE, 1, 1)
}

function dugeonsPlusLootTables(event) {
    addToLootTable(event, 'dungeons_plus:chests/leviathan/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/leviathan/rare', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/snowy_temple/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/snowy_temple/rare', EPIC, 1, 1)
    addItemToLootTable(event, 'dungeons_plus:chests/snowy_temple/rare', 'kubejs:effervescent_snowflake', 0.45, 1)
    addToLootTable(event, 'dungeons_plus:chests/soul_prison/common', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/soul_prison/golden_armor', RARE, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/soul_prison/rare', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/barrel', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/vex', RARE, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/tower/vex_map', RARE, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/warped_garden/common', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_plus:chests/warped_garden/rare', EPIC, 1, 1)
}

function apotheosisLootTables(event) {
    addToLootTable(event, 'apotheosis:chests/chest_valuable', RARE, 1, 1)
    addToLootTable(event, 'apotheosis:chests/spawner_brutal', RARE, 1, 1)
    addToLootTable(event, 'apotheosis:chests/spawner_brutal_rotate', RARE, 1, 1)
    addToLootTable(event, 'apotheosis:chests/spawner_swarm', RARE, 1, 1)
}

function lostCastleLootTables(event) {
    addToLootTable(event, 'tlc:chests/biblio', UNCOMMON, 1, 1)
    addToLootTable(event, 'tlc:chests/dungeon', RARE, 1, 1)
    addToLootTable(event, 'tlc:chests/hided', EPIC, 1, 1)
    addToLootTable(event, 'tlc:chests/house', COMMON, 1, 1)
    addToLootTable(event, 'tlc:chests/throne', EPIC, 1, 1)
    addToLootTable(event, 'tlc:chests/treasure', LEGENDARY, 1, 1)
}

function bygLootTables(event) {
    event.modify('byg:advancement/biomepedia_gift', loot => {
        loot.clearPools()
    })
}

function geolosysLootTables(event) {
    const SAMPLE_MAP = [
        ['hematite', 'minecraft:iron_nugget'],
        ['limonite', 'minecraft:iron_nugget'],
        ['iron', 'minecraft:iron_nugget'],
        ['gold', 'minecraft:gold_nugget'],
        ['redstone', 'minecraft:redstone'],
        ['copper', 'create:copper_nugget'],
        ['malachite', 'create:copper_nugget'],
        ['azurite', 'create:copper_nugget'],
        ['zinc', 'create:zinc_nugget'],
        ['sphalerite', 'create:zinc_nugget'],
        ['bauxite', 'immersiveengineering:nugget_aluminum'],
        ['uranium', 'immersiveengineering:nugget_uranium'],
        ['nickel', 'immersiveengineering:nugget_nickel'],
        ['galena', 'immersiveengineering:nugget_lead'],
    ]
    
    const COALS = [
        ['coal', 'minecraft:coal'],
        ['lignite', 'kubejs:lignite_coal'],
        ['bituminous_coal', 'kubejs:bituminous_coal'],
    ]

    function sampleNuggetLoot(event, sample, nugget) {
        event.addBlock(`kubejs:${sample}_sample`, block => {
            block.addPool(pool => {
                pool.addItem(nugget, 1, {n: 3, p: 0.5})
            })
        })
    }
    
    function replaceOreDrop(event, ore, drop) {
        event.modifyBlock(ore, block => {
            block.clearPools()
            block.addPool(pool => {
                pool.addEntry({
                    type: "item",
                    weight: 1,
                    quality: 0,
                    name: drop,
                    functions: [
                        {
                            function: "apply_bonus",
                            enchantment: "minecraft:fortune",
                            formula: "ore_drops"
                        }
                    ]
                })
            })
        })
    }

    replaceOreDrop(event, 'geolosys:limonite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:deepslate_limonite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:hematite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:deepslate_hematite_ore', 'minecraft:raw_iron')
    replaceOreDrop(event, 'geolosys:sphalerite_ore', 'create:raw_zinc')
    replaceOreDrop(event, 'geolosys:deepslate_sphalerite_ore', 'create:raw_zinc')
    replaceOreDrop(event, 'geolosys:malachite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:deepslate_malachite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:azurite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:deepslate_azurite_ore', 'minecraft:raw_copper')
    replaceOreDrop(event, 'geolosys:gold_ore', 'minecraft:raw_gold')
    replaceOreDrop(event, 'geolosys:deepslate_gold_ore', 'minecraft:raw_gold')
    replaceOreDrop(event, 'geolosys:bauxite_ore', 'immersiveengineering:raw_aluminum')
    replaceOreDrop(event, 'geolosys:deepslate_bauxite_ore', 'immersiveengineering:raw_aluminum')
    replaceOreDrop(event, 'geolosys:lignite_ore', 'kubejs:lignite_coal')
    replaceOreDrop(event, 'geolosys:deepslate_lignite_ore', 'kubejs:lignite_coal')
    replaceOreDrop(event, 'geolosys:bituminous_coal_ore', 'kubejs:bituminous_coal')
    replaceOreDrop(event, 'geolosys:deepslate_bituminous_coal_ore', 'kubejs:bituminous_coal')
    replaceOreDrop(event, 'geolosys:nether_gold_ore', 'minecraft:raw_gold')
    replaceOreDrop(event, 'geolosys:ancient_debris_ore', 'minecraft:ancient_debris')

    for (let i of SAMPLE_MAP) {
        sampleNuggetLoot(event, i[0], i[1])
    }
    for (let i of COALS) {
        event.addBlock(`kubejs:${i[0]}_sample`, block => {
            block.addPool(pool => {
                pool.addItem(i[1], 1, {n: 1, p: 0.5})
            })  
        })
    }
}

function vanillaEntityLootTables(event) {
    event.modify('minecraft:elder_guardian', loot => {
        loot.clearPools()
        loot.addPool(pool => {
            pool.addEntry({
                type: 'item',
                weight: 1,
                name: 'treasurebags:treasure_bag',
                functions: [
                    {
                        function: 'treasurebags:set_bag_type',
                        type: 'custom:elder_guardian'
                    }
                ]
            })
        })
    })
    event.modify('artifacts:mimic', loot => {
        loot.clearPools()
        loot.addPool(pool => {
            pool.addEntry({
                type: 'loot_table',
                weight: 1,
                name: 'custom:loot_epic'
            })
        })
    })
}

function idasLootTables(event) {
    function idas(e, table, loot) {
        addToLootTable(e, `idas:chests/${table}`, loot, 1, 1)
    }
    idas(event, 'abandonedhouse/abandonedhouse', COMMON)
    idas(event, 'abandonedhouse/abandonedhouse_create', COMMON)
    idas(event, 'abandonedhouse/abandonedhouse_library', UNCOMMON)
    addToLootTable(event, 'idas:chests/abandonedhouse/abandonedhouse_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/abandonedhouse/abandonedhouse_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'ancient_mines/minesbasic', COMMON)
    idas(event, 'ancient_mines/minescreate', UNCOMMON)
    idas(event, 'ancient_mines/mineshall', EPIC)
    addItemToLootTable(event, 'idas:chests/ancient_mines/mineshall', 'enigmaticlegacy:golem_heart', 0.5, 1)
    idas(event, 'ancient_portal/ancient_portal_nether', RARE)
    idas(event, 'ancient_portal/ancient_portal_overworld', RARE)
    idas(event, 'ancient_statue/ancient_statue_jungle', UNCOMMON)
    idas(event, 'ancient_statue/ancient_statue_treasure_jungle', RARE)
    idas(event, 'ancient_statue/ancient_statue_treasure_desert', RARE)
    idas(event, 'ancient_statue/ancient_statue_treasure_plains', RARE)
    idas(event, 'apothecary_abode/apothecary_abode', UNCOMMON)
    idas(event, 'apothecary_abode/apothecary_abode_books', UNCOMMON)
    idas(event, 'bazaar/bazaar', COMMON)
    idas(event, 'bazaar/bazaar_food', PLENTIFUL)
    idas(event, 'bazaar/bazaar_tools', COMMON)
    idas(event, 'bearclaw_inn/bearclaw_inn_food', PLENTIFUL)
    idas(event, 'bearclaw_inn/bearclaw_inn_bedroom', COMMON)
    idas(event, 'beekeepers_house/beekeepers_food', PLENTIFUL)
    idas(event, 'beekeepers_house/beekeepers_bedroom', COMMON)
    idas(event, 'beekeepers_house/beekeepers_tools', UNCOMMON)
    idas(event, 'castle/castle', COMMON)
    idas(event, 'castle/castle_library', UNCOMMON)
    idas(event, 'castle/castle_throne', EPIC)
    idas(event, 'cottage/cottage', COMMON)
    idas(event, 'enchantingtower/enchantingtower_basic', COMMON)
    idas(event, 'enchantingtower/enchantingtower_library', UNCOMMON)
    idas(event, 'enchantingtower/enchantingtower_top', RARE)
    idas(event, 'haunted_manor/haunted_manor', COMMON)
    idas(event, 'haunted_manor/haunted_manor_tools', UNCOMMON)
    idas(event, 'haunted_manor/haunted_manor_library', UNCOMMON)
    addToLootTable(event, 'idas:chests/haunted_manor/haunted_manor_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/haunted_manor/haunted_manor_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'haunted_manor/haunted_manor_treasure', EPIC)
    idas(event, 'hauntedhouse/hauntedhouse', RARE)
    idas(event, 'labyrinth/labyrinth', UNCOMMON)
    idas(event, 'labyrinth/labyrinth_croc', RARE)
    idas(event, 'labyrinth/labyrinth_library', UNCOMMON)
    addToLootTable(event, 'idas:chests/labyrinth/labyrinth_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/labyrinth/labyrinth_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'labyrinth/labyrinth_tomb', EPIC)
    idas(event, 'labyrinth/labyrinth_treasure', LEGENDARY)
    addItemToLootTable(event, 'idas:chests/labyrinth/labyrinth_treasure', 'kubejs:pharaohs_ankh', 1, 1)
    idas(event, 'necromancers_spire/necromancers_spire', RARE)
    idas(event, 'pillager_fortress/pillager_basic', UNCOMMON)
    idas(event, 'pillager_fortress/pillager_bedroom', UNCOMMON)
    idas(event, 'pillager_fortress/pillager_jail', RARE)
    idas(event, 'pillager_fortress/pillager_library', RARE)
    addToLootTable(event, 'idas:chests/pillager_fortress/pillager_library', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'idas:chests/pillager_fortress/pillager_library', 'custom:lore_book', 0.1, 1)
    idas(event, 'sunken_ship/sunken_ship_supply', UNCOMMON)
    idas(event, 'sunken_ship/sunken_ship_treasure', RARE)
    addItemToLootTable(event, 'idas:chests/sunken_ship/sunken_ship_treasure', 'kubejs:soul_of_a_pirate', 0.2, 1)
    idas(event, 'tinkers_workshop/tinkers_workshop', COMMON)
    idas(event, 'tinkers_workshop/tinkers_workshop_basic', PLENTIFUL)
    idas(event, 'tinkers_workshop/tinkers_workshop_bedroom', UNCOMMON)
    idas(event, 'tinkers_workshop/tinkers_workshop_tools', RARE)
    idas(event, 'tinkers_workshop/tinkers_workshop_vault', LEGENDARY)
    idas(event, 'witches_treestump/witches_treestump', RARE)
    idas(event, 'wizardtower/wizardtower_basic', COMMON)
    idas(event, 'wizardtower/wizardtower_library', UNCOMMON)
    idas(event, 'wizardtower/wizardtower_top', RARE)
}

function minecraftLootTables(event) {
    addToLootTable(event, 'minecraft:chests/ancient_city', RARE, 0.5, 1)
    addToLootTable(event, 'minecraft:chests/ancient_city', EPIC, 0.2, 1)
    addToLootTable(event, 'minecraft:chests/ancient_city', LEGENDARY, 0.05, 1)
    addToLootTable(event, 'minecraft:chests/stronghold_library', 'custom:secret_book', 0.02, 1)
    addToLootTable(event, 'minecraft:chests/stronghold_library', 'custom:lore_book', 0.07, 1)
    addToLootTable(event, 'minecraft:chests/bastion_treasure', NETHER_EPIC, 1, 1)
    addToLootTable(event, 'minecraft:chests/bastion_bridge', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'minecraft:chests/bastion_hoglin_stable', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'minecraft:chests/bastion_other', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'minecraft:chests/nether_bridge', NETHER_COMMON, 0.33, 1)
    addToLootTable(event, 'minecraft:chests/nether_bridge', NETHER_UNCOMMON, 0.1, 1)
    addToLootTable(event, 'minecraft:chests/nether_bridge', NETHER_RARE, 0.05, 1)
}

function bygoneNetherLootTables(event) {
    addToLootTable(event, 'bygonenether:chests/catacomb/treasure_rib', NETHER_EPIC, 1, 1)
    addToLootTable(event, 'bygonenether:chests/citadel', NETHER_EPIC, 1, 1)
}

function graveyardLootTables(event) {
    addToLootTable(event, 'graveyard:chests/crypt_loot', PLENTIFUL, 1, 1)
    addToLootTable(event, 'graveyard:chests/great_crypt_loot', EPIC, 1, 1)
    addToLootTable(event, 'graveyard:chests/large_loot', RARE, 1, 1)
    addToLootTable(event, 'graveyard:chests/medium_loot', UNCOMMON, 1, 1)
    addToLootTable(event, 'graveyard:chests/small_loot', COMMON, 1, 1)
}

function dungeonsEnhancedLootTables(event) {
    addToLootTable(event, 'dungeons_enhanced:chests/castle/armory', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/bedroom', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/cellar', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/coffin', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/library', 'custom:secret_book', 0.1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/library', 'custom:lore_book', 0.1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/quarters', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/spring', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/castle/throne', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/deep_crypt', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/desert_tomb', COMMON, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/desert_tomb', 'kubejs:pharaohs_ankh', 0.2, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/elders_temple/elder_room', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/elders_temple/main', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/flying_dutchman', RARE, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/flying_dutchman', 'kubejs:soul_of_a_pirate', 0.33, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/ice_pit/armory', UNCOMMON, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/ice_pit/armory', 'kubejs:effervescent_snowflake', 0.33, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/jungle_monument/treasure', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/large_dungeon', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/miners_house', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/brewery', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/church', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/prison', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/monster_maze/treasure', EPIC, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/mushroom_house', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/pillager_camp/general', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/pirate_ship', RARE, 1, 1)
    addItemToLootTable(event, 'dungeons_enhanced:chests/pirate_ship', 'kubejs:soul_of_a_pirate', 0.33, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/ruined/house', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/ruined_building', COMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/sunken_shrine', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/tower_of_the_undead/treasure', RARE, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/watch_tower', UNCOMMON, 1, 1)
    addToLootTable(event, 'dungeons_enhanced:chests/witch_tower', UNCOMMON, 1, 1)
}

function incendiumLootTables(event) {
    addToLootTable(event, 'incendium:castle/barrel/alchemist', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:castle/barrel/barracks', NETHER_RARE, 1, 1)
    addToLootTable(event, 'incendium:castle/barrel/blacksmith', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:castle/barrel/food', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'incendium:castle/barrel/generic', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'incendium:castle/barrel/generic_big', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:castle/barrel/greenhouse_secret', NETHER_RARE, 1, 1)
    addToLootTable(event, 'incendium:castle/barrel/library', 'custom:secret_book', 0.15, 1)
    addToLootTable(event, 'incendium:castle/barrel/library', 'custom:lore_book', 0.25, 1)
    addToLootTable(event, 'incendium:castle/barrel/library_low', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'incendium:castle/barrel/library_low', 'custom:lore_book', 0.1, 1)
    addToLootTable(event, 'incendium:castle/king_statue', NETHER_RARE, 1, 1)
    addToLootTable(event, 'incendium:castle/tower_barrel', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'incendium:castle/treasure/quartz', NETHER_EPIC, 1, 1)
    addToLootTable(event, 'incendium:cvill/blacksmith', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:cvill/medium', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:lab/rare', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:lab/treasure', NETHER_EPIC, 1, 1)
    addToLootTable(event, 'incendium:quartz_flats/kitchen_extra_treasure', NETHER_RARE, 1, 1)
    addToLootTable(event, 'incendium:quartz_flats/kitchen_treasure', NETHER_RARE, 1, 1)
    addToLootTable(event, 'incendium:reactor/office', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'incendium:reactor/office_treasure', NETHER_RARE, 1, 1)
    addToLootTable(event, 'incendium:reactor/treasure', NETHER_EPIC, 1, 1)
    addItemToLootTable(event, 'incendium:reactor/treasure', 'enigmaticlegacy:blazing_core', 1, 1)
    addToLootTable(event, 'incendium:sanctum/common_loot', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'incendium:sanctum/lower_loot', NETHER_COMMON, 1, 1)
    addToLootTable(event, 'incendium:sanctum/tax_collector', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:steam/rare', NETHER_UNCOMMON, 1, 1)
    addToLootTable(event, 'incendium:steam/treasure', NETHER_RARE, 1, 1)
}

function cursedLootTables(event) {
    event.addGeneric('custom:cursed_loot', loot => {
        loot.addPool(pool => {
            pool.randomChance(0.1)
            pool.rolls = [1, 4]
            pool.addItem('minecraft:iron_ingot', 40, [1, 8])
            pool.addItem('minecraft:gold_ingot', 30, [1, 8])
            pool.addItem('minecraft:quartz', 25, [1, 16])
            pool.addItem('minecraft:amethyst_shard', 12, [1, 3])
            pool.addItem('minecraft:diamond', 2, [1, 4])
            pool.addItem('minecraft:emerald', 10, [1, 8])
            pool.addItem('minecraft:netherite_scrap', 1, [1, 2])
            pool.addItem('minecraft:ender_pearl', 3, [1, 4])
            pool.addItem('minecraft:golden_apple', 2, [1, 2])
            pool.addItem('minecraft:enchanted_golden_apple', 1, 1)
            pool.addItem('minecraft:ghast_tear', 1, [1, 4])
            pool.addItem('quark:diamond_heart', 1, 1)
            pool.addItem('dimdungeons:item_portal_key', 1, [1, 2])
            pool.addItem('immersive_weathering:golden_moss_clump', 2, [1, 4])
            pool.addItem('immersive_weathering:enchanted_golden_moss_clump', 1, [1, 2])
            pool.addItem('rottencreatures:treasure_chest', 2, 1)
            pool.addItem('enigmaticlegacy:earth_heart', 1, 1)
            pool.addItem('supplementaries:bomb', 8, [1, 4])
            pool.addItem('supplementaries:bomb_blue', 6, [1, 4])
            pool.addItem('supplementaries:bomb_spiky', 5, [1, 4])
            pool.addItem('supplementaries:flute', 1, 1)
            pool.addItem('pyromancer:bombsack', 8, [1, 4])
            pool.addItem('pyromancer:scatter_bombsack', 6, [1, 4])
            pool.addItem('pyromancer:napalm_bombsack', 5, [1, 4])
        })
        loot.addPool(pool => {
            pool.rolls = {n:1, p: 0.025}
            pool.addLootTable('custom:loot_rare').weight(100)
            pool.addLootTable('custom:loot_epic').weight(25)
            pool.addLootTable('custom:loot_legendary').weight(5)
            pool.addLootTable('custom:loot_godly').weight(1)
        })
        loot.addPool(pool => {
            pool.randomChance(0.001)
            pool.addItem('kubejs:ancient_core')
        })
    })
    event.addGeneric('custom:cursed_loot_witch', loot => {
        loot.addPool(pool => {
            pool.randomChance(0.25)
            pool.rolls = [1, 3]
            pool.addItem('minecraft:blaze_powder').weight(3)
            pool.addItem('minecraft:glistering_melon_slice').weight(1)
            pool.addItem('minecraft:golden_carrot').weight(1)
        })
    })
}

function treasureBagLootTables(event) {
    event.addGeneric('custom:raid_bag', loot => {
        loot.addPool(pool => {
            pool.addLootTable('custom:loot_epic')
        })
        loot.addPool(pool => {
            pool.rolls = [56, 128]
            pool.addItem('minecraft:emerald')
        })
        loot.addPool(pool => {
            pool.rolls = 1
            pool.addItem('artifacts:villager_hat').weight(1)
            pool.addItem('villagertools:lure').weight(1)
        })
        loot.addPool(pool => {
            pool.rolls = [6, 12]
            pool.addItem('villagertools:gears').weight(1)
            pool.addItem('villagertools:bribe').weight(1)
            pool.addItem('villagertools:restock').weight(1)
            pool.addItem('villagertools:forget').weight(1)
            pool.addItem('villagertools:contract').weight(1)
            pool.addItem('villagertools:darkness').weight(1)
            pool.addItem('villagertools:guard').weight(1)
            pool.addItem('villagertools:knowledge').weight(1)
            pool.addItem('villagertools:key').weight(1)
            pool.addItem('villagertools:badge').weight(1)
            pool.addItem('villagertools:cure').weight(1)
        })
        loot.addPool(pool => {
            pool.randomChance(0.025)
            pool.addItem('kubejs:ancient_core')
        })
    })
}

function structoryLootTables(event) {
    addToLootTable(event, 'structory:library/high', COMMON, 1, 1)
    addToLootTable(event, 'structory:library/high', 'custom:secret_book', 0.05, 1)
    addToLootTable(event, 'structory:library/high', 'custom:lore_book', 0.1, 1)
    addToLootTable(event, 'structory:outcast/bandit/desert', COMMON, 1, 1)
    addToLootTable(event, 'structory:outcast/mine/loot', COMMON, 1, 1)
    addToLootTable(event, 'structory:outcast/ruin/ruin', COMMON, 1, 1)
    addToLootTable(event, 'structory:ruin/swamp/loot', COMMON, 1, 1)
    addToLootTable(event, 'structory:ruin/taiga/illager_treasure', RARE, 1, 1)
    addToLootTable(event, 'structory:ruin/taiga/illager_high', UNCOMMON, 1, 1)
}