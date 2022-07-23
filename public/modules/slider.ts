const	format_elements = () : void => {
	const	elements : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_slider__element");

	elements && elements.forEach((element : HTMLElement) => {
		let	href : string | null = element.getAttribute("href");
		let	size : string | null = element.getAttribute("data-size");
		let	position : string | null = element.getAttribute("data-position");

		if (href) {
			element.setAttribute("style",
				`background : url(${href}) no-repeat; background-size : ${size || "contain"}; background-position : ${position || "center"};`);
		}
	});
};

const	slide_next = () : void => {
	const	mab_slider__next = document.querySelectorAll(".mab_slider__next");

	mab_slider__next && mab_slider__next.forEach((next) => {
		next.addEventListener("click", (e: Event) : void => {
			const	target : HTMLElement = e.target as HTMLElement;
			const	slider : HTMLElement | null = target.closest(".mab_slider");
			const	id : string | null = slider ? slider.getAttribute("id") : null;

			if (id) {
				const	current_img : HTMLElement | null = document.querySelector(`#${id} .active`);

				if (current_img) {
					const	next_img : Element | null = current_img.nextElementSibling;
					
					current_img.classList.remove("active");
					if (next_img)
						next_img.classList.add("active");
					else {
						const	tmp = document.querySelector(`#${id} .mab_slider__inner > .mab_slider__element:first-child`);

						if (tmp)
							tmp.classList.add("active");
					}
				}
				
			}
		}, { passive : true });
	});
};

const	slide_prev = () : void => {
	const	mab_slider__prev = document.querySelectorAll(".mab_slider__prev");

	mab_slider__prev && mab_slider__prev.forEach((prev) => {
		prev.addEventListener("click", (e: Event) : void => {
			const	target : HTMLElement = e.target as HTMLElement;
			const	slider : HTMLElement | null = target.closest(".mab_slider");
			const	id : string | null = slider ? slider.getAttribute("id") : null;

			if (id) {
				const	current_img : HTMLElement | null = document.querySelector(`#${id} .active`);

				if (current_img) {
					const	prev_img : Element | null = current_img.previousElementSibling;
					
					current_img.classList.remove("active");
					if (prev_img)
						prev_img.classList.add("active");
					else {
						const	tmp = document.querySelector(`#${id} .mab_slider__inner > .mab_slider__element:last-child`);

						if (tmp)
							tmp.classList.add("active");
					}
				}
				
			}
		}, { passive : true });
	});
};

const	mab_slider = () : void => {
	format_elements();
	slide_next();
	slide_prev();
}


export {
	mab_slider
}
