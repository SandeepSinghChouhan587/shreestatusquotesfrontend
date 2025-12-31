import axios from "axios";

export const getUploadUrl = async (fileType) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload/upload-url`, {
    fileType,
  });
  return res.data;
};
