import mab, { ElementCollection } from "../public/modules/mab_jquery";
import mount_framework from "../public/modules/mount";


declare		global {
	interface	Window {
		splide		: any[];
		splide_tmp	: any[];
	}
};

const		files_css : string[] = [
	"normalize",
	"style"
];

const		load_splide = (head : ElementCollection) : void => {
	if (document.querySelector(".splide")) {
		window.splide = [];
		window.splide_tmp = [];
		head.create_element({ append : true, tag : "link", props : {
			"type"	: "text/css",
			"rel"	: "stylesheet",
			"href"	: `./public/css/splide.min.css`
		} });

		import("@splidejs/splide").then((Module) : void => {
			const	id : string = "#foo";

			window.splide[id as any] = new Module.Splide(id);
		});
	}
};

const		init_framework = () : void => {
	const	head : ElementCollection = mab("head");

	files_css.forEach((file : string) : void => {
		head.create_element({ append : true, tag : "link", props : {
			"type"	: "text/css",
			"rel"	: "stylesheet",
			"href"	: `./public/css/${file}.css`
		} });
	});
	
	mab(document).ready(() => {

		load_splide(head);
		
		setTimeout(() => {
			mount_framework();
		}, 500);

	});
};

init_framework();
