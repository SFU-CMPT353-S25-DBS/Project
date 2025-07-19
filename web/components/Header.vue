<template>
  <section class="header">
    <div class="header-content">
      <h1 class="titleText">Power Outages in BC</h1>
      <p>Interactive Visuals and Supplementary Report Material</p>
      <p>SFU CMPT 353 | Group DBS</p>
    </div>
    <NuxtLink
      :to="{
        name: 'blog',
      }"
    >
      <Button text>
        Blog
        <Icon name="mdi-open-in-new" />
      </Button>
    </NuxtLink>
  </section>
</template>

<style scoped>
.header {
  text-align: center;
  background-color: var(--p-slate-100);
  padding-top: 40px;
  padding-bottom: 40px;
}

.titleText {
  font-size: 40px;
  margin: 0;
}
</style>
