<template>
  <Tag :value="label" :severity="severity" />
</template>

<script>
import Tag from 'primevue/tag';
import { TRUCK_STATUS_TO_LABEL } from '../constants';

export default {
  components: {
    Tag
  },
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    label() {
      return TRUCK_STATUS_TO_LABEL[this.status] || 'Unknown Status';
    },
    severity() {
      switch (this.status) {
        case 'TO_JOB':
        case 'RETURNING':
          return 'warning';
        case 'LOADING':
          return 'info';
        case 'AT_JOB':
          return 'success';
        case 'OUT_OF_SERVICE':
          return 'danger';
        default:
          return 'default';
      }
    }
  }
};
</script>
