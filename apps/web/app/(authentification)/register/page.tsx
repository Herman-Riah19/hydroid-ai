"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { UserServices } from "@/services/userServices";
import { useForm } from "react-hook-form";
import { SignupFormData, SignupSchema } from "@/validators/user-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@repo/ui/components/ui/form";
import { FormTextfield } from "@repo/ui/components/composable/FormTextfield";
import { AuthShell } from "@/components/auth/auth-shell";
import { Loader } from "lucide-react";

export default function RegisterPage() {
  const formData = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: SignupFormData) => {
    setError("");

    setLoading(true);

    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const result = await UserServices.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result) {
        router.push("/login?message=Inscription réussie");
      } else {
        setError((result as any)?.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Inscription
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Créez votre compte pour accéder à l&apos;application
        </p>

        <Form {...formData}>
          <form
            onSubmit={formData.handleSubmit(handleSubmit)}
            className="mt-6 space-y-4"
          >
            <FormTextfield
              form={formData}
              label="Nom"
              placeholder="Entrer le nom"
              {...formData.register("name")}
            />

            <FormTextfield
              form={formData}
              label="Email"
              type="email"
              placeholder="Entrer l'email"
              {...formData.register("email")}
            />

            <FormTextfield
              form={formData}
              label="Mot de passe"
              type="password"
              placeholder="Entrer le mot de passe"
              {...formData.register("password")}
            />

            <FormTextfield
              form={formData}
              label="Confirmer le mot de passe"
              type="password"
              placeholder="Confirmer le mot de passe"
              {...formData.register("confirmPassword")}
            />

            {error && <div className="text-sm text-destructive">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                  Inscription...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
