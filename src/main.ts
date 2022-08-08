import mab from "../public/mab";


const	is_completion = (value : string | null) : boolean => {
	const	items : NodeListOf<HTMLElement> = document.querySelectorAll("#mab_completion__list .mab_completion__element");
	let		ret  : boolean = false;

	console.log(items);

	value && items && items.forEach((item : HTMLElement) : void => {
		if (ret == false && item.innerText == value)
			ret = true;
	});
	return (ret);
};

mab(document).ready(() : void => {

	mab.init();

	const	btn : HTMLElement | null = document.getElementById("btn");
	const	input : HTMLInputElement | null = document.querySelector(".mab_completion");

	if (btn) {
		btn.addEventListener("click", () => {

			const	value : string | null = input ? input.value : null;
			
			console.log(`completion is ${is_completion(value) ? "correct" : "incorrect"}`);
			
		});
	}

});


export default mab;
