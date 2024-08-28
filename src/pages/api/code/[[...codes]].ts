import {
  deleteCodeById,
  retrieveCodeById,
  retrieveCodes,
} from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: any, res: any) {
  if (req.method == "DELETE") {
    try {
      await deleteCodeById("codes", req.query.codes[1]);
      res
        .status(200)
        .json({ status: true, message: "Code deleted successfully" });
    } catch (error: any) {
      res.status(500).json({
        status: false,
        message: "Failed to delete code",
        error: error.message,
      });
    }
  }
  if (req.query.codes[1]) {
    const data = await retrieveCodeById("codes", req.query.codes[1]);
    res.status(200).json({ status: true, statusCode: 200, data });
  } else {
    const data = await retrieveCodes("codes");
    res.status(200).json({ status: true, statusCode: 200, data });
  }
}
``;
