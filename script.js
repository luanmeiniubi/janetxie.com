/* Motion & interaction layer: mobile nav, staggered scroll reveal,
   magnetic buttons, confetti bursts.
   Everything motion-based respects prefers-reduced-motion and only
   attaches pointer-tracking listeners on fine-pointer (non-touch) devices. */
(function () {
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- Mobile nav toggle ----------
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  // ---------- Staggered reveal-on-scroll ----------
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach(function (el) {
    var parent = el.parentElement;
    var siblings = parent
      ? Array.prototype.filter.call(parent.children, function (c) {
          return c.classList.contains("reveal");
        })
      : [el];
    var idx = siblings.indexOf(el);
    el.style.transitionDelay = Math.min(idx * 80, 480) + "ms";
  });

  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ---------- Confetti burst ----------
  function burstConfetti(x, y) {
    var colors = ["#FFCB3D", "#BD7A5B", "#26221B", "#8C5E0B"];
    var count = 16;
    for (var i = 0; i < count; i++) {
      var dot = document.createElement("span");
      dot.className = "confetti-dot";
      var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      var dist = 55 + Math.random() * 55;
      dot.style.left = x + "px";
      dot.style.top = y + "px";
      dot.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      dot.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      dot.style.setProperty("--spin", Math.round(Math.random() * 360) + "deg");
      dot.style.background = colors[i % colors.length];
      document.body.appendChild(dot);
      dot.addEventListener("animationend", function () { this.remove(); });
    }
  }

  // Fun easter egg: click the avatar photo
  document.querySelectorAll(".avatar").forEach(function (av) {
    av.addEventListener("click", function () {
      var rect = av.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });

  // ---------- Hats interactive: size the embed to its real content ----------
  // The widget is portrait-shaped (tall character + text below) and forcing
  // its wrapper into a fixed/square height kept clipping it. Instead, once
  // the iframe loads, read its own document's actual rendered height and
  // set the wrapper to match exactly — genuinely dynamic, not another
  // guessed number. Re-checked on resize since the widget's own internal
  // sizing scales with the width it's given (see hats-interactive.html),
  // so its natural height changes too when this box's width does.
  var hatsFrame = document.querySelector(".hats-embed");
  if (hatsFrame) {
    var resizeHatsFrame = function () {
      try {
        var doc = hatsFrame.contentDocument || hatsFrame.contentWindow.document;
        var h = Math.max(
          doc.documentElement ? doc.documentElement.scrollHeight : 0,
          doc.body ? doc.body.scrollHeight : 0
        );
        if (h) hatsFrame.style.height = h + "px";
      } catch (err) {
        // Cross-origin (or not loaded yet) — CSS fallback height stays as-is.
      }
    };
    hatsFrame.addEventListener("load", function () {
      resizeHatsFrame();
      window.addEventListener("resize", resizeHatsFrame);
    });
  }

  // ---------- Featured work spotlight (tabs swap the crossfading panel) ----------
  var spotlightTabs = document.querySelectorAll(".spotlight-tab");
  var spotlightPanels = document.querySelectorAll(".spotlight-panel");
  if (spotlightTabs.length && spotlightPanels.length) {
    spotlightTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-target");
        spotlightTabs.forEach(function (t) {
          t.classList.toggle("active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        spotlightPanels.forEach(function (p) {
          p.classList.toggle("active", p.id === target);
        });
      });
    });
  }

  // ---------- Contact form ----------
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.querySelector("#form-status");
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        var rect = submitBtn.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      if (status) {
        status.textContent = "Thanks! This demo form isn't wired to a backend yet — email me directly and I'll reply within a day.";
        status.style.color = "var(--gold-text)";
      }
      form.reset();
    });
  }

  // ---------- Magnetic buttons: fine pointer only ----------
  if (canHover && !reducedMotion) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var mx = (e.clientX - rect.left - rect.width / 2) * 0.22;
        var my = (e.clientY - rect.top - rect.height / 2) * 0.3;
        btn.style.transform = "translate(" + mx + "px, " + my + "px) translateY(-3px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }
})();
