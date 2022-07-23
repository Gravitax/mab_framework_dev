import mab from "./mab_jquery";


export const	mab_collapse = () : void => {
	const	buttons : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_collapse__button");

	buttons.forEach((button : HTMLElement) : void => {
		button.addEventListener("click", (e : Event) : void => {
			e.preventDefault();
	
			const	collapse : HTMLElement | null = button.closest(".mab_collapse");
			const	content : HTMLElement | null = collapse ? collapse.querySelector(".mab_collapse__content") : null;
			
			if (collapse && content) {
				collapse.classList.toggle("is_open");
				if (collapse.classList.contains("is_open")) {
					mab(collapse)
						.createElement({ prepend : true, tag : "div", innerHTML : content.innerHTML,
							props : {
								"class" : "clone mab_collapse__content",
								"style" : "position: absolute; opacity: 0; height: auto;"
							}});
					
					const	clone : HTMLElement | null = collapse.querySelector(".clone");

					if (clone) {
						content.style.height = clone.getBoundingClientRect().height + "px";
						clone.remove();
					}
				}
				else if (content)
					content.style.height = "0";
			}
		});
	});
};


export default {
	mab_collapse
};
