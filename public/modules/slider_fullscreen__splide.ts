import Splide from "@splidejs/splide";


const		create_list = (clone : HTMLElement) : HTMLUListElement => {
	const	list : HTMLUListElement = document.createElement("ul");
	const	elements : NodeListOf<HTMLElement> = clone.querySelectorAll(".splide__slide");
	let		tmp : HTMLElement;

	list.className = "splide__list";
	elements && elements.forEach((element : HTMLElement) : void => {
		if (element.classList.contains("splide__slide--clone"))
			return ;
		tmp = document.createElement("li");
		tmp.className = "splide__slide";
		tmp.style.background = element.style.background;
		tmp.style.backgroundImage = element.style.backgroundImage;
		tmp.style.backgroundSize = element.style.backgroundSize;
		tmp.style.backgroundPosition = element.style.backgroundPosition
		list.append(tmp);
	});
	return (list);
};

const		slider_fullscreen__splide = (modal : HTMLElement, clone : HTMLElement) : void => {
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
	modal.append(slider);
	window.splide_tmp[`#${slider.id}`] = new Splide(`#${slider.id}`, { type : "loop" });
	window.splide_tmp[`#${slider.id}`].mount();
};


export default slider_fullscreen__splide;
