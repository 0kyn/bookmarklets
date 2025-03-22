/* Get the first 10 commits page of a github repository 
Widely inspired by @bpceee https://github.com/bpceee/oldest */
(async function ([_, repo, branch]) {
    const repoUrlBase = `${location.origin}/${repo}`;
    let content;
    if (typeof branch === 'undefined') {
        const repoBasePageContent = content = await (await fetch(repoUrlBase)).text();
        const dom = new DOMParser().parseFromString(repoBasePageContent, 'text/html');
        const mainBranch = dom.querySelector('.ref-selector-button-text-container > span').textContent.trim();
        branch = mainBranch;
    }

    const repoUrlTree = `${repoUrlBase}/tree/${branch}`;
    if (location.href !== repoUrlTree) {
        content = await (await fetch(repoUrlTree)).text();
    }

    const commitsCount = content.match(/"commitCount":"(.+?)"/)[1];
    const commitId = content.match(/"currentOid":"(.+?)"/)[1];

    let urlCommits = `${location.origin}/${repo}/commits/${branch}`;
    if(commitsCount >= 10){
        urlCommits += `?after=${commitId}+${commitsCount - 11}&branch=${branch}`;
    }
    
    location.href = urlCommits;
})(location.pathname.match(/\/([^/]+\/[^/]+)(?:\/(?:tree|commits|blob)\/([^/]+))?/));
