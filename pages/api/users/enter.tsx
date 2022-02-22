import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@libs/server/withHandler';
import client from '@libs/server/client';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;

  let user = await client.user.upsert({
    where: {
      ...(phone && { phone: +phone }),
      ...(email && { email }),
    },
    create: {
      name: 'Anonymous',
      ...(phone && { phone: +phone }),
      ...(email && { email }),
    },
    update: {},
  });
  console.log(user);

  res.status(200).json({ ok: true });
}

export default withHandler('POST', handler);
