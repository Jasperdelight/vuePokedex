<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-12 my-4"> </div>
          <p style="text-transform: capitalize;" v-for="item in allItems" :key="item.name" @click="setActiveItem(item)" class="selectable col-12" >
            {{ item.name }}
          </p>
        </section>
      </div>
      </section>
      </div>
</template>


<script>
import { computed, watchEffect } from "vue";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";

export default {
  setup(){
    async function getItems(){
      try{
          await itemsService.getItems()
      } catch(error) {
          Pop.error(error.message);
      }
    }
    watchEffect(()=> {
      getItems()
    })
    return {
      allItems: computed(() => AppState.allItems),
      async setActiveItem(item){
        logger.log(item.name)
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>