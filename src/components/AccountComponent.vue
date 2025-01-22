<script>
  import {useAuthStore} from "@/stores/AuthStore";

  export default {
    computed:{
      authStore(){
        return useAuthStore()
      },
      getUsername(){
        return this.authStore.username
      }
    }
  }
</script>

<template>
  <section>
    <div class="content content-mod">
      <div id = "acc-plate">
        <div id = "acc-plate-avatar">
          <img :src = "`/profilephoto/nophoto.png`" alt = "Картинка не хочет находиться"/>
        </div>
        <div id = "acc-plate-info">
          <span>Имя пользователя:</span>
          <span>{{getUsername}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

body{
    margin: 0;
    background-color: var(--background-color);
}

#acc-plate{
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
}

#acc-plate-avatar{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1%;
    width: 30%;
}

#acc-plate-avatar span:hover{
    cursor: pointer;
    color: aqua;
}

#acc-plate-avatar img{
    border-width: 2px;
    border-style: solid;
    border-color: aliceblue;
    border-radius: 15px;
    background-color: black;
    max-width: 100%;
    max-height: 70%;
}

#acc-plate-info{
    width: 70%;
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: center;
}

#acc-plate-avatar form{
    width: 90%;
}
</style>
