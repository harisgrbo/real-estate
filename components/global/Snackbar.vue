<template>
<div class="snackbar">
  <div v-if="show" aria-live="assertive" class="snackbar fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <div :class="['max-w-sm w-full rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden', type === 'success' ? 'bg-white' : 'bg-red-50']">
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <!-- Heroicon name: outline/check-circle -->
              <svg v-if="type === 'danger'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p :class="['text-sm font-medium ', type === 'success' ? 'text-gray-900': 'text-red-600']">
                {{ options.text }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex items-center">
              <button @click="close()" class="items-center bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <!-- Heroicon name: solid/x -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style lang="scss" scoped>
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.snackbar {
  z-index: 9999 !important;
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
button {
  margin-bottom: 0 !important;
}
</style>
