export interface IHomePageProps {
    fetchingProjects: boolean
    fetchProjects: () => void
    projectsEmpty: boolean
    
    createProjectModalVisible: boolean
    showCreateProjectModal: () => void
}