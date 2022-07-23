export function	show_modal(modal) {
	window.setTimeout(() => { modal.style.display = "flex"; }, 500);
	modal.setAttribute("aria-hidden", "false");
	// disable_scroll();
}

export function	hidde_modal(modal) {
	let	mab_lightbox = modal.querySelectorAll(".slider_inner > *");

	window.setTimeout(() => {
		modal.style.display = "none";
		if (mab_lightbox && modal.id == "mab_lightbox_modal")
			mab_lightbox.forEach((tmp) => tmp.remove());
	}, 500);
	modal.setAttribute("aria-hidden", "true");
	// enable_scroll();
}

export const	load_modal = async function (url) {
	let		target = "#" + url.split("#")[1];
	let		html = await fetch(url).then(response => response.text());
	let		fragment = document.createRange().createContextualFragment(html);
	let		modal;
	
	if (fragment) {
		modal = fragment.querySelector(target);
		if (modal && modal.classList.contains("mab_modal")) {
			if (!document.querySelector(target))
				document.body.append(modal);
		}
	}
	return (modal);
}

export const	open_modal = async function (e) {
	e.preventDefault();

	let	href = e.target.getAttribute("href");
	let	modal, closes;

	if (href) {
		if (href.startsWith("#"))
			modal = document.querySelector(href);
		else {
			modal = await load_modal(href);
			href = "#" + href.split("#")[1];
			e.target.setAttribute("href", href);
		}
		if (modal) {
			show_modal(modal);
			closes = document.querySelectorAll(href + " .modal_close");
			if (closes)
				closes.forEach((close) => { close.addEventListener("click", () => { hidde_modal(modal); }); });
			modal.addEventListener("click", (e) => {
				// e.preventDefault();

				if (e.target == modal)
					hidde_modal(modal);
			});
		}
	}
}


export default	open_modal;
