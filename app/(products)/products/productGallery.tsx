"use client";

import Image from "next/image";
import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

type ProductGalleryProps = {
  product: {
    title: string;
    images: {
      url: string;
      alt: string;
    }[];
  };
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const activeImage = product.images[activeIndex];

  const slides = product.images.map((image) => ({
    src: image.url,
    alt: image.alt,
  }));

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* =========================
            Main Image
        ========================== */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer relative"
        >
          <Image
            src={activeImage.url}
            alt={activeImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </button>

        {/* =========================
            Thumbnails
        ========================== */}
        <div className="flex items-center gap-3">
          {product.images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`
                cursor-pointer relative aspect-square overflow-hidden rounded-xl
                border-2 transition-all
                ${
                  activeIndex === index
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }
              `}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={500}
                height={500}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* =========================
          Lightbox
      ========================== */}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={activeIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails, Fullscreen]}
        on={{
          view: ({ index }) => {
            setActiveIndex(index);
          },
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
        }}
        thumbnails={{
          position: "bottom",
          width: 100,
          height: 70,
          border: 0,
          borderRadius: 8,
          padding: 0,
          gap: 8,
        }}
      />
    </>
  );
}
