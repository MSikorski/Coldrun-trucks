<template>
  <header class="flex justify-between align-middle shadow-2xl">
    <div class="flex justify-center">
      <Image src="coldrun_logo_inverse.svg" alt="Banner" class="banner-image" width="65px"/>
    </div>
  </header>
</template>

<script>
import Image from 'primevue/image';

export default {
  name: 'HeaderComponent',
  components: {
    Image,
  },
};
</script>
