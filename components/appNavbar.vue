

<script setup></script>

<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
          id="nav-title"
        >
          <img
            src="/favicon.ico"
            class="h-8"
            alt="Not Delish Logo"
          />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Not Delish</span
          >
        </NuxtLink>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <NuxtLink to="/"> Home </NuxtLink>

            <NuxtLink to="about"> About </NuxtLink>

            <NuxtLink to="create"> Create </NuxtLink>

          </ul>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<style>

#nav-title {
    color:black;
}

.router-link-exact-active {
    color: blue;
}

</style>
