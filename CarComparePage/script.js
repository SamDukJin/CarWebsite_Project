// Constants shared across all cars
const INTEREST_RATE = 0.035;
const DOWN_PAYMENT_PERCENTAGE = 0.25;

const carImages = {
     "CUV": {
          'Black': 'CarModel/CarModel_CUV_BLACK.png',
          'White': 'CarModel/CarModel_CUV_WHITE.png',
          'Red': 'CarModel/CarModel_CUV_RED.png',
          'Blue': 'CarModel/CarModel_CUV_BLUE.png',
          'Silver': 'CarModel/CarModel_CUV_SILVER.png'
     },
     "SUV": {
          'Black': 'CarModel/CarModel_SUV_Black.png',
          'White': 'CarModel/CarModel_SUV_White.png',
          'Red': 'CarModel/CarModel_SUV_Red.png',
          'Blue': 'CarModel/CarModel_SUV_Blue.png',
          'Silver': 'CarModel/CarModel_SUV_Silver.png'
     },
     "SEDAN": {
          'Black': 'CarModel/CarModel_SEDAN_Black.png',
          'White': 'CarModel/CarModel_SEDAN_White.png',
          'Red': 'CarModel/CarModel_SEDAN_Red.png',
          'Blue': 'CarModel/CarModel_SEDAN_Blue.png',
          'Silver': 'CarModel/CarModel_SEDAN_Silver.png'
     },
     "SUPERCAR": {
          'Black': 'CarModel/CarModel_SUPERCAR_Black.png',
          'White': 'CarModel/CarModel_SUPERCAR_White.png',
          'Red': 'CarModel/CarModel_SUPERCAR_Red.png',
          'Blue': 'CarModel/CarModel_SUPERCAR_Blue.png',
          'Silver': 'CarModel/CarModel_SUPERCAR_Silver.png'
     }
}; // same as your current script
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
     "Red": 0,
     "White": 0,
     "Black": 0,
     "Blue": 10000,
     "Silver": 50000
};

//Price mapping for tires
const tirePrices = {
     "All-Season": 5000,
     "Winter": 20000,
     "Performance": 10000,
     "Off-Road": 40000
};

//Base prices per car model
const basePrices = {
     "CUV": 600000,
     "SUV": 500000,
     "SEDAN": 700000,
     "SUPERCAR": 1000000
};

// Setup logic for each car slot
document.addEventListener('DOMContentLoaded', () => {
     ["car1", "car2", "car3"].forEach(id => setupCar(id));
 });
 
 function setupCar(carId) {
     const colorDropdown = document.getElementById(`${carId}-color`);
     const tireDropdown = document.getElementById(`${carId}-tire`);
     const colorDisplay = document.getElementById(`${carId}-selected-color`);
     const tireDisplay = document.getElementById(`${carId}-selected-tire`);
     const carImage = document.getElementById(`${carId}-image`);
     const totalPriceDisplay = document.getElementById(`${carId}-total-price`);
     const paymentMethodDropdown = document.getElementById(`${carId}-payment-method`);
     const installmentYearsDropdown = document.getElementById(`${carId}-installment-years`);
     const installmentOptionsDiv = document.getElementById(`${carId}-installment-options`);
     const downPaymentDisplay = document.getElementById(`${carId}-down-payment`);
     const balanceDisplay = document.getElementById(`${carId}-balance-payment`);
     const interestDisplay = document.getElementById(`${carId}-total-interest`);
     const finalPaymentDisplay = document.getElementById(`${carId}-final-payment`);
     const monthlyPaymentDisplay = document.getElementById(`${carId}-monthly-payment`);
     const errorHandleDisplay = document.getElementById(`${carId}-error`);
     const modelDropdown = document.getElementById(`${carId}-model`);
 
     if (!colorDropdown || !tireDropdown || !modelDropdown) {
          console.error(`Missing elements for ${carId}. Check your HTML IDs.`);
          return;
     }
 
     // Initialize overview on load
     const currentCarModel = modelDropdown.value;
     updateCarOverview(currentCarModel, carId);
     updateCarImage(carId, currentCarModel);
     updateTotalPrice();
 
     // Event Listeners
     colorDropdown.addEventListener("change", () => {
          colorDisplay.textContent = `Color: ${colorDropdown.value || "-"}`;
          updateCarImage(carId, modelDropdown.value);
          updatePaymentDetails();
     });
 
     tireDropdown.addEventListener("change", () => {
          tireDisplay.textContent = `Tire Type: ${tireDropdown.value || "-"}`;
          updatePaymentDetails();
     });
 
     modelDropdown.addEventListener("change", () => {
          const model = modelDropdown.value;
          updateCarOverview(model, carId);
          updateCarImage(carId, model);
          updatePaymentDetails();
     });
 
     paymentMethodDropdown.addEventListener("change", updatePaymentDetails);
     installmentYearsDropdown.addEventListener("change", updatePaymentDetails);
 
     function updateCarImage(carId, model) {
          const selectedColor = colorDropdown.value;
          if (selectedColor && carImages[model]?.[selectedColor]) {
               carImage.src = carImages[model][selectedColor];
               carImage.onerror = () => {
                    carImage.src = `CarModel/CarModel_${model}_Default.png`;
               };
          } else {
               carImage.src = `CarModel/CarModel_${model}_Default.png`;
          }
     }
 
     function updateCarOverview(model, carId) {
          const specs = carSpecs[model];
          if (!specs) return;
          document.getElementById(`${carId}-horsepower`).textContent = `Horse Power: ${specs.horsepower}`;
          document.getElementById(`${carId}-weight`).textContent = `Weight: ${specs.weight}`;
          document.getElementById(`${carId}-top-speed`).textContent = `Top Speed: ${specs.topSpeed}`;
          document.getElementById(`${carId}-acceleration`).textContent = `Acceleration: ${specs.acceleration}`;
          document.getElementById(`${carId}-fuel-efficiency`).textContent = `Fuel Efficiency: ${specs.fuelEfficiency}`;
          document.getElementById(`${carId}-engine-type`).textContent = `Engine Type: ${specs.engineType}`;
          document.getElementById(`${carId}-drivetrain`).textContent = `Drivetrain: ${specs.drivetrain}`;
          document.getElementById(`${carId}-transmission`).textContent = `Transmission: ${specs.transmission}`;
          document.getElementById(`${carId}-seating`).textContent = `Seating Capacity: ${specs.seating}`;
     }
 
     function updateTotalPrice() {
          const color = colorDropdown.value;
          const tire = tireDropdown.value;
          const base = basePrices[modelDropdown.value] || 0;
          const colorCost = colorPrices[color] || 0;
          const tireCost = tirePrices[tire] || 0;
          const total = base + colorCost + tireCost;
          totalPriceDisplay.textContent = `Total Price: ${total.toLocaleString()} Baht`;
          return total;
     }
 
     function updatePaymentDetails() {
          const total = updateTotalPrice();
          const method = paymentMethodDropdown.value;
     
          downPaymentDisplay.textContent = "Down Payment: -";
          balanceDisplay.textContent = "Balance (after down payment): -";
          interestDisplay.textContent = "Total Interest: -";
          finalPaymentDisplay.textContent = "Final Balance Payment: -";
          monthlyPaymentDisplay.textContent = "Monthly Payment: -";
     
          if (method === "onetime") {
               installmentOptionsDiv.style.display = "none";
          } else if (method === "installment") {
               installmentOptionsDiv.style.display = "block";
               const years = parseInt(installmentYearsDropdown.value || "5");
               const down = total * DOWN_PAYMENT_PERCENTAGE;
               const balance = total - down;
               const interest = balance * INTEREST_RATE * years;
               const final = balance + interest;
               const monthly = final / (years * 12);
     
               downPaymentDisplay.textContent = `Down Payment: ${down.toLocaleString()} Baht`;
               balanceDisplay.textContent = `Balance (after down payment): ${balance.toLocaleString()} Baht`;
               interestDisplay.textContent = `Total Interest: ${interest.toLocaleString()} Baht`;
               finalPaymentDisplay.textContent = `Final Balance Payment: ${final.toLocaleString()} Baht`;
               monthlyPaymentDisplay.textContent = `Monthly Payment: ${monthly.toLocaleString()} Baht`;
          }
     }
}
 
function updateCarSection(carNum) {
     const model = document.getElementById(`model${carNum}`).value;
     const color = document.getElementById(`color${carNum}`).value;
     const tire = document.getElementById(`tire${carNum}`).value;

     const basePrice = getBasePrice(model);
     const colorCost = getColorCost(color);
     const tireCost = getTireCost(tire);

     const totalPrice = basePrice + colorCost + tireCost;

     document.getElementById(`overview${carNum}`).innerHTML = `
     <p>Model: ${model}</p>
     <p>Color: ${color}</p>
     <p>Tires: ${tire}</p>
     <p>Total Price: $${totalPrice.toLocaleString()}</p>
     `;
}
     
['1', '2', '3'].forEach(num => {
     document.getElementById(`model${num}`).addEventListener('change', () => updateCarSection(num));
     document.getElementById(`color${num}`).addEventListener('change', () => updateCarSection(num));
     document.getElementById(`tire${num}`).addEventListener('change', () => updateCarSection(num));
});

function getBasePrice(model) {
     const prices = { Sedan: 20000, SUV: 30000, CUV: 25000, Supercar: 100000 };
     return prices[model] || 0;
}

function getColorCost(color) {
     const costs = { Red: 500, Black: 700, White: 300 };
     return costs[color] || 0;
}

function getTireCost(tire) {
     const costs = { Sport: 1200, Standard: 600, Offroad: 1500 };
     return costs[tire] || 0;
}
   