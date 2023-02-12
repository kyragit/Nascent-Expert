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
    event.player.stages.add('create')
    event.server.runCommandSilent(`execute in ${event.level.dimension} positioned ${event.target.block.x} ${event.target.block.y} ${event.target.block.z} run particle dust 1.0 0.0 0.95 1.0 ~ ~0.5 ~ 0.3 0.3 0.3 0.0 5 normal @a`)
    event.target.block.setBlockState(Blocks.AIR.defaultBlockState(), 0)
    event.item.count -= 1
    event.server.runCommand(`tellraw ${event.player.username} {"text":"As you sprinkle the dust upon the andesite, it melts and solidifies into something else. A new material, perhaps? Or a gift from the future...","color":"#BA00FC"}`)
})

ItemEvents.rightClicked('kubejs:portable_black_hole', event => {
    let suck_strength = 0.5
    let blast_strength = 1.0
    event.level.getNearbyEntities(LivingEntity, TargetingConditions.forCombat(), event.player, AABB.ofSize(event.player.position(), 30, 10, 30)).forEach(entity => {
        entity.addMotion((event.player.x - entity.x) * suck_strength, (event.player.y - (entity.y + 1)) * suck_strength, (event.player.z - entity.z) * suck_strength)
        event.server.scheduleInTicks(10, later => {
            entity.addMotion((event.player.x - entity.x) * -blast_strength, (event.player.y - (entity.y + 1)) * -blast_strength, (event.player.z - entity.z) * -blast_strength)
        })
    })
    event.player.potionEffects.add('minecraft:slowness', 10, 5, false, false)
    event.server.scheduleInTicks(10, later => {
        event.level.createExplosion(event.player.x, event.player.y + 1.5, event.player.z).strength(5.0).damagesTerrain(false).explode()
        event.player.potionEffects.add('minecraft:speed', 100, 0, false, false)
    })
    for (let i = 0; i < 1000; i++) {
        let offset = [Utils.random.nextDouble(-15, 15), Utils.random.nextDouble(-5, 5), Utils.random.nextDouble(-15, 15)]
        event.server.runCommandSilent(`execute at ${event.player.username} run particle minecraft:reverse_portal ~${offset[0]} ~${offset[1] + 1.5} ~${offset[2]} ${-offset[0]} ${-offset[1]} ${-offset[2]} 1.5 0 normal @a`)
    }
    event.player.addItemCooldown('kubejs:portable_black_hole', 20)
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

const TargetingConditions = Java.loadClass('net.minecraft.world.entity.ai.targeting.TargetingConditions')

EntityEvents.spawned('minecraft:wither', event => {
    if (event.entity.tags.contains('Music1')) {
        let dummy = event.level.createEntity('minecraft:bat')
        dummy.setFullNBT('{CustomName:\'{"text":"music_dummy"}\',CustomNameVisible:0b,Invulnerable:1b,NoGravity:1b,Silent:1b,NoAI:1b,PersistenceRequired:1b,ActiveEffects:[{Id:14,ShowParticles:0b,Duration:999999,Amplifier:0,Ambient:0b}]}')
        dummy.setPos(event.entity.position())
        event.level.addFreshEntity(dummy)
        event.level.getNearbyPlayers(TargetingConditions.forNonCombat(), event.entity, AABB.ofSize(event.entity.position(), 512, 512, 512)).forEach(player => {
            player.sendData('trigger_music_1', {entity: dummy.getStringUuid()})
        })
    }
})

PlayerEvents.advancement('custom:unlock_create', event => {
    event.player.stages.add('create')
})

FTBQuestsEvents.completed('7B2817643B1C1080', event => {
    event.player.unlockAdvancement('custom:unlock_create')
})

// Regex go brrrr
// Stops players from mining any create machines before it's unlocked
LootJS.modifiers(event => {
    event.addBlockLootModifier(/^create:(?:(?!seat|glass|window|layered|small|cut|pillar|ore|zinc|shingle|tile|asurine|crimsite|limestone|ochrum|scorc*h*ia|veridium).)*$/)
        .not(n => {
            n.hasAnyStage('create')
        })
        .removeLoot(ItemFilter.ALWAYS_TRUE)
})

PlayerEvents.inventoryChanged('create:andesite_alloy', event => {
    if (!event.hasGameStage('create')) {
        event.server.runCommand(`tellraw ${event.player.username} {"text":"Sequence break prevention initiated!","color":"dark_red"}`)
        event.player.drop(event.item, false)
        event.server.runCommandSilent(`clear ${event.player.username} create:andesite_alloy`)
        event.server.runCommand(`tellraw ${event.player.username} {"text":"If somehow you encountered this from the intended progression path, or you\'re a dirty cheater, click this message to disable sequence break detection (requires cheats to be enabled). If you found the item some other way, please submit a bug report <TODO: link>.","clickEvent":{"action":"run_command","value":"/advancement grant @s only custom:unlock_create"}}`)
    }
})

// ---WARNING: MEGA SPOILERS BELOW!!---
// 
// IF YOU INTEND ON PLAYING THIS PACK, AVERT YOUR EYES!

/* <spoiler padding>
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* 
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
* Seriously, you're robbing yourself of discovering something really cool if you read this!!
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*/

const WORD_LIST = {
    lightning: ['aer', 'purifactum', 'after', 'media', 'thundre', 'smite', 'obfus', 'nihil', 'inexor'],
    fireball: ['IGNIS', 'ANNIHIL', 'BEYOND', 'IMPES', 'ABOLEO', 'INFERNUM', 'EXCIEO', 'CHAOS', 'BODOM'],
    fireball_keys: ['BURN', 'ANNIHIL', 'HELL', 'IMPLODE', 'EXPUNGE', 'BEYOND'],
    slow: ['before', 'eternal', 'vetus', 'immort', 'terra', 'petra', 'antea', 'totum', 'gigas', 'tardus', 'dius'],
    colors: [['dark_purple', 'p'], ['blue', 'b'], ['green', 'g'], ['dark_red', 'r'], ['yellow', 'y'], ['white', 'w']],
}

let secret_words = {}
let first_tick = true

ServerEvents.tick(event => {
    if (first_tick) {
        first_tick = false
        let seed = event.server.getOverworld().getSeed()
        let random = Utils.newRandom(seed)

        secret_words.lightning = `${Utils.randomOf(random, WORD_LIST.lightning)} ${Utils.randomOf(random, WORD_LIST.lightning)} ${Utils.randomOf(random, WORD_LIST.lightning)}`
        let lightning_book_deobf = [{"text":"3rd Waning Crescent, 4112\\\\n\\\\nMy experiments with drawing from After have acheived limited success. I\\\'ve managed to create a simple time vortex, briefly speeding up time in the immediate vicinity; although it was short-lived. Continued work appears fruitful."},{"text":"3rd New Moon,\\\\n4112\\\\n\\\\nIt seems that my work has attracted the attention of - well, I\\\'m not sure what exactly. All I can say for sure is that they originate from After, given the massive flying vessels they arrived in. Luckily, I am well-hidden for the"},{"text":"time being, but continued prodding into their plane could compromise my position. I will have to take a more careful approach."},{"text":"4th Full Moon,\\\\n4112\\\\n\\\\nThey finally left. I will resume study shortly."},{"text":"4th Waning Gibbous,\\\\n4112\\\\n\\\\nAstonishing. Using tablets of charged amethyst, I managed to open a stable vortex between two points; effectively teleporting objects from one to the other. With enough concentrated Media, it\\\'s possible to make a sort of tether "},{"text":"between the Overworld and After, dilating space and time around it. This can be exploited with some clever math to teleport anywhere I desire, though it isn\\\'t cheap or safe. "},{"text":"4th Last Quarter,\\\\n4112\\\\n\\\\nMy meddling has drawn their attention again. They didn\\\'t show up in person this time, though; it seems like they\\\'re trying to strike me remotely with lightning. Luckily, I\\\'m still well-hidden for now."},{"text":"4th New Moon,\\\\n4112\\\\n\\\\nThe earlier encounter gave me an idea. I might be able to exploit the beings After\\\'s lightning attacks to my benefit. I must study."},{"text":"5th Full Moon,\\\\n4112\\\\n\\\\nI have little time. I\\\'m on the run now. My idea worked, but I accidentally broadcasted my exact location. I must go."},{"text":"5th Waning Gibbous,\\\\n4112\\\\n\\\\nMy life will soon be over. It is only a matter of time before they find me, and they have all the time in the Universe. My only hope now is to send this journal somewhere else in the hope that someone else might continue"},{"text":`my research. To whomever might find this, I grant these three words:\\\\n\\\\n${secret_words.lightning}\\\\n\\\\nWhen spoken aloud, they will trick After\\\'s lightning defense system to strike at enemies around the user, but not the user themselves. Use it with`},{"text":"caution, and do better than I did. Goodbye."}]
        event.server.runCommandSilent(`data modify storage custom:secret_books lightning set value {author:"Unknown",title:"Cryptic Writing #1",pages:${obfuscateBookCaesarShift(lightning_book_deobf, seed)}}`)

        secret_words.fireball = `${Utils.randomOf(random, WORD_LIST.fireball)} ${Utils.randomOf(random, WORD_LIST.fireball)} ${Utils.randomOf(random, WORD_LIST.fireball)}`
        let fireball_key = Utils.randomOf(random, WORD_LIST.fireball_keys)
        let fireball_book_deobf = [{"text":"Entry #1\\\\n\\\\nAshurdan insisted that I keep log of my adventures in case something were to happen. He\\\'s being overly cautious, but I\\\'ll humor him nonetheless. "},{"text":"Entry #2\\\\n\\\\nWe\\\'ve opened a portal to \\\\\"Beyond\\\\\", as he calls it. It was far more complicated than getting to the Nether, and honestly I didn\\\'t understand most of it. We\\\'re going in tomorrow. I\\\'m not sure what to expect."},{"text":"Entry #3\\\\n\\\\nThis place, it... doesn\\\'t feel right. It\\\'s like a twisted mirror of our own, chaotic and uncontrollable. It\\\'s as though it wants to expand to every crevice, every nook of the Universe. I can feel it trying to worm its way into my head... it\\\'s horrifying. It\\\'s "},{"text":`telling me tBURNo BURN what the fBURN my handBURN BURN BURN\\\\n\\\\nSPEAK IT.\\\\n${secret_words.fireball}`},{"text":"Entry #4\\\\n\\\\nThey will all burn. Ashurdan first."},{"text":"To whomever finds this book, I implore you to put it down immediately. I am Ashurdan, and Brenna tried to kill me yesterday. It seems the forces Beyond found their way inside her mind. I would erase the words she spoke if I could, but they are burned into the very paper itself."},{"text":"Please, for your own sake, do not heed Its words; only pain lay ahead."}]
        event.server.runCommandSilent(`data modify storage custom:secret_books fireball set value {author:"Brenna",display:{Lore:[\'{"text":"${fireball_key}","color":"dark_red","bold":"true"}\']},title:"Cryptic Writing #2",pages:${obfuscateBookViginere(fireball_book_deobf, fireball_key)}}`)

        let slow_key = ''
        let slow_book_name = '['
        for (let char of 'Cryptic') {
            let color = Utils.randomOf(random, WORD_LIST.colors)
            slow_book_name += `{"text":"${char}","color":"${color[0]}"},`
            slow_key += color[1]
        }
        slow_book_name += '{"text":" "},'
        for (let char of 'Writing') {
            let color = Utils.randomOf(random, WORD_LIST.colors)
            slow_book_name += `{"text":"${char}","color":"${color[0]}"},`
            slow_key += color[1]
        }
        slow_book_name += '{"text":" "},'
        for (let char of '#3') {
            let color = Utils.randomOf(random, WORD_LIST.colors)
            slow_book_name += `{"text":"${char}","color":"${color[0]}"},`
            slow_key += color[1]
        }
        slow_book_name += '{"text":""}]'
        secret_words.slow = `${Utils.randomOf(random, WORD_LIST.slow)} ${Utils.randomOf(random, WORD_LIST.slow)} ${Utils.randomOf(random, WORD_LIST.slow)}`
        let slow_book_deobf = [{"text":"Excavation Log:\\\\n11th New Moon,\\\\n2656\\\\n\\\\nZamir Forest,\\\\nKingdom of Aurel\\\\n\\\\nReason for excavation: unexplained surface time anomalies"},{"text":"Week 1\\\\n\\\\nVery little progress. Excavation remains difficult due to thick permafrost. Some crew members have reported \\\\\"feeling strange\\\\\" during excavation. Upon further questioning, they report it to be due to cold temperatures."},{"text":"Week 2\\\\n\\\\nFinally broke through the permafrost. Stone appears typical of the area (asurine). Supplies are at predicted levels. Crew is having difficulty adapting to the cold conditions."},{"text":"Week 3\\\\n\\\\nLittle of note this week except a large section of atypical stone. Our geologists can\\\'t agree on the species. Further investigation is required to determine its origin. Crew has reported difficulty moving in the area, but the cause remains "},{"text":"unknown. Supplies are slightly lower than expected."},{"text":"Week 4\\\\n\\\\nOur geologists have agreed that the atypical stone sample is not, in fact, stone. It is some kind of heretofor unseen material, similar to ceramic, but much stronger. Descriptions are consistent with the unverified reports from the "},{"text":"alleged exploration of Before in 2651. Further excavation around the \\\\\"stone\\\\\" seem to suggest that it is connected to some sort of much larger structure. The crew have taken to calling it \\\\\"the finger\\\\\" because of its shape. We\\\'ve sent our courier to request a Mahou."},{"text":"Week 5\\\\n\\\\nThe Mahou arrived and her report is difficult to believe. She said that the \\\\\"finger\\\\\" is actually the thumb of a gargantuan buried humanoid structure. She estimates it to be about 500 meters tall. She reports that there is an entrance"},{"text":"to the interior of the \\\\\"golem\\\\\" (as she called it) on its palm. It would take an estimated 4 weeks to excavate that far with the current crew size. We\\\'ve requested more supplies due to the longer than expected excavation."},{"text":"Week 9\\\\n\\\\nIt would seem that the Mahou was not lying after all. We have unearthed a large circular door on the golem\\\'s palm. I\\\'m going with a small crew to investigate tomorrow."},{"text":"Week 10\\\\n\\\\nMy situation appears dire. There is too much to write down, but I will nonetheless. As soon as we entered, everything outside of the golem appeared to vanish. Only blackness remained where once was rock. Getting near the door to nothing"},{"text":"was extremely painful, like my body was tearing itself apart. The interior of this, it\\\'s... breathtaking. It looks eternal, older than time itself. Intricate symbols are carved into every wall, none of which anyone understands. It is very difficult to navigate here, it clearly is meant to be"},{"text":"standing upright. Our supplies are dangerously low. Our only hope now is to venture toward the center of the golem, perhaps there is a way out there. "},{"text":"Week ???\\\\n\\\\nWe\\\'ve lost track of all time. Somehow, no one is getting hungry, or thirsty, or anything. It\\\'s as though time were at a standstill. We cannot find a way into its core, all of the doors are sealed shut. We\\\'re going to see if its head is any different."},{"text":"Week ???\\\\n\\\\nIt\\\'s been... it feels like months. This thing must be even bigger on the inside somehow. We\\\'ve arrived at the head. It\\\'s some sort of grand control room, thousands of buttons and controls we can\\\'t hope to understand. In the center is some kind of handheld"},{"text":"device. We can only assume it will open any locked doors."},{"text":`???\\\\n\\\\nOur assumption was correct. We\\\'ve entered the main chamber of the golem. Its massive ruby heart spoke directly to our minds. It spoke:\\\\n\\\\n${secret_words.slow}\\\\n\\\\nOver, and over, and over again. I\\\'m quickly`},{"text":"losing sanity. "},{"text":"Last Entry\\\\n\\\\nThere\\\'s a device. Emma accidentally stepped in and she vanished. There are controls; directions. They must direct the device. I\\\'m sending this book somewhere else in case where I end up isn\\\'t safe. If you\\\'re reading this, I hope you learn the nature"},{"text":"of this being. Goodbye."}]
        event.server.runCommandSilent(`data modify storage custom:secret_books slow set value {display:{Name:\'${slow_book_name}\'},author:"Unknown",title:"Cryptic Writing #3",pages:${obfuscateBookPlayfair(slow_book_deobf, slow_key)}}`)
    
    }
})

function bookToString(book) {
    let output = ''
    for (let i = 0; i < book.length; i++) {
        output += book[i].text
        if (!(i == book.length - 1)) {
            output += '@' // Page break character
        }
    }
    return output
}

function stringToBook(str_raw) {
    let str = []
    for (let char of str_raw) {
        str.push(char)
    }
    let output = '['
    let finished = false
    let index = 0
    while (!finished) {
        output += '\'{"text":"'
        for (;; index++) {
            if (index == str.length) {
                finished = true
                break
            }
            if (str[index] == '@') { // Page break character
                index++
                break
            }
            output += str[index]
        }
        output += `","clickEvent":{"action":"copy_to_clipboard","value":"${str_raw.replace(/@/g, ' ')}"},"hoverEvent":{"action":"show_text","contents":{"text":"Click to Copy Book"}}}\',`
    }
    return output + ']'
}

function obfuscateBookCaesarShift(book, seed) {
    return stringToBook(caesarShiftString(bookToString(book), (Math.abs(seed) % 25) + 1))
}

function caesarShiftString(str, amount) {
    // Yes, I know the charCodeAt() function exists. It doesn't work with KubeJS because it gets
    // converted to a Java char type for some reason.
    const LOWERCASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const UPPERCASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let output = ''
    let escape = false
    for (let char of str) {
        if (/[a-z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                output += LOWERCASE[(LOWERCASE.indexOf(char) + amount) % 26]
            }
        } else if (/[A-Z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                output += UPPERCASE[(UPPERCASE.indexOf(char) + amount) % 26]
            }
        } else {
            if (escape) {
                escape = false
            }
            if (char == '\\') {
                escape = true
            }
            output += char
        }
    }
    return output
}

function obfuscateBookViginere(book, key) {
    return stringToBook(vigenereString(bookToString(book), key, 0)[0])
}

function vigenereString(str, key_str, starting_key_index) {
    const LOWERCASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const UPPERCASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let key = []
    for (let char of key_str) {
        key.push(char)
    }
    let output = ''
    let escape = false
    let key_index = starting_key_index
    let key_length = key.length
    for (let char of str) {
        if (/[a-z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                let new_char = LOWERCASE[(LOWERCASE.indexOf(char) + (LOWERCASE.indexOf(key[key_index % key_length]) < 0 ? UPPERCASE.indexOf(key[key_index % key_length]) : LOWERCASE.indexOf(key[key_index % key_length]))) % 26]
                key_index++
                output += new_char
            }
        } else if (/[A-Z]/.test(char)) {
            if (escape) {
                output += char
                escape = false
            } else {
                let new_char = UPPERCASE[(UPPERCASE.indexOf(char) + (LOWERCASE.indexOf(key[key_index % key_length]) < 0 ? UPPERCASE.indexOf(key[key_index % key_length]) : LOWERCASE.indexOf(key[key_index % key_length]))) % 26]
                key_index++
                output += new_char
            }
        } else {
            if (escape) {
                escape = false
            }
            if (char == '\\') {
                escape = true
            }
            output += char
        }
    }
    return [output, key_index % key_length]
}

function obfuscateBookPlayfair(book, key) {
    return stringToBook(playfairString(bookToString(book), key))
}

function playfairString(str_raw, key_with_repeats) {
    const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let key = []
    for (let char of key_with_repeats.toLowerCase().replace(/j/g, 'i')) {
        if (key.indexOf(char) < 0) {
            key.push(char)
        }
    }
    let grid = [
        [],
        [],
        [],
        [],
        [],
    ]
    key.reverse()
    let alphabet = LETTERS.filter((value, _index, _array) => key.indexOf(value) == -1).reverse()
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
            let char = key.pop()
            char ? grid[row][column] = char : grid[row][column] = alphabet.pop()
        }
    }

    let grid_map = {}
    outer: for (let char of LETTERS) {
        for (let row = 0; row < 5; row++) {
            for (let column = 0; column < 5; column++) {
                if (grid[row][column] == char) {
                    grid_map[char] = [row, column]
                    continue outer
                }
            }
        }
    }

    // Decrypting this function is harder than decrypting the book...
    let encryptDigram = function(digram) {
        let is_uppercase_0 = false
        let is_uppercase_1 = false
        if (digram[0].toUpperCase() == digram[0]) {
            is_uppercase_0 = true
            digram[0] = digram[0].toLowerCase()
        }
        if (digram[1] && (digram[1].toUpperCase() == digram[1])) {
            is_uppercase_1 = true
            digram[1] = digram[1].toLowerCase()
        }

        let restoreCase = function(new_digram) {
            return [is_uppercase_0 ? new_digram[0].toUpperCase() : new_digram[0], is_uppercase_1 ? new_digram[1].toUpperCase() : new_digram[1]]
        }

        if (digram[0] == digram[1] || digram[1] == undefined) {
            return encryptDigram([digram[0], 'x'])
        }
        let grid_loc_0 = grid_map[digram[0]]
        let grid_loc_1 = grid_map[digram[1]]
        if (grid_loc_0[0] == grid_loc_1[0]) {
            return restoreCase([grid[grid_loc_0[0]][(grid_loc_0[1] + 1) % 5], grid[grid_loc_1[0]][(grid_loc_1[1] + 1) % 5]])
        }
        if (grid_loc_0[1] == grid_loc_1[1]) {
            return restoreCase([grid[(grid_loc_0[0] + 1) % 5][grid_loc_0[1]], grid[(grid_loc_1[0] + 1) % 5][grid_loc_1[1]]])
        }
        return restoreCase([grid[grid_loc_0[0]][grid_loc_1[1]], grid[grid_loc_1[0]][grid_loc_0[1]]])
    }

    let str = []
    for (let char of str_raw.replace(/j/g, 'i')) {
        str.push(char)
    }

    let output = ''
    let output_buffer = ''
    let wait_for_digram = ''
    let escape = false
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '\\') {
            escape = true
            output_buffer += str[i]
        } else if ((escape && str[i] == 'n') || !(/[a-zA-Z]/.test(str[i]))) {
            escape = false
            output_buffer += str[i]
        } else if (wait_for_digram == '') {
            wait_for_digram = str[i]
            escape = false
        } else {
            escape = false
            let new_chars = encryptDigram([wait_for_digram, str[i]])
            output += new_chars[0]
            output_buffer += new_chars[1]
            wait_for_digram = ''
        }

        if (wait_for_digram == '') {
            output += output_buffer
            output_buffer = ''
        }
        if (i == str.length - 1 && wait_for_digram != '') {
            let new_chars = encryptDigram([wait_for_digram, undefined])
            output += new_chars[0]
            output_buffer += new_chars[1]
            output += output_buffer
        }
    }
    return output
}

ServerEvents.genericLootTables(event => {
    event.addGeneric('custom:secret_book', loot => {
        loot.addPool(pool => {
            function secretBookEntry(p, book) {
                p.addEntry({
                    type: 'item',
                    weight: 1,
                    quality: 0,
                    name: 'minecraft:written_book',
                    functions: [
                        {
                            function: 'copy_nbt',
                            source: {
                                type: 'storage',
                                source: 'custom:secret_books'
                            },
                            ops: [
                                {
                                    source: `${book}.author`,
                                    target: 'author',
                                    op: 'replace'
                                },
                                {
                                    source: `${book}.title`,
                                    target: 'title',
                                    op: 'replace'
                                },
                                {
                                    source: `${book}.pages`,
                                    target: 'pages',
                                    op: 'replace'
                                },
                                {
                                    source: `${book}.display`,
                                    target: 'display',
                                    op: 'replace'
                                }
                            ]
                        }
                    ]
                })
            }

            secretBookEntry(pool, 'lightning')
            secretBookEntry(pool, 'fireball')
            secretBookEntry(pool, 'slow')
        })
    })
})

const LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const Projectile = Java.loadClass('net.minecraft.world.entity.projectile.Projectile')

PlayerEvents.chat(event => {
    switch (event.message) {
        //case 'spoil me':
        //    Utils.server.runCommand(`say ${secret_words.lightning}`)
        //    Utils.server.runCommand(`say ${secret_words.fireball}`)
        //    Utils.server.runCommand(`say ${secret_words.slow}`)
        //    event.cancel()
        //    return
        case secret_words.lightning:
            event.level.getNearbyEntities(LivingEntity, TargetingConditions.forCombat(), event.player, AABB.ofSize(event.player.position(), 20, 5, 20)).forEach(entity => {
                Utils.server.scheduleInTicks(Utils.random.nextInt(1, 10), later => {
                    later.server.runCommandSilent(`summon minecraft:lightning_bolt ${entity.x} ${entity.y} ${entity.z}`)
                })
                Utils.server.scheduleInTicks(Utils.random.nextInt(10, 20), later => {
                    later.server.runCommandSilent(`summon minecraft:lightning_bolt ${entity.x} ${entity.y} ${entity.z}`)
                })
            })
            event.cancel()
            return
        case secret_words.fireball:
            let nearby = event.level.getNearbyEntities(LivingEntity, TargetingConditions.forCombat(), event.player, AABB.ofSize(event.player.position(), 20, 5, 20))
            let target;
            if (nearby.isEmpty() || Math.random() < 0.2) {
                target = event.player
            } else {
                target = nearby[0]
            }
            if (Math.random() < 0.95) {
                for (let i = 0; i < 6; i++) {
                    Utils.server.scheduleInTicks(i * 2, later => {
                        let offsetX = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetX
                        }
                        let offsetY = Math.random() * 5.0 + 3.0
                        let offsetZ = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetZ
                        }
                        later.server.runCommandSilent(`execute at ${target.getStringUuid()} run summon minecraft:fireball ~${offsetX} ~${offsetY} ~${offsetZ} {power:[${-offsetX * 0.1}, ${-offsetY * 0.1}, ${-offsetZ * 0.1}]}`)
                    })
                }
                if (Math.random() < 0.33) {
                    if (Math.random() < 0.33) {
                        Utils.server.runCommand(`tellraw @a [{"text":"<${event.player.username}> "},{"text":"BURN","color":"dark_red"}]`)
                    } else {
                        Utils.server.runCommand(`tellraw @a "<${event.player.username}> BURN"`)
                    }
                }
            } else if (Math.random() < 0.75) {
                for (let i = 0; i < 10; i++) {
                    Utils.server.scheduleInTicks(i * 2, later => {
                        let offsetX = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetX
                        }
                        let offsetY = Math.random() * 5.0 + 3.0
                        let offsetZ = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetZ
                        }
                        later.server.runCommandSilent(`execute at ${target.getStringUuid()} run summon minecraft:wither_skull ~${offsetX} ~${offsetY} ~${offsetZ} {power:[${-offsetX * 0.1}, ${-offsetY * 0.1}, ${-offsetZ * 0.1}]}`)
                    })
                }
                Utils.server.runCommand(`tellraw @a [{"text":"<${event.player.username}> "},{"text":"ANNIHIL","color":"black"}]`)
            } else {
                for (let i = 0; i < 100; i++) {
                    Utils.server.scheduleInTicks(i * 2, later => {
                        let offsetX = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetX
                        }
                        let offsetY = Math.random() * 5.0 + 3.0
                        let offsetZ = Math.random() * 5.0
                        if (Math.random() < 0.5) {
                            offsetX = -offsetZ
                        }
                        later.server.runCommandSilent(`execute at ${target.getStringUuid()} run summon minecraft:wither_skull ~${offsetX} ~${offsetY} ~${offsetZ} {power:[${-offsetX * 0.1}, ${-offsetY * 0.1}, ${-offsetZ * 0.1}]}`)
                    })
                }
                for (let i = 0; i < 10; i++) {
                    Utils.server.runCommand(`tellraw @a [{"text":"<${Math.random() > 0.15 ? event.player.username : 'BEYOND'}> "},{"text":"ANNIHIL","color":"black"}]`)
                    Utils.server.runCommand(`tellraw @a [{"text":"<${Math.random() > 0.15 ? event.player.username : 'BEYOND'}> "},{"text":"ANNIHIL","color":"dark_red"}]`)
                }
            }
            if (Math.random() < 0.01) {
                Utils.server.runCommandSilent(`tellraw ${event.player.username} [{"text":"<BEYOND> "},{"text":"SUFFER","color":"dark_red"}]`)
                for (let i = 5; i < 16; i += 5) {
                    Utils.server.scheduleInTicks(i, later => {
                        later.server.runCommandSilent(`execute at ${event.player.username} run summon alexsmobs:crimson_mosquito ~ ~4 ~ {CustomName:\'{"text":"Servant of Beyond","color":"dark_red"}\',CustomNameVisible:1b,Attributes:[{Name:"generic.max_health",Base:500.0},{Name:"generic.armor",Base:20.0},{Name:"generic.attack_damage",Base:10.0}],Health:500.0}`)
                    })
                }
            }
            event.cancel()
            return
        case secret_words.fireball.toLowerCase():
            Utils.server.runCommand(`tellraw ${event.player.username} "<BEYOND> LOUDER"`)
            event.cancel()
            return
        case secret_words.slow:
            let duration = 300
            let radius = 20
            Utils.server.runCommandSilent(`execute at ${event.player.username} run summon insanelib:area_effect_cloud_3d ~ ~ ~ {CustomName:\'{"text":"Shard of Before"}\',ReapplicationDelay:0,Radius:${radius}.0f,Duration:${duration},Particle:"minecraft:ash",Effects:[{"forge:id":"minecraft:slowness",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b},{"forge:id":"minecraft:weakness",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b},{"forge:id":"minecraft:resistance",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b},{"forge:id":"minecraft:mining_fatigue",Duration:6,Amplifier:9,ShowIcon:0b,ShowParticles:0b,Ambient:0b}]}`)
            let cast_pos = event.player.position()
            let affected_entities = {}
            for (let i = 0; i < duration; i++) {
                Utils.server.scheduleInTicks(i, later => {
                    event.player.level.getEntitiesOfClass(Projectile, AABB.ofSize(cast_pos, radius, radius, radius)).forEach(entity => {
                        if (affected_entities[entity.getStringUuid()] == undefined) {
                            affected_entities[entity.getStringUuid()] = [entity, entity.getDeltaMovement()]
                            entity.setDeltaMovement(Vec3.ZERO)
                            entity.setNoGravity(true)
                        } else {
                            entity.setDeltaMovement(Vec3.ZERO)
                        }
                    })
                })
                Utils.server.scheduleInTicks(duration + 1, later => {
                    for (let entity in affected_entities) {
                        affected_entities[entity][0].setNoGravity(false)
                        affected_entities[entity][0].setDeltaMovement(affected_entities[entity][1])
                    }
                })
            }
            event.cancel()
            return
        default:
            return
    }
})