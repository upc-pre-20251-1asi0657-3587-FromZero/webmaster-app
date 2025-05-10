<script>
import { useRouter } from 'vue-router';
import { AuthService } from "../../../../public/services/auth.service.js";
import { HomeService } from "../../../../public/services/home.service.js";
import { ApplicantEntity } from "../../../shared/models/applicant.model.js";

export default {
  name: "projects-panel.component",
  emits: ["chooseDeveloper"],
  components: {},
  data() {
    return {
      homeService: new HomeService(),
      position: 'center',
      visible: false,
      applicantsList: [],
      myProject: null,
      projectStateMap: {
        'LOOKING_FOR_DEVELOPERS' : 'Buscando Desarrolladores',
        'NOT_STARTED': 'No Iniciado',
        'IN_PROCESS': 'En Proceso',
        'COMPLETED': 'Completado'
      }
    };
  },
  methods: {
    async openPosition(position, started, candidates, projectId) {
      if (!started) {
        this.myProject = projectId;
        this.position = position;
        this.visible = true;

        for (let candidate of candidates) {
          this.homeService.getApplicantInfoById(candidate).then((response) => {
            const applicantData = response.data;
            const applicant = new ApplicantEntity(
                applicantData.developer_id,
                applicantData.firstName,
                applicantData.lastName,
                applicantData.description,
                applicantData.profile_img_url
            );
            this.applicantsList.push(applicant);
          });
        }
      } else {
        this.$router.push('/deliverables-list');
      }
    },

    chooseApplicant(applicant) {
      let applicant_id = applicant.developer_id
      console.log(applicant);
      this.visible = false;
      this.$emit("chooseDeveloper", {numberApplicant: applicant_id , numberProjectId: this.myProject})
    },

    goToDeliverablesList(projectId) {
      this.$router.push(`/projects/${projectId}/Deliverables`);
    },

    goToDevProfile(applicant) {
      console.log(`go to dev profile, id: ${applicant}`);
    },

    // Método para verificar si `this.visible` es falso
    isVisibleFalse() {
      return !this.visible;
    },

    // Método para manejar los cambios en `visible`
    handleVisibilityChange(newValue) {
      if (!newValue) {
        this.applicantsList = []; // Vacía el array cuando el diálogo no es visible
      }
    },

    //Metodo para manejar el acceso a la lista de entregables
    handleProjectClick(projectID, state) {
      if (state === 2) { // Solo si el estado es "IN_PROCESS" (valor 2)
        this.goToDeliverablesList(projectID);
      }
    },
  },
  watch: {
    visible(newValue) {
      this.handleVisibilityChange(newValue);
    }
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  created() {

  }
};
</script>

<template>
  <pv-card>
    <template #title> <p  style="color: #3554BC">{{ $t('projects-panel-enterprise-part1') }}</p></template>
    <template #content v-if="projects">
      <hr>
      <template class="project-list" v-for="project in projects">
        <div class="project">
          <h4 @click="handleProjectClick(project.project_ID, project.stateProject)">
            {{ project.nameProject }}
          </h4>
          <p class="subtitle tipo-proyecto">
            {{ projectStateMap[project.stateProject] }}
          </p>
          <p class="postulantes"  v-if="!project.started" @click="openPosition('center', project.started, project.applicants_id, project.project_ID)">{{ $t('projects-panel-enterprise-part2') }}: {{project.applicants_id.length}}</p>
          <pv-progressbar v-else :value="project.projectProgressBar"></pv-progressbar>
        </div>
      </template>
    </template>
  </pv-card>

  <div class="card">
    <pv-dialog v-model:visible="visible" :header="$t('projects-panel-enterprise-part3')" :style="{ width: '25rem', height: '100vh', display: 'block', overflow:'auto' }" :position="position" :modal="true" :draggable="false">
      <div v-if="applicantsList.length === 0">
        Aún no hay aplicantes al proyecto
      </div>

      <template class="applicants-list" v-for="(applicant) in this.applicantsList">
        <div class="project applicant">
          <h4>{{applicant.firstName +" "+applicant.lastName}}</h4>
          <div class="p-card-title">
          <pv-avatar :image="applicant.profile_img_url" class="mr-2" size="xlarge" shape="circle" @click="goToDevProfile(applicant.developer_id)" />
          <pv-rating v-model="applicant.rating" readonly :cancel="false" />
          </div>
          <span>{{ applicant.description }}</span>
          <pv-button class="choose-dev" @click="chooseApplicant(applicant)">{{ $t('projects-panel-enterprise-part3') }}</pv-button>
        </div>
      </template>
    </pv-dialog>
  </div>
</template>

<style scoped>
hr{
  opacity:0.3;
}

@media (max-width: 799px) {
  .p-card{
    margin-top:2rem;
  }
}

.p-card{
  width: 30rem ;
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

:deep(.p-card-content) {
  margin: 0 20px;
  height: 90%;
}

.subtitle {
  color: #64748b;
}

span{
  max-width: 90%;
}

.project-list {
  display: block;
  justify-content: center;
  overflow: auto;
  height: auto;
  max-height: 680px;
}

:deep(div.p-card-content){
  display: block;
  justify-content: center;
  overflow: auto;
  height: auto;
  max-height: 680px;
}

.project{
  background-color:#D9D9D9;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgb(197, 197, 197);
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 10px;
  height: 120px;
  transition: transform 0.2s ease;
}
.project:hover{
  cursor:pointer;
  transform: scale(1.04, 1.04);
}

.tipo-proyecto{
  font-size: 0.8rem;
}

h4{
  margin: 1px
}

.postulantes{
  margin-top: 10px;
  color: #3554BC
}

:deep(.p-progressbar){
  width: 70%;
  align-self: center;
  height: 30%;
  margin-top: 5px;
}

:deep(.p-progressbar .p-progressbar-value){
  background: linear-gradient(to right, #3554BC, #B864F3);
}

:deep(.p-dialog) {
  border-radius: 12px;
  background-color: #3554BC;
  display:block;
}

:deep(.p-rating .p-rating-item.p-rating-item-active .p-rating-icon) {
  color: gold;
}

:root(.p-dialog.p-component.p-ripple-disabled){
  display: block !important;
}

.project.applicant{
  height: 100%;
}
.applicants-list{
  height:100vh;
}
:root(.p-dialog-content){
  height: 100vh;
}

:deep(.p-button){
  background:#3554BC;
  border:none;
}


.choose-dev:hover{
  background: #B864F3;
}
</style>
