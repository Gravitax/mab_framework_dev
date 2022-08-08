import { __is_mobile } from "../mab";


const		apply_css = (list : HTMLElement, input : HTMLInputElement) : void => {
	const	rect : DOMRect = input.getBoundingClientRect();
	const	margin_bottom : number = parseFloat(window.getComputedStyle(input).marginBottom);
	const	top : number = rect.top + rect.height + document.documentElement.scrollTop - margin_bottom;

	list.setAttribute("style", `top: ${top}px; left: ${rect.left}px; width: ${rect.width}px`);
};

const		on_select = (list : HTMLElement, input : HTMLInputElement, element : any) : void => {
	const	ville : HTMLInputElement | null = document.querySelector("[name='ville']");
	const	cp : HTMLInputElement | null = document.querySelector("[name='cp']");
	const	lieu : HTMLInputElement | null = document.querySelector("[name='lieu']");

	ville && (ville.value = element.ville);
	cp && (cp.value = element.code_postal);
	lieu && (lieu.value = element.value);
	list.classList.remove("active");
	input.value = element.value;
};

const		reset_list = (list : HTMLElement) => {
	const	elements : NodeListOf<HTMLElement>  = list.querySelectorAll(".mab_completion__element");

	elements && elements.forEach((element : HTMLElement) : void => { element.remove(); });
};

const		update_list = (data : any, input : HTMLInputElement) : void => {
	const	list : HTMLElement | null = document.getElementById("mab_completion__list");

	if (list) {
		reset_list(list);
		data && data.forEach((element : any) : void => {
			const	li : HTMLLIElement = document.createElement("li");
	
			li.className = "mab_completion__element";
			li.innerHTML = element.value;
			li.addEventListener("click", () : void => { on_select(list, input, element); }, { passive : true });
			list.append(li);
		});
		apply_css(list, input);
	}
};

const		create_list = () : HTMLElement => {
	let	list : HTMLElement | null = document.getElementById("mab_completion__list");

	if (!list) {
		list = document.createElement("ul");
		list.id = "mab_completion__list";
		document.body.append(list);
		if (__is_mobile[1] == false) {
			document.addEventListener("click", (e : MouseEvent) : void => {
				const	target : HTMLElement | null = e.target as HTMLElement | null;
	
				if (target && !target.classList.contains("mab_completion__element"))
					list && list.classList.remove("active");
			}, { passive : true });
		}
	}
	return (list);
};

const		autocomplete = (data : any, input : HTMLInputElement) : void => {
	const	list : HTMLElement | null = create_list();

	update_list(data, input);
	list.classList.add("active");
};

const		is_valid_keycode = (keycode : number) : boolean => {
	if (keycode == 27) {
		const	list : HTMLElement | null = document.getElementById("mab_completion__list");

		list && list.classList.remove("active");
	}
	return ((keycode >= 48 && keycode <= 90)
		|| keycode == 189 || keycode == 222 || keycode == 46 || keycode == 8);
};

const		init_completion = (e : KeyboardEvent, input : HTMLInputElement) : void => {
	const	url : string | null = input.getAttribute("data-href");

	if (!url || !is_valid_keycode(e.keyCode))
		return ;
	const	value : string | null = input.value;

	if (value && value.length > 1) {
		fetch(`${url}${value}`)
			.then((response : Response) : Promise<any> => response.json())
			.then((data : any) : void => {			
				if (Object.keys(data).length)
					autocomplete(data, input);
			});
	} else {
		const	list : HTMLElement | null = document.getElementById("mab_completion__list");

		if (list) {
			list.classList.remove("active");
			reset_list(list);
		}
	}
};

const		append_css = () : void => {
	const	style : HTMLStyleElement = document.createElement("style");

	style.innerHTML = `
		.mab_completion { position: relative; }
		#mab_completion__list {
			position: absolute; z-index: -101;
			background-color: white; color: black;
			font-size: max(.8vw, 11px); line-height: 1em;
			margin-block-start: 0;
			padding-inline-start: 0;
			margin-bottom: 0;
			opacity: 0;
			border-radius: 5px;
			transition: all 0.3s ease;
		}
		#mab_completion__list.active {
			z-index: 2147483647; opacity: 1;
		}
		#mab_completion__list li {
			width: 100%;
			margin-bottom: 0; padding: 1em;
			list-style: none;
			transition: all 0.3s ease;
		}
		#mab_completion__list li:hover {
			background-color: #f7f7f7;
			cursor: pointer;
		}
	`;
	document.head.append(style);
};

const		mab_completion = () : void => {
	const	inputs : NodeListOf<HTMLInputElement> = document.querySelectorAll(".mab_completion");
	
	append_css();
	inputs && inputs.forEach((input : HTMLInputElement) : void => {
		if (input.tagName !== "INPUT")
			return ;
		input.addEventListener("keyup", (e : KeyboardEvent) : void => { init_completion(e, input); });
	});
};


export default mab_completion;
