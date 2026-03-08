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
import { authServices } from "@/services";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      identifier: "testing@test.com",
      password: "12345678",
    },
  });
  const onSubmit = async (formValues) => {
    console.log("submit", formValues);
    try {
      await authServices.login(formValues);
      navigate(ROUTES.MAIN);
    } catch (error) {
      toast.error(`Login failed, ${error.message}`);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen p-4">
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
              onSubmit={form.handleSubmit(onSubmit)}
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
              <Field>
                <Button type="submit" form="form-login">
                  Submit
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link to={ROUTES.REGISTER}>Sign up</Link>
              </FieldDescription>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster position="bottom-left" richColors />
    </div>
  );
}
