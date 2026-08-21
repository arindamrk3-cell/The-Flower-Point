import { useState } from "react";

const ImageGallery = ({ images, title }) => {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (

    <div>

      {/* Main Image */}

      <img
        src={selectedImage}
        alt={title}
        className="h-[500px] w-full rounded-3xl object-cover shadow-xl"
      />

      {/* Thumbnails */}

      <div className="mt-5 flex gap-3 overflow-x-auto">

        {images.map((img, index) => (

          <img
            key={index}
            src={img}
            alt=""
            onClick={() => setSelectedImage(img)}
            className={`h-24 w-24 cursor-pointer rounded-xl object-cover border-4 transition ${
               selectedImage === img
                ? "border-rose-600"
                : "border-transparent"
            }`}
          />

        ))}

      </div>

    </div>

  );

};

export default ImageGallery;