<script setup lang="ts"></script>

<template>
  <div class="dropdown dropdown-bottom dropdown-end flex items-center">
    <button tabIndex="{0}"><IconBell /></button>
    <div tabIndex="{0}" class="dropdown-content z-[1] menu p-2 w-[600px]">
      <div class="shadow bg-base-100 p-2">
        <div class="flex items-center justify-between">
          <span class="font-medium text-lg">Notifications</span>
          <div className="form-control w-[180px]">
            <label class="cursor-pointer label">
              <span class="text-gray-600 text-sm">Show only unread</span>
              <input type="checkbox" class="toggle toggle-primary" checked />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
