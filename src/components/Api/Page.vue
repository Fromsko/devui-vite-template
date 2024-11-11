<template>
  <div class="join flex justify-center">
    <button v-show="store.currentPage === 1" class="join-item btn"
            @click="store.setPage(store.currentPage - 1)">
      Previous
    </button>

    <button v-for="page in visiblePages" :key="page" :class="{
            'btn-disabled': page === '...',
            'btn-active': page === store.currentPage
        }" class="join-item btn" @click="page !== '...' ? store.setPage(Number(page)) : null">
      {{ page }}
    </button>

    <button v-show="store.currentPage === store.totalPages" class="join-item btn"
            @click="store.setPage(store.currentPage + 1)">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useHelpStore } from "@/utils/stores/useHelpStore";
import { computed } from "vue";

const store = useHelpStore();

const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 3;
  const startPage = Math.max(1, store.currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(store.totalPages, startPage + maxVisiblePages - 1);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < store.totalPages) {
    if (endPage < store.totalPages - 1) {
      pages.push("...");
    }
    pages.push(store.totalPages);
  }

  return pages;
});
</script>
