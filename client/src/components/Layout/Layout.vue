<script setup lang="ts"></script>

<template>
  <div className="flex flex-col h-screen">
    <header>
      <Navigation />
    </header>

    <main className="grow">
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
