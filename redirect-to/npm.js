/* This script attempts to redirect you to the github repository of the current library */
(async function(){
    const aTags = {
        'snyk.io': document.querySelectorAll('.meta > .item > a[href*="npmjs.com"]')[0],
        'npmtrends.com': document.querySelectorAll('a[href*="npmjs.com"]')[0],
        'bundlephobia.com': document.querySelectorAll('a.quick-stats-bar__link[href*="npmjs.org"]')[0],
        'github.com': (async function ([_, repo, branch]) {
            const repoUrlBase = `${location.origin}/${repo}`;
            let dom = document;
            if (typeof branch === 'undefined') {
                const repoBasePageContent = await (await fetch(repoUrlBase)).text();
                dom = new DOMParser().parseFromString(repoBasePageContent, 'text/html');
                const mainBranch = dom.querySelector('#branch-select-menu .css-truncate-target').textContent;
                branch = mainBranch;
            }
            const packageJsonRawUrl = `https://raw.githubusercontent.com/${repo}/${branch}/package.json`;
            const packageJsonContent = await (await fetch(packageJsonRawUrl)).text();
            const packageName = packageJsonContent.match(/{(?:\r|\n|[^{])+(?:\s|\t)+"name".*"(.*)"/);
            
            if(packageName){
                const npmJsUrl = `https://www.npmjs.com/package/${packageName[1]}`;
                
                return {href: npmJsUrl};
            } 
            
            return false;
        })(location.pathname.match(/\/([^/]+\/[^/]+)(?:\/(?:tree|commits|blob)\/([^/]+))?/))
    };

    const domainSplit = document.domain.split('.');
    const domain = domainSplit[domainSplit.length - 2] + '.' + domainSplit[domainSplit.length - 1];

    const repoLink = await aTags[domain] ;

    if(repoLink) {
        const npmPackageUrl = await repoLink.href;

        window.open(npmPackageUrl, '_blank');
    } else {
        const msg = 'Sorry no Github repository found.';
        console.error(msg);
        alert(msg);
    }
})();
