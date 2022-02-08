const main = document.querySelector(".main-content");

const searchForm = document.getElementById("searchForm")

const numberOfPeopleInput = document.getElementById("numberOfPeople")

const suitcasesInput = document.getElementById("suitcases")

searchForm.addEventListener('submit', function submitHandler(e) {
    e.preventDefault();
    let numberOfPeople = Number(numberOfPeopleInput.value);
    let suitcases = Number(suitcasesInput.value);
    let cars = [];
    fetch('https://raw.githubusercontent.com/hiimsbescn/cars-asssigment/main/cars.json')
        .then(res => res.json())
        .then(res => {
            cars = res;

            let filteredCars = cars.filter(function filterFunctions(car) {
                return (car.seats >= numberOfPeople) && (car.luggage >= suitcases);
            });
            let carBody = '';
            for (const car of filteredCars) {
                carBody = carBody + `
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
            }
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', carBody);
        })

});

