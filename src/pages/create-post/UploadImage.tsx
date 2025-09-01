import { useState } from "react";
import { ReactFormState } from "react-dom/client";

interface UploadImageProps {
  onUpload?: (url: string) => void;
}

export const UploadImage = ({ onUpload }: UploadImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(Image);
    }
  };

  const uploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "unsigned");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/reaktu/auto/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const file = await res.json();
      setImageUrl(file.secure_url);

      if (onUpload) onUpload(file.secure_url);

      console.log("Image uploaded: " + file.secure_url);
    } catch (err) {
      console.error("Erreur upload:", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={uploadImage}>Uploader</button>

      {imageUrl && (
        <div>
          <p>Image uploadée :</p>
          <img src={imageUrl} alt="uploaded" style={{ maxWidth: "200px" }} />
        </div>
      )}
    </div>
  );
};
