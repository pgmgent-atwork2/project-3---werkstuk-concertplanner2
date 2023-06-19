// constants
let cWidth = (window.innerWidth / 100) * 70;
console.log(cWidth);
let cHeight = cWidth;
let scale = cWidth / 34.50867052;
console.log(scale);

// variables
const inventoryData = window.inventory;
console.table(inventoryData);

// Create the Pixi application and create a canvas to work with
let app = new PIXI.Application({
  background: '#000000',
  width: cWidth,
  height: cHeight,
});
// append the canvas to main
document.getElementById('canvas').appendChild(app.view);

let bg = PIXI.Sprite.from('./images/zaal.png');
bg.width = app.screen.width;
bg.height = app.screen.height;

// create variable for dragged object
let objects = [];
console.log(objects);
let draggingObj = null;
app.stage.sortableChildren = true;
app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

let moved = false;

function addObject(type, width, height, rotate, color, itemColor) {
  console.log(width, height);
  let obj;
  let objIndex = inventoryData.findIndex((item) => item.name === type);
  if (inventoryData[objIndex].count <= 0) {
    return alert('no more objects of this type');
  } else {
    inventoryData[objIndex].count--;
    obj = new PIXI.Sprite(PIXI.Texture.WHITE);
    obj.tint = 0x0000ff;
    obj.name = type;
    console.log(inventoryData[objIndex].count);

    if (type === 'pupiters') {
      obj.tint = itemColor;
      obj.zIndex = 1;
    } else if (type === 'muziekantenstoelen') {
      obj.tint = color;
      obj.zIndex = 1;
    } else if (type === 'pianostoelen') {
      obj.tint = itemColor;
      obj.zIndex = 1;
    } else if (type === 'piano steinway D') {
      obj.tint = itemColor;
      obj.zIndex = 1;
    } else if (type === 'podiumelement S') {
      obj.tint = itemColor;
      obj.zIndex = 0;
    } else if (type === 'podiumelement M') {
      obj.tint = itemColor;
      obj.zIndex = 0;
    } else if (type === 'podiumelement L') {
      obj.tint = itemColor;
      obj.zIndex = 0;
    } else if (type === 'podiumelement XL') {
      obj.tint = itemColor;
      obj.zIndex = 0;
    }

    objects.push(obj);
    console.log(objects);
    // make the change appear on the screen
    makeObjectsDraggable(obj, width, height, type);
    app.stage.addChild(obj);
  }
}

function makeObjectsDraggable(obj, width, height, type) {
  obj.interactive = true;
  obj.cursor = 'pointer';
  obj.buttonMode = true;
  obj.width = width * 2 * scale;
  obj.height = height * 2 * scale;
  if (document.getElementById(`${type}`).checked) {
    // switch width and height
    obj.width = height * 2 * scale;
    obj.height = width * 2 * scale;
  }
  obj.anchor.set(0.5);
  obj.position.set(100, 100);
  obj.on('pointerdown', onDragStart, obj).on('pointermove', onDragMove);
}

for (let obj of objects) {
  makeObjectsDraggable(obj);
}

// When start dragging object
function onDragStart() {
  draggingObj = this;
  draggingObj.dragging = true;

  app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
  if (draggingObj) {
    if (moved === false) {
      if (window.confirm('do you want to delete this object?')) {
        let objIndex = inventoryData.findIndex(
          (item) => item.name === draggingObj.name
        );
        inventoryData[objIndex].count++;
        console.log(inventoryData[objIndex].count);
        objects.splice(objects.indexOf(draggingObj), 1);
        draggingObj.parent.removeChild(draggingObj).destroy();
      }
    }
    draggingObj.dragging = false;
    draggingObj = null;
    moved = false;
  }
}

function onDragMove(ev) {
  if (draggingObj && draggingObj.dragging) {
    draggingObj.position.copyFrom(ev.global);
    moved = true;
    let collision = true;
    let snap = true;

    document.getElementById('snap').checked ? (snap = true) : (snap = false);

    document.getElementById('collision').checked
      ? (collision = true)
      : (collision = false);

    // check collision with other objects
    for (let obj of objects) {
      if (
        obj !== draggingObj &&
        hitTestRectangle(draggingObj, obj) &&
        collision
      ) {
        // snap to the nearest edge
        const ox = obj.x - draggingObj.x;
        const oy = obj.y - draggingObj.y;
        const absOx = Math.abs(ox);
        const absOy = Math.abs(oy);

        if (absOx > absOy) {
          // snap to left or right edge
          if (ox > 0) {
            draggingObj.x = obj.x - obj.width / 2 - draggingObj.width / 2;
            snap ? (draggingObj.y = obj.y) : null;
          } else {
            draggingObj.x = obj.x + obj.width / 2 + draggingObj.width / 2;
            snap ? (draggingObj.y = obj.y) : null;
          }
        } else {
          // snap to top or bottom edge
          if (oy > 0) {
            draggingObj.y = obj.y - obj.height / 2 - draggingObj.height / 2;
            snap ? (draggingObj.x = obj.x) : null;
          } else {
            draggingObj.y = obj.y + obj.height / 2 + draggingObj.height / 2;
            snap ? (draggingObj.x = obj.x) : null;
          }
        }
      }
    }
    if (draggingObj.x > app.screen.width - 10) {
      let objIndex = inventoryData.findIndex(
        (item) => item.name === draggingObj.name
      );
      inventoryData[objIndex].count++;
      console.log(inventoryData[objIndex].count);
      draggingObj.dragging = false;
      objects.splice(objects.indexOf(draggingObj), 1);
      draggingObj.parent.removeChild(draggingObj).destroy();
      draggingObj = null;
    } else if (draggingObj.x <= draggingObj.width / 2) {
      draggingObj.x = draggingObj.width / 2;
    } else if (draggingObj.y <= draggingObj.height / 2) {
      draggingObj.y = draggingObj.height / 2;
    } else if (draggingObj.y >= app.screen.height - draggingObj.height) {
      draggingObj.y = app.screen.height - draggingObj.height;
    }
  }
}

function hitTestRectangle(r1, r2) {
  // use bounding box to check intersection
  const hit = r1.getBounds().intersects(r2.getBounds());
  return hit;
}

// add objects to stage
app.stage.addChild(bg, ...objects);

html2canvas(document.querySelector('#legend')).then((canvas) => {
  document.body.appendChild(canvas).classList.add('hidden', 'legend-canvas');
  let img = canvas.toDataURL('image/png');
  pdf.addPage();
  pdf.addImage(img, 'png', 0, 0, 200, 200);
});

function downloadPDF() {
  let img = new Image();
  let imageURL;
  img = app.renderer.plugins.extract.canvas(app.stage);
  console.log(img);
  imageURL = img.toDataURL();
  let pdf = new jsPDF();
  pdf.addImage(imageURL, 'png', 0, 0, 200, 200);
  img = document.querySelector('.legend-canvas');
  imageURL = img.toDataURL();
  pdf.addImage(imageURL, 'png', 10, 200, 150, 75);

  pdf.save('a4.pdf');
}
