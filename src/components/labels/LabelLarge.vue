<template>
    <span id="label-large">
        <span :class=type>
            {{title}}
        </span>
    </span>
</template>

<script>
  export default {
    name: 'TitleLarge',
    props: {
      title: String,
      type: String
    }
  }

</script>

<style scoped lang="scss">
    @import "../../assets/styles/labels/labelLarge";
</style>
