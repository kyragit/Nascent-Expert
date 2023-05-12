
const LootContextParams = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParams')

const coins = {
    copper: function(count) {
        return Item.of('createdeco:copper_coin', count)
    },
    iron: function(count) {
        return Item.of('createdeco:iron_coin', count)
    },
    gold: function(count) {
        return Item.of('createdeco:gold_coin', count)
    },
    netherite: function(count) {
        return Item.of('createdeco:netherite_coin', count)
    }
}

MoreJSEvents.wandererTrades(event => {
    event.removeModdedTrades(1)
    event.removeModdedTrades(2)
    event.removeVanillaTrades(1)
    event.removeVanillaTrades(2)

    let weighted_list_normal = []
    let weighted_list_special = []

    // Simple coin trade functions
    let tradeCopper = function(level, count, output, maxUses, weight) {
        weight = weight ? weight : 1
        let entry = (offer, entity, random) => {
            offer.setFirstInput(coins.copper(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
        }
        switch (level) {
            case 1:
                weighted_list_normal.push([weight, entry])
                break
            case 2:
                weighted_list_special.push([weight, entry])
                break
        }
    }
    let tradeIron = function(level, count, output, maxUses, weight) {
        weight = weight ? weight : 1
        let entry = (offer, entity, random) => {
            offer.setFirstInput(coins.iron(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
        }
        switch (level) {
            case 1:
                weighted_list_normal.push([weight, entry])
                break
            case 2:
                weighted_list_special.push([weight, entry])
                break
        }
    }
    let tradeGold = function(level, count, output, maxUses, weight) {
        weight = weight ? weight : 1
        let entry = (offer, entity, random) => {
            offer.setFirstInput(coins.gold(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
        }
        switch (level) {
            case 1:
                weighted_list_normal.push([weight, entry])
                break
            case 2:
                weighted_list_special.push([weight, entry])
                break
        }
    }
    let tradeNetherite = function(level, count, output, maxUses, weight) {
        weight = weight ? weight : 1
        let entry = (offer, entity, random) => {
            offer.setFirstInput(coins.netherite(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
        }
        switch (level) {
            case 1:
                weighted_list_normal.push([weight, entry])
                break
            case 2:
                weighted_list_special.push([weight, entry])
                break
        }
    }
    
    // Simple multi-input function
    let tradeMulti = function(level, input1, input2, output, maxUses, weight) {
        weight = weight ? weight : 1
        let entry = (offer, entity, random) => {
            offer.setFirstInput(input1)
            offer.setSecondInput(input2)
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
        }
        switch (level) {
            case 1:
                weighted_list_normal.push([weight, entry])
                break
            case 2:
                weighted_list_special.push([weight, entry])
                break
        }
    }

    // Fully custom trade
    let tradeCustom = function(level, callback, weight) {
        weight = weight ? weight : 1
        switch (level) {
            case 1:
                weighted_list_normal.push([weight, callback])
                break
            case 2:
                weighted_list_special.push([weight, callback])
                break
        }
    }

    // Normal trades

    tradeIron(1, 1, 'minecraft:amethyst_shard', 16, 5)
    tradeIron(1, 4, 'minecraft:turtle_egg', 4, 4)
    tradeNetherite(1, 4, 'minecraft:netherite_ingot', 1, 1)
    tradeGold(1, 2, 'minecraft:diamond', 8, 2)
    tradeGold(1, 1, 'minecraft:golden_apple', 8, 3)
    tradeNetherite(1, 1, 'minecraft:enchanted_golden_apple', 2, 1)
    tradeIron(1, 4, 'minecraft:ender_pearl', 8, 4)
    tradeGold(1, 2, 'minecraft:blaze_rod', 4, 2)
    tradeGold(1, 1, 'minecraft:ghast_tear', 2, 1)
    tradeIron(1, 1, 'minecraft:name_tag', 4, 3)
    tradeNetherite(1, 1, 'minecraft:totem_of_undying', 2, 1)
    tradeCopper(1, 3, 'minecraft:nautilus_shell', 8, 2)
    tradeIron(1, 5, 'quark:rainbow_rune', 3, 4)
    tradeCopper(1, 6, 'dimdungeons:item_portal_key', 2, 2)
    tradeIron(1, 7, 'dimdungeons:block_key_charger', 1, 1)
    tradeCopper(1, 2, 'farmersdelight:brown_mushroom_colony', 16, 2)
    tradeCopper(1, 2, 'farmersdelight:red_mushroom_colony', 16, 2)
    tradeIron(1, 2, 'farmersdelight:roast_chicken_block', 4, 2)
    tradeIron(1, 2, 'farmersdelight:stuffed_pumpkin_block', 4, 2)
    tradeIron(1, 2, 'farmersdelight:honey_glazed_ham_block', 4, 2)
    tradeIron(1, 2, 'farmersdelight:shepherds_pie_block', 4, 2)
    tradeIron(1, 2, 'farmersdelight:rice_roll_medley_block', 4, 2)
    tradeGold(1, 3, 'immersive_weathering:enchanted_golden_moss_clump', 3, 2)
    tradeCopper(1, 3, '4x neapolitan:magic_beans', 4, 2)
    tradeIron(1, 2, 'neapolitan:neapolitan_ice_cream', 5, 2)
    tradeCopper(1, 5, 'enigmaticlegacy:extradimensional_eye', 6, 6)
    tradeIron(1, 4, 'apotheosis:ender_lead', 3, 5)
    tradeGold(1, 1, '32x archers_paradox:shulker_arrow', 4, 4)
    tradeIron(1, 3, '32x archers_paradox:spore_arrow', 4, 3)
    tradeIron(1, 12, 'potionofbees:lingering_potion_of_bees', 8, 1)
    tradeIron(1, 9, 'aquaculture:neptunium_ingot', 5, 2)
    tradeGold(1, 1, 'spelunkery:depth_gauge', 1, 1)
    tradeGold(1, 1, 'spelunkery:magnetic_compass', 1, 1)
    tradeGold(1, 2, 'quark:ravager_hide', 2, 4)
    tradeCopper(1, 10, 'enigmaticlegacy:recall_potion', 3, 3)
    tradeGold(1, 6, 'enigmaticlegacy:mending_mixture', 1, 1)

    // Special trades

    tradeGold(2, 2, 'minecraft:recovery_compass', 1, 5)
    tradeGold(2, 5, 'quark:flamerang', 1, 2)
    tradeCopper(2, 2, 'hexcasting:pride_colorizer_transgender', 8, 1)
    tradeIron(2, 10, 'kubejs:staff_core', 4, 3)
    tradeMulti(2, coins.gold(1), 'quark:light_blue_rune', 'simplyswords:runic_tablet', 1, 7)
    tradeNetherite(2, 1, 'apotheosis:boss_summoner', 1, 2)
    tradeCustom(2, (offer, entity, random) => {
        offer.setFirstInput(coins.gold(2))
        offer.setSecondInput('hexcasting:scroll')
        offer.setOutput(entity.server.lootTables.get('custom:random_scroll').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).create(LootContextParamSets.EMPTY)).pop())
        offer.setMaxUses(1)
    }, 5)
    tradeCustom(2, (offer, entity, random) => {
        offer.setFirstInput(coins.gold(random.nextInt(1, 10)))
        offer.setOutput(entity.server.lootTables.get('custom:artifact_lesser').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).create(LootContextParamSets.EMPTY)).pop())
        offer.setMaxUses(1)
    }, 7)
    tradeCustom(2, (offer, entity, random) => {
        offer.setFirstInput(coins.gold(random.nextInt(6, 24)))
        offer.setOutput(entity.server.lootTables.get('custom:artifact_greater').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).create(LootContextParamSets.EMPTY)).pop())
        offer.setMaxUses(1)
    }, 3)
    tradeCustom(2, (offer, entity, random) => {
        offer.setFirstInput(coins.iron(6))
        offer.setSecondInput('minecraft:paper')
        offer.setOutput(entity.server.lootTables.get('custom:parkour_guide').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).create(LootContextParamSets.EMPTY)).pop())
        offer.setMaxUses(1)
    }, 7)
    tradeCustom(2, (offer, entity, random) => {
        offer.setFirstInput(coins.iron(4))
        offer.setSecondInput('minecraft:map')
        switch (entity.level.dimension) {
            case 'minecraft:overworld':
                offer.setOutput(entity.server.lootTables.get('custom:structure_map').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).withParameter(LootContextParams.ORIGIN, entity.position()).create(LootContextParamSets.CHEST)).pop())
                offer.setMaxUses(1)
                break
            case 'minecraft:the_nether':
                offer.setOutput(entity.server.lootTables.get('custom:structure_map_nether').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).withParameter(LootContextParams.ORIGIN, entity.position()).create(LootContextParamSets.CHEST)).pop())
                offer.setMaxUses(1)
                break
            default:
                offer.setOutput(Item.of('minecraft:map', "{display:{Name:'{\"text\":\"Disallowed Trade\",\"color\":\"red\"}',Lore:['{\"text\":\"This trade does not work in this dimension. This is not a bug.\",\"color\":\"red\"}']}}"))
                offer.setMaxUses(0)
                break
        }
    }, 8)
    tradeCustom(2, (offer, entity, random) => {
        let output = entity.server.lootTables.get('custom:affix_item').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).create(LootContextParamSets.EMPTY)).pop()
        offer.setOutput(output)
        let rarity = output.nbt.getCompound('affix_data').getString('rarity')
        switch (rarity) {
            case 'rare':
                offer.setFirstInput(coins.gold(3))
                break
            case 'epic':
                offer.setFirstInput(coins.gold(15))
                break
            case 'mythic':
                offer.setFirstInput(coins.netherite(10))
                break
            case 'ancient':
                offer.setFirstInput(coins.netherite(32))
                offer.setSecondInput('kubejs:ancient_core')
                break
        }
        offer.setMaxUses(1)
    }, 10)

    let list1 = MoreJS.ofWeightedList(weighted_list_normal)
    let list2 = MoreJS.ofWeightedList(weighted_list_special)

    for (let i = 0; i < 5; i++) {
        event.addCustomTrade(1, (offer, entity, random) => {
            if (!entity.server) {
                return
            }
            list1.roll(random)(offer, entity, random)
        })
    }

    event.addCustomTrade(2, (offer, entity, random) => {
        if (!entity.server) {
            return
        }
        list2.roll(random)(offer, entity, random)
    })

})

const ApothLootController = Java.loadClass('shadows.apotheosis.adventure.loot.LootController')
const ApothLootRarity = Java.loadClass('shadows.apotheosis.adventure.loot.LootRarity')

let trades = {}

MoreJSEvents.villagerTrades(event => {
    let tradeCustom = function(profession, level, callback, weight) {
        weight = weight ? weight : 1
        if (!trades[profession]) {
            trades[profession] = []
        }
        if (!trades[profession][level]) {
            trades[profession][level] = []
            event.removeModdedTrades(profession, level)
            event.removeVanillaTrades(profession, level)
        }
        trades[profession][level].push([weight, callback])
    }

    let buyCopper = function(profession, level, count, output, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(coins.copper(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }
    let sellCopper = function(profession, level, count, input, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(input)
            offer.setOutput(coins.copper(count))
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }
    let buyIron = function(profession, level, count, output, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(coins.iron(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }
    let sellIron = function(profession, level, count, input, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(input)
            offer.setOutput(coins.iron(count))
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }
    let buyGold = function(profession, level, count, output, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(coins.gold(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }
    let sellGold = function(profession, level, count, input, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(input)
            offer.setOutput(coins.gold(count))
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }
    let buyNetherite = function(profession, level, count, output, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(coins.netherite(count))
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }
    let sellNetherite = function(profession, level, count, input, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(input)
            offer.setOutput(coins.netherite(count))
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }

    let tradeMulti = function(profession, level, input1, input2, output, maxUses, xp, price_mult, weight) {
        tradeCustom(profession, level, (offer, entity, random) => {
            offer.setFirstInput(input1)
            offer.setSecondInput(input2)
            offer.setOutput(output)
            offer.setMaxUses(maxUses)
            offer.setVillagerExperience(xp)
            offer.setPriceMultiplier(price_mult)
        }, weight)
    }

    const profs = {
        armorer: 'armorer',
        butcher: 'butcher',
        cartographer: 'cartographer',
        cleric: 'cleric',
        farmer: 'farmer',
        fisherman: 'fisherman',
        fletcher: 'fletcher',
        leatherworker: 'leatherworker',
        librarian: 'librarian',
        mason: 'mason',
        shepherd: 'shepherd',
        toolsmith: 'toolsmith',
        weaponsmith: 'weaponsmith',
        forager: 'byg:forager',
        engineer: 'immersiveengineering:engineer',
        machinist: 'immersiveengineering:machinist',
        electrician: 'immersiveengineering:electrician',
        outfitter: 'immersiveengineering:outfitter',
        gunsmith: 'immersiveengineering:gunsmith',
    }
    
    // -- BUTCHER --

    buyCopper(profs.butcher, 1, 1, 'minecraft:porkchop', 32, 1, 0, 6)
    buyCopper(profs.butcher, 1, 1, 'minecraft:beef', 32, 1, 0, 5)
    buyCopper(profs.butcher, 1, 2, '3x minecraft:chicken', 32, 1, 0, 5)
    buyCopper(profs.butcher, 1, 1, 'minecraft:mutton', 32, 1, 0, 4)
    buyCopper(profs.butcher, 1, 2, 'minecraft:rabbit', 32, 2, 0, 4)
    buyCopper(profs.butcher, 1, 2, 'delightful:raw_goat', 32, 2, 0, 2)
    sellCopper(profs.butcher, 1, 4, '8x minecraft:porkchop', 8, 0, 0, 1)
    sellCopper(profs.butcher, 1, 4, '8x minecraft:beef', 8, 0, 0, 1)
    sellCopper(profs.butcher, 1, 3, '8x minecraft:chicken', 10, 0, 0, 1)
    sellCopper(profs.butcher, 1, 8, '2x alexsdelight:raw_bison', 4, 1, 0, 1)
    buyCopper(profs.butcher, 1, 6, 'alexsdelight:raw_bison', 8, 2, 0, 3)

    sellCopper(profs.butcher, 2, 4, '2x alexsmobs:moose_ribs', 4, 1, 0, 2)
    buyCopper(profs.butcher, 2, 4, 'alexsmobs:moose_ribs', 3, 4, 0, 4)
    tradeMulti(profs.butcher, 2, 'minecraft:porkchop', coins.copper(2), '3x farmersdelight:bacon', 16, 4, 0, 6)
    tradeMulti(profs.butcher, 2, 'minecraft:chicken', coins.copper(2), '3x farmersdelight:chicken_cuts', 16, 4, 0, 6)
    tradeMulti(profs.butcher, 2, 'minecraft:mutton', coins.copper(2), '3x farmersdelight:mutton_chops', 16, 4, 0, 6)
    tradeMulti(profs.butcher, 2, 'minecraft:beef', coins.copper(2), '3x farmersdelight:minced_beef', 16, 4, 0, 6)
    tradeMulti(profs.butcher, 2, 'alexsdelight:raw_bison', coins.copper(3), '3x alexsdelight:bison_mince', 10, 5, 0, 4)
    tradeMulti(profs.butcher, 2, 'alexsmobs:kangaroo_meat', coins.copper(4), '3x alexsdelight:kangaroo_shank', 8, 6, 0, 6)
    tradeMulti(profs.butcher, 2, 'farmersdelight:ham', coins.copper(3), '4x minecraft:porkchop', 12, 5, 0, 5)
    buyIron(profs.butcher, 2, 1, 'farmersdelight:ham', 6, 4, 0, 5)
    sellCopper(profs.butcher, 2, 7, '4x farmersdelight:ham', 3, 1, 0, 3)
    buyCopper(profs.butcher, 2, 4, '4x minecraft:charcoal', 16, 1, 0, 7)
    buyIron(profs.butcher, 2, 4, '20x minecraft:charcoal', 8, 1, 0, 2)

    tradeCustom(profs.butcher, 3, (offer, entity, random) => {
        offer.setFirstInput('farmersdelight:iron_knife')
        offer.setSecondInput(coins.gold(1))
        offer.setOutput(ApothLootController.createLootItem(Item.of('farmersdelight:iron_knife'), ApothLootRarity.UNCOMMON, random))
        offer.setVillagerExperience(20)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 2)
    tradeCustom(profs.butcher, 3, (offer, entity, random) => {
        offer.setFirstInput('farmersdelight:iron_knife')
        offer.setSecondInput(coins.gold(3))
        offer.setOutput(ApothLootController.createLootItem(Item.of('farmersdelight:iron_knife'), ApothLootRarity.RARE, random))
        offer.setVillagerExperience(35)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 1)
    sellIron(profs.butcher, 3, 1, 'alexsdelight:kangaroo_stew', 5, 5, 0, 4)
    buyIron(profs.butcher, 3, 2, 'alexsdelight:kangaroo_stew', 10, 12, 0, 5)
    sellIron(profs.butcher, 3, 1, 'minecraft:rabbit_stew', 5, 5, 0, 4)
    buyIron(profs.butcher, 3, 2, 'minecraft:rabbit_stew', 10, 12, 0, 5)
    sellCopper(profs.butcher, 3, 3, 'farmersdelight:beef_stew', 5, 3, 0, 4)
    buyCopper(profs.butcher, 3, 6, 'farmersdelight:beef_stew', 10, 9, 0, 5)

    buyIron(profs.butcher, 4, 1, 'farmersdelight:chicken_sandwich', 3, 20, 0, 5)
    buyIron(profs.butcher, 4, 1, 'farmersdelight:mutton_wrap', 3, 20, 0, 5)
    buyIron(profs.butcher, 4, 1, 'farmersdelight:bacon_sandwich', 3, 20, 0, 5)
    buyIron(profs.butcher, 4, 1, 'farmersdelight:hamburger', 3, 20, 0, 5)
    sellIron(profs.butcher, 4, 10, '12x neapolitan:cooked_mint_chops', 16, 7, 0, 5)
    sellIron(profs.butcher, 4, 8, '16x alexsdelight:cooked_bison', 16, 7, 0, 2)
    sellIron(profs.butcher, 4, 8, '16x alexsmobs:cooked_kangaroo_meat', 16, 7, 0, 2)
    sellIron(profs.butcher, 4, 8, '16x farmersdelight:smoked_ham', 16, 7, 0, 2)

    tradeCustom(profs.butcher, 5, (offer, entity, random) => {
        let is_mythic = random.nextDouble() < 0.2
        offer.setFirstInput('farmersdelight:diamond_knife')
        offer.setSecondInput(coins.netherite(is_mythic ? 4 : 1))
        offer.setOutput(ApothLootController.createLootItem(Item.of('farmersdelight:diamond_knife'), is_mythic ? ApothLootRarity.MYTHIC : ApothLootRarity.EPIC, random))
        offer.setVillagerExperience(50)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 4)
    tradeCustom(profs.butcher, 5, (offer, entity, random) => {
        let is_mythic = random.nextDouble() < 0.2
        offer.setFirstInput('farmersdelight:netherite_knife')
        offer.setSecondInput(coins.netherite(is_mythic ? 4 : 1))
        offer.setOutput(ApothLootController.createLootItem(Item.of('farmersdelight:netherite_knife'), is_mythic ? ApothLootRarity.MYTHIC : ApothLootRarity.EPIC, random))
        offer.setVillagerExperience(50)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 1)
    buyGold(profs.butcher, 5, 1, 'farmersdelight:roast_chicken_block', 4, 50, 0, 7)
    buyGold(profs.butcher, 5, 1, 'farmersdelight:honey_glazed_ham_block', 4, 50, 0, 7)
    buyIron(profs.butcher, 5, 3, 'farmersdelight:steak_and_potatoes', 4, 50, 0, 7)
    buyIron(profs.butcher, 5, 3, 'farmersdelight:roasted_mutton_chops', 4, 50, 0, 7)
    buyIron(profs.butcher, 5, 3, 'farmersdelight:pasta_with_mutton_chop', 4, 50, 0, 7)


    // -- FLETCHER --

    buyCopper(profs.fletcher, 1, 4, '8x minecraft:arrow', 32, 1, 0, 5)
    buyCopper(profs.fletcher, 1, 6, '6x minecraft:flint', 32, 1, 0, 4)
    buyCopper(profs.fletcher, 1, 7, '5x minecraft:feather', 16, 1, 0, 4)
    sellCopper(profs.fletcher, 1, 1, 'minecraft:feather', 16, 0, 0, 2)
    buyCopper(profs.fletcher, 1, 1, '32x minecraft:stick', 64, 0, 0, 3)
    sellCopper(profs.fletcher, 1, 1, 'minecraft:bow', 8, 1, 0, 2)
    buyCopper(profs.fletcher, 1, 3, 'minecraft:bow', 10, 2, 0, 5)

    buyCopper(profs.fletcher, 2, 4, '6x minecraft:spectral_arrow', 16, 2, 0, 5)
    buyCopper(profs.fletcher, 2, 4, '5x alexsmobs:shark_tooth_arrow', 16, 2, 0, 4)
    sellCopper(profs.fletcher, 2, 4, '16x minecraft:flint', 8, 1, 0, 2)
    buyCopper(profs.fletcher, 2, 4, '16x archers_paradox:training_arrow', 16, 3, 0, 4)
    buyIron(profs.fletcher, 2, 1, Item.of('minecraft:tipped_arrow', 4, '{Potion:"minecraft:weakness"}'), 8, 3, 0, 3)
    buyIron(profs.fletcher, 2, 1, Item.of('minecraft:tipped_arrow', 4, '{Potion:"minecraft:poison"}'), 8, 3, 0, 3)
    buyIron(profs.fletcher, 2, 1, Item.of('minecraft:tipped_arrow', 4, '{Potion:"minecraft:slowness"}'), 8, 3, 0, 3)
    buyIron(profs.fletcher, 2, 1, Item.of('minecraft:tipped_arrow', 4, '{Potion:"rottencreatures:freeze"}'), 8, 3, 0, 3)
    tradeCustom(profs.fletcher, 2, (offer, entity, random) => {
        offer.setFirstInput('minecraft:bow')
        offer.setSecondInput(coins.iron(3))
        offer.setOutput(ApothLootController.createLootItem(Item.of('minecraft:bow'), ApothLootRarity.COMMON, random))
        offer.setVillagerExperience(8)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 3)
    buyCopper(profs.fletcher, 2, 4, 'minecraft:crossbow', 10, 2, 0, 4)
    
    buyIron(profs.fletcher, 3, 2, '10x apotheosis:iron_mining_arrow', 8, 4, 0, 3)
    buyIron(profs.fletcher, 3, 2, '7x savage_and_ravage:mischief_arrow', 8, 4, 0, 2)
    buyIron(profs.fletcher, 3, 2, '8x archers_paradox:verdant_arrow', 8, 4, 0, 2)
    buyIron(profs.fletcher, 3, 2, '8x archers_paradox:spore_arrow', 8, 4, 0, 1)
    buyCopper(profs.fletcher, 3, 9, '5x archers_paradox:blaze_arrow', 4, 6, 0, 2)
    buyIron(profs.fletcher, 3, 2, '7x archers_paradox:ender_arrow', 8, 4, 0, 2)
    buyIron(profs.fletcher, 3, 2, '8x apotheosis:obsidian_arrow', 8, 4, 0, 3)
    buyIron(profs.fletcher, 3, 2, '7x neapolitan:bananarrow', 8, 4, 0, 1)
    buyIron(profs.fletcher, 3, 2, '8x archers_paradox:slime_arrow', 8, 4, 0, 1)
    buyIron(profs.fletcher, 3, 2, '8x apotheosis:broadhead_arrow', 8, 4, 0, 2)
    buyIron(profs.fletcher, 3, 2, '8x archers_paradox:quartz_arrow', 8, 4, 0, 3)
    buyCopper(profs.fletcher, 3, 6, Item.of('minecraft:tipped_arrow', 4, '{Potion:"apotheosis:sundering"}'), 8, 5, 0, 2)
    buyCopper(profs.fletcher, 3, 6, Item.of('minecraft:tipped_arrow', 4, '{Potion:"apotheosis:wither"}'), 8, 5, 0, 2)
    buyCopper(profs.fletcher, 3, 6, Item.of('minecraft:tipped_arrow', 4, '{Potion:"rottencreatures:strong_freeze"}'), 8, 5, 0, 2)
    buyCopper(profs.fletcher, 3, 6, Item.of('minecraft:tipped_arrow', 4, '{Potion:"minecraft:harming"}'), 8, 5, 0, 2)
    tradeCustom(profs.fletcher, 3, (offer, entity, random) => {
        offer.setFirstInput('minecraft:bow')
        offer.setSecondInput(coins.gold(1))
        offer.setOutput(ApothLootController.createLootItem(Item.of('minecraft:bow'), ApothLootRarity.UNCOMMON, random))
        offer.setVillagerExperience(10)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 5)
    tradeCustom(profs.fletcher, 3, (offer, entity, random) => {
        offer.setFirstInput('minecraft:crossbow')
        offer.setSecondInput(coins.gold(1))
        offer.setOutput(ApothLootController.createLootItem(Item.of('minecraft:crossbow'), ApothLootRarity.UNCOMMON, random))
        offer.setVillagerExperience(10)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 5)

    buyGold(profs.fletcher, 4, 1, '32x apotheosis:diamond_mining_arrow', 4, 6, 0, 3)
    buyGold(profs.fletcher, 4, 1, '16x archers_paradox:diamond_arrow', 4, 6, 0, 3)
    buyGold(profs.fletcher, 4, 1, '40x archers_paradox:challenge_arrow', 4, 6, 0, 3)
    buyGold(profs.fletcher, 4, 1, '24x archers_paradox:phantasmal_arrow', 4, 6, 0, 2)
    buyGold(profs.fletcher, 4, 1, '24x apotheosis:explosive_arrow', 4, 6, 0, 2)
    buyGold(profs.fletcher, 4, 1, '32x archers_paradox:frost_arrow', 4, 6, 0, 3)
    buyIron(profs.fletcher, 4, 2, Item.of('minecraft:tipped_arrow', 4, '{Potion:"apotheosis:strong_sundering"}'), 8, 6, 0, 2)
    buyIron(profs.fletcher, 4, 2, Item.of('minecraft:tipped_arrow', 4, '{Potion:"minecraft:strong_harming"}'), 8, 6, 0, 2)
    buyIron(profs.fletcher, 4, 2, Item.of('minecraft:tipped_arrow', 4, '{Potion:"minecraft:strong_poison"}'), 8, 6, 0, 2)
    buyIron(profs.fletcher, 4, 2, Item.of('minecraft:tipped_arrow', 4, '{Potion:"unusualend:levitation"}'), 8, 6, 0, 2)
    tradeCustom(profs.fletcher, 4, (offer, entity, random) => {
        let is_epic = random.nextDouble() < 0.2
        offer.setFirstInput('minecraft:bow')
        offer.setSecondInput(coins.gold(is_epic ? 5 : 2))
        offer.setOutput(ApothLootController.createLootItem(Item.of('minecraft:bow'), is_epic ? ApothLootRarity.EPIC : ApothLootRarity.RARE, random))
        offer.setVillagerExperience(18)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 4)
    tradeCustom(profs.fletcher, 4, (offer, entity, random) => {
        let is_epic = random.nextDouble() < 0.2
        offer.setFirstInput('minecraft:crossbow')
        offer.setSecondInput(coins.gold(is_epic ? 5 : 2))
        offer.setOutput(ApothLootController.createLootItem(Item.of('minecraft:crossbow'), is_epic ? ApothLootRarity.EPIC : ApothLootRarity.RARE, random))
        offer.setVillagerExperience(18)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 4)

    tradeCustom(profs.fletcher, 5, (offer, entity, random) => {
        let is_ancient = random.nextDouble() < 0.025
        offer.setFirstInput(is_ancient ? coins.netherite(16) : 'minecraft:bow')
        offer.setSecondInput(is_ancient ? 'kubejs:ancient_core' : coins.netherite(6))
        offer.setOutput(ApothLootController.createLootItem(Item.of('minecraft:bow'), is_ancient ? ApothLootRarity.ANCIENT : ApothLootRarity.MYTHIC, random))
        offer.setVillagerExperience(50)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 4)
    tradeCustom(profs.fletcher, 5, (offer, entity, random) => {
        let is_ancient = random.nextDouble() < 0.025
        offer.setFirstInput(is_ancient ? coins.netherite(16) : 'minecraft:crossbow')
        offer.setSecondInput(is_ancient ? 'kubejs:ancient_core' : coins.netherite(6))
        offer.setOutput(ApothLootController.createLootItem(Item.of('minecraft:crossbow'), is_ancient ? ApothLootRarity.ANCIENT : ApothLootRarity.MYTHIC, random))
        offer.setVillagerExperience(50)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
    }, 4)
    buyGold(profs.fletcher, 5, 1, '16x archers_paradox:shulker_arrow', 4, 50, 0, 3)
    buyGold(profs.fletcher, 5, 1, '16x archers_paradox:lightning_arrow', 4, 50, 0, 3)
    buyGold(profs.fletcher, 5, 1, Item.of('minecraft:tipped_arrow', 16, '{Potion:"apotheosis:strong_wither"}'), 4, 50, 0, 2)
    buyGold(profs.fletcher, 5, 1, Item.of('minecraft:tipped_arrow', 16, '{Potion:"minecraft:strong_slowness"}'), 4, 50, 0, 2)


    // -- LIBRARIAN --

    buyCopper(profs.librarian, 1, 2, '2x minecraft:book', 10, 1, 0, 5)
    buyCopper(profs.librarian, 1, 1, '3x minecraft:paper', 32, 1, 0, 5)
    buyCopper(profs.librarian, 1, 5, Utils.randomOf(Utils.random, Ingredient.of('#forge:bookshelves').getItemIds()), 6, 2, 0, 3)
    tradeCustom(profs.librarian, 1, (offer, entity, random) => {
        let output = entity.server.lootTables.get('custom:enchanted_book_level_10').getRandomItems(new Builder(entity.server.getLevel(entity.level.dimension)).create(LootContextParamSets.EMPTY)).pop()
        offer.setFirstInput('minecraft:book')
        offer.setSecondInput(coins.iron(3))
        offer.setOutput(output)
        offer.setMaxUses(1)
        offer.setPriceMultiplier(0)
        offer.setVillagerExperience(3)
    }, 2)

    for (let prof in trades) {
        for (let level = 1; level < 6; level++) {
            if (trades[prof][level]) {
                for (let i = 0; i < (level == 5 ? 1 : 2); i++) {
                    event.addCustomTrade(prof, level, MoreJS.ofWeightedList(trades[prof][level]).roll())
                }
            }
        }
    }
})

const Villager = Java.loadClass('net.minecraft.world.entity.npc.Villager')
const MerchantOffers = Java.loadClass('net.minecraft.world.item.trading.MerchantOffers')

ServerEvents.tick(event => {
    if (event.server.overworld().getDayTime() % 24000 == 0) {
        event.server.allLevels.forEach(level => {
            level.getAllEntities().forEach(entity => {
                if (entity instanceof Villager) {
                    let prof = entity.getVillagerData().getProfession().name()
                    if (prof != 'none') {
                        let trade_index = 0
                        let offers_tag = entity.getOffers().createTag()
                        offers_tag.remove('Recipes')
                        let list = []
                        entity.getOffers().forEach(offer => {
                            outer: {
                                inner: {
                                    trade_index++
                                    if (trades[prof] == undefined) {
                                        break inner
                                    }
                                    let trade_level = Math.ceil(trade_index / 2.0)
                                    if (trades[prof][trade_level] == undefined) {
                                        break inner
                                    }
                                    let new_offer = VillagerUtils.createCustomTrade(MoreJS.ofWeightedList(trades[prof][trade_level]).roll()).getOffer(entity, level.random).createTag()
                                    list.push(new_offer)
                                    break outer
                                }
                                list.push(offer.createTag())
                            }
                        })
                        offers_tag.put('Recipes', NBT.toTagList(list))
                        let new_offers = new MerchantOffers(offers_tag)
                        entity.setOffers(new_offers) 
                        entity.playWorkSound()
                        event.server.runCommandSilent(`execute at ${entity.getStringUuid()} run particle minecraft:happy_villager ~ ~0.5 ~ 0.3 1.0 0.3 1 15 normal @a`)
                    }
                }
            })
        })
    }
})
