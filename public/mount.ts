import { mab_animation } from "./modules/animation";
import { mab_collapse } from "./modules/collapse";
import { img_compare } from "./modules/img_compare";
import { mab_lightbox } from "./modules/lightbox";
import { mab_modal } from "./modules/modal";
import { mab_scroll } from "./modules/scroll";
import { mab_slider } from "./modules/slider";


const	mount_framework = () : void => {
	mab_animation();
	mab_collapse();
	img_compare();
	mab_modal();
	mab_lightbox();
	mab_scroll();
	mab_slider();
};


export default mount_framework;
