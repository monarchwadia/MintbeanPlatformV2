<template>
  <div v-bind="{ ...$props, ...$attrs }">
    <component
      v-for="(link, i) in links"
      :key="i"
      :is="componentFor(link)"
      v-bind="attrsFor(link)"
    >
      {{ link.label }}
    </component>
  </div>
</template>

<script>
const COMPONENTS = {
  "external-follow": {
    component: "mb-external-link-follow",
    attrsFor: (link, linkClass) => {
      return {
        class: linkClass,
        href: link.ref
      };
    }
  },
  external: {
    component: "mb-external-link",
    attrsFor: (link, linkClass) => {
      return {
        class: linkClass,
        href: link.ref
      };
    }
  },
  internal: {
    component: "router-link",
    attrsFor: (link, linkClass) => {
      return {
        class: linkClass,
        to: link.ref
      };
    }
  },
  action: {
    component: "mb-a",
    attrsFor: (link, linkClass) => {
      return {
        class: linkClass,
        href: "#",
        "v-on": { click: link.ref }
      };
    }
  }
};

export default {
  name: "mb-links",
  props: ["links", "linkClass"],
  methods: {
    componentFor(link) {
      return COMPONENTS[link.type].component;
    },
    attrsFor(link) {
      return COMPONENTS[link.type].attrsFor(link, this.linkClass);
    }
  }
};
</script>
