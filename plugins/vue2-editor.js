import Vue from 'vue'
import { VueEditor } from "vue2-editor";

Vue.component('vue-editor', VueEditor, {
  editorToolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", "code-block"]
  ]
})
