import { z } from "zod";
import { api } from "./client";
import { Publication } from "./publications";
import { Researcher } from "./researchers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  managerId: number;
  manager: Researcher;
  researchers: Researcher[];
  publications: Publication[];
}

export interface ProjectFilter {
  title?: string;
  description?: string;
  startDateFrom?: Date;
  endDateBefore?: Date;
  managerId?: number;
  managerName?: string;
  researcherIds?: number[];
  PublicationIds?: number[];
}

// TODO modifier
export interface ProjectError {
  title?: string[];
  description?: string[];
  start_date?: string[];
  expected_end_date?: string[];
}

/* ---------------------------------- post ---------------------------------- */

export const createProjectSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  managerId: z.coerce.number(),
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
  opts?: ProjectFilter
): Promise<Project[]> => {
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
  opts?: ProjectFilter
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
