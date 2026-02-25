<script>
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CUSTOM CURSOR (DESKTOP ONLY)
  ========================= */
  if (!("ontouchstart" in window)) {

    const cursor = document.createElement("div");
    cursor.className = "cursor";

    const follower = document.createElement("div");
    follower.className = "cursor-follower";

    document.body.append(cursor, follower);

    let mouseX = 0, mouseY = 0;
    let fx = 0, fy = 0;

    document.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    function animateFollower() {
      fx += (mouseX - fx) * 0.15;
      fy += (mouseY - fy) * 0.15;

      follower.style.left = fx + "px";
      follower.style.top = fy + "px";

      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  /* =========================
     VIDEO VISIBILITY CONTROL
  ========================= */
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.35 });

  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;

    observer.observe(video);

    // Hover play (desktop only)
    video.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    video.addEventListener("mouseleave", () => {
      video.pause();
    });
  });

  /* =========================
     SMOOTH SCROLL (INTERNAL LINKS)
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

});
</script>
