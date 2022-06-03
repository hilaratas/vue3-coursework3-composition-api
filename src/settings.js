export const URL = 'https://nrachkova-vue3-coursework3-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const TASK_STATUS = {
  'active':  {
    name: 'активный',
    class: 'transparent-grey'
  },
  'in-progress': {
    name: 'в работе',
    class: ''
  },
  'done': {
    name: 'завершено',
    class: 'primary'
  },
  'cancelled': {
    name: 'отменено',
    class: 'danger'
  },
  'expired': {
    name: 'просроченный',
    class: 'transparent-danger'
  }
}

export const FILTER_DEFAULT = {
  statuses: ['active'],
  title: '',
  description: ''
}
