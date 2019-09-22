import moment from 'moment'

function sortByNext(project) {
  const sortByNext = (task1, task2) => {
    const moment1 = moment(task1.next, 'DD/MM/YYYY')
    const moment2 = moment(task2.next, 'DD/MM/YYYY')
    return moment1.unix() - moment2.unix()
  }
  return project.sort(sortByNext)
}

function sortByFirstName(project) {
  const sortByFirstName = (task1, task2) => {
    const name1 = `${task1.firstName} ${task1.lastName}`
    const name2 = `${task2.firstName} ${task2.lastName}`
    return name1 > name2 ? 1 : -1
  }
  return project.sort(sortByFirstName)
}

function sortByLastName(project) {
  const sortByLastName = (task1, task2) => {
    const name1 = `${task1.lastName} ${task1.firstName}`
    const name2 = `${task2.lastName} ${task2.firstName}`
    return name1 > name2 ? 1 : -1
  }
  return project.sort(sortByLastName)
}

function sortByPoints(project) {
  const sortByPoints = (task1, task2) => (task1.points < task2.points ? 1 : -1)
  return project.sort(sortByPoints)
}

function sortByLastDate(project) {
  const sortByLastDate = (task1, task2) => {
    const moment1 = moment(task1.lastDate, 'DD/MM/YYYY')
    const moment2 = moment(task2.lastDate, 'DD/MM/YYYY')
    return moment1.unix() - moment2.unix()
  }
  return project.sort(sortByLastDate)
}

function sortByOrigin(project) {
  const sortByOrigin = (task1, task2) => (task1.origin > task2.origin ? 1 : -1)
  return project.sort(sortByOrigin)
}

function sortByBirthday(project) {
  const sortBirthday = (task1, task2) => {
    if (!task1.nextBirthday) return 1
    if (!task2.nextBirthday) return -1
    const moment1 = moment(task1.nextBirthday, 'DD/MM/YYYY')
    const moment2 = moment(task2.nextBirthday, 'DD/MM/YYYY')
    return moment1.unix() - moment2.unix()
  }
  return project.sort(sortBirthday)
}

export {
  sortByBirthday,
  sortByFirstName,
  sortByLastDate,
  sortByLastName,
  sortByNext,
  sortByOrigin,
  sortByPoints,
}
