<template>
  <div class="flex flex-col">
    <header class="bg-white">
      <div class="flex items-center py-6">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
        <div class="ml-auto">
          <router-link
            to="/users/add"
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add User
          </router-link>
        </div>
      </div>
    </header>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-if="!loading">
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full bg-blue-500 flex items-center"
                      >
                        <span class="mx-auto text-white font-semibold">{{
                          user.name[0]
                        }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.title }}</div>
                  <div class="text-sm text-gray-500">
                    {{ user.department }}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <router-link
                    :to="{ name: 'user.edit', params: { id: user.id } }"
                    class="text-indigo-600 hover:text-indigo-900 mr-8"
                    >Edit</router-link
                  >
                  <router-link
                    :to="{
                      name: 'user.change-password',
                      params: { id: user.id },
                    }"
                    class="text-indigo-600 hover:text-indigo-900 mr-8"
                    >Change Password</router-link
                  >

                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-700 font-medium hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody class="bg-white divide-y divide-gray-200" v-else>
              <tr class="p-5">
                <td colspan="5" class="p-10" v-loading="loading"></td>
              </tr>
            </tbody>
          </table>

          <div
            class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          >
            <div class="flex-1 flex justify-between sm:hidden">
              <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div
              class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
              <div class="ml-auto">
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    @click="(currentPage > 1) ? updatePage(currentPage - 1) : false"
                    href="#"
                    :disabled="page == 1"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                      {
                        'cursor-not-allowed': paginationMeta.current_page == 1,
                      },
                    ]"
                  >
                    <span class="sr-only">Previous</span>
                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                  <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                  <a
                    v-for="page in Array.from(
                      { length: paginationMeta.last_page },
                      (_, i) => i + 1
                    )"
                    :key="page"
                    href="#"
                    aria-current="page"
                    :class="
                      paginationMeta.current_page == page
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    "
                    @click="updatePage(page)"
                  >
                    {{ page }}
                  </a>
                  <a
                    @click="(currentPage < paginationMeta.last_page) ? updatePage(currentPage + 1) : false"
                    href="#"
                    :class="[
                      'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                      {
                        'cursor-not-allowed':
                          paginationMeta.current_page ==
                          paginationMeta.last_page,
                      },
                    ]"
                  >
                    <span class="sr-only">Next</span>
                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/api/user.api";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import {
  ElNotification,
  ElPopconfirm,
} from "element-plus"
import useMessageBox from "@/composables/useMessageBox";

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    ElPopconfirm
  },
  setup() {
    const users = ref([]);
    const paginationMeta = ref({});
    const loading = ref(false);
    const currentPage = ref(1);
    const messageBox = useMessageBox();

    onMounted(async () => {
      await fetchUserData();
    });

    const fetchUserData = async () => {
      loading.value = true;

      return await userService
        .index(currentPage.value)
        .then((response) => {
          users.value = response.data.data;
          paginationMeta.value = response.data.meta;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const updatePage = async (page) => {
      currentPage.value = page;

      await fetchUserData();
    };

    const deleteUser = async (id) => {
       messageBox
        .$confirm("Are you sure to delete this?", "Confirm", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          closeOnClickModal: false,
        })
        .then(async () => {
          loading.value = true
          await userService.destroy(id).then(() => {
            ElNotification.success({
              title: 'Sucessfully deleted'
            })

            fetchUserData()
          })
          .catch((e) => {
            loading.value = false
            ElNotification.error({
              title: 'Delete action failed'
            })
          })
        })
    }

    return {
      users,
      paginationMeta,
      loading,
      updatePage,
      deleteUser,
      currentPage
    };
  },
};
</script>