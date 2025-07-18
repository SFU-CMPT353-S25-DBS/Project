<template>
  <div class="blockquote">
    <slot/>
  </div>
</template>

<style scoped>
.blockquote {
  background-color: rgba(0, 0, 0, 0.05);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 32px;
  border-radius: 5px;
  border-left: 5px solid rgba(0,0,0,0.3);
}
</style>