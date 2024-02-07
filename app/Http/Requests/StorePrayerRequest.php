<?php

    namespace App\Http\Requests;

    use Illuminate\Contracts\Validation\ValidationRule;
    use Illuminate\Foundation\Http\FormRequest;

    class StorePrayerRequest extends FormRequest
    {
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
         * @return array<string, ValidationRule|array<mixed>|string>
         */
        public function rules(): array
        {
            return [
                'prayers' => ['required', 'array'],
                'prayers.*.name' => ['required', 'string', 'max:255'],
                'prayers.*.choices' => ['required', 'array'],
                'prayers.*.choices.*.name' => ['required', 'string', 'max:255'],
            ];
        }
    }
