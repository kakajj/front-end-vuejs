<template>
  <transition name="outline-fade">
    <div class="outline">
      <div class="outline-header">
        <div class="content">
          <div class="header">
            <h3 class="text-3xl font-semibold text-white">
              {{ pic.productName }}
            </h3>
            <button v-on:click="switchModal()">
              <span class=" text-4xl material-icons text-gray-300 hover:text-white">close</span>
            </button>
          </div>
          <div class="picture">
            <img  v-bind:src="img" alt="picofproduct" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    pic: Object,
    img: null,
  },
  methods: {
    switchModal() {
      this.$emit("switchModal");
    },
  },
};
</script>

<style scoped>
.outline-fade-enter,
.outline-fade-leave-to {
  opacity: 0;
}

.outline-fade-enter-active,
.outline-fade-leave-active {
  transition: opacity 0.5s ease;
}
.outline {
  @apply overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex bg-black bg-opacity-95;
}
.outline-header {
  @apply relative w-auto my-6 mx-auto;
}
.content {
  @apply border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none max-w-md md:max-w-sm sm:max-w-xs;
}
.header {
  @apply flex justify-center space-x-4;
}
.picture {
  @apply relative p-4 ;
}
</style>