# bookmarlets

This is a set of bookmarklets

## Usage

### Manually

Add a JavaScript snippet as a bookmark in your browser.

Example: When I am on [npmjs.com](https://www.npmjs.com/) I would like to check "package health" in [Snyk Advisor](https://snyk.io/advisor/).

To do so I will use [snyk.js](./npm/snyk.js) script present in `npm/snyk.js`: 
- Bookmark name: **NPM - Snyk**  
- Bookmark url:
```javascript
javascript:(function(){
    const urlSplit = location.href.split('/');
    const packageName = urlSplit[urlSplit.length - 1].split('#')[0];
    const snykUrl = `https://snyk.io/advisor/npm-package/${packageName}`;
    window.open(snykUrl, '_blank');
})();
```

When I am on https://www.npmjs.com/package/bootstrap I open the freshly created bookmark then my browser opens https://snyk.io/advisor/npm-package/bootstrap in a new tab.

### Automaticaly

You can import all bookmarklets in your browser thanks to the import HTML file [bookmarklets-import.html](./bookmarklets-import.html).

## Development

```bash
git clone https://github.com/0kyn/bookmarklets

cd bookmarklets

npm install

# add a new bookmarklet executable in a specific context
## [context]/[action].js
## jump to the accepted answer in stackoverflow
touch stackoverflow/scroll-to-accepted-answer.js 
```

```js
/* Scroll to the accepted answer */
(function(){
    /* code... */
})();
```

```bash
# once the script has been edited
# generate the HTML bookmarks import file
npm run gen
```

## Warning

As long as it points to an arbitrary url and executes code into your browser, carefulness is needed!

## License

[MIT](https://choosealicense.com/licenses/mit/)