<template>
  <!-- <vueper-slides fade :touchable="false">
    <vueper-slide
      v-for="(slide, i) in slides"
      :key="i"
      :image="slide.image"
      :title="slide.title"
      :content="slide.content"
    />
  </vueper-slides> -->
  <vueper-slides
    
    :dragging-distance="50"
    :slide-ratio="0.3"
    ref="myVueperSlides"
    :parallax="parallax"
    :parallax-fixed-content="parallaxFixedContent"
  >
    <vueper-slide
      v-for="(slide, i) in slides"
      :key="i"
      :image="slide.image"
      :title="slide.title"
      :content="slide.content"
    />
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      parallax: 1,
      parallaxFixedContent: false,
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