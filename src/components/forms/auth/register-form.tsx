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
import { registrationSchema, RegistrationInput } from "@/api/auth";
import { useRouter } from "@/hooks/use-router";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { signUp } = useAuth();

  const form = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signUp(data);
      router.replace("/auth/login");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        return toast({
          title: "Erreur",
          description: "Nom d'utilisateur déjà utilisé",
           variant: "destructive"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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

        <FormField
          control={form.control}
          name="re_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Inscription
        </Button>
      </form>
    </Form>
  );
}
