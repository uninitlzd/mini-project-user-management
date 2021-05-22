<template>
  <div>
    <header class="bg-white">
     <div class="flex items-center py-6">
        <router-link to="/profile"  class="text-3xl font-bold text-gray-400 mr-4">Profile</router-link>
        <router-link to="/profile/change-password" class="text-3xl font-bold text-gray-900">Change Password</router-link>
      </div>
    </header>
    <div class="md:grid md:grid-cols-1 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6 border-b">
            <div>
              <form-error-alert />
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-1 sm:col-span-3">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Old Password
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    v-model="passwordFormData.old_password"
                    :type="passwordVisible ? 'text' : 'password'"
                    name="password"
                    id="password"
                    class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  />
                  <span
                    @click="passwordVisible = !passwordVisible"
                    class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                  >
                    <EyeIcon
                      class="w-4 cursor-pointer"
                      v-if="!passwordVisible"
                    />
                    <EyeOffIcon class="w-4 cursor-pointer" v-else />
                  </span>
                </div>
              </div>
              <div class="col-span-1 sm:col-span-3">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    v-model="passwordFormData.new_password"
                    :type="passwordVisible2 ? 'text' : 'password'"
                    name="password"
                    id="password"
                    class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  />
                  <span
                    @click="passwordVisible2 = !passwordVisible2"
                    class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                  >
                    <EyeIcon
                      class="w-4 cursor-pointer"
                      v-if="!passwordVisible2"
                    />
                    <EyeOffIcon class="w-4 cursor-pointer" v-else />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              @click="savePasswordChanges"
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowNarrowLeftIcon, EyeIcon, EyeOffIcon } from "@heroicons/vue/solid";
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import userService from "@/api/user.api";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";
import FormErrorAlert from "@/components/FormErrorAlert.vue";

export default {
  components: {
    ArrowNarrowLeftIcon,
    EyeIcon,
    EyeOffIcon,
    ElNotification,
    FormErrorAlert,
  },
  setup() {
    const passwordVisible = ref(false);
    const passwordVisible2 = ref(false);

    const formData = ref({});
    const passwordFormData = reactive({
      old_password: null,
      new_password: null,
    });

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const auth = store.state.auth

    onBeforeMount(async () => {
      await userService
        .show(auth.user.id)
        .then((response) => {
          console.log(response);
          formData.value = response.data.data;
        })
        .catch((e) => {
          console.log("hereee", e.status);
          if (e.status == 401 || e.status == 404) {
            router.push({ name: "not-found", params: { path: "not-found" } });
          }
          return false;
        });
    });

    const savePasswordChanges = async () => {
      await userService
        .updatePassword(auth.user.id, { ...passwordFormData })
        .then(() => {
          ElNotification.success({
            title: "Success",
            message: "Password change success",
          });

          store.dispatch("errorBag/clear");

          passwordFormData.old_password = null;
          passwordFormData.new_password = null;
        })
        .catch((e) => {
          console.log(e);
          ElNotification.error({
            title: "Error",
            message: "Password change failed",
          });
        });
    };

    return {
      passwordVisible,
      passwordVisible2,
      formData,
      savePasswordChanges,
      passwordFormData,
    };
  },
};
</script>