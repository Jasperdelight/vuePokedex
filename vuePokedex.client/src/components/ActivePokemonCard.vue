<template>
  <div class="col-12">
    {{ activePokemon?.name }}
    <img :src="activePokemon?.img" alt="">
  </div>

</template>


<script>
import { Pokemon } from "../models/Pokemon";

export default {
  props:{
    activePokemon: {type: Pokemon, required: true}
  },
  setup(){
    return {
      
    }
  }
}
</script>


<style lang="scss" scoped>

</style>