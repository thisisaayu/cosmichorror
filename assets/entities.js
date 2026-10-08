/* ---------- 3D ASCII Entities Library ---------- */
var CosmicEntities = (function () {

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // --- 1. EYE FORM (Default Weeping Spiked Eye) ---
  function renderEyeForm(t, zb, ch, co, ox, oy, sc, cy, sy, cx, sx, mx, my, cols, rows, CW, CH, W, P, S, RAMP, reduce) {
    function plot(px, py, pz, spike, shard) {
      var x1 = px * cy + pz * sy, z1 = -px * sy + pz * cy;
      var y2 = py * cx - z1 * sx, z2 = py * sx + z1 * cx;
      var f = 3.2 / (3.2 - z2);
      var sxp = Math.round(ox + x1 * f * sc / CW), syp = Math.round(oy + y2 * f * sc / CH);
      if (sxp < 0 || sxp >= cols || syp < 0 || syp >= rows) return;
      var idx = syp * cols + sxp;
      if (z2 <= zb[idx]) return;
      zb[idx] = z2;
      var depth = Math.max(0, Math.min(1, (z2 + 1.3) / 2.6));
      if (shard) {
        ch[idx] = pick(["/", "\\", "x", "+", "|"]);
        co[idx] = depth > 0.5 ? "#a89a8c" : "#4a3c38";
        return;
      }
      ch[idx] = pick(RAMP[Math.min(6, Math.floor(depth * 7))]);
      co[idx] = spike > 0.28 ? "#a3262b" : (depth > 0.6 ? "#d8cbbd" : (depth > 0.35 ? "#8d7f74" : "#43372f"));
    }

    for (var m = 0; m < P.length; m++) plot(P[m][0], P[m][1], P[m][2], P[m][3], false);
    for (var m = 0; m < S.length; m++) {
      var a = S[m][3] + (reduce ? 0 : t * 0.0003);
      var rr = Math.hypot(S[m][0], S[m][2]);
      plot(Math.cos(a) * rr, S[m][1], Math.sin(a) * rr, 0, true);
    }

    // The eye tracking mouse
    var EW = Math.max(6, Math.floor(Math.min(280, W * 0.7) / CW / 2)), EH = Math.round(EW * 0.41), es = EW / 17, px, py;
    var ex = Math.round(ox + mx * 5 * es), ey = Math.round(oy + my * 2.5 * es);
    for (py = -EH; py <= EH; py++) {
      for (px = -EW; px <= EW; px++) {
        var u = px / EW, lim = EH * (1 - u * u);
        if (lim <= 0 || Math.abs(py) > lim) continue;
        var gx = ex + px, gy = ey + py;
        if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
        var id = gy * cols + gx, edge = Math.abs(py) > lim - 1.1;
        var pupil = Math.abs(px - mx * 4 * es) < 1.6 * es && Math.abs(py) <= lim - 0.5;
        zb[id] = 9;
        if (edge) { ch[id] = pick(["x", "o", "▒"]); co[id] = "#d8cbbd"; }
        else if (pupil) { ch[id] = "█"; co[id] = "#000"; }
        else if (Math.abs(px - mx * 4 * es) < 4.2 * es) { ch[id] = pick(["▒", "░", "1", "0"]); co[id] = "#a3262b"; }
        else { ch[id] = Math.random() < 0.04 ? pick(["0", "1"]) : " "; co[id] = "#a3262b"; }
      }
    }

    // Tears
    var drops = [Math.round(-6 * es), Math.round(2 * es), Math.round(9 * es)], dI, seg;
    for (dI = 0; dI < drops.length; dI++) {
      var len = 2 + Math.floor(((reduce ? 3000 : t) * 0.0007 + dI * 2.3) % 1 * 12);
      for (seg = 0; seg < len; seg++) {
        var tx2 = ex + drops[dI], ty2 = ey + Math.round(EH * (1 - Math.pow(drops[dI] / EW, 2))) + seg + 1;
        if (tx2 < 0 || tx2 >= cols || ty2 < 0 || ty2 >= rows) continue;
        var id2 = ty2 * cols + tx2;
        ch[id2] = seg === len - 1 ? "o" : (seg % 2 ? ":" : "|");
        co[id2] = "#a3262b";
        zb[id2] = 9;
      }
    }
  }

  // --- 2. TENTACLES FORM (Writhing Eldritch Mass) ---
  function renderTentaclesForm(t, zb, ch, co, ox, oy, sc, cy, sy, cx, sx, mx, my, cols, rows, CW, CH) {
    var numTentacles = 16;
    var ptsPerTentacle = 40;

    function plot3D(px, py, pz, charSet, colorVal, zOverride) {
      var x1 = px * cy + pz * sy, z1 = -px * sy + pz * cy;
      var y2 = py * cx - z1 * sx, z2 = py * sx + z1 * cx;
      var f = 3.2 / (3.2 - z2);
      var sxp = Math.round(ox + x1 * f * sc / CW);
      var syp = Math.round(oy + y2 * f * sc / CH);
      if (sxp < 0 || sxp >= cols || syp < 0 || syp >= rows) return;
      var idx = syp * cols + sxp;
      var zDepth = zOverride !== undefined ? zOverride : z2;
      if (zDepth <= zb[idx]) return;
      zb[idx] = zDepth;
      ch[idx] = pick(charSet);
      co[idx] = colorVal;
    }

    // Core body
    for (var i = 0; i < 900; i++) {
      var u = Math.random() * Math.PI * 2;
      var v = (Math.random() - 0.5) * Math.PI;
      var pulse = 0.45 + 0.15 * Math.sin(t * 0.004 + u * 3) * Math.cos(v * 4);
      var x = Math.cos(v) * Math.cos(u) * pulse;
      var y = Math.sin(v) * pulse;
      var z = Math.cos(v) * Math.sin(u) * pulse;
      var depth = Math.max(0, Math.min(1, (z + 1) / 2));
      var col = depth > 0.6 ? "#a3262b" : (depth > 0.3 ? "#5c1518" : "#380d0f");
      plot3D(x, y, z, ["▓", "▒", "░", "#", "§"], col);
    }

    // Tentacles
    for (var k = 0; k < numTentacles; k++) {
      var baseAngle = (k / numTentacles) * Math.PI * 2;
      var elevAngle = ((k % 5) - 2) * 0.3;
      for (var s = 0; s < ptsPerTentacle; s++) {
        var progress = s / ptsPerTentacle;
        var r = 0.35 + progress * 1.25;
        var wave1 = Math.sin(progress * 8 - t * 0.005 + k) * 0.28 * progress;
        var wave2 = Math.cos(progress * 6 + t * 0.004 + k * 1.7) * 0.28 * progress;

        var tx_pos = Math.cos(baseAngle) * r + wave1 + mx * 0.3 * progress;
        var ty_pos = Math.sin(baseAngle) * r * 0.55 + Math.sin(elevAngle) * r + wave2 + my * 0.3 * progress;
        var tz_pos = Math.sin(baseAngle) * r + Math.cos(elevAngle) * 0.2;

        var charSet = progress > 0.85 ? ["~", "v", ">", "<", "c"] : ["#", "&", "@", "§", "▓", "█"];
        var colorVal = progress < 0.3 ? "#5c1518" : (progress < 0.7 ? "#a3262b" : "#d8cbbd");
        plot3D(tx_pos, ty_pos, tz_pos, charSet, colorVal);
      }
    }
  }

  // --- 3. SMALL MAN FORM (Perfectly Centered & Scaled to Never Clip) ---
  function renderSmallManForm(t, zb, ch, co, ox, oy, sc, cols, rows, CW, CH) {
    // Man figure perfectly proportioned & centered inside y = [-0.45, +0.45]
    var breathing = Math.sin(t * 0.002) * 0.015;

    function drawPixel(cx, cy, cz, charStr, colorStr, zDepth) {
      var sxp = Math.round(ox + cx * (sc * 0.8) / CW);
      var syp = Math.round(oy + (cy + breathing) * (sc * 0.8) / CH);
      if (sxp < 0 || sxp >= cols || syp < 0 || syp >= rows) return;
      var idx = syp * cols + sxp;
      if (zDepth <= zb[idx]) return;
      zb[idx] = zDepth;
      ch[idx] = charStr;
      co[idx] = colorStr;
    }

    // Head (Radius ~0.10, Center y = -0.32)
    var headRadiusX = 0.10, headRadiusY = 0.12;
    var headCenterY = -0.32;
    for (var hy = -headRadiusY; hy <= headRadiusY; hy += 0.025) {
      for (var hx = -headRadiusX; hx <= headRadiusX; hx += 0.025) {
        if ((hx * hx) / (headRadiusX * headRadiusX) + (hy * hy) / (headRadiusY * headRadiusY) <= 1.0) {
          drawPixel(hx, headCenterY + hy, 0, pick(["░", "▒", "▓", "█"]), "#d8cbbd", 5);
        }
      }
    }

    // Piercing Eyes (FIXED GAZE - NO MOUSE TRACKING)
    var eyeBlink = Math.sin(t * 0.0015) > 0.96;
    if (eyeBlink) {
      drawPixel(-0.04, headCenterY - 0.01, 0, "-", "#a3262b", 9);
      drawPixel(0.04, headCenterY - 0.01, 0, "-", "#a3262b", 9);
    } else {
      drawPixel(-0.04, headCenterY - 0.01, 0, "o", "#a3262b", 9);
      drawPixel(0.04, headCenterY - 0.01, 0, "o", "#a3262b", 9);
      drawPixel(-0.04, headCenterY, 0, "•", "#ffffff", 10);
      drawPixel(0.04, headCenterY, 0, "•", "#ffffff", 10);
    }

    // Neck (y = -0.20 to -0.15)
    for (var ny = -0.20; ny < -0.15; ny += 0.025) {
      drawPixel(-0.02, ny, 0, "|", "#8d7f74", 4);
      drawPixel(0.02, ny, 0, "|", "#8d7f74", 4);
    }

    // Torso (y = -0.15 to +0.18)
    for (var ty_pos = -0.15; ty_pos <= 0.18; ty_pos += 0.03) {
      var torsoWidth = 0.16 - (ty_pos + 0.15) * 0.05;
      for (var tx_pos = -torsoWidth; tx_pos <= torsoWidth; tx_pos += 0.025) {
        var charChoice = (Math.abs(tx_pos) > torsoWidth - 0.03) ? "|" : pick(["█", "▓", "▒", "#"]);
        var colChoice = Math.abs(tx_pos) < 0.03 ? "#6a5650" : "#43372f";
        drawPixel(tx_pos, ty_pos, 0, charChoice, colChoice, 4);
      }
    }

    // Arms hanging still at sides
    for (var ay = -0.13; ay <= 0.16; ay += 0.03) {
      drawPixel(-0.18, ay, 0, "/", "#380d0f", 4);
      drawPixel(0.18, ay, 0, "\\", "#380d0f", 4);
    }
    drawPixel(-0.19, 0.18, 0, "o", "#d8cbbd", 5);
    drawPixel(0.19, 0.18, 0, "o", "#d8cbbd", 5);

    // Legs (y = +0.18 to +0.42)
    for (var ly = 0.18; ly <= 0.42; ly += 0.03) {
      drawPixel(-0.08, ly, 0, "|", "#380d0f", 4);
      drawPixel(-0.05, ly, 0, "|", "#43372f", 4);
      drawPixel(0.05, ly, 0, "|", "#43372f", 4);
      drawPixel(0.08, ly, 0, "|", "#380d0f", 4);
    }

    // Feet (y = +0.44)
    drawPixel(-0.10, 0.44, 0, "_", "#d8cbbd", 5);
    drawPixel(-0.07, 0.44, 0, "_", "#d8cbbd", 5);
    drawPixel(0.07, 0.44, 0, "_", "#d8cbbd", 5);
    drawPixel(0.10, 0.44, 0, "_", "#d8cbbd", 5);

    // Subtle void shadow underneath (y = 0.47)
    for (var sx = -0.2; sx <= 0.2; sx += 0.03) {
      drawPixel(sx, 0.47, 0, "░", "#211615", 2);
    }
  }

  // --- 4. MONOLITH FORM (Scaled to fit) ---
  function renderMonolithForm(t, zb, ch, co, ox, oy, sc, cy, sy, cx, sx, cols, rows, CW, CH) {
    function plot3D(px, py, pz, charStr, colStr) {
      var x1 = px * cy + pz * sy, z1 = -px * sy + pz * cy;
      var y2 = py * cx - z1 * sx, z2 = py * sx + z1 * cx;
      var f = 3.2 / (3.2 - z2);
      var sxp = Math.round(ox + x1 * f * sc / CW);
      var syp = Math.round(oy + y2 * f * sc / CH);
      if (sxp < 0 || sxp >= cols || syp < 0 || syp >= rows) return;
      var idx = syp * cols + sxp;
      if (z2 <= zb[idx]) return;
      zb[idx] = z2;
      ch[idx] = charStr;
      co[idx] = colStr;
    }

    for (var u = 0; u <= 1; u += 0.04) {
      for (var v = 0; v <= 1; v += 0.04) {
        var x = (-0.35 + u * 0.7) * (1 - v * 0.2);
        var y = -0.55 + v * 1.1;
        var z = 0.3 * (1 - v * 0.2);

        var isRune = Math.sin(x * 14 + t * 0.003) * Math.cos(y * 12 + t * 0.002) > 0.45;
        var runeChar = isRune ? pick(["§", "‡", "†", "Ψ", "Ω", "Δ", "0", "1", "#"]) : pick(["▓", "▒", "░", "█"]);
        var runeColor = isRune ? "#a3262b" : "#43372f";
        plot3D(x, y, z, runeChar, runeColor);
        plot3D(-x, y, -z, runeChar, runeColor);
      }
    }
  }

  // --- 5. VOID VORTEX FORM ---
  function renderVoidVortexForm(t, zb, ch, co, ox, oy, sc, cols, rows, CW, CH) {
    var particleCount = 650;
    for (var p = 0; p < particleCount; p++) {
      var angle = (p / particleCount) * Math.PI * 12 + t * 0.002;
      var radius = 0.12 + Math.pow(p / particleCount, 1.8) * 1.4;
      var x = Math.cos(angle) * radius;
      var y = Math.sin(angle) * radius * 0.4 + Math.sin(t * 0.003 + p) * 0.04;

      var sxp = Math.round(ox + x * sc / CW);
      var syp = Math.round(oy + y * sc / CH);
      if (sxp < 0 || sxp >= cols || syp < 0 || syp >= rows) continue;
      var idx = syp * cols + sxp;

      var charStr = radius < 0.35 ? "█" : pick(["*", ".", ":", "+", "x", "░", "▒"]);
      var colStr = radius < 0.25 ? "#000" : (radius < 0.7 ? "#a3262b" : "#d8cbbd");
      zb[idx] = 9;
      ch[idx] = charStr;
      co[idx] = colStr;
    }
  }

  return {
    renderEyeForm: renderEyeForm,
    renderTentaclesForm: renderTentaclesForm,
    renderSmallManForm: renderSmallManForm,
    renderMonolithForm: renderMonolithForm,
    renderVoidVortexForm: renderVoidVortexForm
  };
})();
