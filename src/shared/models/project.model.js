export class ProjectEntity {
    constructor({
                    project_ID,
                    nameProject,
                    type = '',
                    descriptionProject,
                    languages = [],
                    frameworks = [],
                    budget = 0,
                    budgetDescription,
                    methodologies = [],
                    enterprise_id,
                    applicantsList = [],
                    developer_id = null,
                    stateProject,
                    projectProgressBar = 0,
                    started
                } = {}) {
        this.project_ID = project_ID;
        this.nameProject = nameProject;
        this.type = type;
        this.descriptionProject = descriptionProject;
        this.languages = languages;
        this.frameworks = frameworks;
        this.budget = budget;
        this.budgetDescription = budgetDescription;
        this.methodologies = methodologies;
        this.enterprise_id = enterprise_id;
        this.applicantsList = applicantsList;
        this.developer_id = developer_id;
        this.stateProject = stateProject;
        this.projectProgressBar = projectProgressBar;
        this.started = started
    }
}