<template>
  <nav-bar></nav-bar>

  <go-back class="px-4"></go-back>
  <div v-for="team in teamMate" :key="team.id">
    
    <div class="card-container">

      <div class="wrapper">

        <div
          class="image"
          :style="{ backgroundImage: `url(${require('@/assets/' + team.img)})`}">
        </div>

        <div class="body-outer">
          <div class="body-inner">
            <div class="body">

              <div class="card-title">
                <h3>{{team.name}}</h3>
                <h2>{{team.id}}</h2>
                <p class="nickname">
                  {{team.nickName}}
                </p>
              </div>

              <div class="card-desc">
                <h1 class="response">
                  {{team.response}}
                </h1>
                <h1 class="response">
                  GitHub: {{team.contact.github}}
                </h1>
                <h1 class="response">
                  Facebook: {{team.contact.fb}}
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
          contact:{
            github:'kakajj',
            fb:'เฮียเจ จุ้บจิ้บ กระซิบกระซาบ'
          },
          img: 'jj.jpg'
        },
        {
          name: "Thanapat Loharattanavisid",
          nickName: "Tom-Leng",
          id: "62130500034",
          response: "Back-End and Database Development",
          contact:{
            github:'lengleng9090',
            fb:'Thanapat Loharattanavisid'
          },
          img: 'leng.jpg'
        },
        {
          name: "Punnapop Chalor",
          nickName: "Gunny",
          id: "62130500057",
          response: "DevSecOps, Network and Infastructure Development",
          contact:{
            github:'gun082544',
            fb:'Punnapop Chalor'
          },
          img: 'gun.jpg'
        },
      ],
    };
  },
};
</script>

<style scoped>
.card-container {
  @apply container px-4 my-10 mx-auto md:p-0  transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
}
.wrapper {
  @apply w-full shadow-lg flex flex-col justify-center md:flex-row  mx-auto sm:justify-center md:w-11/12 lg:w-full
}
.image{
  @apply bg-cover  border w-full h-80 md:flex-shrink-0 md:w-5/12 lg:w-1/4
}
.body-outer{
  @apply bg-white w-full md:w-auto lg:w-full 
}
.body-inner{
  @apply h-full mx-auto  md:px-0  sm:w-4/5
}
.body{
  @apply bg-white lg:h-full p-6 -mt-6 md:mt-0  mb-4 md:mb-0 flex flex-wrap  items-center  lg:w-full
}
.card.title{
  @apply w-full lg:w-1/5 lg:border-solid text-center md:text-left 
}
.nickname{
  @apply mb-0 mt-3 text-gray-700 text-base italic
}
.card-desc{
  @apply w-full mx-auto lg:pl-8 lg:w-3/5 text-left sm:flex sm:flex-col sm:justify-start 
}
.response{
  @apply  mt-4 lg:mt-0  md:text-left text-lg
}
</style>
