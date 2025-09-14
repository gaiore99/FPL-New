export default async function handler(req,res){
  const {id}=req.query;
  try{
    const r=await fetch(`https://fantasy.premierleague.com/api/entry/${id}/`,{headers:{'User-Agent':'Mozilla/5.0'}});
    const data=await r.json();
    res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=300');
    res.status(200).json(data);
  }catch(e){res.status(502).json({error:'Upstream error',detail:String(e)})}
}