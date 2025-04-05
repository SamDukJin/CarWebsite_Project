document.addEventListener('DOMContentLoaded', () => {
    const selectCar = document.getElementById('CarModel');
    const selectColor = document.getElementById('CarColor');
    const selectTire = document.getElementById('TireType');

    const carLabel = document.getElementById('carLabel');
    const carImageDiv = document.getElementById('carImage');

    const carTypeOverview = document.getElementById('car_type');
    const colorTypeOverview = document.getElementById('color_type');
    const tireTypeOverview = document.getElementById('tire_type');

    selectCar.addEventListener('change', () => {
        const carType = selectCar.value.trim().toUpperCase();

        if (carType === "") {
            carLabel.textContent = "Choose a car model:";
            carImageDiv.style.display = "none";
            carTypeOverview.textContent = "Car Type: ";
            return;
        }

        const newSrc = `CarModel/CarModel_${carType}.png`; 

        console.log("Car Image Path:", newSrc);

        carLabel.textContent = `Displaying: ${carType}`;
        carImageDiv.style.backgroundImage = `url(${newSrc})`;
        carImageDiv.style.display = "block";

        carTypeOverview.textContent = `Car Type: ${carType}`;
    });

    selectColor.addEventListener('change', () => {
        const color = selectColor.value.trim();
        colorTypeOverview.textContent = color ? `Color: ${color}` : "Color: ";
    });

    selectTire.addEventListener('change', () => {
        const tire = selectTire.value.trim();
        tireTypeOverview.textContent = tire ? `Tire Type: ${tire}` : "Tire Type: ";
    });
});
