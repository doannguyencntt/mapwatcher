export default {
  methods: {
    vToasted: function(type, valid, position = 'top-center') {
      this.$toasted.show(` ${valid}`, {
        theme: 'bubble',
        position: position,
        duration: 5000,
        type
      })
    }
  }
}
