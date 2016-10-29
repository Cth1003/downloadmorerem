function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
var rems = ['http://i.imgur.com/GXzzfIU.jpg', 'http://i.imgur.com/93SQyjX.jpg', 'http://i.imgur.com/RQWAOQI.jpg', 'http://i.imgur.com/yrjkRxr.png', 'http://i.imgur.com/A6exbTG.jpg', 'http://i.imgur.com/gis0Vml.jpg', 'http://i.imgur.com/7YQ7EPG.png', 'http://i.imgur.com/EINp6fV.jpg', 'http://vignette1.wikia.nocookie.net/rezero/images/0/02/Rem_Anime.png', 'http://static.zerochan.net/Rem.(Re%3AZero).full.2010867.jpg', 'http://static.zerochan.net/Rem.(Re%3AZero).full.2016177.jpg', 'http://www.nautiljon.com/images/perso/00/82/rem_13328.jpg?1476293768'];
var success = function(msg){
    console.info(msg);
};

var error = function(err){
    console.error(err);
};
var rendom = Math.floor((Math.random() * 99999999) + 1);
processfile(rems[Math.floor(Math.random() * rems.length)]);
function processfile(imageURL) {
    var image = new Image();
	image.setAttribute('crossOrigin', 'anonymous');
    var onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
   
        canvas.toBlob(function(blob) {
			var gotrem = window.URL.createObjectURL(blob);
			var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/); 
			if (isMobile) {
			saveImageToPhone(gotrem, success, error);
			} else {
			saveAs(blob, "rem" + rendom + ".png");
			}
			document.getElementById("ohynoes").innerHTML += '<center><h1>Downloaded your Rem !</h1></center>';
        });
    };

    image.onload = onload;
    image.src = imageURL;
}
//fuk ios
function saveImageToPhone(url, success, error) {
    var canvas, context, imageDataUrl, imageData;
    var img = new Image();
    img.onload = function() {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        try {
            imageDataUrl = canvas.toDataURL('image/png', 1.0);
            imageData = imageDataUrl.replace(/data:image\/png;base64,/, '');
            cordova.exec(
                success,
                error,
                'Canvas2ImagePlugin',
                'saveImageDataToLibrary',
                [imageData]
            );
        }
        catch(e) {
            error(e.message);
        }
    };
    try {
        img.src = url;
    }
    catch(e) {
        error(e.message);
    }
}
