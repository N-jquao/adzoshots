/* adzo jane — theme toggle + form feedback. No dependencies. */
(function () {
  "use strict";

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  var label = document.getElementById("themeLabel");

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function apply(dark) {
    root.dataset.theme = dark ? "dark" : "light";
    store("adzo-theme", dark ? "dark" : "light");
    if (label) label.textContent = dark ? "Light" : "Dark";
    if (btn) {
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  apply(read("adzo-theme") === "dark");
  if (btn) btn.addEventListener("click", function () { apply(root.dataset.theme !== "dark"); });

  /* ---------- enquiry form ---------- */
  var enquiry = document.getElementById("enquiryForm");
  var note = document.getElementById("formNote");
  if (enquiry) {
    enquiry.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!enquiry.checkValidity()) {
        if (note) note.textContent = "Add your name and email so I can reply.";
        var bad = enquiry.querySelector(":invalid");
        if (bad) bad.focus();
        return;
      }
      if (note) note.textContent = "Sent. I reply to everything within two working days.";
      enquiry.reset();
    });
  }

  /* ---------- newsletter ---------- */
  var news = document.getElementById("newsForm");
  var newsNote = document.getElementById("newsNote");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = news.checkValidity();
      if (newsNote) newsNote.textContent = ok ? "Subscribed." : "Enter a valid email address.";
      if (ok) news.reset(); else news.querySelector("input").focus();
    });
  }
})();
