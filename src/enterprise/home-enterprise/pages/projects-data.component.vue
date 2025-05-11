<script>
import { ref, onMounted } from "vue";
import ProjectsPanelComponent from "../components/projects-panel.component.vue";
import { ProjectService } from "../../../../public/services/project.service.js";
import { ProjectEntity } from "../../../shared/models/project.model.js";

export default {
  name: "projects-list",
  components: { ProjectsPanelComponent },
  setup() {
    const myProjects = ref([]);
    const projectService = new ProjectService();

    const loadProjects = async () => {
      const entId = parseInt(localStorage.getItem("user id"), 10);
      if (!entId) return;
      try {
        let list = await projectService.getProjectByEnterprise(entId);
        // filtramos los type === 0
        list = list.filter(p => p.type !== 0);
        myProjects.value = list.map(p => new ProjectEntity({
          project_ID:         p.id,
          nameProject:        p.name,
          descriptionProject: p.description,
          type:               p.type,
          budget:             p.budget,
          methodologies:      p.methodologies,
          projectProgressBar: p.progress,
          stateProject:       p.state,
          enterprise_id:      p.enterpriseId,
          applicants_id:      p.applicants   || [],
          developer_id:       p.developerId  || null,
          started:            p.started
        }))
        console.log("Proyectos cargados:", myProjects.value);
      } catch (err) {
        console.error("No se pudieron cargar los proyectos:", err.response?.data || err);
      }
    };

    onMounted(loadProjects);

    const applicantHandler = async ({ numberProjectId, numberApplicant }) => {
      try {
        await projectService.assignDeveloper(numberProjectId, { developer_id: numberApplicant });
        await loadProjects();
      } catch (err) {
        console.error("Error asignando developer:", err.response?.data || err);
      }
    };

    return { myProjects, applicantHandler };
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
