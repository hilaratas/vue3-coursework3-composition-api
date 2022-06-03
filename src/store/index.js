import { createStore } from 'vuex'
import filter from './modules/filter'
import {parseLocalStorage, setLocalStorage} from '@/utility/localStorage-utility'

export default createStore({
  state() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  getters: {
    activeCounter(state) {
      return state.tasks.filter( e => { return e.status === 'active' }).length
    },
    tasksCounter(state) {
      return state.tasks.length
    },
    tasks(state) {
      return state.tasks
    },
    tasksFromStorage(state) {
      return JSON.parse(localStorage.getItem('tasks')) || []
    },
    taskById(state) {
      return id => {
        return state.tasks.find(t => t.id === +id);
      }
    }
  },
  mutations: {
    tasksFetch(state) {
      const tasks = parseLocalStorage('tasks') || []
      tasks.forEach((t) => {
        let deadlineDate = new Date(t.deadline)
        deadlineDate.setHours(23, 59,59)
        return {...t,
          status: (deadlineDate < new Date() ? 'expired' : t.status)
        }

      })
      state.tasks = tasks
    },
    taskAdd(state, newTask) {
      let tasks = parseLocalStorage('tasks') || []
      tasks.push(newTask)
      setLocalStorage('tasks', JSON.stringify(tasks))
      state.tasks = parseLocalStorage('tasks')
    },
    taskChange(state, task) {
      let index = state.tasks.findIndex( t => t.id === +task.id)
      if ( index === -1 )
        return

      state.tasks[index] = task
      setLocalStorage('tasks', JSON.stringify(state.tasks))
      state.tasks = parseLocalStorage('tasks')
    },
    taskRemove(state, taskId) {
      let index = state.tasks.findIndex( t => +t.id === +taskId)
      if ( index === -1 )
        return

      state.tasks.splice(index, 1)
      setLocalStorage('tasks', JSON.stringify(state.tasks))
      state.tasks = JSON.parse(localStorage.getItem('tasks'))
    }
  },
  actions: {
    taskAdd({commit}, newTask) {
      commit('taskAdd', newTask)
    },
    taskChange({commit}, task) {
      commit('taskChange', task)
    },
    taskRemove({commit}, taskId) {
      commit('taskRemove', taskId)
    }
  },
  modules: { filter }
})
