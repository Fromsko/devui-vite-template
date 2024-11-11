import { apiInfo } from "@/components/Api/help.json";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface NoteCard {
  id: string;
  title: string;
  content: string;
}

export const useHelpStore = defineStore("HelpStore", () => {
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(40); // 5列 * 8行
  const items = ref<NoteCard[]>(apiInfo); // 使用 NoteCard 类型

  // 新增：用于存储每一页的映射
  const pageItemsMap = ref<Record<number, NoteCard[]>>({});

  // 计算总页数
  const totalPages = computed(() => {
    return Math.ceil(items.value.length / itemsPerPage.value);
  });

  // 初始化数据映射
  const initializePageItems = () => {
    const pagesCount = totalPages.value;

    for (let i = 0; i < pagesCount; i++) {
      const start = i * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      pageItemsMap.value[i + 1] = items.value.slice(start, end);
    }
  };

  // 初始化数据
  initializePageItems();

  const paginatedItems = computed(() => {
    return pageItemsMap.value[currentPage.value] || [];
  });

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  return {
    currentPage,
    itemsPerPage,
    paginatedItems,
    totalPages,
    setPage
  };
});
