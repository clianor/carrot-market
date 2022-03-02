import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import { User } from '@prisma/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';

interface EditProfileForm extends Pick<User, 'email' | 'phone'> {
  formErrors?: string;
}

const EditProfile: NextPageWithLayout = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();

  const onValid = ({ email, phone }: EditProfileForm) => {
    if (email === '' && phone === '') {
      setError('formErrors', {
        message: 'Email OR Phone number are required. You need to choose one.',
      });
    }
  };

  useEffect(() => {
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
  }, [setValue, user]);

  return (
    <form className="py-10 px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
      <div className="flex items-center space-x-3">
        <div className="w-14 h-14 rounded-full bg-slate-500" />
        <label
          htmlFor="picture"
          className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
        >
          Change
          <input id="picture" type="file" className="hidden" accept="image/*" />
        </label>
      </div>
      <Input
        register={register('email')}
        required={false}
        label="Email address"
        name="email"
        type="email"
      />
      <Input
        register={register('phone')}
        required={false}
        label="Phone number"
        name="phone"
        type="number"
        kind="phone"
      />
      {errors.formErrors ? (
        <span className="my-2 text-red-500 font-medium text-center block">
          {errors.formErrors.message}
        </span>
      ) : null}
      <Button text="Update profile" />
    </form>
  );
};

EditProfile.getLayout = (page) => (
  <Layout title="Edit Profile" canGoBack>
    {page}
  </Layout>
);

export default EditProfile;
