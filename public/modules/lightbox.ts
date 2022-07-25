import { show_modal, hide_modal } from "./modal";
import { set_move_events } from "./slider";


const		create_close = (modal : HTMLElement, slider : HTMLElement) : void => {
	const	mab_modal__close : HTMLSpanElement = document.createElement("span");

	mab_modal__close.className = "mab_modal__close";
	mab_modal__close.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		hide_modal(modal);
	});
	slider.append(mab_modal__close);
};

const		create_slider = (modal : HTMLDivElement) : void => {
	const	slider : HTMLDivElement = document.createElement("div");

	slider.id = "mab_slider_lightbox";
	slider.className = "mab_slider mab_modal__wrapper";
	create_close(modal, slider);
	modal.append(slider);
};

const		create_modal = () : void => {
	const	modal : HTMLDivElement = document.createElement("div");

	modal.id = "mab_lightbox--modal";
	modal.className = "mab_modal";
	modal.setAttribute("aria-hidden", "true");
	create_slider(modal);
	modal.addEventListener("click", (e : Event) : void => {
		e.preventDefault();
	
		if (e.target == modal)
			hide_modal(modal);
	});
	document.body.append(modal);
};

const		set_active = (modal : HTMLElement) : void => {
	let active : boolean = false;
	let	tmp : HTMLElement | null;

	modal.querySelectorAll(".mab_slider__element").forEach((elt) => {
		if (elt.classList.contains("active")) {
			if (active === true)
				elt.classList.remove("active");
			else
				active = true;
		}
	});
	if (active === false) {
		tmp = modal.querySelector(".mab_slider__element");
		if (tmp)
			tmp.classList.add("active");
	}
};

const		clone_element = (lightbox : HTMLElement, slider : HTMLElement) : void => {
	const	lb_id : string | null = lightbox.getAttribute("data-id");
	const	elements : NodeListOf<HTMLElement> = document.querySelectorAll(`.mab_lightbox[data-id="${lb_id}"]`);

	elements && elements.forEach((element : HTMLElement) : void => {
		const	clone : HTMLElement = element.cloneNode(true) as HTMLElement;

		// il faut que l'image cliquée soit la premiere à être affichée
		if (element === lightbox)
			clone.classList.add("active");
		clone.classList.add("mab_slider__element");
		set_move_events(slider, clone);
		slider.append(clone);
	});
};

const		init_lightbox = (lightbox : HTMLElement) : void => {
	lightbox.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		const	modal : HTMLElement = document.getElementById("mab_lightbox--modal")!;
		
		if (modal) {
			const	slider : HTMLElement = modal.querySelector(".mab_slider")!;

			clone_element(lightbox, slider);
			set_active(modal);
			show_modal(modal);
		}
	});
};

const		mab_lightbox = () : void => {
	let	mab_lightbox : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_lightbox");

	if (mab_lightbox.length > 0) {
		create_modal();
		mab_lightbox.forEach((lightbox : HTMLElement) : void => {
			init_lightbox(lightbox);
		});
	}
};


export default mab_lightbox;
