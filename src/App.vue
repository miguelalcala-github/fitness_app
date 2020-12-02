<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --primary-color: hsl(15, 50%, 50%);
  --error-color: hsl(5, 50%, 50%);
  --error-bg-color: hsl(5, 90%, 95%);
  font-family: sans-serif;
  font-weight: 100;
  --grey-100: #e4e9f0;
  --grey-200: #cfd7e3;
  --grey-300: #b5c0cd;
  --grey-800: #3e4e63;
  --grid-gap: 1px;
  --day-label-size: 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  outline: none;
  padding: 0.5rem 1.5rem;
  border-style: solid;
  border-width: 1px;
  background-color: white;
}

.errors {
  background-color: var(--error-bg-color);
}

.errors ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.errors li {
  color: var(--error-color);
}
</style>
