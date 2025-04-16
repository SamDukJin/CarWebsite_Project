const INTEREST_RATE = 0.035;
const DOWN_PAYMENT_PERCENTAGE = 0.25;
// For creating the comparison section container using loops
const comparisonContainer = document.getElementById("comparison-container");
const purchaseBtn = document.getElementById("purchase-button");

const carImages = {
     CUV: {
          Default: '../asset/CarModel/CarModel_CUV_Default.png',
          Black: '../asset/CarModel/CarModel_CUV_BLACK.png',
          White: '../asset/CarModel/CarModel_CUV_WHITE.png',
          Red: '../asset/CarModel/CarModel_CUV_RED.png',
          Blue: '../asset/CarModel/CarModel_CUV_BLUE.png',
          Silver: '../asset/CarModel/CarModel_CUV_SILVER.png'
     },
     SUV: {
          Default: '../asset/CarModel/CarModel_SUV_Default.png',
          Black: '../asset/CarModel/CarModel_SUV_BLACK.png',
          White: '../asset/CarModel/CarModel_SUV_WHITE.png',
          Red: '../asset/CarModel/CarModel_SUV_RED.png',
          Blue: '../asset/CarModel/CarModel_SUV_BLUE.png',
          Silver: '../asset/CarModel/CarModel_SUV_SILVER.png'
     },
     SEDAN: {
          Default: '../asset/CarModel/CarModel_SEDAN_Default.png',
          Black: '../asset/CarModel/CarModel_SEDAN_BLACK.png',
          White: '../asset/CarModel/CarModel_SEDAN_WHITE.png',
          Red: '../asset/CarModel/CarModel_SEDAN_RED.png',
          Blue: '../asset/CarModel/CarModel_SEDAN_BLUE.png',
          Silver: '../asset/CarModel/CarModel_SEDAN_SILVER.png'
     },
     SUPERCAR: {
          Default: '../asset/CarModel/CarModel_SUPERCAR_Default.png',
          Black: '../asset/CarModel/CarModel_SUPERCAR_BLACK.png',
          White: '../asset/CarModel/CarModel_SUPERCAR_WHITE.png',
          Red: '../asset/CarModel/CarModel_SUPERCAR_RED.png',
          Blue: '../asset/CarModel/CarModel_SUPERCAR_BLUE.png',
          Silver: '../asset/CarModel/CarModel_SUPERCAR_SILVER.png'
     }
};

const carSpecs = {
     CUV: {
          horsepower: "200 HP",
          weight: "1,600 kg",
          topSpeed: "190 km/h",
          acceleration: "0–100 km/h in 9.5s",
          fuelEfficiency: "14 km/l",
          engineType: "2.0L I4",
          drivetrain: "AWD",
          transmission: "6-Speed Automatic",
          seating: "5"
     },
     SUV: {
          horsepower: "250 HP",
          weight: "1,800 kg",
          topSpeed: "210 km/h",
          acceleration: "0–100 km/h in 8.5s",
          fuelEfficiency: "12 km/l",
          engineType: "2.5L V6",
          drivetrain: "AWD",
          transmission: "8-Speed Automatic",
          seating: "7"
     },
     SEDAN: {
          horsepower: "180 HP",
          weight: "1,400 kg",
          topSpeed: "200 km/h",
          acceleration: "0–100 km/h in 8.0s",
          fuelEfficiency: "16 km/l",
          engineType: "1.8L I4",
          drivetrain: "FWD",
          transmission: "6-Speed Manual",
          seating: "5"
     },
     SUPERCAR: {
          horsepower: "550 HP",
          weight: "1,300 kg",
          topSpeed: "330 km/h",
          acceleration: "0–100 km/h in 3.2s",
          fuelEfficiency: "8 km/l",
          engineType: "4.0L V8 Twin Turbo",
          drivetrain: "RWD",
          transmission: "7-Speed Dual-Clutch",
          seating: "2"
     }
};

const colorPrices = {
     Red: 0,
     White: 0,
     Black: 0,
     Blue: 10000,
     Silver: 50000
};

const tirePrices = {
     "All-Season": 5000,
     Winter: 20000,
     Performance: 10000,
     "Off-Road": 40000
};

const basePrices = {
     CUV: 600000,
     SUV: 500000,
     SEDAN: 700000,
     SUPERCAR: 1000000
};

// To create the containers
for (let i = 1; i <= 3; i++) {
     comparisonContainer.insertAdjacentHTML("beforeend", createCarInfo(i));
}

purchaseBtn.addEventListener('click', ()=>{
     const choiceNum = document.getElementById('purchase-choice').value;
     const model = document.getElementById(`model${choiceNum}`)?.value;
     const color = document.getElementById(`color${choiceNum}`)?.value;
     const tire = document.getElementById(`tire${choiceNum}`)?.value;
     
     if (!model|| !color || !tire){
          alert("Please ensure that all the field are selected.")
          return;
     }

     const ModelPageMap = {
          SUPERCAR: 'supercar.html',
          SUV: 'suv.html',
          CUV: 'cuv.html',
          SEDAN: 'sedan.html'
     }

     const page = ModelPageMap[model];
     if (!page) {
          alert("Unknown car model selected.")
          return;
     }

     const url = `../subModelPages/${page}?color=${encodeURIComponent(color)}&tire=${encodeURIComponent(tire)}`;
     window.location.href = url;
})

// When the site is loaded, it will update the car sections
document.addEventListener('DOMContentLoaded', () => {
     ['1', '2', '3'].forEach(num => {
          ['model', 'color', 'tire'].forEach(type => {
               const element = document.getElementById(`${type}${num}`);
               if (element) {
                    element.addEventListener('change', () => updateCarSection(num));
               }
          });
          updateCarSection(num); // Initial update
     });
});


// Function to update the car section
function updateCarSection(num) {
     const model = document.getElementById(`model${num}`).value;
     const color = document.getElementById(`color${num}`).value;
     const tire = document.getElementById(`tire${num}`).value;

     updateSpecs(model, num);
     updateSummary(model, color, tire, num);
     updateImage(model, color, num);
     updatePrice(model, color, tire, num);
}

// Update the car specs for whenever the model is changed
function updateSpecs(model, num) {
     const specs = carSpecs[model];
     if (!specs) return;

     document.getElementById(`horsepower${num}`).textContent = `Horse Power: ${specs.horsepower}`;
     document.getElementById(`weight${num}`).textContent = `Weight: ${specs.weight}`;
     document.getElementById(`top-speed${num}`).textContent = `Top Speed: ${specs.topSpeed}`;
     document.getElementById(`acceleration${num}`).textContent = `Acceleration: ${specs.acceleration}`;
     document.getElementById(`fuel-efficiency${num}`).textContent = `Fuel Efficiency: ${specs.fuelEfficiency}`;
     document.getElementById(`engine-type${num}`).textContent = `Engine Type: ${specs.engineType}`;
     document.getElementById(`drivetrain${num}`).textContent = `Drivetrain: ${specs.drivetrain}`;
     document.getElementById(`transmission${num}`).textContent = `Transmission: ${specs.transmission}`;
     document.getElementById(`seating${num}`).textContent = `Seating Capacity: ${specs.seating}`;
}

// Summary for each type of the selection
function updateSummary(model, color, tire, num) {
     document.getElementById(`summary-model${num}`).textContent = model || '-';
     document.getElementById(`summary-color${num}`).textContent = color || '-';
     document.getElementById(`summary-tires${num}`).textContent = tire || '-';
}

// When the model, color, and tire is selected, it will update the price
function updatePrice(model, color, tire, num) {
     let totalPrice = 0;
     if (model) totalPrice += basePrices[model] || 0;
     if (color) totalPrice += colorPrices[color] || 0;
     if (tire) totalPrice += tirePrices[tire] || 0;

     document.querySelector(`#preview${num} .price`).textContent = `Total: ${totalPrice.toLocaleString()} Baht`;
     document.getElementById(`summary-price${num}`).textContent = `${totalPrice.toLocaleString()} Baht`;
}

// Update the image by key in the image path as below
function updateImage(model, color, num) {
     const imagePath = carImages?.[model]?.[color] || carImages?.[model]?.Default;
     const imageTag = document.querySelector(`#preview${num} img`);
     if (imageTag && imagePath) {
          imageTag.src = imagePath;
     }
}

// Create each car section with loops, so we don't have to repeat the code in HTML
function createCarInfo(i){
     return `
     <section class="car-column" id="car${i}">
          <h2>Car ${i}</h2>
          <div class="car-selector">
               <label>Model:</label>
               <select class="model-select" id="model${i}">
                    <option value="">-- Select Model --</option>
                    <option value="SEDAN">Sedan Base Price: 700,000 Baht</option>
                    <option value="SUV">SUV Base Price: 500,000 Baht</option>
                    <option value="CUV">CUV Base Price: 600,000 Baht</option>
                    <option value="SUPERCAR">Supercar Base Price: 1,000,000 Baht</option>
               </select>
          </div>
          <div class="customization" id="customization${i}">
               <label>Color:</label>
               <select class="color-select" id="color${i}">
                    <option value="Default">-- Select Car Color --</option>
                    <option value="Black">Black +0 Baht</option>
                    <option value="White">White +0 Baht</option>
                    <option value="Red">Red +0 Baht</option>
                    <option value="Blue">Blue +10,000 Baht</option>
                    <option value="Silver">Silver +50,000 Baht</option>
               </select>
               <label>Tires:</label>
               <select class="tire-select" id="tire${i}">
                    <option value="">-- Select Tire Type --</option>
                    <option value="All-Season">All-Season +5,000 Baht</option>
                    <option value="Winter">Winter +20,000 Baht</option>
                    <option value="Performance">Performance +10,000 Baht</option>
                    <option value="Off-Road">Off-Road +40,000 Baht</option>
               </select>
          </div>
               ${createOverviewHTML(i)} <!-- For putting the car overview below the car main section-->
          <div class="car-preview" id="preview${i}">
               <img src="../asset/placeholder.png" alt="Car ${i} Preview">
               <p class="price">Total: $0</p>
          </div>
     </section>
     `
};
// Creating the Overview under the container
function createOverviewHTML(i) {
     return `
     <div class="car-overview" id="overview${i}">
          <h3>Car Overview</h3>
          <p id="horsepower${i}">Horse Power: -</p>
          <p id="weight${i}">Weight: -</p>
          <p id="top-speed${i}">Top Speed: -</p>
          <p id="acceleration${i}">Acceleration: -</p>
          <p id="fuel-efficiency${i}">Fuel Efficiency: -</p>
          <p id="engine-type${i}">Engine Type: -</p>
          <p id="drivetrain${i}">Drivetrain: -</p>
          <p id="transmission${i}">Transmission: -</p>
          <p id="seating${i}">Seating Capacity: -</p>
     </div>
     `;
}
