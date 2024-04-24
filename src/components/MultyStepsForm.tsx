import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import { postData } from '../utils/api';

const MultyStepsForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleStepOneSubmit = (data: { email: string }) => {
    setEmail(data.email);
    setStep(2);
  };

  const handleStepTwoSubmit = async (data: { password: string }) => {
    setPassword(data.password);
    try {
      const response = await postData('/api/submit', { email, password });
      console.log('Server response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-lg">
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StepOne onSubmit={handleStepOneSubmit} />
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StepTwo onSubmit={handleStepTwoSubmit} onBack={handleBack} email={email} />
        </motion.div>
      )}
    </div>
  );
};

export default MultyStepsForm;
