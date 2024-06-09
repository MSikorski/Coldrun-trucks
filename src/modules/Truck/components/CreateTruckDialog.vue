<template>
  <div>
    <Button label="Add Truck" icon="pi pi-plus" @click="createTruckForm.visible = true"/>
    <Dialog header="Create Truck" v-model:visible="createTruckForm.visible" :modal="true" :closable="true" class="w-1/3">
      <div class="p-fluid">
        <div class="absolute w-full h-full flex justify-center items-center">
          <ProgressSpinner class= "w-12 relative loader" :class="{ 'block': createTruckForm.loading , 'hidden': !createTruckForm.loading  }" />
        </div>
        <Message :severity="'error'" :visible="createTruckForm.error" :class="{ 'block': createTruckForm.error , 'hidden': !createTruckForm.error  }">
          {{ createTruckForm.error }}
        </Message>
        <Divider />
        <FloatLabel class="mt-8">
          <InputText id="truckCode" v-model="createTruckForm.values.code"
                     :class="{'p-invalid': !createTruckForm.values.code && createTruckForm.submitted}"/>
          <label for="truckCode">Code</label>
        </FloatLabel>
        <small v-if="!createTruckForm.values.code && createTruckForm.submitted" class="p-error">Code is required.</small>

        <Divider />
        <FloatLabel class="mt-8">
          <InputText id="truckName" v-model="createTruckForm.values.name"
                     :class="{'p-invalid': !createTruckForm.values.name && createTruckForm.submitted}"/>
          <label for="truckName">Name</label>
        </FloatLabel>
        <small v-if="!createTruckForm.values.name && createTruckForm.submitted" class="p-error">Name is required.</small>

        <Divider />
        <FloatLabel class="mt-8">
          <Textarea id="truckDescription" rows="10" v-model="createTruckForm.values.description" class="resize-y" />
          <label for="truckDescription">Description</label>
        </FloatLabel>

        <Divider />
        <FloatLabel class="mt-8">
          <Dropdown id="truckStatus" :options="statusOptions" option-label="label" option-value="value"
                    v-model="createTruckForm.values.status"
                    :class="{'p-invalid': !createTruckForm.values.status && createTruckForm.submitted}"/>
          <label for="truckStatus">Status</label>
        </FloatLabel>
        <small v-if="!createTruckForm.values.status && createTruckForm.submitted" class="p-error">Status is required.</small>

      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="createTruckForm.visible = false" class="p-button-outlined"/>
        <Button label="Save" icon="pi pi-check" @click="createTruck" :disabled="!isCreateTruckFormValid"/>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { TRUCK_STATUS_TO_LABEL, MODULE_ID, ACTION_CREATE_TRUCK } from '../constants';

export default defineComponent({
  name: 'CreateTruckDialog',
  components: {
    Button,
    Dialog,
    FloatLabel,
    InputText,
    Textarea,
    Dropdown,
    Divider,
    Message,
    ProgressSpinner,
  },
  computed: { ...mapGetters(MODULE_ID, ['createTruckForm', 'isCreateTruckFormValid']) },
  methods: { ...mapActions(MODULE_ID, [ACTION_CREATE_TRUCK])},
  setup() {
    const statusOptions = Object.entries(TRUCK_STATUS_TO_LABEL).map(([value, label]) => ({ value, label }));

    return {
      statusOptions,
    };
  }
});
</script>
<style scoped>
  .loader {
    z-index: 1200;
  }
</style>