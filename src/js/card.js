/**
 * Class SteamCard
 * 
 * Dynamically create a Steam Card via JavaScript
 */
module.exports = class SteamCard
{
    elem = null;
    selident = null;
    cfg = {};

    constructor(selector, config = {})
    {
        this.selident = selector;
        this.cfg = config;

        var appid = (typeof config.appid !== 'undefined') ? config.appid : null;
        var lang = (typeof config.lang !== 'undefined') ? config.lang : 'english';
        var onlinecount = (typeof config.onlinecount !== 'undefined') ? config.onlinecount : null;
        var playtext = (typeof config.playtext !== 'undefined') ? config.playtext : 'Play on Steam';
        var author = (typeof config.author !== 'undefined') ? config.author : 'By :developer';
        var width = (typeof config.width !== 'undefined') ? config.width : null;
        var height = (typeof config.height !== 'undefined') ? config.height : null;

        var styleBorder = null;
        var styleShadow = 1;
        var styleColorBackground = null;
        var styleColorTitle = null;
        var styleColorDescription = null;
        var styleColorAuthor = null;
        var styleColorOnlinecount = null;
        var styleHideImage = 0;
        
        if (typeof config.style !== 'undefined') {
            styleBorder = (typeof config.style.border !== 'undefined') ? config.style.border : null;
            styleShadow = (typeof config.style.shadow !== 'undefined') ? config.style.shadow : 1;
            styleColorBackground = (typeof config.style.colorBackground !== 'undefined') ? config.style.colorBackground : null;
            styleColorTitle = (typeof config.style.colorTitle !== 'undefined') ? config.style.colorTitle : null;
            styleColorDescription = (typeof config.style.colorDescription !== 'undefined') ? config.style.colorDescription : null;
            styleColorAuthor = (typeof config.style.colorAuthor !== 'undefined') ? config.style.colorAuthor : null;
            styleColorOnlinecount = (typeof config.style.colorOnlinecount !== 'undefined') ? config.style.colorOnlinecount : null;
            styleHideImage = (typeof config.style.hideimage !== 'undefined') ? config.style.hideimage : 0;
        }

        if (typeof styleShadow === 'boolean') {
            styleShadow = (styleShadow) ? 1 : 0;
        }

        if (typeof styleHideImage === 'boolean') {
            styleHideImage = (styleHideImage) ? 1 : 0;
        }

        this.elem = document.createElement('steam-card');
        this.elem.setAttribute('appid', appid);
        this.elem.setAttribute('lang', lang);
        this.elem.setAttribute('playtext', playtext);
        this.elem.setAttribute('author', author);
        this.elem.setAttribute('style-border', styleBorder);
        this.elem.setAttribute('style-shadow', styleShadow);
        this.elem.setAttribute('style-color-background', styleColorBackground);
        this.elem.setAttribute('style-color-title', styleColorTitle);
        this.elem.setAttribute('style-color-description', styleColorDescription);
        this.elem.setAttribute('style-color-author', styleColorAuthor);
        this.elem.setAttribute('style-color-onlinecount', styleColorOnlinecount);
        this.elem.setAttribute('style-hideimage', styleHideImage);

        if (onlinecount !== null) {
            this.elem.setAttribute('onlinecount', onlinecount);
        }

        if (width !== null) {
            this.elem.setAttribute('width', width);
        }

        if (height !== null) {
            this.elem.setAttribute('height', height);
        }

        let sel = document.querySelector(selector);
        if (sel) {
            sel.appendChild(this.elem);
        }
    }

    updateCard()
    {
        this.elem.updateCard();
    }

    changeLang(lang, playtext, author, onlinecount)
    {
        this.elem.changeLang(lang, playtext, author, onlinecount);
    }

    setImageVisibility(visibility)
    {
        this.elem.setImageVisibility(visibility);
    }

    remove()
    {
        this.elem.remove();
    }
}