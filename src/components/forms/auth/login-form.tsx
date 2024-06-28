import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/use-auth";
import { authenticationSchema, AuthenticationInput } from "@/api/auth";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export function LoginForm() {
  const { signIn } = useAuth();
  const { toast } = useToast();

  const form = useForm<AuthenticationInput>({
    resolver: zodResolver(authenticationSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn(data);
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response?.status &&
        [401, 400].includes(err.response.status)
      ) {
        return form.setError("password", {
          type: "manual",
          message: "Nom d'utilisateur ou mot de passe incorrect",
        });
      }

      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Connexion
        </Button>
      </form>
    </Form>
  );
}
