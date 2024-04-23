import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import "./editor.scss";
import { useState, useEffect, useRef } from "react";
import { Button } from "@wordpress/components";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, className, setAttributes }) {
	const swiperElRef = useRef(null);

	useEffect(() => {
		// listen for Swiper events using addEventListener
		swiperElRef.current.addEventListener("swiperprogress", (e) => {
			const [swiper, progress] = e.detail;
			console.log(progress);
		});

		swiperElRef.current.addEventListener("swiperslidechange", (e) => {
			console.log("slide changed");
		});
	}, [attributes.slider]);
	return (
		<section {...useBlockProps()}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => {
						console.log(media);
						let slide = {
							url: media.url,
							alt: media.alt,
							id: media.id,
						};
						attributes.slider.length
							? setAttributes({ slider: [...attributes.slider, slide] })
							: setAttributes({ slider: [slide] });
					}}
					type="image"
					value={"test"}
					render={({ open }) => {
						return <Button onClick={open}>Open Media Library</Button>;
					}}
				/>
			</MediaUploadCheck>
			<Swiper
				ref={swiperElRef}
				// install Swiper modules
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={50}
				slidesPerView={1}
				navigation
				loop="true"
				pagination={{ clickable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log("slide change")}
			>
				{attributes.slider.length
					? attributes.slider.map((slide, index) => {
							return (
								<SwiperSlide key={"slide-" + index}>
									<img
										key={index}
										src={slide.url}
										alt={slide?.alt}
										data-imageid={slide?.id}
										className={`image wp-image-${slide?.id}`}
									/>
								</SwiperSlide>
							);
					  })
					: ""}
			</Swiper>
		</section>
	);
}
