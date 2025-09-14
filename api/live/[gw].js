export default async function handler(req,res){
  const {gw}=req.query;
  try{
    const r=await fetch(`https://fantasy.premierleague.com/api/event/${gw}/live/`,{headers:{'User-Agent':'Mozilla/5.0'}});
    const data=await r.json();
    res.setHeader('Cache-Control','s-maxage=5, stale-while-revalidate=15');
    res.status(200).json(data);
  }catch(e){res.status(502).json({error:'Upstream error',detail:String(e)})}
}