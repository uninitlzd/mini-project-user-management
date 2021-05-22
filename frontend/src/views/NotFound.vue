<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <EmojiSadIcon class="w-20 mx-auto text-gray-400"/>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Page not found
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
            Back
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { EmojiSadIcon } from '@heroicons/vue/solid'

export default {
  components: {
    EmojiSadIcon,
  },
}
</script>