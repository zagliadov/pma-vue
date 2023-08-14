<script setup lang="ts"></script>

<template>
  <div class="dropdown dropdown-bottom dropdown-end flex items-center">
    <button tabIndex="{0}"><IconBell /></button>
    <div tabIndex="{0}" class="dropdown-content z-[1] menu p-4 w-[600px]">
      <div class="shadow bg-base-100">
        <div class="flex items-center justify-between p-4">
          <span class="font-medium text-lg">Notifications</span>
          <div class="flex items-center">
            <div className="form-control w-[200px]">
              <label class="cursor-pointer label px-3">
                <span class="text-gray-600 text-sm">Show only unread</span>
                <input type="checkbox" class="toggle toggle-primary" checked />
              </label>
            </div>
            <button>
              <IconNotificationSetting />
            </button>
          </div>
        </div>
        <div class="border-y p-4">
          <div class="flex items-center justify-between">
            <span
              >Brooklyn Simmons
              <span class="text-gray-400 text-sm">comments on the </span> Design
              Update <span class="text-gray-400">task</span></span
            >
            <span class="text-xs text-gray-400">2 days ago</span>
          </div>
          <div class="pt-2">
            <div class="bg-gray-100 p-3 rounded">
              <span
                >A libero cursus duis pulvinar malesuada quisque lectus.
                Venenatis egestas id sem sed egestas aliquet a feugiat nisi.
                Sapien mattis proin ultricies ante.
              </span>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between pb-2">
            <span
              >Brooklyn Simmons
              <span class="text-gray-400 text-sm">adds a file to the </span>
              Home Design <span class="text-gray-400">task</span></span
            >
            <span class="text-xs text-gray-400">5 days ago</span>
          </div>
          <div
            class="w-[150px] h-[100px] border px-2 rounded flex flex-col justify-around"
          >
            <div>
              <span>asset-Genuss.zip</span>
            </div>
            <div class="flex items-center justify-between pt-3">
              <div class="flex items-center">
                <button><IconPaperclipNotification /></button>
                <span class="pl-2">42.2 MB</span>
              </div>
              <button>
                <IconTrashNotification />
              </button>
            </div>
          </div>

        </div>
        <!-- Mark all as read -->
        <div class="flex items-center justify-between p-4 border-t<!-- Mark all as read -->
          <div class="flex items-center justify-between py-4">
            <button class="flex items-center">
              <IconDoubleCheckNotification />
              <span class="pl-2">Mark all ass read</span>
            </button>
            <button class="flex items-center">
              <span class="pr-2">Show all notification</span>
              <IconArrowRightNotification />
            </button>
          </div>">
            <button class="flex items-center">
              <IconDoubleCheckNotification />
              <span class="pl-2">Mark all ass read</span>
            </button>
            <button class="flex items-center">
              <span class="pr-2">Show all notification</span>
              <IconArrowRightNotification />
            </button>
          </div>
      </div>
    </div>
  </div>
</template>
