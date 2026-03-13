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
import { ROUTES } from "@/constants";
import { authApi } from "@/features/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2, LogIn, Sprout } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or mobile is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function useLoginForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginFormData) => authApi.login(values),
    onSuccess: () =>
      navigate(decodeURIComponent(params.get("callbackUrl") || ROUTES.MAIN)),
    onError: (error) => {
      // const msg = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Login failed — ${error.message}`);
    },
  });

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return { form, onSubmit, isPending: mutation.isPending };
}

export default function Login() {
  const { form, onSubmit, isPending } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight">CoopMember</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your cooperative, always with you
              </p>
            </div>
          </div>

          <Card className="gap-6 shadow-lg">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Welcome back</CardTitle>
              <CardDescription>
                Sign in with your email or mobile number
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                id="form-login"
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
              >
                <Controller
                  name="identifier"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email / Mobile
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        autoComplete="username"
                        placeholder="e.g. juan@email.com"
                        onBlur={(e) => {
                          field.onBlur();
                          const value = e.target.value.trim();
                          if (value) {
                            form.setValue("identifier", value);
                          }
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Button
                  type="submit"
                  form="form-login"
                  disabled={isPending}
                  className="w-full gap-2 mt-2"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn className="h-4 w-4" />
                  )}
                  {isPending ? "Signing in…" : "Sign In"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    to={ROUTES.REGISTER}
                    className="font-semibold text-primary hover:underline underline-offset-2"
                  >
                    Create one
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
