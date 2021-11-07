using System.Collections.Generic;
using System.Linq;
using Opravilo.Application.Interfaces.Services;
using Opravilo.Application.Models.Project;
using Opravilo.Application.Models.Requests;
using Opravilo.Application.Models.User;
using Opravilo.DataAccess.Repositories;

namespace Opravilo.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IStateRepository _stateRepository;

        public ProjectService(IProjectRepository projectRepository, IStateRepository stateRepository)
        {
            _projectRepository = projectRepository;
            _stateRepository = stateRepository;
        }

        public FullProjectModel GetProject(long projectId)
        {
            var project = _projectRepository.GetProject(projectId);
            return project != null
                ? new FullProjectModel()
                {
                    Description = project.Description,
                    Name = project.Name,
                    Id = project.Id,
                    Creator = new UserModel()
                    {
                        Id = project.Creator.Id,
                        DisplayName = project.Creator.DisplayName
                    },
                    States = project.States.Select(s => new StateModel()
                    {
                        Id = s.Id,
                        Name = s.Name
                    }).ToList()
                }
                : null;
        }

        public List<ProjectModel> GetProjects(long userId)
        {
            var projects = _projectRepository.GetProjectsByUser(userId);
            return projects.Select(p => new ProjectModel()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description
            }).ToList();
        }

        public ProjectModel CreateProject(CreateProjectRequest request, long userId)
        {
            var project = _projectRepository.CreateProject(request.Name, request.Description, userId);
            
            // todo: rethink initial states
            var initialStates = new List<string>()
            {
                "Unknown",
                "Planned",
                "In work",
                "Done"
            };

            _stateRepository.CreateStates(project.Id, initialStates);
            
            return new ProjectModel()
            {
                Id = project.Id,
                Description = project.Description,
                Name = project.Name
            };
        }

        public void RemoveProject(long projectId)
        {
            _projectRepository.RemoveProject(projectId);
        }

        public void UpdateProject(UpdateProjectRequest request)
        {
            _projectRepository.UpdateProject(request.ProjectId, request.Name, request.Description);
        }

        public StateModel CreateState(CreateStateRequest request)
        {
            var state = _stateRepository.CreateState(request.ProjectId, request.Name);
            return new StateModel()
            {
                Id = state.Id,
                Name = state.Name
            };
        }

        public StateModel UpdateState(UpdateStateRequest request)
        {
            var state = _stateRepository.UpdateState(request.StateId, request.ProjectId, request.Name);
            return new StateModel()
            {
                Id = state.Id,
                Name = state.Name
            };
        }

        public void RemoveState(long stateId)
        {
            _stateRepository.RemoveState(stateId);
        }
    }
}