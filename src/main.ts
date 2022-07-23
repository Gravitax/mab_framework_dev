import init_framework from "./init";
import mab from "../public/modules/mab_jquery";

import "./style.css";


document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
	<div id="foo"></div>
	<div class="mab_img_comp">
		<div class="mab_img_comp__img mab_img_comp__overlay" style="background-image: url('public/images/next.png');"></div>
		<div class="mab_img_comp__img" style="background-image: url('public/images/prev.png');"></div>
	</div>
`;

init_framework();

mab(document).ready(() => {
  
	mab("#foo").style({
		"height" : "5vh"
	});

});
