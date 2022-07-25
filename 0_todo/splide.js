// SPLIDE CAROUSEL -----------------------------------------
// link to slick carousel options: https://splidejs.com/


// ---------- FULLSCREEN

const	splide_fullscreen = () => {

	let	splides_open	= document.querySelectorAll(".splide_open");
	let	splides_close	= document.querySelectorAll(".splide_close");

	splides_open.forEach((open) => {
		open.addEventListener("click", (e) => {
			e.preventDefault();

			let	container = open.closest(".splide_container");

			if (container) {
				container.classList.add("splide_fullscreen");
				// disable_scroll();
				container.addEventListener("click", (e) => {
					e.preventDefault();

					if (e.target == container) {
						container.classList.remove("splide_fullscreen");
						if (window.splide) window.splide.go("+0");
						// enable_scroll();
					}
				});
				if (window.splide) window.splide.go("+0");
			}
		});
	});

	splides_close.forEach((close) => {
		close.addEventListener("click", (e) => {
			e.preventDefault();

			let	container = close.closest(".splide_container");

			if (container) {
				container.classList.remove("splide_fullscreen");
				if (window.splide) window.splide.go("+0");
				// enable_scroll();
			}
		});
	});

};

splide_fullscreen();

// ---------- END FULLSCREEN
