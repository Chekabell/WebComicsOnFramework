<script>
import router from "@/routers/index";
import {useUserStore} from "@/stores/UserStore";
import {useAuthStore} from "@/stores/AuthStore";
import {getProjects} from "@/api/projects";

export default {
  data(){
    return{
      search: "",
      searchData: [],
      showData: false
    }
  },
  mounted() {
    if (useAuthStore().token !== null  ) {
      useUserStore().getUser()
    }
    this.getSearchData()
  },
  computed:{
    router(){
      return router
    },
    username(){
      return useUserStore().user == null ? "" : useUserStore().user.username?.toString()
    }
  },
  methods:{
    logout(){
      useAuthStore().logout()
      useUserStore().user = null
    },
    async getSearchData(){
      try{
        const response = await getProjects()
        let data = []
        response.forEach((el) => {
          data.push([el.id, el.image, el.title, el.rating])
        })
        this.searchData = data
      } catch(e){
        alert('Ошибка запроса в базу данных')
      }
    },
    updateData(){
      if(this.search === "") return this.searchData
      return ((this.searchData.filter(item => {
        return item[2].toLowerCase().includes(this.search.toLowerCase())
      })))
    },
    redirect(page){
      this.search = ""
      this.updateData()
      this.router.push({name:'projectID', params:{id: page}})
    }
  }
}

</script>

<template>
  <v-toolbar density="comfortable">
    <v-btn rounded="0" variant="text" class = "fill-height text-uppercase font-weight-bold text-h4" @click="router.push({name: 'main'})">Главная</v-btn>
      <v-container class="fill-height">
        <v-text-field @input="updateData()"
          v-model="search"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          hide-details
          single-line
        >
          <v-menu class="w-50" max-height="300" activator="parent">
            <v-list>
              <v-list-item v-for="(item, index) in updateData()" :key="index"
                      @click="redirect(item[0])">
                <v-card variant="text" class="d-flex w-100">
                  <v-img max-height="150" min-width="50" cover :src="item[1]"/>
                  <v-card-item class="w-75">
                    <v-card-title>{{item[2]}}</v-card-title>
                    <v-card-subtitle>{{item[3]}}</v-card-subtitle>
                  </v-card-item>
                </v-card>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-text-field>
      </v-container>
      <v-container class="fill-height">
        <v-col class = "fill-height d-flex justify-center">
          <v-btn min-width="300" rounded="0" class="fill-height font-weight-bold text-h4" v-if = "username === ''" @click="router.push({name: 'login'})">Войти</v-btn>
          <v-btn min-width="300" rounded="0" class="fill-height font-weight-bold text-h4" v-else @click="router.push({name: 'homepage'})">
            {{username}}
            <v-menu transition="slide-y-transition" activator="parent" open-on-hover>
              <v-btn rounded="0" class="text-uppercase text-h5">Закладки</v-btn>
              <v-btn rounded="0" class="text-uppercase text-h5" @click ="router.push({name: 'addproject'})">Добавить проект</v-btn>
              <v-btn rounded="0" class="text-uppercase text-h5" @click ="logout()">Выйти</v-btn>
            </v-menu>
          </v-btn>
        </v-col>
      </v-container>
  </v-toolbar>
  <router-view/>
</template>

<style scoped>
.fill-height{
  padding-bottom: 0;
  padding-top: 0;
}
</style>
