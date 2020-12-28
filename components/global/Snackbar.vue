<template>
  <div>
    <transition name="fade">
      <div v-if="show" :class="['snackbar', 'box-shadow', type]">
        <slot>{{ options.text }}</slot>
      </div>
    </transition>
  </div>
</template>

<script>
import snackbar from "@/plugins/snackbar/snackbar";

export default {
  data: () => ({
    options: {
      text: "",
      type: "",
      closeWait: 3000
    },
    show: false,
    type: "",
    timer: 0
  }),
  beforeMount() {
    snackbar.event.$on("show", options => {
      this.options = options;
      this.type = options.type;
      this.show = true;
      this.close(this.options.closeWait || 3000);
    });
  },
  methods: {
    close(timeout) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, timeout);
    }
  }
};
</script>

<style>
.snackbar {
  min-width: 300px;
  background-color: #F48024;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 16px;
  position: fixed;
  z-index: 9999;
  left: 30px;
  top: 30px;
}

.snackbar.success {
  background-color: #757B9A;
}

.snackbar.danger {
  background-color: rgb(244, 36, 47);
}

.snackbar-enter-active {
  animation: snackbar-in 0.8s;
}

.snackbar-leave-active {
  animation: snackbar-in 0.8s reverse;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes snackbar-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.box-shadow {
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
  0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
  0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
