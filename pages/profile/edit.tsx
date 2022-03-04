import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { User } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';

interface EditProfileForm extends Pick<User, 'email' | 'phone' | 'name'> {
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPageWithLayout = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();
  const [editProfile, { data, loading }] = useMutation<EditProfileResponse>(`/api/users/me`);
  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');

  const onValid = async ({ email, phone, name }: EditProfileForm) => {
    if (email === '' && phone === '' && name === '') {
      return setError('formErrors', {
        message: 'Email OR Phone number are required. You need to choose one.',
      });
    }

    if (avatar && avatar.length > 0 && user) {
      const form = new FormData();
      form.append('file', avatar[0], 'avatar/' + user?.id);
      const { url } = await fetch(`/api/files`, {
        method: 'POST',
        body: form,
      }).then((r) => r.json());

      editProfile({
        email,
        phone,
        name,
        avatar: url,
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
  };

  useEffect(() => {
    if (user?.name) setValue('name', user.name);
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
    if (user?.avatar) setAvatarPreview(user?.avatar);
  }, [setValue, user]);

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data.error });
    }
  }, [data, setError]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <form className="space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
      <div className="flex items-center space-x-3">
        <div className="relative h-14 w-14 rounded-full bg-slate-500 overflow-hidden">
          {avatarPreview && (
            <Image src={avatarPreview} alt="avatar" layout="fill" objectFit="cover" quality={50} />
          )}
        </div>
        <label
          htmlFor="picture"
          className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Change
          <input
            id="picture"
            type="file"
            className="hidden"
            accept="image/*"
            {...register('avatar')}
          />
        </label>
      </div>
      <Input register={register('name')} required={false} label="Name" name="name" type="text" />
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
        <span className="my-2 block text-center font-medium text-red-500">
          {errors.formErrors.message}
        </span>
      ) : null}
      <Button text={loading ? 'Loading...' : 'Update profile'} />
    </form>
  );
};

EditProfile.getLayout = (page) => (
  <Layout title="Edit Profile" canGoBack>
    {page}
  </Layout>
);

export default EditProfile;
