// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
});

// Testimonial Carousel
function initializeTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const items = document.querySelectorAll('.testimonial-items');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!carousel || items.length === 0) return;
    
    let currentIndex = 0;
    const itemWidth = 320; // Width of each item including margin
    const totalItems = items.length;
    let carouselInterval;
    
    // Clone first item and append to end for infinite effect
    const firstItem = items[0].cloneNode(true);
    carousel.appendChild(firstItem);
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        const translateX = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        updateDots();
    }
    
    function nextSlide() {
        currentIndex++;
        const translateX = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Reset to first item when reaching the cloned item
        if (currentIndex >= totalItems) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = 'translateX(0)';
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease-in-out';
                }, 10);
            }, 500);
        }
        updateDots();
    }
    
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 3000);
    }
    
    function stopCarousel() {
        clearInterval(carouselInterval);
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopCarousel();
            goToSlide(index);
            startCarousel();
        });
    });
    
    // Pause carousel on hover
    carousel.addEventListener('mouseenter', stopCarousel);
    
    // Resume carousel when mouse leaves
    carousel.addEventListener('mouseleave', startCarousel);
    
    // Start the carousel
    startCarousel();
}

// Best Sellers Carousel
const bestSellers = [
    {
        name: "Modern Sofa Set",
        image: "assets/products/sofa.jpg",
        description: "Contemporary sofa set with premium fabric and comfortable cushions. Perfect for modern living rooms."
    },
    {
        name: "Dining Table",
        image: "assets/products/dining.jpg",
        description: "Elegant dining table made from solid wood with a smooth finish. Seats up to 6 people comfortably."
    },
    {
        name: "Bedroom Set",
        image: "assets/products/bedroom.jpg",
        description: "Complete bedroom set including bed, nightstands, and dresser. Features a modern design with ample storage."
    },
    {
        name: "Coffee Table",
        image: "assets/products/coffee.jpg",
        description: "Stylish coffee table with glass top and metal frame. Adds a touch of elegance to any living space."
    }
];

// Initialize Best Sellers Carousel
function initializeBestSellers() {
    const carouselContainer = document.querySelector('.best-sellers-carousel .flex');
    
    if (!carouselContainer) return;
    
    bestSellers.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card flex-shrink-0 w-64 bg-white rounded-lg shadow-lg overflow-hidden';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold text-[#18171a] mb-2">${product.name}</h3>
                <button class="view-item-btn bg-[#8649FB] text-white px-4 py-2 rounded-lg hover:bg-[#6a3bc9] transition duration-300 w-full"
                        data-name="${product.name}"
                        data-image="${product.image}"
                        data-description="${product.description}">
                    View Item
                </button>
            </div>
        `;
        carouselContainer.appendChild(productCard);
    });

    // Add event listeners to view item buttons
    document.querySelectorAll('.view-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modal = document.getElementById('productModal');
            const productName = this.getAttribute('data-name');
            const productImage = this.getAttribute('data-image');
            const productDescription = this.getAttribute('data-description');

            document.getElementById('modalProductName').textContent = productName;
            document.getElementById('modalProductImage').src = productImage;
            document.getElementById('modalProductDescription').textContent = productDescription;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });
}

// Clients Carousel
// const clients = [
//     { image: "assets/clients/client1.png", name: "Client 1" },
//     { image: "assets/clients/client2.png", name: "Client 2" },
//     { image: "assets/clients/client3.png", name: "Client 3" },
//     { image: "assets/clients/client4.png", name: "Client 4" },
//     { image: "assets/clients/client5.png", name: "Client 5" }
// ];

// // Initialize Clients Carousel
// function initializeClients() {
//     const clientsContainer = document.querySelector('.clients-carousel .flex');
    
//     if (!clientsContainer) return;
    
//     clients.forEach(client => {
//         const clientCard = document.createElement('div');
//         clientCard.className = 'flex-shrink-0 w-32 h-32 flex items-center justify-center';
//         clientCard.innerHTML = `
//             <img src="${client.image}" alt="${client.name}" class="max-w-full max-h-full object-contain">
//         `;
//         clientsContainer.appendChild(clientCard);
//     });
// }

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    }
});

// Initialize carousels when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeBestSellers();
    // initializeClients();
    initializeTestimonialCarousel();
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// --- Products Page: Dynamic Chairs Grid with Pagination ---

const CHAIRS_JSON_PATH = 'assets/furniture/chairs.json';
const CHAIRS_IMAGE_PATH = 'assets/furniture/chairs/';
const ITEMS_PER_PAGE = 18;
let chairsImages = [];
let currentPage = 1;
let currentCategory = 'all';

function renderChairsGrid(images, page = 1) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageImages = images.slice(start, end);
    console.log('Rendering grid, images:', pageImages);
    pageImages.forEach(filename => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center';
        card.innerHTML = `
            <img src="${CHAIRS_IMAGE_PATH}${filename}" alt="Chair" class="w-full h-64 object-cover">
        `;
        grid.appendChild(card);
    });
}

function renderPagination(images, page = 1) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) return;
    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.className = 'px-3 py-1 rounded bg-gray-200 hover:bg-gray-300';
    prevBtn.disabled = page === 1;
    prevBtn.onclick = () => changePage(page - 1);
    pagination.appendChild(prevBtn);
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = `px-3 py-1 rounded ${i === page ? 'bg-[#8649FB] text-white' : 'bg-gray-200 hover:bg-gray-300'}`;
        pageBtn.onclick = () => changePage(i);
        pagination.appendChild(pageBtn);
    }
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.className = 'px-3 py-1 rounded bg-gray-200 hover:bg-gray-300';
    nextBtn.disabled = page === totalPages;
    nextBtn.onclick = () => changePage(page + 1);
    pagination.appendChild(nextBtn);
}

function changePage(page) {
    currentPage = page;
    renderChairsGrid(chairsImages, currentPage);
    renderPagination(chairsImages, currentPage);
}

function showChairsGrid() {
    renderChairsGrid(chairsImages, 1);
    renderPagination(chairsImages, 1);
    currentPage = 1;
}

function handleFilterClick(category) {
    currentCategory = category;
    if (category === 'chairs' || category === 'all') {
        showChairsGrid();
    } else {
        // Clear grid and pagination for other categories
        document.getElementById('productsGrid').innerHTML = '<div class="col-span-4 text-center text-gray-400">No products found for this category.</div>';
        document.getElementById('pagination').innerHTML = '';
    }
}

function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-[#8649FB]', 'text-white'));
            this.classList.add('active', 'bg-[#8649FB]', 'text-white');
            const category = this.getAttribute('data-category');
            handleFilterClick(category);
        });
    });
}

// On DOMContentLoaded, fetch chairs.json and set up grid if on products page
if (window.location.pathname.includes('products.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        fetch(CHAIRS_JSON_PATH)
            .then(res => {
                console.log('Fetched chairs.json:', res);
                return res.json();
            })
            .then(data => {
                console.log('Loaded chairs:', data);
                chairsImages = data;
                setupFilterButtons();
                // Show chairs by default (All)
                showChairsGrid();
            })
            .catch(err => {
                console.error('Error loading chairs.json:', err);
            });
    });
} 