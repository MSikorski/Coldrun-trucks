<template>
  <div class="w-screen h-screen flex flex-col p-3">
    <HeaderComponent />
    <div class="content overflow-hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from './HeaderComponent.vue';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    HeaderComponent,
  }
});
</script>
<style scoped>
  .content {
    height: calc(100vh - 65px);
  }
</style>