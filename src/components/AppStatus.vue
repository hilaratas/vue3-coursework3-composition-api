<template>
  <span class="btn btn-small" :class="statusClass">{{ statusName }}</span>
</template>

<script>
import {TASK_STATUS} from '@/settings'

export default {
  name: "AppStatus",
  props: ['type'],
  beforeCreate() {
    this.statuses = TASK_STATUS
  },
  computed: {
    statusName() {
      return this.statuses[this.type] ? this.statuses[this.type].name : '';
    },
    statusClass() {
      return this.statuses[this.type] ? this.statuses[this.type].class : '';
    }
  }
}
</script>