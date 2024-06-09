<template>
  <Menubar :model="items">
    <template #start>
      <a href="#" class="brand">Brand</a>
    </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';
import { ref } from 'vue';

export default {
  name: 'NavbarComponent',
  components: {
    Menubar
  },
  setup() {
    const items = ref([
      {
        label: 'Home',
        to: '/'
      },
      {
        label: 'About',
        to: '/about'
      },
      {
        label: 'Contact',
        to: '/contact'
      },
      {
        label: 'Login',
        to: '/login',
        align: 'end'
      }
    ]);

    return { items };
  }
}
</script>

<style>
.brand {
  font-size: 1.5em;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}
</style>
