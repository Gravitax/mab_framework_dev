const		mount_framework = () : void => {
	if (document.querySelector(".mab_animation"))
		import("./animation").then((Module) : void => Module.default());
	if (document.querySelector(".mab_collapse"))
		import("./collapse").then((Module) : void => Module.default());
	if (document.querySelector(".mab_img_cmp"))
		import("./img_compare").then((Module) : void => Module.default());
	if (document.querySelector(".mab_modal__open"))
		import("./modal").then((Module) : void => Module.default());
	if (document.querySelector(".mab_lightbox"))
		import("./lightbox").then((Module) : void => Module.default());
	if (document.querySelector(".mab_scroll"))
		import("./scroll").then((Module) : void => Module.default());
	if (document.querySelector(".mab_slider"))
		import("./slider").then((Module) : void => Module.default());
	if (document.querySelector(".mab_slider--fullscreen"))
		import("./slider_fullscreen").then((Module) : void => Module.default());
	if (document.querySelector(".splide")) {
		for (const key of Object.keys(window.splide))
			window.splide[key as any].mount();
	}
};


export default mount_framework;
