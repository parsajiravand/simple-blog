<script setup lang="ts">
import { onMounted, reactive } from "vue";
import MultiSelectTagging from "../components/MultiSelectTagging.vue";
import { Post, usePostStore } from "../store/posts";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/users";
import { useRouter } from "vue-router";
const router = useRouter();
const form = reactive({
  title: "",
  image: "",
  likes: 0,
  tags: [],
  publishDate: new Date().toISOString().slice(0, 10),
  text: "",
  userId: 0,
}) as Post;
const postStore = usePostStore();
const { isLoading } = storeToRefs(postStore);

// get users from store
const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const onSubmit = async () => {
  // handeling form validation simple way
  // @notice: this is not the best way to do it but it's simple
  // if you want to do it the best way you can use vee-validate
  const validation = [
    form.title.length > 0,
    form.image.length > 0,
    form.likes !== null,
    form.tags.length > 0,
    form.publishDate.length > 0,
    form.text.length > 0,
    form.userId !== null,
  ];
  if (validation.includes(false)) {
    alert("Please fill all fields");
    return;
  }

  const res = await postStore.createPost(form as Post);
  // check if post created successfully
  if (res?.status === 201) {
    alert("Post created successfully");
    router.push({ name: "index" });

    return;
  }
};
onMounted(async () => {
  // fetch users if not fetched
  if (users.value.length === 0) {
    await userStore.fetchUsers();
  }
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
        <h1 class="text-2xl font-bold text-gray-700 mx-3">New Post</h1>
      </div>

      <!--  Publish post button -->
      <button
        @click="onSubmit"
        :disabled="isLoading"
        :class="isLoading ? 'bg-blue-300' : 'bg-blue-500'"
        class="flex items-center justify-center p-2 rounded-full px-4 h-10 bg-blue-500 shadow-md"
      >
        <span class="text-white" v-if="!isLoading">Publish post</span>
        <span class="text-white" v-else>Creating post...</span>
      </button>
    </section>
    <!-- setup create post form -->
    <section>
      <form class="max-w-lg mx-auto p-4 bg-white">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700" for="id"
            >Title</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="id"
            v-model="form.title"
            required
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
            required
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
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700" for="tags"
            >Tags</label
          >
          <MultiSelectTagging
            v-model="form.tags"
            allow-custom-tag
            :options="['tag1', 'tag2', 'tag3', 'tag4', 'tag5']"
            :field-name="{
              label: 'title',
              key: 'id',
            }"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-700" for="text"
            >Text</label
          >
          <input
            class="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="text"
            v-model="form.text"
            required
          />
        </div>

        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-gray-700"
            for="userId"
            >User</label
          >
          <select
            class="w-full p-2 border border-gray-300 rounded"
            id="userId"
            v-model="form.userId"
            required
          >
            <option
              class="p-2"
              v-for="user in users"
              :key="user.id"
              :value="user.id"
            >
              {{
                user.firstName + " " + user.lastName + " (" + user.email + ")"
              }}
            </option>
          </select>
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
select {
  border-radius: 8px;
  &:focus {
    outline: none;
    border: 1px solid #9d9d9d;
  }
}
</style>
