import axios from "axios";

export const getUploadUrl = async (fileType) => {
  const res = await axios.post("/api/upload/upload-url", {
    fileType,
  });
  return res.data;
};
