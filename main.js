var fileLoader = document.getElementById('fileLoader');
var image = document.getElementById('image');
var canvas = document.getElementById('image-canvas');
var context = null;


let loadFromFile = function(){
    fileLoader.click();
    fileLoader.addEventListener('input', ()=>{
        image.src = fileLoader.files[0].name;
    });
}

let load = function (){
    context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
}

let grayScale = function() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            var gray = (pixel.red + pixel.green + pixel.blue) / 3; 
            img.setPixel(i, j, new RGBColor(gray, gray, gray));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let red = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red, 0, 0));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let red2 = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red, pixel.red, pixel.red));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let green = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j); 
            img.setPixel(i, j, new RGBColor(0, pixel.green, 0));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let green2 = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red, pixel.red, pixel.red));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let blue = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j); 
            img.setPixel(i, j, new RGBColor(0, 0, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let blue2 = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red, pixel.red, pixel.red));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}


let mean = function() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 2; i < img.width-2; i++) {
        for (var j = 2; j < img.height-2; j++) {
            var pixel = Array();
            pixel.push(img.getPixel(i-1,j-1).red);
            pixel.push(img.getPixel(i-1,j).red);
            pixel.push(img.getPixel(i,j-1).red);
            pixel.push(img.getPixel(i+1,j-1).red);
            pixel.push(img.getPixel(i,j).red);
            pixel.push(img.getPixel(i-1,j+1).red);
            pixel.push(img.getPixel(i,j+1).red);
            pixel.push(img.getPixel(i+1,j).red);
            pixel.push(img.getPixel(i+1,j+1).red);
            var gray = pixel.reduce((a, b) => a + b, 0) / 9;
    
            img.setPixel(i, j, new RGBColor(gray, gray, gray));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let median = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 2; i < img.width-2; i++) {
        for (var j = 2; j < img.height-2; j++) {
            var pixel = Array();
            pixel.push(img.getPixel(i-1,j-1).red);
            pixel.push(img.getPixel(i-1,j).red);
            pixel.push(img.getPixel(i,j-1).red);
            pixel.push(img.getPixel(i+1,j-1).red);
            pixel.push(img.getPixel(i,j).red);
            pixel.push(img.getPixel(i-1,j+1).red);
            pixel.push(img.getPixel(i,j+1).red);
            pixel.push(img.getPixel(i+1,j).red);
            pixel.push(img.getPixel(i+1,j+1).red);

            var median = pixel.sort()[4];
    
            img.setPixel(i, j, new RGBColor(median, median, median));
        }
    }

    context.putImageData(img.imageData, 0, 0);
}

let gaussean = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red*2, pixel.green*2, pixel.blue*2));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let brightnessPlus = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red*2, pixel.green*2, pixel.blue*2));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let brightnessMinus = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            img.setPixel(i, j, new RGBColor(pixel.red/2, pixel.green/2, pixel.blue/2));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let binary = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            if(pixel.red> 127){
                img.setPixel(i, j, new RGBColor(255, 255, 255));
            } else if(pixel.red <= 127){
                img.setPixel(i, j, new RGBColor(0, 0, 0));
            }
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let flipH = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0; i < img.width/2; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i,j);
            var aux = img.width-1;
            img.setPixel(i, j, new RGBColor(img.getPixel(aux-i, j).red, img.getPixel(aux-i, j).green, img.getPixel(aux-i, j).blue));
            img.setPixel(aux-i, j, new RGBColor(pixel.red, pixel.green, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let flipV = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0 ; i < img.width ; i++) {
        for (var j = 0 ; j < img.height/2 ; j++) {
            var pixel = img.getPixel(i,j);
            var aux = img.height-1;
            img.setPixel(i, j, new RGBColor(img.getPixel(i, aux-j).red, img.getPixel(i, aux-j).green, img.getPixel(i, aux-j).blue));
            img.setPixel(i, aux-j, new RGBColor(pixel.red, pixel.green, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let rotate90 = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let img = new MatrixImage(imageData);
    for (var i = 0 ; i < img.width ; i++) {
        for (var j = 0 ; j < img.height/2 ; j++) {
            var pixel = img.getPixel(i,j);
            var aux = img.height-1;
            img.setPixel(i, j, new RGBColor(img.getPixel(i, aux-j).red, img.getPixel(i, aux-j).green, img.getPixel(i, aux-j).blue));
            img.setPixel(i, aux-j, new RGBColor(pixel.red, pixel.green, pixel.blue));
        }
    }
    context.putImageData(img.imageData, 0, 0);
}

let contrast = function () {
}

class RGBColor {
    constructor(r, g, b) {
      this.red = r;
      this.green = g; 
      this.blue = b;
    }
}

class MatrixImage {
    constructor(imageData) {
      this.imageData = imageData;
      this.height = imageData.height; 
      this.width = imageData.width;
    }

    getPixel(x, y) {
        let position = ((y * (this.width * 4)) + (x * 4));

        return new RGBColor(
             this.imageData.data[position],   //red
             this.imageData.data[position+1], //green
             this.imageData.data[position+2], //blue
        );
    }

    setPixel(x, y, color) {
        let position = ((y * (this.width * 4)) + (x * 4));
        this.imageData.data[position] = color.red;
        this.imageData.data[position+1] = color.green;
        this.imageData.data[position+2] = color.blue;
    }
}

document.getElementById('btnLoad').addEventListener('click', load);
document.getElementById('btnGray').addEventListener('click', grayScale);
document.getElementById('btnMean').addEventListener('click', mean);
document.getElementById('btnMedian').addEventListener('click', median);
document.getElementById('btnGaussean').addEventListener('click', gaussean);
document.getElementById('btnRed').addEventListener('click', red);
document.getElementById('btnRed2').addEventListener('click', red2);
document.getElementById('btnGreen').addEventListener('click', green);
document.getElementById('btnGreen2').addEventListener('click', green2);
document.getElementById('btnBlue').addEventListener('click', blue);
document.getElementById('btnBlue2').addEventListener('click', blue2);
document.getElementById('btnBrightnessPlus').addEventListener('click', brightnessPlus);
document.getElementById('btnBrightnessMinus').addEventListener('click', brightnessMinus);
document.getElementById('btnBinary').addEventListener('click', binary);
document.getElementById('btnFlipV').addEventListener('click', flipV);
document.getElementById('btnFlipH').addEventListener('click', flipH);
document.getElementById('btnRotate90').addEventListener('click', rotate90);