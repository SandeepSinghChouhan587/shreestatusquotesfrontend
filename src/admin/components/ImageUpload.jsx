import { useState, useRef } from "react";
import axios from "axios";
import { getUploadUrl } from "../../api/upload";

// 🔹 SEO File Name Generator
const generateImageName = (text, category) => {
  const year = new Date().getFullYear();

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  return `${slugify(text)}-${slugify(category)}-${year}.webp`;
};

const ImageUpload = ({ onUpload, text, category }) => {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  // 🔹 Compress Image
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => (img.src = e.target.result);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 1200;
        const scale = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => resolve(blob),
          "image/webp",
          0.8
        );
      };

      reader.readAsDataURL(file);
    });
  };

  // 🔹 Upload
  const handleUpload = async (file) => {
    if (!file || !text || !category) {
      alert("Please enter quote text and category first");
      return;
    }

    try {
      setLoading(true);
      setPreview(URL.createObjectURL(file));

      const compressed = await compressImage(file);

      // ✅ Generate SEO filename
      const fileName = generateImageName(text, category);

      // 🔹 Get signed URL
      const { uploadURL, fileUrl } = await getUploadUrl(
        "image/webp",
        fileName
      );

      // 🔹 Upload to S3
      await axios.put(uploadURL, compressed, {
        headers: { "Content-Type": "image/webp" },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      onUpload(fileUrl);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current.click()}
        className="border-dashed border-2 p-5 text-center cursor-pointer"
      >
        {loading ? `Uploading... ${progress}%` : "Click or drop image"}
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      {preview && (
        <img
          src={preview}
          className="w-full max-h-60 object-cover rounded"
        />
      )}
    </div>
  );
};

export default ImageUpload;
