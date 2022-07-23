import { mab_animation } from "./modules/animation";
import { mab_collapse } from "./modules/collapse";
import { mab_modal } from "./modules/modal";
import { mab_scroll } from "./modules/scroll";


const	mount_framework = () : void => {

	mab_animation();
	mab_collapse();
	mab_modal();
	mab_scroll();

};


export default mount_framework;
