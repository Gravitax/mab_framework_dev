import { show_modal, hidde_modal } from "./modal";


const			create_close = (modal : HTMLElement, slider : HTMLElement) : void => {
	const	mab_modal__close : HTMLImageElement = document.createElement("img");

	mab_modal__close.className = "mab_modal__close";
	mab_modal__close.src = "public/images/close.png";
	mab_modal__close.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		hidde_modal(modal);
	});
	slider.append(mab_modal__close);
};

const			create_navigation = (slider: HTMLElement) : void => {
	let	tmp : HTMLImageElement;

	tmp = document.createElement("img");
	tmp.className = "mab_slider__next";
	tmp.setAttribute("src", "public/images/next.png");
	slider.append(tmp);
	tmp = document.createElement("img");
	tmp.className = "mab_slider__prev";
	tmp.setAttribute("src", "public/images/prev.png");
	slider.append(tmp);
};

const			create_slider = (modal : HTMLDivElement) : void => {
	const	slider : HTMLDivElement = document.createElement("div");

	slider.id = "mab_slider_lightbox";
	slider.className = "mab_slider mab_modal__wrapper";
	create_navigation(slider);
	create_close(modal, slider);
	const	tmp : HTMLDivElement = document.createElement("div");

	tmp.className = "mab_slider__inner";
	slider.append(tmp);
	modal.append(slider);
};

const			create_modal = () : void => {
	const	modal : HTMLDivElement = document.createElement("div");

	modal.id = "mab_lightbox_modal";
	modal.className = "mab_modal";
	modal.setAttribute("aria-hidden", "true");

	create_slider(modal);

	document.body.append(modal);
};

const			set_active = (modal : HTMLElement) : void => {
	let active : boolean = false;
	let	tmp : HTMLElement | null;

	modal.querySelectorAll(".mab_slider__element").forEach((elt) => {
		if (elt.classList.contains("active"))
			active = true;
	});
	if (active === false) {
		tmp = modal.querySelector(".mab_slider__element");
		if (tmp)
			tmp.classList.add("active");
	}
};

const			clone_element = (lightbox : HTMLElement, mab_slider__inner : HTMLElement) : void => {
	const	lb_id : string | null = lightbox.getAttribute("data-id");
	const	all_id : NodeListOf<HTMLElement> = document.querySelectorAll(`[data-id="${lb_id}"]`);

	all_id.forEach((id : HTMLElement) : void => {
		const	clone : HTMLElement = id.cloneNode(true) as HTMLElement;
	
		// si pas de src on skip => à cause de l'icone full screen ...
		// if (!id.getAttribute("href"))
		// 	return ;

		// il faut que l'image cliquée soit la premiere à être affichée
		if (id === lightbox)
			clone.classList.add("active");
		mab_slider__inner.append(clone);
	});
};

const			init_lightbox = (lightbox : HTMLElement) : void => {
	lightbox.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		const	modal : HTMLElement = document.getElementById("mab_lightbox_modal")!;
		const	mab_slider__inner : HTMLElement = modal.querySelector(".mab_slider__inner")!;

		if (!modal || !mab_slider__inner)
			return ;
		clone_element(lightbox, mab_slider__inner);
		set_active(modal);
		modal.addEventListener("click", (e) => {
			e.preventDefault();
		
			if (e.target == modal)
				hidde_modal(modal);
		});
		show_modal(modal);
	});
};

export const	mab_lightbox = () : void => {
	let	mab_lightbox : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_lightbox");

	if (mab_lightbox.length > 0) {
		create_modal();
		mab_lightbox.forEach((lightbox : HTMLElement) : void => {
			init_lightbox(lightbox);
		});
	}

};


export default {
	mab_lightbox
};
