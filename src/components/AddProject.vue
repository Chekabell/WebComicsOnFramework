<script>

import {addProject, getComicsTypes, getTags} from "@/api/projects";
import router from "@/routers";
export default {
  data(){
    return{
      projectName: "",
      description: "",
      url: "",
      comicsTypeThisComics: null,
      tagsThisComics: [],
      file: [],
      tags: [],
      comicsTypes: []
    }
  },
  mounted() {
    this.getTags()
    this.getComicsTypes()
  },
  methods:{
    async getTags(){
      try{
        this.tags = await getTags()
      } catch(e){
        alert('Ошибка запроса в базу данных')
      }
    },
    async getComicsTypes(){
      try{
        const response = await getComicsTypes()
        let data = []
        response.forEach((el) =>{
          data.push(el.name)
        })
        this.comicsTypes = data
      } catch(e){
        alert('Ошибка запроса в базу данных')
      }
    },
    async submit(){
      try {
        await addProject(this.projectName,this.description, this.url, this.comicsTypeThisComics, this.file)
        await router.push({name: 'main'})
      } catch (e) {
        console.log(e.response)
      }
    }
  }

}
</script>

<template>
  <v-sheet
    class="flex-column justify-center align-center d-flex rounded-xl ma-9 pa-9">
    <v-form class="d-flex flex-column align-center w-75" @submit.prevent="submit">
      <v-text-field class="w-100" clearable v-model="projectName" variant="outlined" label="Название проекта" />
      <v-textarea class="w-100" clearable v-model="description" variant="outlined" label="Краткое описание"/>
      <v-text-field class="w-100" clearable v-model="url" variant="outlined" label="Вставьте ссылку на первую страницу"/>
      <v-select class="w-100" clearable :items="comicsTypes" v-model="comicsTypeThisComics" variant="outlined" label="Выберите тип комикса"/>
<!--      <v-select class="w-100" clearable multiple :items="tags" v-model="tagsThisComics" variant="outlined" label="Выберите теги"/>-->
      <v-file-input class="w-100" clearable show-size prepend-icon="" v-model="file"  accept="image/png, image/jpg, image/jpeg" variant="outlined" label="Прикрепите картинку"></v-file-input>
      <v-btn color="secondary" type="submit" class="w-50">Отправить</v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>
