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
import { authApi } from "@/features/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import z from "zod";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Mobile is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function useLoginForm() {
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "test1@test.com",
      password: "password",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginFormData) => authApi.login(values),
    onSuccess: () => {
      navigate(ROUTES.MAIN);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Login failed, ${errorMessage}`);
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
}

function LoginForm({
  form,
  onSubmit,
  isPending,
}: ReturnType<typeof useLoginForm>) {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Card className="gap-6">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email or mobile below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="form-login"
              onSubmit={onSubmit}
              className="flex flex-col gap-6"
            >
              <Controller
                name="identifier"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email/Mobile</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter your email or mobile"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      placeholder="Enter your password"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" form="form-login" disabled={isPending}>
                  {isPending ? "Logging in..." : "Submit"}
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  to={ROUTES.REGISTER}
                  className="text-primary hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Login() {
  const loginFormProps = useLoginForm();

  return (
    <>
      <LoginForm {...loginFormProps} />
      <Toaster position="bottom-left" richColors />
    </>
  );
}
