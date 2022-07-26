const		set_height = (collapse : HTMLElement, content : HTMLElement) : void => {
	const	clone : HTMLDivElement = document.createElement("div");

	collapse.classList.toggle("is_open");
	if (collapse.classList.contains("is_open")) {
		clone.innerHTML = content.innerHTML;
		clone.classList.add("clone");
		clone.setAttribute("style", "position: absolute; opacity: 0; height: auto;");
		collapse.prepend(clone);
		content.style.height = clone.getBoundingClientRect().height + "px";
		clone.remove();
	}
};

const		mab_collapse = () : void => {
	const	buttons : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_collapse__button");

	buttons && buttons.forEach((button : HTMLElement) : void => {
		button.addEventListener("click", (e : Event) : void => {
			e.preventDefault();
	
			const	collapse : HTMLElement | null = button.closest(".mab_collapse");

			if (collapse) {
				const	content : HTMLElement | null = collapse.querySelector(".mab_collapse__content");
				
				if (content && collapse.classList.contains("is_open")) {
					collapse.classList.remove("is_open");
					content.style.height = "0";
				}
				else if (content)
					set_height(collapse, content);
			}
		});
	});
};


export default mab_collapse;
