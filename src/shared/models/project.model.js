export class ProjectEntity {
    constructor({
                    project_ID,
                    nameProject,
                    type = '',
                    descriptionProject,
                    languages = [],
                    candidates = [],
                    frameworks = [],
                    budget = 0,
                    budgetDescription,
                    methodologies = [],
                    enterprise_id,
                    applicantsList = [],
                    developer_id = null,
                    stateProject,
                    projectProgressBar = 0,
                    enterpriseUrlImage= '',
                    started
                } = {}) {
        this.project_ID = project_ID;
        this.nameProject = nameProject;
        this.type = type;
        this.descriptionProject = descriptionProject;
        this.languages = languages;
        this.frameworks = frameworks;
        this.candidates = candidates;
        this.budget = budget;
        this.budgetDescription = budgetDescription;
        this.methodologies = methodologies;
        this.enterprise_id = enterprise_id;
        this.applicantsList = applicantsList;
        this.developer_id = developer_id;
        this.stateProject = stateProject;
        this.projectProgressBar = projectProgressBar;
        this.enterpriseUrlImage = enterpriseUrlImage;
        this.started = started
    }
}
