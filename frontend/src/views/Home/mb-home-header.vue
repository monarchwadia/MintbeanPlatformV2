<template lang="pug">
div.flex.flex-col
  div.px-2.md_px-0.flex.justify-around.pb-10(style="background: linear-gradient(0deg,#a3fedf,#fff 50%); box-shadow: 0 10px 20px -10px rgba(0,0,0,0.3);")
    div.container.text-white.rounded-lg(style="background: linear-gradient(0deg, black, #3d3d3d);")
      div.lg_flex.justify-between.px-16
        div.flex-initial.lg_py-20.pt-20.text-center
          p.lg_text-6xl.lg_text-left.lg_block.text-center.text-3xl.inline.font-semibold Write code.&nbsp;
          p.lg_text-6xl.lg_text-left.lg_block.text-center.text-3xl.inline.font-semibold Get noticed.&nbsp;
          p.lg_text-6xl.lg_text-left.lg_block.text-center.text-3xl.inline.font-semibold Get hired.&nbsp;
          p.text-l.pt-5 Come to learn. Stay to grow. And have fun.
        div.pt-1.flex-initial.lg_pt-20.py-20.flex-col
          div.flex.lg_justify-start.justify-center
            div.p-3
              h1.font-semibold.text-2xl.lg_text-3xl.xl_text-5xl.mt-5.text-right Online Hackathons
              div.text-xl.md_text-xl.xl_text-2xl.mt-5.text-right
                p Mondays & Wednesdays
                p.mt-5 12pm EST / 9am PST
                p.mt-5
            div.p-3.sm_block.hidden
              mb-image-display(serverId="c58b49717bb0118438ee4a47e4ed2038")
              img.signup-bean.u-pulse(src='../../assets/bean.png')
          div.pt-4.md_pt-10
            mb-external-link-follow(href="https://www.eventbrite.ca/o/mintbean-28752300031")
              div.text-center.u-pulse.text-black.p-6.min-w-full.gradient-blue-mint.text-2xl.rounded-lg.cursor-pointer See all upcoming events
</template>

<script>
export default {};
</script>
