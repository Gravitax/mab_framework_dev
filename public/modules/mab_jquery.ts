class	ElementCollection extends Array {

	ready(callback : Function) : void {
		const   is_ready = this.some((e : Document) : boolean => {
			return (e.readyState != null && e.readyState != "loading");
		});
	
		is_ready ? callback() : document.addEventListener("DOMContentLoaded", callback as (e: Event) => void);
	}

	on(event : string, callback : Function, options ?: { [key : string] : boolean }) : void {
		this.forEach((target) => target.addEventListener(event, callback, options));
	}
	
	next() : HTMLElement[] {
		return (
			this.map((target : HTMLElement) : HTMLElement => <HTMLElement>target.nextElementSibling)
				.filter((e : HTMLElement) : boolean => e != null)
		);
	}
	
	prev() : HTMLElement[] {
		return (
			this.map((target : HTMLElement) : HTMLElement => <HTMLElement>target.previousElementSibling)
				.filter((e : HTMLElement) : boolean => e != null)
		);
	}
	
	addClass(classList : string | string[]) : void {
		this.forEach((target : HTMLElement) : void => {
			if (typeof(classList) === "string")
				classList = classList.split(' ');
			classList.forEach((className : string) : void => {
				className = className.trim();
				if (className.length < 1)
					return ;
				target.classList.add(className);
			});
		});
	}
	
	removeClass(classList : string | string[]) : void {
		this.forEach((target : HTMLElement) : void => {
			if (typeof(classList) === "string")
				classList = classList.split(' ');
			classList.forEach((className : string) : void => {
				className = className.trim();
				if (className.length < 1)
					return ;
				target.classList.remove(className);
			});
		});
	}
	
	toggleClass(classList : string | string[]) : void {
		this.forEach((target : HTMLElement) : void => {
			if (typeof(classList) === "string")
				classList = classList.split(' ');
			classList.forEach((className : string) : void => {
				className = className.trim();
				if (className.length < 1)
					return ;
				target.classList.toggle(className);
			});
		});
	}
	
	style({ ...property } : { [key : string] : string }) : void {
		this.forEach((target : HTMLElement) : void => {
			for (const [key, value] of Object.entries(property))
				target.style[key.trim() as any] = value.trim();
		});
	}
	
	append(element : HTMLElement) : void {
		this.forEach((target : HTMLElement) : void => target.append(element));
	}

	prepend(element : HTMLElement) : void {
		this.forEach((target : HTMLElement) : void => target.prepend(element));
	}
	
	after(element : HTMLElement) : void {
		this.forEach((target : HTMLElement) : void => target.after(element));
	}
	
	before(element : HTMLElement) : void {
		this.forEach((target : HTMLElement) : void => target.before(element));
	}
	
	createElement({ ...data } : {
		tag			: string,
		props		?: { [key : string] : string },
		innerText	?: string,
		innerHTML	?: string,
		append		?: boolean,
		prepend		?: boolean,
		after		?: boolean,
		before		?: boolean,

	}) : void {
		if (!data || !data.tag)
			return ;
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
	}
}

const	mab = (param : string | HTMLElement | Document) : ElementCollection => {
	if (typeof(param) === "string") {
		return (new ElementCollection(...document.querySelectorAll(param) as any));
	}
	else {
		return (new ElementCollection(param as any));
	}
};

mab.ajax = ({ url, method, contentType, body = {}, success = () => {} } : {
	url			: string,
	method		: string,
	contentType	: string,
	body		: object,
	success		: Function
}) => {
	const   queryString : string = Object.entries(body)
		.map(([key, value]) => { return (`${key}=${value}`); })
		.join('&');
	const   fetch_params : object = method == "GET" ?
		{ method, headers: { "Content-Type": contentType } } :
		{ method, body, headers: { "Content-Type": contentType } };

	url = method == "GET" ? `${url}?${queryString}` : url;
	return (fetch(url, fetch_params)
		.then((res : Response) => {
			if (res.ok) {
				// return (res.json());
				return (res.text());
			}
			else {
				throw (new Error(res.status.toString()));
			}
		})
		.then((data) => {
			success();
			return (data);
		}));
};


export default	mab;
