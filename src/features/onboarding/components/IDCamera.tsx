import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { memberApi } from "@/features/members/api";
import { prepareToUpload } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function IDCamera({
  onSubmit,
}: {
  onSubmit: (res: AxiosResponse) => void;
  onClose: () => void;
}) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const uploadFile = (image: string): Promise<AxiosResponse> => {
    if (!image) return Promise.reject(new Error("No image source"));

    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = async () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Failed to get canvas 2D context");

          canvas.width = img.height;
          canvas.height = img.width;

          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((-90 * Math.PI) / 180);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);

          const landscapeBase64 = canvas.toDataURL("image/jpeg");
          const formData = await prepareToUpload(landscapeBase64);
          const response = await memberApi.uploadFile(formData, "id");
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = () =>
        reject(new Error("Failed to load image for rotation"));
      img.src = image;
    });
  };

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      onSubmit(data);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>Take ID Photo</DialogTitle>

        <DialogDescription>
          Make sure your ID is clearly visible and not blurry.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 flex-1">
        {imgSrc ? (
          <div className="flex flex-col gap-4">
            <img
              src={imgSrc}
              alt="Captured face"
              style={{ borderRadius: "8px", maxWidth: "400px" }}
            />
            <div className="flex flex-col items-center">
              <Button onClick={() => setImgSrc(null)}>Retake Photo</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="min-h-100 relative w-full max-w-100 overflow-hidden">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "environment",
                  width: 640,
                  height: 480,
                  aspectRatio: 16 / 9,
                }}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />

              <div
                className="absolute top-0 left-0 flex items-center justify-center h-full w-full "
                style={{
                  pointerEvents: "none",
                }}
              >
                <div
                  className="w-67.5 h-100"
                  style={{
                    border: "3px dashed #00FF00",
                    boxShadow: "0 0 0 9999px rgba(255, 255, 255, 0.8)",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className=" bg-white rounded-full flex items-center justify-center p-1 mt-4">
                <Button
                  className="bg-white rounded-full w-14 h-14 border-2 border-black"
                  disabled={mutation.isPending}
                  onClick={capture}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <DialogFooter>
        <Button
          disabled={!imgSrc || mutation.isPending}
          onClick={() => mutation.mutate(imgSrc || "")}
          className="w-full gap-2"
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {mutation.isPending ? "Uploading…" : "Save Photo"}
        </Button>
      </DialogFooter>
    </div>
  );
}
