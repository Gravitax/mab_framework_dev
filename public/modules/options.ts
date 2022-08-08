import { __is_mobile } from "../mab";
import { vw } from "./utils";


export const	get_breakpoint = (str : string | null) : number => {
	let		breakpoint : number = -1;

	if (str) {
		if (str.indexOf('>') != -1 || str.indexOf('<') != -1) {
			const	split : string[] = str.split(str.indexOf('>') != -1 ? '>' : '<');
	
			breakpoint = parseInt(split[1], 10);
		} else
			breakpoint = parseInt(str, 10);
	}
	return (breakpoint);
};

const			parse_offset = (str : string | null, breakpoint : number, only_mobile : boolean) : number => {
	let		offset : number = 0;

	if (str && str.indexOf('/') > -1) {
		const	split : string[] = str.split('/');

		if (breakpoint && window.innerWidth > breakpoint) // desktop
			offset = split[0].indexOf("vw") > -1 ? vw(parseFloat(split[0])) : parseFloat(split[0]); // gauche
		else // mobile
			offset = split[1].indexOf("vw") > -1 ? vw(parseFloat(split[1])) : parseFloat(split[1]); // droite
	} else if (str) {
		if (only_mobile) {
			if (window.innerWidth < breakpoint) // mobile
				offset = str.indexOf("vw") > -1 ? vw(parseFloat(str)) : parseFloat(str);
		} else
			offset = str.indexOf("vw") > -1 ? vw(parseFloat(str)) : parseFloat(str);
	}
	return (offset);
}

export const	get_offset = (str : string | null) : number => {
	let		breakpoint : number = __is_mobile[0];
	let		only_mobile : boolean = false;

	if (str && str.indexOf(':') > -1) {
		const	split : string[] = str.split(':');

		breakpoint = parseInt(split[1], 10);
		only_mobile = true;
		str = split[0];
	}
	return (parse_offset(str, breakpoint, only_mobile));
}


export default {};
