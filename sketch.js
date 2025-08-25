let imgs = [];
let imgFilenames = [
    "artworks\\a1.jpg"
];

async function setup() {

    // Load images

    for (let i = 0; i < imgFilenames.length; i++) {
        let newImg = await loadImage(imgFilenames[i]);
        imgs.push(newImg);
    }

    // Setup canvas

    createCanvas(windowWidth, windowHeight, WEBGL);

    camera(0, 0, -3000);

    angleMode(DEGREES);
    noStroke();


}

function draw() {
  // perspective(zoomy.value());
  
  background(0);
  
  // pointLight(color(255), 0, 0, -100);
  directionalLight(color(255), 1, 0, 10);
 // pointLight(255, 255, 255, 0, -25, 0);
  
  ambientLight(color(25));
  specularMaterial(100);
  shininess(500);
  
  // Wall
  push();
  translate(0, 0, 50);
  box(10000, 10000, 5);
  pop();
  
  positionAndDrawImages();
  
  // Allow the user to rotate, zoom, and move the camera around
  orbitControl();
}

function positionAndDrawImages() {
  // Images
  push();
  translate(0, 0, 0);
  rotateZ(90);
  drawImage(imgs[0], 1);
  pop();
}

function drawImage(img, scl = 1, x = 0, y = 0) {
  push();
  translate(x, y, 0);
  specularMaterial(50);
  shininess(1000);
  texture(img);
  box(img.height * scl, img.width * scl, 10);
  pop();
}