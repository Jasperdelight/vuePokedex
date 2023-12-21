<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-md-5 col-12"><button v-if="previousPG != null" @click="previousPage()" class="btn btn-secondary text-black"> Prev</button></div>
        <div class="col-md-2 col-12 d-flex align-items-center" title="Page Number">{{ pageCount }}</div>
        <div class="col-md-5 col-12"><button @click="nextPage()" class="btn btn-secondary text-black">Next</button></div>
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
      pageCount: (0),

      async setActiveItem(item){
        logger.log(item.name)
      },
      async nextPage(){
        try{
            this.pageCount++;
            await itemsService.nextPage();
        } catch(error) {
            Pop.error(error.message);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>