<template>
  <transition name="outline-fade">
    <div class="outline">
      <div class="outline-header">
        <!--content-->
        <div class="content">
          <!--header-->
          <div class="header">
            <h3 class="text-3xl font-semibold text-white">
              {{ pic.productName }}
            </h3>
            <button v-on:click="switchModal()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="btn-close"
              >
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 
                             12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 
                            1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z"
                />
              </svg>
            </button>
          </div>
          <!--body-->
          <div class="picture">
            <img  v-bind:src="img" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    pic: Array,
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
  @apply border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none max-w-xs;
}
.header {
  @apply flex justify-center space-x-4;
}
.btn-close {
  @apply bg-transparent w-8 h-8 block outline-none focus:outline-none fill-current text-gray-600 cursor-pointer hover:text-white transition duration-500;
}
.picture {
  @apply relative p-6 flex-auto mx-auto max-w-sm ;
}
</style>