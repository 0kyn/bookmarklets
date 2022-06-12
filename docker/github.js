/* Open the current dockerhub image Github repository 
@todo? : regexp product name in github url */
(function(){
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    let found = false;
    [... githubLinks].map(link => {
        const href = link.getAttribute('href');
        if(href.match(/github\.com\/[^/]+\/[^/]+$/g)){
            found = true;
            window.open(href, '_blank');
        }
    });
    if(!found){
        const msg = 'Sorry no Github repository found.';
        console.error(msg);
        alert(msg);
    }
})();
