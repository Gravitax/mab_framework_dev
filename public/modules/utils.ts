export const	create_element = ({ ...data } : {
	tag			: string,
	props		?: { [key : string] : string },
	innerText	?: string,
	innerHTML	?: string

}) : HTMLElement => {
	const	element : HTMLElement = document.createElement(data.tag);

	if (data.props) {
		for (const [key, value] of Object.entries(data.props))
			element.setAttribute(key, value);
	}
	if (data.innerText) element.innerText = data.innerText;
	if (data.innerHTML) element.innerHTML = data.innerHTML;
	return (element);
}

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

export const	vw = (v : number) : number => {
	const	w : number = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	return ((v * w) / 100);
};


export default {};
