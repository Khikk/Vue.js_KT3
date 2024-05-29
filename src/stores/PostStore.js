import { defineStore } from "pinia";
import { ref, watch } from "vue";

const initialData  = ref([
  {
    id: 1,
    title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
    comments: [
      { id: 1, text: "Самый яркий комментарий в этом посте" },
      { id: 2, text: "Один из бессмысленный комментарий в этом посте"}
    ],
    isShowingComments: false,
    isCommentInputVisible: false,
    newCommentText: ''
  },
  {
    id: 2,
    title: "Краткосрочное вымышленное преломление может выполнять особую роль в   пространстве главной роли игрока ",
    comments: [
      { id: 1, text: "Очень научно и непонятно" },
    ],
    isShowingComments: false,
    isCommentInputVisible: false,
    newCommentText: ''
  }
]);

export const usePostStore = defineStore('postStore', () => {
  const posts = ref(JSON.parse(localStorage.getItem('posts')) ?? initialData.value)

  const deletePost = (postId) => {
    posts.value = posts.value.filter(post => post.id !== postId);
  };

  const deleteComment = (postId, commentId) => {
    const postToUpdate = posts.value.find(post => post.id === postId);
    if (postToUpdate) {
      postToUpdate.comments = postToUpdate.comments.filter(comment => comment.id !== commentId);
    }
  };

  const addPost = (newPostTitle) => {
    if (newPostTitle.trim() !== '') {
      const newPost = {
        id: posts.value.length + 1,
        title: newPostTitle,
        comments: [],
        isShowingComments: false,
        isCommentInputVisible: false,
        newCommentText: ''
      };
      posts.value.push(newPost);
    }
  };

  const toggleCommentsDisplay = (post) => {
    post.isShowingComments = !post.isShowingComments;
    toggleCommentInput(post);
  };

  const toggleCommentInput = (post) => {
    post.isCommentInputVisible = !post.isCommentInputVisible;
  };

  const openEditModal = (post) => {
    selectedPost.value = post;
    editedPostTitle.value = post.title;
    isModalOpen.value = true;
  };

  const closeEditModal = () => {
    isModalOpen.value = false;
    editedPostTitle.value = '';
    selectedPost.value = null;
  };

  const saveEditChanges = () => {
    if (selectedPost.value) {
      selectedPost.value.title = editedPostTitle.value;
    }
    closeEditModal();
  };

  const addCommentToPost = (post) => {
    if (post.newCommentText && post.newCommentText.trim() !== '') {
      const newComment = { id: post.comments.length + 1, text: post.newCommentText.trim() };
      post.comments.push(newComment);
      post.newCommentText = '';
    }
  };

  const isModalOpen = ref(false);
  const editedPostTitle = ref('');
  const selectedPost = ref(null);
  const newComment = ref('');

  watch(
    () => posts.value, // Изменяем доступ к posts.value
    () => {
      localStorage.setItem('posts', JSON.stringify(posts.value))
    },
    {deep: true}
  )

  return {
    posts, // Передаем posts в качестве ref
    deletePost,
    deleteComment,
    addPost,
    toggleCommentsDisplay,
    toggleCommentInput,
    openEditModal,
    closeEditModal,
    saveEditChanges,
    addCommentToPost,
    isModalOpen,
    editedPostTitle,
    selectedPost,
    newComment,
  };
});