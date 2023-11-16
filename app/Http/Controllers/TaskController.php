<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View|JsonResponse
    {
        $tasks = Task::all();

        return $request->expectsJson()
            ? response()->json(["tasks" => $tasks])
            : view("tasks", ["tasks" => $tasks])
            ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        /* $user_id = $request->has("user_id") */
        /*     ? $request->user_id : Auth::user()->id; */
        $user_id = 1;
        $task = new Task;
        $task->fill($request->validated());
        $user = User::find($user_id);
        $task->user()->associate($user);
        $task->save();

        return response()->json(["task" => $task]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        $task->fill($request->all());
        $task->save();

        return response()->json(["task" => $task]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json("success");
    }
}
