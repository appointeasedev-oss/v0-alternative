// Project management utilities for FreeV
// Handles saving, loading, and managing generated projects

export interface Project {
  id: string;
  name: string;
  description: string;
  components: Component[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Component {
  id: string;
  name: string;
  code: string;
  type: string;
  framework: string;
}

const STORAGE_KEY = 'freev-projects';

// Get all projects from localStorage
export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      }));
    }
  } catch (e) {
    console.error('Failed to load projects:', e);
  }
  return [];
};

// Get a single project by ID
export const getProject = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
};

// Save a new project
export const saveProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
  const projects = getProjects();
  
  const newProject: Project = {
    ...project,
    id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  projects.push(newProject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  
  return newProject;
};

// Update an existing project
export const updateProject = (id: string, updates: Partial<Project>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects[index];
};

// Delete a project
export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  
  if (filtered.length === projects.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

// Add a component to a project
export const addComponentToProject = (projectId: string, component: Omit<Component, 'id'>): Project | null => {
  const project = getProject(projectId);
  if (!project) return null;
  
  const newComponent: Component = {
    ...component,
    id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
  
  return updateProject(projectId, {
    components: [...project.components, newComponent]
  });
};

// Remove a component from a project
export const removeComponentFromProject = (projectId: string, componentId: string): Project | null => {
  const project = getProject(projectId);
  if (!project) return null;
  
  const filtered = project.components.filter(c => c.id !== componentId);
  return updateProject(projectId, { components: filtered });
};

// Update a component in a project
export const updateComponent = (
  projectId: string, 
  componentId: string, 
  updates: Partial<Component>
): Project | null => {
  const project = getProject(projectId);
  if (!project) return null;
  
  const updated = project.components.map(c => 
    c.id === componentId ? { ...c, ...updates } : c
  );
  
  return updateProject(projectId, { components: updated });
};

// Export project as JSON
export const exportProject = (projectId: string): string | null => {
  const project = getProject(projectId);
  if (!project) return null;
  
  return JSON.stringify(project, null, 2);
};

// Import project from JSON
export const importProject = (json: string): Project | null => {
  try {
    const data = JSON.parse(json);
    const project = {
      ...data,
      id: `imported-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Project;
    
    const projects = getProjects();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    
    return project;
  } catch (e) {
    console.error('Failed to import project:', e);
    return null;
  }
};

// Clone a project
export const cloneProject = (projectId: string): Project | null => {
  const project = getProject(projectId);
  if (!project) return null;
  
  return saveProject({
    name: `${project.name} (Copy)`,
    description: project.description,
    components: project.components.map(c => ({ ...c, id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }))
  });
};

// Search projects
export const searchProjects = (query: string): Project[] => {
  const projects = getProjects();
  const lowerQuery = query.toLowerCase();
  
  return projects.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.components.some(c => c.name.toLowerCase().includes(lowerQuery))
  );
};