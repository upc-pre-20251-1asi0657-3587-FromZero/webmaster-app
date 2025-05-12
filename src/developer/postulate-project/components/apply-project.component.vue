<script>
import { ProjectService } from "../../../../public/services/project.service.js";
import { ProjectEntity } from "../../../shared/models/project.model.js";

export default {
  name: "apply-project",
  data() {
    return {
      showButtons: false,
      showBlurEffect: false,
      projectService: new ProjectService(),
      developerId: localStorage.getItem("user id"),
    };
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasApplied() {
      return this.project.candidates.some(candidate => candidate.userId === Number(this.developerId));
    }
  },
  methods: {
    sendApplicant() {
      let developer_Id = localStorage.getItem('user id');
      let project_Id = localStorage.getItem('project id');
      // let entity = { developerUserId: developer_Id };
      this.projectService.addApplicant(project_Id, Number(developer_Id));
    },
    showTemplate() {
      this.showBlurEffect = true;
      this.$confirm.require({
        group: 'templating',
        header: 'Confirmation',
        message: '¿Estás seguro de que quieres postular al proyecto?',
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        rejectClass: 'p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Rechazar',
        acceptLabel: 'Aceptar',
        accept: () => {
          this.sendApplicant();
          this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          this.showBlurEffect = false;
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          this.showBlurEffect = false;
        },
        onHide: () => {
          this.showBlurEffect = false;
        }
      });
    },
    checkProjectState() {
      if (this.project.stateProject === 'Developing') {
        this.showButtons = true;
      } else {
        this.showButtons = false;
      }
    }
  },
  mounted() {
    this.checkProjectState();
  }
};

</script>

<template>
  <div class="bg-white w-8 " :class="{ 'blur-effect': this.showBlurEffect }" aria-label="Main Content">
    <pv-splitter style="height: auto" layout="vertical">
      <pv-splitter-panel class="flex align-items-center justify-content-center" style="flex-grow: 1" aria-label="Header Panel">
        <img src="https://imgur.com/23QQKri.jpg" alt="" class="mr-8" aria-hidden="true">
        <h2>{{project.nameProject}}</h2>
        <pv-button label="" text plain class="p-d-none p-d-lg-flex p-jc-center p-ai-center ml-5 justify-content-center" v-if="showButtons" aria-label="Show Buttons">
          <img src="https://imgur.com/yclQG0L.jpg" alt="" aria-hidden="true">
        </pv-button>
        <pv-button severity="contrast" class="p-2 text-xl ml-3 p-text-truncate justify-content-center" outlined v-if="showButtons" aria-label="Entregable Button">
          {{$t('apply-project-part1')}}
        </pv-button>
      </pv-splitter-panel>
      <pv-splitter-panel class="p-d-flex p-flex-column p-align-center" style="flex-grow: 1" aria-label="Description Panel">
        <div class="description p-d-flex p-flex-column p-align-center" aria-label="Description">
          <h3 class="p-mb-0 pl-3">{{$t('apply-project-part2')}}</h3>
          <p class="p-text-center px-5">
            {{project.descriptionProject}}
          </p>
        </div>
      </pv-splitter-panel>
    </pv-splitter>

    <pv-splitter style="height: auto" layout="vertical" aria-label="Splitter for Technologies and Budget">
      <!-- Primer Panel Verticalmente -->
      <pv-splitter-panel style="flex-grow: 1" aria-label="Technologies Panel">
        <!-- Primer Splitter Horizontalmente -->
        <pv-splitter layout="horizontal" aria-label="Splitter for Technologies">
          <pv-splitter-panel style="flex-grow: 1" aria-label="Languages Panel">
            <h2 style="text-align: center;">{{$t('apply-project-part3')}}</h2>
            <div style="display: flex;">
              <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: center;">
                <h3 class="text-center">{{$t('apply-project-part4')}}</h3>
                <ul class="p-d-flex p-flex-column p-p-0 p-mb-0">
                  <li v-for="(language, index) in project.languages" :key="index" class="p-mb-2">{{ language }}</li>
                </ul>
              </div>
              <div style="flex-grow: 1; display: flex; flex-direction: column; align-items: center;">
                <h3 class="text-center">Frameworks</h3>
                <ul class="p-d-flex p-flex-column p-p-0" style="list-style-position: inside; padding-left: 0;">
                  <li v-for="(framework, index) in project.frameworks" :key="index" class="p-mb-4">{{ framework }}</li>
                </ul>
              </div>
            </div>
          </pv-splitter-panel>
          <pv-splitter-panel style="flex-grow: 1" aria-label="Budget Panel">
            <h2 style="text-align: center;">{{$t('apply-project-part5')}}: S/{{project.budget}}</h2>
            <p class="px-5">{{project.budgetDescription}}</p>
          </pv-splitter-panel>
        </pv-splitter>
      </pv-splitter-panel>

      <!-- Segundo Panel Verticalmente -->
      <pv-splitter-panel style="flex-grow: 1" aria-label="Resources and Processes Panel">
        <!-- Segundo Splitter Horizontalmente -->
        <pv-splitter layout="horizontal" aria-label="Splitter for Resources and Processes">
          <pv-splitter-panel style="display: flex; flex-direction: column;" aria-label="Resources Panel">
            <h2 class="text-center">{{$t('apply-project-part6')}}</h2>
            <div class="p-d-flex p-jc-center p-ai-center bg-bluegray-400" style="overflow-x: auto; max-height: 300px;">
              <div class="p-d-flex p-jc-start p-ai-center icon-container" style="white-space: nowrap; width: 100%; max-width: 25vw;">
                <i class="pi pi-file text-8xl text-black-alpha-90 pr-3" aria-label="Recurso 1">
                  <p class="m-0 text-center text-black-alpha-90 text-2xl">Recurso 1</p>
                </i>
                <i class="pi pi-file text-8xl text-black-alpha-90 pr-3" aria-label="Recurso 2">
                  <p class="m-0 text-center text-black-alpha-90 text-2xl">Recurso 2</p>
                </i>
                <!-- Agregar más elementos de recurso aquí -->
              </div>
            </div>
          </pv-splitter-panel>

          <pv-splitter-panel style="flex-grow: 1" aria-label="Processes Panel">
            <h2 class="text-center">{{$t('apply-project-part7')}}</h2>
            <ol aria-label="Development Processes List">
              <li v-for="(methodologies, index) in project.methodologies" :key="index">{{ methodologies }}</li>
            </ol>
          </pv-splitter-panel>
        </pv-splitter>
      </pv-splitter-panel>
    </pv-splitter>

    <pv-confirm-dialog group="templating" class="custom-dialog" aria-label="Confirmation Dialog">
      <template #message="slotProps">
        <div class="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
          <i :class="slotProps.message.icon" class="text-5xl text-primary-500"></i>
          <p>{{ slotProps.message.message }}</p>
        </div>
      </template>
    </pv-confirm-dialog>

    <div class="d-flex justify-content-center mt-5" aria-label="Postulation Section">
      <div style="text-align: center;">
        <pv-toast></pv-toast>
        <pv-button v-if="!hasApplied" @click="showTemplate()" :label="$t('apply-project-part8')" severity="contrast" class="text-3xl my-3" outlined aria-label="Postulation Button"></pv-button>
        <p v-if="hasApplied" class="text-center">Ya te has postulado a este proyecto.</p>
      </div>
    </div>
  </div>

</template>

<style>
.custom-dialog .text-5xl {
  font-size: 5.5rem !important;
}

.custom-dialog .text-primary-500 {
  color: #b864f3 !important;
}

.custom-dialog .p-dialog-footer .p-button {
  margin: 1rem;
  padding: 0.75rem 1.5rem; /* Ajusta el padding de los botones para hacerlos más grandes */
  font-size: 1.25rem;
}

.custom-dialog .p-dialog .p-dialog-footer {
  justify-content: center; /* Centra los botones horizontalmente */
}

.custom-dialog .blur-effect {
  filter: blur(2px);
}

.custom-dialog .p-button.p-button-outlined {
  border-color: #B864F3;
  background-color: transparent;
  color: #B864F3;
}

.custom-dialog .p-button{
  background: #b864f3;
  color: #ffffff;
  border-color: #b864f3;
}

</style>
