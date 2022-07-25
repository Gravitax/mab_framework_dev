const		callback : IntersectionObserverCallback = (entries : IntersectionObserverEntry[], observer : IntersectionObserver) => {
	let	animation : Element;
		
	entries.forEach((entry : IntersectionObserverEntry) : void => {
		animation = entry.target;
		if (entry.isIntersecting) {
			animation.classList.add("animated");
			// to replay animation each time comment this line and uncomment the else part
			observer.unobserve(animation);
		}
		else {
			// animation.classList.remove("animated");
		}
	});
};

const		options : IntersectionObserverInit = {
	// between 0 and 1 => item's % on screen to get an intersection
	threshold: 0,
	// margin detection to get an intersection
	rootMargin: "0px 0px 0px 0px",
};

const		mab_animation = () : void => {
	const	observer : IntersectionObserver = new IntersectionObserver(callback, options);
	const	animations : NodeListOf<HTMLElement> = document.querySelectorAll(".mab_animation");
		
	animations && animations.forEach((animation : HTMLElement) : void => {
		observer.observe(animation);
	});
};


export default mab_animation;
