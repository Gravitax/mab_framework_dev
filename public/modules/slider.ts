import mab, { ElementCollection } from "./mab_jquery";
// import { show_modal, hidde_modal } from "./modal";


// const	check_active = (modal) => {
// 	let active = false;
// 	let	tmp;

// 	modal.querySelectorAll(".slider_inner > *").forEach((elt) => {
// 		if (elt.classList.contains("active"))
// 			active = true;
// 	});
// 	//sinon on attribue la classe a un elt par defaut
// 	if (active === false) {
// 		tmp = modal.querySelector(".slider_inner > *");
// 		if (tmp)
// 			tmp.classList.add("active");
// 	}
// };

// const	mab_lightbox = () => {
// 	let	mab_lightbox = document.querySelectorAll(".mab_lightbox");

// 	if (mab_lightbox.length > 0) {
// 		let	mab_lightbox_modal = document.createElement("div");
// 		let	slider_close = document.createElement("img");

// 		// on créé la modal lightbox
// 		mab_lightbox_modal.className = "mab_modal";
// 		mab_lightbox_modal.id = "mab_lightbox_modal";
// 		mab_lightbox_modal.setAttribute("aria-hidden", "true");
// 		slider_close.className = "slider_close";
// 		slider_close.src = "https://maboye.fr/public/mab_framework/css/images/close.png";
// 		mab_lightbox_modal.append(slider_close);

// 		// on créé le carousel
// 		let	slider = document.createElement("div");
// 		slider.id = "mab_slider_lightbox";
// 		slider.className = "mab_slider modal_wrapper";
// 		let	tmp;

// 		if (mab_lightbox.length > 1) {
// 			tmp = document.createElement("img");
// 			tmp.src = "https://maboye.fr/public/mab_framework/css/images/next.png";
// 			tmp.className = "slider_next";
// 			slider.append(tmp);
// 			tmp = document.createElement("img");
// 			tmp.src = "https://maboye.fr/public/mab_framework/css/images/prev.png";
// 			tmp.className = "slider_prev";
// 			slider.append(tmp);
// 		}
// 		tmp = document.createElement("div");
// 		tmp.className = "slider_inner";
// 		slider.append(tmp);

// 		mab_lightbox_modal.append(slider);

// 		// on append la modal au body
// 		document.body.append(mab_lightbox_modal);
// 		slider_close.addEventListener("click", (e) => {
// 			e.preventDefault();

// 			hidde_modal(mab_lightbox_modal);
// 		});
// 	}

// 	mab_lightbox.forEach((lightbox) => {
// 		let	lb_id	= lightbox.getAttribute("lb-id");
// 		let	all_id	= document.querySelectorAll(`[lb-id="${lb_id}"]`);

// 		// on a isolé tout les lb-id correspondant à la lightbox en cours
// 		// il faut les append dans le slider_inner de mab_slider_lightbox

// 		lightbox.addEventListener("click", (e) => {
// 			e.preventDefault();

// 			let	modal = document.getElementById("mab_lightbox_modal");
// 			let	slider_inner = modal.querySelector(".slider_inner");

// 			if (!modal || !slider_inner) return ;

// 			all_id.forEach((id) => {
// 				let	tmp = id.cloneNode(true);

// 				// si pas de src on skip => à cause de l'icone full screen ...
// 				if (!id.getAttribute("src"))
// 					return ;

// 				// il faut que l'image cliquée soit la premiere à être affichée
// 				if (id === lightbox)
// 					tmp.classList.add("active");
// 				slider_inner.append(tmp);
// 			});

// 			// on verifie si un elt a bien la classe active
// 			check_active(modal);

// 			slider_inner.addEventListener("click", (e) => {
// 				e.preventDefault();

// 				if (e.target == slider_inner)
// 					hidde_modal(modal);
// 			});
// 			show_modal(modal);
// 		});
// 	});
// };

const	mab_slider = () : void => {

	// il faut remplacer les href des .mab_slider__element par
	// {
	// 	background: url(href) no-repeat;
	// 	background-size: cover;
	// 	background-position: center;
	// }

	const	elements : HTMLElement[] = mab(".mab_slider__element");

	if (elements.length) {
		elements.forEach((element : HTMLElement) => {
			let	href : string | null = element.getAttribute("href");

			if (href) {
				element.style({
					background: "url(href) no-repeat",
					background-size: "cover",
					background-position: "center"
				})
			}
		});
	}

	mab(".mab_slider__next").on("click", (e: Event) : void => {
		const	target : HTMLElement = e.target as HTMLElement;
		const	slider : HTMLElement | null = target.closest(".mab_slider");
		const	id : string | null = slider ? slider.getAttribute("id") : null;

		if (id) {
			const	currentImg : ElementCollection = mab(`#${id} .active`);
			const	nextImg : ElementCollection = currentImg.next() as ElementCollection;
			
			currentImg.removeClass("active");
			if (nextImg.length)
				nextImg.addClass("active");
			else
				mab(`#${id} .mab_slider__inner > *:first-child`).addClass("active");
		}
	}, { passive : true });
	
	mab(".mab_slider__prev").on("click", (e : Event) : void => {
		const	target : HTMLElement = e.target as HTMLElement;
		const	slider : HTMLElement | null = target.closest(".mab_slider");
		const	id : string | null = slider ? slider.getAttribute("id") : null;

		if (id) {
			const	currentImg : ElementCollection = mab(`#${id} .active`);
			const	prevImg : ElementCollection = currentImg.prev() as ElementCollection;
			
			currentImg.removeClass("active");
			if (prevImg.length)
				prevImg.addClass("active");
			else
				mab(`#${id} .mab_slider__inner > *:last-child`).addClass("active");
		}
	}, { passive : true });
}


export {
	// mab_lightbox,
	mab_slider
}
