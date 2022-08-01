import { get_breakpoint, get_offset } from "./options";


const			get_element_top = (element : HTMLElement) : number => {
	return (element.getBoundingClientRect().top + document.documentElement.scrollTop);
};

const			set_top = (element : HTMLElement, stop_element : HTMLElement, offset : number) : void => {
	const	top : number = stop_element.getBoundingClientRect().top;
	const	height : number = element.getBoundingClientRect().height;
	const	diff : number = top - height;

	if (diff - offset < 0)
		element.setAttribute("style", `position: fixed; top: ${diff}px;`)
	else
		element.style.top = `${0 + offset}px`;
};

const			set_sticky = (element : HTMLElement, stop_selector : string | null, offset : number) : void => {
	const	element_top : number = get_element_top(element) - offset;
	let		scheduledAnimationFrame = false;
	let		pos_cursor : number = 0;
	let		stop_element : HTMLElement | null = null;

	if (stop_selector)
		stop_element = document.querySelector(stop_selector);

	const	mab_sticky_scroll = () : void => {
		pos_cursor = window.pageYOffset;
		if (element_top - pos_cursor < 0) {
			element.classList.add("active");
			element.setAttribute("style", `position: fixed; top: ${0 + offset}px;`)
		}
		else {
			element.classList.remove("active");
			element.setAttribute("style", "")
		}
		if (stop_element && element.classList.contains("active"))
			set_top(element, stop_element, offset);
		scheduledAnimationFrame = false;
	};

	const	on_scroll = () : void => {
		if (scheduledAnimationFrame)
			return ;
		scheduledAnimationFrame = true;
		requestAnimationFrame(mab_sticky_scroll);
	};

	document.addEventListener("scroll", on_scroll, { passive : true });
};

const			mab_sticky = () : void => {
	const	elements : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_sticky");

	elements && elements.forEach((element : HTMLElement) : void => {
		const	str_stop : string | null = element.getAttribute("data-stop");
		const	str_breakpoint : string | null = element.getAttribute("data-breakpoint");
		const	offset : number = get_offset(element.getAttribute("data-offset"));

		console.log(offset);
		
		if (str_breakpoint) {
			const	breakpoint : number = get_breakpoint(str_breakpoint);

			if (breakpoint) {
				if (str_breakpoint.indexOf('<') != -1 && window.innerWidth < breakpoint) 
					set_sticky(element, str_stop, offset);
				else if (str_breakpoint.indexOf('<') == -1 && window.innerWidth > breakpoint)
					set_sticky(element, str_stop, offset);
			}
			return ;
		}
		set_sticky(element, str_stop, offset);
	});
};


export default mab_sticky;
