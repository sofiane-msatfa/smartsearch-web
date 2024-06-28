import { z } from "zod";
import { api } from "./client";
import { ProjectPublication } from "./publications";
import { Researcher } from "./researchers";
import { PaginatedResponse, PaginationInput } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Project {
  id: number;
  title: string;
  description: string;
  researchers: Researcher[];
  publications: ProjectPublication[];
  start_date: string;
  expected_end_date: string;
}

export interface ProjectFilter {
  title?: string;
  start_date?: Date;
  expected_end_date?: Date;
  researchers__name?: string;
}

export interface ProjectError {
  title?: string[];
  description?: string[];
  start_date?: string[];
  expected_end_date?: string[];
}

/* ---------------------------------- post ---------------------------------- */

export const createProjectSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
  start_date: z.date(),
  expected_end_date: z.date(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

const createProject = async (data: CreateProjectInput) => {
  const response = await api.post("/api/projects/", data);
  return response.data;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

/* ---------------------------------- get ---------------------------------- */

const getProjects = async (
  opts?: ProjectFilter & PaginationInput
): Promise<PaginatedResponse<Project>> => {
  const response = await api.get("/api/projects/", {
    params: opts,
  });
  return response.data;
};

const getProject = async (id: number): Promise<Project> => {
  const response = await api.get(`/api/projects/${id}/`);
  return response.data;
};

export const useGetProjects = (
  opts?: ProjectFilter & PaginationInput
) => {
  return useQuery({
    queryKey: ["projects", opts],
    queryFn: () => getProjects(opts),
  });
};

export const useGetProject = (id: number) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
  });
};
