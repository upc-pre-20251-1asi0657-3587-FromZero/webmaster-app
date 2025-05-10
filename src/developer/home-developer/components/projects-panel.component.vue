<script>
import { useRouter } from 'vue-router';
import { AuthService } from "../../../../public/services/auth.service.js";
import {HomeService} from "../../../../public/services/home.service.js";

export default {
  name: "projects-panel.component",
  components: {},
  data() {
    return {
      homeService: new HomeService(),
      position: 'center',
      visible: false,
      applicantsList: []
    };
  },
  methods: {
    async goToDeliverablesList(projectId) {
      this.$router.push(`/projects/developers/${projectId}/Deliverables`);
    },
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  created() {

  }
}
</script>

<template>
  <pv-card>
    <template #title>
      <p style="color: #3554BC">{{ $t('projects-panel-enterprise-part1') }}</p>
    </template>
    <template #content>
      <hr>
      <div class="p-m-3" v-if="projects.length === 0">No hay proyectos aún.</div>

      <div class="project-list" v-for="project in projects">
        <div class="project" @click="goToDeliverablesList(project.project_ID)">
          <h4>{{ project.nameProject }}</h4>
          <p class="subtitle tipo-proyecto">{{ project.type }}</p>
          <pv-progressbar :value="project.projectProgressBar"></pv-progressbar>
        </div>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
hr {
  opacity: 0.3;
}

@media (max-width: 799px) {
  .p-card {
    margin-top: 2rem;
  }
}

.p-card {
  width: 30rem;
  min-width: 20rem;
  box-shadow: 0 20px 40px rgb(57, 57, 57);
  margin-top: 4rem;
  max-height: 800px;
  min-height: 620px;
  display: flex;
  flex-direction: column;
}

:deep(.p-card-title) {
  display: flex;
  align-items: center;
  margin: 20px 20px 0 20px;
  justify-content: center;
}

:deep(.p-card-content) {
  margin: 0 20px;
  flex-grow: 1;
  overflow: hidden;
  max-height: 90%;
}

.subtitle {
  color: #64748b;
}

span {
  max-width: 90%;
}

:deep(div.p-card-content){
  display: block;
  justify-content: center;
  overflow: auto;
  height: auto;
  max-height: 680px;
}

.project-list {
  display: block;
  justify-content: center;
  overflow: auto;
  height: auto;
  max-height: 680px;
}

.project {
  background-color: #D9D9D9;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgb(197, 197, 197);
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 10px;
  height: 120px;
  transition: transform 0.2s ease;
}

.project:hover {
  cursor: pointer;
  transform: scale(1.04, 1.04);
}

.tipo-proyecto {
  font-size: 0.8rem;
}

h4 {
  margin: 1px;
}

:deep(.p-progressbar) {
  width: 70%;
  align-self: center;
  height: 30%;
  margin-top: 5px;
}

:deep(.p-progressbar .p-progressbar-value) {
  background: linear-gradient(to right, #3554BC, #B864F3);
}

:deep(.p-dialog) {
  border-radius: 12px;
  background-color: #3554BC;
  display: block;
}

:deep(.p-rating .p-rating-item.p-rating-item-active .p-rating-icon) {
  color: gold;
}

:root(.p-dialog.p-component.p-ripple-disabled) {
  display: block !important;
}

.project.applicant {
  height: 100%;
}

.applicants-list {
  height: 100vh;
}

:root(.p-dialog-content) {
  height: 100vh;
}

:deep(.p-button) {
  background: #3554BC;
  border: none;
}

.choose-dev:hover {
  background: #B864F3;
}
</style>
