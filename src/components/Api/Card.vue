<template>
    <div id="card" @click="navigateToDetail">
        <span class="w-fit">{{ props.title }}</span>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'

    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    });

    const router = useRouter();

    const navigateToDetail = () => {
        router.push({
            name: "HelpDocs",
            params: { id: props.id }
        });
    };

</script>

<style scoped>
    #card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 8px;
        cursor: pointer;
        transition: box-shadow 0.3s;
        overflow: hidden;
    }

    #card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    #card span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>