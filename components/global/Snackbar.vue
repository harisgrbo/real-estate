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

<style lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.snackbar {
  min-width: 300px;
  background-color: #F48024;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 16px;
  position: fixed;
  z-index: 9999;
  right: 30px;
  top: 154px;
  bottom: inherit;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;

  @include for-phone-only {
    min-width: 300px;
    background-color: #F48024;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 16px 8px;
    position: fixed;
    z-index: 9999;
    left: 8px;
    top: 8px;
    bottom: inherit;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    right: 8px;
  }
}

.snackbar.success {
  background-color: #0B8489;
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
  box-shadow: rgb(0 0 0 / 6%) 0px 14px 5px;

}

</style>
