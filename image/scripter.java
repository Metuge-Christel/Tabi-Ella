 // script.js
      document.addEventListener('DOMContentLoaded', function() {
          const scrollLeftBtn = document.getElementById('scrollLeftBtn');
          const scrollRightBtn = document.getElementById('scrollRightBtn');
          const imageWrapper = document.querySelector('.image-wrapper');
      
          // Determine how much to scroll. You can adjust this value.
          // A good starting point is the width of one image plus its gap.
          const scrollAmount = 265; // Approx. image width (250px) + gap (15px)
      
          scrollLeftBtn.addEventListener('click', function() {
              imageWrapper.scrollBy({
                  left: -scrollAmount, // Scroll to the left
                  behavior: 'smooth'
              });
          });
      
          scrollRightBtn.addEventListener('click', function() {
              imageWrapper.scrollBy({
                  left: scrollAmount, // Scroll to the right
                  behavior: 'smooth'
              });
          });
      
          // Optional: Add logic to disable buttons when at start/end of scroll
          imageWrapper.addEventListener('scroll', function() {
              // Disable left button if at the very beginning
              if (imageWrapper.scrollLeft === 0) {
                  scrollLeftBtn.disabled = true;
              } else {
                  scrollLeftBtn.disabled = false;
              }
      
              // Disable right button if at the very end
              // Consider a small tolerance for floating point inaccuracies
              if (imageWrapper.scrollLeft + imageWrapper.clientWidth >= imageWrapper.scrollWidth - 1) {
                  scrollRightBtn.disabled = true;
              } else {
                  scrollRightBtn.disabled = false;
              }
          });
      
          // Initially check button states on page load
          // This timeout ensures that layout calculations are complete
          setTimeout(() => {
              if (imageWrapper.scrollLeft === 0) {
                  scrollLeftBtn.disabled = true;
              }
              if (imageWrapper.scrollLeft + imageWrapper.clientWidth >= imageWrapper.scrollWidth - 1) {
                  scrollRightBtn.disabled = true;
              }
          }, 100); // Small delay
      });
        