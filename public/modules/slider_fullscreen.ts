
import Splide from "@splidejs/splide";

import { show_modal, create_modal } from "./modal";
import { set_move_events, set_navigation } from "./slider";
import splide_fullscreen from "./slider_fullscreen__splide";


const		handle_mab_slider = (clone : HTMLElement) : void => {
	const	elements : NodeListOf<HTMLElement> = clone.querySelectorAll(".mab_slider__element");

	set_navigation(clone);
	elements && elements.forEach((element : HTMLElement) : void => {
		set_move_events(clone, element);
	});
};

const		mount_fullscreen = (modal : HTMLElement, slider : HTMLElement) : void => {
	let		clone : HTMLElement = slider.cloneNode(true) as HTMLElement;
	const	open : HTMLElement | null = clone.querySelector(".mab_slider__open");

	open && open.remove();	
	clone.style.width = "100vw";
	clone.style.height = "100vh";
	const	splide : boolean = slider.classList.contains("splide");

	if (splide)
		clone = splide_fullscreen(clone);
	else if (slider.classList.contains("mab_slider"))
		handle_mab_slider(clone);
	if (clone) {
		modal.append(clone);
		if (splide) {
			window.splide_tmp[`#${clone.id}`] = new Splide(`#${clone.id}`);
			window.splide_tmp[`#${clone.id}`].mount();
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
			mount_fullscreen(modal, slider);
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
