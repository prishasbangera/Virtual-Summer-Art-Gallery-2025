let imgs = [];
const BOX_LEN = 2000;
const imgFilenames = [
  "artfight.png"
];


async function setup() {

    // Load images

    for (let i = 0; i < imgFilenames.length; i++) {
        let newImg = await loadImage("artworks\\" + imgFilenames[i]);
        imgs.push(newImg);
    }

    // Setup canvas

    createCanvas(windowWidth, windowHeight, WEBGL);

    camera(0, 0, -6000);

    angleMode(DEGREES);
    noStroke();


}

function draw() {
  // perspective(zoomy.value());
  
  background(0);
  rotateZ(90);
  // rotateY(frameCount * 0.2);

  // pointLight(color(255), 0, 0, -100);
  directionalLight(color(255), 1, 1, 10);
  directionalLight(color(255), -1, -1, -10);

  // pointLight(255, 255, 255, 0, -25, 0);
  
  ambientLight(color(25));
  specularMaterial(100);
  shininess(500);
  
  // Wall
  push();
  translate(0, 0, 0);
  box(BOX_LEN);
  pop();
  
  positionAndDrawImages();
  
  // Allow the user to rotate, zoom, and move the camera around
  orbitControl();
}

function positionAndDrawImages() {
  // Front wall
  push();
  translate(0, 0, -BOX_LEN);

  drawImage(imgs[0], 0.5, BOX_LEN, BOX_LEN);


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