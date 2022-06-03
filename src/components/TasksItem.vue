<template>
  <h2 class="card-title">
    {{ index+1 }}) {{ task.title }}
    <app-status :type="task.status" />
  </h2>
  <div>
    <strong> ID задачи:</strong> <small>{{ task.id }}</small>
  </div>
  <div>
    <strong> Дата создания:</strong> <small>{{ dateFilter(task.createDate) }}</small>
  </div>
  <div>
    <strong> Дата deadline:</strong> <small>{{ dateFilter(task.deadline) }}</small>
  </div>
  <div><strong>Описание задачи:</strong></div>
  <div>
    {{ task.descriptionFetch}}
  </div>
  <br>
  <button class="btn primary" @click="$router.push('/task/' + task.id)">Посмотреть</button>
  <button class="btn danger" @click="onClickDelete">Удалить</button>
</template>

<script>
import AppStatus from '../components/AppStatus'

export default {
  name: "TasksItem",
  emits: ['click-delete'],
  props: {
    task: Object, // { createDate: Date, deadline: Date, descriptionFetch: String, id:Number, status:, title: String}
    index: Number
  },
  methods: {
    dateFilter ( dateString ) {
      return new Intl.DateTimeFormat().format(new Date(dateString))
    },
    onClickDelete() {
      this.$emit('click-delete', this.task.id)
    }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>