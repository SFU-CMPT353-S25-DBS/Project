<template>
  <Icon
    v-if="knownLanguageToIcon[language]"
    :name="`vscode-icons:file-type-${knownLanguageToIcon[language]}`"
    :size="size ?? 24"
    v-tooltip.bottom="{
      value: language,
      showDelay: 500,
    }"
  />
</template>

<script setup lang="ts">
defineProps<{
  language: string;
  size?: string;
  default?: keyof typeof knownLanguageToIcon;
}>()

const knownLanguageToIcon: Record<string, string> = {
  js: "js",
  javascript: "js",
  ts: "typescript",
  typescript: "typescript",
  html: "html",
  css: "css",
  vue: "vue",
  json: "json",
  csv: "text",
  shell: "shell",
  md: "markdown",
  yaml: "yaml",
  mdc: "markdown",
  python: "python",
  py: "python",
  sh: "shell",
  bash: "shell",
  jupyter: "jupyter",
  ipynb: "jupyter",
  git: "git",
  nuxt: "nuxt",
  vite: "vite",
  vuejs: "vue",
  vscode: "vscode",
};
</script>