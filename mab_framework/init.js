let	init_css = [
	// "reset",
	"normalize",
	// ===== common framework
	// "fonts/fonts",
	"style",
	// ===== custom addon
	// "img_compare",
	// "slider",
	// ===== splide
	// "splide.min",
	// "splide",
];

let	init_js = [
	// ===== common framework
	"mab_exec",
	// ===== custom addon
	// "img_compare",
	// ===== splide
	// "splide",
];

import { mab } from "./js/modules/mab_jquery.js";


const			app = () => {
	let	horodatage = new Date().getTime();

	init_css.forEach((link) => {
		mab("head").createElement({ append : true, tag : "link",
			props : { "type" : "text/css", "rel" : "stylesheet", "href" : `./public/mab_framework/css/${link}.css?h=${horodatage}` } });
	});
	
	init_js.forEach((script) => {
		mab("body").createElement({ append : true, tag : "script",
			props : { "type" : "module", "src" : `./public/mab_framework/js/${script}.js?h=${horodatage}`, "defer" : true } });
	});

	// const			append_includes = (includes = []) => {
	// 	includes.forEach((include) => {
	// 		let path = include.getAttribute("src");
		
	// 		fetch(path)
	// 			.then((file) => {
	// 				if (file.ok === true) {
	// 					file.text()
	// 						.then((content) => {
	// 							let		el = document.createElement("div");
	// 							el.innerHTML = content;
	// 							const	s = [...el.querySelectorAll(".includeHTML")];
	// 							append_includes(s);
	// 							include.insertAdjacentElement("afterend", el.querySelector("*"));
	// 							include.remove();
	// 						});
	// 				} else {
	// 					throw (new Error(file.status));
	// 				}
	// 			})
	// 			.catch((e) => console.log(e));
	// 	});
	// };

	// append_includes([...document.querySelectorAll(".includeHTML")]);
};

mab("document").ready(() => {

	app();

});
