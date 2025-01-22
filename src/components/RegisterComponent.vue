<script>
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.js";
export default {
  data(){
    return {
      username: ''
    }
  },
  computed:{
    authStore(){
      return useAuthStore()
    },
    router(){
      return useRouter()
    }
  },
  methods:{
    async register(){
      await this.authStore.register()
      if(!this.authStore.authError){
        console.log('no error register')
        await this.router.push({name: 'main'})
      } else{
        console.log('error register', this.authStore.authError)
      }
    }
  }
}
</script>

<template>
    <v-sheet
    class=" flex-column justify-center align-center d-flex rounded-xl ma-9 pa-5">
      <h3>Регистрация</h3>
      <v-form class="mt-2" @submit.prevent="register()">
        <small v-if="authStore.authError">
          {{ authStore.authError.username?.toString() || authStore.authError.detail}}
        </small>
        <v-text-field min-width="400" type="text" variant="outlined" v-model="authStore.username" label="Логин"/>
        <small v-if="authStore.authError">
          {{authStore.authError.password?.toString() || authStore.authError.detail}}
        </small>
        <v-text-field min-width="400" type="password" variant="outlined" v-model="authStore.password" label="Пароль"/>
        <v-btn block color="secondary" type="submit">Зарегистрироваться</v-btn>
      </v-form>
      <p class="mt-2">Уже есть аккаунт?</p>
      <RouterLink :to="{name: 'login'}">Войти</RouterLink>
    </v-sheet>
</template>

<style scoped>
</style>

