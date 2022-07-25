import mab from "../public/modules/mab_jquery";
import mount_framework from "../public/mount";


const		files_css = [
	"normalize",
	"style",
	"splide.min"
];

const		files_js = [
	"splide.min"
];

declare		global {
	interface	Window {
		splide : any[];
	}
}

const		init_framework = () : void => {
	const	horodatage : number = new Date().getTime();

	window.splide = [];

	files_css.forEach((file : string) : void => {
		mab("head").create_element({ append : true, tag : "link",
			props : { "type" : "text/css", "rel" : "stylesheet", "href" : `./public/css/${file}.css?h=${horodatage}` } });
	});

	files_js.forEach((file : string) : void => {
		mab("head").create_element({ append : true, tag : "script",
			props : { "type" : "module", "defer" : "true", "src" : `./public/modules/${file}.js?h=${horodatage}` } });
	});
	
	mab(document).ready(() => {
		
		setTimeout(() => {
			mount_framework();
		}, 500);

	});
};

init_framework();
