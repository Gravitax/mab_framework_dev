export const	show_modal = (modal : HTMLElement) : void => {
	window.setTimeout(() : void => { modal.style.display = "flex"; }, 500);
	modal.setAttribute("aria-hidden", "false");
};

const			custom_hide = (modal : HTMLElement) : void => {
	switch (modal.id) {
		case "mab_lightbox--modal":
			const	mab_lightbox : NodeListOf<HTMLElement> = modal.querySelectorAll(".mab_slider__element");

			mab_lightbox && mab_lightbox.forEach((tmp) => tmp.remove());
			break ;
		case "mab_slider__fullscreen--modal":
			let	content : HTMLElement | null = modal.querySelector(".mab_slider");

			content && content.remove();
			content = modal.querySelector(".splide");
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

export const	load_modal = async function (url : string) : Promise<HTMLElement | null> {
	const	target : string = "#" + url.split("#")[1];
	const	html : string = await fetch(url)
		.then((response : Response) : Promise<string> => response.text());
	const	fragment : DocumentFragment = document.createRange().createContextualFragment(html);
	let		modal : HTMLElement | null = null;
	
	if (fragment) {
		modal = fragment.querySelector(target);
		if (modal && modal.classList.contains("mab_modal")) {
			if (!document.querySelector(target))
				document.body.append(modal);
		}
	}
	return (modal);
};

export const	open_modal = async function (e : Event | null) : Promise<void> {
	if (e == null) return ;
	
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
		if (modal) {
			show_modal(modal);
			const	closes : NodeListOf<HTMLElement> = document.querySelectorAll(`${href} .mab_modal__close`);

			closes &&  closes.forEach((close : HTMLElement) : void => {
				close.addEventListener("click", () : void => { hide_modal(modal); });
			});
			modal.addEventListener("click", (e : Event) : void => {
				if (e.target == modal)
					hide_modal(modal);
			});
		}
	}
};

const			mab_modal = () : void => {
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


export default	mab_modal;
