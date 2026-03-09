import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants";
import { userApi } from "@/features/members/api/user";
import {
  userCreateSchema,
  type UserBase,
  type UserCreate,
} from "@/features/members/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import z from "zod";

function useRegisterForm() {
  const navigate = useNavigate();

  const form = useForm<UserCreate>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      identifier: "test1@test.com",
      password: "password",
      confirmPassword: "password",
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: UserBase) => userApi.create(payload),
    onSuccess: () => {
      navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Register failed, ${errorMessage}`);
    },
  });

  const onSubmit = form.handleSubmit((formValues) => {
    const { identifier, ...rest } = formValues;
    const emailSchema = z.email();
    const isEmail = emailSchema.safeParse(identifier);
    let payload: UserBase;
    if (isEmail.success) {
      payload = {
        ...rest,
        email: identifier,
      };
    } else {
      payload = {
        ...rest,
        mobile: identifier,
      };
    }
    mutation.mutate(payload);
  });

  return { form, onSubmit, isPending: mutation.isPending };
}

export default function Register() {
  const { form, onSubmit, isPending } = useRegisterForm();
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="w-full max-w-sm">
        <Card className="gap-6">
          <CardHeader>
            <CardTitle>Register your account</CardTitle>
            <CardDescription>
              Enter your email or mobile below to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="form-register"
              onSubmit={onSubmit}
              className="flex flex-col gap-7"
            >
              <Controller
                name="identifier"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email/Mobile</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter your email or mobile"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter your password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter your password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                )}
              />
              <Field>
                <Button type="submit" form="form-register" disabled={isPending}>
                  {isPending ? "Registering..." : "Submit"}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
              </FieldDescription>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster position="bottom-left" richColors />
    </div>
  );
}
