<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_index(): void
    {
        $tasks = Task::factory()->count(3)->create();

        $first = $tasks->get(0);

        $response = $this->get("/tasks");

        $response
            ->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json->has("tasks", 3)
                     ->has("tasks.0", fn (AssertableJson $json) =>
                        $json->where("id", $first->id)
                             ->where("title", $first->title)
                             ->etc()
                     )
            );
    }


    public function test_task_store(): void
    {
        $data = Task::factory()->make();
        $this->post("/tasks", $data->toArray());

        $task = Task::where("title", $data->title)->first();

        $this->assertNotNull($task);
    }


    public function test_task_put(): void
    {
        $task = Task::factory()->create();

        $data = [
            "title" => fake()->sentence()
        ];

        $this->put("/tasks/{$task->id}", $data);

        $newTask = Task::find($task->id);

        $this->assertNotEquals($task->title, $newTask->title);
        $this->assertEquals($task->description, $newTask->description);
    }

    public function test_task_removal(): void
    {
        $task = Task::factory()->create();

        $this->delete("/tasks/{$task->id}");

        $this->assertDatabaseMissing("tasks", [
            "id" => $task->id
        ]);
    }
}

