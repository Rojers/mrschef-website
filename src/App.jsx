import { useState, useEffect } from "react";

const C = {
  bg:"#070707", card:"#101010", card2:"#171717", card3:"#202020",
  gold:"#F0B429", goldd:"#C8940A", pink:"#FF2D7E",
  white:"#F0F0F0", muted:"#444", muted2:"#777",
  green:"#22C55E", red:"#EF4444",
};

const HERO_IMGS = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=90",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=90",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=90",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&q=90",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900&q=90",
  "https://images.unsplash.com/photo-1567337710282-00832b415979?w=900&q=90",
];

const FOOD_ENTRIES = [
  {id:"menu",  label:"Build Menu",   emoji:"🍽️", img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=90", desc:"Custom multi-course menu",  color:"#F0B429"},
  {id:"box",   label:"Chef Box",     emoji:"📦", img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=700&q=90", desc:"Individual meal boxes",      color:"#22C55E"},
  {id:"snack", label:"Snack Fiesta", emoji:"🎉", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&q=90", desc:"Platters & high tea",        color:"#FF6B6B"},
];

const FOOD = {
  starters:[
    {id:"s1",name:"Paneer Tikka",    veg:true, img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80"},
    {id:"s2",name:"Chicken Tikka",   veg:false,img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"},
    {id:"s3",name:"Samosa Chaat",    veg:true, img:"https://images.unsplash.com/photo-1601050690117-ef4e6e2bef5d?w=400&q=80"},
    {id:"s4",name:"Veg Seekh Kebab", veg:true, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80"},
    {id:"s5",name:"Fish Amritsari",  veg:false,img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80"},
    {id:"s6",name:"Dahi Ke Sholey",  veg:true, img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"},
  ],
  mains:[
    {id:"m1",name:"Dal Makhani",          veg:true, img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80"},
    {id:"m2",name:"Paneer Butter Masala", veg:true, img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80"},
    {id:"m3",name:"Lucknowi Biryani",     veg:false,img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"},
    {id:"m4",name:"Chicken Curry",        veg:false,img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80"},
    {id:"m5",name:"Rajma Masala",         veg:true, img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80"},
    {id:"m6",name:"Mutton Rogan Josh",    veg:false,img:"https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=80"},
  ],
  breads:[
    {id:"b1",name:"Butter Naan",    veg:true,img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80"},
    {id:"b2",name:"Laccha Paratha", veg:true,img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80"},
    {id:"b3",name:"Garlic Naan",    veg:true,img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80"},
    {id:"b4",name:"Tandoori Roti",  veg:true,img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80"},
  ],
  rice:[
    {id:"r1",name:"Steamed Basmati",veg:true,img:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80"},
    {id:"r2",name:"Veg Pulao",      veg:true,img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"},
    {id:"r3",name:"Jeera Rice",     veg:true,img:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80"},
  ],
  desserts:[
    {id:"d1",name:"Gulab Jamun", veg:true,img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"},
    {id:"d2",name:"Rasmalai",    veg:true,img:"https://images.unsplash.com/photo-1571167530149-c1105da4c2fd?w=400&q=80"},
    {id:"d3",name:"Gajar Halwa", veg:true,img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80"},
    {id:"d4",name:"Kheer",       veg:true,img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80"},
  ],
};

const OCCASIONS = [
  {id:"birthday",   label:"Birthday",         emoji:"🎂"},
  {id:"bachelor",   label:"Bachelor's Party",  emoji:"🥳"},
  {id:"prewedding", label:"Pre-Wedding",       emoji:"💐"},
  {id:"corporate",  label:"Corporate",         emoji:"🏢"},
  {id:"pooja",      label:"Pooja",             emoji:"🪔", vegOnly:true},
  {id:"satvik",     label:"Satvik",            emoji:"🕉️", vegOnly:true},
  {id:"kitty",      label:"Kitty Party",       emoji:"🥂"},
  {id:"farewell",   label:"Farewell",          emoji:"🌟"},
];

const REVIEWS = [
  {name:"Priya S.",  loc:"Kalkaji",  stars:5,text:"Best home food at any event. The biryani was absolutely divine!",av:"P",col:"#FF6B6B"},
  {name:"Rahul M.",  loc:"Saket",    stars:5,text:"Chef Box for 50 people — always hot, hygienic and delicious.",    av:"R",col:"#4FC3F7"},
  {name:"Ananya K.", loc:"Gurgaon",  stars:5,text:"Catered our event. Every single guest was raving about the food!",av:"A",col:"#C9A84C"},
  {name:"Vikram N.", loc:"Faridabad",stars:5,text:"Snack Fiesta was the highlight of our birthday party!",           av:"V",col:"#CE93D8"},
  {name:"Sunita G.", loc:"Noida",    stars:5,text:"Satvik box for pooja — so pure and delicious. Loved it!",         av:"S",col:"#22C55E"},
  {name:"Deepak R.", loc:"Gr. Noida",stars:5,text:"Tiffin service — tastes like maa ke haath ka khana every day!",   av:"D",col:"#FFB74D"},
];

const OUR_WORK = [
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=85",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=85",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=85",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=85",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=85",
];


const SPECIALITIES = [
  {name:"Lucknowi Dum Biryani",   desc:"Slow-cooked saffron dum biryani with whole spices & tender meat",          img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=85", veg:false},
  {name:"Dal Makhani",             desc:"Overnight slow-simmered black lentils in rich butter & cream",              img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=85", veg:true},
  {name:"Paneer Butter Masala",    desc:"Silky tomato-butter gravy with soft paneer — our most-requested dish",     img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=85", veg:true},
  {name:"Mutton Rogan Josh",       desc:"Kashmir-style slow-cooked mutton in fragrant whole spices",                 img:"https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=85", veg:false},
  {name:"Gajar Ka Halwa",          desc:"Home-style carrot halwa cooked in pure desi ghee — pure nostalgia",        img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=85", veg:true},
  {name:"Chicken Tikka Masala",    desc:"Tandoori chicken in smoky, vibrant tomato masala gravy",                   img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=85", veg:false},
];

const AREAS = ["Kalkaji","Saket","CR Park","Lajpat Nagar","Gurgaon","Faridabad","Noida","Greater Noida","Dwarka","Vasant Kunj"];
const WA = "https://wa.me/919876543210";
const ZOMATO = "https://link.zomato.com/xqzv/rshare?id=13826583030563af3";
const FB = "https://facebook.com/mrschef";

const BUILDER_STEPS = [
  {key:"start",    label:"Let's Start", emoji:"🌟"},
  {key:"starters", label:"Starters",    emoji:"🍢"},
  {key:"mains",    label:"Mains",       emoji:"🍛"},
  {key:"breads",   label:"Breads",      emoji:"🫓"},
  {key:"rice",     label:"Rice",        emoji:"🍚"},
  {key:"desserts", label:"Desserts",    emoji:"🍮"},
];

// ── SEMI-CIRCLE PIE WHEEL ─────────────────────────────────────────────────────
function SemiPieWheel({ items, activeIdx, onSelect, accent, completed }) {
  const W = 340, H = 185;
  const cx = W/2, cy = H + 8;
  const outerR = 158, innerR = 54;
  const n = items.length;
  const step = Math.PI / n;

  function polar(a, r) { return { x: cx + r*Math.cos(a), y: cy + r*Math.sin(a) }; }

  function segPath(i, pop) {
    const a1 = Math.PI + i*step + 0.03;
    const a2 = Math.PI + (i+1)*step - 0.03;
    const ouR = pop ? outerR+14 : outerR;
    const p1=polar(a1,ouR), p2=polar(a2,ouR), p3=polar(a2,innerR), p4=polar(a1,innerR);
    return `M${p1.x} ${p1.y} A${ouR} ${ouR} 0 0 1 ${p2.x} ${p2.y} L${p3.x} ${p3.y} A${innerR} ${innerR} 0 0 0 ${p4.x} ${p4.y}Z`;
  }

  function mid(i, pop) {
    const a = Math.PI + (i+0.5)*step;
    const r = ((pop?outerR+14:outerR)+innerR)/2 + (pop?3:0);
    return polar(a, r);
  }

  const ticks = Array.from({length:33},(_,i) => Math.PI + (i/32)*Math.PI);

  return (
    <div style={{display:"flex",justifyContent:"center",overflow:"visible"}}>
      <svg width={W} height={H+12} viewBox={`0 ${H-H} ${W} ${H+12}`} style={{overflow:"visible",touchAction:"none"}}>
        <defs>
          <radialGradient id="hub-g" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff"/><stop offset="55%" stopColor="#ccc"/><stop offset="100%" stopColor="#888"/>
          </radialGradient>
          <radialGradient id="ring-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent}/><stop offset="100%" stopColor={C.goldd}/>
          </radialGradient>
          {items.map((_,i)=>(
            <radialGradient key={i} id={`sg${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accent}/><stop offset="100%" stopColor={C.goldd}/>
            </radialGradient>
          ))}
        </defs>

        {/* Glow rings */}
        <circle cx={cx} cy={cy} r={outerR+32} fill="none" stroke={`${accent}12`} strokeWidth="24"/>
        <circle cx={cx} cy={cy} r={outerR+32} fill="none" stroke={`${accent}07`} strokeWidth="40"/>

        {/* Camera-style tick marks */}
        {ticks.map((ta,i)=>{
          const p1=polar(ta,outerR+13), p2=polar(ta,outerR+(i%4===0?23:17));
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={i%4===0?"rgba(255,255,255,.32)":"rgba(255,255,255,.1)"}
            strokeWidth={i%4===0?1.8:1} strokeLinecap="round"/>;
        })}

        {/* Outer arc */}
        <path d={`M${polar(Math.PI,outerR+13).x} ${polar(Math.PI,outerR+13).y} A${outerR+13} ${outerR+13} 0 0 1 ${polar(0,outerR+13).x} ${polar(0,outerR+13).y}`}
          fill="none" stroke={`${accent}55`} strokeWidth="1.5"/>

        {/* Dividers */}
        {items.map((_,i)=>{
          if(!i) return null;
          const a=Math.PI+i*step, p1=polar(a,innerR+1), p2=polar(a,outerR-1);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#000" strokeWidth="1.5" opacity=".5"/>;
        })}

        {/* Segments */}
        {items.map((item,i)=>{
          const isA=i===activeIdx, isDone=completed?.[item.key];
          const m=mid(i,isA);
          return (
            <g key={item.key} onClick={()=>onSelect(i)} style={{cursor:"pointer"}}>
              <path d={segPath(i,isA)}
                fill={isA?`url(#sg${i})`:isDone?"#182814":"#161616"}
                stroke={isA?accent:isDone?"#2A3818":"#232323"}
                strokeWidth={isA?2:1}
                style={{filter:isA?`drop-shadow(0 -5px 14px ${accent}99)`:"none",transition:"all .22s"}}/>
              <text x={m.x} y={m.y-10} textAnchor="middle" dominantBaseline="middle"
                fontSize={isA?"20":"14"} style={{userSelect:"none",pointerEvents:"none",transition:"font-size .2s"}}>
                {item.emoji}
              </text>
              <text x={m.x} y={m.y+11} textAnchor="middle" dominantBaseline="middle"
                fontSize="7" fontWeight={isA?"800":"500"}
                fill={isA?"#000":isDone?C.green:C.muted2}
                fontFamily="'Poppins',sans-serif" style={{userSelect:"none",pointerEvents:"none"}}>
                {item.label}
              </text>
              {isDone&&!isA&&<>
                <circle cx={m.x+12} cy={m.y-16} r="7" fill={C.green}/>
                <text x={m.x+12} y={m.y-16} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="900" style={{pointerEvents:"none"}}>✓</text>
              </>}
            </g>
          );
        })}

        {/* Hub */}
        <circle cx={cx} cy={cy} r={innerR+7} fill="url(#ring-g)" style={{filter:`drop-shadow(0 0 14px ${accent}88)`}}/>
        <circle cx={cx} cy={cy} r={innerR} fill="url(#hub-g)" style={{filter:"drop-shadow(0 3px 8px rgba(0,0,0,.6))"}}/>
        <text x={cx} y={cy-9} textAnchor="middle" fontSize="9" fontWeight="800"
          fill={C.goldd} fontFamily="'Poppins',sans-serif" style={{userSelect:"none",pointerEvents:"none"}}>
          {items[activeIdx]?.label}
        </text>
        <text x={cx} y={cy+9} textAnchor="middle" fontSize="18" style={{userSelect:"none",pointerEvents:"none"}}>
          {items[activeIdx]?.emoji}
        </text>
      </svg>
    </div>
  );
}

// ── Dish card ─────────────────────────────────────────────────────────────────
function DishCard({item,selected,onToggle,accent}){
  const on=!!selected.find(i=>i.id===item.id);
  return(
    <div onClick={()=>onToggle(item)} style={{flexShrink:0,width:138,borderRadius:18,overflow:"hidden",cursor:"pointer",border:`2px solid ${on?accent:"transparent"}`,background:C.card2,transform:on?"scale(1.04)":"scale(1)",boxShadow:on?`0 0 22px ${accent}44,0 6px 22px rgba(0,0,0,.6)`:`0 4px 18px rgba(0,0,0,.5)`,transition:"all .2s",position:"relative"}}>
      <img src={item.img} alt={item.name} style={{width:"100%",height:96,objectFit:"cover",display:"block"}}
        onError={e=>e.target.src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300"}/>
      <div style={{position:"absolute",top:6,left:6,width:9,height:9,borderRadius:2,background:item.veg?C.green:C.red}}/>
      {on&&<div style={{position:"absolute",top:6,right:6,width:18,height:18,borderRadius:"50%",background:accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:900,color:"#000"}}>✓</div>}
      <div style={{position:"absolute",inset:0,background:on?"rgba(240,180,41,.08)":"transparent",transition:"background .2s"}}/>
      <div style={{padding:"8px 10px 10px"}}>
        <div style={{fontSize:".71rem",fontWeight:700,color:C.white,lineHeight:1.25}}>{item.name}</div>
      </div>
    </div>
  );
}

// ── Logo ─────────────────────────────────────────────────────────────────────
function Logo({size=44,accent}){
  const [err,setErr]=useState(false);
  return(
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",border:`2px solid ${accent}55`,boxShadow:`0 0 16px ${accent}33`,flexShrink:0}}>
      {!err
        ?<img src="/logo.jpg" alt="Mrs Chef" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={()=>setErr(true)}/>
        :<div style={{width:"100%",height:"100%",background:`linear-gradient(135deg,#FF2D7E,#9B1B4B)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.36+"rem"}}>👩‍🍳</div>
      }
    </div>
  );
}

// ── Glow background ───────────────────────────────────────────────────────────
function GlowBg({color}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${color}09,transparent 70%)`,top:"-15%",left:"-15%",animation:"g1 9s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:350,height:350,borderRadius:"50%",background:`radial-gradient(circle,${color}06,transparent 70%)`,bottom:"5%",right:"-10%",animation:"g2 11s ease-in-out infinite"}}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const acc = "#F0B429";
  const [screen,setScreen]   = useState("home");
  const [section,setSection] = useState("home");
  const [heroIdx,setHeroIdx] = useState(0);
  const [entry,setEntry]     = useState(null);
  const [step,setStep]       = useState(0);
  const [occasion,setOccasion] = useState(null);
  const [diet,setDiet]       = useState("both");
  const [date,setDate]       = useState("");
  const [dateErr,setDateErr] = useState(false);
  const [pax,setPax]         = useState(10);
  const [sel,setSel]         = useState({starters:[],mains:[],breads:[],rice:[],desserts:[]});
  const [form,setForm]       = useState({name:"",phone:"",area:"Kalkaji",notes:""});
  const [sent,setSent]       = useState(false);
  const [adminOpen,setAdminOpen] = useState(false);
  const [adminPw,setAdminPw] = useState("");
  const [adminAuth,setAdminAuth] = useState(false);
  const [enquiry,setEnquiry] = useState({name:"",phone:"",occasion:"",guests:"",date:"",notes:""});
  const [enquirySent,setEnquirySent] = useState(false);
  const [orders,setOrders]   = useState([]);

  // Rotate hero images
  useEffect(()=>{
    const t=setInterval(()=>setHeroIdx(i=>(i+1)%HERO_IMGS.length),3500);
    return()=>clearInterval(t);
  },[]);

  // When occasion changes, auto-set diet
  useEffect(()=>{
    if(occasion?.vegOnly) setDiet("veg");
  },[occasion]);

  const filterFood=items=>diet==="veg"?items.filter(i=>i.veg):diet==="nonveg"?items.filter(i=>!i.veg):items;

  const toggleSel=(cat,item)=>{
    const cur=sel[cat], ex=cur.find(i=>i.id===item.id);
    setSel({...sel,[cat]:ex?cur.filter(i=>i.id!==item.id):[...cur,item]});
  };

  const completed={
    start:!!(occasion&&date&&pax>=1),
    starters:sel.starters.length>0,
    mains:sel.mains.length>0,
    breads:sel.breads.length>0,
    rice:sel.rice.length>0,
    desserts:sel.desserts.length>0,
  };
  const allReady=completed.start&&completed.mains;

  const startBuilder=(e)=>{
    setEntry(e);setSel({starters:[],mains:[],breads:[],rice:[],desserts:[]});
    setStep(0);setOccasion(null);setDate("");setSent(false);setDiet("both");
    setScreen("builder");
  };

  const sendWA=()=>{
    const num="919876543210";
    const msg=encodeURIComponent(`Hi Mrs Chef! 🍽️\n\n👤 ${form.name}\n📞 ${form.phone}\n📅 ${date}\n🎉 ${occasion?.label}\n👥 ${pax} guests\n🥗 Diet: ${diet}\n📍 ${form.area}\n\n🍢 Starters: ${sel.starters.map(i=>i.name).join(", ")||"None"}\n🍛 Mains: ${sel.mains.map(i=>i.name).join(", ")||"None"}\n🫓 Breads: ${sel.breads.map(i=>i.name).join(", ")||"None"}\n🍚 Rice: ${sel.rice.map(i=>i.name).join(", ")||"None"}\n🍮 Desserts: ${sel.desserts.map(i=>i.name).join(", ")||"None"}\n\n📝 ${form.notes||"None"}`);
    setOrders(p=>[{id:Date.now(),name:form.name,phone:form.phone,date,occasion:occasion?.label,diet,status:"New"},...p]);
    window.open(`https://wa.me/${num}?text=${msg}`,"_blank");
    setSent(true);
  };

  const W={fontFamily:"'Poppins',sans-serif",background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",color:C.white,overflowX:"hidden",position:"relative"};

  const globalCss=`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}body{background:#070707}
    ::-webkit-scrollbar{width:0;height:0}
    @keyframes g1{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}
    @keyframes g2{0%,100%{transform:translateY(0)}50%{transform:translateY(22px)}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    input[type=date]::-webkit-calendar-picker-indicator{filter:invert(.5);cursor:pointer}
  `;

  const NAV=[{id:"home",l:"Home",e:"🏠"},{id:"work",l:"Our Work",e:"📸"},{id:"reviews",l:"Reviews",e:"⭐"},{id:"about",l:"About",e:"👩‍🍳"},{id:"enquiry",l:"Enquiry",e:"💬"}];

  const Header=({back,title})=>(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 16px 10px"}}>
      {back&&<button onClick={back} style={{background:C.card,border:`1px solid #1A1A1A`,color:C.white,width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:".85rem",flexShrink:0}}>←</button>}
      {title
        ?<div style={{flex:1}}><div style={{fontSize:".56rem",color:C.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:1}}>{title.sub}</div><div style={{fontSize:".95rem",fontWeight:900}}>{title.main}</div></div>
        :<div style={{flex:1}}><div style={{fontSize:".56rem",color:C.muted,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",marginBottom:1}}>Home Kitchen • Delhi NCR</div><div style={{fontSize:"1.5rem",fontWeight:900,letterSpacing:"-.5px",lineHeight:1}}>Mrs <span style={{color:acc}}>Chef</span></div></div>
      }
      <Logo size={42} accent={acc}/>
    </div>
  );

  const BottomNav=()=>(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.card,borderTop:`1px solid #181818`,zIndex:200,paddingBottom:14}}>
      <div style={{display:"flex",overflowX:"auto",padding:"8px 8px 0",gap:1}}>
        {NAV.map(s=>(
          <button key={s.id} onClick={()=>{setSection(s.id);setScreen("home");}}
            style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 9px",borderRadius:10,background:screen==="home"&&section===s.id?`${acc}18`:"transparent",border:screen==="home"&&section===s.id?`1px solid ${acc}44`:"1px solid transparent",cursor:"pointer",transition:"all .2s"}}>
            <span style={{fontSize:".9rem"}}>{s.e}</span>
            <span style={{fontSize:".52rem",fontWeight:screen==="home"&&section===s.id?700:500,color:screen==="home"&&section===s.id?acc:C.muted,whiteSpace:"nowrap"}}>{s.l}</span>
          </button>
        ))}
        <a href={FB} target="_blank" rel="noreferrer" style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 9px",borderRadius:10,textDecoration:"none",border:"1px solid transparent"}}>
          <div style={{width:20,height:20,borderRadius:"50%",background:"#1877F2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",fontWeight:900,color:"#fff"}}>f</div>
          <span style={{fontSize:".52rem",fontWeight:500,color:C.muted}}>Facebook</span>
        </a>
        <button onClick={()=>setAdminOpen(true)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 9px",borderRadius:10,background:"transparent",border:"1px solid transparent",cursor:"pointer"}}>
          <span style={{fontSize:".9rem"}}>🔩</span>
          <span style={{fontSize:".52rem",fontWeight:500,color:C.muted}}>Settings</span>
        </button>
      </div>
    </div>
  );

  // ── ADMIN OVERLAY ─────────────────────────────────────────────────────────
  if(adminOpen) return(
    <div style={{...W,paddingBottom:20}}>
      <style>{globalCss}</style>
      {!adminAuth?(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"0 28px",gap:13}}>
          <Logo size={68} accent={acc}/>
          <div style={{fontSize:"1.15rem",fontWeight:900}}>Admin <span style={{color:acc}}>Login</span></div>
          <input type="password" value={adminPw} onChange={e=>setAdminPw(e.target.value)} placeholder="mrschef2025"
            onKeyDown={e=>{if(e.key==="Enter"&&adminPw==="mrschef2025")setAdminAuth(true);}}
            style={{width:"100%",padding:"12px 16px",border:`1px solid #222`,borderRadius:13,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",color:C.white,background:C.card,outline:"none",textAlign:"center",letterSpacing:".1em"}}/>
          <button onClick={()=>{if(adminPw==="mrschef2025")setAdminAuth(true);}} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${C.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",fontWeight:900,cursor:"pointer"}}>Login →</button>
          <button onClick={()=>setAdminOpen(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontFamily:"'Poppins',sans-serif",fontSize:".76rem"}}>← Back</button>
        </div>
      ):(
        <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",borderBottom:`1px solid #181818`}}>
            <div style={{fontSize:".95rem",fontWeight:900,color:acc}}>Admin Panel</div>
            <button onClick={()=>{setAdminOpen(false);setAdminAuth(false);setAdminPw("");}} style={{background:C.card,border:`1px solid #1E1E1E`,color:C.muted2,padding:"5px 12px",borderRadius:50,fontSize:".68rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Exit</button>
          </div>
          <div style={{padding:"16px"}}>
            <div style={{fontSize:".82rem",fontWeight:800,marginBottom:10}}>Orders ({orders.length})</div>
            {orders.length===0?<div style={{textAlign:"center",padding:"36px 0",color:C.muted}}><div style={{fontSize:"2.3rem",marginBottom:7}}>📭</div>No orders yet</div>:
            orders.map(o=>(
              <div key={o.id} style={{background:C.card,borderRadius:13,padding:"11px",marginBottom:7,border:`1px solid #1A1A1A`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <div style={{fontSize:".8rem",fontWeight:800}}>{o.name}</div>
                  <div style={{fontSize:".58rem",background:`${acc}22`,color:acc,padding:"2px 8px",borderRadius:50,fontWeight:700}}>{o.status}</div>
                </div>
                <div style={{fontSize:".63rem",color:C.muted2}}>📞 {o.phone} · 📅 {o.date} · 🎉 {o.occasion}</div>
              </div>
            ))}
            <div style={{marginTop:16,background:C.card,borderRadius:14,padding:"14px",border:`1px solid #1A1A1A`}}>
              <div style={{fontSize:".78rem",fontWeight:800,color:acc,marginBottom:8}}>⚙️ Settings</div>
              <div style={{fontSize:".7rem",color:C.muted2,lineHeight:1.65}}>Business name, phone, WhatsApp, Facebook, Zomato link, accent colour, max guests, pricing tiers, offers & discounts — all editable here in the full version.</div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ── BUILDER ───────────────────────────────────────────────────────────────
  if(screen==="builder"){
    const cur=BUILDER_STEPS[step];
    const foodMap={starters:FOOD.starters,mains:FOOD.mains,breads:FOOD.breads,rice:FOOD.rice,desserts:FOOD.desserts};
    const curDishes=filterFood(foodMap[cur.key]||[]);
    const curSel=sel[cur.key]||[];

    const goNext=()=>{
      if(cur.key==="start"){if(!date){setDateErr(true);return;}setDateErr(false);}
      if(step<BUILDER_STEPS.length-1) setStep(s=>s+1);
      else setScreen("confirm");
    };

    const isSpiritualOccasion=occasion?.vegOnly;

    return(
      <div style={{...W,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <style>{globalCss}</style>
        <GlowBg color={acc}/>
        <div style={{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

          {/* TOP BAR */}
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"12px 14px 8px",flexShrink:0}}>
            <button onClick={()=>setScreen("home")} style={{background:C.card,border:`1px solid #1A1A1A`,color:C.white,width:33,height:33,borderRadius:"50%",cursor:"pointer",fontSize:".82rem",flexShrink:0}}>←</button>
            <div style={{flex:1}}>
              <div style={{fontSize:".54rem",color:C.muted,textTransform:"uppercase",letterSpacing:".08em"}}>Build Your Menu</div>
              <div style={{fontSize:".9rem",fontWeight:900}}>{cur.emoji} {cur.label}</div>
            </div>
            {allReady&&<button onClick={()=>setScreen("confirm")} style={{flexShrink:0,padding:"6px 12px",borderRadius:50,background:`linear-gradient(135deg,${acc},${C.goldd})`,color:"#000",border:"none",fontSize:".65rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Review →</button>}
            <Logo size={34} accent={acc}/>
          </div>

          {/* LET'S START */}
          {cur.key==="start"&&(
            <div style={{flex:1,overflowY:"auto",padding:"0 14px 8px"}}>
              {isSpiritualOccasion&&(
                <div style={{background:"linear-gradient(135deg,#4C1D95,#7C3AED)",borderRadius:14,padding:"11px 13px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:"1.4rem"}}>🕉️</span>
                  <div><div style={{fontSize:".74rem",fontWeight:800,color:"#fff"}}>Satvik Mode Active</div><div style={{fontSize:".6rem",color:"rgba(255,255,255,.65)"}}>Pure vegetarian, no onion/garlic</div></div>
                </div>
              )}

              <div style={{fontSize:".64rem",fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:7}}>Occasion *</div>
              <div style={{display:"flex",gap:7,overflowX:"auto",marginBottom:13,paddingBottom:2}}>
                {OCCASIONS.map(o=>(
                  <div key={o.id} onClick={()=>setOccasion(o)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
                    <div style={{width:50,height:50,borderRadius:14,background:occasion?.id===o.id?`${acc}22`:C.card2,border:`2px solid ${occasion?.id===o.id?acc:"#1A1A1A"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",transition:"all .2s",boxShadow:occasion?.id===o.id?`0 0 12px ${acc}44`:"none"}}>
                      {o.emoji}
                    </div>
                    <div style={{fontSize:".57rem",fontWeight:occasion?.id===o.id?700:500,color:occasion?.id===o.id?acc:C.muted,textAlign:"center",whiteSpace:"nowrap"}}>{o.label}</div>
                  </div>
                ))}
              </div>

              <div style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{fontSize:".64rem",fontWeight:700,color:C.muted,textTransform:"uppercase"}}>Event Date <span style={{color:C.red}}>*</span></div>
                  {dateErr&&<div style={{fontSize:".6rem",color:C.red,fontWeight:600}}>⚠️ Required</div>}
                </div>
                <input type="date" value={date} onChange={e=>{setDate(e.target.value);setDateErr(false);}}
                  style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${dateErr?C.red:date?acc+"55":"#1A1A1A"}`,borderRadius:12,fontFamily:"'Poppins',sans-serif",fontSize:".88rem",color:date?C.white:C.muted,background:C.card2,outline:"none",transition:"border-color .2s"}}/>
              </div>


              {/* PAX SELECTOR */}
              <div style={{marginBottom:12}}>
                <div style={{fontSize:".64rem",fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Number of Guests *</div>
                {/* Big circular display */}
                <div style={{background:C.card2,borderRadius:18,padding:"16px 14px",border:`1px solid #1A1A1A`,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
                  <div style={{position:"relative",width:100,height:100}}>
                    <svg width="100" height="100" style={{position:"absolute",top:0,left:0}}>
                      <circle cx="50" cy="50" r="44" fill="none" stroke="#1E1E1E" strokeWidth="6"/>
                      <circle cx="50" cy="50" r="44" fill="none" stroke={acc} strokeWidth="6"
                        strokeDasharray={`${((pax-1)/39)*277} 277`} strokeLinecap="round"
                        transform="rotate(-90 50 50)" style={{transition:"stroke-dasharray .3s"}}/>
                    </svg>
                    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                      <div style={{fontSize:"1.9rem",fontWeight:900,color:acc,lineHeight:1}}>{pax}</div>
                      <div style={{fontSize:".55rem",color:C.muted,fontWeight:600}}>guests</div>
                    </div>
                  </div>
                  {/* +/- controls */}
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <button onClick={()=>setPax(p=>Math.max(1,p-1))} style={{width:36,height:36,borderRadius:"50%",background:C.card3,border:`1px solid #2A2A2A`,color:C.white,fontSize:"1.2rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                    <div style={{display:"flex",gap:6}}>
                      {[5,10,15,20,25,30,40].map(n=>(
                        <button key={n} onClick={()=>setPax(n)} style={{padding:"4px 8px",borderRadius:8,border:`1px solid ${pax===n?acc:"#2A2A2A"}`,background:pax===n?`${acc}22`:"transparent",color:pax===n?acc:C.muted2,fontSize:".62rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",transition:"all .15s"}}>{n}</button>
                      ))}
                    </div>
                    <button onClick={()=>setPax(p=>Math.min(40,p+1))} style={{width:36,height:36,borderRadius:"50%",background:C.card3,border:`1px solid #2A2A2A`,color:C.white,fontSize:"1.2rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                  </div>
                  {/* Slider */}
                  <input type="range" min="1" max="40" value={pax} onChange={e=>setPax(Number(e.target.value))}
                    style={{width:"100%",accentColor:acc,height:3,cursor:"pointer"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                    <span style={{fontSize:".58rem",color:C.muted}}>1</span>
                    <span style={{fontSize:".58rem",color:C.muted}}>Max 40</span>
                  </div>
                </div>
              </div>
              <div style={{fontSize:".64rem",fontWeight:700,color:C.muted,textTransform:"uppercase",marginBottom:7}}>Diet Preference</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {[["veg","🟢","Veg Only","Pure vegetarian"],["nonveg","🔴","Non-Veg","Meat included"],["both","🟡","Mixed","Veg + Non-Veg"],["satvik","🕉️","Satvik","No onion/garlic"]].map(([val,ic,lb,sub])=>(
                  <button key={val} onClick={()=>setDiet(val)}
                    disabled={occasion?.vegOnly&&val!=="veg"&&val!=="satvik"}
                    style={{padding:"10px 8px",borderRadius:12,border:`1.5px solid ${diet===val?acc:"#1A1A1A"}`,background:diet===val?`${acc}18`:"transparent",cursor:occasion?.vegOnly&&val!=="veg"&&val!=="satvik"?"not-allowed":"pointer",opacity:occasion?.vegOnly&&val!=="veg"&&val!=="satvik"?.3:1,textAlign:"left",transition:"all .15s",fontFamily:"'Poppins',sans-serif"}}>
                    <div style={{fontSize:".78rem",fontWeight:700,color:diet===val?acc:C.white,marginBottom:2}}>{ic} {lb}</div>
                    <div style={{fontSize:".58rem",color:C.muted}}>{sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FOOD STEPS */}
          {cur.key!=="start"&&(
            <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
              <div style={{padding:"0 14px 5px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontSize:".62rem",color:C.muted}}>{curSel.length>0?`${curSel.length} selected — tap to remove`:"Tap any dish to add"}</div>
                {cur.key!=="mains"&&<button onClick={()=>setStep(s=>Math.min(BUILDER_STEPS.length-1,s+1))} style={{background:"transparent",border:`1px solid #252525`,color:C.muted,padding:"4px 10px",borderRadius:50,fontSize:".6rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Skip →</button>}
              </div>
              {curSel.length>0&&(
                <div style={{padding:"0 14px 5px",flexShrink:0,display:"flex",gap:4,overflowX:"auto"}}>
                  {curSel.map(item=>(
                    <div key={item.id} onClick={()=>toggleSel(cur.key,item)} style={{flexShrink:0,display:"flex",alignItems:"center",gap:3,background:`${acc}18`,border:`1px solid ${acc}44`,borderRadius:50,padding:"2px 8px 2px 3px",cursor:"pointer"}}>
                      <img src={item.img} alt="" style={{width:13,height:13,borderRadius:"50%",objectFit:"cover"}}/>
                      <span style={{fontSize:".57rem",fontWeight:700,color:acc,whiteSpace:"nowrap"}}>{item.name}</span>
                      <span style={{fontSize:".52rem",color:C.muted}}>✕</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{flex:1,display:"flex",gap:10,overflowX:"auto",padding:"0 14px",alignItems:"center"}}>
                {curDishes.length===0?
                  <div style={{textAlign:"center",width:"100%",color:C.muted}}>
                    <div style={{fontSize:"2rem",marginBottom:6}}>🥦</div>
                    <div style={{fontSize:".75rem"}}>No {diet} options here</div>
                    <div style={{fontSize:".62rem",marginTop:3,color:C.muted}}>Change diet in "Let's Start"</div>
                  </div>:
                  curDishes.map(item=>(
                    <DishCard key={item.id} item={item} selected={curSel} onToggle={i=>toggleSel(cur.key,i)} accent={acc}/>
                  ))
                }
              </div>
            </div>
          )}

          {/* NEXT BUTTON */}
          <div style={{padding:"6px 14px 5px",flexShrink:0}}>
            <button onClick={goNext} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${C.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:900,cursor:"pointer",boxShadow:`0 4px 16px ${acc}33`}}>
              {step<BUILDER_STEPS.length-1?`Next: ${BUILDER_STEPS[step+1].label} →`:"Review My Menu →"}
            </button>
          </div>

          {/* ══ SEMI-CIRCLE PIE WHEEL ══ */}
          <div style={{flexShrink:0,background:`linear-gradient(180deg,transparent,${C.card} 30%)`,paddingTop:2}}>
            <div style={{textAlign:"center",paddingTop:6}}>
              <div style={{fontSize:".52rem",color:C.muted,fontWeight:500,letterSpacing:".1em",textTransform:"uppercase"}}>← Tap to switch course →</div>
            </div>
            <SemiPieWheel items={BUILDER_STEPS} activeIdx={step} onSelect={setStep} accent={acc} completed={completed}/>
          </div>
        </div>
      </div>
    );
  }

  // ── CONFIRM ───────────────────────────────────────────────────────────────
  if(screen==="confirm") return(
    <div style={{...W,paddingBottom:40}}>
      <style>{globalCss}</style>
      <GlowBg color={acc}/>
      <div style={{position:"relative",zIndex:1}}>
        {sent?(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"0 28px",textAlign:"center"}}>
            <div style={{fontSize:"3.2rem",marginBottom:4,animation:"bounce 1.2s ease infinite"}}>🎉</div>
            <div style={{width:72,height:72,borderRadius:"50%",background:`${acc}18`,border:`2px solid ${acc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",marginBottom:14,boxShadow:`0 0 32px ${acc}55`}}>✅</div>
            <div style={{fontSize:"1.35rem",fontWeight:900,marginBottom:5}}>Order <span style={{color:acc}}>Sent!</span></div>
            <div style={{fontSize:".8rem",color:C.muted2,lineHeight:1.7,marginBottom:16}}>Your custom menu has been sent. We confirm within 2 hours.</div>
            <div style={{background:C.card,borderRadius:14,padding:"12px 14px",width:"100%",marginBottom:18,border:`1px solid #1A1A1A`}}>
              <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:6,flexWrap:"wrap"}}>
                {[...sel.starters,...sel.mains,...sel.breads,...sel.rice,...sel.desserts].slice(0,6).map(item=>(
                  <div key={item.id} style={{width:38,height:38,borderRadius:9,overflow:"hidden",border:`2px solid ${acc}44`}}>
                    <img src={item.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  </div>
                ))}
              </div>
              <div style={{fontSize:".76rem",fontWeight:700,color:acc}}>{occasion?.label} · {date}</div>
            </div>
            <a href={WA} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#16A34A,#15803D)",color:"#fff",padding:"12px",borderRadius:50,fontSize:".86rem",fontWeight:900,textDecoration:"none",display:"block",width:"100%",textAlign:"center",marginBottom:9}}>💬 Open WhatsApp</a>
            <button onClick={()=>{setSent(false);setSel({starters:[],mains:[],breads:[],rice:[],desserts:[]});setStep(0);setOccasion(null);setDate("");setScreen("home");}} style={{background:"transparent",color:C.muted,border:`1px solid #1A1A1A`,padding:"10px",borderRadius:50,fontSize:".78rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif",width:"100%"}}>Plan Another</button>
          </div>
        ):(
          <>
            <Header back={()=>setScreen("builder")} title={{sub:"Final Step",main:"Review & Confirm"}}/>
            <div style={{margin:"0 13px 10px",background:C.card,borderRadius:18,padding:"13px",border:`1px solid #1A1A1A`}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,textAlign:"center"}}>
                <div><div style={{fontSize:"1.2rem"}}>{occasion?.emoji||"🎉"}</div><div style={{fontSize:".68rem",fontWeight:700,marginTop:3}}>{occasion?.label||"—"}</div><div style={{fontSize:".56rem",color:C.muted}}>Occasion</div></div>
                <div><div style={{fontSize:".66rem",color:C.muted,marginTop:4}}>📅 {date||"—"}</div><div style={{fontSize:".66rem",color:C.muted,marginTop:4}}>👥 {pax} guests · 🥗 {diet}</div></div>
                <div><div style={{fontSize:".7rem",fontWeight:700,color:acc,marginTop:4}}>{entry?.label}</div><div style={{fontSize:".56rem",color:C.muted,marginTop:2}}>Package</div></div>
              </div>
            </div>
            {[["🍢","starters","Starters"],["🍛","mains","Mains"],["🫓","breads","Breads"],["🍚","rice","Rice"],["🍮","desserts","Desserts"]].map(([ic,key,lb])=>(
              <div key={key} style={{margin:"0 13px 8px",background:C.card,borderRadius:14,padding:"10px 12px",border:`1px solid #1A1A1A`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:sel[key].length>0?7:0}}>
                  <div style={{fontSize:".68rem",fontWeight:800,color:acc}}>{ic} {lb}</div>
                  <div style={{fontSize:".56rem",color:sel[key].length>0?C.green:C.muted}}>{sel[key].length>0?`${sel[key].length} items`:"Skipped"}</div>
                </div>
                {sel[key].length>0&&<div style={{display:"flex",gap:6,overflowX:"auto"}}>
                  {sel[key].map(item=>(
                    <div key={item.id} style={{flexShrink:0,textAlign:"center",width:50}}>
                      <div style={{width:44,height:44,borderRadius:10,overflow:"hidden",border:`1.5px solid ${acc}44`,marginBottom:2}}><img src={item.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
                      <div style={{fontSize:".5rem",color:C.muted2,lineHeight:1.2,fontWeight:600}}>{item.name}</div>
                    </div>
                  ))}
                </div>}
              </div>
            ))}
            <div style={{margin:"0 13px",background:C.card,borderRadius:17,padding:"14px",border:`1px solid #1A1A1A`}}>
              <div style={{fontSize:".8rem",fontWeight:800,marginBottom:11}}>Your Details</div>
              {[["Name *","text","name","Full name"],["Phone *","tel","phone","+91 XXXXX XXXXX"]].map(([lb,tp,k,ph])=>(
                <div key={k} style={{marginBottom:8}}>
                  <label style={{display:"block",fontSize:".59rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{lb}</label>
                  <input type={tp} placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:C.white,background:C.card2,outline:"none"}}/>
                </div>
              ))}
              <div style={{marginBottom:8}}>
                <label style={{display:"block",fontSize:".59rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Area</label>
                <select value={form.area} onChange={e=>setForm({...form,area:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:C.white,background:C.card2,outline:"none"}}>
                  {AREAS.map(a=><option key={a}>{a}</option>)}
                </select>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:".59rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Notes</label>
                <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Allergies, setup…" rows={2} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:C.white,background:C.card2,outline:"none",resize:"none"}}/>
              </div>
              <button onClick={()=>{if(form.name&&form.phone)sendWA();}} style={{width:"100%",padding:"12px",background:form.name&&form.phone?`linear-gradient(135deg,${acc},${C.goldd})`:"#181818",color:form.name&&form.phone?"#000":C.muted,border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer",transition:"all .2s"}}>
                💬 Confirm via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ── HOME ──────────────────────────────────────────────────────────────────
  return(
    <div style={{...W,paddingBottom:90}}>
      <style>{globalCss}</style>
      <GlowBg color={acc}/>
      <div style={{position:"relative",zIndex:1}}>
        <Header/>

        {section==="home"&&<>
          {/* HERO — rotating images */}
          <div style={{position:"relative",height:244,margin:"0 12px",borderRadius:22,overflow:"hidden",boxShadow:`0 18px 50px rgba(0,0,0,.75)`}}>
            {HERO_IMGS.map((url,i)=>(
              <img key={i} src={url} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:i===heroIdx?1:0,transition:"opacity 1s ease",zIndex:i===heroIdx?1:0}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(7,7,7,.08) 0%,rgba(7,7,7,.88) 100%)",zIndex:2}}/>
            {/* Hero dot indicators */}
            <div style={{position:"absolute",bottom:64,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5,zIndex:3}}>
              {HERO_IMGS.map((_,i)=>(
                <div key={i} style={{width:i===heroIdx?18:5,height:5,borderRadius:50,background:i===heroIdx?acc:"rgba(255,255,255,.3)",transition:"all .4s"}}/>
              ))}
            </div>
            <div style={{position:"absolute",top:12,right:12,display:"flex",flexDirection:"column",gap:4,zIndex:3}}>
              {[["⭐ 4.9","Rating"],["500+","Events"],["NCR","Serving"]].map(([v,l])=>(
                <div key={l} style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.07)",borderRadius:9,padding:"3px 8px",textAlign:"right"}}>
                  <div style={{fontSize:".66rem",fontWeight:800,color:acc}}>{v}</div>
                  <div style={{fontSize:".48rem",color:"rgba(255,255,255,.38)"}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{position:"absolute",bottom:15,left:15,right:15,zIndex:3}}>
              <div style={{fontSize:"1.25rem",fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:12}}>Crafted for Your Special Moments</div>
              <button onClick={()=>startBuilder(FOOD_ENTRIES[0])} style={{background:`linear-gradient(135deg,${acc},${C.goldd})`,color:"#000",border:"none",padding:"11px 20px",borderRadius:50,fontSize:".78rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif",boxShadow:`0 5px 18px ${acc}55`,display:"inline-flex",alignItems:"center",gap:7}}>
                🍽️ Build Your Menu →
              </button>
            </div>
          </div>

          {/* FOOD ENTRY CARDS */}
          <div style={{padding:"15px 16px 0"}}>
            <div style={{fontSize:".86rem",fontWeight:800,marginBottom:11}}>What are you planning?</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {FOOD_ENTRIES.map(e=>(
                <div key={e.id} onClick={()=>startBuilder(e)} style={{borderRadius:20,overflow:"hidden",position:"relative",height:128,cursor:"pointer",boxShadow:`0 8px 28px rgba(0,0,0,.6)`,border:`1.5px solid rgba(255,255,255,.04)`}}>
                  <img src={e.img} alt={e.label} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(7,7,7,.86) 0%,rgba(7,7,7,.18) 100%)"}}/>
                  <div style={{position:"absolute",top:0,left:0,bottom:0,width:4,background:e.color,borderRadius:"20px 0 0 20px"}}/>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 18px",gap:13}}>
                    <div style={{width:50,height:50,borderRadius:"50%",background:`${e.color}22`,border:`2px solid ${e.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.45rem",flexShrink:0}}>{e.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"1.02rem",fontWeight:900,color:"#fff",marginBottom:3}}>{e.label}</div>
                      <div style={{fontSize:".7rem",color:"rgba(255,255,255,.52)"}}>{e.desc}</div>
                    </div>
                    <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${acc},${C.goldd})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".88rem",fontWeight:900,color:"#000",flexShrink:0}}>→</div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* OUR SPECIALITIES */}
          <div style={{padding:"16px 16px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontSize:".56rem",color:C.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Signature Dishes</div>
                <div style={{fontSize:".9rem",fontWeight:900}}>Our <span style={{color:acc}}>Specialities</span></div>
              </div>
              <div style={{fontSize:".62rem",color:C.muted}}>Tap to explore</div>
            </div>
            <div style={{display:"flex",gap:11,overflowX:"auto",paddingBottom:4}}>
              {SPECIALITIES.map((s,i)=>(
                <div key={i} style={{flexShrink:0,width:155,borderRadius:18,overflow:"hidden",background:C.card2,border:`1px solid #1A1A1A`,boxShadow:`0 6px 20px rgba(0,0,0,.5)`,cursor:"pointer"}} onClick={()=>startBuilder(FOOD_ENTRIES[0])}>
                  <div style={{position:"relative",height:105}}>
                    <img src={s.img} alt={s.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(0,0,0,.75))"}}/>
                    <div style={{position:"absolute",top:7,left:7,width:8,height:8,borderRadius:2,background:s.veg?C.green:C.red}}/>
                  </div>
                  <div style={{padding:"9px 11px 11px"}}>
                    <div style={{fontSize:".72rem",fontWeight:800,color:C.white,lineHeight:1.25,marginBottom:3}}>{s.name}</div>
                    <div style={{fontSize:".6rem",color:C.muted2,lineHeight:1.4}}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK CONTACT */
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,margin:"13px 12px 0"}}>
            <a href={WA} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#15803D,#16A34A)",borderRadius:15,padding:"12px",textDecoration:"none",display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:"1.25rem"}}>💬</span>
              <div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>WhatsApp</div><div style={{fontSize:".54rem",color:"rgba(255,255,255,.6)"}}>Chat directly</div></div>
            </a>
            <a href={ZOMATO} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#B91C1C,#DC2626)",borderRadius:15,padding:"12px",textDecoration:"none",display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:"1.25rem"}}>🍕</span>
              <div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>Zomato</div><div style={{fontSize:".54rem",color:"rgba(255,255,255,.6)"}}>Daily orders</div></div>
            </a>
          </div>

          {/* OCCASIONS */}
          <div style={{padding:"14px 16px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
              <div style={{fontSize:".86rem",fontWeight:800}}>Occasions</div>
              <div style={{fontSize:".6rem",color:C.muted}}>Tap to start</div>
            </div>
            <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:3}}>
              {OCCASIONS.map(o=>(
                <div key={o.id} onClick={()=>{setOccasion(o);startBuilder(FOOD_ENTRIES[0]);}} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer"}}>
                  <div style={{width:52,height:52,borderRadius:17,background:C.card2,border:`1.5px solid #1A1A1A`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.45rem"}}>{o.emoji}</div>
                  <div style={{fontSize:".58rem",fontWeight:500,color:C.muted2,textAlign:"center",whiteSpace:"nowrap"}}>{o.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AREAS */}
          <div style={{padding:"13px 16px 0"}}>
            <div style={{fontSize:".72rem",fontWeight:600,color:C.muted,marginBottom:6}}>📍 Serving Delhi NCR</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {AREAS.map(a=><div key={a} style={{background:C.card,border:`1px solid #181818`,borderRadius:50,padding:"3px 9px",fontSize:".58rem",fontWeight:500,color:C.muted2}}>{a}</div>)}
            </div>
          </div>
        </>}

        {section==="work"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:C.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Real Events · Real Food</div><div style={{fontSize:"1.2rem",fontWeight:900}}>Our <span style={{color:acc}}>Work</span></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,padding:"0 12px"}}>
            {OUR_WORK.map((url,i)=>(
              <div key={i} style={{borderRadius:16,overflow:"hidden",aspectRatio:i===0?"2/1.1":"1",gridColumn:i===0?"span 2":"span 1",boxShadow:`0 5px 16px rgba(0,0,0,.6)`}}>
                <img src={url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              </div>
            ))}
          </div>
          <div style={{margin:"11px 12px 0",background:`linear-gradient(135deg,${acc},${C.goldd})`,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontSize:".58rem",color:"rgba(0,0,0,.45)"}}>Follow for more</div><div style={{fontSize:".78rem",fontWeight:900,color:"#000"}}>Mrs Chef on Facebook</div></div>
            <a href={FB} target="_blank" rel="noreferrer" style={{background:"#000",color:acc,padding:"7px 12px",borderRadius:50,fontSize:".66rem",fontWeight:800,textDecoration:"none"}}>Follow →</a>
          </div>
        </>}

        {section==="reviews"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:C.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Delhi NCR Loves Us</div><div style={{fontSize:"1.2rem",fontWeight:900}}>What <span style={{color:acc}}>They Say</span></div></div>
          <div style={{display:"flex",flexDirection:"column",gap:8,padding:"0 12px"}}>
            {REVIEWS.map((r,i)=>(
              <div key={i} style={{background:C.card,borderRadius:16,padding:"12px 13px",border:`1px solid #1A1A1A`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${r.col},transparent)`}}/>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${r.col},${r.col}88)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:".86rem",flexShrink:0}}>{r.av}</div>
                  <div><div style={{fontSize:".78rem",fontWeight:700}}>{r.name}</div><div style={{fontSize:".58rem",color:C.gold}}>{"★".repeat(r.stars)}<span style={{color:C.muted,fontWeight:400,marginLeft:4}}>📍 {r.loc}</span></div></div>
                </div>
                <div style={{fontSize:".74rem",color:C.muted2,lineHeight:1.62,fontStyle:"italic"}}>"{r.text}"</div>
              </div>
            ))}
          </div>
          <div style={{margin:"11px 12px 0",background:"linear-gradient(135deg,#1877F2,#1565C0)",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontSize:".58rem",color:"rgba(255,255,255,.55)"}}>More reviews</div><div style={{fontSize:".78rem",fontWeight:900,color:"#fff"}}>Our Facebook Page</div></div>
            <a href={FB} target="_blank" rel="noreferrer" style={{background:"#fff",color:"#1877F2",padding:"6px 12px",borderRadius:50,fontSize:".66rem",fontWeight:800,textDecoration:"none"}}>View →</a>
          </div>
        </>}

        {section==="about"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:C.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Our Story</div><div style={{fontSize:"1.2rem",fontWeight:900}}>About <span style={{color:acc}}>Us</span></div></div>
          <div style={{margin:"0 12px 12px",borderRadius:20,overflow:"hidden",height:190,position:"relative"}}>
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90" alt="Kitchen" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(7,7,7,.08) 0%,rgba(7,7,7,.65) 100%)"}}/>
            <div style={{position:"absolute",bottom:13,left:13,display:"flex",alignItems:"center",gap:9}}>
              <Logo size={40} accent={acc}/>
              <div><div style={{fontSize:".92rem",fontWeight:900,color:"#fff"}}>Mrs Chef</div><div style={{fontSize:".6rem",color:"rgba(255,255,255,.55)"}}>Delhi NCR</div></div>
            </div>
          </div>
          <div style={{margin:"0 12px 11px",background:C.card,borderRadius:16,padding:"14px",border:`1px solid #1A1A1A`}}>
            <div style={{fontSize:".8rem",color:C.muted2,lineHeight:1.75}}>Mrs Chef started as a labour of love — home-cooked food made with the finest ingredients, warmest intentions and decades of kitchen wisdom. Based in Delhi NCR, we cater for birthdays, corporate events, poojas and every celebration that deserves real, nourishing food. No shortcuts. No compromise. Just food that feels like home.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,margin:"0 12px 11px"}}>
            {[["500+","Events"],["4.9★","Rating"],["5yrs","Exp."]].map(([v,l])=>(
              <div key={l} style={{background:C.card,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1px solid #1A1A1A`}}>
                <div style={{fontSize:"1.05rem",fontWeight:900,color:acc}}>{v}</div>
                <div style={{fontSize:".57rem",color:C.muted,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,margin:"0 12px"}}>
            {[["🥗","Fresh Daily","Local sourced"],["🏠","Home Style","Family recipes"],["📦","Hygienic","Packed safely"],["⭐","Consistent","Every event"]].map(([ic,h,d])=>(
              <div key={h} style={{background:C.card,borderRadius:12,padding:"11px",border:`1px solid #1A1A1A`}}>
                <div style={{fontSize:"1.15rem",marginBottom:5}}>{ic}</div>
                <div style={{fontSize:".72rem",fontWeight:700,marginBottom:2}}>{h}</div>
                <div style={{fontSize:".58rem",color:C.muted,lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
        </>}

        {section==="enquiry"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:C.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Let's Talk</div><div style={{fontSize:"1.2rem",fontWeight:900}}>Make an <span style={{color:acc}}>Enquiry</span></div></div>
          {enquirySent?(
            <div style={{textAlign:"center",padding:"44px 24px"}}>
              <div style={{fontSize:"2.8rem",marginBottom:10,animation:"bounce 1.2s ease infinite"}}>🎉</div>
              <div style={{fontSize:"1.1rem",fontWeight:900,marginBottom:5}}>Enquiry <span style={{color:acc}}>Sent!</span></div>
              <div style={{fontSize:".78rem",color:C.muted2,lineHeight:1.7,marginBottom:18}}>We'll reach out within 2 hours on WhatsApp.</div>
              <button onClick={()=>setEnquirySent(false)} style={{background:`linear-gradient(135deg,${acc},${C.goldd})`,color:"#000",border:"none",padding:"9px 20px",borderRadius:50,fontSize:".78rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>New Enquiry</button>
            </div>
          ):(
            <div style={{padding:"0 12px"}}>
              <div style={{background:C.card,borderRadius:18,padding:"14px",border:`1px solid #1A1A1A`,marginBottom:10}}>
                <div style={{fontSize:".78rem",fontWeight:800,marginBottom:11}}>Quick Enquiry</div>
                {[["Name *","text","name","Your name"],["Phone *","tel","phone","+91 XXXXX XXXXX"]].map(([lb,tp,k,ph])=>(
                  <div key={k} style={{marginBottom:8}}>
                    <label style={{display:"block",fontSize:".58rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>{lb}</label>
                    <input type={tp} placeholder={ph} value={enquiry[k]} onChange={e=>setEnquiry({...enquiry,[k]:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:C.white,background:C.card2,outline:"none"}}/>
                  </div>
                ))}
                <div style={{marginBottom:8}}>
                  <label style={{display:"block",fontSize:".58rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Occasion</label>
                  <select value={enquiry.occasion} onChange={e=>setEnquiry({...enquiry,occasion:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:C.white,background:C.card2,outline:"none"}}>
                    <option value="">Select</option>
                    {OCCASIONS.map(o=><option key={o.id} value={o.label}>{o.emoji} {o.label}</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                  <div><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Guests</label><input type="number" min="1" max="40" placeholder="Max 40" value={enquiry.guests} onChange={e=>setEnquiry({...enquiry,guests:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:C.white,background:C.card2,outline:"none"}}/></div>
                  <div><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Date</label><input type="date" value={enquiry.date} onChange={e=>setEnquiry({...enquiry,date:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:C.white,background:C.card2,outline:"none"}}/></div>
                </div>
                <div style={{marginBottom:12}}><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase"}}>Message</label><textarea value={enquiry.notes} onChange={e=>setEnquiry({...enquiry,notes:e.target.value})} placeholder="Tell us about your event…" rows={3} style={{width:"100%",padding:"9px 11px",border:`1px solid #1A1A1A`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:C.white,background:C.card2,outline:"none",resize:"none"}}/></div>
                <button onClick={()=>{if(enquiry.name&&enquiry.phone){const num="919876543210";const msg=encodeURIComponent(`Hi Mrs Chef!\n👤 ${enquiry.name}\n📞 ${enquiry.phone}\n🎉 ${enquiry.occasion}\n👥 ${enquiry.guests} guests\n📅 ${enquiry.date}\n📝 ${enquiry.notes||"None"}`);window.open(`https://wa.me/${num}?text=${msg}`,"_blank");setEnquirySent(true);}}} style={{width:"100%",padding:"12px",background:enquiry.name&&enquiry.phone?`linear-gradient(135deg,${acc},${C.goldd})`:"#181818",color:enquiry.name&&enquiry.phone?"#000":C.muted,border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:900,cursor:"pointer",transition:"all .2s"}}>
                  💬 Send via WhatsApp
                </button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <a href={WA} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#15803D,#16A34A)",borderRadius:14,padding:"12px",textDecoration:"none",textAlign:"center",display:"block"}}><div style={{fontSize:"1.2rem",marginBottom:2}}>💬</div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>WhatsApp</div></a>
                <a href={FB} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#1877F2,#1565C0)",borderRadius:14,padding:"12px",textDecoration:"none",textAlign:"center",display:"block"}}><div style={{fontSize:"1.2rem",marginBottom:2}}>👥</div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>Facebook</div></a>
              </div>
            </div>
          )}
        </>}

        <BottomNav/>
      </div>
    </div>
  );
}