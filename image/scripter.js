 
    document.addEventListener('DOMContentLoaded', () => {

        // --- Quantity Selector Logic (Copied from previous example) ---
        function initializeQuantitySelector(productCard) {
            const quantitySelector = productCard.querySelector('.quantity-selector');
            if (!quantitySelector) return; // Exit if selector not found
        
            const minusBtn = quantitySelector.querySelector('.minus-btn');
            const plusBtn = quantitySelector.querySelector('.plus-btn');
            const quantityInput = quantitySelector.querySelector('.quantity-input');
        
            let currentQuantity = parseInt(quantityInput.value);
            const minQuantity = parseInt(quantityInput.getAttribute('min')) || 1;
        
            function updateQuantity(newQuantity) {
                if (newQuantity < minQuantity) {
                    newQuantity = minQuantity;
                }
                quantityInput.value = newQuantity;
                currentQuantity = newQuantity;
        
                if (currentQuantity === minQuantity) {
                    minusBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
                } else {
                    minusBtn.innerHTML = '<i class="fas fa-minus"></i>';
                }
            }
        
            updateQuantity(currentQuantity); // Initialize icon
        
            minusBtn.addEventListener('click', () => {
                if (currentQuantity > 0) {
                    updateQuantity(currentQuantity - 1);
                }
            });
        
            plusBtn.addEventListener('click', () => {
                updateQuantity(currentQuantity + 1);
            });
        
            quantityInput.addEventListener('change', () => {
                let value = parseInt(quantityInput.value);
                if (isNaN(value) || value < minQuantity) {
                    updateQuantity(minQuantity);
                } else {
                    updateQuantity(value);
                }
            });
        }
        
        const allProductCards = document.querySelectorAll('.product-card');
        allProductCards.forEach(card => {
            initializeQuantitySelector(card);
        });
        
        // Add to Cart Button Logic (Example)
        const addCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productCard = event.target.closest('.product-card');
                const productId = productCard.querySelector('.quantity-selector').dataset.productId;
                const quantity = parseInt(productCard.querySelector('.quantity-input').value);
                const productName = productCard.querySelector('.product-title').textContent;
        
                if (quantity > 0) {
                    console.log(`Added to cart: Product ID - ${productId}, Product Name - "${productName}", Quantity - ${quantity}`);
                    alert(`"${productName}" (x${quantity}) added to cart!`);
                    // In a real application, update a global cart state or send to server.
                } else {
                    alert(`Please select a quantity greater than 0 for "${productName}".`);
                }
            });
        });
        
        
        // --- Hero Slider Logic ---
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const slides = document.querySelectorAll('.slider-item');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        const sliderDotsContainer = document.querySelector('.slider-dots');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval; // To hold the automatic slide change interval
        
        // Create dots dynamically
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            sliderDotsContainer.appendChild(dot);
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        }
        const dots = document.querySelectorAll('.slider-dots .dot');
        
        function updateSlider() {
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        
            // For actual CSS 'transform' based sliding:
            // sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
            resetAutoSlide(); // Reset timer when manually changing slide
        }
        
        function showNextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }
        
        function showPrevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        function startAutoSlide() {
            slideInterval = setInterval(showNextSlide, 5000); // Change slide every 5 seconds
        }
        
        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }
        
        // Event listeners for arrows
        nextArrow.addEventListener('click', showNextSlide);
        prevArrow.addEventListener('click', showPrevSlide);
        
        // Initial setup
        updateSlider(); // Show the first slide and activate its dot
        startAutoSlide(); // Start automatic sliding
        
        // Pause auto-slide on hover over slider
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
        
        // --- Header Search Bar / Mobile Icon Toggle ---
        const mobileSearchIcon = document.querySelector('.mobile-search-icon');
        const desktopSearchBar = document.querySelector('.search-bar');
        const mainHeader = document.querySelector('.main-header'); // For general header context
        
        mobileSearchIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            // Toggle visibility of the desktop search bar
            // A more advanced implementation might make a full-screen search overlay
            desktopSearchBar.classList.toggle('active-mobile-search'); // Use a class for toggling display
        });
        
        // You'd need CSS for .search-bar.active-mobile-search to control its display
        // e.g., display: flex; for mobile view, and then hiding the desktop one when not active.
        // (This part is better handled by media queries for desktop vs mobile search bar display,
        // but this JS toggle is for showing/hiding the main search bar on mobile click)
        
        });
        
 