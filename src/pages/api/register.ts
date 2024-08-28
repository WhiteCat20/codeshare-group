// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  message: string;
};

// method untuk sign up (membuat user baru)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    // cek signUp agar lebih paham dengan proses sign up pada next js
    await signUp(
      req.body,
      ({ status, message }: { status: boolean; message: string }) => {
        if (status) {
          res.status(200).json({
            status,
            message,
          });
        } else {
          res.status(400).json({
            status,
            message,
          });
        }
      }
    );
  } else {
    res.status(400).json({ status: false, message: "Invalid Method" });
  }
}
