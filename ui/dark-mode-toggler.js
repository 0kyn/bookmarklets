/* (nearly) dark mode toggler */
(function(){
    const darkModeStyleTag = document.querySelector('#darkMode0');
    if(!darkModeStyleTag){
        document.body.innerHTML+=('<style id="darkMode0">html{filter:invert(1) hue-rotate(180deg);}img,video,picture,*[style*="background-image"]{filter:invert(1) hue-rotate(180deg);}</style>');
    } else {
        darkModeStyleTag.parentNode.removeChild(darkModeStyleTag);
    }
})();
