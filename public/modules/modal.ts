export const	show_modal = (modal : HTMLElement) : void => {
	window.setTimeout(() : void => { modal.style.display = "flex"; }, 500);
	modal.setAttribute("aria-hidden", "false");
};

export const	load_modal = async function (url : string) : Promise<HTMLElement | null> {
	const	target : string = "#" + url.split("#")[1];
	const	html : string = await fetch(url)
		.then((response : Response) : Promise<string> => response.text());
	const	fragment : DocumentFragment = document.createRange().createContextualFragment(html);
	const	modal : HTMLElement | null = fragment.querySelector(target);
	
	if (modal) {
		if (modal.classList.contains("mab_modal") && !document.querySelector(target)) {
			init_modal__close(modal);
			document.body.append(modal);
		}
	}
	return (modal);
};

export const	open_modal = async function (e : Event) : Promise<void> {
	e.preventDefault();

	const	target : HTMLElement = e.target as HTMLElement;
	let		href : string | null = target && target.getAttribute("data-href");
	let		modal : HTMLElement;

	if (href) {
		if (href.startsWith("#"))
			modal = document.querySelector(href) as HTMLElement;
		else {
			modal = await load_modal(href) as HTMLElement;
			href = "#" + href.split("#")[1];
			target.setAttribute("data-href", href);
		}
		if (modal)
			show_modal(modal)
	}
};

const			custom_hide = (modal : HTMLElement) : void => {
	switch (modal.id) {
		case "mab_lightbox--modal":
			const	mab_lightbox : NodeListOf<HTMLElement> = modal.querySelectorAll(".mab_slider__element");

			mab_lightbox && mab_lightbox.forEach((tmp) => tmp.remove());
			break ;
		case "mab_slider__fullscreen--modal":
			let		content : HTMLElement | null = modal.querySelector(".mab_slider");

			content && content.remove();
			content = modal.querySelector(".splide");
			for (const key of Object.keys(window.splide_tmp))
				window.splide_tmp[key].destroy("completely");
			content && content.remove();
			break ;
	}
};

export const	hide_modal = (modal : HTMLElement) : void => {
	window.setTimeout(() : void => {
		modal.style.display = "none";
		custom_hide(modal);
	}, 500);
	modal.setAttribute("aria-hidden", "true");
};

const			init_modal__open = () : void => {
	const	modals_open : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_modal__open");

	if (modals_open.length > 0) {
		modals_open.forEach((open : HTMLElement) : void => {
			open.addEventListener("click", open_modal);
		});	
		window.addEventListener("keydown", (e : KeyboardEvent) : void => {
			if (e.key === "Escape" || e.key === "Esc") {
				const	modals : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_modal");
		
				modals && modals.forEach((modal : HTMLElement) : void => {
					hide_modal(modal);
				});
			}
		});	
	}
};

export const	init_modal__close = (modal : HTMLElement) : void => {
	const	element : HTMLSpanElement = document.createElement("span");

	element.className = "mab_modal__close";
	element.addEventListener("click", (e : Event) : void => {
		e.preventDefault();
	
		hide_modal(modal);
	});
	modal.prepend(element);
	modal.addEventListener("click", (e : Event) : void => {
		e.preventDefault();

		if (e.target == modal)
			hide_modal(modal);
	});
};

export const	create_modal = (id : string) : HTMLElement => {
	const	modal : HTMLDivElement = document.createElement("div");

	modal.id = id;
	modal.className = "mab_modal";
	modal.setAttribute("aria-hidden", "true");
	init_modal__close(modal);
	document.body.append(modal);
	return (modal);
};

const			mab_modal = () : void => {
	const	modals : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_modal");

	modals && modals.forEach((modal : HTMLElement) : void => {
		init_modal__close(modal);
	});
	init_modal__open();
};


export default	mab_modal;
