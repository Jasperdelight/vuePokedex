<template>
  <div class="container-fluid">
    <section class="row">

      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-md-5 col-12"><button v-if="previousPG != null" @click="previousPage()" class="btn btn-secondary text-black"> Prev</button></div>
        <div class="col-md-2 col-12 d-flex align-items-center" title="Page Number">{{ pageCount }}</div>
        <div class="col-md-5 col-12"><button @click="nextPage()" class="btn btn-secondary text-black">Next</button></div>
          <p style="text-transform: capitalize;" v-for="ability in allAbilities" :key="ability.name" class="selectable col-12" >
            
          </p>
        </section>
      </div>
      <section class="col-10">
        <div class="col-12 text-center">

        </div>
      </section>


    </section>
  </div>
</template>


<script>
import { computed, watchEffect } from "vue";
import { abilitiesService } from "../services/AbilitiesService";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";

export default {
  setup(){
    async function getAbilities(){
      try{
          await abilitiesService.getAbilities()
      } catch(error) {
          Pop.error(error.message);
      }
    }
    watchEffect(() => {
      getAbilities();
    })
    return {
      pageCount: (0),
      allAbilities: computed (() => AppState.allAbilities),

      async nextPage() {
                try {
                    this.pageCount++;
                    await abilitiesService.nextPage();
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },
            async previousPage() {
                try {
                    this.pageCount--;
                    await abilitiesService.previousPage();
                }
                catch (error) {
                    Pop.error(error.message);
                }
            }

    }
  }
}
</script>


<style lang="scss" scoped>

</style>