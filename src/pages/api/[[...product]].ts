// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
  status: boolean;
  statusCode: number;
};

export default async function handler(req: any, res: any) {
  if (req.query.product[1]) {
    const data = await retrieveDataById("products", req.query.product[1]);
    res.status(200).json({ status: true, statusCode: 200, data });
  } else {
    const data = await retrieveData("products");
    res.status(200).json({ status: true, statusCode: 200, data });
  }
}
