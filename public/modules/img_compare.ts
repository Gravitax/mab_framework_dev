export function		img_compare() {
	var	x, i;

	x = document.querySelectorAll(".mab_img_comp__overlay");
	for (i = 0; i < x.length; i++)
		compare(x[i]);

	function	compare(img) {
		var slider, img, clicked = 0, w, h;

		/*get the width and height of the img element*/
		w = img.offsetWidth;
		h = img.offsetHeight;
		/*set the width of the img element to 50%:*/
		img.style.width = (w / 2) + "px";
		/*create slider:*/
		slider = document.createElement("DIV");
		slider.setAttribute("class", "mab_img_comp__slider");
		/*insert slider*/
		img.parentElement.insertBefore(slider, img);
		/*position the slider in the middle:*/
		slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
		slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

		/*execute a function when the mouse button is pressed:*/
		slider.addEventListener("mousedown", slideReady, { passive: true, });
		/*and another function when the mouse button is released:*/
		window.addEventListener("mouseup", slideFinish, { passive: true, });
		/*or touched (for touch screens:*/
		slider.addEventListener("touchstart", slideReady, { passive: true, });
		/*and released (for touch screens:*/
		window.addEventListener("touchend", slideFinish, { passive: true, });

		function	slideReady(e) {
			/*prevent any other actions that may occur when moving over the image:*/
			// e.preventDefault();
			/*the slider is now clicked and ready to move:*/
			clicked = 1;
			/*execute a function when the slider is moved:*/
			window.addEventListener("mousemove", slideMove);
			window.addEventListener("touchmove", slideMove);
		}
		function	slideFinish() {
			clicked = 0;
		}
		function	slideMove(e) {
			var	pos;
					
			if (clicked == 0)
				return (false);
			pos = getCursorPos(e)
			/*prevent the slider from being positioned outside the image:*/
			if (pos < 1) pos = 1;
			if (pos > w - 1) pos = w - 1;
			/*execute a function that will resize the overlay image according to the cursor:*/
			slide(pos);
		}
		function	getCursorPos(e) {
			var a, x = 0;

			e = e.changedTouches ? e.changedTouches[0] : e;
			a = img.getBoundingClientRect();
			/*calculate the cursor's x coordinate, relative to the image:*/
			x = e.pageX - a.left;
			/*consider any page scrolling:*/
			x = x - window.pageXOffset;
			return (x);
		}
		function	slide(x) {
			/*resize the image:*/
			img.style.width = x + "px";
			/*position the slider:*/
			slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
		}
	}
}


export default {
	img_compare
}
