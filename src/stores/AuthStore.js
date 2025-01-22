import {defineStore} from 'pinia'
import {getNewToken, createNewUser} from "@/api/user.js";
import {ref} from "vue";
import router from "@/routers";
import {useUserStore} from "@/stores/UserStore";

export const useAuthStore = defineStore('auth', () =>{
  const token = ref(localStorage.getItem('token')?.toString())
  const password = ref('')
  const re_password = ref('')
  const username = ref('')
  const authError = ref('')

  const login = async () => {
    try {
      const newToken = await getNewToken(username.value, password.value)
      token.value = newToken
      localStorage.setItem('token', newToken)
      await useUserStore().getUser()
    } catch (e) {
      authError.value = e.response || 'Произошла ошибка'
    }
  };

  const register = async () => {
    try {
      const newToken = await createNewUser(username.value, password.value)
      token.value = newToken
      localStorage.setItem('token', newToken)
      await useUserStore().getUser()
    } catch (e) {
      authError.value = e.response  || 'Произошла ошибка';
    }
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('token')
    password.value = '';
    username.value = '';
    router.push({name: 'main'})
  }

  return {
    login,
    register,
    logout,
    username,
    password,
    re_password,
    authError,
    token
  };
})
