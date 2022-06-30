#!/usr/bin/env node

import * as fs from 'fs';
import uglify from 'uglify-js';

(() => {
    const msToS = (time) => {
        return Math.floor(time / 1000);
    };

    const getBookmarkletsDirectories = () => {
        const ignoredDirectoriesRegex = /^(\.|node_modules)/;

        const directories = fs.readdirSync('./', { withFileTypes: true })
            .filter(dirent => dirent.isDirectory() && !dirent.name.match(ignoredDirectoriesRegex))
            .map(dirent => dirent.name);

        return directories;
    };

    const writeImportFile = (importFile) => {
        const html = importFile.content;
        const bookmarkFileName = importFile.filename;
        const params = importFile.params;

        const bookmarletsHistoryDirectory = '._bookmarlets-import-history';
        fs.writeFileSync(`${bookmarkFileName}`, html, 'utf8');

        if(params.history){
            if(!fs.existsSync(bookmarletsHistoryDirectory)){
                fs.mkdirSync(bookmarletsHistoryDirectory);
            }
            fs.writeFileSync(`./${bookmarletsHistoryDirectory}/${params.timestamp}-${bookmarkFileName}`, html, 'utf8');
        }
        
    };

    const genBookmarkFile = (bookmarkFileName, bookmarklets) => {
        const timestamp = msToS(Date.now());

        let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3>bookmarklets</H3>
    <DL><p>`;

        for (const b of bookmarklets) {
            html += `
        <DT><H3>${b.directory}</H3>
            <DL><p>`;
            for (const b2 of b.bookmarklets) {
                html += `
                <DT><A HREF="${b2.jsString}">${b2.name}</A>`;
            }
            html += `
            </DL><p>`;
        }

        html += `
    </DL><p>
</DL><p>`;

        writeImportFile({
            filename: bookmarkFileName, 
            content: html,
            params: {
                timestamp: timestamp,
                history: true
            }
        });

        return html;
    };

    const getBookmarkletString = (filePath) => {
        try {
            const string = fs.readFileSync(filePath, 'utf8');
            const code = uglify.minify(string, {
                compress: false
            }).code;
            const encodedString = encodeURIComponent(code);
            const bookmarkletString = `javascript:${encodedString}`;

            return bookmarkletString;
        } catch (err) {
            console.error(err);
        }
    };

    const getBookmarklets = (bookmarkletsDirectories) => {
        let bookmarletsArr = [];

        bookmarkletsDirectories.map(directory => {
            let o = {};
            o.directory = directory;
            o.bookmarklets = [];

            const files = fs.readdirSync(directory);
            files.map(file => {
                const filePath = `${directory}/${file}`;
                const bookmarkletString = getBookmarkletString(filePath);
                const fileStats = fs.statSync(filePath);

                console.log(fileStats);

                const filename = file.split('.')[0];
                o.bookmarklets.push({
                    name: filename,
                    jsString: bookmarkletString,
                });
            });

            bookmarletsArr.push(o);
        });

        return bookmarletsArr;
    };

    const bookmarkletsDirectories = getBookmarkletsDirectories();

    const bookmarklets = getBookmarklets(bookmarkletsDirectories);
    const htmlContent = genBookmarkFile('bookmarklets-import.html', bookmarklets);
    console.log(htmlContent);
    console.log('\n');
    console.log('Bookmarks import file generated.');
})();
