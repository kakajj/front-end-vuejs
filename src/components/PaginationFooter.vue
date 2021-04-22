<template>
    <div>
        <div class="pagination-row">
             <button class="pagination-btn">Previus</button>
            <span v-for="(item,index) in listData" :key="index">
                <button class="pagination-btn">{{index+1}}</button>
            </span>
             <button class="pagination-btn">Next</button>
        </div>
        <slot :pageNum="pageNum" />
    </div>
</template>

<script>
export default {
    props:{
        listData: Array
    },
    computed:{
        totalPage(){
            return this.listData/6
        }
    },
    data() {
        return {
           pageNum: 1 
        }
    },
};
</script>

<style scoped>
.pagination-btn{
    @apply cursor-pointer border-2 p-2 m-1 text-xs
}
</style>