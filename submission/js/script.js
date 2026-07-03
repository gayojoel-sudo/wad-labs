// ==========================================
// CAT 2 INTERACTIVITY - THE SUYIAN LODGE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initBannerToggle();
    initDynamicGallery();
    initWishlistTracker();
    initFormValidation();
    initPersistentState();
});

// ------------------------------------------
// 1. CLICK-TO-REVEAL ON BANNER
// ------------------------------------------
function initBannerToggle() {
    // Selects the main hero image background container
    const heroImage = document.querySelector('.hero-bg-img');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage && heroContent) {
        heroImage.style.cursor = 'pointer';
        heroImage.addEventListener('click', () => {
            // Toggles class to reveal hidden stylistic context or alter layouts
            heroContent.classList.toggle('reveal-alt-details');
        });
    }
}

// ------------------------------------------
// 2. LOOP-RENDERED DYNAMIC CONTENT
// ------------------------------------------
// Array of architectural spaces containing the required 'name' property
const lodgeSpaces = [
    { name: "The Main Horizon Pavilion", type: "Exterior Lounge", img: "images/hero-bg.jpg" },
    { name: "The Sculpted Ochre Bar", type: "Interior Living", img: "images/about-studio.jpg" },
    { name: "The Curved Vault Dining Nook", type: "Dining Space", img: "images/project3.jpg" },
    { name: "The Open Canopy Suite", type: "Suite Sanctuary", img: "images/project2.jpg" },
    { name: "The Teak Circular Shower Oasis", type: "Wellness Suite", img: "images/project4.jpg" }
];

function initDynamicGallery() {
    const projectsGrid = document.getElementById('projects');
    if (!projectsGrid) return;
    
    // Clear out hardcoded elements if necessary or append dynamically
    // Render objects into DOM using an iterative loop array pattern
    lodgeSpaces.forEach(space => {
        const card = document.createElement('div');
        card.className = 'space-card';
        card.innerHTML = `
            <div class="space-card-img-wrap">
                <img src="${space.img}" alt="${space.name}" />
            </div>
            <div class="space-card-info">
                <h4>${space.name}</h4>
                <p>${space.type}</p>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// ------------------------------------------
// 3. DYNAMICALLY ADD & REMOVE ELEMENTS (Wishlist Itinerary)
// ------------------------------------------
function initWishlistTracker() {
    const addButton = document.getElementById('add-itinerary-btn');
    const inputField = document.getElementById('itinerary-input');
    const wishlistUl = document.getElementById('wishlist-list');
    
    if (!addButton || !inputField || !wishlistUl) return;
    
    addButton.addEventListener('click', () => {
        const value = inputField.value.trim();
        if (value === '') return;
        
        // Create components using createElement()
        const li = document.createElement('li');
        li.className = 'wishlist-item';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = value;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'btn-remove';
        
        // Handle element deletion dynamically using .remove()
        removeBtn.addEventListener('click', () => {
            li.remove();
            saveWishlistToStorage();
        });
        
        li.appendChild(textSpan);
        li.appendChild(removeBtn);
        wishlistUl.appendChild(li);
        
        inputField.value = '';
        saveWishlistToStorage();
    });
}

// ------------------------------------------
// 4. FORM HANDLING WITH VALIDATION FEEDBACK
// ------------------------------------------
function initFormValidation() {
    const form = document.getElementById('booking-inquiry-form');
    const feedbackBlock = document.getElementById('form-feedback');
    
    if (!form || !feedbackBlock) return;
    
    form.addEventListener('submit', (event) => {
        // Prevent default submission event
        event.preventDefault();
        
        const clientName = document.getElementById('input-client-name').value.trim();
        const clientEmail = document.getElementById('input-client-email').value.trim();
        
        // Custom strict validation check outside of simple HTML required attributes
        if (clientName.length < 3) {
            feedbackBlock.textContent = "Validation Failed: Full Name must be at least 3 characters long.";
            feedbackBlock.className = "feedback-msg error";
            return;
        }
        
        if (!clientEmail.includes('@') || !clientEmail.includes('.')) {
            feedbackBlock.textContent = "Validation Failed: Please supply a valid email address.";
            feedbackBlock.className = "feedback-msg error";
            return;
        }
        
        // Positive structural DOM response confirmation
        feedbackBlock.innerHTML = `<strong>Success!</strong> Thank you, ${clientName}. An architectural specialist will contact you shortly.`;
        feedbackBlock.className = "feedback-msg success";
        
        form.reset();
    });
}

// ------------------------------------------
// 5. PERSISTENT STATE VIA LOCALSTORAGE
// ------------------------------------------
function saveWishlistToStorage() {
    const items = [];
    document.querySelectorAll('#wishlist-list li span').forEach(span => {
        items.push(span.textContent);
    });
    localStorage.setItem('suyianItineraryWishlist', JSON.stringify(items));
}

function initPersistentState() {
    const wishlistUl = document.getElementById('wishlist-list');
    if (!wishlistUl) return;
    
    const stored = localStorage.getItem('suyianItineraryWishlist');
    if (!stored) return;
    
    const items = JSON.parse(stored);
    items.forEach(value => {
        const li = document.createElement('li');
        li.className = 'wishlist-item';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = value;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'btn-remove';
        
        removeBtn.addEventListener('click', () => {
            li.remove();
            saveWishlistToStorage();
        });
        
        li.appendChild(textSpan);
        li.appendChild(removeBtn);
        wishlistUl.appendChild(li);
    });
}