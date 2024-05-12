<template>
  <div class="editor-container" id="editor-container" :style="style"></div>
</template>

<script>
import { loadScript } from "../../utils/loadScript";
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100vh",
    },
    options: {
      type: Object,
      default: () => {
        return {
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        };
      },
    },
  },
  data() {
    return {
      style: "",
    };
  },
  mounted() {
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/loader.js",
      "monaco-editor",
      async () => {
        loadScript("/edit.js", "monaco-editor-config", async () => {
          const fn = () => {
            if (!window.monaco) {
              setTimeout(() => {
                fn();
              }, 50);
              return;
            }
            monaco.editor.create(document.getElementById("editor-container"), {
              value: this.value,
              ...this.options,
            });
            this.style = `width: ${this.width};height: ${this.height};`;
          };
          setTimeout(() => {
            fn();
          }, 20);
        });
      }
    );
  },
};
</script>
