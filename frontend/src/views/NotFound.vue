<template lang="pug">
div.container.m-auto.text-center(style="height: 80vh; padding-top: 25vh")
    p.text-6xl 404
    p.text-2xl.max-w-xl.m-auto(class="italic") {{ quote }}
</template>

<script>
const QUOTES = [
  "Not all who wander are lost.",
  "'Tis better to have loved and lost than never to have loved at all.",
  "When another is lost, dare to help them find the way.",
  "We should consider every day lost on which we have not danced at least once.",
  "It's a lot easier to be lost than found. It's the reason we're always searching and rarely discovered--so many locks not enough keys.",
  "Lost opportunities, lost possibilities, feelings we can never get back. That's part of what it means to be alive.",
  "I am free and that is why I am lost.",
  "Poetry is what gets lost in translation.",
  "I'm not lost for I know where I am. But however, where I am may be lost.",
  "Love is the longing for the half of ourselves we have lost.",
  "I was born lost and take no pleasure in being found.",
  "Out of all the things I have lost, I miss my mind the most.",
  "\"Because I am lost,\" she whispered onto the earth. \"And I do not know the way.\""
];

export default {
  name: "Not Found",
  computed: {
    quote() {
      return QUOTES[Math.floor(Math.random()*QUOTES.length)];
    }
  }
};
</script>
