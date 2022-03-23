(function indexPageIIFE() {
	const main = document.getElementById("main-content");
	const form = document.getElementById("search-form");

	function carTemplateBuilder({ cars }, predicateFn) {
		return cars.filter(predicateFn).map(
			(car) =>
				`
				<div class="card text-white bg-dark col p-0 m-2">
					<img src="${car.imageUrl}" class="card-img-top">
					<div class="card-body">
						<h5 class="card-title">${car.name}</h5>
						<p class="card-text">
						${car.description}</p>
						<a href="/accesory.html?name=${car.name}&price=${car.price}" class="btn btn-primary">Book now</a>
					</div>
					</div>`
		);
	}

	form.addEventListener("submit", function submitHandler(event) {
		event.preventDefault();
		const numberOfPeople = document.getElementById("people").value;
		const numberOfSuitcases = document.getElementById("suitcases").value;
		const pickUpDate = document.getElementById("pickUp").value;
		const handInDate = document.getElementById("handIn").value;
		window.localStorage.setItem("handInDate", handInDate);
		window.localStorage.setItem("pickUpDate", pickUpDate);
		fetch(
			"https://raw.githubusercontent.com/dimitur2204/cars-rent-sem2/main/cars.json"
		)
			.then((res) => res.json())
			.then((data) => {
				main.innerHTML = "";
				main.innerHTML = carTemplateBuilder(
					{ cars: data, pickUpDate, handInDate },
					(car) =>
						car.seats >= numberOfPeople && car.suitcasesFit >= numberOfSuitcases
				);
			})
			.catch((err) => {
				main.innerHTML = err.message || err;
			});
	});
})();
