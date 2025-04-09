const colorDropdown = document.getElementById('CarColor');
const tireDropdown = document.getElementById('TireType');
const colorDisplay = document.getElementById('selected-color');
const tireDisplay = document.getElementById('selected-tire');
const carImage = document.getElementById('carImage');

const totalPriceDisplay = document.getElementById('total-price');
const paymentMethodDropdown = document.getElementById('payment-method');
const installmentYearsDropdown = document.getElementById('installment-years');
const installmentOptionsDiv = document.getElementById('installment-options');

const downPaymentDisplay = document.getElementById('down-payment');
const balanceDisplay = document.getElementById('balance-payment');
const interestDisplay = document.getElementById('total-interest');
const finalPaymentDisplay = document.getElementById('final-payment');
const monthlyPaymentDisplay = document.getElementById('monthly-payment');

const ErrorHandleDisplay = document.getElementById('error-handle');
const INTEREST_RATE = 0.035;
const DOWN_PAYMENT_PERCENTAGE = 0.25;

//Map the carImages as the key and the image path as the value
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
};

//Price mapping for Colors
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

//Since we need the dynamic car model name, we will declare the car model as a
//Global variable using the var keyword. Then we can access that variable from script.js

//Update the car image based on the selected color
colorDropdown.addEventListener('change', () => {
    const selectedColor = colorDropdown.value;
    colorDisplay.textContent = `Color: ${selectedColor || '-'}`;
    updateCarImage();
    updateTotalPrice(); 
});

tireDropdown.addEventListener('change', () => {
    const selectedTire = tireDropdown.value;
    tireDisplay.textContent = `Tire Type: ${selectedTire || '-'}`;
    updateTotalPrice();
});

paymentMethodDropdown.addEventListener('change', updatePaymentDetails);
installmentYearsDropdown.addEventListener('change', updatePaymentDetails);
colorDropdown.addEventListener('change', updatePaymentDetails);
tireDropdown.addEventListener('change', updatePaymentDetails);
function updateCarImage() {
    const selectedColor = colorDropdown.value;
    if (selectedColor && carImages[currentCarModel][selectedColor]) {
        const imagePath = carImages[currentCarModel][selectedColor];
        carImage.src = imagePath;

        carImage.onerror = () => {
            console.log(`Image not found: ${imagePath}`);
            carImage.src = `CarModel/CarModel_${currentCarModel}_Default.png`;
        };
    } else {
        carImage.src = `CarModel/CarModel_${currentCarModel}_Default.png`;
    }
}

function updateTotalPrice(){
    const selectedColor = colorDropdown.value;
    const selectedTire = tireDropdown.value;

    const basePrice = basePrices[currentCarModel] || 0;
    const colorPrice = colorPrices[selectedColor] || 0;
    const tirePrice = tirePrices[selectedTire] || 0;

    const totalPrice = basePrice + colorPrice + tirePrice;

    totalPriceDisplay.textContent = `Total Price: ${totalPrice.toLocaleString()} Baht`;

    return totalPrice;
}

function updatePaymentDetails(){
    const total = updateTotalPrice();
    const method = paymentMethodDropdown.value;

    downPaymentDisplay.textContent = "Down Payment: -";
    balanceDisplay.textContent = "Balance (after down payment): -";
    interestDisplay.textContent = "Total Interest: -";
    finalPaymentDisplay.textContent = "Final Balance Payment: -";
    monthlyPaymentDisplay.textContent = "Monthly Payment: -";

    if (method === "onetime"){
        installmentOptionsDiv.style.display="none";
    }else if (method === "installment"){
        installmentOptionsDiv.style.display="block";
        const years = parseInt(installmentYearsDropdown.value || "5");

        const downPayment = total * DOWN_PAYMENT_PERCENTAGE;
        const balance = total - downPayment;
        const totalInterest = balance * INTEREST_RATE * years;
        const finalPayment = balance + totalInterest;
        const monthly = finalPayment / (years * 12);

        downPaymentDisplay.textContent = `Down Payment: ${downPayment.toLocaleString()} Baht`;
        balanceDisplay.textContent = `Balance (after down payment): ${balance.toLocaleString()} Baht`;
        interestDisplay.textContent = `Total Interest: ${totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})} Baht`;
        finalPaymentDisplay.textContent = `Final Balance Payment: ${finalPayment.toLocaleString()} Baht`;
        monthlyPaymentDisplay.textContent = `Monthly Payment: ${monthly.toLocaleString(undefined, {maximumFractionDigits: 0})} Baht`;
    } else {
        installmentOptionsDiv.style.display = "none";
    } 
}

document.getElementById('purchase-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const model = currentCarModel;
    const color = colorDropdown.value || "";
    const tire = tireDropdown.value || "";

    if (!color || !tire) {
        ErrorHandleDisplay.textContent = "Please select all the fields!";
        return;
    }

    ErrorHandleDisplay.textContent = "";

    const price = document.getElementById('total-price').textContent.replace("Total Price: ", "");

    const method = paymentMethodDropdown.value || "N/A";
    const years = installmentYearsDropdown.value || "-";
    const down = downPaymentDisplay.textContent.replace("Down Payment: ", "") || "-";
    const balance = balanceDisplay.textContent.replace("Balance (after down payment): ", "") || "-";
    const interest = interestDisplay.textContent.replace("Total Interest: ", "") || "-";
    const finalPayment = finalPaymentDisplay.textContent.replace("Final Balance Payment: ", "") || "-";
    const monthly = monthlyPaymentDisplay.textContent.replace("Monthly Payment: ", "") || "-";

    const date = new Date().toLocaleString();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();

    const date_format = `${year}_${month}_${day}_${hour < 10 ? '0' + hour : hour}${minute < 10 ? '0' + minute : minute}${second < 10 ? '0' + second : second}`;

    doc.setFontSize(16);
    doc.text("Purchase Summary", 20, 20);   

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 30);
    doc.text(`Car Model: ${model}`, 20, 40);
    doc.text(`Color: ${color}`, 20, 50);
    doc.text(`Tire Type: ${tire}`, 20, 60);
    doc.text(`Total Price: ${price}`, 20, 70);
    doc.text(`Payment Method: ${method === "installment" ? "Installment" : "One-Time"}`, 20, 80);

    if (method === "installment") {
        doc.text(`Years: ${years}`, 20, 90);
        doc.text(`Down Payment: ${down}`, 20, 100);
        doc.text(`Balance After Down Payment: ${balance}`, 20, 110);
        doc.text(`Total Interest: ${interest}`, 20, 120);
        doc.text(`Final Payment Amount: ${finalPayment}`, 20, 130);
        doc.text(`Monthly Payment: ${monthly}`, 20, 140);
    }

    doc.text("Thank you for your purchase!", 20, 160);

    doc.save(`Purchase_${model}_${date_format}.pdf`);
});
