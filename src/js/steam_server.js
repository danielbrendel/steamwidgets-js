/**
 * SteamWidgets - Steam Widgets for your website
 * 
 * Module: Steam Server Widget
 * 
 * Visit: https://github.com/danielbrendel
 */

 const STEAMWIDGETS_SERVER_ENDPOINT = 'https://www.steamwidgets.com';
 const STEAMWIDGETS_SERVER_VERSION = 'v1';
 
 /**
  * Class SteamServerElem
  * 
  * Handle custom HTML element to render Steam server widgets
  */
 class SteamServerElem extends HTMLElement
 {
     storedData = {};
     oldHeader = '';
 
     connectedCallback()
     {
         var addr = (typeof this.attributes.addr !== 'undefined') ? this.attributes.addr.value : null;
         var header = (typeof this.attributes.header !== 'undefined') ? this.attributes.header.value : '';
         var width = (typeof this.attributes.width !== 'undefined') ? this.attributes.width.value : null;
         var height = (typeof this.attributes.height !== 'undefined') ? this.attributes.height.value : null;
         var bots = (typeof this.attributes.bots !== 'undefined') ? this.attributes.bots.value : ':count bots';
         var secure_yes = (typeof this.attributes['secure-yes'] !== 'undefined') ? this.attributes['secure-yes'].value : 'secure';
         var secure_no = (typeof this.attributes['secure-no'] !== 'undefined') ? this.attributes['secure-no'].value : 'insecure';
         var hosting_dedicated = (typeof this.attributes['hosting-dedicated'] !== 'undefined') ? this.attributes['hosting-dedicated'].value : 'dedicated';
         var hosting_listen = (typeof this.attributes['hosting-listen'] !== 'undefined') ? this.attributes['hosting-listen'].value : 'listen';
         var playtext = (typeof this.attributes.playtext !== 'undefined') ? this.attributes.playtext.value : 'Join';
         var styleBorder = (typeof this.attributes['style-border'] !== 'undefined') ? this.attributes['style-border'].value : null;
         var styleShadow = (typeof this.attributes['style-shadow'] !== 'undefined') ? parseInt(this.attributes['style-shadow'].value) : 1;
         var styleColorBackground = (typeof this.attributes['style-color-background'] !== 'undefined') ? this.attributes['style-color-background'].value : null;
         var styleColorTextBright = (typeof this.attributes['style-color-text-bright'] !== 'undefined') ? this.attributes['style-color-text-bright'].value : null;
         var styleColorTextDark = (typeof this.attributes['style-color-text-dark'] !== 'undefined') ? this.attributes['style-color-text-dark'].value : null;

         if (addr !== null) {
             this.storedData = {
                 addr: addr,
                 header: header,
                 width: width,
                 height: height,
                 bots: bots,
                 secure_yes: secure_yes,
                 secure_no: secure_no,
                 hosting_dedicated: hosting_dedicated,
                 hosting_listen: hosting_listen,
                 playtext: playtext,
                 styleBorder: styleBorder,
                 styleShadow: styleShadow,
                 styleColorBackground: styleColorBackground,
                 styleColorTextBright,
                 styleColorTextDark
             };
 
             this.setupWidget(
                 addr,
                 header,
                 width,
                 height,
                 bots,
                 secure_yes,
                 secure_no,
                 hosting_dedicated,
                 hosting_listen,
                 playtext,
                 styleBorder,
                 styleShadow,
                 styleColorBackground,
                 styleColorTextBright,
                 styleColorTextDark
             );
         }
     }
 
     setupWidget(addr, header, width, height, bots, secure_yes, secure_no, hosting_dedicated, hosting_listen, playtext, styleBorder, styleShadow, styleColorBackground, styleColorTextBright, styleColorTextDark)
     {
         var req = new XMLHttpRequest();
         var self = this;

         if ((typeof self.custom_events !== 'undefined') && (typeof self.custom_events.eventOnInit !== 'undefined')) {
            self.dispatchEvent(self.custom_events.eventOnInit);
        }
 
         req.onreadystatechange = function() {
             if (req.readyState == XMLHttpRequest.DONE) {
                 let json = JSON.parse(req.responseText);

                 if (!document.getElementById('steamwidgets-server-styles')) {
                     let link = document.createElement('link');
                     link.id = 'steamwidgets-server-styles';
                     link.rel = 'stylesheet';
                     link.type = 'text/css';
                     link.href = STEAMWIDGETS_SERVER_ENDPOINT + '/api/resource/query?type=css&module=server&version=' + STEAMWIDGETS_SERVER_VERSION;
                     document.getElementsByTagName('head')[0].appendChild(link);
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

                 let bgimage = '';
                 if (header !== '') {
                    bgimage = 'background-image: url(\'' + header + '\');';
                 }

                 bots = bots.replace(':count', json.data.bots);

                 let security = '';
                 let seccol = '';
                 if (json.data.secure) {
                    security = secure_yes;
                    seccol = 'steam-server-gameinfo-item-green';
                 } else {
                    security = secure_no;
                    seccol = 'steam-server-gameinfo-item-red';
                 }

                 let hosting = '';
                 if (json.data.dedicated) {
                    hosting = hosting_dedicated;
                 } else {
                    hosting = hosting_listen;
                 }
                 
                 let html = `
                     <div class="steam-server" ` + ((widgetStyle.length > 0) ? widgetStyle: '') + `>
                         <div class="steam-server-image" style="` + bgimage + ` ` + ((header == '') ? 'display: none;' : '') + ` ` + ((height !== null) ? 'height: ' + height + 'px;' : '') + ((widgetImageStyle.length > 0) ? widgetImageStyle : '') + `"></div>
                     
                         <div class="steam-server-infos">
                            <div class="steam-server-title">
                                <div class="steam-server-title-left">
                                    <div class="steam-server-title-left-addr" ` + ((styleColorTextBright !== null) ? 'style="color: ' + styleColorTextBright + ';"' : '') + `>` + json.data.addr + `</div>
                                    <div class="steam-server-title-left-name" ` + ((styleColorTextDark !== null) ? 'style="color: ' + styleColorTextDark + ';"' : '') + `>`+ json.data.name + `</div>
                                </div>
            
                                <div class="steam-server-title-right">
                                    <div class="steam-server-title-right-count" ` + ((styleColorTextDark !== null) ? 'style="color: ' + styleColorTextDark + ';"' : '') + `>` + json.data.players + `/` + json.data.max_players + `</div>
                                    <div class="steam-server-title-right-bots" ` + ((styleColorTextDark !== null) ? 'style="color: ' + styleColorTextDark + ';"' : '') + `>` + bots + `</div>
                                </div>
                            </div>
            
                            <div class="steam-server-footer">
                                <div class="steam-server-gameinfo" ` + ((styleColorTextDark !== null) ? 'style="color: ' + styleColorTextDark + ';"' : '') + `>
                                    <span class="steam-server-gameinfo-item">` + json.data.product + `</span>
                                    |
                                    <span class="steam-server-gameinfo-item">`+ json.data.map + `</span>
                                    |
                                    <span class="steam-server-gameinfo-item ` + seccol + `">` + security + `</span>
                                    |
                                    <span class="steam-server-gameinfo-item">` + hosting + `</span>
                                </div>
            
                                <div class="steam-server-action">
                                    <a href="steam://connect/` + json.data.addr + `">` + playtext + `</a>
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
         req.open('GET', STEAMWIDGETS_SERVER_ENDPOINT + '/api/query/server?addr=' + addr, true);
         req.send();
     }
 
     updateWidget()
     {
         this.setupWidget(
            this.storedData.addr,
            this.storedData.header,
            this.storedData.width,
            this.storedData.height,
            this.storedData.bots,
            this.storedData.secure_yes,
            this.storedData.secure_no,
            this.storedData.hosting_dedicated,
            this.storedData.hosting_listen,
            this.storedData.playtext,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTextBright,
            this.storedData.styleColorTextDark,
         );
     }

     changeLang(bots, secure_yes, secure_no, hosting_dedicated, hosting_listen, playtext)
    {
        this.storedData.bots = bots;
        this.storedData.secure_yes = secure_yes;
        this.storedData.secure_no = secure_no;
        this.storedData.hosting_dedicated = hosting_dedicated;
        this.storedData.hosting_listen = hosting_listen;
        this.storedData.playtext = playtext;

        this.setupWidget(
            this.storedData.addr,
            this.storedData.header,
            this.storedData.width,
            this.storedData.height,
            this.storedData.bots,
            this.storedData.secure_yes,
            this.storedData.secure_no,
            this.storedData.hosting_dedicated,
            this.storedData.hosting_listen,
            this.storedData.playtext,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTextBright,
            this.storedData.styleColorTextDark,
        );
    }

    setImageVisibility(visibility)
    {
        if (visibility) {
            this.storedData.header = this.oldHeader;
        } else {
            if (this.storedData.header != '') {
                this.oldHeader = this.storedData.header;
            }

            this.storedData.header = '';
        }
        
        this.setupWidget(
            this.storedData.addr,
            this.storedData.header,
            this.storedData.width,
            this.storedData.height,
            this.storedData.bots,
            this.storedData.secure_yes,
            this.storedData.secure_no,
            this.storedData.hosting_dedicated,
            this.storedData.hosting_listen,
            this.storedData.playtext,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTextBright,
            this.storedData.styleColorTextDark,
        );
    }
 }
 
 window.customElements.define('steam-server', SteamServerElem);
 
 /**
  * Class SteamServer
  * 
  * Dynamically create a Steam server widget via JavaScript
  */
 class SteamServer
 {
     elem = null;
     selident = null;
     cfg = {};
 
     constructor(selector, config = {})
     {
        this.selident = selector;
        this.cfg = config;

        var addr = (typeof config.addr !== 'undefined') ? config.addr : null;
        var header = (typeof config.header !== 'undefined') ? config.header : '';
        var width = (typeof config.width !== 'undefined') ? config.width : null;
        var height = (typeof config.height !== 'undefined') ? config.height : null;
        var bots = (typeof config.bots !== 'undefined') ? config.bots : ':count bots';
        var secure_yes = (typeof config.secure_yes !== 'undefined') ? config.secure_yes : 'secure';
        var secure_no = (typeof config.secure_no !== 'undefined') ? config.secure_no : 'insecure';
        var hosting_dedicated = (typeof config.hosting_dedicated !== 'undefined') ? config.hosting_dedicated : 'dedicated';
        var hosting_listen = (typeof config.hosting_listen !== 'undefined') ? config.hosting_listen : 'listen';
        var playtext = (typeof config.playtext !== 'undefined') ? config.playtext : 'Join';

        var styleBorder = null;
        var styleShadow = 1;
        var styleColorBackground = null;
        var styleColorTextBright = null;
        var styleColorTextDark = null;

        var evtOnInit = null;
        var evtOnCompleted = null;
        
        if (typeof config.style !== 'undefined') {
            styleBorder = (typeof config.style.border !== 'undefined') ? config.style.border : null;
            styleShadow = (typeof config.style.shadow !== 'undefined') ? config.style.shadow : 1;
            styleColorBackground = (typeof config.style.colorBackground !== 'undefined') ? config.style.colorBackground : null;
            styleColorTextBright = (typeof config.style.colorTextBright !== 'undefined') ? config.style.colorTextBright : null;
            styleColorTextDark = (typeof config.style.colorTextDark !== 'undefined') ? config.style.colorTextDark : null;
        }

        if (typeof config.events !== 'undefined') {
            evtOnInit = (typeof config.events.onInit === 'function') ? config.events.onInit : null;
            evtOnCompleted = (typeof config.events.onCompleted === 'function') ? config.events.onCompleted : null;
        }

        if (typeof styleShadow === 'boolean') {
            styleShadow = (styleShadow) ? 1 : 0;
        }

        this.elem = document.createElement('steam-server');
        this.elem.setAttribute('addr', addr);
        this.elem.setAttribute('header', header);
        this.elem.setAttribute('style-border', styleBorder);
        this.elem.setAttribute('style-shadow', styleShadow);
        this.elem.setAttribute('style-color-background', styleColorBackground);
        this.elem.setAttribute('style-color-text-bright', styleColorTextBright);
        this.elem.setAttribute('style-color-text-dark', styleColorTextDark);
        this.elem.setAttribute('bots', bots);
        this.elem.setAttribute('secure-yes', secure_yes);
        this.elem.setAttribute('secure-no', secure_no);
        this.elem.setAttribute('hosting-dedicated', hosting_dedicated);
        this.elem.setAttribute('hosting-listen', hosting_listen);
        this.elem.setAttribute('playtext', playtext);

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

     changeLang(bots, secure_yes, secure_no, hosting_dedicated, hosting_listen, playtext)
     {
        this.elem.changeLang(bots, secure_yes, secure_no, hosting_dedicated, hosting_listen, playtext);
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
 