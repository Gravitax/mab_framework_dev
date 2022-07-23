import init_framework from "./init";
import mab from "../public/modules/mab_jquery";

import "./style.css";


document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
	<div id="foo"></div>
	<div class="mab_slider" id="mab_slider">
		<img class="mab_slider__next" src="public/images/next.png">
		<img class="mab_slider__prev" src="public/images/prev.png">
		<div class="mab_slider__inner">
			<span class="mab_slider__element active" style="background: url('public/images/next.png') no-repeat; background-size: contain; background-position: center;"></span>
			<span class="mab_slider__element" href="public/images/prev.png"></span>
		</div>
	</div>
`;

init_framework();

mab(document).ready(() => {
  
	mab("#foo").style({
		"height" : "5vh"
	});

});
