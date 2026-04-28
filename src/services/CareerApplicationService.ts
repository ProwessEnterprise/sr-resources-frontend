import { postRequest } from "./Rest";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const submitCareerApplication = async (data: {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume?: File;
}) => {
  let resumeFileId: number | null = null;

  if (data.resume) {
    const formData = new FormData();
    formData.append("files", data.resume, data.resume.name);
    const uploadRes = await axios.post(`${API_BASE_URL}/upload`, formData);
    resumeFileId = uploadRes.data?.[0]?.id || null;
  }

  const payload: Record<string, unknown> = {
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    position: data.position,
    message: data.message,
  };

  if (resumeFileId) {
    payload.resume = resumeFileId;
  }

  const res = await postRequest("/career-applications", { data: payload });

  if (res.status !== "success") throw new Error("Failed to submit");

  return res;
};
