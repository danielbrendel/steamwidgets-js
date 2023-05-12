/**
 * SteamWidgets - Steam Widgets for your website
 * 
 * Module: Steam Group Widget
 * 
 * Visit: https://github.com/danielbrendel
 */

const STEAMWIDGETS_GROUP_ENDPOINT = 'https://www.steamwidgets.com';
const STEAMWIDGETS_GROUP_VERSION = 'v1';
 
/**
 * Class SteamGroupElem
 * 
 * Handle custom HTML element to render Steam group widgets
 */
class SteamGroupElem extends HTMLElement
{
    HEADLINE_MAX_LEN = 32;
    DESCRIPTION_MAX_LEN = 40;

    storedData = {};
    oldHeader = '';
 
    connectedCallback()
    {
        var group = (typeof this.attributes.group !== 'undefined') ? this.attributes.group.value : null;
        var online = (typeof this.attributes.online !== 'undefined') ? this.attributes.online.value : 'Online';
        var ingame = (typeof this.attributes.ingame !== 'undefined') ? this.attributes.ingame.value : 'In-Game';
        var members = (typeof this.attributes.members !== 'undefined') ? this.attributes.members.value : 'Members';
        var viewtext = (typeof this.attributes.viewtext !== 'undefined') ? this.attributes.viewtext.value : 'View group';
        var showImage = (typeof this.attributes['show-image'] !== 'undefined') ? parseInt(this.attributes['show-image'].value) : 1;
        var styleBorder = (typeof this.attributes['style-border'] !== 'undefined') ? this.attributes['style-border'].value : null;
        var styleShadow = (typeof this.attributes['style-shadow'] !== 'undefined') ? parseInt(this.attributes['style-shadow'].value) : 1;
        var styleColorBackground = (typeof this.attributes['style-color-background'] !== 'undefined') ? this.attributes['style-color-background'].value : null;
        var styleColorTitle = (typeof this.attributes['style-color-title'] !== 'undefined') ? this.attributes['style-color-title'].value : null;
        var styleColorDescription = (typeof this.attributes['style-color-description'] !== 'undefined') ? this.attributes['style-color-description'].value : null;
        var styleColorStatsCount = (typeof this.attributes['style-color-stats-count'] !== 'undefined') ? this.attributes['style-color-stats-count'].value : null;
        var styleColorStatsLabel = (typeof this.attributes['style-color-stats-label'] !== 'undefined') ? this.attributes['style-color-stats-label'].value : null;
        
        if (group !== null) {
            this.storedData = {
                group: group,
                online: online,
                ingame: ingame,
                members: members,
                viewtext: viewtext,
                showImage: showImage,
                styleBorder: styleBorder,
                styleShadow: styleShadow,
                styleColorBackground: styleColorBackground,
                styleColorTitle: styleColorTitle,
                styleColorDescription: styleColorDescription,
                styleColorStatsCount: styleColorStatsCount,
                styleCOlorStatsLabel: styleColorStatsLabel
            };

            this.setupWidget(
                group,
                online,
                ingame,
                members,
                viewtext,
                showImage,
                styleBorder,
                styleShadow,
                styleColorBackground,
                styleColorTitle,
                styleColorDescription,
                styleColorStatsCount,
                styleColorStatsLabel
            );
        }
    }
 
    setupWidget(group, online, ingame, members, viewtext, showImage, styleBorder, styleShadow, styleColorBackground, styleColorTitle, styleColorDescription, styleColorStatsCount, styleColorStatsLabel)
    {
        var req = new XMLHttpRequest();
        var self = this;

        if ((typeof self.custom_events !== 'undefined') && (typeof self.custom_events.eventOnInit !== 'undefined')) {
            self.dispatchEvent(self.custom_events.eventOnInit);
        }

        req.onreadystatechange = function() {
            if (req.readyState == XMLHttpRequest.DONE) {
                let json = JSON.parse(req.responseText);

                if (!document.getElementById('steamwidgets-group-styles')) {
                    let link = document.createElement('link');
                    link.id = 'steamwidgets-group-styles';
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = STEAMWIDGETS_GROUP_ENDPOINT + '/api/resource/query?type=css&module=group&version=' + STEAMWIDGETS_GROUP_VERSION;
                    document.getElementsByTagName('head')[0].appendChild(link);
                }

                let borderCodeGroup = '';
                let borderCodeGroupPreview = '';
                if (styleBorder !== null) {
                    if (styleBorder === 'max') {
                        borderCodeGroup = '';
                        borderCodeGroupPreview = '';
                    } else if (styleBorder === 'small') {
                        borderCodeGroup = 'border-radius: 4px;';
                        borderCodeGroupPreview = 'steam-group-preview-small';
                    } else if (styleBorder === 'none') {
                        borderCodeGroup = 'border-radius: unset;';
                        borderCodeGroupPreview = 'steam-group-preview-none';
                    }
                }

                let groupBaseStyle = '';
                if (!styleShadow) {
                    groupBaseStyle += 'box-shadow: unset;';
                }
                if (borderCodeGroup.length > 0) {
                    groupBaseStyle += borderCodeGroup;
                }
                if (styleColorBackground !== null) {
                    groupBaseStyle += 'background-color: ' + styleColorBackground + ';';
                }

                let headline = json.data.groupHeadline;
                if (headline.length >= self.HEADLINE_MAX_LEN) {
                    headline = headline.substr(0, self.HEADLINE_MAX_LEN - 3) + '...';
                }

                let description = json.data.groupSummary;
                if (description.length >= self.DESCRIPTION_MAX_LEN) {
                    description = description.substr(0, self.DESCRIPTION_MAX_LEN - 3) + '...';
                }

                let html = `
                <div class="steam-group" ` + ((groupBaseStyle.length > 0) ? 'style="' + groupBaseStyle + '"' : '') + `>
                    <div class="steam-group-preview ` + ((borderCodeGroupPreview.length > 0) ? borderCodeGroupPreview : '') + `" style="background-image: url('` + json.data.groupAvatar + `'); ` + ((!showImage) ? 'display: none;' : '') + `"></div>
                
                    <div class="steam-group-info" ` + ((!showImage) ? 'style="top: 13px; width: 100%;"' : '') + `>
                        <div class="steam-group-info-title" ` + ((styleColorTitle !== null) ? 'style="color: ' + styleColorTitle + ';"' : '') + `>` + headline + `</div>
                
                        <div class="steam-group-info-description" ` + ((styleColorDescription !== null) ? 'style="color: ' + styleColorDescription + ';"' : '') +  `>` + description + `</div>
                
                        <div class="steam-group-info-stats">
                            <div class="steam-group-info-stats-item">
                                <div class="steam-group-info-stats-item-count" ` + ((styleColorStatsCount !== null) ? 'style="color: ' + styleColorStatsCount + ';"' : '') +  `>` + self.readableCount(json.data.members.count) + `</div>
                                <div class="steam-group-info-stats-item-label" ` + ((styleColorStatsLabel !== null) ? 'style="color: ' + styleColorStatsLabel + ';"' : '') +  `>` + members + `</div>
                            </div>
                
                            <div class="steam-group-info-stats-item">
                                <div class="steam-group-info-stats-item-count" ` + ((styleColorStatsCount !== null) ? 'style="color: ' + styleColorStatsCount + ';"' : '') +  `>` + self.readableCount(json.data.members.online) + `</div>
                                <div class="steam-group-info-stats-item-label" ` + ((styleColorStatsLabel !== null) ? 'style="color: ' + styleColorStatsLabel + ';"' : '') +  `>`+ online + `</div>
                            </div>
                
                            <div class="steam-group-info-stats-item">
                                <div class="steam-group-info-stats-item-count" ` + ((styleColorStatsCount !== null) ? 'style="color: ' + styleColorStatsCount + ';"' : '') +  `>` + self.readableCount(json.data.members.in_game) + `</div>
                                <div class="steam-group-info-stats-item-label" ` + ((styleColorStatsLabel !== null) ? 'style="color: ' + styleColorStatsLabel + ';"' : '') +  `>`+ ingame + `</div>
                            </div>
                        </div>
                
                        <div class="steam-group-info-footer">
                            <div class="steam-group-info-footer-action">
                                <a href="https://steamcommunity.com/groups/` + json.data.groupURL + `">` + viewtext + `</a>
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
        req.open('GET', STEAMWIDGETS_GROUP_ENDPOINT + '/api/query/group?group=' + group, true);
        req.send();
    }
 
    updateWidget()
    {
        this.setupWidget(
            this.storedData.group,
            this.storedData.online,
            this.storedData.ingame,
            this.storedData.members,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorStatsCount,
            this.storedData.styleColorStatsLabel
        );
    }

    changeLang(online, ingame, members, viewtext)
    {
        this.storedData.online = online;
        this.storedData.ingame = ingame;
        this.storedData.members = members;
        this.storedData.viewtext = viewtext;

        this.setupWidget(
            this.storedData.group,
            this.storedData.online,
            this.storedData.ingame,
            this.storedData.members,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorStatsCount,
            this.storedData.styleColorStatsLabel
        );
    }

    setImageVisibility(visibility)
    {
        this.storedData.showImage = visibility;
        
        this.setupWidget(
            this.storedData.group,
            this.storedData.online,
            this.storedData.ingame,
            this.storedData.members,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow,
            this.storedData.styleColorBackground,
            this.storedData.styleColorTitle,
            this.storedData.styleColorDescription,
            this.storedData.styleColorStatsCount,
            this.storedData.styleColorStatsLabel
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
 
window.customElements.define('steam-group', SteamGroupElem);
 
/**
 * Class SteamGroup
 * 
 * Dynamically create a Steam group widget via JavaScript
 */
class SteamGroup
{
    elem = null;
    selident = null;
    cfg = {};

    constructor(selector, config = {})
    {
        this.selident = selector;
        this.cfg = config;

        var group = (typeof config.group !== 'undefined') ? config.group : null;
        var members = (typeof config.members !== 'undefined') ? config.members : 'Members';
        var online = (typeof config.online !== 'undefined') ? config.online : 'Online';
        var ingame = (typeof config.ingame !== 'undefined') ? config.ingame : 'In-Game';
        var viewtext = (typeof config.viewtext !== 'undefined') ? config.viewtext : 'View group';
        var showImage = (typeof config.showImage !== 'undefined') ? config.showImage : true;

        if (typeof showImage === 'boolean') {
            showImage = (showImage) ? 1 : 0;
        }

        var styleBorder = null;
        var styleShadow = 1;
        var styleColorBackground = null;
        var styleColorTitle = null;
        var styleColorDescription = null;
        var styleColorStatsCount = null;
        var styleColorStatsLabel = null;

        var evtOnInit = null;
        var evtOnCompleted = null;
        
        if (typeof config.style !== 'undefined') {
            styleBorder = (typeof config.style.border !== 'undefined') ? config.style.border : null;
            styleShadow = (typeof config.style.shadow !== 'undefined') ? config.style.shadow : 1;
            styleColorBackground = (typeof config.style.colorBackground !== 'undefined') ? config.style.colorBackground : null;
            styleColorTitle = (typeof config.style.colorTitle !== 'undefined') ? config.style.colorTitle : null;
            styleColorDescription = (typeof config.style.colorDescription !== 'undefined') ? config.style.colorDescription : null;
            styleColorStatsCount = (typeof config.style.colorStatsCount !== 'undefined') ? config.style.colorStatsCount : null;
            styleColorStatsLabel = (typeof config.style.colorStatsLabel !== 'undefined') ? config.style.colorStatsLabel : null;
        }

        if (typeof config.events !== 'undefined') {
            evtOnInit = (typeof config.events.onInit === 'function') ? config.events.onInit : null;
            evtOnCompleted = (typeof config.events.onCompleted === 'function') ? config.events.onCompleted : null;
        }

        if (typeof styleShadow === 'boolean') {
            styleShadow = (styleShadow) ? 1 : 0;
        }

        this.elem = document.createElement('steam-group');
        this.elem.setAttribute('group', group);
        this.elem.setAttribute('online', online);
        this.elem.setAttribute('members', members);
        this.elem.setAttribute('ingame', ingame);
        this.elem.setAttribute('viewtext', viewtext);
        this.elem.setAttribute('show-image', showImage);
        this.elem.setAttribute('style-border', styleBorder);
        this.elem.setAttribute('style-shadow', styleShadow);
        this.elem.setAttribute('style-color-background', styleColorBackground);
        this.elem.setAttribute('style-color-title', styleColorTitle);
        this.elem.setAttribute('style-color-description', styleColorDescription);
        this.elem.setAttribute('style-color-stats-count', styleColorStatsCount);
        this.elem.setAttribute('style-color-stats-label', styleColorStatsLabel);

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

    changeLang(online, ingame, members, viewtext)
    {
        this.elem.changeLang(online, ingame, members, viewtext);
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
 