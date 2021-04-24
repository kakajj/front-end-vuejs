<template>
  <div class="go-back">
    <button @click="goBack">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.go-back {
 @apply w-12 m-4 focus:outline-none text-blue-600 text-sm  rounded-full border border-blue-600 hover:bg-blue-50;
}
button {
  @apply cursor-pointer mx-auto  w-4 mt-1;
}
</style>