/**
 * Class SteamCard
 * 
 * Dynamically create a Steam Card via JavaScript
 */
module.exports = class SteamCard
{
    constructor(selector, config = {})
    {
        var appid = (typeof config.appid !== 'undefined') ? config.appid : null;
        var lang = (typeof config.lang !== 'undefined') ? config.lang : 'english';
        var onlinecount = (typeof config.onlinecount !== 'undefined') ? config.onlinecount : null;
        var playtext = (typeof config.playtext !== 'undefined') ? config.playtext : 'Play on Steam';
        var author = (typeof config.author !== 'undefined') ? config.author : 'By :developer';
        var width = (typeof config.width !== 'undefined') ? config.width : null;
        var height = (typeof config.height !== 'undefined') ? config.height : null;

        var styleBorder = null;
        var styleShadow = true;
        var styleColorBackground = null;
        var styleColorTitle = null;
        var styleColorDescription = null;
        var styleColorAuthor = null;
        var styleColorOnlinecount = null;
        
        if (typeof config.style !== 'undefined') {
            styleBorder = (typeof config.style.border !== 'undefined') ? config.style.border : null;
            styleShadow = (typeof config.style.shadow !== 'undefined') ? config.style.shadow : true;
            styleColorBackground = (typeof config.style.colorBackground !== 'undefined') ? config.style.colorBackground : null;
            styleColorTitle = (typeof config.style.colorTitle !== 'undefined') ? config.style.colorTitle : null;
            styleColorDescription = (typeof config.style.colorDescription !== 'undefined') ? config.style.colorDescription : null;
            styleColorAuthor = (typeof config.style.colorAuthor !== 'undefined') ? config.style.colorAuthor : null;
            styleColorOnlinecount = (typeof config.style.colorOnlinecount !== 'undefined') ? config.style.colorOnlinecount : null;
        }

        let elem = document.createElement('steam-card');
        elem.setAttribute('appid', appid);
        elem.setAttribute('lang', lang);
        elem.setAttribute('playtext', playtext);
        elem.setAttribute('author', author);
        elem.setAttribute('style-border', styleBorder);
        elem.setAttribute('style-shadow', styleShadow);
        elem.setAttribute('style-color-background', styleColorBackground);
        elem.setAttribute('style-color-title', styleColorTitle);
        elem.setAttribute('style-color-description', styleColorDescription);
        elem.setAttribute('style-color-author', styleColorAuthor);
        elem.setAttribute('style-color-onlinecount', styleColorOnlinecount);

        if (onlinecount !== null) {
            elem.setAttribute('onlinecount', onlinecount);
        }

        if (width !== null) {
            elem.setAttribute('width', width);
        }

        if (height !== null) {
            elem.setAttribute('height', height);
        }

        let sel = document.querySelector(selector);
        if (sel) {
            sel.appendChild(elem);
        }
    }
}