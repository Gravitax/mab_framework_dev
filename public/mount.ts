const		mount_framework = () : void => {
	if (document.querySelector(".mab_animation"))
		import("./modules/animation").then((Module) : void => Module.default());
	if (document.querySelector(".mab_collapse"))
		import("./modules/collapse").then((Module) : void => Module.default());
	if (document.querySelector(".mab_img_cmp"))
		import("./modules/img_compare").then((Module) : void => Module.default());
	if (document.querySelector(".mab_modal__open"))
		import("./modules/modal").then((Module) : void => Module.default());
	if (document.querySelector(".mab_lightbox"))
		import("./modules/lightbox").then((Module) : void => Module.default());
	if (document.querySelector(".mab_scroll"))
		import("./modules/scroll").then((Module) : void => Module.default());
	if (document.querySelector(".mab_slider"))
		import("./modules/slider").then((Module) : void => Module.default());
	if (document.querySelector(".mab_slider--fullscreen"))
		import("./modules/slider_fullscreen").then((Module) : void => Module.default());
	if (document.querySelector(".splide")) {
		for (const key of Object.keys(window.splide))
			window.splide[key].mount();
	}
};


export default mount_framework;
