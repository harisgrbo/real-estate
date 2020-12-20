import snackbar from "@/components/global/Snackbar.vue";

const Plugin = {
  install(Vue, options = {}) {

    if (this.installed) {
      return;
    }
    this.installed = true;

    this.event = new Vue();

    Vue.prototype.$snackbar = {
      show(options = {}) {
        Plugin.event.$emit("show", options, true);
      }
    };

    Vue.component("snackbar", snackbar);
  }
};

export default Plugin;
