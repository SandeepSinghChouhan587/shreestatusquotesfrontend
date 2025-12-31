import { useState, useRef } from "react";
import axios from "axios";
import { getUploadUrl } from "../../api/upload";

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  // 🔹 Compress image to WEBP
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

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
          0.8 // ✅ best quality/size balance
        );
      };

      reader.readAsDataURL(file);
    });
  };

  // 🔹 Upload Handler
  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      setProgress(0);

      // preview
      setPreview(URL.createObjectURL(file));

      // compress image
      const compressed = await compressImage(file);

      // get signed url
      const { uploadURL, fileUrl } = await getUploadUrl("image/webp");

      // upload to S3
      await axios.put(uploadURL, compressed, {
        headers: {
          "Content-Type": "image/webp",
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      onUpload(fileUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed");
      setPreview("");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  // drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3 text-black">
      {/* Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`w-full border-2 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer transition 
        ${dragOver ? "border-indigo-600 bg-indigo-50/20" : "border-gray-300 bg-white/10"}`}
      >
        {loading ? (
          <p className="text-indigo-600 font-medium">
            Uploading... {progress}%
          </p>
        ) : (
          <p>
            {preview
              ? "Click or Drag & Drop to change image"
              : "Click or Drag & Drop to upload image"}
          </p>
        )}
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      {/* Preview */}
      {preview && !loading && (
        <>
          <img
            src={preview}
            alt="preview"
            className="w-full max-h-60 object-cover rounded-lg shadow-md"
          />
          <p className="text-green-500 text-sm">
            Image uploaded successfully
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
