const app = new PIXI.Application();
await app.init({ resizeTo: window, backgroundAlpha: 0 });
document.body.appendChild(app.canvas);

const dots = new PIXI.Graphics();
app.stage.addChild(dots);

// Spara musens position
const mouse = { x: -1000, y: -1000 };

window.addEventListener("pointermove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Rita ett rutnät av prickar som reagerar på musen
app.ticker.add(() => {
  dots.clear();

  for (let x = 15; x < app.screen.width; x += 30) {
    for (let y = 15; y < app.screen.height; y += 30) {
      const distance = Math.hypot(x - mouse.x, y - mouse.y);
      const radius = Math.max(1, 8 - distance / 30);
      const nearMouse = distance < 150;
      const color = nearMouse ? 0xff2ca8 : 0x77dfff;

      dots.circle(x, y, radius).fill({ color: color, alpha: 0.35 });
    }
  }
});