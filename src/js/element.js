/**
 * SteamCards - Steam Cards for your website
 * 
 * Visit: https://github.com/danielbrendel
 */

const STEAM_CARD_ENDPOINT = 'http://localhost:8000/api/v1/query';

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
        var width = (typeof this.attributes.width !== 'undefined') ? this.attributes.width.value : null;
        var height = (typeof this.attributes.height !== 'undefined') ? this.attributes.height.value : null;
        
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

                    let html = `
                        <div class="steam-card" ` + ((width !== null) ? 'style="max-width: ' + width + 'px;"': '') + `>
                            <div class="steam-card-image" style="background-image: url('` + json.data.header_image + `'); ` + ((height !== null) ? 'height: ' + height + 'px;' : '') + `"></div>
                        
                            <div class="steam-card-infos">
                                <div class="steam-card-title">
                                    ` + json.data.name + `
                                </div>
                                
                                <div class="steam-card-description">
                                    ` + json.data.short_description + `
                                </div>
                                
                                <div class="steam-card-footer">
                                    <div class="steam-card-footer-author">
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
            req.open('GET', STEAM_CARD_ENDPOINT + '?appid=' + appid + '&lang=' + lang, true);
            req.send();
        }
    }
}

window.customElements.define('steam-card', SteamCardElem);
