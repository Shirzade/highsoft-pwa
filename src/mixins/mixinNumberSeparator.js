
export const exampleMixin = clientId => ({
  methods: {
    numberSeparator () {
      return clientId.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
})

