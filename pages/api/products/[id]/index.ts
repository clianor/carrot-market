import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Product } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const product: Product | null = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const terms = product?.name.split(' ').map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  const isLiked = !!(await client.fav.findFirst({
    where: {
      productId: product?.id,
      userId: user?.id,
    },
    select: {
      id: true,
    },
  }));

  res.json({ ok: true, product, relatedProducts, isLiked });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
