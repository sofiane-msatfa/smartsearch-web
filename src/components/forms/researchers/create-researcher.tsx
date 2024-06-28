import { AxiosError } from "axios";
import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import {
  createResearcherSchema,
  useCreateResearcher,
  CreateResearcherError,
  CreateResearcherInput,
} from "@/api/researchers";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const createResearcherDefaultValues = {
  name: "",
  speciality: "",
} satisfies CreateResearcherInput;

export function CreateResearcherForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const createResearcherMutation = useCreateResearcher();

  const form = useForm<CreateResearcherInput>({
    resolver: zodResolver(createResearcherSchema),
    defaultValues: createResearcherDefaultValues,
  });

  const onSuccess = () => {
    form.reset(createResearcherDefaultValues);
    setOpen(false);
    toast({
      variant: "default",
      title: "Chercheur créé avec succès",
    });
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createResearcherMutation.mutateAsync(data);
      onSuccess()
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiErrors = error.response?.data as CreateResearcherError;
        form.setError("name", {
          type: "manual",
          message: apiErrors.name?.join(", "),
        });
        form.setError("speciality", {
          type: "manual",
          message: apiErrors.specialty?.join(", "),
        });
      }
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Nouveau</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Créer un chercheur</DialogTitle>
              <DialogDescription>
                Veuillez remplir les informations ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du chercheur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialité</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Fermer
                </Button>
              </DialogClose>
              <Button type="submit">Créer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
