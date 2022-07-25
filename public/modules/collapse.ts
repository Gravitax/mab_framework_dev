const		set_height = (collapse : HTMLElement, content : HTMLElement) : void => {
	let	clone : HTMLElement | null;

	collapse.classList.toggle("is_open");
	if (collapse.classList.contains("is_open")) {
		clone = document.createElement("div");
		clone.innerHTML = content.innerHTML;
		clone.classList.add("clone");
		clone.setAttribute("style", "position: absolute; opacity: 0; height: auto;");
		collapse.prepend(clone);
		if (clone) {
			content.style.height = clone.getBoundingClientRect().height + "px";
			clone.remove();
		}
	}
};

const		mab_collapse = () : void => {
	const	buttons : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_collapse__button");

	buttons.forEach((button : HTMLElement) : void => {
		button.addEventListener("click", (e : Event) : void => {
			e.preventDefault();
	
			const	collapse : HTMLElement | null = button.closest(".mab_collapse");
			const	content : HTMLElement | null = collapse ? collapse.querySelector(".mab_collapse__content") : null;
			
			if (collapse && collapse.classList.contains("is_open") && content) {
				collapse.classList.remove("is_open");
				content.style.height = "0";
			}
			else if (collapse && content) {
				set_height(collapse, content);
			}
		});
	});
};


export default mab_collapse;
