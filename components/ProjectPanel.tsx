'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Project, getProjects, saveProject, deleteProject } from '@/utils/project-manager';

interface ProjectPanelProps {
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

export const ProjectPanel = ({ onSelectProject, onClose }: ProjectPanelProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    
    const project = saveProject({
      name: newProjectName,
      description: newProjectDesc,
      components: []
    });
    
    setProjects([...projects, project]);
    setNewProjectName('');
    setNewProjectDesc('');
    setShowNewProject(false);
    onSelectProject(project);
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-72 bg-white border-r shadow-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Projects</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowNewProject(true)}>
            +
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
      </div>
      
      {showNewProject && (
        <div className="p-4 border-b bg-gray-50">
          <input
            type="text"
            placeholder="Project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <textarea
            placeholder="Description (optional)"
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            rows={2}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleCreateProject} disabled={!newProjectName.trim()}>
              Create
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowNewProject(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto p-4">
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No projects yet. Create one to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {projects.map(project => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{project.name}</h3>
                  <button
                    onClick={(e) => handleDeleteProject(e, project.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    🗑️
                  </button>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {project.description}
                  </p>
                )}
                <div className="flex items-center mt-2 text-xs text-gray-400">
                  <span>{project.components.length} components</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};