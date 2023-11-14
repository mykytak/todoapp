<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_index(): void
    {
        $user = User::factory()->create();
        $tasks = Task::factory()->count(3)->for($user)->create();

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
        $response = $this->post("/tasks", $data->toArray());

        $response
            ->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json
                    ->has("task", fn (AssertableJson $json) =>
                        $json
                            ->where("title", $data->title)
                            ->etc()
                    )
            );

        $task = Task::where("title", $data->title)->first();

        $this->assertNotNull($task);
    }


    public function test_task_put(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->for($user)->create();

        $data = [
            "title" => fake()->sentence()
        ];

        $response = $this->put("/tasks/{$task->id}", $data);

        $response
            ->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json
                    ->has("task", fn (AssertableJson $json) =>
                        $json
                            ->where("title", $data["title"])
                            ->etc()
                    )
            );

        $newTask = Task::find($task->id);

        $this->assertNotEquals($task->title, $newTask->title);
        $this->assertEquals($task->description, $newTask->description);
    }


    public function test_task_removal(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->for($user)->create();

        $response = $this->delete("/tasks/{$task->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing("tasks", [
            "id" => $task->id
        ]);
    }
}

