<template>
    <ul class="flex justify-center">
        <li class="pag-but">
            <a class="pag-but-box" href="#">
                <span class="mx-1">previous</span>
            </a>
        </li>
        <h1>{{meta}}</h1>
        <li class="num">
            <a class="font-bold" href="#">1</a>
        </li>
        <li class="num">
            <a class="font-bold" href="#">2</a>
        </li>
        <li class="num">
            <a class="font-bold" href="#">3</a>
        </li>
        <li class="pag-but">
            <a class="pag-but-box" href="#">
                <span class="mx-1">Next</span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props:['meta'],
    computed:{
    },
    data() {
        return {
        }
    },
};
</script>

<style scoped>
.pag-but{
 @apply mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg
}
.pag-but-box{
 @apply flex items-center font-bold
}
.num{
 @apply mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg
}
</style>