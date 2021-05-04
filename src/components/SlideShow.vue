<template>
  <div class="slide">
      <div class="block">
        <img
          v-for="(img, i) in images"
          :key="i"
          :src="img"
          :class="{ image: true, active: i === currentIndex }"
        />
      </div>
    <div class="control flex flex-row justify-center">
      <a class="prev" @click.prevent="prev">
        <li class="text-3xl material-icons">chevron_left</li>
      </a>
      <a class="next" @click.prevent="next">
        <li class="text-3xl material-icons">chevron_right</li>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require("../assets/banner1.jpg"),
        require("../assets/banner2.jpg"),
        require("../assets/banner3.jpg"),
        require("../assets/banner4.jpg"),
      ],
      currentIndex: 0,
    };
  },
  methods: {
    next: function () {
      if (this.currentIndex + 1 > this.images.length - 1) {
        this.currentIndex = 0;
        return;
      }
      this.currentIndex += 1;
    },
    prev: function () {
      if (this.currentIndex - 1 < 0) {
        this.currentIndex = this.images.length - 1;
        return;
      }
      this.currentIndex -= 1;
    },
  },
};
</script>

<style scoped>
.slide{
  @apply w-11/12 mx-auto
}
.block{
  @apply w-full h-auto 
}
.control{
  @apply space-x-8 m-4
}
.image {
  transition: 1s;
  display: none;
  width: 100%;
  object-position: center;
  object-fit: cover ;
  @apply  sm:max-h-64 md:max-h-80 2xl:max-h-96
 }
.active {
  display: block;
}
li {
  transition: 0.5s;
  cursor: pointer;
  width: auto;
  @apply mx-auto hover:bg-gray-300
}
</style>