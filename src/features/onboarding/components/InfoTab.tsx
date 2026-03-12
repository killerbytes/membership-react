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
import { ArrowRight, FileText, Info, Mail, Phone } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

export default function InfoTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<any>;
  onSubmit: () => void;
}) {
  return (
    <TabsContent value="info" className="gap-4 flex flex-col">
      <Card className="gap-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>
                How we'll reach you for important notices
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email Address
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="e.g. juan@email.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="mobile"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Mobile Number
                  </span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="tel"
                  placeholder="e.g. 09171234567"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
      </Card>

      <Card className="gap-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <CardTitle>Government IDs</CardTitle>
              <CardDescription>Optional — enter if available</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          <Controller
            name="tinNo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>TIN Number</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your TIN number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="rsbsaNo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>RSBSA Number</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your RSBSA number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex items-start gap-2 rounded-lg bg-muted px-3 py-2">
            <Info className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              RSBSA (Registry System for Basic Sectors in Agriculture) is
              required for farmer-members. Leave blank if not applicable.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button type="button" onClick={onSubmit} className="w-full gap-2">
        Continue
        <ArrowRight className="h-4 w-4" />
      </Button>
    </TabsContent>
  );
}
