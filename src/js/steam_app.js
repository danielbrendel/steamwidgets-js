/**
 * SteamWidgets - Steam Widgets for your website
 * 
 * Module: Steam Game/App Widget
 * 
 * Visit: https://github.com/danielbrendel
 */

const STEAMWIDGETS_APP_ENDPOINT = 'https://www.steamwidgets.com';
const STEAMWIDGETS_APP_VERSION = 'v1';

/**
 * Class SteamAppElem
 * 
 * Handle custom HTML element to render Steam app/game widgets
 */
class SteamAppElem extends HTMLElement
{
    storedData = {};

    connectedCallback()
    {
        var appid = (typeof this.attributes.appid !== 'undefined') ? this.attributes.appid.value : null;
        var lang = (typeof this.attributes.lang !== 'undefined') ? this.attributes.lang.value : 'english';
        var playtext = (typeof this.attributes.playtext !== 'undefined') ? this.attributes.playtext.value : 'Play on Steam';
        var author = (typeof this.attributes.author !== 'undefined') ? this.attributes.author.value : 'By :developer';
        var onlinecount = (typeof this.attributes.onlinecount !== 'undefined') ? this.attributes.onlinecount.value : null;
        var rating = (typeof this.attributes.rating !== 'undefined') ? parseInt(this.attributes.rating.value) : 0;
        var width = (typeof this.attributes.width !== 'undefined') ? this.attributes.width.value : null;
        var height = (typeof this.attributes.height !== 'undefined') ? this.attributes.height.value : null;
        var styleBorder = (typeof this.attributes['style-border'] !== 'undefined') ? this.attributes['style-border'].value : null;
        var styleShadow = (typeof this.attributes['style-shadow'] !== 'undefined') ? parseInt(this.attributes['style-shadow'].value) : 1;
        var styleColorBackground = (typeof this.attributes['style-color-background'] !== 'undefined') ? this.attributes['style-color-background'].value : null;
        var styleColorTitle = (typeof this.attributes['style-color-title'] !== 'undefined') ? this.attributes['style-color-title'].value : null;
        var styleColorDescription = (typeof this.attributes['style-color-description'] !== 'undefined') ? this.attributes['style-color-description'].value : null;
        var styleColorAuthor = (typeof this.attributes['style-color-author'] !== 'undefined') ? this.attributes['style-color-author'].value : null;
        var styleColorOnlinecount = (typeof this.attributes['style-color-onlinecount'] !== 'undefined') ? this.attributes['style-color-onlinecount'].value : null;
        var styleHideImage = (typeof this.attributes['style-hideimage'] !== 'undefined') ? parseInt(this.attributes['style-hideimage'].value) : 0;

        if (appid !== null) {
            this.storedData = {
                appid: appid,
                lang: lang,
                playtext: playtext,
                author: author,
                onlinecount: onlinecount,
                rating: rating,
                width: width,
                height: height,
                styleBorder: styleBorder,
                styleShadow: styleShadow,
                styleColorBackground: styleColorBackground,
                styleColorTitle: styleColorTitle,
                styleColorDescription: styleColorDescription,
                styleColorAuthor: styleColorAuthor,
                styleColorOnlinecount: styleColorOnlinecount,
                styleHideImage: styleHideImage
            };

            this.setupWidget(
                appid,
                lang,
                playtext,
                author,
                onlinecount,
                rating,
                width,
                height,
                styleBorder,
                styleShadow,
                styleColorBackground,
                styleColorTitle,
                styleColorDescription,
                styleColorAuthor,
                styleColorOnlinecount,
                styleHideImage
            );
        }
    }

    setupWidget(appid, lang, playtext, author, onlinecount, rating, width, height, styleBorder, styleShadow, styleColorBackground, styleColorTitle, styleColorDescription, styleColorAuthor, styleColorOnlinecount, styleHideImage)
    {
        var req = new XMLHttpRequest();
        var self = this;

        if ((typeof self.custom_events !== 'undefined') && (typeof self.custom_events.eventOnInit !== 'undefined')) {
            self.dispatchEvent(self.custom_events.eventOnInit);
        }

        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(req.responseText);
                
                if (author.indexOf(':developer') !== false) {
                    let developers = '';

                    json.data.developers.forEach(function(elem, index) {
                        developers += elem;

                        if (index < json.data.developers.length - 1) {
                            developers += ', ';
                        }
                    });

                    author = author.replace(':developer', developers);
                } 
                
                if (author.indexOf(':publisher') !== false) {
                    let publishers = '';

                    json.data.publishers.forEach(function(elem, index) {
                        publishers += elem;

                        if (index < json.data.publishers.length - 1) {
                            publishers += ', ';
                        }
                    });

                    author = author.replace(':publisher', publishers);
                }

                if (!document.getElementById('steamwidgets-app-styles')) {
                    let link = document.createElement('link');
                    link.id = 'steamwidgets-app-styles';
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = STEAMWIDGETS_APP_ENDPOINT + '/api/resource/query?type=css&module=app&version=' + STEAMWIDGETS_APP_VERSION;
                    document.getElementsByTagName('head')[0].appendChild(link);
                }

                let onlineCountText = '';
                if ((onlinecount !== null) && (json.data.online_count > 0)) {
                    onlineCountText = onlinecount;
                    onlineCountText = onlineCountText.replace(':count', self.readableCount(json.data.online_count));
                }

                let widgetImageStyle = '';

                let widgetStyle = '';
                if ((width !== null) || (styleBorder !== null) || (styleShadow !== true) || (styleColorBackground !== null)) {
                    let widthCode = '';
                    if (width !== null) {
                        widthCode = 'max-width: ' + width + 'px;';
                    }

                    let borderCode = '';
                    if (styleBorder !== null) {
                        if (styleBorder === 'max') {
                            borderCode = 'border-radius: 25px;';
                            widgetImageStyle = 'border-top-left-radius: 25px; border-top-right-radius: 25px;';
                        } else if (styleBorder === 'small') {
                            borderCode = 'border-radius: 4px;';
                            widgetImageStyle = 'border-top-left-radius: 4px; border-top-right-radius: 4px;';
                        } else if (styleBorder === 'none') {
                            borderCode = 'border-radius: unset;';
                            widgetImageStyle = 'border-top-left-radius: unset; border-top-right-radius: unset;';
                        }
                    }

                    let shadowCode = '';
                    if (!styleShadow) {
                        shadowCode = 'box-shadow: unset;';
                    }

                    let bgColor = '';
                    if (styleColorBackground !== null) {
                        bgColor = 'background-color: ' + styleColorBackground + ';';
                    }

                    widgetStyle = 'style="' + widthCode + borderCode + shadowCode + bgColor + '"';
                }
                
                let ratingCode = '';
                if (rating) {
                    ratingCode = '<br/>';

                    for (let i = 0; i < Math.round(json.data.rating_count / 2); i++) {
                        ratingCode += '<span>&#x2B50;</span>';
                    }

                    for (let i = Math.round(json.data.rating_count / 2); i < 5; i++) {
                        ratingCode += '<span class="steam-app-title-left-rating-star-grey">&#x2B50;</span>';
                    }
                }

                let html = `
                    <div class="steam-app" ` + ((widgetStyle.length > 0) ? widgetStyle: '') + `>
                        <div class="steam-app-image" style="background-image: url('` + json.data.header_image + `'); ` + ((height !== null) ? 'height: ' + height + 'px;' : '') + ((widgetImageStyle.length > 0) ? widgetImageStyle : '') + ((styleHideImage) ? 'display: none;' : '') + `"></div>
                    
                        <div class="steam-app-infos">
                            <div class="steam-app-title">
                                <div class="steam-app-title-left">
                                    <div class="steam-app-title-left-name" ` + ((styleColorTitle !== null) ? 'style="color: ' + styleColorTitle + ';"' : '') + `>` + json.data.name + `</div>
                                    <div class="steam-app-title-left-rating">` + ratingCode + `</div>
                                </div>
                                
                                <div class="steam-app-title-right" ` + ((styleColorOnlinecount !== null) ? 'style="color: ' + styleColorOnlinecount + ';"' : '') + `>` + ((onlineCountText.length > 0) ? onlineCountText : '') + `</div>
                            </div>
                            
                            <div class="steam-app-description" ` + ((styleColorDescription !== null) ? 'style="color: ' + styleColorDescription + ';"' : '') + `>
                                ` + json.data.short_description + `
                            </div>
                            
                            <div class="steam-app-footer">
                                <div class="steam-app-footer-author" ` + ((styleColorAuthor !== null) ? 'style="color: ' + styleColorAuthor + ';"' : '') + `>
                                    ` + author + `
                                </div>
                                
                                <div class="steam-app-footer-button">
                                    <a href="https://store.steampowered.com/app/` + json.appid + `">` + playtext + `</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                self.innerHTML = html;

                if ((typeof self.custom_events !== 'undefined') && (typeof self.custom_events.eventOnCompleted !== 'undefined')) {
                    self.dispatchEvent(self.custom_events.eventOnCompleted);
                }
            }
        };
        req.open('GET', STEAMWIDGETS_APP_ENDPOINT + '/api/query/app?appid=' + appid + '&lang=' + lang, true);
        req.send();
    }

    updateWidget()
    {
        this.setupWidget(
            this.storedData.appid,
            this.storedData.lang,
            this.storedData.playtext,
            this.storedData.author,
            this.storedData.onlinecount,
            this.storedData.rating,
            this.storedData.width,
            this.storedData.height,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorAuthor,
            this.storedData.styleColorOnlinecount,
            this.storedData.styleHideImage
        );
    }

    changeLang(lang, playtext, author, onlinecount)
    {
        this.storedData.lang = lang;
        this.storedData.playtext = playtext;
        this.storedData.author = author;
        this.storedData.onlinecount = onlinecount;

        this.setupWidget(
            this.storedData.appid,
            this.storedData.lang,
            this.storedData.playtext,
            this.storedData.author,
            this.storedData.onlinecount,
            this.storedData.rating,
            this.storedData.width,
            this.storedData.height,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorAuthor,
            this.storedData.styleColorOnlinecount,
            this.storedData.styleHideImage
        );
    }

    setImageVisibility(visibility)
    {
        this.storedData.styleHideImage = !visibility;

        this.setupWidget(
            this.storedData.appid,
            this.storedData.lang,
            this.storedData.playtext,
            this.storedData.author,
            this.storedData.onlinecount,
            this.storedData.rating,
            this.storedData.width,
            this.storedData.height,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorAuthor,
            this.storedData.styleColorOnlinecount,
            this.storedData.styleHideImage
        );
    }

    readableCount(count)
    {
        const COUNT_MILLION = 1000000;
        const COUNT_HUNDREDTHOUSAND = 100000;
        const COUNT_TENTHOUSAND = 10000;
        const COUNT_THOUSAND = 1000;

        if (count >= COUNT_MILLION) {
            return (Math.round(count / COUNT_MILLION, 1)).toString() + 'M';
        } else if ((count < COUNT_MILLION) && (count >= COUNT_HUNDREDTHOUSAND)) {
            return (Math.round(count / COUNT_THOUSAND, 1)).toString() + 'K';
        } else if ((count < COUNT_HUNDREDTHOUSAND) && (count >= COUNT_TENTHOUSAND)) {
            return (Math.round(count / COUNT_THOUSAND, 1)).toString() + 'K';
        } else if ((count < COUNT_TENTHOUSAND) && (count >= COUNT_THOUSAND)) {
            return (Math.round(count / COUNT_THOUSAND, 1)).toString() + 'K';
        } else {
            return count.toString();
        }
    }
}

window.customElements.define('steam-app', SteamAppElem);

/**
 * Class SteamApp
 * 
 * Dynamically create a Steam game/app widget via JavaScript
 */
class SteamApp
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
        var rating = (typeof config.rating !== 'undefined') ? config.rating : 0;
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

        var evtOnInit = null;
        var evtOnCompleted = null;
        
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

        if (typeof config.events !== 'undefined') {
            evtOnInit = (typeof config.events.onInit === 'function') ? config.events.onInit : null;
            evtOnCompleted = (typeof config.events.onCompleted === 'function') ? config.events.onCompleted : null;
        }

        if (typeof rating === 'boolean') {
            rating = (rating) ? 1 : 0;
        }

        if (typeof styleShadow === 'boolean') {
            styleShadow = (styleShadow) ? 1 : 0;
        }

        if (typeof styleHideImage === 'boolean') {
            styleHideImage = (styleHideImage) ? 1 : 0;
        }

        this.elem = document.createElement('steam-app');
        this.elem.setAttribute('appid', appid);
        this.elem.setAttribute('lang', lang);
        this.elem.setAttribute('playtext', playtext);
        this.elem.setAttribute('author', author);
        this.elem.setAttribute('rating', rating);
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

        this.elem.custom_events = {};

        if (evtOnInit !== null) {
            this.elem.custom_events.eventOnInit = new CustomEvent('onInit', { detail: this });
            this.elem.addEventListener('onInit', evtOnInit, false);
        }

        if (evtOnCompleted !== null) {
            this.elem.custom_events.eventOnCompleted = new CustomEvent('onCompleted', { detail: this });
            this.elem.addEventListener('onCompleted', evtOnCompleted, false);
        }

        let sel = document.querySelector(selector);
        if (sel) {
            sel.appendChild(this.elem);
        }
    }

    updateWidget()
    {
        this.elem.updateWidget();
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
