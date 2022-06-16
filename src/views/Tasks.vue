<template>
  <tasks-filter
      @update-filter="onUpdateFilter"
  ></tasks-filter>
  <template v-if="tasks.length === 0">
    <h1 class="text-white center">Задач пока нет</h1>
  </template>
  <template v-else>
    <h3 class="text-white">Всего задач: {{ tasksCounter }}</h3>
    <h3 class="text-white">Задач, соответсвующих фильтру: {{ filteredTasksCounter }}</h3>

    <pre>{{filteredTasks}}</pre>

    <div class="card" v-if="filteredTasks.length">
      <div v-for="(task, idx) in filteredTasks" :key="task.id">
        <task-item
            :task="task"
            :index="idx"
            @click-delete="onClickDelete($event)"
        ></task-item>
      </div>
    </div>

  </template>
  <teleport to="#modals">
    <app-modal
        v-if="showConfirm"
        @close="showConfirm=false; removableTaskId=null"
        @send-confirm="onConfirm($event, removableTaskId)">
      <h3>Подтвердить удаление задачи <small>ID={{removableTaskId}}</small>?</h3>
      <template #confirm>да, удалить</template>
      <template #reject>нет, не удалять</template>
    </app-modal>
  </teleport>
</template>

<script>
import {reactive, ref} from 'vue'
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import AppStatus from '../components/AppStatus'
import TaskItem from '../components/TasksItem'
import AppModal from '../components/AppModal'
import TasksFilter from '../components/TasksFilter'
import {FILTER_DEFAULT} from "@/settings";
import {filterTasks} from '@/utility/filterTasks-utility'

export default {
  setup() {
    const store = useStore()
    const tasks = computed(() => store.state.tasks)
    const tasksCounter = computed(() => store.getters.tasksCounter)
    const showConfirm = ref(false)
    const removableTaskId = ref(null)
    let filteredTasks = reactive([])
    const filteredTasksCounter = computed(() => filteredTasks.length )
    let params = reactive({...FILTER_DEFAULT})
    store.dispatch('filter/filterFetch').then(res => Object.keys(res).forEach(key => params[key] = res[key]))

    watch(params, (newVal, oldVal) => {
      console.log('Параметры изменились')
      console.log(newVal, oldVal)
      filteredTasks = filterTasks(tasks.value, params)
      console.log(filteredTasks, filteredTasks.length)
    })
    watch(tasks, () => {
      filteredTasks = filterTasks(tasks.value, params)
    })


    function onClickDelete(removableTaskId) {
      showConfirm.value = true
      this.removableTaskId = removableTaskId;
    }

    function onConfirm(response, taskId) {
      if (response)
        store.dispatch('taskRemove', taskId);
      this.showConfirm = false
    }

    function onUpdateFilter() {
      store.dispatch('filter/filterFetch').then(res => Object.keys(res).forEach(key => params[key] = res[key]))
    }

    return {
      tasks,
      tasksCounter,
      filteredTasks,
      showConfirm,
      removableTaskId,
      filteredTasksCounter,
      onClickDelete,
      onConfirm,
      onUpdateFilter,
    }
  },
  components: {AppStatus, TaskItem, AppModal, TasksFilter}
}
</script>
