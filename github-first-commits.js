/* Get the first 10 commits page of a github repository 
Widely inspired by @bpceee https://github.com/bpceee/oldest */
(async function ([_, repo, branch]) {
    const repoUrlBase = `${location.origin}/${repo}`;
    let dom = document;
    if (typeof branch === 'undefined') {
        const repoBasePageContent = await (await fetch(repoUrlBase)).text();
        dom = new DOMParser().parseFromString(repoBasePageContent, 'text/html');
        const mainBranch = dom.querySelector("#branch-select-menu .css-truncate-target").textContent;
        branch = mainBranch;
    }

    const repoUrlTree = `${repoUrlBase}/tree/${branch}`;
    if (location.href !== repoUrlTree) {
        const repoTreePageContent = await (await fetch(repoUrlTree)).text();
        dom = new DOMParser().parseFromString(repoTreePageContent, 'text/html');
    }

    const commitsCount = parseInt(dom.querySelector('.d-none.d-sm-inline > strong').textContent.replace(/,/g, ''));
    const commitId = dom.querySelector('.f6.Link--secondary').getAttribute('href').split('/').pop();

    let urlCommits = `${location.origin}/${repo}/commits/${branch}`;
    if(commitsCount >= 10){
        urlCommits += `?after=${commitId}+${commitsCount - 11}&branch=${branch}`;
    }
    
    location.href = urlCommits
})(location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/(?:tree|commits|blob)\/([^\/]+))?/));
