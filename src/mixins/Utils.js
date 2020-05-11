export default {
  methods: {
    transformByID (list, sourceValue, targetKey = 'title', sourceKey = 'id') {
      const i = list.findIndex(t => t[sourceKey] === sourceValue)
      return i > -1 ? list[i][targetKey] : ''
    }
  }
}
