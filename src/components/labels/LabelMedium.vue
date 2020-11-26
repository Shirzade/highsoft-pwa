<template>
    <div id="title-medium">
        {{title}}
    </div>
</template>

<script>
  export default {
    name: 'TitleMedium',
    props: {
      title: String
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/labels/labelMedium";
</style>
