import { Link } from "react-router-dom";
import { LoginForm } from "@/components/forms/auth/login-form";

export function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-balance text-muted-foreground">
              Entrez vos identifiants pour vous connecter
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Pas encore de compte ?{" "}
            <Link to="/auth/register" className="underline">
              Inscription
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://source.unsplash.com/1920x1080/?nature,water"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
