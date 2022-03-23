(function accessoryPageIIFE() {
	const slideDown = (element) => {
		element.classList.remove("hide");
		element.style.height = `${element.scrollHeight}px`;
	};
	const slideUp = (element) => element.classList.add("hide");
	const registerListeners = () => {
		const triggers = Array.from(
			document.getElementsByClassName("slide-trigger")
		);
		triggers.forEach((trigger) => {
			const idToSlide = trigger.attributes["slide-id"].value;
			const el = document.getElementById(idToSlide);
			el.style.height = 0;

			trigger.addEventListener("click", (e) => {
				if (el.classList.contains("hide")) {
					slideDown(el);
				} else {
					slideUp(el);
				}
			});
		});
	};
	const init = () => {
		registerListeners();
	};

	init();
})();
