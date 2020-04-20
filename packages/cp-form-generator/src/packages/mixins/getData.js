export default {
  props: {
    getData: {
      type: Function
    }
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    this.getData && this.getData()
      .then(data => {
        this.data = data
      })
      .catch(error => console.log(error))
  }
}
