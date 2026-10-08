/* ---------- Main Coordinator Script ---------- */
(function () {
  // Story Segment Datasets linked to each Entity Form
  var STORY_FORM_DATA = [
    // Form 0: EYE (The Weeping Spiked Eye)
    {
      heroText: "it does not watch. it hates.",
      ticker: "IT DOES NOT WATCH  //  IT HATES  //  SCLERA OF ANCIENT BONE  //  A HOLE THROUGH SPACE  //  GALAXIES DROWNING IN OIL  //  ",
      cards: [
        {
          title: "the eye",
          pre: " .---.\n/  .  \\\n|  o o  |\n|   ^   |\n '---'",
          text: "The eye is suspended in a place where there should be no space. Its sclera is ancient bone, veins crawling across its surface like roots beneath dead soil."
        },
        {
          title: "the iris",
          pre: " ~ ~ ~ ~ ~ ~ ~\n { spiral(dark){ }\n {   color++;    }\n {   drown();    }\n { }  /* wet iris */",
          text: "The iris is a spiral of unnamable colors, folding like galaxies drowning in oil. At the center is a pupil that is a hole through reality itself."
        },
        {
          title: "the pupil",
          pre: "01001100 01001111\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓\n▓▓▒▒░░░░░░░░▒▒▓▓\n▓▓▒▒░ HOLE ░▒▒▓▓\n▓▓▒▒░░░░░░░░▒▒▓▓",
          text: "When the pupil opens, there is no darkness behind it. There is only a depth with no measurable distance, extending beyond the boundaries of space."
        }
      ]
    },

    // Form 1: TENTACLES / CREATURE (Writhing Eldritch Mass & Cathedral of Teeth)
    {
      heroText: "a cathedral constructed from cartilage and teeth.",
      ticker: "CARTILAGE AND SINEW  //  THOUSANDS OF TINY HUMAN FINGERS  //  IT DOES NOT OBEY SHAPE  //  IT SIMPLY HATES  //  ",
      cards: [
        {
          title: "the mass",
          pre: " ~ ~ ~ ~ ~ ~ ~\n ~ ~ ~ ~ ~ ~ ~\n { writhe();     }\n { tentacles++;  }\n { decay();      }",
          text: "Sometimes it becomes a worm. Sometimes a hand. Sometimes a wet, blind mass dragging itself across an impossible landscape on thousands of tiny human fingers."
        },
        {
          title: "the cage",
          pre: " .  :  .  :  .  :\n :  .  :  .  :  .\n ░░░░░░░░░░░░░░░░\n ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n ████████████████",
          text: "Its ribs separate like fingers. Between them hangs a tiny black eye where a heart should be, blinking wetly inside the cage of bone."
        },
        {
          title: "the shape",
          pre: "01000011 01010010\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓\n▓▓▒▒░ NO LAW ░▒▒▓▓\n▓▓▒▒░░░░░░░░▒▒▓▓",
          text: "The thing does not obey size. It does not obey shape. It does not obey any law. It simply hates."
        }
      ]
    },

    // Form 2: SMALL MAN (The Smiling Man staring straight at user)
    {
      heroText: "the face is always smiling. it does not know what a smile is.",
      ticker: "THE FACE OF A MAN  //  IT DOES NOT KNOW WHAT A SMILE IS  //  THE JAW UNHINGES  //  NO. NO. NO.  //  ",
      cards: [
        {
          title: "the visage",
          pre: "   .---.\n  /  .  \\\n |  o o  |  <-- FIXED GAZE\n |   ^   |\n  \\  =  /\n   '---'",
          text: "He is thin and hairless, with pale skin stretched tightly over a skull that seems almost human, assembled from the memories of countless dead men."
        },
        {
          title: "the wound",
          pre: " ~ ~ ~ ~ ~ ~ ~\n { mouth.split();}\n { cheek.tear(); }\n { jaw.unhinge();}\n { } /* a wound */",
          text: "The mouth stretches wider. The lips split. The cheeks tear backward. The jaw unhinges until the man's face becomes little more than a wound."
        },
        {
          title: "the sound",
          pre: "01001110 01001111\n▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\nNO NO NO NO NO NO\nNO NO NO NO NO NO\n▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
          text: "From that wound comes a sound like millions of voices whispering a single word: No. No. No. No. No."
        }
      ]
    },

    // Form 3: MONOLITH (Primordial Stone Obelisk & Origin)
    {
      heroText: "it hates stone because stone persists.",
      ticker: "IT HATES STONE  //  STARS IGNITED BECAUSE THEY OFFENDED IT  //  HATRED WAS SIMPLY THE SHAPE  //  EVERY GRAVE A COMPROMISE  //  ",
      cards: [
        {
          title: "the persistence",
          pre: " .  :  .  :  .  :\n :  .  :  .  :  .\n ░░░░░░░░░░░░░░░░\n ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n ████████████████",
          text: "It hates stone because stone persists. It hates water because water moves. It hates light because light reveals. Every birth is another insult."
        },
        {
          title: "the origin",
          pre: "01000011 01010010\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓\n▓▓▒▒░ FIRST ░▒▒▓▓\n▓▓▒▒░ VIOLENCE ░▒▒▓▓",
          text: "It remembers being born. That is the first lie. Nothing gave birth to it. Reality appeared because the thing needed something to hate."
        },
        {
          title: "the question",
          pre: " ~ ~ ~ ~ ~ ~ ~\n { ask('why?');  }\n { laugh();      }\n { scream();     }\n { } /* no why */",
          text: "A mind older than thought asked why. The thing laughed. Hatred did not come from pain. Hatred was simply the shape of the thing."
        }
      ]
    },

    // Form 4: VOID VORTEX (Revelation & Final Eye)
    {
      heroText: "in the blackness of its pupil, another eye opened.",
      ticker: "IN THE PUPIL ANOTHER EYE OPENED  //  THE NEW EYE STARED BACK  //  AT LAST SOMETHING LEFT TO HATE  //  ",
      cards: [
        {
          title: "the revelation",
          pre: "01000000 01000000\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n▓▓▒▒░ NOTHING ░▒▒▓▓\n▓▓▒▒░ NO REASON░▒▒▓▓\n▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
          text: "It looked inward. There was no soul. No heart. No memory. No purpose. It hated the fact that it had understood."
        },
        {
          title: "the expansion",
          pre: " .  :  .  :  .  :\n :  .  :  .  :  .\n ░░░░░░░░░░░░░░░░\n ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n ████████████████",
          text: "The eye widened. It filled every grave. Every womb. Every empty room. Every nightmare. Every thought that ever wondered if existence possessed meaning."
        },
        {
          title: "the second eye",
          pre: "   .---.\n  /  o  \\\n |  (O)  |  <-- THE NEW EYE\n  \\  o  /\n   '---'",
          text: "It floated in the absence of everything. And inside the pupil, something opened an eye. The new eye stared back. At last, there was something left to hate."
        }
      ]
    }
  ];

  var clk = document.getElementById("clock");
  if (clk) {
    setInterval(function () {
      clk.textContent = new Date().toISOString().slice(11, 19) + " and counting";
    }, 1000);
  }

  // Audio Toggle Button binding
  var audioBtn = document.getElementById("audio-toggle");
  if (audioBtn) {
    audioBtn.addEventListener("click", function () {
      var active = CosmicAudio.toggle();
      audioBtn.textContent = active ? "AUDIO: SOUNDING" : "AUDIO: MUTED";
      audioBtn.style.color = active ? "#a3262b" : "#6a5650";
    });
  }

  // Canvas setup
  var cv = document.getElementById("c");
  if (!cv) return;
  var ctx = cv.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CW = 10, CH = 16, cols, rows, W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var auto = window.matchMedia("(hover: none)").matches;
  var nextLook = 0;
  var mx = 0, my = 0, tx = 0, ty = 0;
  var heroText = document.querySelector(".hero p");
  var tickEl = document.getElementById("tick");

  // State machine variables
  var currentForm = 0;
  var targetForm = 0;
  var totalForms = 5;
  var isGlitching = false;
  var glitchEndTime = 0;
  var nextFormSwitchTime = 0;
  var nextMicroGlitchTime = 0;

  function size() {
    W = cv.clientWidth;
    H = cv.clientHeight;
    var small = W < 600;
    CW = small ? 6 : 10;
    CH = small ? 10 : 16;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.floor(W / CW);
    rows = Math.floor(H / CH);
    ctx.font = (CH - 2) + "px 'Courier New',monospace";
    ctx.textBaseline = "top";
  }
  size();
  addEventListener("resize", size);

  // Pointer move handler
  addEventListener("pointermove", function (e) {
    if (auto) return;
    // Small man form explicitly ignores cursor tracking!
    if (currentForm === 2 && !isGlitching) {
      tx = 0;
      ty = 0;
      return;
    }
    var r = cv.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });

  // Interactive Keydown / Click triggers instant glitch burst
  addEventListener("keydown", function (e) {
    CosmicGlitch.triggerMicroGlitch();
    CosmicAudio.playGlitchSound();
  });

  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function () {
      CosmicGlitch.triggerMicroGlitch();
      CosmicAudio.playGlitchSound();
    });
  });

  // Form setup data for Eye form
  var P = [], N = 5200, k, g = Math.PI * (3 - Math.sqrt(5));
  for (k = 0; k < N; k++) {
    var y = 1 - (k / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), th = g * k;
    var x = Math.cos(th) * rad, z = Math.sin(th) * rad;
    var d = Math.sin(x * 7 + y * 3) * Math.sin(y * 6 - z * 4) * Math.sin(z * 8 + x * 2);
    var spike = Math.pow(Math.abs(d), 1.4) * 0.9;
    var r = 0.85 + spike;
    P.push([x * r, y * r, z * r, spike]);
  }

  var S = [], j;
  for (j = 0; j < 260; j++) {
    var a = Math.random() * Math.PI * 2, rr = 1.7 + Math.random() * 0.5;
    S.push([Math.cos(a) * rr, (Math.random() - 0.5) * 0.25, Math.sin(a) * rr, a]);
  }

  var F = [], q;
  for (q = 0; q < 20; q++) {
    F.push({ x: Math.random(), y: Math.random(), vx: 0, vy: 0 });
  }

  var RAMP = [
    ["0", "1"],
    ["0", "1", "{", "}"],
    ["<", ">", "/", "\\"],
    ["#", "%", "&", "@"],
    ["▒", "░"],
    ["▓", "▒"],
    ["█", "▓"]
  ];

  function updatePageStoryContent(formIdx) {
    var data = STORY_FORM_DATA[formIdx];
    if (!data) return;

    // Update Audio Profile seamlessly
    if (window.CosmicAudio && window.CosmicAudio.setFormAudioProfile) {
      window.CosmicAudio.setFormAudioProfile(formIdx);
    }

    // Update Hero Caption
    if (heroText) heroText.textContent = data.heroText;

    // Update Ticker
    if (tickEl) {
      var tStr = "";
      for (var i = 0; i < 5; i++) tStr += data.ticker;
      tickEl.textContent = tStr;
    }

    // Update Cards
    var cardEls = document.querySelectorAll(".card");
    cardEls.forEach(function (card, idx) {
      if (data.cards[idx]) {
        var h3 = card.querySelector("h3");
        var pre = card.querySelector("pre");
        var p = card.querySelector("p");

        if (h3) h3.textContent = data.cards[idx].title;
        if (pre) pre.textContent = data.cards[idx].pre;
        if (p) p.textContent = data.cards[idx].text;
      }
    });
  }

  function triggerGlitch(duration, newForm) {
    isGlitching = true;
    glitchEndTime = performance.now() + duration;
    targetForm = newForm;
    CosmicGlitch.triggerMajorGlitch(duration);
    CosmicAudio.playGlitchSound();

    if (heroText) {
      heroText.textContent = CosmicGlitch.corruptString("NO_NO_NO_0x" + Math.floor(Math.random() * 255).toString(16).toUpperCase(), 0.5);
    }
  }

  window.CosmicForceForm = function(formIdx) {
    if (formIdx >= 0 && formIdx < totalForms) {
      triggerGlitch(1400, formIdx);
      scheduleNextSwitch(performance.now());
    }
  };

  function scheduleNextSwitch(now) {
    // Switch forms every 7 to 12 seconds
    nextFormSwitchTime = now + 7000 + Math.random() * 5000;
  }

  function scheduleNextMicroGlitch(now) {
    // Frequent micro-glitches every 1.2 to 2.8 seconds
    nextMicroGlitchTime = now + 1200 + Math.random() * 1600;
  }

  // Initial Content & Audio Load
  updatePageStoryContent(0);

  /* --- MAIN ANIMATION LOOP --- */
  function frame(t) {
    var n = cols * rows, i;
    var zb = new Float32Array(n).fill(-9);
    var ch = new Array(n);
    var co = new Array(n);

    // Frequent Micro-glitch timer trigger
    if (t > nextMicroGlitchTime && !isGlitching) {
      CosmicGlitch.triggerMicroGlitch();
      if (Math.random() < 0.6) CosmicAudio.playGlitchSound();
      scheduleNextMicroGlitch(t);
    }

    // Form Switch timer trigger
    if (t > nextFormSwitchTime && !isGlitching) {
      var nextF = (currentForm + 1) % totalForms;
      triggerGlitch(1600, nextF);
      scheduleNextSwitch(t);
    }

    // Glitch completion -> Apply new story content & audio profile
    if (isGlitching && t > glitchEndTime) {
      isGlitching = false;
      currentForm = targetForm;
      updatePageStoryContent(currentForm);
    }

    // Touch device auto look target
    if (auto && t > nextLook) {
      if (currentForm !== 2) {
        tx = (Math.random() * 2 - 1) * 0.95;
        ty = (Math.random() * 2 - 1) * 0.8;
      } else {
        tx = 0;
        ty = 0;
      }
      nextLook = t + 1600 + Math.random() * 2600;
    }

    // Small man form: LOCK LOOK GAZE AT (0,0) - NO MOUSE TRACKING
    if (currentForm === 2 && !isGlitching) {
      tx = 0;
      ty = 0;
    }

    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;

    var ay = reduce ? 0.6 : t * 0.00016;
    var ax = 0.35 + my * 0.2;
    var cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
    var sc = Math.min(W, H * 1.35) * (W < 600 ? 0.36 : 0.3);
    var ox = cols / 2, oy = rows / 2;

    // Delegate rendering to CosmicEntities library
    var renderForm = isGlitching ? (Math.random() < 0.5 ? currentForm : targetForm) : currentForm;

    if (renderForm === 0) {
      CosmicEntities.renderEyeForm(t, zb, ch, co, ox, oy, sc, cy, sy, cx, sx, mx, my, cols, rows, CW, CH, W, P, S, RAMP, reduce);
    } else if (renderForm === 1) {
      CosmicEntities.renderTentaclesForm(t, zb, ch, co, ox, oy, sc, cy, sy, cx, sx, mx, my, cols, rows, CW, CH);
    } else if (renderForm === 2) {
      CosmicEntities.renderSmallManForm(t, zb, ch, co, ox, oy, sc, cols, rows, CW, CH);
    } else if (renderForm === 3) {
      CosmicEntities.renderMonolithForm(t, zb, ch, co, ox, oy, sc, cy, sy, cx, sx, cols, rows, CW, CH);
    } else {
      CosmicEntities.renderVoidVortexForm(t, zb, ch, co, ox, oy, sc, cols, rows, CW, CH);
    }

    // Background fill
    ctx.fillStyle = "#050303";
    ctx.fillRect(0, 0, W, H);

    // Canvas line tearing & character distortion (frequent!)
    var glitchActive = isGlitching || (Math.random() < 0.08);
    var rowOffset = 0;

    var row, col, c;
    for (row = 0; row < rows; row++) {
      if (glitchActive && Math.random() < 0.18) {
        rowOffset = Math.floor((Math.random() - 0.5) * 12);
      } else {
        rowOffset = 0;
      }

      for (col = 0; col < cols; col++) {
        var drawCol = col + rowOffset;
        if (drawCol < 0 || drawCol >= cols) continue;

        i = row * cols + drawCol;
        c = ch[i];

        if (glitchActive && Math.random() < 0.06 && c && c !== " ") {
          c = CosmicGlitch.corruptString("X", 1.0);
          co[i] = Math.random() < 0.5 ? "#a3262b" : "#ffffff";
        }

        if (c && c !== " ") {
          ctx.fillStyle = co[i] || "#d8cbbd";
          ctx.fillText(c, col * CW, row * CH);
        }
      }
    }

    // Swarming flies
    ctx.fillStyle = renderForm === 1 ? "#a3262b" : "#8d7f74";
    var flySpeedMultiplier = renderForm === 1 ? 2.5 : 1.0;
    for (q = 0; q < F.length; q++) {
      var fly = F[q];
      fly.vx += (Math.random() - 0.5) * 0.004 * flySpeedMultiplier + (0.5 - fly.x) * 0.0006;
      fly.vy += (Math.random() - 0.5) * 0.004 * flySpeedMultiplier + (0.5 - fly.y) * 0.0006;
      fly.vx *= 0.92;
      fly.vy *= 0.92;
      if (!reduce) {
        fly.x += fly.vx;
        fly.y += fly.vy;
      }
      ctx.fillText(Math.random() < 0.5 ? "x" : "+", fly.x * W, fly.y * H);
    }

    if (!reduce) requestAnimationFrame(frame);
  }

  scheduleNextSwitch(performance.now());
  scheduleNextMicroGlitch(performance.now());
  requestAnimationFrame(frame);
  if (reduce) addEventListener("resize", function () { requestAnimationFrame(frame); });
})();
