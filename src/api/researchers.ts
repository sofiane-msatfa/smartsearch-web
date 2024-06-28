import { z } from "zod";
import { api } from "./client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "./projects";

export interface Researcher {
  id: number;
  name: string;
  specialty: string;
  projects: Project[];
  managerProjects: Project[];
}

//TODO modifier
export interface CreateResearcherError {
  name?: string[];
  specialty?: string[];
}

/* ---------------------------------- post ---------------------------------- */

export const createResearcherSchema = z.object({
  name: z.string().min(1).max(255),
  specialty: z.string().min(1).max(255),
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

const getResearchers = async (): Promise<Researcher[]> => {
  const response = await api.get("/api/researchers/");
  return response.data;
};

const getResearcher = async (id: number): Promise<Researcher> => {
  const response = await api.get(`/api/researchers/${id}/`);
  return response.data;
};

export const useGetResearchers = () => {
  return useQuery({
    queryKey: ["researchers"],
    queryFn: () => getResearchers(),
  });
};

export const useGetResearcher = (id: number) => {
  return useQuery({
    queryKey: ["researchers", id],
    queryFn: () => getResearcher(id),
  });
};
