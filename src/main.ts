import mab from "../public/modules/mab_jquery";
import Splide from "../public/modules/splide.min.js";

import "./style.css";


document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
`;

mab(document).ready(() => {
  
	mab(".foo").style({
		"height" : "5vh"
	});

	window.splide.push(new Splide("#foo"));
	
});
