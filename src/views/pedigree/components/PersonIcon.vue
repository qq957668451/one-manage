<template>
  <div>
    <svg width='22px' height='22px' :fill="item.isAlive && item.sex==='man'?'#cddef6':item.isAlive?'#f9c6c6':'#ccc'">
      <use v-if="item.sex === 'woman'" xlink:href="#icon-mom"></use>
      <use v-if="item.sex === 'man'" xlink:href="#icon-nanren"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'personIocn',
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
</style>