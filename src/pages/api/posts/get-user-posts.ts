import { NextApiRequest, NextApiResponse } from "next";
import fetchWithBearer from "../../../../utils/fetchWithBearer";

export default async function getUsersPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  const token = req.cookies["jw-token"];

  if (!id) return res.status(400).json({ error: "Missing id" });

  try {
    const resp = await fetchWithBearer(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/getUserPosts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      },
      token
    );

    const data = await resp.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error in api func" });
  }
}
