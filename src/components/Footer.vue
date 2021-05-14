<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>
          <a href="https://github.com/hungry-prashant/highstockbar">
            High Stock Bar
          </a>
          <br />
        </strong>
        This app is test project for Ellume.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  bottom: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>
