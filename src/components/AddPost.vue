<template>
  <div class="post-form">
    <div class="post_card">
      <input v-model="newPostText" class="post-input" placeholder="Новый пост..."/>
      <button class="post-button" @click="addPost">Добавить</button>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { usePostStore } from "@/stores/PostStore";

const postStore = usePostStore();
const newPostText = ref('');

const addPost = () => {
  postStore.addPost(newPostText.value); 
  newPostText.value = '';
};
</script>

<style scoped>
.post-form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  padding: 20px;

}


.post_card{
  border: 3px solid #0094FF;
  padding: 20px;
  border-radius: 13px;
}
.post-input {
  width: 550px;
  height: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.post-button {
  background-color: #216CFF;
  width: 160px;
  height: 45px;
  font-size: 18px;
  color: white;
  padding: 10px 20px;
  margin-left: 25px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
</style>