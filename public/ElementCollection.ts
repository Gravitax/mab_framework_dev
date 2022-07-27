class		ElementCollection extends Array {

	ready(callback : Function) : ElementCollection {
		const   is_ready = this.some((e : Document) : boolean => {
			return (e.readyState != null && e.readyState != "loading");
		});
	
		is_ready ? callback() : document.addEventListener("DOMContentLoaded", callback as (e: Event) => void);
		return (this);
	}

	on(event : string, callback : Function, options ?: { [key : string] : boolean }) : ElementCollection {
		this.forEach((target) => target.addEventListener(event, callback, options));
		return (this);
	}
	
	addClass(classList : string | string[]) : ElementCollection {
		this.forEach((target : HTMLElement) : void => {
			if (typeof(classList) === "string")
				classList = classList.split(' ');
			classList.forEach((className : string) : void => {
				target.classList.add(className.trim());
			});
		});
		return (this);
	}
	
	removeClass(classList : string | string[]) : ElementCollection {
		this.forEach((target : HTMLElement) : void => {
			if (typeof(classList) === "string")
				classList = classList.split(' ');
			classList.forEach((className : string) : void => {
				target.classList.remove(className.trim());
			});
		});
		return (this);
	}
	
	toggleClass(classList : string | string[]) : ElementCollection {
		this.forEach((target : HTMLElement) : void => {
			if (typeof(classList) === "string")
				classList = classList.split(' ');
			classList.forEach((className : string) : void => {
				target.classList.toggle(className.trim());
			});
		});
		return (this);
	}
	
	style({ ...property } : { [key : string] : string }) : ElementCollection {
		this.forEach((target : HTMLElement) : void => {
			for (const [key, value] of Object.entries(property)) {
				target.style[key.trim() as any] = value.trim();
			}
		});
		return (this);
	}
	
	append(element : HTMLElement) : ElementCollection {
		this.forEach((target : HTMLElement) : void => target.append(element));
		return (this);
	}

	prepend(element : HTMLElement) : ElementCollection {
		this.forEach((target : HTMLElement) : void => target.prepend(element));
		return (this);
	}
	
	after(element : HTMLElement) : ElementCollection {
		this.forEach((target : HTMLElement) : void => target.after(element));
		return (this);
	}
	
	before(element : HTMLElement) : ElementCollection {
		this.forEach((target : HTMLElement) : void => target.before(element));
		return (this);
	}
	
	create_element({ ...data } : {
		tag			: string,
		props		?: { [key : string] : string },
		innerText	?: string,
		innerHTML	?: string,
		append		?: boolean,
		prepend		?: boolean,
		after		?: boolean,
		before		?: boolean,

	}) : ElementCollection {
		if (!data || !data.tag)
			return (this);
		if (!data.append && !data.prepend)
			data.append = true;
		this.forEach((target : HTMLElement) : void => {
			let	element : HTMLElement;
	
			element = document.createElement(data.tag);
			if (data.props) {
				for (const [key, value] of Object.entries(data.props))
					element.setAttribute(key, value);
			}
			if (data.innerText) element.innerText = data.innerText;
			if (data.innerHTML) element.innerHTML = data.innerHTML;
			if (data.append)	target.append(element);
			if (data.prepend)	target.prepend(element);
			if (data.after)		target.after(element);
			if (data.before)	target.before(element);
		});
		return (this);
	}

}


export default ElementCollection;
