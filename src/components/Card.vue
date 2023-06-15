<template>
  <div
    class="box-border flex flex-col items-start justify-between border p-3 border-gray-100 rounded-md"
  >
    <!-- Card content goes here -->
    <router-link :to="{ name: 'post', params: { id: cardData.id } }">
      <img class="w-full h-auto" :src="cardData.image" alt="Card Image" />
      <div
        class="text-xl font-bold text-gray-800 my-2 hover:text-blue-500 cursor-pointer transition duration-300 ease-in-out"
      >
        {{ transcute(cardData.title) }}
      </div>
    </router-link>

    <p class="text-sm">{{ transcute(cardData.text, 128) }}</p>
    <div class="flex flex-wrap gap-1 my-2">
      <Tag v-for="tag in cardData.tags" :key="tag" :tag="tag" />
    </div>

    <!-- implement user(avatar,firstname,lastname) -->
    <div
      class="flex flex-row my-2 w-full justify-between items-center"
      v-if="user"
    >
      <div class="flex flex-row">
        <!-- User Avatar got net::ERR_TUNNEL_CONNECTION_FAILED -->
        <!-- <img
          v-if="user.avatar"
          class="w-8 h-8 rounded-full"
          :src="user.avatar"
          alt="User Avatar"
        /> -->
        <!-- handel avatar with firstName slice and lastName slice -->
        <div
          class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <span class="text-xs text-gray-500">
            {{ user.firstName.slice(0, 1) }}{{ user.lastName.slice(0, 1) }}
          </span>
        </div>
        <div class="mx-2">
          <p class="text-xs font-bold">
            {{ user.firstName }} {{ user.lastName }}
          </p>
          <p class="text-xs text-gray-500">
            {{ dateFormat(cardData.publishDate) }}
          </p>
        </div>
      </div>
      <!-- implement likes with icon and likes count -->
      <div class="text-gray-400 flex flex-row">
        <span>
          {{ cardData.likes }}
        </span>
        <!-- heart icon -->
        <svg
          class="w-6 h-6 cursor-pointer hover:text-red-500 transition duration-300 ease-in-out mx-1"
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
</template>

<script setup lang="ts">
import Tag from "./Tag.vue";
import { transcute, dateFormat } from "../composables";
defineProps({
  cardData: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});
</script>
