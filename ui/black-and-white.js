/* toggle the ui to black&white */
(function () {
    const bwModeStyleTag = document.querySelector('#bwMode0');
    if (!bwModeStyleTag) {
        document.body.innerHTML += `
        <style id="bwMode0">
        * {
            color: #000 !important;
            background-color: #fff !important;
            border-color: #000 !important;
        }

        svg path {
            fill: #000 !important;
        }

        ::placeholder {
            background-color: #fff !important;
            color: #000 !important;
        }
        </style>`;
    } else {
        bwModeStyleTag.parentNode.removeChild(bwModeStyleTag);
    }
})();
