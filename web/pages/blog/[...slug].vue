<template>
  <Card style="margin-top: 30px" class="articleWrapper">
    <template #header>
      <div class="articleHeader">
        <div style="display: flex; align-items: center; width: 100%; justify-content: space-between;">
          <h1>{{ doc?.title }}</h1>
          <NuxtLink :to="{ name: 'blog' }">
            <Button class="p-background-fuchsia-900">Go Back</Button>
          </NuxtLink>
        </div>
        <div style="align-self: flex-start;">
          <LanguageIcon v-for="language in doc?.languages" :key="language" :language="language" size="28"
            style="margin-right: 5px" />
        </div>
      </div>
      <hr style="color: rgba(0,0,0,0.2); margin-top: 24px; margin-bottom: 0px;" />
    </template>
    <template #content>
      <template v-if="doc">
        <ContentRenderer :value="doc" />
        <div style="height: 250px !important" />
      </template>
      <template v-else>
        <div class="flex justify-center items-center h-full">
          <h1>Article not found</h1>
        </div>
      </template>
    </template>
  </Card>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: doc } = await useAsyncData(route.path, () => {
  return queryCollection("blog")
    .path(`/${route.params!.slug as string}`)
    .first();
});
</script>

<style scoped>
:root {
  background-color: var(--p-zinc-100);
}

.articleHeader {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.articleWrapper:deep(.p-card-content) {
  line-height: 1.5;
}

@media screen and (max-width: 600px) {
  .articleHeader {
    flex-direction: column;
    align-items: flex-start;
  }

  .articleHeader h1 {
    margin-bottom: 10px;
  }
}
</style>
