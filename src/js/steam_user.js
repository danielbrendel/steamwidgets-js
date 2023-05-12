/**
 * SteamWidgets - Steam Widgets for your website
 * 
 * Module: Steam User Widget
 * 
 * Visit: https://github.com/danielbrendel
 */

 const STEAMWIDGETS_USER_ENDPOINT = 'https://www.steamwidgets.com';
 const STEAMWIDGETS_USER_VERSION = 'v1';
 
 /**
  * Class SteamUserElem
  * 
  * Handle custom HTML element to render Steam user widgets
  */
 class SteamUserElem extends HTMLElement
 {
     storedData = {};
     oldHeader = '';
 
     connectedCallback()
     {
         var steamid = (typeof this.attributes.steamid !== 'undefined') ? this.attributes.steamid.value : null;
         var header = (typeof this.attributes.header !== 'undefined') ? this.attributes.header.value : '';
         var width = (typeof this.attributes.width !== 'undefined') ? this.attributes.width.value : null;
         var height = (typeof this.attributes.height !== 'undefined') ? this.attributes.height.value : null;
         var online_yes = (typeof this.attributes['online-yes'] !== 'undefined') ? this.attributes['online-yes'].value : 'online';
         var online_no = (typeof this.attributes['online-no'] !== 'undefined') ? this.attributes['online-no'].value : 'offline';
         var member_since = (typeof this.attributes['member-since'] !== 'undefined') ? this.attributes['member-since'].value : 'Member since: :year-:month-:day';
         var viewtext = (typeof this.attributes.viewtext !== 'undefined') ? this.attributes.viewtext.value : 'View';
         var styleBorder = (typeof this.attributes['style-border'] !== 'undefined') ? this.attributes['style-border'].value : null;
         var styleShadow = (typeof this.attributes['style-shadow'] !== 'undefined') ? parseInt(this.attributes['style-shadow'].value) : 1;
         var styleColorBackground = (typeof this.attributes['style-color-background'] !== 'undefined') ? this.attributes['style-color-background'].value : null;
         var styleColorTextBright = (typeof this.attributes['style-color-text-bright'] !== 'undefined') ? this.attributes['style-color-text-bright'].value : null;
         var styleColorTextDark = (typeof this.attributes['style-color-text-dark'] !== 'undefined') ? this.attributes['style-color-text-dark'].value : null;

         if (steamid !== null) {
             this.storedData = {
                 steamid: steamid,
                 header: header,
                 width: width,
                 height: height,
                 online_yes: online_yes,
                 online_no: online_no,
                 member_since: member_since,
                 viewtext: viewtext,
                 styleBorder: styleBorder,
                 styleShadow: styleShadow,
                 styleColorBackground: styleColorBackground,
                 styleColorTextBright,
                 styleColorTextDark
             };
 
             this.setupWidget(
                 steamid,
                 header,
                 width,
                 height,
                 online_yes,
                 online_no,
                 member_since,
                 viewtext,
                 styleBorder,
                 styleShadow,
                 styleColorBackground,
                 styleColorTextBright,
                 styleColorTextDark
             );
         }
     }
 
     setupWidget(steamid, header, width, height, online_yes, online_no, member_since, viewtext, styleBorder, styleShadow, styleColorBackground, styleColorTextBright, styleColorTextDark)
     {
         var req = new XMLHttpRequest();
         var self = this;

         if ((typeof self.custom_events !== 'undefined') && (typeof self.custom_events.eventOnInit !== 'undefined')) {
            self.dispatchEvent(self.custom_events.eventOnInit);
         }
 
         req.onreadystatechange = function() {
             if (req.readyState == XMLHttpRequest.DONE) {
                 let json = JSON.parse(req.responseText);
                 
                 if (!document.getElementById('steamwidgets-user-styles')) {
                     let link = document.createElement('link');
                     link.id = 'steamwidgets-user-styles';
                     link.rel = 'stylesheet';
                     link.type = 'text/css';
                     link.href = STEAMWIDGETS_USER_ENDPOINT + '/api/resource/query?type=css&module=user&version=' + STEAMWIDGETS_USER_VERSION;
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

                 let onstatus = '';
                 let oncolor = '';
                 if (json.data.personastate) {
                    onstatus = online_yes;
                    oncolor = 'steam-user-infos-right-online-green';
                 } else {
                    onstatus = online_no;
                    oncolor = '';
                 }

                 let regdate = new Date(json.data.timecreated * 1000);
                 member_since = member_since.replace(':year', regdate.getFullYear());
                 member_since = member_since.replace(':month', regdate.getMonth() + 1);
                 member_since = member_since.replace(':day', regdate.getDate());
                 
                 let html = `
                     <div class="steam-user" ` + ((widgetStyle.length > 0) ? widgetStyle: '') + `>
                         <div class="steam-user-image" style="` + bgimage + ` ` + ((header == '') ? 'display: none;' : '') + ` ` + ((height !== null) ? 'height: ' + height + 'px;' : '') + ((widgetImageStyle.length > 0) ? widgetImageStyle : '') + `"></div>
                     
                         <div class="steam-user-infos">
                            <div class="steam-user-infos-left">
                                <div class="steam-user-infos-left-avatar"><img src="` + json.data.avatarfull + `" alt="Avatar"/></div>
                                
                                <div class="steam-user-infos-left-text">
                                    <div class="steam-user-infos-left-text-name" ` + ((styleColorTextBright !== null) ? 'style="color: ' + styleColorTextBright + ';"' : '') + `>` + json.data.personaname + `</div>
                                    <div class="steam-user-infos-left-text-since" ` + ((styleColorTextDark !== null) ? 'style="color: ' + styleColorTextDark + ';"' : '') + `>` + member_since + `</div>
                                </div>
                            </div>

                            <div class="steam-user-infos-right">
                                <div class="steam-user-infos-right-online ` + ((json.data.personastate) ? oncolor : '') + `" ` + (((styleColorTextDark !== null) && (json.data.personastate)) ? 'style="color: ' + styleColorTextDark + ';"' : '') + `>` + onstatus + `</div>

                                <div class="steam-user-infos-right-view">
                                    <a href="` + json.data.profileurl + `">` + viewtext + `</a>
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
         req.open('GET', STEAMWIDGETS_USER_ENDPOINT + '/api/query/user?steamid=' + steamid, true);
         req.send();
     }
 
     updateWidget()
     {
         this.setupWidget(
            this.storedData.steamid,
            this.storedData.header,
            this.storedData.width,
            this.storedData.height,
            this.storedData.online_yes,
            this.storedData.online_no,
            this.storedData.member_since,
            this.storedData.viewtext,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTextBright,
            this.storedData.styleColorTextDark,
         );
     }

     changeLang(online_yes, online_no, member_since, viewtext)
    {
        this.storedData.online_yes = online_yes;
        this.storedData.online_no = online_no;
        this.storedData.member_since = member_since;
        this.storedData.viewtext = viewtext;

        this.setupWidget(
            this.storedData.steamid,
            this.storedData.header,
            this.storedData.width,
            this.storedData.height,
            this.storedData.online_yes,
            this.storedData.online_no,
            this.storedData.member_since,
            this.storedData.viewtext,
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
            this.storedData.steamid,
            this.storedData.header,
            this.storedData.width,
            this.storedData.height,
            this.storedData.online_yes,
            this.storedData.online_no,
            this.storedData.member_since,
            this.storedData.viewtext,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTextBright,
            this.storedData.styleColorTextDark,
        );
    }
 }
 
 window.customElements.define('steam-user', SteamUserElem);
 
 /**
  * Class SteamUser
  * 
  * Dynamically create a Steam user widget via JavaScript
  */
 class SteamUser
 {
     elem = null;
     selident = null;
     cfg = {};
 
     constructor(selector, config = {})
     {
         this.selident = selector;
         this.cfg = config;
 
         var steamid = (typeof config.steamid !== 'undefined') ? config.steamid : null;
         var header = (typeof config.header !== 'undefined') ? config.header : '';
         var width = (typeof config.width !== 'undefined') ? config.width : null;
         var height = (typeof config.height !== 'undefined') ? config.height : null;
         var online_yes = (typeof config.online_yes !== 'undefined') ? config.online_yes : 'online';
         var online_no = (typeof config.online_no !== 'undefined') ? config.online_no : 'offline';
         var member_since = (typeof config.member_since !== 'undefined') ? config.member_since : 'Member since: :year-:month-:day';
         var viewtext = (typeof config.viewtext !== 'undefined') ? config.viewtext : 'View';
 
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
 
         this.elem = document.createElement('steam-user');
         this.elem.setAttribute('steamid', steamid);
         this.elem.setAttribute('header', header);
         this.elem.setAttribute('style-border', styleBorder);
         this.elem.setAttribute('style-shadow', styleShadow);
         this.elem.setAttribute('style-color-background', styleColorBackground);
         this.elem.setAttribute('style-color-text-bright', styleColorTextBright);
         this.elem.setAttribute('style-color-text-dark', styleColorTextDark);
         this.elem.setAttribute('online-yes', online_yes);
         this.elem.setAttribute('online-no', online_no);
         this.elem.setAttribute('member-since', member_since);
         this.elem.setAttribute('viewtext', viewtext);

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

     changeLang(online_yes, online_no, member_since, viewtext)
     {
        this.elem.changeLang(online_yes, online_no, member_since, viewtext);
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
 