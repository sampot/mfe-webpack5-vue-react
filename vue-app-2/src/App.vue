<template>
  <div>
    <h3>Vue App 2</h3>
    <Content />
    <Button />
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
// import Content from "./components/Content";
// import Button from "./components/Button";
export default {
  components: {
    Button: defineAsyncComponent(() => import("./components/Button")),
  },
  // components: {
  //   Content,
  //   Button,
  // },
  setup() {
    console.log("vue-app-2:setup.")
    const count = ref(0);
    const inc = () => {
      count.value++;
    };

    return {
      count,
      inc,
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
