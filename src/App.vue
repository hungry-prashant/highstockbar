<template>
  <div id="app" class>
    <Hero />
    <ContentSection />
    <Footer />
  </div>
</template>

<script>
import Hero from "./components/Hero.vue";
import ContentSection from "./components/ContentSection.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Hero,
    ContentSection,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
