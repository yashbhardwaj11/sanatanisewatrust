var timeout;
var xscale = 1;
var yscale = 1;
var xprev = 0;
var yprev = 0;

function circleChaptaKaro() {
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      const circle = document.querySelector("#minicircle");
      circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY + window.scrollY}px) scale(1, 1)`;
    }, 100);
  });

  window.addEventListener("mouseleave", function () {
    removeCircle();
  });
}

function circleMouseFollower(xscale, yscale) {
  const circle = document.querySelector("#minicircle");
  circle.style.transform = `translate(${event.clientX}px, ${event.clientY + window.scrollY}px) scale(${xscale}, ${yscale})`;
}

function removeCircle() {
  const circle = document.querySelector("#minicircle");
  if (circle) {
    circle.style.opacity = 0;
  }
}

circleChaptaKaro();
