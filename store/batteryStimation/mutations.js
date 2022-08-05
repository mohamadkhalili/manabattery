import allObjects from '~/components/objectList.json'
export default {
  addObjectList(state, type) {
    state.objectList.push(allObjects.find((item) => item.type === type))
  },
  deleteObjectItem(state, index) {
    state.objectList.splice(index, 1)
  },
  changeObjectWat(state, { wat, key }) {
    // console.log(wat, ' / ', key)
    state.objectList[key].wat = wat
    state.objectList[key].va = undefined
  },
  changeObjectVa(state, { va, key }) {
    console.log(va, ' / ', key)
    state.objectList[key].va = va
    state.objectList[key].wat = undefined
  },
}
