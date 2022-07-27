import { scroll_to } from "./utils";


const		vw = (v : number) : number => {
	const	w : number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	return ((v * w) / 100);
};

const		get_offset = (str : string | null) : number => {
	let		offset : number = 0;
	let		breakpoint : number = 1024;
	let		only_mobile : boolean = false;
	let		split : string[];

	if (str && str.indexOf(':') > -1) {
		split = str.split(':');
		breakpoint = parseInt(split[1], 10);
		only_mobile = true;
		str = split[0];
	}
	if (str && str.indexOf('/') > -1) {
		split = str.split('/');
		if (breakpoint && window.innerWidth > breakpoint) // desktop
			offset = split[0].indexOf("vw") > -1 ? vw(parseInt(split[0], 10)) : parseInt(split[0], 10); // gauche
		else // mobile
			offset = split[1].indexOf("vw") > -1 ? vw(parseInt(split[1], 10)) : parseInt(split[1], 10); // droite
	} else if (str) {
		if (only_mobile) {
			if (window.innerWidth < breakpoint) // mobile
				offset = str.indexOf("vw") > -1 ? vw(parseInt(str, 10)) : parseInt(str, 10);
		} else
			offset = str.indexOf("vw") > -1 ? vw(parseInt(str, 10)) : parseInt(str, 10);
	}
	return (offset > 0 ? offset * -1 : offset);
}

const		mab_scroll = () : void => {
	const	mab_scrolls : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_scroll");

	mab_scrolls && mab_scrolls.forEach((scroll : HTMLElement) : void => {
		scroll.addEventListener("click", (e : Event) : void => {
			e.preventDefault();
	
			const	href : string = scroll.getAttribute("data-href") as string;
			const	offset : string | null = scroll.getAttribute("data-offset");
			
			scroll_to(href, get_offset(offset));
		});
	});
};


export default mab_scroll;
