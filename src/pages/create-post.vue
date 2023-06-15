<script setup lang="ts">
import { reactive } from "vue";
import MultiSelectTagging from "../components/MultiSelectTagging.vue";
const form = reactive({
  id: null,
  image: "",
  likes: null,
  tags: [],
  publishDate: "",
  text: "",
  userId: null,
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- create post page -->
    <!-- back home -->
    <section class="flex flex-row justify-between">
      <div class="flex flex-row justify-start align-middle">
        <router-link
          :to="{ name: 'index' }"
          class="flex flex-row items-center mb-4 border rounded-full p-2 text-center hover:border-blue-300 hover:text-blue-500 transition ease-in-out duration-300"
        >
          <svg
            class="w-5 h-5 cursor-pointer mx-auto"
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
        <h1 class="text-2xl font-bold text-gray-800 mx-2">Post</h1>
      </div>

      <!--  Publish post button -->
      <button
        class="flex items-center justify-center p-2 rounded-full px-4 h-10 bg-blue-500 shadow-md"
      >
        <span class="text-white">Publish post</span>
      </button>
    </section>
    <!-- setup create post form -->
    <section>
      <form class="max-w-lg mx-auto p-4 bg-white">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700" for="id"
            >ID</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="number"
            id="id"
            v-model="form.id"
          />
        </div>

        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-700"
            for="image"
            >Image</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="image"
            v-model="form.image"
          />
        </div>

        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-700"
            for="likes"
            >Likes</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="number"
            id="likes"
            v-model="form.likes"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700" for="tags"
            >Tags</label
          >
          <MultiSelectTagging
            v-model="form.tags"
            allow-custom-tag
            :options="[
              { title: 'Vue js', id: 'vue' },
              { title: 'Angular', id: 'angular' },
              { title: 'React', id: 'react' },
              { title: 'Svelte', id: 'svelte' },
              { title: 'Ember', id: 'ember' },
              { title: 'Laravel', id: 'laravel' },
            ]"
            :field-name="{
              label: 'title',
              key: 'id',
            }"
          />
        </div>

        <!-- <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-700"
            for="publishDate"
            >Publish Date</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="datetime-local"
            id="publishDate"
            v-model="form.publishDate"
          />
        </div> -->

        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700" for="text"
            >Text</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="text"
            v-model="form.text"
          />
        </div>

        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-700"
            for="userId"
            >User ID</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="number"
            id="userId"
            v-model="form.userId"
          />
        </div>
      </form>
    </section>
  </div>
</template>
<style scoped lang="scss">
/* set 8px border radius for inputs */
input {
  border-radius: 8px;
  &:focus {
    outline: none;
    border: 1px solid #9d9d9d;
  }
}
</style>
