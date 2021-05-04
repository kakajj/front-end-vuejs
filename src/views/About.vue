<template>
  <nav-bar></nav-bar>
  <!-- Container -->
  <go-back class="px-4"></go-back>
  <div v-for="team in teamMate" :key="team.id">
    
    <div class="card-container">
      <!-- Card wrapper -->
      <div class="wrapper">
        <!-- Card image -->
        <div
          class="image"
          :style="{ backgroundImage: `url(${require('@/assets/' + team.img)})`}">
        </div>
        <!-- ./Card image -->
        <!-- Card body -->
        <div class="body-outer">
          <div class="body-inner">
            <div class="body">
              <!-- Card title and subtitle -->
              <div class="card-title">
                <h3>{{team.name}}</h3>
                <h2>{{team.id}}</h2>
                <p class="nickname">
                  {{team.nickName}}
                </p>
              </div>
              <!-- ./Card title and subtitle -->
              <!-- Card description -->
              <div class="card-desc">
                <h1 class="response">
                  {{team.response}}
                </h1>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      teamMate: [
        {
          name: "Nachanon Montikanon",
          nickName: "JayJay",
          id: "62130500024",
          response: "Front-End and Database Development",
          img: 'jj.jpg'
        },
        {
          name: "Thanapat Loharattanavisid",
          nickName: "Tom-Leng",
          id: "62130500034",
          response: "Back-End and Database Development",
          img: 'leng.jpg'
        },
        {
          name: "Punnapop Chalor",
          nickName: "Gunny",
          id: "62130500057",
          response: "DevSecOps, Network and Infastructure Development",
          img: 'gun.jpg'
        },
      ],
    };
  },
};
</script>

<style scoped>
.card-container {
  @apply container px-4 my-10 mx-auto md:p-0 
}
.wrapper {
  @apply w-full shadow-lg flex flex-col justify-center md:flex-row  mx-auto sm:justify-center md:w-11/12 lg:w-full
}
.image{
  @apply bg-cover  border w-full h-80 md:flex-shrink-0 md:w-8/12 lg:w-1/4
}
.body-outer{
  @apply bg-white w-full md:w-1/4 lg:w-full 
}
.body-inner{
  @apply h-full mx-auto  md:px-0 md:pt-20 md:-ml-6  sm:w-4/5
}
.body{
  @apply bg-white lg:h-full p-6 -mt-6 md:mt-0  mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center md:w-3/4 lg:w-full
}
.card.title{
  @apply w-full lg:w-1/5 lg:border-solid text-center md:text-left 
}
.nickname{
  @apply mb-0 mt-3 text-gray-700 text-base italic
}
.card-desc{
  @apply w-full lg:w-3/5 mx-auto sm:flex sm:flex-row sm:justify-start
}
.response{
  @apply  mt-4 lg:mt-0  md:text-left text-lg
}
</style>
