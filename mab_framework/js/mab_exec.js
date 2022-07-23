import * as Common from "./modules/common.js";
import * as Slider from "./modules/slider.js";


const   mab_app = () => {

    Common.mab_animations();
    Common.mab_collapse();
    Common.mab_modals();
    Common.mab_overlay();
    Common.mab_scroll();

    // Order is important because slider's events are put in the DOM after lightbox create new Element(s)
    Slider.mab_lightbox();
    Slider.mab_slider();

};

mab_app();
