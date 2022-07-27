import mab from "../public/mab";


mab(document).ready(() : void => {

	import("@splidejs/splide").then((Module) : void => {
		const	id : string = "#foo";

		window.splide[id] = new Module.Splide(id);
	});

	mab.init();

});

export default mab;
