<template>
  <d-card class="card-demo-basic">
    <template #avatar>
      <d-avatar name="DevUI"></d-avatar>
    </template>
    <template #title> {{ title }} </template>
    <template #subtitle class="card-demo-icon">
      <d-icon name="company-member"></d-icon><span>DevUI</span>
    </template>
    <template #content>
      {{ content }}
    </template>
    <template #actions>
      <div class="card-block">
        <d-icon name="like"></d-icon><span>{{ likeNum }}</span>
      </div>
      <div class="card-block">
        <d-icon name="star-o"></d-icon><span>{{ starNum }}</span>
      </div>
      <div class="card-block">
        <d-icon name="message"></d-icon><span>{{ msgNum }}</span>
      </div>
    </template>
  </d-card>
</template>

<script lang="ts" setup>
import { defineProps, ref, withDefaults } from 'vue'

// 定义 props，并使用 withDefaults 提供默认值
const props = withDefaults(
  defineProps<{
    title?: string
    content?: string
    likeNum?: number
    starNum?: number
    msgNum?: number
  }>(),
  {
    title: '我是标题',
    content: '默认内容',
    likeNum: 5,
    starNum: 2,
    msgNum: 0,
  }
)

const title = ref(props.title)
const content = ref(props.content)
const likeNum = ref(props.likeNum)
const starNum = ref(props.starNum)
const msgNum = ref(props.msgNum)
</script>

<style scoped lang="scss">
.card-demo-basic {
  cursor: pointer;

  .card-demo-icon {
    cursor: pointer;
    font-size: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .card-demo-icon + span {
    vertical-align: middle;
  }
  .card-block {
    margin-right: 16px;
    i {
      cursor: pointer;
      font-size: 16px;
      margin-right: 8px;
      vertical-align: middle;
    }
    i + span {
      vertical-align: middle;
    }
  }
  .card-container {
    width: 350px;
  }
  .action-text {
    color: #8a8e99;
  }
}
</style>
