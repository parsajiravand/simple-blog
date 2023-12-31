<template>
  <div class="relative">
    <section class="custom-multi-select">
      <div>
        <div
          v-for="tag in selectedTags"
          :key="tag"
          class="inline-flex items-center my-1 mr-1 px-3 py-1 text-xs text-gray-600 border rounded-full"
        >
          <span class="text-xs font-semibold me-2">{{ tag }}</span>
          <button @click="removeTag(tag)">
            <!-- add close svg icon -->
            <svg
              class="w-3 h-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 8.586L15.95 2.636a1 1 0 111.414 1.414L11.414 10l5.95 5.95a1 1 0 11-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 11-1.414-1.414L8.586 10 2.636 4.05A1 1 0 114.05 2.636L10 8.586z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap flex-col rounded border">
        <div class="relative">
          <input
            v-model="inputValue"
            @keydown.escape="inputValue = ''"
            class="custom-input"
            placeholder="Add tag..."
            @click="showOptions = !showOptions"
          />
          <button
            @click="addTag()"
            class="font-bold text-blue-500 absolute right-2 bottom-2"
            :class="inputValue.length ? 'text-blue-500' : 'text-gray-300'"
          >
            Add +
          </button>
        </div>
      </div>

      <ul v-if="showOptions" class="list-items">
        <li
          v-for="option in filterResult"
          :key="option"
          @click="selectOption(option)"
          class="item"
        >
          {{ option }}
        </li>
      </ul>
      <ul class="list-items" v-if="showOptions && !filterResult.length">
        <li class="item text-center">No item found</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";

const props = defineProps({
  options: {
    type: Array as () => Array<any>,
    default: () => [],
  },
  fieldName: {
    type: Object,
    required: false,
    default: () => {
      return {
        label: "name",
        key: "value",
      };
    },
  },
  allowCustomTag: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array,
  },
});

// emits
const emit = defineEmits(["update:modelValue"]);

// data
const selectedTags = ref<string[]>([]);
const inputValue = ref<string>("");
const showOptions = ref<boolean>(false);

//deep clone the options with ref
const options = reactive<Array<any>>([]);

// watch props options
watch(
  () => props.options,
  (newValue) => {
    options.splice(0, options.length, ...newValue);
  },
  { immediate: true }
);

function addTag() {
  if (props.allowCustomTag) {
    if (inputValue.value && !selectedTags.value.includes(inputValue.value)) {
      selectedTags.value.push(inputValue.value);
      inputValue.value = "";
    }
  }
}

function removeTag(tag: string) {
  // selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  selectedTags.value.splice(selectedTags.value.indexOf(tag), 1);

  // add removed tag to options push to same index
  options.splice(props.options.indexOf(tag), 0, tag);
}

function selectOption(option: string) {
  selectedTags.value.push(option);
  showOptions.value = false;

  //remove selected option from options
  options.splice(options.indexOf(option), 1);
}

function filterOptions(query: string) {
  return options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );
}

// computed
const filterResult = computed(() => {
  return filterOptions(inputValue.value).filter(
    (option) => !selectedTags.value.includes(option)
  );
});

watch(selectedTags.value, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(
  () => inputValue.value,
  (newValue) => {
    if (newValue) {
      showOptions.value = true;
    } else {
      showOptions.value = false;
    }
  }
);
</script>
<style scoped>
.custom-multi-select {
  @apply bg-white  text-gray-900 text-sm rounded  outline-none  block w-full;
}
.custom-input {
  @apply w-full p-2 outline-none  block rounded  text-sm;
}
.list-items {
  @apply absolute w-full max-h-40 mb-5 rounded overflow-y-auto z-10 py-1 bg-white shadow-lg;
}
.list-items .item {
  @apply px-3 py-1 text-sm text-gray-700 hover:text-white cursor-pointer hover:bg-blue-500;
}
</style>
