import { mount } from "@vue/test-utils";
import TaskEdit from "./TaskEdit.vue";

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

describe("TaskEdit", async () => {
    const wrapper = mount(TaskEdit, {
        propsData: { task }
    });

    it("shows TaskEdit", async () => {
        expect(wrapper.props().task.id).toBe(task.id);
        expect(wrapper.find("[name=title]").element.value).toBe(task.title);
        expect(wrapper.find("[name=description]").element.value).toBe(task.description);
    });

    it("shows errors", async () => {
        const errors = {
            "title": [
                "required"
            ],
        };

        await wrapper.setProps({ errors });
        expect(wrapper.text()).toContain(errors.title[0]);
    });

    it("emits edited task", async () => {
        const edited = {
            title: "Not so important task",
            description: "Vague description"
        };

        const titleInput = wrapper.find("[name=title]");
        await titleInput.setValue(edited.title);
        await wrapper.find(".save").trigger("click");
        expect(wrapper.emitted("updated")[0][0].title).toEqual(edited.title);

        const descriptionInput = wrapper.find("[name=description]");
        await descriptionInput.setValue(edited.description);
        await wrapper.find(".save").trigger("click");
        expect(wrapper.emitted("updated")[1][0].description).toEqual(edited.description);
    });

    it("can be cancelled", async () => {
        await wrapper.find(".cancel").trigger("click");
        expect(wrapper.emitted("cancel")).toBeTruthy();
    });
});

