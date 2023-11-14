import { mount } from "@vue/test-utils";
import TaskItem from "./TaskItem.vue";

const wrapper = mount(TaskItem);

it("shows TaskItem", async () => {
    expect(wrapper.text()).toBe("Test task");
})


