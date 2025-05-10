<script>
import ProjectsPanelComponent from "../components/projects-panel.component.vue";
import { HomeService } from "../../../../public/services/home.service.js";
import { ProjectService } from "../../../../public/services/project.service.js";
import { ProjectEntity } from "../../../shared/models/project.model.js";

export default {
  name: "projects-data",
  components: { ProjectsPanelComponent },
  data() {
    return {
      homeService: new HomeService(),
      projectService: new ProjectService(),
      projectsData: [],
      myProjects: []
    };
  },
  async created() {
    // read the enterpriseId set in company-data
    const userId = Number(localStorage.getItem('user id'));
    if (userId) {
      try {
        this.projectsData = await this.projectService.getProjectByDeveloper(userId);
        console.log('Projects data:', this.projectsData);
        this.buildProjects();
      } catch (err) {
        console.error('Failed loading projects for enterprise', err);
      }
    } else {
      console.warn('No enterpriseId found in localStorage');
    }
  },
  methods: {
    buildProjects() {
      this.myProjects = this.projectsData.map(p => new ProjectEntity({
        project_ID: p.project_ID,
        nameProject: p.nameProject,
        type: p.type,
        descriptionProject: p.descriptionProject,
        languages: p.languages,
        frameworks: p.frameworks,
        budget: p.budget,
        budgetDescription: p.budgetDescription,
        methodologies: p.methodologies,
        enterprise_id: p.enterprise_id,
        applicants_id: p.applicants_id,
        developer_id: p.developer_id,
        stateProject: p.stateProject,
        projectProgressBar: p.projectProgressBar,
        started: p.started
      }));

      console.log('My projects:', this.myProjects);
    }
  }
};
</script>

<template>
  <div v-if="myProjects">
    <ProjectsPanelComponent :projects="myProjects" />
  </div>
</template>

<style scoped>
</style>
