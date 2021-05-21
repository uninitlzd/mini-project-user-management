<template>
  <div>
    <header class="bg-white">
      <div class="flex items-center py-6">
        <router-link to="/users"
          ><ArrowNarrowLeftIcon
            class="w-7 mr-4 text-blue-500 hover:text-blue-700"
        /></router-link>
        <h1 class="text-3xl font-bold text-gray-900">Add User</h1>
      </div>
    </header>
    <div class="md:grid md:grid-cols-1 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6 border-b">
              <span class="text-sm tracking-wider text-gray-400">PROFILE</span>
              <div class="grid grid-cols-2 gap-6">
                <div class="col-span-1 sm:col-span-1">
                  <label
                    for="user_name"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="user_name"
                      id="user_name"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div class="col-span-1 sm:col-span-1">
                  <label
                    for="user_email"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="email"
                      name="user_email"
                      id="user_email"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div class="col-span-1 sm:col-span-1">
                  <label
                    for="user_title"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="user_title"
                      id="user_title"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div class="col-span-1 sm:col-span-1">
                  <label
                    for="user_department"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="user_department"
                      id="user_department"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-3">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      :type="(passwordVisible) ? 'text' : 'password'"
                      name="password"
                      id="password"
                      class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                    />
                    <span
                      @click="passwordVisible = !passwordVisible"
                      class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                    >
                      <EyeIcon class="w-4 cursor-pointer" v-if="!passwordVisible"/>
                      <EyeOffIcon class="w-4 cursor-pointer" v-else/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowNarrowLeftIcon, EyeIcon, EyeOffIcon } from "@heroicons/vue/solid";
import { ref } from "@vue/reactivity";
import { computed, onBeforeMount } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  components: {
    ArrowNarrowLeftIcon,
    EyeIcon,
    EyeOffIcon
  },
  setup() {
    const passwordVisible = ref(false)

    return {
      passwordVisible
    }
  },
};
</script>