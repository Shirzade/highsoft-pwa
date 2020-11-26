<template>
    <div id="suggest-product">
        <div class="container-suggest-product">
            {{productName}}
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ItemSuggestNewProduct',
    props: {
      productName: Object
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemSuggestProduct";
</style>
