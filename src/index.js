import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
// import function to register Swiper custom elements

registerBlockType(metadata.name, {
	edit: Edit,
	save: save,
	attributes: {
		slider: {
			type: "array",
			default: [],
			source: "query",
			selector: "img", // added
			query: {
				url: {
					type: "string",
					source: "attribute",
					attribute: "src",
				},
				alt: {
					type: "string",
					source: "attribute",
					attribute: "alt",
				},
				id: {
					type: "string",
					source: "attribute",
					attribute: "data-imageid",
				},
			},
		},
	},
});
