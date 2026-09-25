import {useEffect,useState} from 'react';
type Review={id:string;display_name:string;rating:number;comment:string};
export default function CustomerReviews(){
 const [data,setData]=useState<{reviews:Review[];summary:{total:number;average:number|null}}|null>(null);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{const controller=new AbortController();fetch('https://warranty.impactlabsfl.com/api/reviews',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(setData).catch(e=>{if(e.name!=='AbortError')setFailed(true)});return()=>controller.abort()},[]);
 if(failed)return <p className="mt-8 text-white/60">Reviews are unavailable right now. <a className="underline text-hidow-blue" href="https://warranty.impactlabsfl.com/reviews">View reviews in our portal</a>.</p>;
 if(!data)return <p className="mt-8 text-white/60" role="status">Loading customer reviews…</p>;
 if(!data.summary.total)return <p className="mt-8 text-white/60">No public reviews yet. Be the first to share your experience.</p>;
 return <div className="mt-10"><p className="mb-6 text-lg font-bold">{data.summary.average?.toFixed(1)} / 5 ★ <span className="font-normal text-white/60">· {data.summary.total} reviews</span></p><div className="grid gap-5 md:grid-cols-3">{data.reviews.slice(0,3).map(r=><article key={r.id} className="border border-white/15 bg-white/[0.03] p-6"><p aria-label={`${r.rating} out of 5 stars`} className="text-hidow-blue">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</p><h3 className="mt-3 font-bold">{r.display_name}</h3><p className="mt-4 whitespace-pre-wrap break-words leading-relaxed text-white/70">{r.comment}</p></article>)}</div><a href="https://warranty.impactlabsfl.com/reviews" className="mt-6 inline-block text-hidow-blue underline">Read all customer reviews</a></div>
}
