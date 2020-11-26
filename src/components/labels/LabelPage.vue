<template>
    <div id="title-content">
        {{title}}
    </div>
</template>

<script>
  export default {
    name: 'titlePage',
    props: {
      title: String
    }

  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/labels/labelPage";
</style>
