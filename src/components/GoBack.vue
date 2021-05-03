<template>
  <div class="go-back">
    <button @click="goBack">
       <i class="text-5xl material-icons">arrow_back</i>
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
  transition: 0.5s;
 @apply w-20 h-10 flex justify-center text-blue-800 text-sm  hover:text-blue-400 my-8;
}
li {
  @apply cursor-pointer ;
}
</style>