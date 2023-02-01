/* Open the current github repository into stackblitz https://stackblitz.com */
(function(){
    const urlPart = location.href.split('https://github.com/')[1];
    const repositorySplit = urlPart.split('/');
    const repositoryName = `${repositorySplit[0]}/${repositorySplit[1]}`;
    const github1sUrl = `https://stackblitz.com/github/${repositoryName}`;
    window.open(github1sUrl, '_blank');
})();
