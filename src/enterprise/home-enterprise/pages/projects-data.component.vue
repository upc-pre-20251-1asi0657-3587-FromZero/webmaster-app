<script>
import { inject, ref, watch } from "vue";
import ProjectsPanelComponent from "../components/projects-panel.component.vue";
import { ProjectService } from "../../../../public/services/project.service.js";
import { ProjectEntity } from "../../../shared/models/project.model.js";

export default {
  name: "projects-list",
  components: { ProjectsPanelComponent },
  setup() {
    const enterpriseId = inject("enterpriseId"); // ✅ Inyectado desde padre
    const projectService = new ProjectService();
    const myProjects = ref([]); // ✅ Proyectos reactivos

    // Función para cargar proyectos
    const loadProjects = async (id) => {
      try {
        const projects = await projectService.getProjectByEnterprise(id);
        myProjects.value = projects.map(p => new ProjectEntity({
          project_ID: p.project_ID,
          nameProject: p.nameProject,
          enterprise_id: p.enterprise_id,
          applicants_id: p.applicants_id,
          developer_id: p.developer_id,
          stateProject: p.stateProject,
          projectProgressBar: p.projectProgressBar,
          started: p.started
        }));
      } catch (error) {
        console.error("No se pudieron cargar los proyectos:", error.response?.data || error);
      }
    };

    // Watcher para cargar proyectos cuando enterpriseId esté disponible
    watch(
        () => enterpriseId,
        (id) => {
          if (id) {
            loadProjects(id);
          }
        },
        { immediate: true }
    );

    // Handler para asignar desarrollador
    const applicantHandler = async ({ numberProjectId, numberApplicant }) => {
      try {
        await projectService.assignDeveloper(numberProjectId, { developer_id: numberApplicant });
        // Recargar proyectos tras asignar
        await loadProjects(enterpriseId);
      } catch (err) {
        console.error("Error asignando developer:", err.response?.data || err);
      }
    };

    return {
      myProjects,
      applicantHandler
    };
  }
};
</script>

<template>
  <div v-if="myProjects">
    <ProjectsPanelComponent
        :projects="myProjects"
        @chooseDeveloper="applicantHandler"
    />
  </div>
</template>
