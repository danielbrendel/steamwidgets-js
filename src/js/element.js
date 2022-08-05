const STEAM_CARD_ENDPOINT = 'https://www.steamcards.net';
const STEAM_CARD_VERSION = 'v1';

/**
 * Class SteamCardElem
 * 
 * Handle custom HTML element to render Steam Cards
 */
class SteamCardElem extends HTMLElement
{
    connectedCallback()
    {
        var appid = (typeof this.attributes.appid !== 'undefined') ? this.attributes.appid.value : null;
        var lang = (typeof this.attributes.lang !== 'undefined') ? this.attributes.lang.value : 'english';
        var playtext = (typeof this.attributes.playtext !== 'undefined') ? this.attributes.playtext.value : 'Play on Steam';
        var author = (typeof this.attributes.author !== 'undefined') ? this.attributes.author.value : 'By :developer';
        var onlinecount = (typeof this.attributes.onlinecount !== 'undefined') ? this.attributes.onlinecount.value : null;
        var width = (typeof this.attributes.width !== 'undefined') ? this.attributes.width.value : null;
        var height = (typeof this.attributes.height !== 'undefined') ? this.attributes.height.value : null;
        var styleBorder = (typeof this.attributes['style-border'] !== 'undefined') ? this.attributes['style-border'].value : null;
        var styleShadow = (typeof this.attributes['style-shadow'] !== 'undefined') ? this.attributes['style-shadow'].value : true;
        var styleColorBackground = (typeof this.attributes['style-color-background'] !== 'undefined') ? this.attributes['style-color-background'].value : null;
        var styleColorTitle = (typeof this.attributes['style-color-title'] !== 'undefined') ? this.attributes['style-color-title'].value : null;
        var styleColorDescription = (typeof this.attributes['style-color-description'] !== 'undefined') ? this.attributes['style-color-description'].value : null;
        var styleColorAuthor = (typeof this.attributes['style-color-author'] !== 'undefined') ? this.attributes['style-color-author'].value : null;
        var styleColorOnlinecount = (typeof this.attributes['style-color-onlinecount'] !== 'undefined') ? this.attributes['style-color-onlinecount'].value : null;

        if (appid !== null) {
            var req = new XMLHttpRequest();
            var self = this;

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

                    if (!document.getElementById('steamcards-styles')) {
                        let link = document.createElement('link');
                        link.id = 'steamcards-styles';
                        link.rel = 'stylesheet';
                        link.type = 'text/css';
                        link.href = STEAM_CARD_ENDPOINT + '/api/resource/query?type=css&version=' + STEAM_CARD_VERSION;
                        document.getElementsByTagName('head')[0].appendChild(link);
                    }

                    let onlineCountText = '';
                    if ((onlinecount !== null) && (json.data.online_count > 0)) {
                        onlineCountText = onlinecount;
                        onlineCountText = onlineCountText.replace(':count', self.readableCount(json.data.online_count));
                    }

                    let cardImageStyle = '';

                    let cardStyle = '';
                    if ((width !== null) || (styleBorder !== null) || (styleShadow !== true) || (styleColorBackground !== null)) {
                        let widthCode = '';
                        if (width !== null) {
                            widthCode = 'max-width: ' + width + 'px;';
                        }

                        let borderCode = '';
                        if (styleBorder !== null) {
                            if (styleBorder === 'max') {
                                borderCode = 'border-radius: 25px;';
                                cardImageStyle = 'border-top-left-radius: 25px; border-top-right-radius: 25px;';
                            } else if (styleBorder === 'small') {
                                borderCode = 'border-radius: 4px;';
                                cardImageStyle = 'border-top-left-radius: 4px; border-top-right-radius: 4px;';
                            } else if (styleBorder === 'none') {
                                borderCode = 'border-radius: unset;';
                                cardImageStyle = 'border-top-left-radius: unset; border-top-right-radius: unset;';
                            }
                        }

                        let shadowCode = '';
                        if (!parseInt(styleShadow)) {
                            shadowCode = 'box-shadow: unset;';
                        }

                        let bgColor = '';
                        if (styleColorBackground !== null) {
                            bgColor = 'background-color: ' + styleColorBackground + ';';
                        }

                        cardStyle = 'style="' + widthCode + borderCode + shadowCode + bgColor + '"';
                    }

                    let html = `
                        <div class="steam-card" ` + ((cardStyle.length > 0) ? cardStyle: '') + `>
                            <div class="steam-card-image" style="background-image: url('` + json.data.header_image + `'); ` + ((height !== null) ? 'height: ' + height + 'px;' : '') + ((cardImageStyle.length > 0) ? cardImageStyle : '') + `"></div>
                        
                            <div class="steam-card-infos">
                                <div class="steam-card-title">
                                    <div class="steam-card-title-name" ` + ((styleColorTitle !== null) ? 'style="color: ' + styleColorTitle + ';"' : '') + `>` + json.data.name + `</div>
                                    <div class="steam-card-title-count" ` + ((styleColorOnlinecount !== null) ? 'style="color: ' + styleColorOnlinecount + ';"' : '') + `>` + ((onlineCountText.length > 0) ? onlineCountText : '') + `</div>
                                </div>
                                
                                <div class="steam-card-description" ` + ((styleColorDescription !== null) ? 'style="color: ' + styleColorDescription + ';"' : '') + `>
                                    ` + json.data.short_description + `
                                </div>
                                
                                <div class="steam-card-footer">
                                    <div class="steam-card-footer-author" ` + ((styleColorAuthor !== null) ? 'style="color: ' + styleColorAuthor + ';"' : '') + `>
                                        ` + author + `
                                    </div>
                                    
                                    <div class="steam-card-footer-button">
                                        <a href="https://store.steampowered.com/app/` + json.appid + `">` + playtext + `</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    self.innerHTML = html;
                }
            };
            req.open('GET', STEAM_CARD_ENDPOINT + '/api/' + STEAM_CARD_VERSION + '/query?appid=' + appid + '&lang=' + lang, true);
            req.send();
        }
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

window.customElements.define('steam-card', SteamCardElem);
