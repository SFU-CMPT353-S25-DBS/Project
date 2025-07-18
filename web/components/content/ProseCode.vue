<template>
  <div class="codeWrapper">
    <Icon
      v-if="languageToIcon[language]"
      :name="`vscode-icons:file-type-${languageToIcon[language]}`"
      size="24"
      style="margin-right: 5px"
    />
    <code :class="class"><slot /></code>
  </div>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

const languageToIcon: Record<string, string> = {
  js: "js",
  ts: "typescript",
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
};
</script>

<style scoped>
.codeWrapper {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  background-color: #f8fafc;
}
</style>
