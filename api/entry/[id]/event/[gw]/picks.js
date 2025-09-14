export default async function handler(req,res){
  const {id,gw}=req.query;
  try{
    const r=await fetch(`https://fantasy.premierleague.com/api/entry/${id}/event/${gw}/picks/`,{headers:{'User-Agent':'Mozilla/5.0'}});
    if(!r.ok){return res.status(r.status).json({error:'upstream',status:r.status})}
    const data=await r.json();
    res.setHeader('Cache-Control','s-maxage=30, stale-while-revalidate=60');
    res.status(200).json(data);
  }catch(e){res.status(502).json({error:'Upstream error',detail:String(e)})}
}