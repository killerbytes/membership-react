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
import React from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import IDCamera from "./IDCamera";
import SelfieCamera from "./SelfieCamera";

export default function IdentificationTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
}) {
  const [isSelfieCameraOpen, setIsSelfieCameraOpen] = React.useState(false);
  const [isIDCameraOpen, setIsIDCameraOpen] = React.useState(false);

  return (
    <>
      <TabsContent
        value="identification"
        className="gap-4 flex flex-col flex-1"
      >
        <Card className="gap-6 flex-1">
          <CardHeader>
            <CardTitle>Photo</CardTitle>
            <CardDescription>Take your photo</CardDescription>
          </CardHeader>
          <CardContent className="gap-4 flex flex-col">
            <Controller
              name="photoUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Selfie</FieldLabel>
                    {form.getValues("photoUrl") && (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${form.getValues("photoUrl")}?${new Date()}`}
                      />
                    )}
                    <Button onClick={() => setIsSelfieCameraOpen(true)}>
                      Take Selfie
                    </Button>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                </>
              )}
            />

            <Controller
              name="validIdUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Valid ID</FieldLabel>
                    {form.getValues("validIdUrl") && (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${form.getValues("validIdUrl")}`}
                      />
                    )}

                    <Button onClick={() => setIsIDCameraOpen(true)}>
                      Take ID Photo
                    </Button>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                </>
              )}
            />
          </CardContent>
        </Card>
        <Button type="button" onClick={onSubmit}>
          Next
        </Button>
      </TabsContent>
      <CameraDialog
        open={isSelfieCameraOpen}
        onClose={() => setIsSelfieCameraOpen(false)}
      >
        <SelfieCamera
          onSubmit={(e) => {
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
          onSubmit={(e) => {
            setIsIDCameraOpen(false);
            form.setValue("validIdUrl", e.url);
          }}
          onClose={() => setIsIDCameraOpen(false)}
        />
      </CameraDialog>
    </>
  );
}
