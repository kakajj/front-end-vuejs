<template>
  <ul class="flex justify-center mb-8 mt-4">
    <li class="pag-but">
      <a
        class="pag-but-box"
        href="#"
        @click.prevent="changePage(currentPage - 1)"
      >
        <span class="mx-1">prev</span>
      </a>
    </li>
    <li
      class="num"
      :class="{ active: currentPage + 1 === p }"
      v-for="p in lastpage"
      :key="p.productId"
    >
      <a class="font-bold" href="#" @click.prevent="changePage(p - 1)">{{
        p
      }}</a>
    </li>
    <li class="pag-but">
      <a
        class="pag-but-box"
        href="#"
        @click.prevent="changePage(currentPage + 1)"
      >
        <span class="mx-1">Next</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["lastpage", "currentPage"],
  methods: {
    changePage(page) {
      if (page < 0) {
        return;
      }
      if (page > this.lastpage-1) {
        return;
      }
      this.$emit("pagination", page);
    },
  },
};
</script>

<style scoped>
.pag-but {
  @apply mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg;
}
.pag-but-box {
  @apply flex items-center font-bold;
}
.num {
  @apply mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg;
}
.active {
  @apply bg-gray-600 text-white;
}
</style>