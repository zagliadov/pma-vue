<script setup lang="ts">
import { RouterLink } from "vue-router";

</script>

<template>
  <div className="flex justify-center h-screen w-screen">
    <div className="flex flex-col items-center">
      <div className="flex flex-col h-screen justify-start">
        <div className="flex justify-start pt-8 pb-40">
          <RouterLink
            to="/login"
            className="btn btn-neutral-content flex flex-row items-center py-2.5 px-7 border border-neutral-content rounded"
          >
            <IconLeftArrow />
            <span className="pl-2.5 ">Back to Log in</span>
          </RouterLink>
        </div>
        <div className="w-[464px] h-[512px] flex flex-col">
          <p className="text-2xl pb-8">Forgot password?</p>
          <label
            htmlFor="email"
            className="text-xs font-normal text-gray-600 pb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="input input-bordered w-full pl-4 py-3 rounded"
          />

          <p className="text-sm font-normal text-gray-600 py-8">
            We will send you the link to your email. You will be able to create
            a new password
          </p>

          <button
            className="btn btn-primary text-white font-medium text-base py-2.5 rounded"
          >
            Reset password
          </button>
        </div>
      </div>
    </div>
    <div className="desktop:w-1/2 bg-no-repeat bg-cover bg-gray-50"></div>
  </div>
</template>
