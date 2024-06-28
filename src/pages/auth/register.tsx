import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/forms/auth/register-form";

export function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:h-screen">
      <div className="hidden bg-muted lg:block">
        <img
          src="https://source.unsplash.com/1920x1080/?nature,water"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inscription</h1>
            <p className="text-balance text-muted-foreground">
              Inscription
            </p>
          </div>
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            Déjà inscrit ?{" "}
            <Link to="/auth/login" className="underline">
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
