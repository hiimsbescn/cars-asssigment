const main = document.querySelector(".main-content");

let filteredCars = cars.filter(function filterFunctions(car) {
    return car.seats > 2;
});

for(const car of filteredCars) {
    const carBody = `
        <section class="rent-budget">
            <img src="${car.picture}" alt="car-icon">
            <h3>${car.model}</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </p>
            <div>
                <h3>${car.price} DKK</h3>
                <button>Book now</button>
            </div>
        </section>`;

    main.insertAdjacentHTML('beforeend', carBody);
}
