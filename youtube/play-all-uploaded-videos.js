/* Create a playlist with all uploaded user's videos */
(async function () {
    const metaChannelId = document.querySelector('meta[itemprop="channelId"]');
    if (metaChannelId) {
        const baseUrl = 'https://www.youtube.com';
        const channelId = metaChannelId.getAttribute('content');
        const channelUrl = `${baseUrl}/channel/${channelId}`;
        const channelVideosUrl = `${channelUrl}/videos`;
        const currentUrlIsVideo = location.href.match(/\?v=/g)?.length;
        const currentUrlIsVideosPage = location.href.match(/\/videos/g)?.length;
        let dom = document;
        let videoId;
        if (currentUrlIsVideo) {
            videoId = location.href.split('v=')[1];
        } else if (currentUrlIsVideosPage) {
            videoId = dom.querySelector('#items #thumbnail').getAttribute('href').split('=')[1];
        } else {
            const channelVideosPageContent = await (await fetch(channelVideosUrl)).text();
            videoId = channelVideosPageContent.match(/"videoId":"([\w|\d]+)"/)[1];
        }
        let list = channelId.replace(/^UC/, 'UU');
        const url = `${baseUrl}/watch?v=${videoId}&list=${list}`;
        console.log(url);
        location.href = url;
    } else {
        alert('Can\'t find channelId');
    }
})();
