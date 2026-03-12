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
import { userApi } from "@/features/members/api/user";
import {
  userCreateSchema,
  type UserBase,
  type UserCreate,
} from "@/features/members/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2, Sprout, UserPlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import z from "zod";

function useRegisterForm() {
  const navigate = useNavigate();

  const form = useForm<UserCreate>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: { identifier: "", password: "", confirmPassword: "" },
  });

  const mutation = useMutation({
    mutationFn: (payload: UserBase) => userApi.create(payload),
    onSuccess: () => navigate(ROUTES.LOGIN),
    onError: (error) => {
      const msg = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Registration failed — ${msg}`);
    },
  });

  const onSubmit = form.handleSubmit((formValues) => {
    const { identifier, ...rest } = formValues;
    const isEmail = z.email().safeParse(identifier).success;
    const payload: UserBase = isEmail
      ? { ...rest, email: identifier }
      : { ...rest, mobile: identifier };
    mutation.mutate(payload);
  });

  return { form, onSubmit, isPending: mutation.isPending };
}

export default function Register() {
  const { form, onSubmit, isPending } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
                Join the cooperative today
              </p>
            </div>
          </div>

          <Card className="gap-6 shadow-lg">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Create an account</CardTitle>
              <CardDescription>
                Register with your email or mobile number
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                id="form-register"
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
                          autoComplete="new-password"
                          placeholder="Min. 8 characters"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
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

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Re-enter your password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowConfirm((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showConfirm ? "Hide password" : "Show password"}
                        >
                          {showConfirm ? (
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
                  form="form-register"
                  disabled={isPending}
                  className="w-full gap-2 mt-2"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}
                  {isPending ? "Creating account…" : "Create Account"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className="font-semibold text-primary hover:underline underline-offset-2"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster position="bottom-left" richColors />
    </>
  );
}
