/* Open the current npmjs.com package in snyk */
(function(){
    const urlSplit = location.href.split('/');
    const packageName = urlSplit[urlSplit.length - 1].split('#')[0];
    const snykUrl = `https://snyk.io/advisor/npm-package/${packageName}`;
    window.open(snykUrl, '_blank');
})();
