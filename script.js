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
const clients = [
    { image: "assets/clients/client1.png", name: "Client 1" },
    { image: "assets/clients/client2.png", name: "Client 2" },
    { image: "assets/clients/client3.png", name: "Client 3" },
    { image: "assets/clients/client4.png", name: "Client 4" },
    { image: "assets/clients/client5.png", name: "Client 5" }
];

// Initialize Clients Carousel
function initializeClients() {
    const clientsContainer = document.querySelector('.clients-carousel .flex');
    
    clients.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'flex-shrink-0 w-32 h-32 flex items-center justify-center';
        clientCard.innerHTML = `
            <img src="${client.image}" alt="${client.name}" class="max-w-full max-h-full object-contain">
        `;
        clientsContainer.appendChild(clientCard);
    });
}

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');

    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });
});

// Initialize carousels when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeBestSellers();
    initializeClients();
});

// Form submission handling
document.querySelector('form').addEventListener('submit', function(event) {
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