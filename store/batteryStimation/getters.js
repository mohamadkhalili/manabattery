export default {
  getObjectItem: (state) => (index) => {
    return state.objectList[index]
  },
  getSumOfObjects(state) {
    let sumWat = 0
    let sumVa = 0
    state.objectList.forEach((object) => {
      if (object.wat) {
        sumVa += object.wat / object.coefficient
        sumWat += object.wat
      } else if (object.va) {
        sumVa += object.va
        sumWat += object.va * object.coefficient
      }
    })
    return { sumWat, sumVa }
  },
}
