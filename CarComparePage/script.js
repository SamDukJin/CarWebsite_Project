const INTEREST_RATE = 0.035;
const DOWN_PAYMENT_PERCENTAGE = 0.25;

const carImages = {
     CUV: {
          Default: '../CarModel/CarModel_CUV_Default.png',
          Black: '../CarModel/CarModel_CUV_BLACK.png',
          White: '../CarModel/CarModel_CUV_WHITE.png',
          Red: '../CarModel/CarModel_CUV_RED.png',
          Blue: '../CarModel/CarModel_CUV_BLUE.png',
          Silver: '../CarModel/CarModel_CUV_SILVER.png'
     },
     SUV: {
          Default: '../CarModel/CarModel_SUV_Default.png',
          Black: '../CarModel/CarModel_SUV_BLACK.png',
          White: '../CarModel/CarModel_SUV_WHITE.png',
          Red: '../CarModel/CarModel_SUV_RED.png',
          Blue: '../CarModel/CarModel_SUV_BLUE.png',
          Silver: '../CarModel/CarModel_SUV_SILVER.png'
     },
     SEDAN: {
          Default: '../CarModel/CarModel_SEDAN_Default.png',
          Black: '../CarModel/CarModel_SEDAN_BLACK.png',
          White: '../CarModel/CarModel_SEDAN_WHITE.png',
          Red: '../CarModel/CarModel_SEDAN_RED.png',
          Blue: '../CarModel/CarModel_SEDAN_BLUE.png',
          Silver: '../CarModel/CarModel_SEDAN_SILVER.png'
     },
     SUPERCAR: {
          Default: '../CarModel/CarModel_SUPERCAR_Default.png',
          Black: '../CarModel/CarModel_SUPERCAR_BLACK.png',
          White: '../CarModel/CarModel_SUPERCAR_WHITE.png',
          Red: '../CarModel/CarModel_SUPERCAR_RED.png',
          Blue: '../CarModel/CarModel_SUPERCAR_BLUE.png',
          Silver: '../CarModel/CarModel_SUPERCAR_SILVER.png'
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
