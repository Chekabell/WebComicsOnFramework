<script>

import router from "@/routers";
import {getOneProject} from "@/api/projects";

export default {
  data(){
    return{
      project: {},
      idProject: router.currentRoute._value.params.id
    }
  },
  created() {
    this.$watch(()=> this.$route.params.id, (newId) =>{
      this.getOneProject(newId)
    })
  },
  methods:{
    async getOneProject(id){
      try{
        this.project = await getOneProject(id)
      } catch (e){
        console.log(e.response)
      }
    },
    redirect(){
      window.location.href = this.project.url
    }
  },
  mounted(){
    this.getOneProject(router.currentRoute._value.params.id)
  },
}
</script>

<template>
    <v-sheet class="d-flex justify-center align-center rounded-xl ma-9 pa-9">
        <v-container class="fill-height w-33 d-flex flex-column justify-start align-center">
          <v-img class="w-100 pb-3" :src="project.image"/>
          <v-btn @click="redirect()"  color="secondary" block>Читать</v-btn>
        </v-container>
        <v-container>
          <h3 class="">{{project.rating}} <v-icon class="mb-2" icon="mdi-star"/></h3>
          <h3>{{project.type}}·{{project.year_release}}</h3>
          <h1>{{project.title}}</h1>
          <v-list v-if="project.tags">
            <v-chip class="mr-1 mb-1" color="primary" variant="flat" v-for="tag in this.project.tags" :key="tag">{{tag}}</v-chip>
          </v-list>
          <h3>Описание</h3>
          <p>{{project.description}}</p>
        </v-container>
    </v-sheet>
</template>

<style scoped>
</style>
