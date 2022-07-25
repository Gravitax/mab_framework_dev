

import { show_modal, hide_modal } from "./modal";
import { move_next, move_previous, set_move_events } from "./slider";


const		create_close = (modal : HTMLElement) : void => {
	const	element : HTMLSpanElement = document.createElement("span");

	element.className = "mab_modal__close";
	element.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		hide_modal(modal);
	});
	modal.prepend(element);
};

const		create_modal = () : void => {
	const	modal : HTMLDivElement = document.createElement("div");

	modal.id="mab_slider__fullscreen--modal";
	modal.className = "mab_modal";
	modal.setAttribute("aria-hidden", "true");
	create_close(modal);
	modal.addEventListener("click", (e : Event) : void => {
		e.preventDefault();
	
		if (e.target == modal)
			hide_modal(modal);
	});
	document.body.append(modal);
};

const		set_navigation_events = (clone : HTMLElement) : void => {
	let	tmp : HTMLElement | null = clone.querySelector(".mab_slider__next");

	tmp && tmp.addEventListener("click", (e : Event) : void => {
		e.preventDefault();
	
		move_next(clone);
	});
	tmp = clone.querySelector(".mab_slider__prev");
	tmp && tmp.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		move_previous(clone);
	});
};

const		handle_mab_slider = (clone : HTMLElement) : void => {
	const	elts : NodeListOf<HTMLElement> = clone.querySelectorAll(".mab_slider__element");

	set_navigation_events(clone);
	elts && elts.forEach((elt : HTMLElement) : void => {
		set_move_events(clone, elt);
	});
};

const		handle_splide = (clone : HTMLElement) : void => {
	console.log(clone);
};

const		init_fullscreen = (slider : HTMLElement) : void => {
	const	modal : HTMLElement | null = document.getElementById("mab_slider__fullscreen--modal");
	const	element : HTMLSpanElement = document.createElement("span");

	element.className = "mab_slider__open";
	element.addEventListener("click", (e : Event) : void => {
		e.preventDefault();
		
		if (modal) {
			const	clone : HTMLElement = slider.cloneNode(true) as HTMLElement;
			const	open : HTMLElement | null = clone.querySelector(".mab_slider__open");

			if (open)
				open.remove();
			if (slider.classList.contains("mab_slider"))
				handle_mab_slider(clone);
			if (slider.classList.contains("splide"))
				handle_splide(clone);

			modal.append(clone);
			show_modal(modal);
		}
	});
	slider.prepend(element);
};

const		slider_fullscreen = () : void => {
	const	elements : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_slider--fullscreen");

	if (elements.length > 0) {
		create_modal();
		elements.forEach((element : HTMLElement) : void => {
			init_fullscreen(element);
		});
	}
};


export default slider_fullscreen;
