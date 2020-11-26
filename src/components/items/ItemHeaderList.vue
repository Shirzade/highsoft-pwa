<template>
    <b-col id="item-header-list" cols="3">{{title}}</b-col>
</template>

<script>
export default {
  name: 'ItemHeaderList',
  props: {
    title: String
  }

}
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemHeaderListStyle";
</style>
