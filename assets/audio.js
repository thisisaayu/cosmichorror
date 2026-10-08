/* ---------- Web Audio API Form-Specific Cosmic Audio Engine ---------- */
var CosmicAudio = (function () {
  var ctx = null;
  var isPlaying = true;
  var masterGain = null;
  var currentFormIdx = 0;

  // Audio Nodes
  var droneOsc = null;
  var droneOsc2 = null;
  var droneGain = null;

  var painOsc = null;
  var painLFO = null;
  var painGain = null;

  var sophOsc1 = null;
  var sophOsc2 = null;
  var sophGain = null;

  var noiseNode = null;
  var noiseFilter = null;
  var noiseGain = null;

  function init() {
    if (ctx) {
      // Called again (e.g. double-tap on mobile) - just make sure we're running.
      if (ctx.state !== "running") {
        ctx.resume().then(function () {
          isPlaying = true;
          setFormAudioProfile(currentFormIdx);
        }).catch(function () {});
      }
      return;
    }
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    ctx = new AudioCtx();
    // Attempt immediate start; silently ignored on browsers that block autoplay.
    ctx.resume().catch(function () {});

    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
    masterGain.connect(ctx.destination);

    var now = ctx.currentTime;

    // 1. DRONE ENGINE (For EYE - Hum)
    droneOsc = ctx.createOscillator();
    droneOsc.type = "sine";
    droneOsc.frequency.setValueAtTime(55, now);

    droneOsc2 = ctx.createOscillator();
    droneOsc2.type = "sawtooth";
    droneOsc2.frequency.setValueAtTime(55.4, now);

    var droneFilter = ctx.createBiquadFilter();
    droneFilter.type = "lowpass";
    droneFilter.frequency.setValueAtTime(160, now);

    droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.6, now);

    droneOsc.connect(droneFilter);
    droneOsc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    droneOsc.start();
    droneOsc2.start();

    // 2. PAIN ENGINE (For ELDRITCH MASS - Agonizing Pain Groan)
    painOsc = ctx.createOscillator();
    painOsc.type = "sawtooth";
    painOsc.frequency.setValueAtTime(80, now);

    painLFO = ctx.createOscillator();
    painLFO.type = "sine";
    painLFO.frequency.setValueAtTime(3.5, now);

    var painLFOGain = ctx.createGain();
    painLFOGain.gain.setValueAtTime(25, now);

    painLFO.connect(painOsc.frequency);

    var painFilter = ctx.createBiquadFilter();
    painFilter.type = "bandpass";
    painFilter.frequency.setValueAtTime(280, now);
    painFilter.Q.setValueAtTime(6.0, now);

    painGain = ctx.createGain();
    painGain.gain.setValueAtTime(0, now);

    painOsc.connect(painFilter);
    painFilter.connect(painGain);
    painGain.connect(masterGain);

    painOsc.start();
    painLFO.start();

    // 3. SOPHISTICATED ENGINE (For SMALL MAN - Pure Glass Tone Interval)
    sophOsc1 = ctx.createOscillator();
    sophOsc1.type = "sine";
    sophOsc1.frequency.setValueAtTime(440, now);

    sophOsc2 = ctx.createOscillator();
    sophOsc2.type = "sine";
    sophOsc2.frequency.setValueAtTime(660, now);

    sophGain = ctx.createGain();
    sophGain.gain.setValueAtTime(0, now);

    var sophFilter = ctx.createBiquadFilter();
    sophFilter.type = "lowpass";
    sophFilter.frequency.setValueAtTime(1200, now);

    sophOsc1.connect(sophFilter);
    sophOsc2.connect(sophFilter);
    sophFilter.connect(sophGain);
    sophGain.connect(masterGain);

    sophOsc1.start();
    sophOsc2.start();

    // 4. NOISE ENGINE (For VOID VORTEX - Chaotic Swirling Noise)
    var bufferSize = ctx.sampleRate * 2;
    var noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(400, now);
    noiseFilter.Q.setValueAtTime(2.0, now);

    noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, now);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noiseNode.start();
    isPlaying = true;

    setFormAudioProfile(currentFormIdx);
  }

  function autoStartOnInteraction() {
    var startEvents = ["pointerdown", "keydown", "pointermove", "scroll", "touchstart"];
    function handler() {
      init();
      startEvents.forEach(function (evt) {
        window.removeEventListener(evt, handler);
      });
    }
    startEvents.forEach(function (evt) {
      window.addEventListener(evt, handler, { passive: true });
    });
  }

  // Bind interaction auto-start
  if (typeof window !== "undefined") {
    autoStartOnInteraction();
  }

  function setFormAudioProfile(formIdx) {
    currentFormIdx = formIdx;
    if (!ctx || ctx.state !== "running") return;
    var now = ctx.currentTime;
    var transitionTime = 0.4;

    if (formIdx === 0) {
      masterGain.gain.setTargetAtTime(0.08, now, transitionTime);
      droneGain.gain.setTargetAtTime(0.6, now, transitionTime);
      painGain.gain.setTargetAtTime(0.0, now, transitionTime);
      sophGain.gain.setTargetAtTime(0.0, now, transitionTime);
      noiseGain.gain.setTargetAtTime(0.04, now, transitionTime);
      noiseFilter.frequency.setTargetAtTime(220, now, transitionTime);
    } else if (formIdx === 1) {
      masterGain.gain.setTargetAtTime(0.12, now, transitionTime);
      droneGain.gain.setTargetAtTime(0.15, now, transitionTime);
      painGain.gain.setTargetAtTime(0.55, now, transitionTime);
      sophGain.gain.setTargetAtTime(0.0, now, transitionTime);
      noiseGain.gain.setTargetAtTime(0.08, now, transitionTime);
      noiseFilter.frequency.setTargetAtTime(320, now, transitionTime);
    } else if (formIdx === 2) {
      masterGain.gain.setTargetAtTime(0.07, now, transitionTime);
      droneGain.gain.setTargetAtTime(0.0, now, transitionTime);
      painGain.gain.setTargetAtTime(0.0, now, transitionTime);
      sophGain.gain.setTargetAtTime(0.35, now, transitionTime);
      noiseGain.gain.setTargetAtTime(0.0, now, transitionTime);
    } else if (formIdx === 3) {
      masterGain.gain.setTargetAtTime(0.0, now, transitionTime);
      droneGain.gain.setTargetAtTime(0.0, now, transitionTime);
      painGain.gain.setTargetAtTime(0.0, now, transitionTime);
      sophGain.gain.setTargetAtTime(0.0, now, transitionTime);
      noiseGain.gain.setTargetAtTime(0.0, now, transitionTime);
    } else if (formIdx === 4) {
      masterGain.gain.setTargetAtTime(0.14, now, transitionTime);
      droneGain.gain.setTargetAtTime(0.2, now, transitionTime);
      painGain.gain.setTargetAtTime(0.1, now, transitionTime);
      sophGain.gain.setTargetAtTime(0.0, now, transitionTime);
      noiseGain.gain.setTargetAtTime(0.35, now, transitionTime);
      noiseFilter.frequency.setValueAtTime(150, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(3200, now + 0.3);
    }
  }

  function playGlitchSound() {
    if (!ctx || ctx.state !== "running") return;
    if (currentFormIdx === 3) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = Math.random() < 0.5 ? "square" : "sawtooth";
      var freq = 120 + Math.random() * 1400;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25 + Math.random() * 40, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }

  function toggle(callback) {
    if (!ctx) {
      // First call ever - init creates the context and resumes it.
      init();
      // init() is synchronous up to ctx.resume() which is async.
      // Poll briefly until the context is running, then report back.
      var attempts = 0;
      var poll = setInterval(function () {
        attempts++;
        if ((ctx && ctx.state === "running") || attempts > 20) {
          clearInterval(poll);
          isPlaying = ctx && ctx.state === "running";
          if (callback) callback(isPlaying);
        }
      }, 50);
      return; // state unknown yet - caller must use callback
    }

    if (ctx.state === "suspended") {
      ctx.resume().then(function () {
        isPlaying = true;
        setFormAudioProfile(currentFormIdx);
        if (callback) callback(true);
      }).catch(function () {
        if (callback) callback(false);
      });
    } else if (ctx.state === "running") {
      ctx.suspend().then(function () {
        isPlaying = false;
        if (callback) callback(false);
      }).catch(function () {
        if (callback) callback(true);
      });
    }
  }

  return {
    init: init,
    toggle: toggle,
    setFormAudioProfile: setFormAudioProfile,
    playGlitchSound: playGlitchSound,
    isPlaying: function () { return isPlaying && ctx && ctx.state === "running"; }
  };
})();
