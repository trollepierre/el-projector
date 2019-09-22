const dummyTask = (task) => ({
  id: 1,
  name: 'Build el-projector',
  description: 'more data about how to do it',
  points: 999, // given by server
  createdDate: '19/05/2019',
  endDate: undefined, // must be done before this date
  optimalDate: undefined, // user would do it at this date
  isDone: false,
  doneDate: undefined, // for log record
  priority: 'HIGHLY_IMPORTANT', // Enum with 5 levels (inherited by default, but can be updated)
  benefit: 'ORGASM_HAPPINESS', // Enum with 5 levels
  neededTime: 'ONE_MONTH', // Enum
  epicId: 'A1', // Yearly happiness epic
  neededMaterial: ['MacTo', 'iMoi', 'MacNo', 'home'],
  subTaskIds: ['TASK10', 'TASK11', 'TASK12'], // checklist of subtasks that depends on it
  masterTaskId: 'TASK0', // this task depends on the master one
  ...task,
})

export { dummyTask }
