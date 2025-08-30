import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../store/api';
import { loginSuccess } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      
      if (result.success) {
        dispatch(loginSuccess({
          user: result.data.user,
          token: result.data.token,
        }));
        
        dispatch(addNotification({
          type: 'success',
          title: 'Account created!',
          message: 'Welcome to LLM Manager. Your account has been created successfully.',
        }));

        navigate('/', { replace: true });
      }
    } catch (error: any) {
      dispatch(addNotification({
        type: 'error',
        title: 'Registration failed',
        message: error.data?.message || 'Please try again.',
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          leftIcon={<UserIcon className="h-4 w-4" />}
          error={errors.name?.message}
          {...registerField('name')}
        />

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          leftIcon={<EnvelopeIcon className="h-4 w-4" />}
          error={errors.email?.message}
          {...registerField('email')}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          leftIcon={<LockClosedIcon className="h-4 w-4" />}
          error={errors.password?.message}
          helperText="Must be at least 8 characters"
          {...registerField('password')}
        />

        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          leftIcon={<LockClosedIcon className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          {...registerField('confirmPassword')}
        />

        <div className="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Create account
        </Button>
      </form>
    </div>
  );
};

export default Register;