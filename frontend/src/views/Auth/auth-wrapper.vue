<template lang="pug">
section(class="noop")
  div.flex.flex-row.align-center.justify-center(:style="{ 'backgroundImage': `url(${authBackground})`, minHeight: '80vh' }")
    div.container.m-auto.flex.flex-row-reverse.align-center.justify-right
      div.rounded-md.gradient-blue-mint.flex.flex-col.align-center.justify-center.p-1
        <slot />
</template>

<script>
import authBackground from "../../assets/auth-background.jpg";

export default {
  data() {
    return {
      authBackground
    };
  }
};
</script>
