<template>
  <section class="hero is-small is-primary">
    <div class="hero-body">
      <p class="title">
        Small hero
      </p>
      <p class="subtitle">
        Small subtitle
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hero",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
