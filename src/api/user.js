import {$authHost, $host} from "@/api/index.js";
import {useAuthStore} from "@/stores/AuthStore";

export const createNewUser = async (username, password) => {
  const user = await $host.post('auth/users/',{
    username, password
  })
  return user.data.auth_token
}

export const getNewToken = async(username, password) => {
  const user = await $host.post('auth/token/login/',{
    username, password
  })
  return user.data.auth_token
}

export const getUserApi = async() => {
  const user = await $authHost.get('auth/users/me/',{
    headers:{
      'Authorization': 'Token ' + useAuthStore().token
    }
  })
  return user.data
}
