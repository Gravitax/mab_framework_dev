const		create_list = (clone : HTMLElement) : HTMLUListElement => {
	const	list : HTMLUListElement = document.createElement("ul");
	const	elements : NodeListOf<HTMLElement> = clone.querySelectorAll(".splide__slide");
	let		tmp : HTMLElement;

	list.className = "splide__list";
	elements && elements.forEach((element : HTMLElement) : void => {
		tmp = document.createElement("li");
		tmp.className = "splide__slide";
		// tmp.setAttribute("style", element.getAttribute("style") || "");
		tmp.style.backgroundImage = element.style.backgroundImage;
		tmp.style.width = "100%";
		list.append(tmp);
	});
	return (list);
};

const		splide_fullscreen = (clone : HTMLElement) : HTMLElement => {
	const	slider : HTMLElement = document.createElement("div");
	const	track : HTMLElement = document.createElement("div");

	slider.className = "splide";
	slider.id = `mab${Math.floor(Math.random() * 42 + 101)}`;
	slider.style.width = "100vw";
	slider.style.height = "100vh";
	track.className = "splide__track";
	const	list : HTMLUListElement = create_list(clone);

	track.append(list);
	slider.append(track);
	return (slider);
};


export default splide_fullscreen;
