export const SHOE_SCENE = { width: 1254, height: 1140 };
export const SHOE_LAYERS = [
  { name: "upper", height: 528, closed: 200, open: 30, start: 0.08, end: 0.78 },
  { name: "lining", height: 212, closed: 518, open: 680, closedHeelLift: 45, start: 0.18, end: 0.86 },
  { name: "outsole", height: 194, closed: 537, open: 930, closedHeelLift: 38, start: 0.3, end: 0.94 },
];

export function getShoePose(progress) {
  const amount = Math.min(1, Math.max(0, progress));
  return SHOE_LAYERS.map(layer => {
    const t = Math.min(1, Math.max(0, (amount - layer.start) / (layer.end - layer.start)));
    const ease = t * t * (3 - 2 * t);
    return {
      ...layer,
      y: layer.closed + (layer.open - layer.closed) * ease,
      heelLift: (layer.closedHeelLift || 0) * (1 - ease),
    };
  });
}

export function drawShoe(context, images, width, height, progress) {
  context.clearRect(0, 0, width, height);
  const pose = getShoePose(progress);
  const scale = Math.min(width / SHOE_SCENE.width, height / SHOE_SCENE.height) * 0.96;
  const left = (width - SHOE_SCENE.width * scale) / 2;
  const firstEdge = Math.min(...pose.map(layer => layer.y));
  const lastEdge = Math.max(...pose.map(layer => layer.y + layer.height));
  const top = (height - (lastEdge - firstEdge) * scale) / 2 - firstEdge * scale;
  context.save();
  context.translate(left, top);
  context.scale(scale, scale);
  // One stable set of transparent textures gives every scroll position the same detail.
  context.save();
  context.translate(650, lastEdge + 24);
  context.scale(1, 0.08);
  const shadow = context.createRadialGradient(0, 0, 4, 0, 0, 540);
  shadow.addColorStop(0, "rgba(31, 31, 29, 0.14)");
  shadow.addColorStop(1, "rgba(31, 31, 29, 0)");
  context.fillStyle = shadow;
  context.fillRect(-540, -540, 1080, 1080);
  context.restore();
  for (let index = pose.length - 1; index >= 0; index--) {
    const layer = pose[index];
    context.save();
    // Align the thin sheets with the upper's heel when closed; relax as they separate.
    context.transform(1, -layer.heelLift / SHOE_SCENE.width, 0, 1, 0, layer.y);
    context.drawImage(images[index], 0, 0, SHOE_SCENE.width, layer.height);
    context.restore();
  }
  context.restore();
}
