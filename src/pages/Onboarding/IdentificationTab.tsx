import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Controller, type UseFormReturn } from "react-hook-form";

export default function IdentificatioTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
}) {
  return (
    <TabsContent value="identification" className="gap-4 flex flex-col">
      <Card className="gap-6">
        <CardHeader>
          <CardTitle>Information</CardTitle>
          <CardDescription>Enter your bussiness details</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your email"
                  />
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
  );
}
