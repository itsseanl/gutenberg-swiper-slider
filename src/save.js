/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
// import function to register Swiper custom elements
import { useState, useEffect, useRef } from "react";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
register();
export default function save({ attributes }) {
	let slides = attributes.slider;

	return (
		<section {...useBlockProps.save()}>
			<swiper-container
				slides-per-view="1"
				speed="500"
				loop="true"
				css-mode="true"
				navigation="true"
				pagination="true"
				scrollbar="false"
			>
				{slides.length
					? slides.map((slide, index) => {
							return (
								<swiper-slide key={"slide-" + index}>
									<img
										key={index}
										src={slide?.url}
										alt={slide?.alt}
										data-imageid={slide?.id}
										className={`image wp-image-${slide?.id}`}
									/>
								</swiper-slide>
							);
					  })
					: ""}
			</swiper-container>
		</section>
	);
}
