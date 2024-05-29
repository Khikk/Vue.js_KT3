<template>
    <AddPost></AddPost>
    <div class="post_list">
        <PostList></PostList>
    </div>  
</template>

<script setup>
import AddPost from './components/AddPost.vue'
import PostList from './components/PostList.vue';



</script>

<style>
    .post_list{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>