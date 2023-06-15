<script setup lang="ts">
import { usePostStore } from "../store/posts";
import { User, useUserStore } from "../store/users";
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
          placeholder="Search By Title"
          v-model="searchTerm"
          class="flex-grow outline-none text-sm"
        />
      </div>
      <div>
        <router-link
          tag="button"
          :to="{
            name: 'create',
          }"
          class="flex items-center justify-center p-2 rounded-full px-4 h-10 bg-blue-500 shadow-md hover:bg-blue-600"
        >
          <span class="text-white">Add new post</span>
          <!-- add plus-circle white -->
          <svg
            xmlns="http://www.w3.org/2000/svg"

            viewBox="0 0 24 24"
            class="text-white  ml-2 w-6 h-6"
          >
            <path
              fill="currentColor"
              d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
            />
          </svg>
        </router-link>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <div
        v-if="isLoading"
        v-for="index in 20"
        :key="index"
        class="animate-pulse mb-4 col-span"
      >
        <div class="bg-gray-300 rounded h-96"></div>
      </div>
      <div v-for="post in posts" :key="post.that" class="my-3 hover:shadow-lg">
        <!-- setup skeleton when search -->
        <Card
          :cardData="post"
          :user="(findUser(post.userId) as User)"
          class="h-full"
        />
      </div>
      <div v-if="posts.length === 0 && searchTerm" class="">
        <p class="text-center text-2xl text-gray-400">No posts found</p>
      </div>
    </div>
  </main>
</template>
<style></style>
