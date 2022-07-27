import { scroll_to, vw } from "./utils";


const		parse_offset = (str : string | null, breakpoint : number, only_mobile : boolean) : number => {
	let		offset : number = 0;

	if (str && str.indexOf('/') > -1) {
		const	split : string[] = str.split('/');

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
	return (offset);
}

const		get_offset = (offset : string | null) : number => {
	let		breakpoint : number = 1024;
	let		only_mobile : boolean = false;

	if (offset && offset.indexOf(':') > -1) {
		const	split : string[] = offset.split(':');

		breakpoint = parseInt(split[1], 10);
		only_mobile = true;
		offset = split[0];
	}
	return (parse_offset(offset, breakpoint, only_mobile));
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
