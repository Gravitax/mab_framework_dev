import { show_modal, create_modal } from "./modal";
import { set_move_events, set_navigation } from "./slider";


const		set_active = (modal : HTMLElement) : void => {
	let active : boolean = false;

	modal.querySelectorAll(".mab_slider__element").forEach((elt) => {
		if (elt.classList.contains("active")) {
			if (active === true)
				elt.classList.remove("active");
			else
				active = true;
		}
	});
	if (active === false) {
		const	element : HTMLElement | null = modal.querySelector(".mab_slider__element");

		element && element.classList.add("active");
	}
};

const		mount_lightbox = (lightbox : HTMLElement, slider : HTMLElement) : void => {
	const	data_id : string | null = lightbox.getAttribute("data-id");
	const	elements : NodeListOf<HTMLElement> = document.querySelectorAll(`.mab_lightbox[data-id="${data_id}"]`);

	elements && elements.forEach((element : HTMLElement) : void => {
		const	clone : HTMLElement = element.cloneNode(true) as HTMLElement;

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

			mount_lightbox(lightbox, slider);
			set_active(modal);
			show_modal(modal);
		}
	});
};

const		create_slider = (modal : HTMLElement) : void => {
	const	slider : HTMLDivElement = document.createElement("div");

	slider.id = "mab_slider_lightbox";
	slider.className = "mab_slider mab_modal__wrapper";
	set_navigation(slider);
	modal.append(slider);
};

const		mab_lightbox = () : void => {
	let	mab_lightbox : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_lightbox");

	if (mab_lightbox.length > 0) {
		const modal : HTMLElement = create_modal("mab_lightbox--modal");

		if (modal) {
			create_slider(modal);
			mab_lightbox.forEach((lightbox : HTMLElement) : void => {
				init_lightbox(lightbox);
			});
		}
	}
};


export default mab_lightbox;
