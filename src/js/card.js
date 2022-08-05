/**
 * Class SteamCard
 * 
 * Dynamically create a Steam Card via JavaScript
 */
module.exports = class SteamCard
{
    constructor(selector, config)
    {
        var appid = (typeof config.appid !== 'undefined') ? config.appid : null;
        var lang = (typeof config.lang !== 'undefined') ? config.lang : 'english';
        var playtext = (typeof config.playtext !== 'undefined') ? config.playtext : 'Play on Steam';
        var author = (typeof config.author !== 'undefined') ? config.author : 'By :developer';
        var width = (typeof config.width !== 'undefined') ? config.width : null;
        var height = (typeof config.height !== 'undefined') ? config.height : null;
        var clean = (typeof config.clean !== 'undefined') ? true : false;

        let elem = document.createElement('steam-card');
        elem.setAttribute('appid', appid);
        elem.setAttribute('lang', lang);
        elem.setAttribute('playtext', playtext);
        elem.setAttribute('author', author);

        if (width !== null) {
            elem.setAttribute('width', width);
        }

        if (height !== null) {
            elem.setAttribute('height', height);
        }

        let sel = document.querySelector(selector);
        if (clean) { sel.innerHTML = ''; }
        sel.appendChild(elem);
    }
}