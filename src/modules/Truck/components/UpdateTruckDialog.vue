<template>
  <div>
    <Dialog header="Update Truck" v-model:visible="updateTruckForm.visible" :modal="true" :closable="true" class="w-1/3">
      <div class="p-fluid">
        <div class="absolute w-full h-full flex justify-center items-center">
          <ProgressSpinner class= "w-12 relative loader" :class="{ 'block': updateTruckForm.loading , 'hidden': !updateTruckForm.loading  }" />
        </div>
        <Message :severity="'error'" :visible="updateTruckForm.error" :class="{ 'block': updateTruckForm.error , 'hidden': !updateTruckForm.error  }">
          {{ updateTruckForm.error }}
        </Message>
        <Divider />
        <FloatLabel class="mt-8">
          <InputText id="truckCode" v-model="updateTruckForm.values.code"
                     :class="{'p-invalid': !updateTruckForm.values.code && updateTruckForm.submitted}" />
          <label for="truckCode">Code</label>
        </FloatLabel>
        <small v-if="!updateTruckForm.values.code && updateTruckForm.submitted" class="p-error">Code is required.</small>

        <Divider />
        <FloatLabel class="mt-8">
          <InputText id="truckName" v-model="updateTruckForm.values.name"
                     :class="{'p-invalid': !updateTruckForm.values.name && updateTruckForm.submitted}" />
          <label for="truckName">Name</label>
        </FloatLabel>
        <small v-if="!updateTruckForm.values.name && updateTruckForm.submitted" class="p-error">Name is required.</small>

        <Divider />
        <FloatLabel class="mt-8">
          <Textarea id="truckDescription" rows="10" v-model="updateTruckForm.values.description" class="resize-y" />
          <label for="truckDescription">Description</label>
        </FloatLabel>

        <Divider />
        <FloatLabel class="mt-8">
          <Dropdown id="truckStatus" :options="calculatePossibleStatusChanges(updateTruckForm.values.initialStatus)"
                    option-label="label" option-value="value" v-model="updateTruckForm.values.status"
                    :class="{'p-invalid': !updateTruckForm.values.status && updateTruckForm.submitted}"
          />
          <label for="truckStatus">Status</label>
        </FloatLabel>
        <small v-if="!updateTruckForm.values.status && updateTruckForm.submitted" class="p-error">Status is required.</small>

      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="updateTruckForm.visible = false" class="p-button-outlined" />
        <Button label="Save" icon="pi pi-check" @click="updateTruck" :disabled="!isUpdateTruckFormValid" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { MODULE_ID, ACTION_UPDATE_TRUCK } from '../constants';
import { calculatePossibleStatusChanges } from '../helpers';

export default defineComponent({
  name: 'UpdateTruckDialog',
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
  computed: { ...mapGetters(MODULE_ID, ['updateTruckForm', 'isUpdateTruckFormValid']) },
  methods: { calculatePossibleStatusChanges },
  setup() {
    const store = useStore();
    const updateTruck = () => store.dispatch(`${MODULE_ID}/${ACTION_UPDATE_TRUCK}`)

    return {
      updateTruck,
    };
  }
});
</script>
<style scoped>
  .loader {
    z-index: 1200;
  }
</style>
