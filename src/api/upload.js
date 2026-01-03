import axios from "axios";

export const getUploadUrl = async (data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/upload/upload-url`,
    data
  );
  return res.data;
};
