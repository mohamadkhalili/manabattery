import allObjects from '~/components/objectList.json'
export default {
  addObjectList(state, type) {
    state.objectList.push({
      ...allObjects.find((item) => item.type === type),
      count: 1,
    })
  },
  deleteObjectItem(state, index) {
    state.objectList.splice(index, 1)
  },
  changeObjectWat(state, { wat, key }) {
    state.objectList[key].wat = wat
    state.objectList[key].va = undefined
  },
  changeObjectVa(state, { va, key }) {
    state.objectList[key].va = va
    state.objectList[key].wat = undefined
  },
  changeObjectNumber(state, { count, key }) {
    state.objectList[key].count = count
  },
}
