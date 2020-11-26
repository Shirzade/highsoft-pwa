<template>
    <div id="title-x-medium">
        {{title}}
    </div>
</template>

<script>
  export default {
    name: 'TitleXMedium',
    props: {
      title: String
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/labels/labelXMedium";
</style>
