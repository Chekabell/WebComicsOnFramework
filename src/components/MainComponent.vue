<script>
import HotRelease from "@/components/HotRelease.vue";
import {getProjects} from "@/api/projects.js";

export default {
  name: 'MainComponent',
  components: {HotRelease},
  data(){
    return {
      hotReleases: []
    }
  },
  mounted() {
    this.getProjects()
  },
  methods:{
    async getProjects(){
      try{
        this.hotReleases = await getProjects()
      } catch(e){
        alert('Ошибка запроса в базу данных')
      }
    }
  },
}
</script>

<template>
  <hot-release :comics="hotReleases"></hot-release>
</template>

<style scoped>
</style>
