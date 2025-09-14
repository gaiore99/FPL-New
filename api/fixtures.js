export default async function handler(req,res){
  try{
    const qs=req.url.includes('?')?req.url.slice(req.url.indexOf('?')+1):'';
    const url=`https://fantasy.premierleague.com/api/fixtures/${qs?('?'+qs):''}`;
    const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});
    const data=await r.json();
    res.setHeader('Cache-Control','s-maxage=15, stale-while-revalidate=30');
    res.status(200).json(data);
  }catch(e){res.status(502).json({error:'Upstream error',detail:String(e)})}
}