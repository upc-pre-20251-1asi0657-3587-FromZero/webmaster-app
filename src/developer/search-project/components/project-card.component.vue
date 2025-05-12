<script>

import {CompanyEntity} from "../../../shared/models/company.model.js";
import {DeveloperEntity} from "../../../shared/models/developer.model.js";
import {ProjectEntity} from "../../../shared/models/project.model.js";
import {CompanyExplorerEntity} from "../../../shared/models/companyExplorer.model.js";

export default {
  name: "project-card",
  components: {},
  props: {
    project: {
      type: ProjectEntity,
      required: true
    },
    company: {
      type: CompanyExplorerEntity,
      required: true
    }
  },
  methods: {
    redirectToProfile() {
      localStorage.setItem('enterprise id', this.company.user_id)
      this.$router.push({
        name: 'enterprise-profile',
        params: { id: this.company.user_id },
        state: { company: this.company }
      })
    },

    redirectToPostulate(){
      localStorage.setItem('project id', this.project.project_ID)
      this.$router.push({
        name: 'postulate-project',
        params: { project_id: this.project.project_ID },
        state: { project: this.project, company: this.company }
      });
    }
  },
  created() {
    console.log('Company:', this.company);
  }
}

</script>

<template>

  <pv-card class="w-8 border-round-3xl shadow-4" aria-label="Developer Card" >
    <template #header>
      <div class="flex flex-row align-items-center  mt-4 " aria-label="Header Section">


        <div class=" flex align-items-center ml-3 flex-wrap  w-3">
          <pv-avatar :image="company.profile_img_url" class="mr-2 mt-2" size="xlarge" shape="circle" aria-label="Developer Avatar" />
          <h3 @click="redirectToProfile" aria-label="Developer Name" >{{company.enterprise_name}}</h3>
        </div>

        <div class=" flex justify-content-center align-items-center w-6 overflow-hidden titulo">
          <h3 @click="redirectToPostulate">{{project.nameProject}}</h3>
        </div>

      </div>
    </template>
    <template #title aria-label="Card Title">Description</template>
    <template #content aria-label="Card Content" >
      <p class="m-0">{{project.descriptionProject}}</p>
      <h2 >Budget</h2>
      <P>S/. {{project.budget}}</P>
    </template>
  </pv-card>


</template>

<style scoped>

h3:hover{
  color: #b864f3;
}
.box{
  border:1px solid red;
}

.box1{
  border:1px solid blue;
}

.box2{
  border:1px solid green;
}

@media screen {
  .titulo{
    margin-left:2rem;
  }
}

</style>
