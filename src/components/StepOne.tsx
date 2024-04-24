import React from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../utils/api';

type StepOneProps = {
  onSubmit: (data: { email: string }) => void;
};

const StepOne: React.FC<StepOneProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  const submitHandler = async (data: { email: string }) => {
    try {
      const response = await postData('/api/check-email', { email: data.email });
      console.log('Ответ сервера:', response);
      onSubmit(data);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка сервера. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Электронная почта:
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          className={`mt-1 p-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm`}
        />
        {errors.email && (
          <span className="text-red-500">
            {(document.getElementById('email') as HTMLInputElement)?.validationMessage ||
              'Неверный формат адреса электронной почты.'}
          </span>
        )}
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          !isValid ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={!isValid}
      >
        Далее
      </button>
    </form>
  );
};

export default StepOne;
