# bookmarlets

This is a set of bookmarklets

## Usage

Add a JavaScript snippet as a bookmark in your browser.

Example: When I am on [npmjs.com](https://www.npmjs.com/) I would like to check "package health" in [Snyk Advisor](https://snyk.io/advisor/).

To do so I will use [npm-snyk.js](npm-snyk.js) script: 
- Bookmark name: **NPM - Snyk**  
- Bookmark url: **j(function(){
    const urlSplit = location.href.split('/');
    const packageName = urlSplit[urlSplit.length - 1].split('#')[0];
    const snykUrl = `https://snyk.io/advisor/npm-package/${packageName}`;
    window.open(snykUrl, '_blank');
})();
**

When I am on https://www.npmjs.com/package/bootstrap I open the freshly created bookmark then my brower opens https://snyk.io/advisor/npm-package/bootstrap in a new tab.

## Warning

As long as it points to an arbitrary url and executes code into your browser, carefulness is needed!

## License

[MIT](https://choosealicense.com/licenses/mit/)