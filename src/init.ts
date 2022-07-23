import mab from "../public/modules/mab_jquery";
import mount_framework from "../public/mount";


const	files_css = [
	"normalize",
	"style"
];

const	init_framework = () : void => {
	const	horodatage : number = new Date().getTime();

	files_css.forEach((file : string) : void => {
		mab("head").create_element({ append : true, tag : "link",
			props : { "type" : "text/css", "rel" : "stylesheet", "href" : `./public/css/${file}.css?h=${horodatage}` } });
	});
	
	mab(document).ready(() => {
		mount_framework();
	});
};


export default init_framework;
