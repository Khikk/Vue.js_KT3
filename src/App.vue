<template>
    <AddPost></AddPost>
    <div class="main_list">
    <PostList></PostList>
    </div>  
</template>

<script setup>
import AddPost from './components/AddPost.vue'
import PostList from './components/PostList.vue';
</script>

<style>
    .main_list{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>