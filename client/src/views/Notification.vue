<script setup lang="ts"></script>

<template>
  <MySettingsLayout>
    <div class="pb-10">
      <span class="font-medium text-2xl">Notification</span>
      <div class="flex pt-4">
        <div class="flex flex-col w-4/12">
          <h3 class="font-medium">Email notification</h3>
          <span class="text-sm text-gray-600"
            >Get emails to find out what’s going on when you’re not online. You
            can turn these off</span
          >
        </div>
        <div>
          <div class="flex">
            <input type="checkbox" className="toggle toggle-success" />
            <div class="flex flex-col pl-4">
              <span class="font-medium">Assigned comments</span>
              <span class="text-gray-600 text-sm"
                >Will notify you when any comment is assigned to a team member
                in a task you're watching</span
              >
            </div>
          </div>
          <div class="flex pt-7">
            <input type="checkbox" className="toggle toggle-success" />
            <div class="flex pl-4">
              <span class="font-medium">Resolved comments</span>
            </div>
          </div>
          <div class="flex pt-10">
            <input type="checkbox" className="toggle toggle-success" />
            <div class="flex flex-col pl-4">
              <span class="font-medium">Comment assigned to me</span>
              <span class="text-gray-600 text-sm"
                >Will notify you when a team member assigns you a comment</span
              >
            </div>
          </div>
          <div class="flex pt-7">
            <input type="checkbox" className="toggle toggle-success" />
            <div class="flex pl-4">
              <span class="font-medium">Comments I'm @mentioned in</span>
            </div>
          </div>
          <div class="flex pt-7">
            <input type="checkbox" className="toggle toggle-success" />
            <div class="flex pl-4">
              <span class="font-medium">New comments</span>
            </div>
          </div>
          <div class="flex pt-7">
            <input type="checkbox" className="toggle toggle-success" />
            <div class="flex pl-4">
              <span class="font-medium">Reactions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex pt-10 border-t">
      <div class="flex flex-col w-4/12">
        <h3 class="font-medium">Push notification</h3>
        <span class="text-sm text-gray-600"
          >Get push notification in web to find out what’s going on when you’re
          online</span
        >
      </div>
      <div>
        <div class="flex">
          <input type="checkbox" className="toggle toggle-success" />
          <div class="flex flex-col pl-4">
            <span class="font-medium">Assigned comments</span>
            <span class="text-gray-600 text-sm"
              >Will notify you when any comment is assigned to a team member in
              a task you're watching</span
            >
          </div>
        </div>
        <div class="flex pt-7">
          <input type="checkbox" className="toggle toggle-success" />
          <div class="flex pl-4">
            <span class="font-medium">Resolved comments</span>
          </div>
        </div>
        <div class="flex pt-10">
          <input type="checkbox" className="toggle toggle-success" />
          <div class="flex flex-col pl-4">
            <span class="font-medium">Comment assigned to me</span>
            <span class="text-gray-600 text-sm"
              >Will notify you when a team member assigns you a comment</span
            >
          </div>
        </div>
        <div class="flex pt-7">
          <input type="checkbox" className="toggle toggle-success" />
          <div class="flex pl-4">
            <span class="font-medium">Comments I'm @mentioned in</span>
          </div>
        </div>
        <div class="flex pt-7">
          <input type="checkbox" className="toggle toggle-success" />
          <div class="flex pl-4">
            <span class="font-medium">New comments</span>
          </div>
        </div>
        <div class="flex pt-7">
          <input type="checkbox" className="toggle toggle-success" />
          <div class="flex pl-4">
            <span class="font-medium">Reactions</span>
          </div>
        </div>
      </div>
    </div>
  </MySettingsLayout>
</template>
