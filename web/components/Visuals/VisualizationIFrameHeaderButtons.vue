<template>
  <template v-if="!fullscreen">
    <Button
      style="margin-left: 10px; margin-top: 10px"
      @click="copySectionLink"
      v-tooltip.right="{
        value: 'Copy link to figure',
        showDelay: 500,
      }"
      text
      size="large"
      rounded
    >
      <template #icon>
        <Icon name="mdi:link-variant" />
      </template>
    </Button>

    <NuxtLink
      :to="{
        path: `${$nuxt.$config.app.baseURL}visuals/${fileNameNoExt}`,
      }"
      external
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        style="margin-right: 10px; margin-top: 10px"
        v-tooltip.left="{
          value: 'Open in new tab',
          showDelay: 500,
        }"
        text
        size="large"
        rounded
      >
        <template #icon>
          <Icon name="mdi:open-in-new" />
        </template>
      </Button>
    </NuxtLink>
  </template>
  <template v-else-if="!isDownloading">
    <NuxtLink :to="{ name: 'index' }" external>
      <Button
        style="margin-left: 10px; margin-top: 10px"
        v-tooltip.right="{
          value: 'Back to figure list',
          showDelay: 500,
        }"
        text
        size="large"
        rounded
      >
        <template #icon>
          <Icon name="mdi:arrow-left" />
        </template>
      </Button>
    </NuxtLink>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  fullscreen?: boolean;
  sectionId: string;
  fileNameNoExt: string;
  isDownloading?: boolean;
}>();

function copySectionLink() {
  const section = document.getElementById(props.sectionId);
  if (section) {
    const sectionLink = `${window.location.origin}${window.location.pathname}#${props.sectionId}`;
    navigator.clipboard.writeText(sectionLink);
  } else {
    console.error("Section not found:", props.sectionId);
  }
}
</script>
