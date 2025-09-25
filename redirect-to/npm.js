/* This script attempts to redirect you to npmjs.com package page of the current library */
(async function(){
    const firstNpmLink = document.querySelector('a[href*="npmjs.com"]');
    const aTags = {
        'snyk.io': firstNpmLink,
        'npmtrends.com': firstNpmLink,
        'bundlephobia.com': firstNpmLink,
        'github.com': (async function ([_, repo, branch]) {
            const repoUrlBase = `${location.origin}/${repo}`;
            let dom = document;
            if (typeof branch === 'undefined') {
                const repoBasePageContent = await (await fetch(repoUrlBase)).text();
                dom = new DOMParser().parseFromString(repoBasePageContent, 'text/html');
                const mainBranch = dom.querySelector('.ref-selector-button-text-container > span').textContent.trim();
                branch = mainBranch;
            }
            const packageJsonRawUrl = `https://raw.githubusercontent.com/${repo}/${branch}/package.json`;
            const packageJsonContent = await (await fetch(packageJsonRawUrl)).text();
            const packageName = packageJsonContent.match(/{(?:\r|\n|[^{])+(?:\s|\t)+"name".*"(.*)"/);
            if(packageName){
                const npmJsUrl = `https://www.npmjs.com/package/${packageName[1]}`;
                window.open(npmJsUrl, '_blank');
            } else {
                const msg = 'Sorry no package name found.';
                console.error(msg);
                alert(msg);
            }
        })(location.pathname.match(/\/([^/]+\/[^/]+)(?:\/(?:tree|commits|blob)\/([^/]+))?/))
    };

    const domainSplit = document.domain.split('.');
    const domain = domainSplit[domainSplit.length - 2] + '.' + domainSplit[domainSplit.length - 1];

    const repoLink = await aTags[domain] ;

    if(repoLink) {
        const npmPackageUrl = await repoLink.href;
        location.href = npmPackageUrl;
    } else {
        const msg = 'Sorry no NPM package found.';
        console.error(msg);
        alert(msg);
    }
})();
