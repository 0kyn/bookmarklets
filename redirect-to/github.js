/* This script attempts to redirect you to the github repository of the current library */
(function(){
    const aTags = {
        'npmjs.com': document.querySelectorAll('a[aria-labelledby="repository"]')[0],
        'snyk.io': document.querySelectorAll('.meta > .item > a[href*="github.com"]')[0],
        'npmtrends.com': document.querySelectorAll('a[href*="github.com"]')[0],
        'bundlephobia.com': document.querySelectorAll('a.quick-stats-bar__link[href*="github.com"]')[0],
        'packagist.org': document.querySelector('.details > p.canonical > a'),
        'pypi.org': document.querySelectorAll('.vertical-tabs__list a[href*="github.com"]')[0],
        'rubygems.org': document.querySelectorAll('a[href*="github.com"]')[0],
        'conan.io': document.querySelectorAll('.v-window a[href*="github.com"]')[0],
    };

    const domainSplit = document.domain.split('.');
    const domain = domainSplit[domainSplit.length - 2] + '.' + domainSplit[domainSplit.length - 1];
    const repoLink = aTags[domain];

    if(repoLink) {
        const githubRepoUrl = repoLink.getAttribute('href');
        window.location.href = githubRepoUrl;
    } else {
        const msg = 'Sorry no Github repository found.';
        console.error(msg);
        alert(msg);
    }
})();
