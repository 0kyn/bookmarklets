/* Open the npmjs.com package page of a Github repository */
(async function ([_, repo, branch]) {
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
})(location.pathname.match(/\/([^/]+\/[^/]+)(?:\/(?:tree|commits|blob)\/([^/]+))?/));
