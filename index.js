window.addEventListener('load', async function() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    function reloadIFrame() {
        const iframe = document.querySelector('.discord-activity');
        if (iframe) {
            iframe.contentWindow.location = iframe.src;
        } else {
            console.error('iframe not found');
        }
    }
    
    window.setInterval(reloadIFrame, 5000); 
});
