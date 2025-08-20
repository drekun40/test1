function drawLine() {
  const m = parseFloat(document.getElementById('slope').value);
  const b = parseFloat(document.getElementById('intercept').value);
  const canvas = document.getElementById('plot');
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, w, h);

  // Draw axes
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h/2); ctx.lineTo(w, h/2); // x-axis
  ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h); // y-axis
  ctx.stroke();

  // Draw line y = mx + b
  ctx.strokeStyle = '#007bff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  // Map x from -10 to 10
  const xMin = -10, xMax = 10;
  const yMin = -10, yMax = 10;
  function mapX(x) { return (x - xMin) / (xMax - xMin) * w; }
  function mapY(y) { return h - (y - yMin) / (yMax - yMin) * h; }
  let first = true;
  for (let x = xMin; x <= xMax; x += 0.1) {
    const y = m * x + b;
    if (y < yMin || y > yMax) continue;
    const px = mapX(x), py = mapY(y);
    if (first) { ctx.moveTo(px, py); first = false; }
    else { ctx.lineTo(px, py); }
  }
  ctx.stroke();

  // Draw labels
  ctx.fillStyle = '#333';
  ctx.font = '12px Arial';
  ctx.fillText('x', w - 15, h/2 - 8);
  ctx.fillText('y', w/2 + 8, 15);
}

drawLine(); // Initial plot
