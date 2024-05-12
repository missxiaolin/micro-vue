<template>
  <div>
    <vue-monaco-editor
      width="500px"
      height="800px"
      v-model:value="file.value"
      theme="vs-dark"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
      :language="file.language"
    />
  </div>
</template>
<script lang="ts" setup>
import codeExampleFiles from "./data";
import { shallowRef } from "vue";
const file = codeExampleFiles.vue;
const editorRef = shallowRef();

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: { enabled: false },
};

const handleMount = (editor: any) => {
  editorRef.value = editor;
  console.log("Editor mounted:", editor);
};
</script>
