<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- back home -->
    <div class="flex flex-row justify-start align-middle">
      <router-link
        :to="{ name: 'index' }"
        class="flex flex-row items-center mb-4 border rounded-full p-3 text-center hover:border-blue-300 hover:text-blue-500 transition ease-in-out duration-300"
      >
        <svg
          class="w-6 h-6 cursor-pointer mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          @click="$router.push({ name: 'Home' })"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
      </router-link>
      <h1 class="text-2xl font-bold text-gray-800 mx-2 mt-2">Post</h1>
    </div>
    <div
      class="box-border flex flex-col items-start justify-between  p-3 rounded-md"
    >
      <!-- Card content goes here -->
      <img class="w-full h-auto" :src="post.image" alt="Card Image" />
      <h1
        class="text-3xl font-bold text-gray-800 my-4 hover:text-blue-500 cursor-pointer transition duration-300 ease-in-out"
      >
        {{ post.title }}
      </h1>

      <p class="text-lg">{{ post.text }}</p>
      <div class="flex flex-wrap gap-2 my-4">
        <Tag v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>

      <!-- User details -->
      <div
        class="flex flex-row my-4 w-full justify-between items-center"
        v-if="user"
      >
        <div class="flex flex-row items-center">
          <div
            class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl text-gray-500"
          >
            {{ user.firstName.slice(0, 1) }}{{ user.lastName.slice(0, 1) }}
          </div>
          <div class="ml-4">
            <p class="text-xl font-bold">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <p class="text-gray-500">
              {{ dateFormat(post.publishDate) }}
            </p>
          </div>
        </div>
        <!-- Likes -->
        <div class="text-gray-400 flex flex-row items-center">
          <span class="mr-1">
            {{ post.likes }}
          </span>
          <svg
            class="w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300 ease-in-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.5 3.5C7.5 1.5 10.5 1.5 12 3.5C13.5 1.5 16.5 1.5 18.5 3.5C21.5 6.5 21.5 11.5 12 20.5C2.5 11.5 2.5 6.5 5.5 3.5Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tag from "../components/Tag.vue";
import { dateFormat } from "../composables";
import { usePostStore } from "../store/posts";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { User, useUserStore } from "../store/users";

// route
const route = useRoute();

// post store
const postStore = usePostStore();
const { post } = storeToRefs(postStore);

// user store
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const user = ref<User | null>(null);

// find user
const findUser = (userId: number) => {
  return users.value.find((user) => user.id === userId);
};
onMounted(async () => {
  await postStore.fetchPost(route.params.id as string);
  // fetch users if not fetched
  if (users.value.length === 0) {
    await userStore.fetchUsers();
  }
  user.value = findUser(post.value.userId) as User;
});
</script>
