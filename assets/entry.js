/* ---------- Entry Gate - Universal Autoplay Solution ---------- */
(function () {
  var gate = document.getElementById("entry-gate");
  if (!gate) return;

  var dismissed = false;

  function dismiss(e) {
    if (dismissed) return;
    dismissed = true;

    // Prevent the ghost click that mobile fires after touchstart
    if (e && e.type === "touchstart") {
      gate.addEventListener("click", function absorb(ce) {
        ce.preventDefault();
        gate.removeEventListener("click", absorb);
      }, { once: true, capture: true });
    }

    // This is a direct user gesture - AudioContext.resume() is guaranteed here.
    CosmicAudio.init();

    gate.classList.add("gate-fade");
    gate.addEventListener("transitionend", function () {
      gate.style.display = "none";
    }, { once: true });

    // Failsafe in case transitionend never fires
    setTimeout(function () { gate.style.display = "none"; }, 1400);
  }

  gate.addEventListener("touchstart", dismiss, { passive: false });
  gate.addEventListener("click",      dismiss);
  gate.addEventListener("keydown",    dismiss);
})();
