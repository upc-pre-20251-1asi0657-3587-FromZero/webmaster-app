<script>
import DevDataComponent from "../../../developer/home-developer/pages/dev-data.component.vue";
import ProjectsDataComponent from "./projects-data.component.vue";

export default {
  name: "home-page",
  components: {DevDataComponent, ProjectsDataComponent},
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <div class="main-container">
    <dev-data-component/>
    <projects-data-component/>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 6rem;
}
</style>
