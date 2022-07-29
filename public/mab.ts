import ElementCollection from "./ElementCollection";


declare			global {
	interface	Window {
		splide		: { [key : string | number] : any };
		splide_tmp	: { [key : string | number] : any };
	}
};

const			mab = (param : Document | HTMLElement | string) : ElementCollection => {
	if (typeof(param) === "string")
		return (new ElementCollection(...document.querySelectorAll(param) as any));
	return (new ElementCollection(param as any));
};

const			load_splide = (head : ElementCollection) : void => {
	if (document.querySelector(".splide")) {
		window.splide = {};
		window.splide_tmp = {};
		head.create_element({ append : true, tag : "link", props : {
			"type"	: "text/css",
			"rel"	: "stylesheet",
			"href"	: `./public/css/splide.css`
		} });
	}
};

mab.init = () : void => {
	const	head : ElementCollection = mab("head");

	head.create_element({ append : true, tag : "link", props : {
		"type"	: "text/css",
		"rel"	: "stylesheet",
		"href"	: `./public/css/style.css`
	} });
	load_splide(head);
	mab(document).ready(() => {
		import("./mount").then((Module) => {
			Module.default();
		});
	});
};


export default	mab;
