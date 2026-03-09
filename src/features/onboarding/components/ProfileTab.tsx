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
import type { MemberBase } from "@/schemas";
import { Controller, type UseFormReturn } from "react-hook-form";

export default function ProfileTab({
  form,
  onSubmit,
}: {
  form: UseFormReturn<MemberBase>;
  onSubmit: () => void;
}) {
  return (
    <TabsContent value="profile" className="gap-4 flex flex-col">
      <Card className="gap-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Enter your personal details</CardDescription>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your first name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your last name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
          <Controller
            name="middleName"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Middle Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your middle name"
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
