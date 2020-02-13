chrome.contextMenus.create({
    id: "copywithoutbackground",
    title: "REMOVE BACKGROUND",
    contexts: ["image"]
});
chrome.storage.sync.set({
    accuracy: 5
});




chrome.contextMenus.onClicked.addListener(async (info, tab) => {

    requestPermission((granted) => {
        console.log(granted);
    });

    chrome.tabs.create({ url: chrome.extension.getURL("page.html") }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, tabInfo) {
            if (tabInfo.status === 'complete' && tabId === tab.id) {
                chrome.tabs.onUpdated.removeListener(listener);
                chrome.tabs.sendMessage(tabId, { imgSrc: info.srcUrl });
            }
        });

    });


    //This WOULD WORK theoretically :(
    /*  console.log(info.srcUrl);

    var data = await fetch(info.srcUrl);
    //var arrayBuffer = await data.arrayBuffer();
    var blob = await data.blob();
    await navigator.clipboard.write([
        new ClipboardItem({
            [blob.type]: blob
        })
    ]);

    chrome.clipboard.setImageData(arrayBuffer, "png", () => {
        console.log("done");
    });*/




});


function requestPermission(callback) {
    chrome.permissions.request({
        permissions: ['clipboardWrite']
    }, callback);
}