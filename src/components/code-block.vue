<template>
    <div class="code-block">
        <slot name="component"></slot>
        <div class="unique-describe">
            <slot name="describe"></slot>
        </div>
        <div class="code lineheight">
            <slot name="code"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'code-block',
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
