

import { show_modal, create_modal } from "./modal";
import { move_next, move_previous, set_move_events } from "./slider";
import splide_fullscreen from "./splide_fullscreen";

import Splide from "./splide.min.js";


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
	const	elements : NodeListOf<HTMLElement> = clone.querySelectorAll(".mab_slider__element");

	set_navigation_events(clone);
	elements && elements.forEach((element : HTMLElement) : void => {
		set_move_events(clone, element);
	});
};

const		mount_fullscreen = (slider : HTMLElement, modal : HTMLElement) : void => {
	let		clone : HTMLElement = slider.cloneNode(true) as HTMLElement;
	const	open : HTMLElement | null = clone.querySelector(".mab_slider__open");

	const	splide : boolean = slider.classList.contains("splide");
	
	clone.style.width = "100vw";
	clone.style.height = "100vh";
	open && open.remove();
	if (slider.classList.contains("mab_slider"))
		handle_mab_slider(clone);
	if (splide)
		clone = splide_fullscreen(clone);
	if (clone && modal) {
		modal.append(clone);
		if (splide) {
			window.splide_tmp[`#${clone.id}` as any] = new Splide(`#${clone.id}`);
			window.splide_tmp[`#${clone.id}` as any].mount();
		}
		show_modal(modal);
	}
};

const		init_fullscreen = (slider : HTMLElement) : void => {
	const	modal : HTMLElement | null = document.getElementById("mab_slider__fullscreen--modal");
	const	element : HTMLSpanElement = document.createElement("span");

	element.className = "mab_slider__open";
	element.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		if (modal)
			mount_fullscreen(slider, modal);
		});
	slider.prepend(element);
};

const		slider_fullscreen = () : void => {
	const	elements : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_slider--fullscreen");

	if (elements.length > 0) {
		create_modal("mab_slider__fullscreen--modal");
		elements.forEach((element : HTMLElement) : void => {
			init_fullscreen(element);
		});
	}
};


export default slider_fullscreen;
