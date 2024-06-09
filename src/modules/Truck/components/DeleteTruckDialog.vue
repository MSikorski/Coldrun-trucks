<template>
  <div>
    <Dialog header="Delete Truck" v-model:visible="deleteTruckDialog.visible" :modal="true" :closable="true">
      <div class="p-fluid">
        <p>{{ generateMessage(deleteTruckDialog.code) }}</p>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="deleteTruckDialog.visible = false" class="p-button-outlined" />
        <Button label="Delete" icon="pi pi-trash" @click="deleteTruck" class="p-button-danger" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import {MODULE_ID, ACTION_DELETE_TRUCK } from '../constants';

const generateMessage = (code: string) => `Do you want to delete truck ${code}?`;

export default defineComponent({
  name: 'DeleteTruckDialog',
  components: {
    Dialog,
    Button,
  },
  computed: { ...mapGetters(MODULE_ID, ['deleteTruckDialog']) },
  methods: {
    ...mapActions(MODULE_ID, [ACTION_DELETE_TRUCK]),
    generateMessage,
  },
});
</script>
