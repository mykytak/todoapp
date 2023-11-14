<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public static $messages = [
        "keys.required_without_all" => "At least one of the fields should be presented",
        "user_id.required" => "You have to log in first"
    ];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "user_id" => "required",
            "keys" => "required_without_all:title,description,completed"
        ];
    }

    public function messages(): array
    {
        return self::$messages;
    }
}
