<script >
import LoginCard from "../components/login-card.component.vue";
import {AuthService} from "../../../public/services/auth.service.js";

export default {
  name: "login",
  components: {LoginCard},
  data(){
    return{
      authService: new AuthService(),
      users:[],
      loggedId:0,
      userType:''
    }
  },
  created() {
    // localStorage.removeItem('user id');
    // localStorage.removeItem('user type');
    // localStorage.removeItem('token');
    // this.authService.getUsers().then((response) => {
    //   this.users = response.data;
    //   console.log(this.users);
    // });
  },
  methods:{
    // handleLogin(userData) {
    //   // userData contendrá user y password enviados desde el componente LoginCard
    //   this.user = userData.user;
    //   this.password = userData.password;
    //
    //   console.log('User:', this.user);
    //   console.log('Password:', this.password);
    //
    //   // Iterar sobre los usuarios y comparar credenciales
    //   for (let i = 0; i < this.users.length; i++) {
    //     const currentUser = this.users[i];
    //     if (currentUser.username === this.user && currentUser.password === this.password) {
    //       console.log("Usuario encontrado");
    //       this.loggedId = currentUser.id
    //       this.userType = currentUser.accountType;
    //       console.log(this.loggedId, this.userType);
    //       this.navigateToHome();
    //       return; // Salir del bucle si se encuentra el usuario
    //     }
    //   }
    //   // Si el bucle termina y no se encuentra el usuario
    //   console.log("Usuario no encontrado");
    // },
    navigateToHome() {
      this.saveUserToLocalStorage(this.loggedId,this.userType);
      this.$router.push(`/main/${this.userType}/${this.loggedId}`);
    },
    saveUserToLocalStorage(id, type) {
      const idJSON = id;
      const typJSON =(type);
      const tokenJSON = this.token;

      localStorage.setItem('user id', idJSON);
      localStorage.setItem('user type', typJSON);
      localStorage.setItem('token', tokenJSON);
    },
    async handleLogin(userData) {
      console.log("hola", userData);
      this.user = userData.Mail;
      this.password = userData.Password;

      try {
        const response = await this.authService.authenticate(this.user, this.password);
        console.log(response);

        this.loggedId = response.id;
        const role = response.roles[0];
        this.userType = role === "ROLE_ENTERPRISE" ? "enterprises" :
            role === "ROLE_DEVELOPER" ? "developers" : null;
        this.token = response.token;

        this.saveUserToLocalStorage(this.loggedId, this.userType, this.token);
        this.navigateToHome();
      } catch (error) {
        console.log("Usuario no encontrado");
      }
    },
  }
}
</script>

<template>

  <login-card @login="handleLogin"/>

</template>

<style scoped>

</style>