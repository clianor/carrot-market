import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import useMutation from '@libs/client/useMutation';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPageWithLayout = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] = useMutation<UploadProductMutation>('/api/products');
  const photo = watch('photo');
  const [photoPreview, setPhotoPreview] = useState('');

  const onValid = async ({ name, price, description }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const form = new FormData();
      form.append('file', photo[0], `photo/${Date.now()}`);
      const { url } = await fetch(`/api/files`, {
        method: 'POST',
        body: form,
      }).then((r) => r.json());

      uploadProduct({
        name,
        price,
        description,
        photo: url,
      });
    } else {
      uploadProduct({
        name,
        price,
        description,
      });
    }
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data.product.id}`);
    }
  }, [data, router]);

  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
      <div>
        {photoPreview ? (
          <div className="relative w-full h-64">
            <Image src={photoPreview} alt="avatar" layout="fill" objectFit="cover" />
          </div>
        ) : (
          <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" accept="image/*" {...register('photo')} />
          </label>
        )}
      </div>
      <Input
        register={register('name', { required: true })}
        required
        label="Name"
        name="name"
        type="text"
      />
      <Input
        register={register('price', { required: true })}
        required
        label="Price"
        placeholder="0"
        name="price"
        type="text"
        kind="price"
      />
      <TextArea
        register={register('description', { required: true })}
        name="description"
        label="Description"
        required
      />
      <Button text={loading ? 'Loading...' : 'Upload item'} />
    </form>
  );
};

Upload.getLayout = (page) => {
  return (
    <Layout title="Upload Product" canGoBack>
      {page}
    </Layout>
  );
};

export default Upload;
