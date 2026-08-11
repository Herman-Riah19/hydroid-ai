"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { UserServices } from "@/services/userServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, SignInSchema } from "@/validators/user-validator";
import { Form } from "@repo/ui/components/ui/form";
import { FormTextfield } from "@repo/ui/components/composable/FormTextfield";
import { AuthShell } from "@/components/auth/auth-shell";
import { Loader } from "lucide-react";

export default function LoginPage() {
  const formData = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isAuthenticated = useAuthStore(
    (state: { isAuthenticated: any }) => state.isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (data: SignInFormData) => {
    setError("");
    setLoading(true);

    try {
      await UserServices.login({
        email: data.email,
        password: data.password,
      });

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (err) {
      setError("Identifiants invalides");
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Connexion
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connectez-vous à votre compte
        </p>

        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleSubmit)}
            className="mt-6 space-y-4"
          >
            <FormTextfield
              form={formData}
              label="Email"
              placeholder="Entrer votre email"
              type="email"
              {...formData.register("email")}
            />
            <FormTextfield
              form={formData}
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              type="password"
              {...formData.register("password")}
            />
            {error && <div className="text-sm text-destructive">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Pas de compte ?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
