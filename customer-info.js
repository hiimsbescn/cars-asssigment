(function customerInformationPageIIFE() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});
	const getInputs = () =>
		Array.from(document.querySelectorAll("form input, form select"));

	const render = async () => {
		const postalCodeEl = document.getElementById("postalCode");
		const accList = document.getElementById("accessories-list");
		const carEl = document.getElementById("car-name");
		const accTotalEl = document.getElementById("acc-total");
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
		accTotalEl.innerHTML = `Accessories total ${acc.reduce(
			(acc, curr) => acc + curr.price,
			0
		)}DKK`;
		accList.innerHTML = acc.reduce(
			(a, curr) => a + `<li>${curr.name}</li>`,
			""
		);
		const fetchText = (url) => fetch(url).then((r) => r.json()); // 1

		const [hr, bg] = await Promise.all([
			fetchText(
				`https://raw.githubusercontent.com/mauricedoepke/zipcodelist/main/city_to_zip-HR.json`
			),
			fetchText(
				`https://raw.githubusercontent.com/mauricedoepke/zipcodelist/main/city_to_zip-BG.json`
			),
		]);
		const hrArr = Object.entries(hr).map(([key, value]) => {
			return { name: key, value: value[0] };
		});

		const bgArr = Object.entries(bg).map(([key, value]) => {
			return { name: key, value: value[0] };
		});
		const towns = [...hrArr, ...bgArr];
		postalCodeEl.innerHTML = towns
			.slice(4)
			.reduce(
				(acc, curr) =>
					acc +
					`<option value=${curr.value}>${curr.name} - ${curr.value}</option>`,
				""
			);
	};

	const inputListener = (e) => {
		window.localStorage.setItem(e.target.id, e.target.value);
	};

	const registerListeners = () => {
		const inputs = getInputs();
		inputs.forEach((i) => {
			i.addEventListener("change", inputListener);
		});
	};

	const init = () => {
		registerListeners();
		render();
	};

	init();
})();
