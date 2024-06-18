import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { AppFileRouter } from "./core";

export const UploadButton = generateUploadButton<AppFileRouter>();
export const UploadDropzone = generateUploadDropzone<AppFileRouter>();
