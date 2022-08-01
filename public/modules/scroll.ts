import { get_offset } from "./options";
import { scroll_to } from "./utils";


const			mab_scroll = () : void => {
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
