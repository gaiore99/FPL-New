// /api/pl/match/[id].js
export const config = { runtime: 'edge' }; // تشغيل على Edge لتقليل مشاكل الشبكة

export default async function handler(req) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // .../api/pl/match/124821
  const target = `https://footballapi.pulselive.com/football/stats/match/${id}`;

  try {
    const r = await fetch(target, {
      headers: {
        "Origin": "https://www.premierleague.com",
        "Referer": "https://www.premierleague.com/",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      cache: "no-store",
      redirect: "follow"
    });

    if (!r.ok) {
      return new Response(JSON.stringify({ error: "pl_upstream", status: r.status }), {
        status: r.status,
        headers: { "content-type": "application/json" }
      });
    }

    const data = await r.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "s-maxage=5, stale-while-revalidate=15"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "pl_fetch_failed", detail: String(e) }), {
      status: 502,
      headers: { "content-type": "application/json" }
    });
  }
}
