export default async function handler(req,res){
  const { id } = req.query;
  const url = `https://footballapi.pulselive.com/football/stats/match/${id}`;
  try {
    const r = await fetch(url, {
      headers: {
        "Origin": "https://www.premierleague.com",
        "Referer": "https://www.premierleague.com/",
        "Accept": "application/json"
      }
    });
    if (!r.ok) {
      return res.status(r.status).json({ error: "pl_upstream", status: r.status });
    }
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate=15");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: "pl_fetch_failed", detail: String(e) });
  }
}