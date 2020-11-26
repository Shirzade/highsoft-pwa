<template>
    <div id="label-small">
        {{title}}
    </div>
</template>

<script>
  export default {
    name: 'LabelSmall',
    props:{
      title:String
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/labels/labelSmallStyle";
</style>
