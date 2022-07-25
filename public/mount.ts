import mab_animation from "./modules/animation";
import mab_collapse from "./modules/collapse";
import mab_img_compare from "./modules/img_compare";
import mab_lightbox from "./modules/lightbox";
import mab_modal from "./modules/modal";
import mab_scroll from "./modules/scroll";
import mab_slider from "./modules/slider";
import mab_slider_fullscreen from "./modules/slider_fullscreen";


const		mount_splide = () : void => {
	for (let i = 0; i < window.splide.length; i++) {
		if (typeof(window.splide[i]) == "object")
			window.splide[i]?.mount();
	}
};

const		mount_framework = () : void => {
	mab_animation();
	mab_collapse();
	mab_img_compare();
	mab_modal();
	mab_lightbox();
	mab_scroll();
	mab_slider();
	mab_slider_fullscreen();

	mount_splide();
};


export default mount_framework;
