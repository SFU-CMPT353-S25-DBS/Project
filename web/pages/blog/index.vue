<template>
  <div class="articlesWrapper">
    <div
      style="display: flex; justify-content: end; margin-bottom: 18px; width: 100%; padding-left: 0.5em; padding-right: 0.5em">
      <NuxtLink :to="{ name: 'index' }" external>
        <Button class="p-background-fuchsia-900">Go Back</Button>
      </NuxtLink>
    </div>
    <div class="articles">
      <Card v-for="page in pages" class="article">
        <template #title>
          {{ page.sequence !== undefined ? `${page.sequence}. ` : undefined }}{{ page.title }}
        </template>
        <template #content v-if="page.description?.length">
          <div style="padding-bottom: 10px !important;">
            {{ page.description }}
          </div>
        </template>
        <template #footer>
          <div v-if="!page.languages?.length" style="flex-grow: 1" />
          <div v-else>
            <LanguageIcon v-for="language in page.languages" :key="language" :language="language"
              style="margin-right: 5px" />
          </div>
          <NuxtLink :key="page.id" :to="{
            name: 'blog-slug',
            params: { slug: page.path.slice(1) },
          }">
            <Button>Read</Button>
          </NuxtLink>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: pages } = await useAsyncData(route.path, () => {
  return queryCollection("blog").order("sequence", "ASC").all();
});
</script>

<style scoped>
.articlesWrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--p-stone-200);
  border-radius: 32px;
  margin-top: 30px;
  padding: 20px;
  justify-content: center;
}

.articles {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

@media (max-width: 600px) {
  .articlesWrapper {
    margin: 0;
    padding: 0;
    border-radius: 0;
  }
}

.article {
  flex-grow: 1;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  max-width: calc(1/3 * 100% - 2em);
}

.article:deep(.p-card-content) {
  flex-grow: 1;
}

.article:deep(.p-card-body) {
  height: 100%
}

.article:deep(.p-card-footer) {
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0.5em;
}

/* Reduce body width on large monitors */
@media (min-width: 900px) {
  .article {
    max-width: calc(1/2 * 100% - 1em);
  }
}

/* Full width on phones */
@media (max-width: 800px) {
  .article {
    max-width: 100%;
  }
}
</style>

<style>
:root {
  background-color: var(--p-zinc-100);
}
</style>