import { robustJsonFetch, okJson, errJson } from "../../_utils";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return errJson(res, 400, "Missing id");
  try {
    const data = await robustJsonFetch(
      `https://fantasy.premierleague.com/api/entry/${id}/history/`
    );
    okJson(res, data, "s-maxage=120, stale-while-revalidate=600");
  } catch (e) {
    errJson(res, 502, e);
  }
}
