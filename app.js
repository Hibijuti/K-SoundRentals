// ===================================================
// K-SOUNDRENTALS — app.js
// Week 3 JavaScript features go in this file
// ===================================================


// ===== FEATURE 1: HAMBURGER MENU =====

// querySelector finds ONE element using a CSS selector
// Think of it like: "go find the element with id=hamburger"
const hamburger = document.querySelector('#hamburger');
const navLinks  = document.querySelector('#nav-links');

// addEventListener waits for something to happen (a "click")
// then runs the function inside
hamburger.addEventListener('click', function() {
  // toggle adds "open" if it's not there, removes it if it is
  navLinks.classList.toggle('open');

  // Change ☰ to ✕ when open, back to ☰ when closed
  if (navLinks.classList.contains('open')) {
    hamburger.textContent = '✕';
  } else {
    hamburger.textContent = '☰';
  }
});

// When a nav link is clicked — close the menu
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// When user clicks anywhere outside the menu — close it
document.addEventListener('click', function(event) {
  const clickedInsideNav = hamburger.contains(event.target)
    || navLinks.contains(event.target);

  if (!clickedInsideNav) {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  }
});


// ===== FEATURE 2: BOOK THIS → AUTO-SELECT PACKAGE =====
//
// How this works:
// 1. Find all buttons with class "book-btn"
// 2. When one is clicked, read its data-package value
// 3. Find the matching option in the dropdown and select it
// 4. Smoothly scroll down to the booking form
// 5. Highlight the dropdown briefly so the user notices it changed

const bookBtns = document.querySelectorAll('.book-btn');
const packageSelect = document.getElementById('package-select');
const bookingSection = document.getElementById('booking');

bookBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {

    // Read the data-package value from the clicked button
    // e.g. "Full Karaoke — ₱1,299 (12 hrs)"
    const packageName = btn.dataset.package;

    // Loop through each option in the dropdown
    // and find the one whose text matches packageName
    const options = packageSelect.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].text === packageName) {
        packageSelect.selectedIndex = i; // select it
        break; // stop looping once found
      }
    }

    // Smoothly scroll to the booking section
    bookingSection.scrollIntoView({ behavior: 'smooth' });

    // Flash the dropdown orange so user knows it was set
    packageSelect.style.borderColor = '#ff8c00';
    packageSelect.style.transition = 'border-color 0.3s';
    setTimeout(function() {
      packageSelect.style.borderColor = '';
    }, 2000); // resets after 2 seconds

  });
});