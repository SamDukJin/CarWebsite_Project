function createCarCards() {
    return `
        ${createCarCard("SEDAN", 700000, "asset/CarModel/CarModel_SEDAN_Default.png", "Sedan")}
        ${createCarCard("SUV", 500000, "asset/CarModel/CarModel_SUV_Default.png", "SUV")}
        ${createCarCard("CUV", 600000, "asset/CarModel/CarModel_CUV_Default.png", "CUV")}
        ${createCarCard("SUPERCAR", 1000000, "asset/CarModel/CarModel_SUPERCAR_Default.png", "Supercar")}
    `;
}

function createCarCard(model, price, imageSrc, altText) {
    return `
        <div class="car-card" data-model="${model}" data-price="${price}">
            <img src="${imageSrc}" alt="${altText}">
            <div class="car-info">
                <p>Base Price: ${price.toLocaleString()} Baht</p>
            </div>
        </div>
    `;
}

// If we put the createCarCards in the same DOMContentLoaded, it will not work because the event listeners below haven't been added yet.
// That's why we have to fetch the data first when site is loaded, then we can continue to other function
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("carCardGrid");
    grid.innerHTML = createCarCards();
});

document.addEventListener('DOMContentLoaded', () => {
    const carCards = document.querySelectorAll('.car-card');
    const titleContainer = document.querySelector('.title-container');

    // Add click event listeners to each car card
    carCards.forEach(card => {
        card.addEventListener('click', () => {
            // Retrieve the car model from the card's data attribute and convert it to lowercase
            const model = card.dataset.model.toLowerCase(); 
            // Redirect the user to the corresponding submodel page based on the car model
            window.location.href = `subModelPages/${model}.html`; 
        });
    });

    const navAbout = document.getElementById('nav-about');
    const navDiscovery = document.getElementById('nav-discovery');
    const discoverySection = document.getElementById('discovery-section');
    const aboutSection = document.getElementById('about-section');

    if (navAbout && navDiscovery) {
        navAbout.addEventListener('click', () => {
            aboutSection.scrollIntoView({
                behavior: 'smooth',  // Smooth scroll effect
                block: 'start'      // Scroll to the top of the section
            });
        });

        navDiscovery.addEventListener('click', () => {
            window.scrollTo({
                top:discoverySection.offsetTop - titleContainer.offsetHeight,
                behavior: 'smooth'
            });
        });
    }

    window.addEventListener('scroll', ()=>{
        if (window.scrollY > titleContainer.offsetHeight){
            titleContainer.classList.add('fixed');
        } else {
            titleContainer.classList.remove('fixed');
        }
    })
});