export default {
  getObjectItem: (state) => (index) => {
    return state.objectList[index]
  },
  getSumOfObjects(state) {
    let sumWat = 0
    let sumVa = 0
    state.objectList.forEach((object) => {
      if (object.wat) {
        sumVa += (object.wat * object.count) / object.coefficient
        sumWat += object.wat * object.count
      } else if (object.va) {
        sumVa += object.va * object.count
        sumWat += object.va * object.coefficient * object.count
      }
    })
    return { sumWat, sumVa }
  },
}
