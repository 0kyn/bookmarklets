/* This script attempts to redirect you to the github repository of the current library */
(function(){
    const firstGithubLink = document.querySelector('a[href*="github.com"]');
    const aTags = {
        'npmjs.com': document.querySelector('[aria-labelledby*="repository-link"]'),
        'snyk.io': firstGithubLink,
        'npmtrends.com': firstGithubLink,
        'bundlephobia.com': document.querySelector('a.quick-stats-bar__link[href*="github.com"]'),
        'packagist.org': document.querySelector('.details > p.canonical > a'),
        'pypi.org': document.querySelector('.vertical-tabs__list a[href*="github.com"]'),
        'rubygems.org': firstGithubLink,
        'conan.io': document.querySelector('[data-tooltip-id="package-info"][data-tooltip-html*="Git"] ~ a[href*="github.com"]'),
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
