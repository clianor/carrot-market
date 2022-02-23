import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: 'GET' | 'POST' | 'DELETE',
  callback: (req: NextApiRequest, res: NextApiResponse) => void,
) {
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== method) {
      res.status(405).end();
    }

    try {
      await callback(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}
