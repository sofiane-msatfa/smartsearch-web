import { z } from "zod";
import { api } from "./client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "./projects";

export interface Publication {
  id: number;
  title: string;
  summary: string;
  date: string;
  projectId: number;
  project: Project;
}

export interface PublicationFilter {
  title?: string;
  summary?: string;
  dateFrom?: Date;
  dateTo?: Date;
  projectId?: number;
}

// TODO modifier
export interface CreateProjectPublicationError {
  title?: string[];
  summary?: string[];
  publication_date?: string[];
  associated_project?: string[];
}

/* ---------------------------------- post ---------------------------------- */

export const createPublicationSchema = z.object({
  title: z.string().min(1).max(255),
  summary: z.string(),
  date: z.coerce.date(),
  projectId: z.coerce.number(),
});

export type CreatePublicationInput = z.infer<typeof createPublicationSchema>;

const createPublication = async (data: CreatePublicationInput) => {
  const response = await api.post("/api/publications/", data);
  return response.data;
};

export const useCreatePublication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPublication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["publications"],
      });
    },
  });
};

/* ---------------------------------- get ---------------------------------- */

const getPublications = async (
  opts?: PublicationFilter
): Promise<Publication[]> => {
  const response = await api.get("/api/publications/", {
    params: opts,
  });
  return response.data;
};

const getPublication = async (id: number): Promise<Publication> => {
  const response = await api.get(`/api/publications/${id}/`);
  return response.data;
};

export const useGetPublications = (opts?: PublicationFilter) => {
  return useQuery({
    queryKey: ["publications", opts],
    queryFn: () => getPublications(opts),
  });
};

export const useGetPublication = (id: number) => {
  return useQuery({
    queryKey: ["publications", id],
    queryFn: () => getPublication(id),
  });
};
