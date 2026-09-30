 "use client";
import {useEffect,useMemo,useState} from "react";
import {ArrowRight,CalendarDays,ChevronLeft,ChevronRight,Clock3,Headphones,Heart,Home,Instagram,LogIn,Menu,Music2,Plus,RefreshCw,Search,Settings,ShieldCheck,Sparkles,Star,Ticket,UserRound,Users,Wallet,Vote,X,Zap} from "lucide-react";

type Group="EDN48"|"TLP48";
type Member={id:string;name:string;real:string;age:number;ig:string;image:string};
const DATA:Record<Group,{accent:string;soft:string;members:Member[];single:string;news:string[]}> = {
 EDN48:{accent:"#8b5cf6",soft:"#c4b5fd",single:"EDN48 1st SINGLE",news:["1st Single Project — New Generation","EDEN CLUB Monthly Mission","SPARK OF THE MONTH — September"] ,members:[
  {id:"eden1",name:"Airi",real:"Airi Tanaka",age:18,ig:"@airi.edn48",image:"/member-placeholder.svg"},
  {id:"eden2",name:"Mira",real:"Mira Srisawat",age:17,ig:"@mira.edn48",image:"/member-placeholder.svg"},
  {id:"eden3",name:"Nami",real:"Nami Kittisak",age:19,ig:"@nami.edn48",image:"/member-placeholder.svg"},
  {id:"eden4",name:"Rin",real:"Rin Chantarat",age:18,ig:"@rin.edn48",image:"/member-placeholder.svg"},
 ]},
 TLP48:{accent:"#62d7ff",soft:"#d9f7ff",single:"TLP48 1st SINGLE",news:["TLP48 1st Single — Coming Soon","TULIP ZONE Monthly Mission","SPARK OF THE MONTH — September"],members:[
  {id:"tlp1",name:"Iris",real:"Iris K.",age:17,ig:"@iris.tlp48",image:"/member-placeholder.svg"},
  {id:"tlp2",name:"Moa",real:"Moa P.",age:18,ig:"@moa.tlp48",image:"/member-placeholder.svg"},
  {id:"tlp3",name:"Lana",real:"Lana S.",age:17,ig:"@lana.tlp48",image:"/member-placeholder.svg"},
  {id:"tlp4",name:"Meena",real:"Meena T.",age:19,ig:"@meena.tlp48",image:"/member-placeholder.svg"},
 ]},
};
const schedule=[["01 OCT","12:00","Official Live — Welcome October"],["04 OCT","18:30","Music Video Premiere"],["09 OCT","19:00","SPARK OF THE MONTH Voting"],["15 OCT","17:00","Fan Meeting"],["26 OCT","20:00","Monthly Live"]];
const sparks=["Airi","Mira","Iris","Moa","Nami"];
function cn(...x:(string|false|undefined)[]){return x.filter(Boolean).join(" ")}

export default function Page(){
 const [group,setGroup]=useState<Group>("EDN48");
 const [page,setPage]=useState("home");
 const [logged,setLogged]=useState(false);
 const [loginOpen,setLoginOpen]=useState(false);
 const [menuOpen,setMenuOpen]=useState(false);
 const [account,setAccount]=useState({oshi:[] as string[],kami:"",star:1250,token:340});
 const [slide,setSlide]=useState(0);
 const d=DATA[group];
 useEffect(()=>{document.documentElement.style.setProperty("--accent",d.accent)},[d.accent]);
 const visibleMembers=useMemo(()=>d.members,[d.members]);
 function selectGroup(g:Group){setGroup(g);setPage("home");setSlide(0)}
 function toggleOshi(id:string){setAccount(a=>({...a,oshi:a.oshi.includes(id)?a.oshi.filter(x=>x!==id):[...a.oshi,id]}))}
 function kami(id:string){setAccount(a=>({...a,kami:a.kami===id?"":id}))}
 return <main className="min-h-screen bg-grid">
  <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070ddd] backdrop-blur-xl">
   <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
    <button onClick={()=>setPage("home")} className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#263a91] to-[#7256d8] font-black">W</div>
      <div className="text-left"><div className="text-sm font-black tracking-[.25em]">WAY TO SHINE</div><div className="text-[10px] text-slate-400">APPLICATION</div></div>
    </button>
    <div className="hidden items-center gap-2 md:flex">
      {(["EDN48","TLP48"] as Group[]).map(g=><button key={g} onClick={()=>selectGroup(g)} className={cn("rounded-full px-4 py-2 text-xs font-bold transition",group===g?"text-black":"text-slate-300 bg-white/5")} style={group===g?{background:DATA[g].accent}:{}}>{g}</button>)}
      <button onClick={()=>setPage("account")} className="ml-2 rounded-full bg-white/5 px-4 py-2 text-xs font-bold"><UserRound size={14} className="mr-2 inline"/>ACCOUNT</button>
    </div>
    <button className="rounded-xl bg-white/5 p-2 md:hidden" onClick={()=>setMenuOpen(!menuOpen)}><Menu/></button>
   </div>
   {menuOpen&&<div className="border-t border-white/10 p-4 md:hidden"><div className="grid grid-cols-2 gap-2">{(["EDN48","TLP48"] as Group[]).map(g=><button key={g} onClick={()=>{selectGroup(g);setMenuOpen(false)}} className="rounded-xl bg-white/5 p-3 font-bold">{g}</button>)}<button onClick={()=>{setPage("account");setMenuOpen(false)}} className="rounded-xl bg-white/5 p-3 font-bold">ACCOUNT</button></div></div>}
  </header>

  {!logged && page==="home" && <section className="relative overflow-hidden">
   <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 md:px-8 md:pt-24">
    <div className="max-w-3xl">
      <p className="mb-4 text-xs font-bold tracking-[.35em]" style={{color:d.soft}}>OFFICIAL FAN APPLICATION</p>
      <h1 className="text-5xl font-black leading-[.95] md:text-8xl">WELCOME<br/><span className="bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">TO SHINE.</span></h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">One place for EDN48 & TLP48 — schedules, music, members, voting, fan zones and your personal Oshi account.</p>
      <div className="mt-8 flex flex-wrap gap-3"><button onClick={()=>setLoginOpen(true)} className="rounded-full bg-white px-6 py-3 text-sm font-black text-black"><LogIn className="mr-2 inline" size={16}/>LOGIN</button><button onClick={()=>setPage("home")} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold">EXPLORE <ArrowRight className="ml-2 inline" size={16}/></button></div>
    </div>
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      <GroupCard g="EDN48" active={group==="EDN48"} onClick={()=>selectGroup("EDN48")}/>
      <GroupCard g="TLP48" active={group==="TLP48"} onClick={()=>selectGroup("TLP48")}/>
    </div>
    <div className="mt-10"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-black">WAY TO SHINE ARTIST</h2><span className="text-xs text-slate-500">SWIPE / SCROLL</span></div>
      <div className="scrollbar flex snap-x gap-5 overflow-x-auto pb-4">
       {visibleMembers.map((m,i)=><div key={m.id} className={cn("min-w-[240px] snap-center transition-all",i===slide?"scale-105":"scale-95 opacity-60")}><MemberCard m={m} big={i===slide} onClick={()=>setPage("members")}/></div>)}
      </div>
      <div className="flex justify-center gap-2"><button onClick={()=>setSlide(Math.max(0,slide-1))} className="rounded-full bg-white/5 p-2"><ChevronLeft size={16}/></button><button onClick={()=>setSlide(Math.min(visibleMembers.length-1,slide+1))} className="rounded-full bg-white/5 p-2"><ChevronRight size={16}/></button></div>
    </div>
   </div>
  </section>}

  {page==="home" && <Dashboard group={group} data={d} onPage={setPage} account={account}/>}
  {page==="members" && <Members group={group} data={d} account={account} toggle={toggleOshi} kami={kami}/>}
  {page==="schedule" && <Schedule group={group}/>}
  {page==="music" && <Music group={group} data={d}/>}
  {page==="zone" && <Zone group={group} account={account} setAccount={setAccount}/>}
  {page==="account" && <Account group={group} account={account} setLogin={()=>setLoginOpen(true)}/>}

  <nav className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/10 bg-[#0a0e19eF] p-2 shadow-2xl backdrop-blur-xl">
    {[["home",Home,"HOME"],["schedule",CalendarDays,"SCHEDULE"],["music",Music2,"MUSIC"],["zone",Ticket,group==="EDN48"?"EDEN CLUB":"TULIP ZONE"],["account",UserRound,"ACCOUNT"]].map(([p,I,label]:any)=><button key={p} onClick={()=>setPage(p)} className={cn("rounded-xl px-3 py-2 text-[10px] font-bold",page===p?"bg-white text-black":"text-slate-400")}><I size={16} className="mx-auto mb-1"/><span className="hidden sm:block">{label}</span></button>)}
  </nav>

  {loginOpen&&<Login onClose={()=>setLoginOpen(false)} onLogin={()=>{setLogged(true);setLoginOpen(false)}}/>}
  <footer className="h-28"/>
 </main>
}

function GroupCard({g,active,onClick}:{g:Group;active:boolean;onClick:()=>void}){const d=DATA[g];return <button onClick={onClick} className={cn("group relative min-h-[230px] overflow-hidden rounded-3xl border p-7 text-left transition hover:-translate-y-1",active?"border-white/30":"border-white/10")} style={{background:`radial-gradient(circle at 80% 20%, ${d.accent}35, transparent 42%),#0b0f1b`}}><div className="relative z-10"><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black tracking-widest">{g}</span><h3 className="mt-12 text-4xl font-black">{g}</h3><p className="mt-2 text-sm text-slate-400">{g==="EDN48"?"EDEN CLUB":"TULIP ZONE"} · Official Fan Space</p></div><div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full blur-3xl" style={{background:d.accent}}/></button>}

function MemberCard({m,big,onClick}:{m:Member;big?:boolean;onClick:()=>void}){return <button onClick={onClick} className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[.035] text-left"><div className={cn("relative aspect-[4/5] bg-gradient-to-b from-white/10 to-[#0b0f1b]",big?"":"") }><img src={m.image} alt="" className="h-full w-full object-cover opacity-80"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070a11] to-transparent p-5 pt-20"><div className="text-xl font-black">{m.name}</div><div className="text-xs text-slate-400">{m.age} · {m.ig}</div></div></div></button>}

function Dashboard({group,data,onPage,account}:{group:Group;data:any;onPage:(p:string)=>void;account:any}){return <section className="mx-auto max-w-7xl px-4 py-10 md:px-8"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold tracking-[.3em]" style={{color:data.soft}}>{group} OFFICIAL</p><h2 className="mt-2 text-4xl font-black">TODAY'S SHINE</h2></div><div className="flex gap-2"><div className="rounded-2xl bg-white/5 px-4 py-3"><Star className="mr-2 inline text-yellow-300" size={15}/> {account.star.toLocaleString()} STAR</div><div className="rounded-2xl bg-white/5 px-4 py-3"><Wallet className="mr-2 inline text-cyan-300" size={15}/> {account.token} TOKEN</div></div></div><div className="grid gap-5 lg:grid-cols-3"><div className="lg:col-span-2 rounded-3xl border border-white/10 p-7 glow" style={{background:`linear-gradient(135deg,${data.accent}25,#0b0f1b 65%)`}}><span className="text-xs font-black tracking-widest">LATEST WORK</span><h3 className="mt-8 text-4xl font-black">{data.single}</h3><p className="mt-3 max-w-lg text-sm text-slate-400">Official music project. Add cover art, teaser, release date and links from your admin data file.</p><button onClick={()=>onPage("music")} className="mt-7 rounded-full bg-white px-5 py-3 text-xs font-black text-black">MUSIC AUDIO <Headphones className="ml-2 inline" size={15}/></button></div><div className="rounded-3xl border border-white/10 bg-white/[.025] p-7"><Sparkles size={24} style={{color:data.soft}}/><h3 className="mt-5 text-2xl font-black">SPARK OF THE MONTH</h3><p className="mt-2 text-xs text-slate-400">Use STAR to support your monthly Spark.</p><div className="mt-6 space-y-3">{sparks.slice(0,4).map((s,i)=><div key={s} className="flex items-center justify-between rounded-2xl bg-white/5 p-3"><span className="text-sm font-bold">{i+1}. {s}</span><button className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold">VOTE 50★</button></div>)}</div></div></div><div className="mt-8 grid gap-5 md:grid-cols-3">{data.news.map((n:string,i:number)=><div key={n} className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><div className="text-[10px] font-bold text-slate-500">NEWS 0{i+1}</div><h3 className="mt-8 font-black">{n}</h3><button className="mt-5 text-xs font-bold" style={{color:data.soft}}>READ MORE →</button></div>)}</div><div className="mt-8 rounded-3xl border border-white/10 p-6"><div className="flex items-center justify-between"><h3 className="text-xl font-black">SCHEDULE</h3><button onClick={()=>onPage("schedule")} className="text-xs font-bold" style={{color:data.soft}}>VIEW ALL</button></div><div className="mt-5 grid gap-2">{schedule.slice(0,3).map(x=><div key={x[0]} className="grid grid-cols-[70px_70px_1fr] items-center rounded-2xl bg-white/[.035] p-4 text-sm"><b>{x[0]}</b><span className="text-slate-500">{x[1]}</span><span>{x[2]}</span></div>)}</div></div></section>}

function Members({group,data,account,toggle,kami}:{group:Group;data:any;account:any;toggle:(id:string)=>void;kami:(id:string)=>void}){return <section className="mx-auto max-w-7xl px-4 py-12 md:px-8"><div className="mb-8"><p className="text-xs font-bold tracking-[.3em]" style={{color:data.soft}}>{group}</p><h2 className="mt-2 text-4xl font-black">MEMBERS</h2><p className="mt-2 text-sm text-slate-500">ชื่อจริง · อายุ · Instagram · Social Media</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{data.members.map((m:Member)=><div key={m.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.025]"><div className="aspect-[4/4.5] bg-white/5"><img src={m.image} alt="" className="h-full w-full object-cover"/></div><div className="p-5"><div className="flex justify-between"><div><h3 className="text-xl font-black">{m.name}</h3><p className="text-xs text-slate-500">{m.real}</p></div><span className="rounded-full bg-white/5 px-2 py-1 text-xs">{m.age}</span></div><p className="mt-3 text-xs text-slate-400"><Instagram size={13} className="mr-1 inline"/>{m.ig}</p><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>toggle(m.id)} className={cn("rounded-xl py-2 text-xs font-bold",account.oshi.includes(m.id)?"bg-white text-black":"bg-white/5")}><Heart size={14} className="mr-1 inline"/> OSHI</button><button onClick={()=>kami(m.id)} className={cn("rounded-xl py-2 text-xs font-bold",account.kami===m.id?"bg-yellow-300 text-black":"bg-white/5")}><Star size={14} className="mr-1 inline"/> KAMI</button></div><div className="mt-3 border-t border-white/5 pt-3 text-[11px] text-slate-500">Social Media · Instagram · X · TikTok</div></div></div>)}</div></section>}

function Schedule({group}:{group:Group}){return <section className="mx-auto max-w-5xl px-4 py-12 md:px-8"><p className="text-xs font-bold tracking-[.3em]" style={{color:DATA[group].soft}}>{group}</p><h2 className="mt-2 text-4xl font-black">SCHEDULE</h2><div className="mt-8 space-y-3">{schedule.map((x,i)=><div key={i} className="grid grid-cols-[80px_80px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="font-black">{x[0]}</div><div className="text-slate-500">{x[1]}</div><div><b>{x[2]}</b><div className="mt-1 text-xs text-slate-500">Official event · {group}</div></div></div>)}</div></section>}

function Music({group,data}:{group:Group;data:any}){return <section className="mx-auto max-w-6xl px-4 py-12 md:px-8"><p className="text-xs font-bold tracking-[.3em]" style={{color:data.soft}}>{group}</p><h2 className="mt-2 text-4xl font-black">MUSIC AUDIO</h2><div className="mt-8 grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-white/10 p-7" style={{background:`linear-gradient(145deg,${data.accent}20,#0b0f1b)`}}><div className="aspect-square rounded-2xl bg-black/30 grid place-items-center"><Music2 size={64} style={{color:data.soft}}/></div><h3 className="mt-6 text-2xl font-black">{data.single}</h3><button className="mt-5 rounded-full bg-white px-5 py-3 text-xs font-black text-black"><Headphones size={15} className="mr-2 inline"/> PLAY AUDIO</button></div><div className="space-y-3">{["Main Song","Instrumental","Acoustic Version","Performance Audio"].map(x=><div key={x} className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><b>{x}</b><p className="mt-1 text-xs text-slate-500">Audio source can be connected here.</p></div>)}</div></div></section>}

function Zone({group,account,setAccount}:{group:Group;account:any;setAccount:any}){let name=group==="EDN48"?"EDEN CLUB":"TULIP ZONE";return <section className="mx-auto max-w-6xl px-4 py-12 md:px-8"><p className="text-xs font-bold tracking-[.3em]" style={{color:DATA[group].soft}}>{group}</p><h2 className="mt-2 text-4xl font-black">{name}</h2><div className="mt-8 grid gap-5 md:grid-cols-3"><div className="rounded-3xl border border-white/10 bg-white/[.025] p-6 md:col-span-2"><Ticket/><h3 className="mt-5 text-2xl font-black">REDEEM CODE</h3><p className="mt-2 text-sm text-slate-500">Redeem fan rewards, digital goods and event benefits.</p><div className="mt-5 flex gap-2"><input placeholder="ENTER CODE" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs outline-none"/><button className="rounded-xl bg-white px-5 text-xs font-black text-black">REDEEM</button></div></div><div className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><Vote/><h3 className="mt-5 text-2xl font-black">MAJOR VOTE</h3><p className="mt-2 text-sm text-slate-500">Use STAR to participate in voting.</p><button onClick={()=>setAccount({...account,star:Math.max(0,account.star-50)})} className="mt-5 w-full rounded-xl bg-white py-3 text-xs font-black text-black">VOTE 50★</button></div></div><div className="mt-5 grid gap-5 md:grid-cols-2"><Currency title="STAR" value={account.star} icon={<Star/>} text="SPARK OF THE MONTH voting"/><Currency title="TOKEN" value={account.token} icon={<Wallet/>} text="Shop, digital items and fan goods"/></div></section>}

function Currency({title,value,icon,text}:{title:string;value:number;icon:any;text:string}){return <div className="rounded-3xl border border-white/10 p-6"><div className="flex items-center justify-between"><div className="text-slate-400">{icon}</div><span className="text-xs text-slate-500">{title}</span></div><div className="mt-6 text-4xl font-black">{value.toLocaleString()}</div><p className="mt-2 text-xs text-slate-500">{text}</p></div>}

function Account({group,account,setLogin}:{group:Group;account:any;setLogin:()=>void}){return <section className="mx-auto max-w-6xl px-4 py-12 md:px-8"><div className="rounded-3xl border border-white/10 p-7" style={{background:`linear-gradient(135deg,${DATA[group].accent}18,#0b0f1b)`}}><p className="text-xs font-bold tracking-[.3em]">MY ACCOUNT</p><h2 className="mt-2 text-4xl font-black">YOUR SHINE</h2><button onClick={setLogin} className="mt-5 rounded-full bg-white px-5 py-3 text-xs font-black text-black"><LogIn className="mr-2 inline" size={14}/> LOGIN / SYNC ACCOUNT</button></div><div className="mt-6 grid gap-5 md:grid-cols-4"><Stat icon={<Heart/>} title="OSHI" value={account.oshi.length}/><Stat icon={<Star/>} title="KAMI OSHI" value={account.kami||"—"}/><Stat icon={<Sparkles/>} title="STAR" value={account.star.toLocaleString()}/><Stat icon={<Wallet/>} title="TOKEN" value={account.token.toLocaleString()}/></div><div className="mt-6 rounded-3xl border border-white/10 p-7"><h3 className="text-xl font-black">OSHI LIST</h3><p className="mt-2 text-sm text-slate-500">{account.oshi.length?`${account.oshi.length} member(s) selected.`:"ยังไม่ได้เลือก Oshi"}</p></div></section>}
function Stat({icon,title,value}:{icon:any;title:string;value:any}){return <div className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><div className="text-slate-500">{icon}</div><div className="mt-5 text-xs font-bold text-slate-500">{title}</div><div className="mt-1 break-words text-xl font-black">{value}</div></div>}
function Login({onClose,onLogin}:{onClose:()=>void;onLogin:()=>void}){return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0f1b] p-7 shadow-2xl"><div className="flex justify-between"><div><p className="text-xs font-bold tracking-[.3em] text-slate-500">WAY TO SHINE</p><h2 className="mt-2 text-3xl font-black">LOGIN</h2></div><button onClick={onClose}><X/></button></div><div className="mt-7 space-y-3"><input className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm" placeholder="Email / Username"/><input className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm" placeholder="Password" type="password"/><button onClick={onLogin} className="w-full rounded-xl bg-white py-3 text-sm font-black text-black">LOGIN</button></div><p className="mt-5 text-center text-xs text-slate-500">Demo login — connect Supabase/Firebase for production authentication.</p></div></div>}
