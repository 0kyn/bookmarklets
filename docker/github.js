/* Open the current dockerhub image Github repository */
(function(){
    const repoLink = document.querySelector('[class*="styles__productDescription"] a[href*="github.com"]');
    if(repoLink) {
        const githubRepoUrl = repoLink.getAttribute('href');
        window.open(githubRepoUrl, '_blank');
    } else {
        const msg = 'Sorry no Github repository found.';
        console.error(msg);
        alert(msg);
    }
})();
