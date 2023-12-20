<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2 col-4 bg-danger text-white text-shadow">
        <section class="row">
          <div class="col-12 my-4"> </div>
          <p style="text-transform: capitalize;" v-for="pokemon in caughtPokemon" :key="pokemon.name" @click="setActivePokemon(pokemon)" class="selectable col-12" >
            {{ pokemon.name }}
          </p>
        </section>
      </div>
      </section>
      </div>
</template>


<script>
import { watchEffect } from "vue";
import { itemsService } from "../services/ItemsService";
import Pop from "../utils/Pop";

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
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>