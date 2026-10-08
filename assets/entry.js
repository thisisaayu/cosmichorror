/* ---------- Entry Gate - Universal Autoplay Solution ----------
 * Shows a full-screen overlay on page load.
 * The user's click/tap is a real user gesture, so AudioContext.resume()
 * is guaranteed to succeed on every browser (Chrome, Firefox/Zen, Safari).
 * Once dismissed the overlay fades out and audio starts.
 * ----------------------------------------------------------------- */
(function () {
  var gate = document.getElementById("entry-gate");
  if (!gate) return;

  function dismiss() {
    // runs inside a real user gesture - AudioContext will always start.
    CosmicAudio.init();

    gate.classList.add("gate-fade");
    gate.addEventListener("transitionend", function () {
      gate.style.display = "none";
    }, { once: true });

    // Failsafe: hide after 1.2 s even if transitionend never fires
    setTimeout(function () { gate.style.display = "none"; }, 1200);
  }

  gate.addEventListener("click",     dismiss, { once: true });
  gate.addEventListener("touchstart", dismiss, { once: true, passive: true });
  gate.addEventListener("keydown",    dismiss, { once: true });
})();
