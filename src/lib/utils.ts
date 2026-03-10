import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function prepareToUpload(dataURI: string, filename = "file.jpg") {
  const fetchResponse = await fetch(dataURI);
  const blob = await fetchResponse.blob();
  const file = new File([blob], filename, { type: "image/jpeg" });
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}
