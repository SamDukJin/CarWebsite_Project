document.addEventListener('DOMContentLoaded', () => {
    const carCards = document.querySelectorAll('.car-card');
    const titleContainer = document.querySelector('.title-container');

    carCards.forEach(card => {
        card.addEventListener('click', () => {
            const model = card.dataset.model.toLowerCase(); 
            window.location.href = `subModelPages/${model}.html`; // Redirect to submodel page
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
