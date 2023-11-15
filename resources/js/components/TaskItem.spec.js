import { mount } from "@vue/test-utils";
import TaskItem from "./TaskItem.vue";

const task = {
    id: 1,
    title: "Very Important Task",
    description: "This task is very important for us",
    completed: false,
};
const completedTask = {
    ...task,
    completed: true
}

describe("TaskItem", async () => {
    const wrapper = mount(TaskItem, {
        propsData: { task }
    });

    it("shows TaskItem", async () => {
        expect(wrapper.props().task.id).toBe(task.id);
        expect(wrapper.text()).toContain(task.title);
        expect(wrapper.text()).not.toContain(task.description);
    });

    it("shows details", async () => {
        await wrapper.find(".more").trigger("click");
        expect(wrapper.text()).toContain(task.description);
    });

    it("can be marked for editing", async () => {
        await wrapper.find(".edit").trigger("click");
        expect(wrapper.emitted("edit")[0]).toEqual([task.id]);
    });

    it("can be marked as completed", async () => {
        await wrapper.find(".complete").trigger("click");
        expect(wrapper.emitted("complete")[0]).toEqual([task.id]);
    });

    it("can be marked as uncompleted", async () => {
        await wrapper.setProps({ task: completedTask });
        await wrapper.find(".uncomplete").trigger("click");
        expect(wrapper.emitted("uncomplete")[0]).toEqual([task.id]);
    });

    it("can request deletion", async () => {
        await wrapper.find(".delete").trigger("click");
        expect(wrapper.emitted("delete")[0]).toEqual([task.id]);
    });
});


