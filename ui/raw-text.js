/* get raw text */
(function() {
    const originalContent = document.body.innerHTML;
    const textContent = document.body.innerText || document.body.textContent;
    document.body.innerHTML = '<pre style="white-space: pre-wrap; word-wrap: break-word;">' + textContent + '</pre>';
    const restoreButton = document.createElement('button');
    restoreButton.innerHTML = 'Restore Original';
    restoreButton.style.position = 'fixed';
    restoreButton.style.top = '10px';
    restoreButton.style.right = '10px';
    restoreButton.style.zIndex = '9999';
    restoreButton.onclick = function() {
        document.body.innerHTML = originalContent;
    };
    document.body.appendChild(restoreButton);
})();
