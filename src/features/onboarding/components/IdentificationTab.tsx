import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { TabsContent } from "@/components/ui/tabs";
import { CameraDialog } from "@/features/onboarding/components/CameraDialog";
import {
  ArrowRight,
  Camera,
  CreditCard,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import IDCamera from "./IDCamera";
import SelfieCamera from "./SelfieCamera";

function PhotoZone({
  url,
  label,
  aspectRatio = "4/3",
  onCapture,
}: {
  url?: string;
  label: string;
  aspectRatio?: string;
  onCapture: () => void;
}) {
  const hasPhoto = !!url && url !== "xx";
  const imageSrc = hasPhoto
    ? `${import.meta.env.VITE_IMAGE_URL}${url}?${Date.now()}`
    : null;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative w-full overflow-hidden rounded-xl transition-all ${
          hasPhoto
            ? "ring-2 ring-primary bg-black"
            : "ring-2 ring-dashed ring-border bg-muted/50"
        }`}
        style={{ aspectRatio }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/50">
            <Camera className="h-10 w-10" />
            <p className="text-xs">No photo yet</p>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant={hasPhoto ? "outline" : "default"}
        onClick={onCapture}
        className="w-full gap-2"
      >
        {hasPhoto ? (
          <>
            <RefreshCw className="h-4 w-4" />
            Retake {label}
          </>
        ) : (
          <>
            <Camera className="h-4 w-4" />
            Take {label}
          </>
        )}
      </Button>
    </div>
  );
}

export default function IdentificationTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
}) {
  const [isSelfieCameraOpen, setIsSelfieCameraOpen] = React.useState(false);
  const [isIDCameraOpen, setIsIDCameraOpen] = React.useState(false);

  const photoUrl = form.watch("photoUrl");
  const validIdUrl = form.watch("validIdUrl");

  return (
    <>
      <TabsContent
        value="identification"
        className="gap-4 flex flex-col flex-1"
      >
        <Card className="gap-6 flex-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Camera className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Photo & Identification</CardTitle>
                <CardDescription>
                  Take a clear selfie and a photo of your valid government ID
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="gap-6 flex flex-col">
            <Controller
              name="photoUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex items-center gap-1.5"
                  >
                    <Camera className="h-3.5 w-3.5 text-muted-foreground" />
                    Profile Selfie
                  </FieldLabel>
                  <PhotoZone
                    url={photoUrl}
                    label="Selfie"
                    aspectRatio="1/1"
                    onCapture={() => setIsSelfieCameraOpen(true)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="border-t border-border" />

            <Controller
              name="validIdUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex items-center gap-1.5"
                  >
                    <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                    Valid Government ID
                  </FieldLabel>
                  <PhotoZone
                    url={validIdUrl}
                    label="Valid ID"
                    aspectRatio="16/10"
                    onCapture={() => setIsIDCameraOpen(true)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex items-start gap-2 rounded-xl bg-accent px-3 py-3">
              <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-accent-foreground leading-relaxed">
                Your photos are encrypted and stored securely. They are only
                used for membership verification purposes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Button type="button" onClick={onSubmit} className="w-full gap-2">
          Submit Application
          <ArrowRight className="h-4 w-4" />
        </Button>
      </TabsContent>

      <CameraDialog
        open={isSelfieCameraOpen}
        onClose={() => setIsSelfieCameraOpen(false)}
      >
        <SelfieCamera
          onSubmit={(e: any) => {
            setIsSelfieCameraOpen(false);
            form.setValue("photoUrl", e.url);
          }}
        />
      </CameraDialog>
      <CameraDialog
        open={isIDCameraOpen}
        onClose={() => setIsIDCameraOpen(false)}
      >
        <IDCamera
          onSubmit={(e: any) => {
            setIsIDCameraOpen(false);
            form.setValue("validIdUrl", e.url);
          }}
          onClose={() => setIsIDCameraOpen(false)}
        />
      </CameraDialog>
    </>
  );
}
