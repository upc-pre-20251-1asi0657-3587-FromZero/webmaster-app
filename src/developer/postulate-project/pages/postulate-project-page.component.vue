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
      console.log(response, 'response');
      this.projectById = response;
      this.createProject();
      console.log(this.myProject);
    });
  },
  methods: {
    createProject() {
      this.myProject = new ProjectEntity({
        project_ID:       this.projectById.id,
        nameProject:      this.projectById.name,
        descriptionProject:this.projectById.description,

        languages:  this.projectById.languages .map(l => l.name),
        frameworks: this.projectById.frameworks.map(f => f.name),

        candidates: this.projectById.candidatesList,

        budget:             this.projectById.budget,
        budgetDescription:  this.projectById.budgetDescription,

        methodologies: [ this.projectById.methodologies ],
        stateProject: this.projectById.state
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
