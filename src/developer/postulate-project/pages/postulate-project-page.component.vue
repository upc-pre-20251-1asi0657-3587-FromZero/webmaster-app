<script>
import ApplyProject from "../components/apply-project.component.vue";
import {ProjectService} from "../../../../public/services/project.service.js";
import {ProjectEntity} from "../../../shared/models/project.model.js";

export default {
  name: 'postulate-project-page',
  components: {ApplyProject},
  data() {
    return {
      projectService: new ProjectService(),
      projectById: null,
      myProject: null
    };
  },
  created() {
    let project_id = localStorage.getItem('project id');
    this.projectService.getProjectById(project_id).then((response) => {
      this.projectById = response;
      this.createProject();
      console.log(this.myProject);
    });
  },
  methods: {
    createProject() {
      this.myProject = new ProjectEntity({
        project_ID:       this.projectById.project_ID,
        nameProject:      this.projectById.nameProject,
        descriptionProject:this.projectById.descriptionProject,

        languages:  this.projectById.languages .map(l => l.name),
        frameworks: this.projectById.frameworks.map(f => f.name),

        budget:             this.projectById.budget,
        budgetDescription:  this.projectById.budgetDescription,

        methodologies: [ this.projectById.methodologies ],
        stateProject: this.projectById.stateProject
      });
    }
  }
}
</script>

<template>
  <div class="flex justify-content-center flex-wrap">
    <apply-project v-if="myProject" :project="myProject"/>
  </div>
</template>

<style>

</style>
