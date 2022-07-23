import { scroll_to } from "./utils";


export const	mab_scroll = () : void => {
	const	mab_scrolls : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_scroll");

	mab_scrolls && mab_scrolls.forEach((scroll : HTMLElement) : void => {
		scroll.addEventListener("click", (e : Event) : void => {
			e.preventDefault();
	
			const	href : string = scroll.getAttribute("href") as string;
			const	offset : number = parseInt(scroll.getAttribute("offset") as string, 10);

			scroll_to(href, offset);
		});
	});
};


export default {
	mab_scroll
};
