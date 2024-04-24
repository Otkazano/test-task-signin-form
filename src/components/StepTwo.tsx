import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import SuccessModal from './SuccessModal';
import { postData } from '../utils/api';

type FormData = {
  password: string;
};

type StepTwoProps = {
  onSubmit: SubmitHandler<FormData>;
  onBack: () => void;
  email: string;
};

const StepTwo: React.FC<StepTwoProps> = ({ onSubmit, onBack, email }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { password: '' },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleFormSubmit: SubmitHandler<FormData> = async data => {
    setLoading(true);
    try {
      const response = await postData('/api/submit', { email, password: data.password });
      console.log('Server response:', response);
      setLoading(false);
      setShowSuccessModal(true);
      onSubmit(data);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Пароль:
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', { required: true, minLength: 4 })}
              className={`block w-full p-2 pr-10 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-1 text-sm text-gray-600 bg-transparent border border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500">
              {(errors.password.type === 'required' && 'Пароль обязателен.') ||
                (errors.password.type === 'minLength' && 'Минимальная длина пароля - 4 символа.')}
            </span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              !isValid ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={!isValid || loading}
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex justify-center mt-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Назад
          </button>
        </div>
      </form>
      {showSuccessModal && <SuccessModal onClose={handleSuccessModalClose} />}
    </>
  );
};

export default StepTwo;
