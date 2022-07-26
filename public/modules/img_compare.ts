const		format_elements = (container : HTMLElement, width : number) : void => {
	const	elements : NodeListOf<HTMLElement> = container.querySelectorAll(".mab_img_cmp__img");

	elements && elements.forEach((element : HTMLElement, i : number) : void => {
		const	src : string | null = element.getAttribute("data-src");

		if (i === 0)
			element.classList.add("mab_img_cmp__overlay");
		if (src && width)
			element.setAttribute("style", `background: url("${src}") no-repeat left/${width.toString()}px;`);
	});
};

const		compare = (container : HTMLElement) : void => {
	let		__click : boolean = false;
	const	__width : number = container.offsetWidth;

	format_elements(container, __width);

	const	img : HTMLElement | null = container.querySelector(".mab_img_cmp__overlay");
	const	slider : HTMLDivElement = document.createElement("div");

	if (!img || !img.parentElement)
		return ;
	img.style.width = (__width / 2) + "px";
	slider.setAttribute("class", "mab_img_cmp__slider");
	img.parentElement.insertBefore(slider, img);
	/*position the slider in the middle:*/
	slider.style.left = (__width / 2) - (slider.offsetWidth / 2) + "px";

	const	slide_ready = () : void => {
		__click = true;
		window.addEventListener("mousemove", slide_move);
		window.addEventListener("touchmove", slide_move);
	};
	
	const	slide_finish = () :void => {
		__click = false;
	};

	const	get_cursor_pos = (e : any) : number => {
		const	a : DOMRect = img.getBoundingClientRect();
		let		x : number = 0;

		e = e.changedTouches ? e.changedTouches[0] : e;
		/*calculate the cursor's x coordinate, relative to the image:*/
		x = e.pageX - a.left;
		/*consider any page scrolling:*/
		x = x - window.pageXOffset;
		return (x);
	};

	const	slide = (x : number) : void => {
		/*resize the image:*/
		img.style.width = x + "px";
		/*position the slider:*/
		slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) - 1 + "px";
	};
	
	const	slide_move = (e : MouseEvent | TouchEvent) : void => {		
		if (__click === false)
			return ;
		let	pos : number = get_cursor_pos(e);

		/*prevent the slider from being positioned outside the image:*/
		if (pos < 1) pos = 0;
		if (pos > __width) pos = __width;
		/*execute a function that will resize the overlay image according to the cursor:*/
		slide(pos);
	};

	/*execute a function when the mouse button is pressed:*/
	slider.addEventListener("mousedown", slide_ready, { passive : true });
	/*and another function when the mouse button is released:*/
	window.addEventListener("mouseup", slide_finish, { passive : true });
	/*or touched (for touch screens:*/
	slider.addEventListener("touchstart", slide_ready, { passive : true });
	/*and released (for touch screens:*/
	window.addEventListener("touchend", slide_finish, { passive : true });
};

const		mab_img_compare = () : void => {
	const	elements : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_img_cmp");

	elements && elements.forEach((element : HTMLElement) : void => {
		compare(element);
	});
};


export default mab_img_compare;
