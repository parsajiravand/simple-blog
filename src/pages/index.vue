<script setup lang="ts">
import { usePostStore } from "../store/posts";
import { useUserStore } from "../store/users";
import { onMounted, ref, watch } from "vue";
import Card from "../components/Card.vue";
import { storeToRefs } from "pinia";
//@ts-ignore
import _ from "lodash";
const postStore = usePostStore();
const { posts, isLoading } = storeToRefs(postStore);
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const searchTerm = ref<string>("");
// fetch posts on search with debounce and no more than 1 request also trim the search term
watch(
  searchTerm,
  //set isLoading to true

  _.debounce((newVal: string) => {
    postStore.fetchPosts(newVal.trim());
  }, 300)
);
const findUser = (userId: number) => {
  return users.value.find((user) => user.id === userId);
};
onMounted(() => {
  postStore.fetchPosts();
  userStore.fetchUsers();
});
</script>
<template>
  <main class="container my-5 mx-auto">
    <header class="flex flex-row justify-between my-5">
      <div
        class="box-border flex flex-row items-center p-2 rounded-full w-80 h-10 border border-gray-300"
      >
        <!-- search icon -->
        <svg
          class="w-5 h-5 text-gray-400 mx-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35"
          ></path>
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            stroke-width="2"
          ></circle>
        </svg>
        <input
          type="text"
          placeholder="Search"
          v-model="searchTerm"
          class="flex-grow outline-none text-sm"
        />
      </div>
      <div>
        <button
          class="flex items-center justify-center p-2 rounded-full px-4 h-10 bg-blue-500 shadow-md"
        >
          <span class="text-white">Add new post</span>
          <!-- add plus-circle white -->
          <svg
            class="w-5 h-5 text-white mx-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-if="isLoading"
        v-for="index in 20"
        :key="index"
        class="animate-pulse mb-4 col-span"
      >
        <div class="bg-gray-300 rounded h-96"></div>
      </div>
      <div v-for="post in posts" :key="post.that">
        <!-- setup skeleton when search -->

        <Card :cardData="post" :user="findUser(post.userId)" class="h-full" />
      </div>
      <div v-if="posts.length === 0" class="">
        <p class="text-center text-2xl text-gray-400">No posts found</p>
      </div>
    </div>
  </main>
</template>
<style></style>
