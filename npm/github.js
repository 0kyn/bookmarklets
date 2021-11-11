/* Open the current npm package Github repository */
(function(){
    const repoLink = document.querySelectorAll('[aria-labelledby="repository"]')[0];
    if(repoLink) {
        const githubRepoUrl = repoLink.getAttribute('href');
        window.open(githubRepoUrl, '_blank');
    } else {
        const msg = 'Sorry no Github repository found.';
        console.error(msg);
        alert(msg);
    }
})();
