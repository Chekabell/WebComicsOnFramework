<script>
import {useAuthStore} from "@/stores/AuthStore.js";
import router from "@/routers";



export default {
  computed:{
    authStore(){
      return useAuthStore()
    }
  },
  methods:{
      async login(){
      await this.authStore.login()
      if(!this.authStore.authError){
        console.log('no error')
        await router.push({name: 'main'})
      } else{
        console.log('error')
        this.authStore.logout()
      }
    }
  }
}

</script>

<template>
  <v-sheet
    class=" flex-column justify-center align-center d-flex rounded-xl ma-9 pa-5">
    <h3>Вход</h3>
    <v-form class="mt-2" @submit.prevent="login()">
        <small v-if="authStore.authError">
          {{ authStore.authError.username?.toString() || authStore.authError.detail}}
        </small>
        <v-text-field min-width="400" type="text" variant="outlined" v-model="authStore.username" label="Логин"/>
        <small v-if="authStore.authError">
          {{authStore.authError.password?.toString() || authStore.authError.detail}}
        </small>
        <v-text-field min-width="400" type="password" variant="outlined" v-model="authStore.password" label="Пароль"/>
      <v-btn block color="secondary" type="submit">Войти</v-btn>
    </v-form>
    <p class="mt-2">Нет аккаунта?</p>
    <RouterLink id = "redirect" :to="{name: 'register'}">Зарегистрироваться</RouterLink>
  </v-sheet>
</template>

<style scoped>
</style>
