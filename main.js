/* Clean Rituals — landing page interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Email signup handling ------------------------------------------
  // Sends the email to our own backend (server.js -> emails.csv).
  // No third-party tools involved.
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSignup(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var button = form.querySelector("button");
      var note = form.parentElement.querySelector("[data-form-note]");
      var email = input.value.trim();

      if (!isValidEmail(email)) {
        if (note) note.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }

      button.disabled = true;
      var originalLabel = button.textContent;
      button.textContent = "Sending…";

      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, source: form.id })
      })
        .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
        .then(function (result) {
          if (result.ok && result.data.ok) {
            // Replace the form with a brand-styled success state
            form.innerHTML =
              '<p class="signup-success">✓ ' +
              (result.data.message || "You're on the list.") +
              "</p>";
            if (note) note.textContent = "";
          } else {
            if (note) note.textContent = (result.data && result.data.error) || "Something went wrong. Please try again.";
            button.disabled = false;
            button.textContent = originalLabel;
          }
        })
        .catch(function () {
          if (note) note.textContent = "Couldn't reach the server. Please try again.";
          button.disabled = false;
          button.textContent = originalLabel;
        });
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
