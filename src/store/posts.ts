import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../api";

export interface Post {
  title: string | null;
  that?: number;
  text: string | null;
  image: string | null;
  likes: number | null;
  tags: string[] | null;
  publishDate: string | null;
  userId: number | null;
}

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: ref<Post[]>([]),
    post: ref<Post>({
      title: "test",
      that: 0,
      text: "",
      image: "",
      likes: 0,
      tags: [],
      publishDate: "2023-06-14T04:33:00.115Z",
      userId: 0,
    }),
    isLoading: ref(false),
  }),
  actions: {
    async fetchPosts(payload: string = "") {
      try {
        this.isLoading = true;
        const { data } = await api.get<Post[]>(
          `/posts?_expand=title&q=${payload} `
        );
        this.isLoading = false;
        this.posts = data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async fetchPost(id: string) {
      try {
        this.isLoading = true;
        const { data } = await api.get<Post>(`/posts/${id}`);
        this.isLoading = false;
        this.post = data;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },
    // create posts
    async createPost(payload: Post) {
      try {
        this.isLoading = true;
        const { data } = await api.post<Post>("/posts", payload);
        this.isLoading = false;
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
  },
});
