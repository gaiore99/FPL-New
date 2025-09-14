export default async function handler(req,res){
  try{
    const r=await fetch('https://fantasy.premierleague.com/api/bootstrap-static/',{headers:{'User-Agent':'Mozilla/5.0'}});
    const data=await r.json();
    res.setHeader('Cache-Control','s-maxage=30, stale-while-revalidate=30');
    res.status(200).json(data);
  }catch(e){res.status(502).json({error:'Upstream error',detail:String(e)})}
}