const			is_image = (element : Element) : boolean => {
	return (!element.classList.contains("mab_slider__next")
		&& !element.classList.contains("mab_slider__prev")
		&& !element.classList.contains("mab_slider__close")
		&& !element.classList.contains("mab_modal__close"));
};

export const	move_next = (slider : HTMLElement) : void => {
	const	current_img : HTMLElement | null = slider.querySelector(".active");

	if (current_img) {
		const	next_img : Element | null = current_img.nextElementSibling;
					
		current_img.classList.remove("active");
		if (next_img && is_image(next_img))
			next_img.classList.add("active");
		else {
			const	element = slider.querySelector(".mab_slider__element");

			if (element)
				element.classList.add("active");
		}
	}
};

export const	move_previous = (slider : HTMLElement) : void => {
	const	current_img : HTMLElement | null = slider.querySelector(".active");

	if (current_img) {
		const	prev_img : Element | null = current_img.previousElementSibling;
			
		current_img.classList.remove("active");
		if (prev_img && is_image(prev_img))
			prev_img.classList.add("active");
		else {
			const	element = slider.querySelector(".mab_slider__element:last-child");

			if (element)
				element.classList.add("active");
		}
	}
};

export const	set_move_events = (slider : HTMLElement, element : HTMLElement) : void => {
	let		x : number = 0;

	if (window.innerWidth > 800) {
		element.addEventListener("mousedown", (e : MouseEvent) : void => {
			x = e.clientX;
		}, { passive : true });
		element.addEventListener("mouseup", (e : MouseEvent) : void => {
			let	dist = e.clientX - x;

			if (dist * dist > 100)
				dist < 0 ? move_next(slider) : move_previous(slider);
		}, { passive : true });
	}
	else {
		element.addEventListener("touchstart", (e : any) : void => {
			e = e.changedTouches ? e.changedTouches[0] : e;
			x = e.clientX;
		}, { passive : true });
		element.addEventListener("touchend", (e : any) : void => {
			e = e.changedTouches ? e.changedTouches[0] : e;

			let	dist = e.clientX - x;

			if (dist * dist > 200)
				dist < 0 ? move_next(slider) : move_previous(slider);
		}, { passive : true });
	}
};

const			set_navigation = (slider : HTMLElement) : void => {
	let	element : HTMLSpanElement = document.createElement("span");

	element.className = "mab_slider__next";
	element.addEventListener("click", (e : Event) : void => {
		e.preventDefault();
		move_next(slider);
	});
	slider.prepend(element);
	element = document.createElement("span");
	element.className = "mab_slider__prev";
	element.addEventListener("click", (e : Event) : void => {
		e.preventDefault();
		move_previous(slider);
	});
	slider.prepend(element);
};

const			set_options = (slider : HTMLElement) : void => {
	let	interval : string | null = slider.getAttribute("data-interval");

	if (interval) {
		setInterval(() => {
			move_next(slider);
		}, parseInt(interval, 10));
	}
};

const			format_elements = (slider : HTMLElement, elements : NodeListOf<HTMLElement>) : void => {
	elements && elements.forEach((element : HTMLElement) : void => {
		let	src : string | null = element.getAttribute("data-src");
		let	size : string | null = element.getAttribute("data-size");
		let	position : string | null = element.getAttribute("data-position");

		if (src) {
			element.setAttribute("style",
				`background : url(${src}) no-repeat ${position || "center"}/${size || "contain"};`);
		}
		set_move_events(slider, element);
	});
};

const			mab_slider = () : void => {
	const	sliders : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_slider");
	
	sliders && sliders.forEach((slider : HTMLElement) : void => {
		format_elements(slider, slider.querySelectorAll(".mab_slider__element"));
		let	first : HTMLElement | null = slider.querySelector(".mab_slider__element");

		if (first)
			first.classList.add("active");
		set_options(slider);
		set_navigation(slider);
	});
}


export default mab_slider;
