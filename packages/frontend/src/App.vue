<script setup lang="ts"></script>

<template>
  <div class="container">
    <header class="item-header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <main class="item-main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
// Main Stylesheet
@import '@/assets/scss/main';

// All color themes are included and available by default
// Feel free to comment out any of them if you won't use them in your project
@import '@/assets/scss/theme/themes/amethyst';
@import '@/assets/scss/theme/themes/city';
@import '@/assets/scss/theme/themes/flat';
@import '@/assets/scss/theme/themes/modern';
@import '@/assets/scss/theme/themes/smooth';

.item-header {
  grid-area: header;
  display: flex;
  justify-self: center;
}
.item-main {
  grid-area: main;
}

.container {
  height: 100vh;
  justify-content: center;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 40px auto;
  grid-template-areas:
    'header'
    'main';
}

header {
  line-height: 1.5;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: #000;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
