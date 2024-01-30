import React, { useState } from "react";

interface GalleryProps {
  images?: string[];
  thumbs?: string[];
}

import prod1 from "./Pictures/apartament.jpg";
import prod2 from "./Pictures/apartament.jpg";
import prod3 from "./Pictures/apartament.jpg";
import prod4 from "./Pictures/apartament.jpg";

import thumb1 from "./Pictures/apartament.jpg";
import thumb2 from "./Pictures/apartament.jpg";
import thumb3 from "./Pictures/apartament.jpg";
import thumb4 from "./Pictures/apartament.jpg";

const IMAGES = [prod1, prod2, prod3, prod4];
const THUMBS = [thumb1, thumb2, thumb3, thumb4];

const Gallery: React.FC<GalleryProps> = () => {
  const [currentImage, setCurrentImage] = useState<string>(prod1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setCurrentImage(IMAGES[index]);
    setCurrentImageIndex(index);
  };

  return (
    <section className="gallery-holder hide-in-mobile" style={{width: "35rem"}}>
      <section className="gallery">
        <div className="image">
          <img src={currentImage} alt="product-1" />
        </div>
        <div className="thumbnails">
          {THUMBS.map((th, index) => (
            <div
              className={` ${
                index === currentImageIndex ? "activated" : ""
              }`}img-holder
              key={index}
              onClick={() => {
                handleClick(index);
              }}
            >
              <img src={th} alt={`product-${index + 1}`} style={{objectFit: "cover", flex: 1, aspectRatio: 1}} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
