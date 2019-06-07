import moment from 'moment'

function next(tasks) {
  const sortByNext = (task1, task2) => {
    const moment1 = moment(task1.next, 'DD/MM/YYYY')
    const moment2 = moment(task2.next, 'DD/MM/YYYY')
    return moment1.unix() - moment2.unix()
  }
  return tasks.sort(sortByNext)
}

function firstName(tasks) {
  const sortByFirstName = (task1, task2) => {
    const name1 = `${task1.firstName} ${task1.lastName}`
    const name2 = `${task2.firstName} ${task2.lastName}`
    return name1 > name2 ? 1 : -1
  }
  return tasks.sort(sortByFirstName)
}

function lastName(tasks) {
  const sortByLastName = (task1, task2) => {
    const name1 = `${task1.lastName} ${task1.firstName}`
    const name2 = `${task2.lastName} ${task2.firstName}`
    return name1 > name2 ? 1 : -1
  }
  return tasks.sort(sortByLastName)
}

function points(tasks) {
  const sortByPoints = (task1, task2) => {
    return task1.points < task2.points ? 1 : -1
  }
  return tasks.sort(sortByPoints)
}

function lastDate(tasks) {
  const sortByLastDate = (task1, task2) => {
    const moment1 = moment(task1.lastDate, 'DD/MM/YYYY')
    const moment2 = moment(task2.lastDate, 'DD/MM/YYYY')
    return moment1.unix() - moment2.unix()
  }
  return tasks.sort(sortByLastDate)
}

function origin(tasks) {
  const sortByOrigin = (task1, task2) => {
    return task1.origin > task2.origin ? 1 : -1
  }
  return tasks.sort(sortByOrigin)
}

function birthday(tasks) {
  const sortBirthday = (task1, task2) => {
    if (!task1.nextBirthday) return 1
    if (!task2.nextBirthday) return -1
    const moment1 = moment(task1.nextBirthday, 'DD/MM/YYYY')
    const moment2 = moment(task2.nextBirthday, 'DD/MM/YYYY')
    return moment1.unix() - moment2.unix()
  }
  return tasks.sort(sortBirthday)
}

export default {
  birthday,
  firstName,
  lastDate,
  lastName,
  next,
  origin,
  points,
}
