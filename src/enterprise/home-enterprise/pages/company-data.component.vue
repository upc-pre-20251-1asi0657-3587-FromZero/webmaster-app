<script>
import CompanyMainPageComponent from "../components/company-main-page.component.vue";
import { CompanyEntity } from "../../../shared/models/company.model.js";
import { HomeService } from "../../../../public/services/home.service.js";

export default {
  name: "company-data",
  components: { CompanyMainPageComponent },
  data() {
    return {
      homeService: new HomeService(),
      myCom: null,
      enterprise: null
    };
  },
  provide() {
    // Proporcionamos enterpriseId dinámicamente al árbol de componentes
    return {
      get enterpriseId() {
        return this.enterprise?.enterprise_id;
      }
    };
  },
  async created() {
    try {
      const userId = localStorage.getItem("user id");
      const response = await this.homeService.getEnterpriseInfoByID(userId);

      this.enterprise = response.data;

      // Instanciamos CompanyEntity correctamente
      this.myCom = new CompanyEntity(
          this.enterprise.id,
          this.enterprise.enterpriseName,
          this.enterprise.profileImgUrl,
          this.enterprise.description,
          this.enterprise.country,
          this.enterprise.ruc,
          this.enterprise.phone,
          this.enterprise.website,
          this.enterprise.sector,
          this.enterprise.User
      );
    } catch (err) {
      console.error('Error al cargar los datos de la empresa', err);
    }
  }
};
</script>

<template>
  <div v-if="myCom">
    <CompanyMainPageComponent :company="myCom" />
  </div>
</template>
