<template>
  <div class="post" v-for="post in postStore.posts" :key="post.id"> 
    <h3>{{ post.title }}</h3>
    <div class="post-actions">
      <button class="post-button" style="background-color: #216CFF;" @click="postStore.toggleCommentsDisplay(post)">Комментарии</button>
      <span class="comment-count">{{ 'Кол-во комментариев ' + post.comments.length }}</span>
      <button class="post-button" style="background-color: #216CFF;" @click="postStore.openEditModal(post)">Изменить</button>
      <button class="post-button" style="background-color: #FF218B;" @click="postStore.deletePost(post.id)">Удалить</button>
    </div>
    <div class="line"></div>
    <div v-if="post.isShowingComments" class="comment-section"> 
      <div class="comment-input" v-if="post.isCommentInputVisible">
        <input v-model="post.newCommentText" placeholder="Введите комментарий" class="comment-input-field" />
        <button class="comment-button" @click="addCommentToPost(post)">Добавить</button>
      </div>
      <div v-for="comment in post.comments" :key="comment.id" class="comment">
        <span>{{ comment.text }}</span>
        <button class="comment-button" style="background-color: #FF218B;" @click="postStore.deleteComment(post.id, comment.id)">Удалить</button>
      </div>
      <button class="post-button" style="background-color: #216CFF;" @click="postStore.toggleCommentsDisplay(post)">Свернуть</button>
    </div>

    <div v-if="postStore.isModalOpen" class="modal-overlay">
      <div class="modal">
        <input v-model="postStore.editedPostTitle" class="modal-input" />
        <div class="modal-buttons">
          <button class="post-button" style="background-color: #216CFF;" @click="postStore.saveEditChanges">Изменить</button>
          <button class="post-button" style="background-color: #FF218B;" @click="postStore.closeEditModal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "@/stores/PostStore";

const postStore = usePostStore();
const addCommentToPost = (post) => {
  postStore.addCommentToPost(post);
};
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #0094FF;
  
  width: 800px;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 50px;
}

.post-actions {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.post-button {
  font-size: 16px;
  color: white;
  border-radius: 15px;
  padding: 10px 20px;
  
  border: none;
  cursor: pointer;
}

.comment-count {
  margin-top: 10px;
  margin-right: 50px;
  font-size: 16px; 
}

.line{
  border-bottom: 1px solid lightgray;
  margin-top: 20px;
  width: 750px;
}

.comment-section {
  margin-top: 20px;

}

.comment-input {
  display: flex;
  align-items: center;
  gap: 10px;

}

.comment-input-field {
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 15px;
}

.comment-button {
  background-color: #216CFF;
  color: white;
  padding: 10px 14px;
  margin-left: 10px;
  
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.comment {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 30px;
  height: 20px;
}

.comment span {
  flex-grow: 1;
  padding: 10px 20px;

}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}


.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 220px;
  border: 1px solid #0094FF;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 8px;
}

.modal-input {
  width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  gap: 20px;
}
</style>