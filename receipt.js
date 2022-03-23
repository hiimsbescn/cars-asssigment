(function receiptPageIIFE() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});

	const render = async () => {
		const firstName = document.getElementById("firstName");
		const lastName = document.getElementById("lastName");
		const streetName = document.getElementById("streetName");
		const postalCode = document.getElementById("postalCode");
		const number = document.getElementById("number");
		firstName.innerHTML = `First name: ${window.localStorage.getItem(
			"firstName"
		)}`;
		lastName.innerHTML = `Last name: ${window.localStorage.getItem(
			"lastName"
		)}`;
		streetName.innerHTML = `Street name: ${window.localStorage.getItem(
			"streetName"
		)}`;
		postalCode.innerHTML = `Postal code: ${window.localStorage.getItem(
			"postalCode"
		)}`;
		number.innerHTML = `Number: ${window.localStorage.getItem("number")}`;
		const accList = document.getElementById("accessories-list");
		const carEl = document.getElementById("car-name");
		const pickUpEl = document.getElementById("pick-up");
		const handInEl = document.getElementById("hand-in");
		const daysEl = document.getElementById("days");
		const pickUpDate = new Date(window.localStorage.getItem("pickUpDate"));
		const handInDate = new Date(window.localStorage.getItem("handInDate"));
		const acc = JSON.parse(window.localStorage.getItem("accessories"));
		var timeDiff = handInDate.getTime() - pickUpDate.getTime();
		var dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
		carEl.innerHTML = params.name;
		daysEl.innerHTML = `Rental days: ${dayDiff}`;
		pickUpEl.innerHTML = `Pick up date: ${pickUpDate.toDateString()}`;
		handInEl.innerHTML = `Hand in date: ${handInDate.toDateString()}`;
		accList.innerHTML = acc.reduce(
			(a, curr) => a + `<li>${curr.name}</li>`,
			""
		);
	};

	const init = () => {
		render();
	};

	init();
})();
