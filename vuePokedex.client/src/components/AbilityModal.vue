<template>


    <div class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="modalHeader">
            
            </slot>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <slot name="modalBody">

          </slot>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {
  setup(){
    return {
      activeAbility: computed(()=> AppState.activeAbility),
      activeMove: computed(()=> AppState.activeMove)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>