export const	show_modal = (modal : HTMLElement) : void => {
	window.setTimeout(() : void => { modal.style.display = "flex"; }, 500);
	modal.setAttribute("aria-hidden", "false");
};

// export const	hidde_modal = (modal : HTMLElement) : void => {
// 	let	mab_lightbox = modal.querySelectorAll(".slider_inner > *");

// 	window.setTimeout(() => {
// 		modal.style.display = "none";
// 		if (mab_lightbox && modal.id == "mab_lightbox_modal")
// 			mab_lightbox.forEach((tmp) => tmp.remove());
// 	}, 500);
// 	modal.setAttribute("aria-hidden", "true");
// };

export const	hidde_modal = (modal : HTMLElement) : void => {
	window.setTimeout(() : void => { modal.style.display = "none"; }, 500);
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
	let		href : string | null = target && target.getAttribute("href");
	let		modal : HTMLElement;

	if (href) {
		if (href.startsWith("#"))
			modal = document.querySelector(href) as HTMLElement;
		else {
			modal = await load_modal(href) as HTMLElement;
			href = "#" + href.split("#")[1];
			target.setAttribute("href", href);
		}
		if (modal) {
			show_modal(modal);
			const	closes : NodeListOf<HTMLElement> = document.querySelectorAll(`${href} .mab_modal__close`);

			closes &&  closes.forEach((close : HTMLElement) : void => {
				close.addEventListener("click", () : void => { hidde_modal(modal); });
			});
			modal.addEventListener("click", (e : Event) : void => {
				if (e.target == modal)
					hidde_modal(modal);
			});
		}
	}
};

export const	mab_modal = () : void => {
	const	modals_open : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_modal__open");

	if (modals_open.length > 0) {
		modals_open.forEach((open : HTMLElement) : void => {
			open.addEventListener("click", open_modal)
		});	
		window.addEventListener("keydown", (e : KeyboardEvent) : void => {
			if (e.key === "Escape" || e.key === "Esc") {
				const	modals : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_modal");
		
				modals && modals.forEach((modal : HTMLElement) : void => {
					hidde_modal(modal);
				});
			}
		});	
	} 
};


export default	{
	mab_modal
};
