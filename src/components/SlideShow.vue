<template>
  <div class="text-center">This is SlideShow</div>
</template>

<script>

export default {
  components: { },
  data() {
    return {
      slides: [
        {
          title: "Samsung Galaxy S20",
          content: "New Ultimate Smartphone",
          image: require("@/assets/s20.jpg"),
        },
        {
          title: "Oppo F17 Pro",
          content: "New Ultimate Smartphone",
          image: require("@/assets/oppo.jpg"),
        },
        {
          title: "Iphone 12 ",
          content: "Best Smartphone in the world",
          image: require("@/assets/iphone.png"),
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>