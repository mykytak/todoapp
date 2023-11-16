import { mount, flushPromises } from "@vue/test-utils";
import TaskPage from "./TaskPage.vue";

import { setBaseURL, getHeaders } from "../api/tasks";

const uncompletedTask = {
    id: 1,
    title: "Very Important Task",
    description: "This task is very important for us",
    completed: false,
};

const completedTask = {
    id: 2,
    title: "Coffee!",
    description: "More coffee for coffee god",
    completed: true,
};

const newTask = {
    id: 3,
    title: "Fresh task",
    description: "Crunchy, chewy task",
    completed: false
};

const tasks = [
    uncompletedTask,
    completedTask
];

const baseURL = "mockedHost";
setBaseURL(baseURL);

const headers = getHeaders();

let mockReturnValue = {tasks};
const getMockReturnValue = () => mockReturnValue;

describe("TaskPage", async () => {
    const mockFetch = vi.spyOn(global, "fetch");

    let wrapper = null;

    beforeEach(async () => {
        mockReturnValue = {tasks};
        wrapper = mount(TaskPage);
        await flushPromises();
    });

    mockFetch.mockReturnValue({
        json: () => new Promise((resolve) => resolve(getMockReturnValue())),
        ok: true
    });

    afterEach(() => mockFetch.mockClear());


    it("loads tasks", async () => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        await flushPromises();
        expect(wrapper.text()).toContain(uncompletedTask.title);
        expect(wrapper.text()).toContain(completedTask.title);
    });

    it("creates task", async () => {
        mockReturnValue = { task: newTask };

        await wrapper.find(".new-task").trigger("click");
        await wrapper.find("[name=title]").setValue(newTask.title);
        await wrapper.find("[name=description]").setValue(newTask.description);
        await wrapper.find(".save").trigger("click");

        expect(mockFetch).toHaveBeenCalledWith(
            `${baseURL}/tasks`,
            {
                method: "POST",
                body: JSON.stringify({
                    _token: "",
                    title: newTask.title,
                    description: newTask.description,
                    completed: false,
                }),
                headers
            }
        );
    });

    it("edit tasks", async () => {
        const changedTitle = "changed title";
        const modifiedTask = {
            ...completedTask,
            title: changedTitle
        };

        mockReturnValue = { task: modifiedTask };

        await wrapper.find(`[data-test-id=${completedTask.id}] .edit`).trigger("click");
        await wrapper.find("[name=title]").setValue(changedTitle);
        await wrapper.find(".save").trigger("click");

        expect(mockFetch).toHaveBeenCalledWith(
            `${baseURL}/tasks/${completedTask.id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    _token: "",
                    ...modifiedTask,
                }),
                headers
            }
        );
        expect(wrapper.text()).toContain(changedTitle);

    });

    it("completes tasks", async () => {
        const modifiedTask = {
            ...uncompletedTask,
            completed: true
        };

        mockReturnValue = { task: modifiedTask };

        await wrapper.find(`[data-test-id=${uncompletedTask.id}] .complete`).trigger("click");

        expect(mockFetch)
            .toHaveBeenCalledWith(
                `${baseURL}/tasks/${uncompletedTask.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        _token: "",
                        ...modifiedTask,
                    }),
                    headers
                }
            );
    });

    it("uncompletes tasks", async () => {
        const modifiedTask = {
            ...completedTask,
            completed: false
        };

        mockReturnValue = { task: modifiedTask };

        await wrapper.find(`[data-test-id=${completedTask.id}] .uncomplete`).trigger("click");

        expect(mockFetch)
            .toHaveBeenCalledWith(
                `${baseURL}/tasks/${completedTask.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        _token: "",
                        ...modifiedTask,
                    }),
                    headers
                }
            );
    });

    it("deletes tasks", async () => {
        await wrapper.find(`[data-test-id=${completedTask.id}] .delete`).trigger("click");

        expect(mockFetch)
            .toHaveBeenCalledWith(
                `${baseURL}/tasks/${completedTask.id}`,
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        _token: ""
                    }),
                    headers
                }
            );
        expect(wrapper.text()).not.toContain(completedTask.title);
    });
});

