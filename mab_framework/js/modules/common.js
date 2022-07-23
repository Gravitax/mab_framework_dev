
import { open_modal, hidde_modal } from "./modals.js";
import { mab } from "./mab_jquery.js";


// ANIMATION ------------------------------------------
	
const	callback = (entries, observer) => {
	let	animation;
		
	entries.forEach((entry) => {
		animation = entry.target;
		if (entry.isIntersecting) {
			animation.classList.add("animated");

			// to replay animation each time comment this line and uncomment else part
			observer.unobserve(animation);
		}
		else {
			// animation.classList.remove("animated");
		}
	});
};
const	options = {
	// between 0 and 1 => % of the item visible to get an intersection
	threshold: 0,
	// margin detection to get an intersection
	rootMargin: "0px 0px -150px 0px",
};

export const	mab_animations = () => {
	setTimeout(() => {
		const	observer = new IntersectionObserver(callback, options);
		const	animations = document.querySelectorAll(".mab_animation");
		
		// window.addEventListener("load", () => {
			animations.forEach((animation) => { observer.observe(animation); });
		// });
	}, 1000);
}

// END ANIMATION ------------------------------------------


export const	mab_collapse = () => {
	let	mab_collapses_btn = document.querySelectorAll(".collapse_button");

	mab_collapses_btn.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
	
			let	collapse	= btn.closest(".mab_collapse");
			let	content		= collapse.querySelector(".collapse_content");
			
			if (collapse) {
				collapse.classList.toggle("loaded");

				if (collapse.classList.contains("loaded")) {
					let	clone	= mab(`#${collapse.getAttribute("id")}`).createElement({ prepend : true, tag : "div",
						props : { "class" : "clone collapse_content", "style" : "position: absolute; opacity: 0; height: auto;" },
						innerHTML : content.innerHTML });

					content.style.height = clone.getBoundingClientRect().height + "px";
					clone.remove();
				}
				else
					content.style.height = 0;
			}
		});
	});
};

export const	mab_modals = () => {
	let	modals_open = document.querySelectorAll(".modal_open");

	modals_open.forEach((open) => { open.addEventListener("click", open_modal) });
	
	let	all_modals = document.querySelectorAll(".mab_modal");
	
	if (all_modals.length > 0 || modals_open.length > 0) {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape" || e.key === "Esc") {
				let	all_modals = document.querySelectorAll(".mab_modal");
	
				all_modals.forEach((modal) => {
					hidde_modal(modal);
				});
			}
		});
	}	
};

const	vw = (v) => {
	let	w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	return ((v * w) / 100);
};

export const	mab_scroll = () => {
	let	mab_scrolls = document.querySelectorAll(".mab_scroll");

	mab_scrolls.forEach((scroll) => {
		scroll.addEventListener("click", (e) => {
			e.preventDefault();
	
			let	href = scroll.getAttribute("href");
			let	tmp, top;
	
			if (href) {
				tmp = document.querySelector(href);
				if (tmp) {
					top = tmp.getBoundingClientRect().top + window.scrollY;
					// padding of css' lp
					top -= window.innerWidth > 1024 ? vw(6) : 60;
					window.scrollTo({
						top: top,
						behavior: "smooth",
					});
				}
			}
		});
	});
};

export const	mab_overlay = () => {
	let	mab_overlays = document.querySelectorAll(".mab_overlay");
	let	tmp;

	mab_overlays.forEach((overlay) => {
		overlay.addEventListener("click", () => {
			tmp = overlay.querySelector(".image_overlay");
			if (tmp)
				tmp.classList.toggle("active");
		});
	});
};


export default 	mab_modals;
