(function accessoryPageIIFE() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});

	const paramsForNewPage = new URLSearchParams({
		name: params.name,
		price: params.price,
	});
	const getCheckboxes = () =>
		Array.from(document.querySelectorAll('input[type="checkbox"]'));

	const render = () => {
		const carEl = document.getElementById("car-name");
		const pickUpEl = document.getElementById("pick-up");
		const handInEl = document.getElementById("hand-in");
		const daysEl = document.getElementById("days");
		const pickUpDate = new Date(window.localStorage.getItem("pickUpDate"));
		const handInDate = new Date(window.localStorage.getItem("handInDate"));
		var timeDiff = handInDate.getTime() - pickUpDate.getTime();
		var dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
		carEl.innerHTML = params.name;
		daysEl.innerHTML = `Rental days: ${dayDiff}`;
		pickUpEl.innerHTML = `Pick up date: ${pickUpDate.toDateString()}`;
		handInEl.innerHTML = `Hand in date: ${handInDate.toDateString()}`;
	};

	const renderTotal = () => {
		const continueLink = document.getElementById("continue-link");
		const total = getTotal();
		const totalEl = document.getElementById("total");
		totalEl.innerHTML = `Car rental cost: ${total + Number(params.price)}DKK`;
		const accTotal = getCheckboxes().reduce(
			(acc, curr) => acc + checkboxesPricing[curr.id],
			0
		);
		const accList = getCheckboxes().map((acc) => ({
			name: acc.id,
			price: checkboxesPricing[acc.id],
		}));
		window.localStorage.setItem("accessories", JSON.stringify(accList));
		paramsForNewPage.set("total", total);
		paramsForNewPage.set("accTotal", accTotal);
		continueLink.href = `/customer-information.html?${paramsForNewPage.toString()}`;
	};

	const checkboxesPricing = {
		secondDriver: 450,
		bigChildSeat: 95,
		roadsideAid: 320,
		babySeat: 100,
		smallChildSeat: 100,
		gpsNav: 250,
		snowChains: 180,
	};

	const getTotal = () => {
		const checkboxes = getCheckboxes();
		return checkboxes.reduce((acc, curr) => {
			if (curr.checked) {
				return acc + checkboxesPricing[curr.id];
			}
			return acc;
		}, 0);
	};

	const checkboxListener = () => {
		renderTotal();
	};

	const registerListeners = () => {
		const checkboxes = getCheckboxes();
		checkboxes.forEach((c) => {
			c.addEventListener("change", checkboxListener);
		});
	};

	const init = () => {
		registerListeners();
		render();
		renderTotal();
	};

	init();
})();
