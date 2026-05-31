// ==========================================================================
// TESTIMONIAL SLIDESHOW ENGINE CONTROLLER
// ==========================================================================
const quotes = document.querySelectorAll(".testimonial-item");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevQuote");
const nextBtn = document.getElementById("nextQuote");
let currentIdx = 0;

function shiftQuote(targetIdx) {
  // Strip active states off previous indicators
  quotes[currentIdx].classList.remove("active");
  dots[currentIdx].classList.remove("active");

  // Assign index safely
  currentIdx = targetIdx;

  // Handle cyclic boundaries
  if (currentIdx >= quotes.length) currentIdx = 0;
  if (currentIdx < 0) currentIdx = quotes.length - 1;

  // Inject active visibility states
  quotes[currentIdx].classList.add("active");
  dots[currentIdx].classList.add("active");
}

// Arrow Button Dynamic Links
nextBtn.addEventListener("click", () => {
  shiftQuote(currentIdx + 1);
});

prevBtn.addEventListener("click", () => {
  shiftQuote(currentIdx - 1);
});

// Dot Track Jump Interactivity
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const clickedIdx = parseInt(e.target.getAttribute("data-index"));
    if (clickedIdx !== currentIdx) {
      shiftQuote(clickedIdx);
    }
  });
});

// Auto-Rotation Setup (Shifts beautifully every 8 seconds)
let quoteInterval = setInterval(() => {
  shiftQuote(currentIdx + 1);
}, 8000);

// Reset auto-rotate clock timers if user clicks explicit navigation keys
function resetQuoteTimer() {
  clearInterval(quoteInterval);
  quoteInterval = setInterval(() => {
    shiftQuote(currentIdx + 1);
  }, 8000);
}

nextBtn.addEventListener("click", resetQuoteTimer);
prevBtn.addEventListener("click", resetQuoteTimer);
dots.forEach((dot) => dot.addEventListener("click", resetQuoteTimer));
