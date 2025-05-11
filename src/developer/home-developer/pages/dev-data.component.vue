<script>
import DevMainPageComponent from "../components/dev-main-page.component.vue";
import {DeveloperEntity} from "../../../shared/models/developer.model.js";
import {AuthService} from "../../../../public/services/auth.service.js";
import {HomeService} from "../../../../public/services/home.service.js";

export default {
  name: "developer-data-component",
  components:{DevMainPageComponent},
  data(){
    return{
      homeService : new HomeService(),
      myDev:null,
      developer:null,
      developerId: null
    }
  },
  created() {
    const userId = localStorage.getItem('user id');
       this.homeService.getDevProfileByUserId(userId)
       .then(({ data }) => {
            // 1) Guarda el raw para usar el developer.id
                 this.developer = data;
             // 2) El ID de usuario que necesita el PUT está en data.userId
                 localStorage.setItem('developer id', data.id);
             // 3) Crea tu entidad con el developer.id (PK) y el userId correcto
         this.myDev = new DeveloperEntity(
             data.id,            // developer PK
             data.firstName,      // Asegúrate de que este valor no sea null
             data.lastName,       // Asegúrate de que este valor no sea null
             data.description,
             data.country,
             data.phone,
             data.completed_projects,
             data.specialties,
             data.profileImgUrl,
             {
               id: data.userId,
               mail: data.email
             }
         );
           });

  },
  methods: {
    /*createUser() {
      return this.myDev = new DeveloperEntity(
          this.developer.user_id,
          this.developer.firstName,
          this.developer.lastName,
          this.developer.description,
          this.developer.country,
          this.developer.phone,
          this.developer.completed_projects,
          this.developer.specialties,
          this.developer.profile_img_url,
          this.developer.user
      );
    }*/
  }
}
</script>

<template>
  <div v-if="developer">
    <DevMainPageComponent :developer="myDev"></DevMainPageComponent>
  </div>
</template>

<style scoped>

</style>
