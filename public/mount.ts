import { mab_animation } from "./modules/animation";
import { mab_collapse } from "./modules/collapse";
import { mab_modal } from "./modules/modal";
import { mab_scroll } from "./modules/scroll";
import { mab_slider } from "./modules/slider";


const	mount_framework = () : void => {

	mab_animation();
	mab_collapse();
	mab_modal();
	mab_scroll();
	mab_slider();
};


export default mount_framework;
