document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-section');
    const welcomeText = document.getElementById('welcome-text');
    const contentContainer = document.getElementById('content-container');
    const typedQuotesElement = document.getElementById('typed-quotes');
  
    // Quotes to display
    const quotes = [
      '"Only believe, all things are possible." – William Marion Branham',
      '"The message of the hour is the revelation of Jesus Christ." – William Marion Branham',
      '"God is revealed in simplicity and hides in humility." – William Marion Branham',
    ];
  
    // Typing Effect
    function typeEffect(element, text, speed, callback) {
      let i = 0;
      const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(callback, 1000); // Pause before callback
        }
      }, speed);
    }
  
    // Erase Effect
    function eraseEffect(element, speed, callback) {
      const text = element.textContent;
      let i = text.length;
      const interval = setInterval(() => {
        element.textContent = text.substring(0, i);
        i--;
        if (i < 0) {
          clearInterval(interval);
          setTimeout(callback, 500); // Pause before callback
        }
      }, speed);
    }
  
    // Cycle Through Quotes
    function cycleQuotes() {
      let currentIndex = 0;
      function displayNextQuote() {
        eraseEffect(typedQuotesElement, 50, () => {
          typedQuotesElement.textContent = '';
          currentIndex = (currentIndex + 1) % quotes.length;
          typeEffect(typedQuotesElement, quotes[currentIndex], 50, displayNextQuote);
        });
      }
      typeEffect(typedQuotesElement, quotes[currentIndex], 50, displayNextQuote);
    }
  
    // Sequence of Events
    window.addEventListener('load', () => {
      typeEffect(welcomeText, 'Welcome to Local Christian Assembly London', 50, () => {
        eraseEffect(welcomeText, 50, () => {
          heroSection.classList.add('hero-ready'); // Remove blur
          contentContainer.classList.remove('d-none'); // Show scripture and quotes
          cycleQuotes(); // Start quotes cycle
        });
      });
    });
  });
  