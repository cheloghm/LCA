document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-section');
    const welcomeText = document.getElementById('welcome-text');
    const contentContainer = document.getElementById('content-container');
    const typedQuotesElement = document.getElementById('typed-quotes');
    const navbar = document.querySelector('.navbar');

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

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Scroll-Based Animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Modal Enhancements for Devotionals and Sermons
    const devotionalModal = document.getElementById('devotionalModal');
    const sermonModal = document.getElementById('sermonModal');

    // Example data for devotionals
    const devotionals = [
      {
        title: '"The Power of Faith"',
        verse: 'Hebrews 11:1',
        image: 'IMG/dnk-photo-PdXqqLO6jtw-unsplash.jpg',
        fullText: 'Faith is the substance of things hoped for, the evidence of things not seen. This devotional explores how faith empowers us to overcome challenges and trust in God\'s plan.'
      },
      {
        title: '"Walking in Faith"',
        verse: '2 Corinthians 5:7',
        image: 'IMG/neal-e-johnson-oQC81OHcl4Q-unsplash.jpg',
        fullText: 'For we walk by faith, not by sight. This devotional encourages believers to rely on faith as they navigate life\'s uncertainties, keeping their eyes on God\'s promises.'
      },
      // Add more devotionals as needed
    ];

    // Event Listener for Devotional Modal
    devotionalModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const carouselItem = button.closest('.carousel-item');
      const title = carouselItem.querySelector('.card-title').textContent;
      const verse = carouselItem.querySelector('.card-text strong').nextSibling.textContent.trim();
      const imageSrc = carouselItem.querySelector('img').src;
      const fullText = carouselItem.querySelector('.card-text').nextElementSibling ? carouselItem.querySelector('.card-text').nextElementSibling.textContent.trim() : '';

      const modalTitle = devotionalModal.querySelector('.modal-title');
      const modalVerse = devotionalModal.querySelector('#devotionalVerse');
      const modalImage = devotionalModal.querySelector('#devotionalImage');
      const modalFull = devotionalModal.querySelector('#devotionalFull');

      modalTitle.textContent = title;
      modalVerse.textContent = `Verse: ${verse}`;
      modalImage.src = imageSrc;
      modalFull.textContent = fullText;
    });

    // Example data for sermons
    const sermons = [
      {
        title: '"Walking in the Light"',
        videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Explore the profound message of walking in the light of Christ.',
        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        title: '"The Path of Righteousness"',
        videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Delve into the message about walking in the righteousness of God.',
        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      // Add more sermons as needed
    ];

    // Event Listener for Sermon Modal
    sermonModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const carouselItem = button.closest('.carousel-item');
      const title = carouselItem.querySelector('.card-title').textContent;
      const videoSrc = carouselItem.querySelector('iframe').src;
      const description = carouselItem.querySelector('.card-text').textContent;
      const youtubeLink = carouselItem.querySelector('iframe').src;

      const modalTitle = sermonModal.querySelector('.modal-title');
      const modalVideo = sermonModal.querySelector('#sermonVideo');
      const modalDescription = sermonModal.querySelector('#sermonDescription');
      const modalYouTubeLink = sermonModal.querySelector('#sermonYouTubeLink');

      modalTitle.textContent = title;
      modalVideo.src = videoSrc;
      modalDescription.textContent = description;
      modalYouTubeLink.href = youtubeLink;
    });

    // Reset Modal Content on Close
    devotionalModal.addEventListener('hidden.bs.modal', function () {
      devotionalModal.querySelector('.modal-title').textContent = '';
      devotionalModal.querySelector('#devotionalVerse').textContent = '';
      devotionalModal.querySelector('#devotionalImage').src = '#';
      devotionalModal.querySelector('#devotionalFull').textContent = '';
    });

    sermonModal.addEventListener('hidden.bs.modal', function () {
      sermonModal.querySelector('.modal-title').textContent = '';
      sermonModal.querySelector('#sermonVideo').src = '';
      sermonModal.querySelector('#sermonDescription').textContent = '';
      sermonModal.querySelector('#sermonYouTubeLink').href = '#';
    });
});
