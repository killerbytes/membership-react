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
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function SelfieCamera({
  onSubmit,
}: {
  onSubmit: (res: any) => void;
}) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const uploadFile = async (image: string) => {
    if (!image) throw new Error("No image source");
    const formData = await prepareToUpload(image);
    return await memberApi.uploadFile(formData, "selfie");
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
        <DialogTitle>Take Selfie</DialogTitle>

        <DialogDescription>
          Align your face on the circle and click the button below to take a
          photo
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4 flex-1">
        <div>
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
              <div className="relative w-full max-w-100 overflow-hidden">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  mirrored
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: "user",
                    height: 430,
                    width: 430,
                  }}
                  height={430}
                  width={430}
                />

                <div
                  className="absolute top-0 left-0 flex items-center justify-center h-full w-full "
                  style={{
                    pointerEvents: "none",
                  }}
                >
                  <div
                    className="w-55 h-75"
                    style={{
                      border: "3px dashed #00FF00",
                      borderRadius: "50%",
                      boxShadow: "0 0 0 9999px rgba(255, 255, 255, 0.8)",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className=" bg-white rounded-full flex items-center justify-center p-1 mt-4">
                  <Button
                    className="bg-white rounded-full w-14 h-14 border-2 border-black"
                    onClick={capture}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          disabled={!imgSrc}
          onClick={() => mutation.mutate(imgSrc || "")}
        >
          Save changes
        </Button>
      </DialogFooter>
    </div>
  );
}
