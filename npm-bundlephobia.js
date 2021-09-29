/* Open the current npmjs.com package in bundlephobia */
(function(){
    const urlSplit = location.href.split('/');
    const packageName = urlSplit[urlSplit.length - 1].split('#')[0];
    const bundlephobiaUrl = `https://bundlephobia.com/package/${packageName}`;
    window.open(bundlephobiaUrl, '_blank');
})();