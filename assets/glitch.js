/* ---------- DOM Text Glitch & Corruption Engine ---------- */
var CosmicGlitch = (function () {
  var CORRUPT_CHARS = "01001100 01001111 01010010 01000100 ▓▒░█#%@&$*!?/\\<>~§†‡";

  function corruptString(str, intensity) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        result += " ";
      } else if (Math.random() < intensity) {
        result += CORRUPT_CHARS[Math.floor(Math.random() * CORRUPT_CHARS.length)];
      } else {
        result += str[i];
      }
    }
    return result;
  }

  function triggerMicroGlitch() {
    var targets = document.querySelectorAll(".card h3, .card p, .hero p");
    if (targets.length === 0) return;

    var numToGlitch = Math.floor(Math.random() * 2) + 1;
    var glitchedElements = [];

    for (var i = 0; i < numToGlitch; i++) {
      var el = targets[Math.floor(Math.random() * targets.length)];
      if (!glitchedElements.includes(el)) {
        glitchedElements.push(el);
      }
    }

    // Scramble briefly and restore the EXACT current text of the active form
    glitchedElements.forEach(function (el) {
      var currentBaseText = el.textContent;
      el.textContent = corruptString(currentBaseText, 0.45);
      el.classList.add("glitch-text", "active");

      setTimeout(function () {
        el.textContent = currentBaseText;
        el.classList.remove("glitch-text", "active");
      }, 120 + Math.random() * 220);
    });

    // Screen shake
    if (Math.random() < 0.35) {
      document.body.classList.add("glitching");
      setTimeout(function () {
        document.body.classList.remove("glitching");
      }, 100 + Math.random() * 150);
    }
  }

  function triggerMajorGlitch(duration) {
    document.body.classList.add("glitching");

    var targets = document.querySelectorAll(".card h3, .card p, .hero p");
    var baseTexts = new Map();
    targets.forEach(function(el) {
      baseTexts.set(el, el.textContent);
    });

    var interval = setInterval(function () {
      targets.forEach(function (el) {
        var base = baseTexts.get(el) || el.textContent;
        el.textContent = corruptString(base, 0.7);
        el.classList.add("glitch-text", "active");
      });
    }, 60);

    setTimeout(function () {
      clearInterval(interval);
      document.body.classList.remove("glitching");
      targets.forEach(function (el) {
        el.classList.remove("glitch-text", "active");
      });
    }, duration);
  }

  return {
    triggerMicroGlitch: triggerMicroGlitch,
    triggerMajorGlitch: triggerMajorGlitch,
    corruptString: corruptString
  };
})();
