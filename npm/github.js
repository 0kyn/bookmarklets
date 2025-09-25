/* Open the current npm package Github repository */
(function(){
    const repoLink = document.querySelector('[aria-labelledby*="repository-link"]');
    if(repoLink) {
        const githubRepoUrl = repoLink.getAttribute('href');
        window.open(githubRepoUrl, '_blank');
    } else {
        const msg = 'Sorry no Github repository found.';
        console.error(msg);
        alert(msg);
    }
})();
