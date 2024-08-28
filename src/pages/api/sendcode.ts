import { deleteCodeById, sendCode } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    await sendCode(
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
  }  else {
    res.status(400).json({ status: false, message: "Invalid Method" });
  }
}
