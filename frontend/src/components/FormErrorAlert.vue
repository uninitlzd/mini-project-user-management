<template>
  <div
    v-if="errorCount"
    class="bg-red-200 rounded-md text-teal-900 px-4 py-3"
    role="alert"
  >
    <div class="flex">
      <div class="py-1">
        <svg
          class="fill-current h-6 w-6 text-red-800 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          />
        </svg>
      </div>
      <div>
        <p class="text-red-800 font-semibold">There were {{ errorCount }} errors with your submission</p>
        <ul class="list-disc list-inside text-red-700">
            <li v-for="(message, field) in errorBag.errors" :key="field">
                {{ message[0] }}
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import {XIcon} from '@heroicons/vue/solid'
export default {
    components: {
        XIcon
    },
  setup() {
      const store = useStore();
      const errorBag = store.state.errorBag;

      return {
          errorBag,
          errorCount: computed(() => {
              const {errors} = errorBag

              if (errors != null) {
                  return Object.keys(errors).length
              }

              return 0
          })
      }
  },
};
</script>