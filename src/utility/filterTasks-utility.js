export function filterTasks(tasks, filter) {
  let newTasks = tasks;
  let params = Object.keys(filter);
  params.forEach((p) => {
    switch (p) {
      case 'statuses':
        if ( !filter.statuses.length)
          break;

        newTasks = newTasks.filter(nT => filter.statuses.includes(nT['status']))
        break;
      case 'description':
      case 'title':
        newTasks = newTasks.filter(nT => nT[p].includes(filter[p]))
        break;
    }
  })
  console.log(newTasks)
  return newTasks
}