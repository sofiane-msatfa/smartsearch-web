import { z } from "zod";
import { api } from "./client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse, PaginationInput } from "./types";
import { Project } from "./projects";

export interface Researcher {
  id: number;
  name: string;
  specialty: string;
  projects: Project[];
}

export interface CreateResearcherError {
  name?: string[];
  specialty?: string[];
}

/* ---------------------------------- post ---------------------------------- */

export const createResearcherSchema = z.object({
  name: z.string().min(1).max(255),
  speciality: z.string().min(1).max(255),
});

export type CreateResearcherInput = z.infer<typeof createResearcherSchema>;

const createResearcher = async (data: CreateResearcherInput) => {
  const response = await api.post("/api/researchers/", data);
  return response.data;
};

export const useCreateResearcher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createResearcher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["researchers"],
      });
    },
  });
};

/* ---------------------------------- get ---------------------------------- */

const getResearchers = async (
  paginationOpts?: PaginationInput
): Promise<PaginatedResponse<Researcher>> => {
  const response = await api.get("/api/researchers/", {
    params: paginationOpts,
  });
  return response.data;
};

const getResearcher = async (id: number): Promise<Researcher> => {
  const response = await api.get(`/api/researchers/${id}/`);
  return response.data;
};

export const useGetResearchers = (paginationOpts?: PaginationInput) => {
  return useQuery({
    queryKey: ["researchers", paginationOpts],
    queryFn: () => getResearchers(paginationOpts),
  });
};

export const useGetResearcher = (id: number) => {
  return useQuery({
    queryKey: ["researchers", id],
    queryFn: () => getResearcher(id),
  });
};
