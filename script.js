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
