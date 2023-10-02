<script setup lang="ts">
import ProjectsHeader from "@/components/Settings/Projects/ProjectsHeader.vue";
import ProjectList from "@/components/Settings/Projects/ProjectsList.vue";
import AddNewProject from "@/components/Settings/Projects/AddNewProject.vue";
import ProjectsInheritedCount from "@/components/Settings/Projects/ProjectsInheritedCount.vue";
import AssigneeProjectList from "@/components/Settings/Projects/AssigneeProjectList.vue";
</script>

<template>
  <MySettingsLayout>
    <div>
      <div class="flex flex-col border-b pb-10">
        <ProjectsHeader />
        <ProjectList />
        <AddNewProject />
      </div>
      <div class="flex flex-col pt-10">
        <ProjectsInheritedCount />
        <AssigneeProjectList />
      </div>
    </div>
  </MySettingsLayout>
</template>
