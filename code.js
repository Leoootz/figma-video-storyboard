figma.showUI(__html__, { width: 380, height: 520, title: "Storyboard" });

const GAP = 40;
let nodes  = [];
let total  = 0;
let startX = 0;
let startY = 0;
let FRAME_W = 0;
let FRAME_H = 0;

figma.ui.onmessage = async (msg) => {

  if (msg.type === 'insert-start') {
    total  = msg.total;
    nodes  = [];
    FRAME_W = msg.width;
    FRAME_H = msg.height;

    const center = figma.viewport.center;
    startX = center.x - (total * (FRAME_W + GAP)) / 2;
    startY = center.y - FRAME_H / 2;
  }

  if (msg.type === 'insert-frame') {
    const { index, bytes } = msg;
    const uint8 = new Uint8Array(bytes);
    const image = figma.createImage(uint8);

    const rect = figma.createRectangle();
    rect.resize(FRAME_W, FRAME_H);
    rect.x    = startX + index * (FRAME_W + GAP);
    rect.y    = startY;
    rect.name = `Frame ${String(index + 1).padStart(2,'0')}`;
    rect.fills = [{ type: 'IMAGE', imageHash: image.hash, scaleMode: 'FILL' }];
    rect.cornerRadius = 0;

    figma.currentPage.appendChild(rect);
    nodes.push(rect);
  }

  if (msg.type === 'insert-done') {
    if (nodes.length > 0) {
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }
    figma.ui.postMessage({ type: 'done', count: nodes.length });
    nodes = [];
  }
};