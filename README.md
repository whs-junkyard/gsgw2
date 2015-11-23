# Guild Wars 2 Custom Functions for Google Spreadsheet

Even with 5 characters, I found that it is hard to keep track of each characters you have. Which one can open which dungeons? Crafting profession and levels? Story completion? So I decided to make a spreadsheet. After a month I found it to be outdated very quickly and so I decided to wrote this script to automatically update everything that is available in the API.

[Demo](https://docs.google.com/spreadsheets/d/1jjBot_cBTYSQe1i1hpLTVsKRVTK9SzUUlpLFbh4fc9M/edit?usp=sharing)

Note that some fields are not yet available in the API. You can duplicate it and change `A2` to your API key to see your own characters.

## Installation

1. Create a spreadsheet
2. Tool > Script editor
3. Copy the contents of [code.gs](code.gs) into the editor and save
4. Start using new functions

You can get your API key at [https://account.arena.net/applications](https://account.arena.net/applications)

## Documentation

### gw2Craft
Get crafting level of a character.

Valid crafting professions are `armorsmith artificer chef huntsman jeweler leatherworker tailor weaponsmith scribe` (case insensitive). If profession name is omitted, list all profession levels in that order. Note that this is [more optimized](https://developers.google.com/apps-script/best_practices#batchOperations) than querying them one by one.
#### Example
Code | Result
-----|-------
`=gw2Craft("API Key", "Character Name", "Armorsmith")` | 500
`=gw2Craft("API Key", "Character Name", "chef")` | 400

`=gw2Craft("API Key", "Character Name")`

**Result:**

<table>
<tr><td></td><td></td><td></td><td></td><td>400</td><td></td><td>500</td><td></td><td></td></tr>
</table>

### gw2Prop
Get property of character JSON.

Example of valid keys: `name race gender profession level deaths`
#### Example
Code | Result
-----|-------
`=gw2Prop("API Key", "Character Name", "race")` | Sylvari
`=gw2Prop("API Key", "Character Name", "Gender")` | Male
`=gw2Prop("API Key", "Character Name", "profession")` | Elementalist
`=gw2Prop("API Key", "Character Name", "level")` | 80
`=gw2Prop("API Key", "Character Name", "deaths")` | 2500
`=gw2Prop("API Key", "Character Name", "guild")` | 75D0036F-C182-E411-863C-E4115BDF481D

### gw2Birthday
Get character birthday as a date. Note that the time portion is ignored
#### Example
Code | Result
-----|-------
`=gw2Birthday("API Key", "Character Name")` | 25/4/2015

### gw2Characters
Get list of characters in an account, one row per character.

The character names will always be sorted ascendingly (as the API seems to return them in random order). If you create new character, adjacent columns may need to be movedd.
#### Example
`=gw2Characters("API Key")`

**Result:**

<table>
<tr><td>Kasamori</td></tr>
<tr><td>Mymap</td></tr>
<tr><td>Naree Phol</td></tr>
<tr><td>Zemoregal</td></tr>
</table>

### gw2GuildName
Get guild name from guild ID.

#### Example
Code | Result
-----|-------
`=gw2GuildName("4BBB52AA-D768-4FC6-8EDE-C299F2822F0F")` | ArenaNet
`=gw2GuildName(gw2Prop("API Key", "Character Name", "guild"))` | Player Authority

### gw2GuildTag
Get guild tag from guild ID.

#### Example
Code | Result
-----|-------
`=gw2GuildTag("75D0036F-C182-E411-863C-E4115BDF481D")` | PA
`=gw2GuildTag(gw2Prop("API Key", "Character Name", "guild"))` | PA

### gw2GuildLogo
Get gw2w2w guild logo image from guild name. Useful with `=image()`

#### Example
Code | Result
-----|-------
`=gw2GuildImage("Player Authority")` | http://guilds.gw2w2w.com/guilds/player-authority/256.svg
`=image(gw2GuildImage("Player Authority"))` | ![Guild Logo](http://guilds.gw2w2w.com/guilds/player-authority/32.svg) *(resized for example)*


## License

This code is licensed under MIT license. The public demo template was copied from [/u/13moonsago](https://www.reddit.com/r/Guildwars2/comments/2zs80m/online_character_tracking_spreadsheet/cpoj5f0)'s template.

If you found this script useful, please consider a [donation](http://portfolio.whs.in.th/donate.html), or in game donation to awkwin.3196
