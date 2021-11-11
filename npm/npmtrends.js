/* Open the current npmjs.com package in npmtrends */
(function(){
    const urlSplit = location.href.split('/');
    const packageName = urlSplit[urlSplit.length - 1].split('#')[0];
    const npmTrendsUrl = `https://www.npmtrends.com/${packageName}`;
    window.open(npmTrendsUrl, '_blank');
})();
