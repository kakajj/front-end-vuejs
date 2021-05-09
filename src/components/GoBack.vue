<template>
  <div class="go-back">
    <button @click="goBack">
       <span class="text-5xl material-icons">arrow_back</span>
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
 @apply  text-blue-800 text-sm  hover:text-blue-400 my-8;
}
li {
  @apply cursor-pointer ;
}
</style>