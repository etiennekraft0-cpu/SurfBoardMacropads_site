document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero + section fade/slide in
  document.querySelectorAll('[data-animate="hero"], [data-animate="section"]').forEach((el, index) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: index === 0 ? 0.1 : 0.15,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Subtle parallax on hero background waves
  document.querySelectorAll(".wave").forEach((wave, i) => {
    gsap.to(wave, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: wave.closest("section") || wave,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Tilt effect on cards and devices
  const tiltElements = document.querySelectorAll("[data-tilt]");
  tiltElements.forEach((el) => {
    const strength = 10;

    const handleMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * strength;
      const rotateX = ((y / rect.height) - 0.5) * -strength;

      gsap.to(el, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 800,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const resetTilt = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", resetTilt);
  });
});
