/**
 * SteamWidgets - Steam Widgets for your website
 * 
 * Module: Steam Workshop Widget
 * 
 * Visit: https://github.com/danielbrendel
 */

const STEAMWIDGETS_WORKSHOP_ENDPOINT = 'https://www.steamwidgets.com';
const STEAMWIDGETS_WORKSHOP_VERSION = 'v1';
 
/**
* Class SteamWorkshopElem
* 
* Handle custom HTML element to render Steam workshop widgets
*/
class SteamWorkshopElem extends HTMLElement
{
     DESCRIPTION_MAX_LEN = 40;

     storedData = {};
     oldHeader = '';
 
     connectedCallback()
     {
         var itemid = (typeof this.attributes.itemid !== 'undefined') ? this.attributes.itemid.value : null;
         var views = (typeof this.attributes.views !== 'undefined') ? this.attributes.views.value : 'Views';
         var subscriptions = (typeof this.attributes.subscriptions !== 'undefined') ? this.attributes.subscriptions.value : 'Subscriptions';
         var favorites = (typeof this.attributes.favorites !== 'undefined') ? this.attributes.favorites.value : 'Favorites';
         var author = (typeof this.attributes.author !== 'undefined') ? this.attributes.author.value : 'By :creator';
         var viewtext = (typeof this.attributes.viewtext !== 'undefined') ? this.attributes.viewtext.value : 'View item';
         var showImage = (typeof this.attributes['show-image'] !== 'undefined') ? parseInt(this.attributes['show-image'].value) : 1;
         var styleBorder = (typeof this.attributes['style-border'] !== 'undefined') ? this.attributes['style-border'].value : null;
         var styleShadow = (typeof this.attributes['style-shadow'] !== 'undefined') ? parseInt(this.attributes['style-shadow'].value) : 1;
         
         if (itemid !== null) {
             this.storedData = {
                itemid: itemid,
                views: views,
                subscriptions: subscriptions,
                favorites: favorites,
                author: author,
                viewtext: viewtext,
                showImage: showImage,
                styleBorder: styleBorder,
                styleShadow: styleShadow
             };
 
             this.setupWidget(
                itemid,
                views,
                subscriptions,
                favorites,
                author,
                viewtext,
                showImage,
                styleBorder,
                styleShadow
             );
         }
     }
 
     setupWidget(itemid, views, subscriptions, favorites, author, viewtext, showImage, styleBorder, styleShadow)
     {
         var req = new XMLHttpRequest();
         var self = this;
 
         req.onreadystatechange = function() {
             if (req.readyState == XMLHttpRequest.DONE) {
                 let json = JSON.parse(req.responseText);

                 if (!document.getElementById('steamwidgets-workshop-styles')) {
                     let link = document.createElement('link');
                     link.id = 'steamwidgets-workshop-styles';
                     link.rel = 'stylesheet';
                     link.type = 'text/css';
                     link.href = STEAMWIDGETS_WORKSHOP_ENDPOINT + '/api/resource/query?type=css&module=workshop&version=' + STEAMWIDGETS_WORKSHOP_VERSION;
                     document.getElementsByTagName('head')[0].appendChild(link);
                 }

                 let description = json.data.description;
                 if (description.length >= self.DESCRIPTION_MAX_LEN) {
                    description = description.substr(0, self.DESCRIPTION_MAX_LEN - 3) + '...';
                 }

                 author = author.replace(':creator', json.data.creator_data.personaname);
                 
                 let html = `
                    <div class="steam-workshop" ` + ((!styleShadow) ? 'style="box-shadow: unset;"' : '') + `>
                        <div class="steam-workshop-preview" style="background-image: url('` + json.data.preview_url + `'); ` + ((!showImage) ? 'display: none;' : '') + `"></div>
                    
                        <div class="steam-workshop-info" ` + ((!showImage) ? 'style="top: 13px; width: 100%;"' : '') + `>
                            <div class="steam-workshop-info-title">` + json.data.title + `</div>
                    
                            <div class="steam-workshop-info-description">` + description + `</div>
                    
                            <div class="steam-workshop-info-stats">
                                <div class="steam-workshop-info-stats-item">
                                    <div class="steam-workshop-info-stats-item-count">` + self.readableCount(json.data.views) + `</div>
                                    <div class="steam-workshop-info-stats-item-label">` + views + `</div>
                                </div>
                    
                                <div class="steam-workshop-info-stats-item">
                                    <div class="steam-workshop-info-stats-item-count">` + self.readableCount(json.data.subscriptions) + `</div>
                                    <div class="steam-workshop-info-stats-item-label">`+ subscriptions + `</div>
                                </div>
                    
                                <div class="steam-workshop-info-stats-item">
                                    <div class="steam-workshop-info-stats-item-count">` + self.readableCount(json.data.favorited) + `</div>
                                    <div class="steam-workshop-info-stats-item-label">`+ favorites + `</div>
                                </div>
                            </div>
                    
                            <div class="steam-workshop-info-footer">
                                <div class="steam-workshop-info-footer-author"><a href="` + json.data.creator_data.profileurl + `">` + author + `</a></div>
                    
                                <div class="steam-workshop-info-footer-action">
                                    <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=` + json.data.publishedfileid + `">` + viewtext + `</a>
                                </div>
                            </div>
                        </div>
                    </div>
                 `;
 
                 self.innerHTML = html;
             }
         };
         req.open('GET', STEAMWIDGETS_WORKSHOP_ENDPOINT + '/api/query/workshop?itemid=' + itemid, true);
         req.send();
     }
 
     updateWidget()
     {
         this.setupWidget(
            this.storedData.itemid,
            this.storedData.views,
            this.storedData.subscriptions,
            this.storedData.favorites,
            this.storedData.author,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow
         );
     }

    changeLang(views, subscriptions, favorites, author, viewtext)
    {
        this.storedData.views = views;
        this.storedData.subscriptions = subscriptions;
        this.storedData.favorites = favorites;
        this.storedData.author = author;
        this.storedData.viewtext = viewtext;

        this.setupWidget(
            this.storedData.itemid,
            this.storedData.views,
            this.storedData.subscriptions,
            this.storedData.favorites,
            this.storedData.author,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow
        );
    }

    setImageVisibility(visibility)
    {
        this.storedData.showImage = visibility;
        
        this.setupWidget(
            this.storedData.itemid,
            this.storedData.views,
            this.storedData.subscriptions,
            this.storedData.favorites,
            this.storedData.author,
            this.storedData.viewtext,
            this.storedData.showImage,
            this.storedData.styleBorder,
            this.storedData.styleShadow
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
 
window.customElements.define('steam-workshop', SteamWorkshopElem);
 
/**
* Class SteamWorkshop
* 
* Dynamically create a Steam workshop widgets via JavaScript
*/
module.exports = class SteamWorkshop
{
	elem = null;
	selident = null;
	cfg = {};

	constructor(selector, config = {})
	{
		this.selident = selector;
		this.cfg = config;

		var itemid = (typeof config.itemid !== 'undefined') ? config.itemid : null;
		var views = (typeof config.views !== 'undefined') ? config.views : 'Views';
		var subscriptions = (typeof config.subscriptions !== 'undefined') ? config.subscriptions : 'Subscriptions';
		var favorites = (typeof config.favorites !== 'undefined') ? config.favorites : 'Favorites';
		var author = (typeof config.author !== 'undefined') ? config.author : 'By :creator';
		var viewtext = (typeof config.viewtext !== 'undefined') ? config.viewtext : 'View item';
		var showImage = (typeof config.showImage !== 'undefined') ? config.showImage : null;

		if (typeof showImage === 'boolean') {
			showImage = (showImage) ? 1 : 0;
		}

		var styleBorder = null;
		var styleShadow = 1;

		if (typeof config.style !== 'undefined') {
			styleBorder = (typeof config.style.border !== 'undefined') ? config.style.border : null;
			styleShadow = (typeof config.style.shadow !== 'undefined') ? config.style.shadow : 1;
		}

		if (typeof styleShadow === 'boolean') {
			styleShadow = (styleShadow) ? 1 : 0;
		}

		this.elem = document.createElement('steam-workshop');
		this.elem.setAttribute('itemid', itemid);
		this.elem.setAttribute('views', views);
		this.elem.setAttribute('subscriptions', subscriptions);
		this.elem.setAttribute('favorites', favorites);
		this.elem.setAttribute('author', author);
		this.elem.setAttribute('viewtext', viewtext);
		this.elem.setAttribute('show-image', showImage);
		this.elem.setAttribute('style-border', styleBorder);
		this.elem.setAttribute('style-shadow', styleShadow);

		let sel = document.querySelector(selector);
		if (sel) {
			sel.appendChild(this.elem);
		}
	}

	updateWidget()
	{
		this.elem.updateWidget();
	}

	changeLang(views, subscriptions, favorites, author, viewtext)
	{
		this.elem.changeLang(views, subscriptions, favorites, author, viewtext);
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
