/* Clean Rituals — landing page interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Email signup handling ------------------------------------------
  // NOTE: This is a front-end stub. To actually collect emails, connect the
  // form to a provider (Mailchimp, ConvertKit, Klaviyo, Formspree, etc.)
  // by replacing the body of handleSignup with a fetch() to your endpoint.
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSignup(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var note = form.parentElement.querySelector("[data-form-note]");
      var email = input.value.trim();

      if (!isValidEmail(email)) {
        if (note) note.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }

      // TODO: send `email` to your mailing-list provider here.
      if (note) note.textContent = "Thank you — we'll write to you once, when it's time.";
      form.reset();
    });
  }

  document.querySelectorAll(".signup").forEach(handleSignup);

  // --- Scroll reveal ---------------------------------------------------
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
