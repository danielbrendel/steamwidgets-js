# SteamWidgets NPM package

(C) 2022 - 2023 by Daniel Brendel

Released under the MIT license

https://www.steamwidgets.com

## About
SteamWidgets is a clientside web component that offers an easy way to integrate Steam Widgets of various Steam entities into your website. Therefore you only need very few code in order to render Steam Widgets into your document.

SteamWidgets is used via JavaScript. Since JavaScript is supported by all major browser per default it is platform independent and compatible.

The following Widgets are currently available:
- Steam App Widget
- Steam Server Widget
- Steam User Widget
- Steam Workshop Widget
- Steam Group Widget

## Installation

```
npm i steamwidgets
```

```javascript
import 'steamwidgets'; //Import all available widgets

import 'steamwidgets/steam_app'; //Import Steam App Widget
import 'steamwidgets/steam_server'; //Import Steam Server Widget
import 'steamwidgets/steam_user'; //Import Steam User Widget
import 'steamwidgets/steam_workshop'; //Import Steam Workshop Widget
import 'steamwidgets/steam_group'; //Import Steam Group Widget
```

## Steam App

When referenced the required Steam App module, the minimum code to render a widget is as follows:

```html
<steam-app appid="620"></steam-app>
```

This renders the following widget:<br>
![Steam App Widget](https://www.steamwidgets.com/img/widget_app.png)

You can define these options:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Attribute</strong></td>
			<td><strong>Value</strong></td>
		</tr>
		<tr>
			<td>appid</td>
			<td>Specifies the ID of a Steam game/app</td>
		</tr>
		<tr>
			<td>lang</td>
			<td>Specifies the language of the localized Steam data</td>
		</tr>
		<tr>
			<td>onlinecount</td>
			<td>If specified this will be the text for the online count. Use <b>:count</b> to dynamically insert the actual products player/user count.</td>
		</tr>
		<tr>
			<td>rating</td>
			<td>If set to true then the app rating will be shown as a 5-star-system, otherwise it is hidden</td>
		</tr>
		<tr>
			<td>playtext</td>
			<td>Specifies the text of the button that eventually links to the Steam products store page</td>
		</tr>
		<tr>
			<td>author</td>
			<td>Specify a text that is displayed as the author of the product. You can use <b>:developer</b> and <b>:publisher</b> to dynamically insert the products developer and publisher names</td>
		</tr>
		<tr>
			<td>width</td>
			<td>Specify the width of the widget</td>
		</tr>
		<tr>
			<td>height</td>
			<td>Specify the height of the widget</td>
		</tr>
		<tr>
			<td>style-border / style.border</td>
			<td>Specify border rounding: Either none, small or max</td>
		</tr>
		<tr>
			<td>style-shadow / style.shadow</td>
			<td>You can specify false to prevent displaying box shadow or true to enable (default)</td>
		</tr>
		<tr>
			<td>style-color-background / style.colorBackground</td>
			<td>Specify a CSS value for the background color</td>
		</tr>
		<tr>
			<td>style-color-title / style.colorTitle</td>
			<td>Specify a CSS value for the title color</td>
		</tr>
		<tr>
			<td>style-color-description / style.colorDescription</td>
			<td>Specify a CSS value for the description color</td>
		</tr>
		<tr>
			<td>style-color-author / style.colorAuthor</td>
			<td>Specify a CSS value for the author color</td>
		</tr>
		<tr>
			<td>style-color-onlinecount / style.colorOnlinecount</td>
			<td>Specify a CSS value for the online count color</td>
		</tr>
		<tr>
			<td>style-hideimage / style.hideimage</td>
			<td>Specify whether the widget image shall be hidden or not</td>
		</tr>
	</tbody>
</table>

You can also dynamically create Steam Widgets via JavaScript:

```html
<div id="app-widget"></div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        let widget = new SteamApp('#app-widget', {
            appid: '620',
            //You can specify the same attributes as shown in the table above
        });
    });
</script>
```

The following methods are available for a Steam App element / object:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Method</strong></td>
			<td><strong>Description</strong></td>
		</tr>
		<tr>
			<td>updateWidget()</td>
			<td>Updates the widget data and displays them</td>
		</tr>
		<tr>
			<td>changeLang(lang, playtext, author, onlinecount)</td>
			<td>Changes the language of the widget using the given information</td>
		</tr>
		<tr>
			<td>setImageVisibility(visibility)</td>
			<td>Sets the widget image visibility</td>
		</tr>
		<tr>
			<td>remove()</td>
			<td>Removes the widget from the document</td>
		</tr>
	</tbody>
</table>

<hr/>

## Steam Server

When referenced the required Steam Server module, the minimum code to render a widget is as follows:

```html
<steam-server addr="ip:port"></steam-server>
```

This renders the following widget:<br>
![Steam Server Widget](https://www.steamwidgets.com/img/widget_server.png)

You can define these options:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Attribute</strong></td>
			<td><strong>Value</strong></td>
		</tr>
		<tr>
			<td>addr</td>
			<td>Specifies the address of the server using format <b>ip</b>:<b>port</b></td>
		</tr>
		<tr>
			<td>header</td>
			<td>If you want to render the widget with a header image you may specify the URL to an image here</td>
		</tr>
		<tr>
			<td>bots</td>
			<td>Specify the text for the bot info. Use :count to render the actual bot count</td>
		</tr>
		<tr>
			<td>secure_yes</td>
			<td>Specifies the text that is displayed if the server is a secure server</td>
		</tr>
		<tr>
			<td>secure_no</td>
			<td>Specifies the text that is displayed if the server is not a secure server</td>
		</tr>
		<tr>
			<td>hosting_dedicated</td>
			<td>Specifies the text that is displayed if the server is a dedicated server</td>
		</tr>
		<tr>
			<td>hosting_listen</td>
			<td>Specifies the text that is displayed if the server is a listen server</td>
		</tr>
		<tr>
			<td>playtext</td>
			<td>Specifies the text of the button that issues a connection to the server</td>
		</tr>
		<tr>
			<td>width</td>
			<td>Specify the width of the widget</td>
		</tr>
		<tr>
			<td>height</td>
			<td>Specify the height of the widget</td>
		</tr>
		<tr>
			<td>style-border / style.border</td>
			<td>Specify border rounding: Either none, small or max</td>
		</tr>
		<tr>
			<td>style-shadow / style.shadow</td>
			<td>You can specify false to prevent displaying box shadow or true to enable (default)</td>
		</tr>
		<tr>
			<td>style-color-background / style.colorBackground</td>
			<td>Specify a CSS value for the background color</td>
		</tr>
		<tr>
			<td>style-color-text-bright / style.colorTextBright</td>
			<td>Specify a CSS value for the bright texts</td>
		</tr>
		<tr>
			<td>style-color-text-dark / style.colorTextDark</td>
			<td>Specify a CSS value for the dark texts</td>
		</tr>
	</tbody>
</table>

You can also dynamically create Steam Server widgets via JavaScript:

```html
<div id="server-widget"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
	let widget = new SteamServer('#server-widget', {
		addr: 'ip:port',
		//You can specify the same attributes as shown in the table above
	});
});
</script>
```

The following methods are available for a Steam Server element / object:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Method</strong></td>
			<td><strong>Description</strong></td>
		</tr>
		<tr>
			<td>updateWidget()</td>
			<td>Updates the widget data and displays them</td>
		</tr>
		<tr>
			<td>changeLang(bots, secure_yes, secure_no, hosting_dedicated, hosting_listen, playtext)</td>
			<td>Changes the language of the widget using the given information</td>
		</tr>
		<tr>
			<td>setImageVisibility(visibility)</td>
			<td>Sets the widget image visibility</td>
		</tr>
		<tr>
			<td>remove()</td>
			<td>Removes the widget from the document</td>
		</tr>
	</tbody>
</table>

<hr/>

## Steam User

When referenced the required Steam User module, the minimum code to render a widget is as follows:

```html
<steam-user steamid="id"></steam-user>
```

This renders the following widget:<br>
![Steam User Widget](https://www.steamwidgets.com/img/widget_user.png)

You can define these options:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Attribute</strong></td>
			<td><strong>Value</strong></td>
		</tr>
		<tr>
			<td>steamid</td>
			<td>Specifies the SteamID of the Steam user</td>
		</tr>
		<tr>
			<td>header</td>
			<td>If you want to render the widget with a header image you may specify the URL to an image here</td>
		</tr>
		<tr>
			<td>online_yes</td>
			<td>Specifies the text that is displayed if the user is currently online</td>
		</tr>
		<tr>
			<td>online_no</td>
			<td>Specifies the text that is displayed if the user is not currently online</td>
		</tr>
		<tr>
			<td>member_since</td>
			<td>Specifies the text and format of the info that shows since when the user account is registered. Use <b>:year</b>, <b>:month</b> and <b>:day</b> to format the date.</td>
		</tr>
		<tr>
			<td>viewtext</td>
			<td>Specifies the text of the button which can be used to go to the users Steam Community profile</td>
		</tr>
		<tr>
			<td>width</td>
			<td>Specify the width of the widget</td>
		</tr>
		<tr>
			<td>height</td>
			<td>Specify the height of the widget</td>
		</tr>
		<tr>
			<td>style-border / style.border</td>
			<td>Specify border rounding: Either none, small or max</td>
		</tr>
		<tr>
			<td>style-shadow / style.shadow</td>
			<td>You can specify false to prevent displaying box shadow or true to enable (default)</td>
		</tr>
		<tr>
			<td>style-color-background / style.colorBackground</td>
			<td>Specify a CSS value for the background color</td>
		</tr>
		<tr>
			<td>style-color-text-bright / style.colorTextBright</td>
			<td>Specify a CSS value for the bright texts</td>
		</tr>
		<tr>
			<td>style-color-text-dark / style.colorTextDark</td>
			<td>Specify a CSS value for the dark texts</td>
		</tr>
	</tbody>
</table>

You can also dynamically create Steam User widgets via JavaScript:

```html
<div id="user-widget"></div>

<script>
	document.addEventListener('DOMContentLoaded', function() {
        let widget = new SteamUser('#user-widget', {
            steamid: 'id',
            //You can specify the same attributes as shown in the table above
        });
    });
</script>
```

The following methods are available for a Steam User element / object:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Method</strong></td>
			<td><strong>Description</strong></td>
		</tr>
		<tr>
			<td>updateWidget()</td>
			<td>Updates the widget data and displays them</td>
		</tr>
		<tr>
			<td>changeLang(online_yes, online_no, member_since, viewtext)</td>
			<td>Changes the language of the widget using the given information</td>
		</tr>
		<tr>
			<td>setImageVisibility(visibility)</td>
			<td>Sets the widget image visibility</td>
		</tr>
		<tr>
			<td>remove()</td>
			<td>Removes the widget from the document</td>
		</tr>
	</tbody>
</table>

<hr/>

## Steam Workshop

When referenced the required Steam Workshop module, the minimum code to render a widget is as follows:

```html
<steam-workshop itemid="id"></steam-workshop>
```

This renders the following widget:<br>
![Steam Workshop Widget](https://www.steamwidgets.com/img/widget_workshop.png)

You can define these options:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Attribute</strong></td>
			<td><strong>Value</strong></td>
		</tr>
		<tr>
			<td>itemid</td>
			<td>Specifies the item ID of the Steam Workshop item</td>
		</tr>
		<tr>
			<td>views</td>
			<td>Specifies the text of the views stats label</td>
		</tr>
		<tr>
			<td>subscriptions</td>
			<td>Specifies the text of the subscriptions stats label</td>
		</tr>
		<tr>
			<td>favorites</td>
			<td>Specifies the text of the favorites stats label</td>
		</tr>
		<tr>
			<td>author</td>
			<td>Specifies the author text. Use <b>:creator</b> to insert the creators Steam persona name</td>
		</tr>
		<tr>
			<td>viewtext</td>
			<td>Specifies the text of the button which can be used to go to the Workshop item page</td>
		</tr>
		<tr>
			<td>show-image / showImage</td>
			<td>Specifies if the workshop item preview image shall be displayed. Defaults to true/1</td>
		</tr>
		<tr>
			<td>style-border / style.border</td>
			<td>Specify border rounding: Either none, small or max</td>
		</tr>
		<tr>
			<td>style-shadow / style.shadow</td>
			<td>You can specify false to prevent displaying box shadow or true to enable (default)</td>
		</tr>
		<tr>
			<td>style-color-background / style.colorBackground</td>
			<td>Specify a CSS value for the background color</td>
		</tr>
		<tr>
			<td>style-color-title / style.colorTitle</td>
			<td>Specify a CSS value for the title color</td>
		</tr>
		<tr>
			<td>style-color-description / style.colorDescription</td>
			<td>Specify a CSS value for the description color</td>
		</tr>
		<tr>
			<td>style-color-stats-count / style.colorStatsCount</td>
			<td>Specify a CSS value for the stats count color</td>
		</tr>
		<tr>
			<td>style-color-stats-label / style.colorStatsLabel</td>
			<td>Specify a CSS value for the stats label color</td>
		</tr>
	</tbody>
</table>

You can also dynamically create Steam Workshop widgets via JavaScript:

```html
<div id="workshop-widget"></div>

<script>
	document.addEventListener('DOMContentLoaded', function() {
        let widget = new SteamWorkshop('#workshop-widget', {
            itemid: 'id',
            //You can specify the same attributes as shown in the table above
        });
    });
</script>
```

The following methods are available for a Steam Workshop element / object:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Method</strong></td>
			<td><strong>Description</strong></td>
		</tr>
		<tr>
			<td>updateWidget()</td>
			<td>Updates the widget data and displays them</td>
		</tr>
		<tr>
			<td>changeLang(views, subscriptions, favorites, author, viewtext)</td>
			<td>Changes the language of the widget using the given information</td>
		</tr>
		<tr>
			<td>setImageVisibility(visibility)</td>
			<td>Sets the widget image visibility</td>
		</tr>
		<tr>
			<td>remove()</td>
			<td>Removes the widget from the document</td>
		</tr>
	</tbody>
</table>

## Steam Group

When referenced the required Steam Group module, the minimum code to render a widget is as follows:

```html
<steam-group group="id"></steam-group>
```

This renders the following widget:<br>
![Steam Group Widget](https://www.steamwidgets.com/img/widget_group.png)

You can define these options:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Attribute</strong></td>
			<td><strong>Value</strong></td>
		</tr>
		<tr>
			<td>group</td>
			<td>Specifies the group either by numeric ID or URL identifier token</td>
		</tr>
		<tr>
			<td>members</td>
			<td>Specifies the text of the members stats label</td>
		</tr>
		<tr>
			<td>online</td>
			<td>Specifies the text of the online stats label</td>
		</tr>
		<tr>
			<td>ingame</td>
			<td>Specifies the text of the in-game stats label</td>
		</tr>
		<tr>
			<td>viewtext</td>
			<td>Specifies the text of the button which can be used to go to the group page</td>
		</tr>
		<tr>
			<td>show-image / showImage</td>
			<td>Specifies if the group avatar image shall be displayed. Defaults to true/1</td>
		</tr>
		<tr>
			<td>style-border / style.border</td>
			<td>Specify border rounding: Either none, small or max</td>
		</tr>
		<tr>
			<td>style-shadow / style.shadow</td>
			<td>You can specify false to prevent displaying box shadow or true to enable (default)</td>
		</tr>
		<tr>
			<td>style-color-background / style.colorBackground</td>
			<td>Specify a CSS value for the background color</td>
		</tr>
		<tr>
			<td>style-color-title / style.colorTitle</td>
			<td>Specify a CSS value for the title color</td>
		</tr>
		<tr>
			<td>style-color-description / style.colorDescription</td>
			<td>Specify a CSS value for the description color</td>
		</tr>
		<tr>
			<td>style-color-stats-count / style.colorStatsCount</td>
			<td>Specify a CSS value for the stats count color</td>
		</tr>
		<tr>
			<td>style-color-stats-label / style.colorStatsLabel</td>
			<td>Specify a CSS value for the stats label color</td>
		</tr>
	</tbody>
</table>

You can also dynamically create Steam Group widgets via JavaScript:

```html
<div id="group-widget"></div>

<script>
	document.addEventListener('DOMContentLoaded', function() {
        let widget = new SteamGroup('#group-widget', {
            group: 'id or url',
            //You can specify the same attributes as shown in the table above
        });
    });
</script>
```

The following methods are available for a Steam Group element / object:

<table>
	<thead>
		<tr></tr>
		<tr></tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Method</strong></td>
			<td><strong>Description</strong></td>
		</tr>
		<tr>
			<td>updateWidget()</td>
			<td>Updates the widget data and displays them</td>
		</tr>
		<tr>
			<td>changeLang(online, ingame, members, viewtext)</td>
			<td>Changes the language of the widget using the given information</td>
		</tr>
		<tr>
			<td>setImageVisibility(visibility)</td>
			<td>Sets the widget image visibility</td>
		</tr>
		<tr>
			<td>remove()</td>
			<td>Removes the widget from the document</td>
		</tr>
	</tbody>
</table>