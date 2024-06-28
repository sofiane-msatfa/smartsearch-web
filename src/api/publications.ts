import { z } from "zod";
import { api } from "./client";
import { PaginatedResponse, PaginationInput } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ProjectPublication {
  id: number;
  title: string;
  summary: string;
  publication_date: string;
  associated_project: number;
}

export interface ProjectPublicationFilter {
  title?: string;
  publication_date?: Date;
  associated_project__title?: string;
}

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
  publication_date: z.coerce.date(),
  associated_project: z.coerce.number(),
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
  opts?: ProjectPublicationFilter & PaginationInput
): Promise<PaginatedResponse<ProjectPublication>> => {
  const response = await api.get("/api/publications/", {
    params: opts,
  });
  return response.data;
};

const getPublication = async (id: number): Promise<ProjectPublication> => {
  const response = await api.get(`/api/publications/${id}/`);
  return response.data;
};

export const useGetPublications = (
  opts?: ProjectPublicationFilter & PaginationInput
) => {
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
