//desktop view product dropdown

const productsBtn = document.getElementById('productsBtn');
const productsMenu = document.getElementById('productsMenu');

productsBtn.addEventListener('click', () => {
  productsMenu.classList.toggle('hidden');
});

// Optional: hide submenu if clicked outside
document.addEventListener('click', (e) => {
  if (!productsBtn.contains(e.target) && !productsMenu.contains(e.target)) {
    productsMenu.classList.add('hidden');
  }
});



// Mobile menu toggle
class MobileMenu {
    constructor() {
        this.mobileMenuButton = document.querySelector('.mobile-menu-button');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.productsToggle = document.getElementById('products-toggle');
        this.productsSubmenu = document.getElementById('products-submenu');
        this.productsArrow = document.getElementById('products-arrow');
        
        this.init();
    }
    
    init() {
        // Initialize all menus to closed state
        this.resetAllMenus();
        
        // Bind events
        this.bindEvents();
    }
    
    resetAllMenus() {
        // Reset main mobile menu
        this.mobileMenu.classList.add('hidden');
        this.mobileMenu.classList.remove('show');
        
        // Reset products submenu
        this.productsSubmenu.classList.add('hidden');
        this.productsSubmenu.classList.remove('active');
        this.productsArrow.classList.remove('rotate-180');
        
        // Reset all category submenus
        const categorySubmenus = document.querySelectorAll('.category-submenu');
        const categoryArrows = document.querySelectorAll('.category-item .arrow');
        
        categorySubmenus.forEach(menu => {
            menu.classList.remove('active');
        });
        
        categoryArrows.forEach(arrow => {
            if (arrow.id !== 'products-arrow') {
                arrow.classList.remove('rotate-180');
            }
        });
    }
    
    bindEvents() {
        // Main mobile menu toggle
        this.mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMainMenu();
        });
        
        // Products submenu toggle
        this.productsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleProductsMenu();
        });
        
        // Category toggles
        const categoryButtons = document.querySelectorAll('[data-category]');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const category = button.getAttribute('data-category');
                this.toggleCategory(category);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu.contains(e.target) && !this.mobileMenuButton.contains(e.target)) {
                this.closeMainMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.resetAllMenus();
            }
        });
    }
    
    toggleMainMenu() {
        const isHidden = this.mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            this.mobileMenu.classList.remove('hidden');
            this.mobileMenu.classList.add('show');
        } else {
            this.closeMainMenu();
        }
    }
    
    closeMainMenu() {
        this.mobileMenu.classList.add('hidden');
        this.mobileMenu.classList.remove('show');
        
        // Also close all submenus when main menu closes
        this.closeProductsMenu();
        this.closeAllCategories();
    }
    
    toggleProductsMenu() {
        const isActive = this.productsSubmenu.classList.contains('active');
        
        if (isActive) {
            // Close products menu
            this.closeProductsMenu();
        } else {
            // Open products menu
            this.productsSubmenu.classList.add('active');
            this.productsArrow.classList.add('rotate-180');
        }
    }
    
    closeProductsMenu() {
        this.productsSubmenu.classList.remove('active');
        this.productsArrow.classList.remove('rotate-180');
        
        // Also close all category submenus
        this.closeAllCategories();
    }
    
    toggleCategory(categoryName) {
        const submenu = document.getElementById(categoryName + '-submenu');
        const arrow = document.getElementById(categoryName + '-arrow');
        
        if (!submenu || !arrow) return;
        
        const isActive = submenu.classList.contains('active');
        
        // Close all other categories first
        this.closeAllCategories();
        
        // Toggle the clicked category
        if (!isActive) {
            submenu.classList.add('active');
            arrow.classList.add('rotate-180');
        }
    }
    
    closeAllCategories() {
        const categorySubmenus = document.querySelectorAll('.category-submenu');
        const categoryArrows = document.querySelectorAll('.category-item .arrow');
        
        categorySubmenus.forEach(menu => {
            menu.classList.remove('active');
        });
        
        categoryArrows.forEach(arrow => {
            if (arrow.id !== 'products-arrow') {
                arrow.classList.remove('rotate-180');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenu();
});


// Testimonial Carousel
const track = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("carousel-dots");

let index = 0;
const slides = track.children;
const totalSlides = slides.length; // Each "slide" can have up to 3 cards

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = "w-3 h-3 rounded-full bg-gray-400";
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
        updateDots();
    });
    dotsContainer.appendChild(dot);
}

// Update carousel function
function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

// Highlight the active dot
function updateDots() {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("bg-[#8649FB]", i === index);
        dots[i].classList.toggle("bg-gray-400", i !== index);
    }
}

setInterval(() => {
    index = (index + 1) % totalSlides;
    updateCarousel();
}, 4000);

// Initialize first dot as active
updateDots();


function createGallery({ 
    containerId, 
    paginationId, 
    imagePath, 
    prefix = "IMG_", 
    totalImages, 
    perPage = 20 
  }) {
    let currentPage = 1;  

    function padNumber(num) {
      return String(num).padStart(4, "0"); // makes 1 → 0001
    }
  
    function renderGallery(page) {
      const gallery = document.getElementById(containerId);
      gallery.innerHTML = "";
  
      const start = (page - 1) * perPage + 1;
      const end = Math.min(page * perPage, totalImages);
  
      for (let i = start; i <= end; i++) {
        const imgDiv = document.createElement("div");
        imgDiv.className =
          "bg-white rounded-lg shadow overflow-hidden group";
        
        const img = document.createElement("img");
        img.src = `${imagePath}${prefix}${padNumber(i)}.jpg`; 
        img.alt = `${prefix}${padNumber(i)}`;
        img.className =
          "w-full h-64 object-contain transform transition-transform duration-300 group-hover:scale-110";
        
        imgDiv.appendChild(img);
        gallery.appendChild(imgDiv);
      }
  
      renderPagination(page);
    }
  
    function renderPagination(activePage) {
        const pagination = document.getElementById(paginationId);
        pagination.innerHTML = "";
      
        const totalPages = Math.ceil(totalImages / perPage);
      
        // Previous button
        const prevBtn = document.createElement("button");
        prevBtn.innerText = "⟵ Prev";
        prevBtn.className = `px-3 py-1 rounded mr-2 ${
          activePage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`;
        prevBtn.disabled = activePage === 1;
        prevBtn.addEventListener("click", () => renderGallery(activePage - 1));
        pagination.appendChild(prevBtn);
      
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement("button");
          btn.innerText = i;
          btn.className = `px-3 py-1 rounded mx-1 ${
            i === activePage
              ? "bg-[#8649FB] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`;
          btn.addEventListener("click", () => renderGallery(i));
          pagination.appendChild(btn);
        }
      
        // Next button
        const nextBtn = document.createElement("button");
        nextBtn.innerText = "Next ⟶";
        nextBtn.className = `px-3 py-1 rounded ml-2 ${
          activePage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`;
        nextBtn.disabled = activePage === totalPages;
        nextBtn.addEventListener("click", () => renderGallery(activePage + 1));
        pagination.appendChild(nextBtn);
      }
      
  
    // Initial render
    renderGallery(currentPage);
  } 

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

// Handle top-level Products accordion
document.querySelectorAll(".mobile-accordion > button").forEach(btn => {
    btn.addEventListener("click", () => {
      const submenu = btn.nextElementSibling;
      submenu.classList.toggle("hidden");
    });
  });
  
  // Handle each category accordion
  document.querySelectorAll(".mobile-submenu > div > button").forEach(btn => {
    btn.addEventListener("click", () => {
      const subitems = btn.nextElementSibling;
      subitems.classList.toggle("hidden");
    });
  });

 
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


// document.addEventListener('DOMContentLoaded', function() {
//     const mobileMenuButton = document.querySelector('.mobile-menu-button');
//     const mobileMenu = document.querySelector('.mobile-menu');

//     mobileMenuButton.addEventListener('click', function() {
//         mobileMenu.classList.toggle('hidden');
//         mobileMenu.classList.toggle('show');
//     });

//     // Close mobile menu when clicking outside
//     document.addEventListener('click', function(event) {
//         if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
//             mobileMenu.classList.add('hidden');
//             mobileMenu.classList.remove('show');
//         }
//     });
//     // Mobile accordion for Categories
//     const accordionButtons = document.querySelectorAll('.mobile-accordion > button');
//     accordionButtons.forEach(btn => {
//         btn.addEventListener('click', function(e) {
//             e.stopPropagation();
//             const submenu = this.nextElementSibling;
//             if (submenu) {
//                 submenu.classList.toggle('hidden');
//             }
//         });
//     });
// });

// function toggleProducts(event) {
//     event.stopPropagation();
//     const submenu = document.getElementById('products-submenu');
//     const arrow = document.getElementById('products-arrow');
    
//     // Force state reset - remove all conflicting classes first
//     submenu.classList.remove('active', 'hidden');
    
//     // Check if it was previously active by looking at arrow rotation
//     const wasActive = arrow.classList.contains('rotate-180');
    
//     if (wasActive) {
//         // Was open, now close it
//         submenu.classList.add('hidden');
//         arrow.classList.remove('rotate-180');
//     } else {
//         // Was closed, now open it
//         submenu.classList.add('active');
//         arrow.classList.add('rotate-180');
//     }
// }

// function toggleCategory(categoryName, event) {
//     event.stopPropagation();
//     const submenu = document.getElementById(categoryName + '-submenu');
//     const arrow = document.getElementById(categoryName + '-arrow');
        
//     const allSubmenus = document.querySelectorAll('.category-submenu');
//     const allArrows = document.querySelectorAll('[id$="-arrow"]:not(#products-arrow)');
    
//     allSubmenus.forEach(menu => {
//         if (menu.id !== categoryName + '-submenu') {
//             menu.classList.remove('active');
//         }
//     });
    
//     allArrows.forEach(arr => {
//         if (arr.id !== categoryName + '-arrow') {
//             arr.classList.remove('rotate-180');
//         }
//     });
    
//     // Toggle the clicked category
//     submenu.classList.toggle('active');
//     arrow.classList.toggle('rotate-180');
// }

// function initializeMenuState() {
//     // Ensure all category submenus start in a clean hidden state
//     const allSubmenus = document.querySelectorAll('.category-submenu');
//     allSubmenus.forEach(menu => {
//         menu.classList.remove('active');
//         menu.classList.add('hidden');
//     });
    
//     // Ensure main products submenu starts hidden
//     const productsSubmenu = document.getElementById('products-submenu');
//     if (productsSubmenu) {
//         productsSubmenu.classList.remove('active');
//         productsSubmenu.classList.add('hidden');
//     }
// }

// function closeAllMenus() {
//     const productsSubmenu = document.getElementById('products-submenu');
//     const productsArrow = document.getElementById('products-arrow');
    
//     if (productsSubmenu && productsArrow) {
//         productsSubmenu.classList.remove('active', 'hidden');
//         productsSubmenu.classList.add('hidden');
//         productsArrow.classList.remove('rotate-180');
//     }
    
//     // Handle category submenus - using your exact logic
//     const allSubmenus = document.querySelectorAll('.category-submenu');
//     const allArrows = document.querySelectorAll('[id$="-arrow"]:not(#products-arrow)');
    
//     allSubmenus.forEach(menu => {
//         menu.classList.remove('active');
//     });
    
//     allArrows.forEach(arr => {
//         arr.classList.remove('rotate-180');
//     });
// }

// document.addEventListener('DOMContentLoaded', function() {
//     initializeMenuState();
    
//     document.addEventListener('click', function(event) {
//         // Check if click is inside menu areas
//         const isInsideMenu = event.target.closest('.mobile-accordion') ||
//                             event.target.closest('.mobile-submenu') ||
//                             event.target.closest('.category-submenu') ||
//                             event.target.closest('button[onclick*="toggleProducts"]') ||
//                             event.target.closest('button[onclick*="toggleCategory"]');
        
//         // Only close if clicking outside all menu areas
//         if (!isInsideMenu) {
//             closeAllMenus();
//         }
//     });
    
//     document.addEventListener('keydown', function(event) {
//         if (event.key === 'Escape') {
//             closeAllMenus();
//         }
//     });
// });

//<!-- EmailJS Configuration -->
(function() {
    // Initialize EmailJS
    emailjs.init(""); // Replace with your EmailJS public key
    
    // Form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        emailjs.send('service_3ako9i7', 'template_edk4kna', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully!');
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again.');
            })
            .finally(function() {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
})();

