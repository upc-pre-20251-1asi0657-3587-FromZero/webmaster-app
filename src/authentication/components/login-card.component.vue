<script >
export default {
  name:'LoginCard',
  data() {
    return {
      Mail: '',
      Password: ''
    };
  },
  methods: {
    login() {
      // Le devuelve los datos al login.component
      this.$emit('login', { Mail: this.Mail, Password: this.Password });
    }
  }
};
</script>

<template>

  <div class="bg-white">

    <div class="mt-5 mx-3 bg-white">
      <i class="pi pi-chevron-left text-purple-500" style="font-size: 2rem"></i>
    </div>

    <div class="flex justify-content-center align-items-center text-center" style="height: 80vh;">
<pv-card aria-label="Login Form" class=" flex border-card shadow-4 px-6 ">
  <template #title>
    <div>
      <img src="../../assets/logo.png" alt="Webmaster's logo" width="210" class="-m-2 ">
    </div>
  </template>
  <template #content>
    <div class=" flex flex-column gap-3 align-items-center">
      <div class="flex flex-column gap-4 ">
        <pv-inputText aria-label="User input field" type="text" v-model="Mail" placeholder="Correo" class="border-round-3xl" @keyup.enter="login"/>
        <pv-password aria-label="Password input field" v-model="Password" :feedback="false" placeholder="Contraseña" class="border-round-3xl" @keyup.enter="login"/>
      </div>

      <pv-button aria-label="Login button" label="Iniciar sesion" class="border-round-xl w-10rem bg-blue-600 text-lg" @click="login"/>
    </div>
    <div class="color-auth font-bold">
      <p>
        <router-link aria-label="Go to password recovery" to="/password-recovery" class="text-purple-500 text-sm">¿Olvidaste tu contraseña?</router-link>
      </p>
      <p class="-mt-1">
        <router-link aria-label="Go to registration page" to="/register" class="text-purple-500 text-sm">Crear cuenta</router-link>
      </p>
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
.color-auth{
  color:#38B397;
}

.border-card{
  border: 2px solid #333333;
  border-radius: 5rem;
}
:deep(body){
  background-color: #F5F5F5 !important;
}

:deep(.p-inputtext){
  border-radius: 1.5rem !important;
}
</style>
