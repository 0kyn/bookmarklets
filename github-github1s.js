/* Open the current github repository in github1s (Visual Studio Code browser embedded) */
(function(){
    const urlPart = location.href.split('https://github.com/')[1];
    const repositorySplit = urlPart.split('/');
    const repositoryName = `${repositorySplit[0]}/${repositorySplit[1]}`;
    const github1sUrl = `https://github1s.com/${repositoryName}`;
    window.open(github1sUrl, '_blank');
})();