function apiFetch(cacheKey, key, url){
  var cache = CacheService.getUserCache();
  cacheKey = key + cacheKey;
  var data = cache.get(cacheKey);
  
  if(!data){
    var opt = null;
    if(key){
      opt = {
        'headers': {
          'Authorization': 'Bearer ' + key
        }
      };
    }
    data = UrlFetchApp.fetch('https://api.guildwars2.com/v2/' + url, opt);
    data = data.getContentText();
    
    cache.put(cacheKey, data);
  }
  
  return JSON.parse(data);
}
function publicApiFetch(cacheKey, url, prop){
  var cache = CacheService.getScriptCache();
  var data = cache.get(cacheKey);
  
  if(!data){
    data = UrlFetchApp.fetch('https://api.guildwars2.com/v1/' + url, prop);
    data = data.getContentText();
    
    cache.put(cacheKey, data);
  }
  
  return JSON.parse(data);
}

function getCharacterInfo(key, name){
  return apiFetch('toon-' + name, key, 'characters/' + name);
}

function getCharacterCraft(key, name, craft){
  var character = getCharacterInfo(key, name);
  craft = craft.toLowerCase();
  
  for(var i = 0; i < character.crafting.length; i++){
    var skill = character.crafting[i];
    if(skill.discipline.toLowerCase() == craft){
      return skill;
    }
  }
       
  return null;
}

/**
 * Get crafting level of a character
 *
 * @param {String} key API Key
 * @param {String} name Character name
 * @param {String} craft Crafting name (armorsmith/artificer/chef/huntsman/jeweler/leatherworker/tailor/weaponsmith/scribe)
 * @return {Number} Current level of that craft, or 0
 * @customfunction
 */
function gw2Craft(key, name, craft){
  var crafts = ['armorsmith', 'artificer', 'chef', 'huntsman', 'jeweler', 'leatherworker', 'tailor', 'weaponsmith', 'scribe'];
  if(craft == null){
    var out = crafts.map(function(skill){
      var result = gw2Craft(key, name, skill);
      if(result == 0){
        return '';
      }
      return result;
    });
    return [out];
  }
  var craft = getCharacterCraft(key, name, craft);
  return craft ? craft.rating : 0;
}

/**
 * Get character prop
 *
 * @param {String} key API Key
 * @param {String} name Character name
 * @param {String} prop Property name (name/race/gender/profession/level/deaths)
 * @customfunction
 */
function gw2Prop(key, name, prop){
  var character = getCharacterInfo(key, name);
  return character ? character[prop] : 0;
}

/**
 * Get character prop
 *
 * @param {String} key API Key
 * @param {String} name Character name
 * @return {Date} Birthday
 * @customfunction
 */
function gw2Birthday(key, name){
  var character = getCharacterInfo(key, name);
  var dates = character.created.replace(/T.*$/, '').split('-');
  return character ? new Date(parseInt(dates[0], 10), parseInt(dates[1], 10) - 1, parseInt(dates[2], 10)) : null;
}

/**
 * Get character list
 *
 * @customfunction
 */
function gw2Characters(key){
  return apiFetch('toons', key, 'characters').sort();
}

/**
 * Get guild name
 *
 * @param {String} id Guild ID (can be retrieved by gw2Prop(.., .., 'guild')
 * @return {String} Guild name
 * @customfunction
 */
function gw2GuildName(id){
  var guild = publicApiFetch('guild-' + id, 'guild_details?guild_id=' + id, {"muteHttpExceptions": true});
  return guild ? guild.guild_name : null;
}

/**
 * Get guild tag
 *
 * @param {String} id Guild ID (can be retrieved by gw2Prop(.., .., 'guild')
 * @return {String} Guild tag
 * @customfunction
 */
function gw2GuildTag(id){
  var guild = publicApiFetch('guild-' + id, 'guild_details?guild_id=' + id, {"muteHttpExceptions": true});
  return guild ? guild.tag : null;
}

/**
 * Get gw2w2w embed link for guild logo
 *
 * @param {String} name Full guild name
 * @param {Integer} size Optional. Image size. Default is 256
 * @return {String} Image url for use with =image(..)
 * @customfunction
 */
function gw2GuildLogo(name, size){
  if(!size){
    size = 256;
  }
  if(!name){
    return null;
  }
  
  name = name.replace(/ /g, '-').toLowerCase();
  
  return 'http://guilds.gw2w2w.com/guilds/' + name + '/' + size + '.svg';
}