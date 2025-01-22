<script>
  import router from "@/routers";

  export default{
    computed: {
      router() {
        return router
      }
    },
    props:{
      comics:{
        type: Array,
        required: true,
      }
    },
  }
</script>

<template>
  <v-slide-group class="mt-1">
    <v-slide-group-item v-for = "value in comics" :key="value">
      <v-card class="ml-2" height="300" width="150" @click="router.push({name:'projectID', params:{id: value.id}})">
        <v-img height="200" width="150" :src="value.image" cover/>
        <v-card-item class="pa-1">
          <v-card-title class="text-subtitle-2 text-wrap">{{value.title}}</v-card-title>
          <v-card-subtitle>{{value.rating}}</v-card-subtitle>
        </v-card-item>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
</template>

<style scoped>


</style>
