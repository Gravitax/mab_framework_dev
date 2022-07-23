export const	scroll_to = (href : string, offset ?: number) : void => {
	let	tmp : HTMLElement | null;
	let	top : number;

	if (href) {
		tmp = document.querySelector(href);
		if (tmp) {
			top = tmp.getBoundingClientRect().top + window.scrollY;
			if (offset)
				top += offset;
			window.scrollTo({ top, behavior: "smooth" });
		}
	}
};


export default {
	scroll_to
};
