// constants
let cWidth = (window.innerWidth / 100) * 70;
console.log(cWidth);
let cHeight = cWidth;
let scale = cWidth / 34.50867052;

// variables
const inventoryData = window.inventory;
console.table(inventoryData);

// Create the Pixi application and create a canvas to work with
let app = new PIXI.Application({
  background: '#000000',
  width: cWidth,
  height: cHeight,
});
document.body.appendChild(app.view);

let bg = PIXI.Sprite.from('./images/zaal.png');
bg.width = app.screen.width;
bg.height = app.screen.height;

// create the draggable objects
// let obj1 = PIXI.Sprite.from('./images/blue.png');

// let obj2 = PIXI.Sprite.from('./images/blue.png');

// let obj3 = PIXI.Sprite.from('./images/blue.png');

// let obj4 = PIXI.Sprite.from('./images/blue.png');

// let obj5 = PIXI.Sprite.from('./images/blue.png');

// create variable for dragged object
let objects = [];
console.log(objects);
let draggingObj = null;
app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);
let moved = false;

function addObject(type) {
  let obj;
  let objIndex = inventoryData.findIndex((item) => item.name === type);
  inventoryData[objIndex].count--;
  obj = new PIXI.Sprite(PIXI.Texture.WHITE);
  obj.tint = 0x0000ff;
  obj.name = type;
  console.log(inventoryData[objIndex].count);

  if (type === 'pupiters') {
    obj.tint = 0x0000ff;
  } else if (type === 'muziekantenstoelen') {
    obj.tint = 0xff0000;
  } else if (type === 'orkeststoel') {
    obj.tint = 0x00ff00;
  } else if (type === 'pianostoelen') {
    obj.tint = 0xffff00;
  } else if (type === 'podiumelement S') {
    obj.tint = 0xff00ff;
  } else if (type === 'podiumelement M') {
    obj.tint = 0x00ffff;
  } else if (type === 'podiumelement L') {
    obj.tint = 0xff8000;
  } else if (type === 'podiumelement XL') {
    obj.tint = 0x000000;
  } else if (type === 'piano steinway D') {
    obj.tint = 0x808080;
  }

  objects.push(obj);
  console.log(objects);
  // make the change appear on the screen
  makeObjectsDraggable(obj);
  app.stage.addChild(obj);
}

function makeObjectsDraggable(obj) {
  obj.interactive = true;
  obj.cursor = 'pointer';
  obj.buttonMode = true;
  obj.width = 1 * scale;
  obj.height = 1.125 * scale;
  obj.anchor.set(0.5);
  obj.position.set(obj.width + 5, 5 + obj.height);
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
    // draggingObj.parent.toLocal(ev.global, null, dragTarget.position);
    draggingObj.position.copyFrom(ev.global);
    moved = true;

    // check collision with other objects
    for (let obj of objects) {
      if (obj !== draggingObj && hitTestRectangle(draggingObj, obj)) {
        // snap to the nearest edge
        const ox = obj.x - draggingObj.x;
        const oy = obj.y - draggingObj.y;
        const absOx = Math.abs(ox);
        const absOy = Math.abs(oy);

        if (absOx > absOy) {
          // snap to left or right edge
          if (ox > 0) {
            draggingObj.x = obj.x - obj.width / 2 - draggingObj.width / 2;
            draggingObj.y = obj.y;
          } else {
            draggingObj.x = obj.x + obj.width / 2 + draggingObj.width / 2;
            draggingObj.y = obj.y;
          }
        } else {
          // snap to top or bottom edge
          if (oy > 0) {
            draggingObj.y = obj.y - obj.height / 2 - draggingObj.height / 2;
            draggingObj.x = obj.x;
          } else {
            draggingObj.y = obj.y + obj.height / 2 + draggingObj.height / 2;
            draggingObj.x = obj.x;
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

  // console.log(r1.getBounds().intersects(r2.getBounds()));
  const hit = r1.getBounds().intersects(r2.getBounds());
  return hit;
}

// function hitTestRectangles(r1, rectangles) {
//   // Iterate through each pair of rectangles and check for intersection
//   rectangles.forEach((rectangle) => {
//     const hit = r1.getBounds().intersects(rectangle.getBounds());

//     return hit;
//   });
// }

// add objects to stage
app.stage.addChild(bg, ...objects);

function downloadPDF() {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  let img = new Image();
  let imageURL;

  // img = app.renderer.extract.canvas(app.stage);
  img = app.renderer.plugins.extract.canvas(app.stage);
  imageURL = img.toDataURL();
  let pdf = new jsPDF();
  pdf.addImage(imageURL, 'png', 0, 0, 200, 200);
  pdf.save('a4.pdf');
}
