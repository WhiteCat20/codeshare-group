// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  age: number;
};

export default function handler(req: any, res: any) {
  res.status(200).json({ name: "Willie Salim", age: 23 });
}
