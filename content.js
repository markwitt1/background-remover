console.log("yolo");
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log(request);
        var img = new Image();
        img.src = request.imgSrc;
        var canvas = document.getElementById('canvas');

        img.onload = () => {
            canvas.height = img.height;
            canvas.width = img.width;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var imgData = ctx.getImageData(0, 0, img.width, img.height);
            var background = imgData.data.slice(0, 4);
            console.log("Background: " + background);
            getAccuracy(accuracy => {
                for (var i = 0; i < imgData.data.length; i += 4) {
                    var current = imgData.data.slice(i, i + 4)
                    if (testColor(current, background, accuracy)) {
                        imgData.data[i] = 0;
                        imgData.data[i + 1] = 0;
                        imgData.data[i + 2] = 0;
                        imgData.data[i + 3] = 0;
                    }
                }
                ctx.putImageData(imgData, 0, 0);
            });

        };

    }
);

function testColor(a, b, accuracy) {

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] - b[i] > accuracy || a[i] - b[i] < -accuracy) {
            return false;
        }

    }
    return true;

}

function getAccuracy(callback) {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get("accuracy", function (items) {
        callback(items.accuracy)
    });
}