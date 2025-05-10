<script >
import {AuthService} from "../../../public/services/auth.service.js";

export default {
  name:'register-card',
  data() {
    return {
      authService: new AuthService(),
      selectedRole: null,
      roleOptions: [
        { label: 'Empresa', value: 'empresa' },
        { label: 'Desarrollador', value: 'desarrollador' }
      ],
      mail: "",
      password: "",
      firstName: "",
      lastName: "",
      companyName: ""
    };
  },
methods:{
  async registerAccount() {
    if (this.selectedRole === 'empresa') {
      const enterpriseData = {
        username: this.mail,
        password: this.password,
        enterpriseName: this.companyName
      };
      try {
        const response = await this.authService.registerEnterprise(enterpriseData);
        console.log("Empresa creada:", response);
        this.$router.push('/login');
      } catch (error) {
        console.error("Error al registrar empresa", error);
      }
    }

    if (this.selectedRole === 'desarrollador') {
      const developerData = {
        username: this.mail,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      };
      try {
        const response = await this.authService.registerDeveloper(developerData);
        console.log("Desarrollador creado:", response);
        this.$router.push('/login');
      } catch (error) {
        console.error("Error al registrar desarrollador", error);
      }
    }
  }

},
};
</script>

<template>

  <div class="bg-white">
    <div class="mt-5 mx-3">
      <router-link aria-label="go to login" to="/login" class="text-purple-500 text-sm">
        <i class="pi pi-chevron-left" style="font-size: 2rem"></i>
      </router-link>
    </div>

    <div class="flex justify-content-center align-items-center text-center" style="height: 80vh;">

      <pv-card aria-label="Registration Form" class=" flex border-card shadow-4 px-6 ">
        <template #title>
          <div>
            <img src="../../assets/logo.png" alt="Webmaster's logo" width="210" class="-m-2 ">
          </div>

        </template>
        <template #content>
          <div >
            <div class="flex flex-column gap-4 align-items-center">
              <pv-inputText aria-label="Email input field" type="email" v-model="mail" placeholder="Correo electrónico" class="border-round-3xl"/>

              <pv-inputText v-if="selectedRole === 'desarrollador'" aria-label="First name input field" type="text" v-model="firstName" placeholder="Nombre" class="border-round-3xl"/>
              <pv-inputText v-if="selectedRole === 'desarrollador'" aria-label="Last name input field" type="text" v-model="lastName" placeholder="Apellido" class="border-round-3xl"/>
              <pv-inputText v-if="selectedRole === 'empresa'" aria-label="Company name input field" type="text" v-model="companyName" placeholder="Nombre de la empresa" class="border-round-3xl"/>

              <pv-inputText aria-label="Password input field" type="password" v-model="password" placeholder="Contraseña" class="border-round-3xl"/>
              <pv-drop-down aria-label="Role selection dropdown menu" v-model="selectedRole" :options="roleOptions" option-label="label" option-value="value" placeholder="Selecciona un rol" class="border-round-3xl w-12rem "></pv-drop-down>
            </div>

            <pv-button aria-label="Create account button" label="Crear cuenta" class="border-round-xl w-10rem bg-blue-600 text-lg mt-4 mr-1 p-3" @click="registerAccount"/>
          </div>

        </template>
      </pv-card>
    </div>
  </div>


</template>

<style scoped>
.p-button{
  border:0;
}
.border-card{
  border: 2px solid #333333;
  border-radius: 5rem;
}
</style>
