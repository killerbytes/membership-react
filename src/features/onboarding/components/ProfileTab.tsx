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
import type { MemberInput } from "@/features/members/types";
import { ArrowRight, User } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

export default function ProfileTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<MemberInput>;
  onSubmit: () => void;
}) {
  return (
    <TabsContent value="profile" className="gap-4 flex flex-col">
      <Card className="gap-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter your legal name as it appears on your ID
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                <Input {...field} id={field.name} placeholder="e.g. Juan" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="middleName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Middle Name</FieldLabel>
                <Input {...field} id={field.name} placeholder="e.g. Santos" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="e.g. Dela Cruz"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
      </Card>

      <Button type="button" onClick={onSubmit} className="w-full gap-2">
        Continue
        <ArrowRight className="h-4 w-4" />
      </Button>
    </TabsContent>
  );
}
