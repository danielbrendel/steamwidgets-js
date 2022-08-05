# SteamCards Node Package

(C) 2022 by Daniel Brendel

__Contact__: dbrendel1988(at)gmail(dot)com\
__GitHub__: https://github.com/danielbrendel

Released under the MIT license

## About
SteamCards is a clientside web component that offers an easy way to integrate Steam Cards of Steam apps/games into your website. Therefore you only need very few code in order to render Steam Cards into your document.

SteamCards comes as a JavaScript package. Since JavaScript is supported by all major browser per default it is platform indipendend and compatible. 

## Usage

The component is very easy to use. The following example shows the minimum usage requirements:

```html
<script src="https://www.steamcards.net/api/resource/query?type=js&version=v1"></script>

<steam-card appid="620"></steam-card>
```

This renders the following card:

![Portal Card](https://www.steamcards.net/img/portal_card.png)

You can also use NPM to install the package:

```
npm install "steamcards.js"
```
```javascript
require('steamcards.js');
```

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
			<td>playtext</td>
			<td>Specifies the text of the button that eventually links to the Steam products store page</td>
		</tr>
		<tr>
			<td>author</td>
			<td>Specify a text that is displayed as the author of the product. You can use <b>:developer</b> and <b>:publisher</b> to dynamically insert the products developer and publisher names</td>
		</tr>
		<tr>
			<td>width</td>
			<td>Specify the width of the card</td>
		</tr>
		<tr>
			<td>height</td>
			<td>Specify the height of the card</td>
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
	</tbody>
</table>

You can also dynamically create Steam Cards via JavaScript:

```html
<div id="portal-card"></div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        let card = new SteamCard('#portal-card', {
            appid: '620',
            //You can specify the same attributes as shown in the table above
        });
    });
</script>
```