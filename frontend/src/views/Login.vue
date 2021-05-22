<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            v-model="formData.email"
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            v-model="formData.password"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          @click="login"
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { defineComponent, onBeforeMount, reactive } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import authService from "@/api/auth.api";
import useAuthenticationChecking from '@/composables/useAuthenticationChecking'
import { ElNotification } from "element-plus";

export default defineComponent({
  components: {
    LockClosedIcon,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const auth = store.state.auth;
    const formData = reactive({
      email: null,
      password: null,
    });
    const { isAuthenticated } = useAuthenticationChecking()

    onBeforeMount(() => {
      if (isAuthenticated) {
        router.push("/users");
      }
    });

    const login = async () => {
      await authService.login(formData)
      .then(async (response) => {
        const { token, expiresIn } = response.data;
        store.dispatch("auth/setToken", { token, expiresIn });
        ElNotification.success({
              title: "Login success",
          })

          await authService.getUserProfile().then((response) => {
                store.dispatch("auth/setUser", response.data.data);
            });
      })
      .catch(() => {
          ElNotification.error({
              title: "Login failed",
              message: "Check your credential carefully"
          })
      });


      if (auth.user.is_admin) {
          router.push('/users')
      } else {
          router.push('/profile')
      }

    };

    return {
      login,
      formData,
    };
  },
});
</script>