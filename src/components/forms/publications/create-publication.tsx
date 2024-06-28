import { useState } from "react";
import { AxiosError } from "axios";
import { format } from "date-fns";
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
  CreatePublicationInput,
  createPublicationSchema,
  useCreatePublication,
  CreateProjectPublicationError,
} from "@/api/publications";
import { useGetProjects } from "@/api/projects";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn, formatDates } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

const createResearcherDefaultValues = {
  title: "",
  summary: "",
};

export function CreatePublicationForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const getResearchProjectsQuery = useGetProjects();
  const createPublicationMutation = useCreatePublication();

  const form = useForm<CreatePublicationInput>({
    resolver: zodResolver(createPublicationSchema),
    defaultValues: createResearcherDefaultValues,
  });

  const onSuccess = () => {
    form.reset(createResearcherDefaultValues);
    setOpen(false);
    toast({
      variant: "default",
      title: "Publication créée avec succès",
    });
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const cleanData = formatDates(data);
      await createPublicationMutation.mutateAsync(cleanData);
      onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiErrors = error.response?.data as CreateProjectPublicationError;
        for (const [key, value] of Object.entries(apiErrors)) {
          form.setError(key as keyof CreatePublicationInput, {
            type: "manual",
            message: value.join(", "),
          });
        }
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
              <DialogTitle>Créer une publication</DialogTitle>
              <DialogDescription>
                Veuillez remplir les informations ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de la publication</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résumé</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez la publication ici..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de publication</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projet associé</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("projectId", Number(value));
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionnez le projet associé" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getResearchProjectsQuery.data?.map((project) => (
                        <SelectItem
                          key={project.id}
                          value={project.id.toString()}
                        >
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
