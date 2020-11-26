<template>
    <b-col id="message-empty-list-order" cols="12">
        {{message}}
    </b-col>
</template>

<script>
  export default {
    name: 'MessageEmptyListOrders',
    props: {
      message: String
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/components/componentMessageEmptyListOrderStyle";
</style>
