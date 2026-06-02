import { useState, useEffect } from "react";

// ── THEME ─────────────────────────────────────────────────────────────────────
const DARK = { bg:"#070707",card:"#101010",card2:"#171717",card3:"#202020",border:"#1E1E1E",text:"#F0F0F0",muted:"#555",muted2:"#888" };
const LIGHT= { bg:"#F5F5F5",card:"#FFFFFF",card2:"#F0F0F0",card3:"#E8E8E8",border:"#E0E0E0",text:"#111111",muted:"#999",muted2:"#666" };

const FIXED = { gold:"#F0B429",goldd:"#C8940A",pink:"#FF2D7E",green:"#22C55E",red:"#EF4444" };

// ── DEFAULT EDITABLE DATA ─────────────────────────────────────────────────────
const DEF_SETTINGS = {
  businessName:"Mrs Chef", tagline:"Home Kitchen • Delhi NCR",
  heroText:"Crafted for Your Special Moments",
  phone:"+91 98765 43210", whatsapp:"919876543210",
  facebook:"https://facebook.com/mrschef",
  zomato:"https://link.zomato.com/xqzv/rshare?id=13826583030563af3",
  about:"Mrs Chef started as a labour of love — home-cooked food made with the finest ingredients, warmest intentions and decades of kitchen wisdom. Based in Delhi NCR, we cater for birthdays, corporate events, poojas and every celebration that deserves real, nourishing food.",
  accent:"#F0B429", theme:"dark", adminPassword:"mrschef2025", maxGuests:40,
};

const DEF_FOOD = {
  starters:[
    {id:"s1",name:"Paneer Tikka",    veg:true, img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80",active:true},
    {id:"s2",name:"Chicken Tikka",   veg:false,img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",active:true},
    {id:"s3",name:"Samosa Chaat",    veg:true, img:"https://images.unsplash.com/photo-1601050690117-ef4e6e2bef5d?w=400&q=80",active:true},
    {id:"s4",name:"Veg Seekh Kebab", veg:true, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",active:true},
    {id:"s5",name:"Fish Amritsari",  veg:false,img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80",active:true},
    {id:"s6",name:"Dahi Ke Sholey",  veg:true, img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",active:true},
  ],
  mains:[
    {id:"m1",name:"Dal Makhani",          veg:true, img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",active:true},
    {id:"m2",name:"Paneer Butter Masala", veg:true, img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",active:true},
    {id:"m3",name:"Lucknowi Biryani",     veg:false,img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",active:true},
    {id:"m4",name:"Chicken Curry",        veg:false,img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",active:true},
    {id:"m5",name:"Rajma Masala",         veg:true, img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",active:true},
    {id:"m6",name:"Mutton Rogan Josh",    veg:false,img:"https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=80",active:true},
  ],
  breads:[
    {id:"b1",name:"Butter Naan",    veg:true,img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",active:true},
    {id:"b2",name:"Laccha Paratha", veg:true,img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",active:true},
    {id:"b3",name:"Garlic Naan",    veg:true,img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80",active:true},
    {id:"b4",name:"Tandoori Roti",  veg:true,img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",active:true},
  ],
  rice:[
    {id:"r1",name:"Steamed Basmati",veg:true,img:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80",active:true},
    {id:"r2",name:"Veg Pulao",      veg:true,img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",active:true},
    {id:"r3",name:"Jeera Rice",     veg:true,img:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80",active:true},
  ],
  desserts:[
    {id:"d1",name:"Gulab Jamun", veg:true,img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",active:true},
    {id:"d2",name:"Rasmalai",    veg:true,img:"https://images.unsplash.com/photo-1571167530149-c1105da4c2fd?w=400&q=80",active:true},
    {id:"d3",name:"Gajar Halwa", veg:true,img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80",active:true},
    {id:"d4",name:"Kheer",       veg:true,img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",active:true},
  ],
};

const DEF_COMBOS = [
  {id:"c1",label:"Classic",   starters:2,mains:2,breads:1,rice:1,desserts:1,price:249,active:true},
  {id:"c2",label:"Feast",     starters:3,mains:3,breads:2,rice:1,desserts:2,price:349,active:true},
  {id:"c3",label:"Grand",     starters:4,mains:4,breads:2,rice:2,desserts:3,price:449,active:true},
  {id:"c4",label:"Royal",     starters:5,mains:5,breads:3,rice:2,desserts:4,price:599,active:true},
];

const DEF_OFFERS = [
  {id:"o1",label:"Early Bird",desc:"Book 30+ days in advance",discount:10,active:true},
  {id:"o2",label:"Loyalty",   desc:"3rd event with us",       discount:15,active:true},
  {id:"o3",label:"Bulk",      desc:"50+ guests",              discount:8, active:false},
];

const DEF_ORDERS = [];

const HERO_IMGS = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=90",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=90",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=90",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&q=90",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900&q=90",
  "https://images.unsplash.com/photo-1567337710282-00832b415979?w=900&q=90",
];

const FOOD_ENTRIES = [
  {id:"menu", label:"Build Menu",   emoji:"🍽️",img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=90",desc:"Custom multi-course menu", color:"#F0B429"},
  {id:"box",  label:"Chef Box",     emoji:"📦",img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=700&q=90",desc:"Individual meal boxes",     color:"#22C55E"},
  {id:"snack",label:"Snack Fiesta", emoji:"🎉",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&q=90",desc:"Platters & high tea",       color:"#FF6B6B"},
];

const OCCASIONS=[
  {id:"birthday",  label:"Birthday",       emoji:"🎂"},
  {id:"bachelor",  label:"Bachelor's Party",emoji:"🥳"},
  {id:"prewedding",label:"Pre-Wedding",    emoji:"💐"},
  {id:"corporate", label:"Corporate",      emoji:"🏢"},
  {id:"pooja",     label:"Pooja",          emoji:"🪔",vegOnly:true},
  {id:"satvik",    label:"Satvik",         emoji:"🕉️",vegOnly:true},
  {id:"kitty",     label:"Kitty Party",    emoji:"🥂"},
  {id:"farewell",  label:"Farewell",       emoji:"🌟"},
];

const REVIEWS=[
  {name:"Priya S.", loc:"Kalkaji",  stars:5,text:"Best home food at any event. The biryani was absolutely divine!",av:"P",col:"#FF6B6B"},
  {name:"Rahul M.", loc:"Saket",    stars:5,text:"Chef Box for 50 people — always hot, hygienic and delicious.",   av:"R",col:"#4FC3F7"},
  {name:"Ananya K.",loc:"Gurgaon",  stars:5,text:"Every single guest was raving about the food. Outstanding!",     av:"A",col:"#C9A84C"},
  {name:"Vikram N.",loc:"Faridabad",stars:5,text:"Snack Fiesta was the highlight of our birthday party!",          av:"V",col:"#CE93D8"},
  {name:"Sunita G.",loc:"Noida",    stars:5,text:"Satvik box for pooja — so pure and delicious. Loved it!",        av:"S",col:"#22C55E"},
  {name:"Deepak R.",loc:"Gr. Noida",stars:5,text:"Tiffin service — tastes like maa ke haath ka khana!",            av:"D",col:"#FFB74D"},
];

const OUR_WORK=[
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=85",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=85",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=85",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=85",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=85",
];

const SPECIALITIES=[
  {name:"Lucknowi Dum Biryani",desc:"Slow-cooked saffron dum biryani with whole spices & tender meat",img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=85",veg:false},
  {name:"Dal Makhani",         desc:"Overnight slow-simmered black lentils in rich butter & cream",  img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=85",veg:true},
  {name:"Paneer Butter Masala",desc:"Silky tomato-butter gravy with soft paneer — our most-loved",  img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=85",veg:true},
  {name:"Mutton Rogan Josh",   desc:"Kashmir-style slow-cooked mutton in fragrant whole spices",     img:"https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=85",veg:false},
  {name:"Gajar Ka Halwa",      desc:"Home-style carrot halwa in pure desi ghee — pure nostalgia",   img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=85",veg:true},
  {name:"Chicken Tikka Masala",desc:"Tandoori chicken in smoky vibrant tomato masala gravy",         img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=85",veg:false},
];

const AREAS=["Kalkaji","Saket","CR Park","Lajpat Nagar","Gurgaon","Faridabad","Noida","Greater Noida","Dwarka","Vasant Kunj"];

const BUILDER_STEPS=[
  {key:"start",   label:"Let's Start",emoji:"🌟"},
  {key:"starters",label:"Starters",   emoji:"🍢"},
  {key:"mains",   label:"Mains",      emoji:"🍛"},
  {key:"breads",  label:"Breads",     emoji:"🫓"},
  {key:"rice",    label:"Rice",       emoji:"🍚"},
  {key:"desserts",label:"Desserts",   emoji:"🍮"},
];

// ── SEMI-CIRCLE PIE WHEEL ─────────────────────────────────────────────────────
function SemiPieWheel({items,activeIdx,onSelect,accent,completed}){
  const W=340,H=185,cx=W/2,cy=H+8,outerR=158,innerR=54,n=items.length,stp=Math.PI/n;
  function polar(a,r){return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};}
  function segPath(i,pop){
    const a1=Math.PI+i*stp+0.03,a2=Math.PI+(i+1)*stp-0.03,ouR=pop?outerR+14:outerR;
    const p1=polar(a1,ouR),p2=polar(a2,ouR),p3=polar(a2,innerR),p4=polar(a1,innerR);
    return`M${p1.x} ${p1.y} A${ouR} ${ouR} 0 0 1 ${p2.x} ${p2.y} L${p3.x} ${p3.y} A${innerR} ${innerR} 0 0 0 ${p4.x} ${p4.y}Z`;
  }
  function mid(i,pop){const a=Math.PI+(i+0.5)*stp,r=((pop?outerR+14:outerR)+innerR)/2+(pop?3:0);return polar(a,r);}
  const ticks=Array.from({length:33},(_,i)=>Math.PI+(i/32)*Math.PI);
  return(
    <div style={{display:"flex",justifyContent:"center",overflow:"visible"}}>
      <svg width={W} height={H+12} viewBox={`0 ${H-H} ${W} ${H+12}`} style={{overflow:"visible",touchAction:"none"}}>
        <defs>
          <radialGradient id="hub-g" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fff"/><stop offset="55%" stopColor="#ccc"/><stop offset="100%" stopColor="#888"/></radialGradient>
          <radialGradient id="ring-g" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={accent}/><stop offset="100%" stopColor={FIXED.goldd}/></radialGradient>
          {items.map((_,i)=><radialGradient key={i} id={`sg${i}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={accent}/><stop offset="100%" stopColor={FIXED.goldd}/></radialGradient>)}
        </defs>
        <circle cx={cx} cy={cy} r={outerR+32} fill="none" stroke={`${accent}12`} strokeWidth="24"/>
        <circle cx={cx} cy={cy} r={outerR+32} fill="none" stroke={`${accent}07`} strokeWidth="40"/>
        {ticks.map((ta,i)=>{const p1=polar(ta,outerR+13),p2=polar(ta,outerR+(i%4===0?23:17));return<line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={i%4===0?"rgba(255,255,255,.32)":"rgba(255,255,255,.1)"} strokeWidth={i%4===0?1.8:1} strokeLinecap="round"/>;})}
        <path d={`M${polar(Math.PI,outerR+13).x} ${polar(Math.PI,outerR+13).y} A${outerR+13} ${outerR+13} 0 0 1 ${polar(0,outerR+13).x} ${polar(0,outerR+13).y}`} fill="none" stroke={`${accent}55`} strokeWidth="1.5"/>
        {items.map((_,i)=>{if(!i)return null;const a=Math.PI+i*stp,p1=polar(a,innerR+1),p2=polar(a,outerR-1);return<line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#000" strokeWidth="1.5" opacity=".5"/>;  })}
        {items.map((item,i)=>{
          const isA=i===activeIdx,isDone=completed?.[item.key],m=mid(i,isA);
          return(<g key={item.key} onClick={()=>onSelect(i)} style={{cursor:"pointer"}}>
            <path d={segPath(i,isA)} fill={isA?`url(#sg${i})`:isDone?"#182814":"#161616"} stroke={isA?accent:isDone?"#2A3818":"#232323"} strokeWidth={isA?2:1} style={{filter:isA?`drop-shadow(0 -5px 14px ${accent}99)`:"none",transition:"all .22s"}}/>
            <text x={m.x} y={m.y-10} textAnchor="middle" dominantBaseline="middle" fontSize={isA?"20":"14"} style={{userSelect:"none",pointerEvents:"none"}}>{item.emoji}</text>
            <text x={m.x} y={m.y+11} textAnchor="middle" dominantBaseline="middle" fontSize="7" fontWeight={isA?"800":"500"} fill={isA?"#000":isDone?FIXED.green:"#777"} fontFamily="'Poppins',sans-serif" style={{userSelect:"none",pointerEvents:"none"}}>{item.label}</text>
            {isDone&&!isA&&<><circle cx={m.x+12} cy={m.y-16} r="7" fill={FIXED.green}/><text x={m.x+12} y={m.y-16} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="900" style={{pointerEvents:"none"}}>✓</text></>}
          </g>);
        })}
        <circle cx={cx} cy={cy} r={innerR+7} fill="url(#ring-g)" style={{filter:`drop-shadow(0 0 14px ${accent}88)`}}/>
        <circle cx={cx} cy={cy} r={innerR} fill="url(#hub-g)" style={{filter:"drop-shadow(0 3px 8px rgba(0,0,0,.6))"}}/>
        <text x={cx} y={cy-9} textAnchor="middle" fontSize="9" fontWeight="800" fill={FIXED.goldd} fontFamily="'Poppins',sans-serif" style={{userSelect:"none",pointerEvents:"none"}}>{items[activeIdx]?.label}</text>
        <text x={cx} y={cy+9} textAnchor="middle" fontSize="18" style={{userSelect:"none",pointerEvents:"none"}}>{items[activeIdx]?.emoji}</text>
      </svg>
    </div>
  );
}

function DishCard({item,selected,onToggle,accent}){
  const on=!!selected.find(i=>i.id===item.id);
  return(
    <div onClick={()=>onToggle(item)} style={{flexShrink:0,width:138,borderRadius:18,overflow:"hidden",cursor:"pointer",border:`2px solid ${on?accent:"transparent"}`,background:DARK.card2,transform:on?"scale(1.04)":"scale(1)",boxShadow:on?`0 0 22px ${accent}44,0 6px 22px rgba(0,0,0,.6)`:`0 4px 18px rgba(0,0,0,.5)`,transition:"all .2s",position:"relative"}}>
      <img src={item.img} alt={item.name} style={{width:"100%",height:96,objectFit:"cover",display:"block"}} onError={e=>e.target.src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300"}/>
      <div style={{position:"absolute",top:6,left:6,width:9,height:9,borderRadius:2,background:item.veg?FIXED.green:FIXED.red}}/>
      {on&&<div style={{position:"absolute",top:6,right:6,width:18,height:18,borderRadius:"50%",background:accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:900,color:"#000"}}>✓</div>}
      <div style={{padding:"8px 10px 10px"}}><div style={{fontSize:".71rem",fontWeight:700,color:"#F0F0F0",lineHeight:1.25}}>{item.name}</div></div>
    </div>
  );
}

function Logo({size=44,accent}){
  const [err,setErr]=useState(false);
  return(
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",border:`2px solid ${accent}55`,boxShadow:`0 0 16px ${accent}33`,flexShrink:0}}>
      {!err?<img src="/logo.jpg" alt="Mrs Chef" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={()=>setErr(true)}/>:<div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#FF2D7E,#9B1B4B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.36+"rem"}}>👩‍🍳</div>}
    </div>
  );
}

function GlowBg({color}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${color}09,transparent 70%)`,top:"-15%",left:"-15%",animation:"g1 9s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:350,height:350,borderRadius:"50%",background:`radial-gradient(circle,${color}06,transparent 70%)`,bottom:"5%",right:"-10%",animation:"g2 11s ease-in-out infinite"}}/>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({onExit,orders,setOrders,settings,setSettings,food,setFood,combos,setCombos,offers,setOffers}){
  const [section,setSection]=useState(null); // null=dashboard, or key string
  const [pwForm,setPwForm]=useState({cur:"",n1:"",n2:""});
  const [pwMsg,setPwMsg]=useState("");
  const [toast,setToast]=useState("");
  const [editItem,setEditItem]=useState(null); // {cat,item} being edited
  const [newItem,setNewItem]=useState({name:"",veg:true,img:"",active:true});
  const [addingTo,setAddingTo]=useState(null);

  const acc=settings.accent;
  const T=settings.theme==="light"?LIGHT:DARK;

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};
  const save=()=>showToast("✅ Saved!");

  const updateItem=(cat,id,changes)=>{
    setFood({...food,[cat]:food[cat].map(i=>i.id===id?{...i,...changes}:i)});
  };
  const deleteItem=(cat,id)=>{
    setFood({...food,[cat]:food[cat].filter(i=>i.id!==id)});
    showToast("🗑️ Item removed");
  };
  const addItem=(cat)=>{
    if(!newItem.name){showToast("⚠️ Name required");return;}
    const id=cat[0]+(Date.now()%10000);
    setFood({...food,[cat]:[...food[cat],{...newItem,id}]});
    setNewItem({name:"",veg:true,img:"",active:true});
    setAddingTo(null);
    showToast("✅ Item added!");
  };

  // DASHBOARD TILES
  const tiles=[
    {key:"orders",  icon:"📦",label:"Orders",       color:"#3B82F6",badge:orders.filter(o=>o.status==="New").length},
    {key:"menu",    icon:"🍽️",label:"Menu Items",   color:acc},
    {key:"combos",  icon:"💰",label:"Pricing",      color:"#22C55E"},
    {key:"offers",  icon:"🎁",label:"Offers",       color:"#8B5CF6"},
    {key:"business",icon:"🏢",label:"Business Info",color:"#F97316"},
    {key:"theme",   icon:"🎨",label:"Appearance",   color:"#EC4899"},
    {key:"password",icon:"🔐",label:"Password",     color:FIXED.red},
    {key:"pages",   icon:"📄",label:"Pages",        color:"#06B6D4"},
  ];

  const sectionStyle={fontFamily:"'Poppins',sans-serif",background:T.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",color:T.text,overflowX:"hidden",position:"relative"};

  const SectionHeader=({title,icon})=>(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,background:T.bg,zIndex:10}}>
      <button onClick={()=>setSection(null)} style={{background:T.card2,border:`1px solid ${T.border}`,color:T.text,width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:".88rem"}}>←</button>
      <div style={{fontSize:".95rem",fontWeight:900,color:T.text}}>{icon} {title}</div>
    </div>
  );

  const Field=({label,value,onChange,type="text",placeholder=""})=>(
    <div style={{marginBottom:12}}>
      <label style={{display:"block",fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:".05em"}}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{width:"100%",padding:"10px 13px",border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",color:T.text,background:T.card2,outline:"none"}}/>
    </div>
  );

  const Toggle=({on,onChange,label})=>(
    <div onClick={()=>onChange(!on)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",padding:"10px 0"}}>
      <span style={{fontSize:".8rem",color:T.text}}>{label}</span>
      <div style={{width:44,height:24,borderRadius:50,background:on?acc:T.card3,position:"relative",transition:"background .2s"}}>
        <div style={{position:"absolute",top:3,left:on?23:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
      </div>
    </div>
  );

  if(!section) return(
    <div style={sectionStyle}>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:T.card,border:`1px solid ${acc}`,borderRadius:12,padding:"10px 20px",fontSize:".8rem",fontWeight:700,color:acc,zIndex:999,boxShadow:`0 4px 20px rgba(0,0,0,.4)`}}>{toast}</div>}
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 16px 12px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo size={38} accent={acc}/>
          <div><div style={{fontSize:".62rem",color:T.muted,textTransform:"uppercase",letterSpacing:".06em"}}>Admin Panel</div><div style={{fontSize:"1rem",fontWeight:900,color:acc}}>Mrs Chef</div></div>
        </div>
        <button onClick={onExit} style={{background:T.card2,border:`1px solid ${T.border}`,color:T.muted2,padding:"6px 14px",borderRadius:50,fontSize:".7rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Exit ✕</button>
      </div>
      {/* Stats bar */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,padding:"12px 14px",borderBottom:`1px solid ${T.border}`}}>
        {[["📦",orders.length,"Orders"],["✅",orders.filter(o=>o.status==="Confirmed").length,"Confirmed"],["🆕",orders.filter(o=>o.status==="New").length,"Pending"]].map(([ic,n,lb])=>(
          <div key={lb} style={{background:T.card2,borderRadius:12,padding:"10px",textAlign:"center",border:`1px solid ${T.border}`}}>
            <div style={{fontSize:".9rem"}}>{ic}</div>
            <div style={{fontSize:"1.2rem",fontWeight:900,color:acc,lineHeight:1.1}}>{n}</div>
            <div style={{fontSize:".58rem",color:T.muted,marginTop:2}}>{lb}</div>
          </div>
        ))}
      </div>
      {/* Tiles grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"14px"}}>
        {tiles.map(t=>(
          <div key={t.key} onClick={()=>setSection(t.key)} style={{background:T.card,borderRadius:18,padding:"16px",border:`1px solid ${T.border}`,cursor:"pointer",position:"relative",overflow:"hidden",transition:"transform .15s",boxShadow:`0 2px 12px rgba(0,0,0,.15)`}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${t.color},${t.color}88)`}}/>
            {t.badge>0&&<div style={{position:"absolute",top:10,right:10,background:FIXED.red,color:"#fff",fontSize:".58rem",fontWeight:800,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{t.badge}</div>}
            <div style={{fontSize:"1.6rem",marginBottom:8}}>{t.icon}</div>
            <div style={{fontSize:".78rem",fontWeight:800,color:T.text}}>{t.label}</div>
            <div style={{fontSize:".58rem",color:T.muted,marginTop:2}}>Tap to manage →</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── ORDERS ──────────────────────────────────────────────────────────────────
  if(section==="orders") return(
    <div style={sectionStyle}>
      <SectionHeader title="Orders" icon="📦"/>
      <div style={{padding:"14px"}}>
        {orders.length===0?<div style={{textAlign:"center",padding:"48px 0",color:T.muted}}><div style={{fontSize:"3rem",marginBottom:10}}>📭</div>No orders yet</div>:
        orders.map(o=>(
          <div key={o.id} style={{background:T.card,borderRadius:16,padding:"13px",marginBottom:10,border:`1px solid ${T.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <div style={{fontSize:".84rem",fontWeight:800,color:T.text}}>{o.name}</div>
              <div style={{display:"flex",gap:5}}>
                <span style={{fontSize:".6rem",background:o.status==="New"?`${acc}22`:"#15803D22",color:o.status==="New"?acc:FIXED.green,padding:"2px 8px",borderRadius:50,fontWeight:700}}>{o.status}</span>
              </div>
            </div>
            <div style={{fontSize:".66rem",color:T.muted2,marginBottom:4}}>📞 {o.phone} · 📅 {o.date} · 🎉 {o.occasion} · 👥 {o.pax||"—"}</div>
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <button onClick={()=>setOrders(orders.map(x=>x.id===o.id?{...x,status:"Confirmed"}:x))} style={{flex:1,padding:"7px",background:"#15803D22",color:FIXED.green,border:`1px solid #15803D44`,borderRadius:8,fontSize:".66rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>✅ Confirm</button>
              <a href={`https://wa.me/${o.phone?.replace(/\D/g,"")||"919876543210"}?text=${encodeURIComponent(`Hi ${o.name}! Your Mrs Chef booking for ${o.date} is confirmed! 🎉`)}`} target="_blank" rel="noreferrer" style={{flex:1,padding:"7px",background:"#15803D22",color:FIXED.green,border:`1px solid #15803D44`,borderRadius:8,fontSize:".66rem",fontWeight:700,textDecoration:"none",textAlign:"center"}}>💬 WhatsApp</a>
              <button onClick={()=>setOrders(orders.filter(x=>x.id!==o.id))} style={{padding:"7px 10px",background:`${FIXED.red}18`,color:FIXED.red,border:`1px solid ${FIXED.red}33`,borderRadius:8,fontSize:".66rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── MENU ITEMS ───────────────────────────────────────────────────────────────
  if(section==="menu"){
    const cats=[["starters","Starters","🍢"],["mains","Mains","🍛"],["breads","Breads","🫓"],["rice","Rice","🍚"],["desserts","Desserts","🍮"]];
    return(
      <div style={sectionStyle}>
        {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:T.card,border:`1px solid ${acc}`,borderRadius:12,padding:"10px 20px",fontSize:".8rem",fontWeight:700,color:acc,zIndex:999}}>  {toast}</div>}
        <SectionHeader title="Menu Items" icon="🍽️"/>

        {/* Edit modal */}
        {editItem&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setEditItem(null)}>
            <div style={{background:T.card,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:430,padding:"20px 18px 32px"}} onClick={e=>e.stopPropagation()}>
              <div style={{height:4,width:40,background:T.card3,borderRadius:50,margin:"0 auto 16px"}}/>
              <div style={{fontSize:".88rem",fontWeight:900,color:T.text,marginBottom:14}}>Edit Item</div>
              {/* Image preview */}
              <div style={{position:"relative",height:120,borderRadius:14,overflow:"hidden",marginBottom:12,background:T.card2,border:`1px solid ${T.border}`}}>
                {editItem.item.img?<img src={editItem.item.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:T.muted,fontSize:".75rem"}}>No image · paste URL below</div>}
                <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 50%,rgba(0,0,0,.5))"}}/>
                <div style={{position:"absolute",top:8,left:8,width:10,height:10,borderRadius:2,background:editItem.item.veg?FIXED.green:FIXED.red}}/>
              </div>
              <Field label="Name" value={editItem.item.name} onChange={v=>setEditItem({...editItem,item:{...editItem.item,name:v}})}/>
              <Field label="Image URL" value={editItem.item.img} onChange={v=>setEditItem({...editItem,item:{...editItem.item,img:v}})} placeholder="https://images.unsplash.com/..."/>
              <Toggle on={editItem.item.veg} onChange={v=>setEditItem({...editItem,item:{...editItem.item,veg:v}})} label={editItem.item.veg?"🟢 Vegetarian":"🔴 Non-Vegetarian"}/>
              <Toggle on={editItem.item.active} onChange={v=>setEditItem({...editItem,item:{...editItem.item,active:v}})} label={editItem.item.active?"✅ Active (visible)":"⏸️ Hidden"}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
                <button onClick={()=>{updateItem(editItem.cat,editItem.item.id,editItem.item);setEditItem(null);showToast("✅ Saved!");}} style={{padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontSize:".84rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Save Changes</button>
                <button onClick={()=>{deleteItem(editItem.cat,editItem.item.id);setEditItem(null);}} style={{padding:"12px",background:`${FIXED.red}18`,color:FIXED.red,border:`1px solid ${FIXED.red}33`,borderRadius:50,fontSize:".84rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Delete Item</button>
              </div>
            </div>
          </div>
        )}

        {/* Add item modal */}
        {addingTo&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={()=>setAddingTo(null)}>
            <div style={{background:T.card,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:430,padding:"20px 18px 32px"}} onClick={e=>e.stopPropagation()}>
              <div style={{height:4,width:40,background:T.card3,borderRadius:50,margin:"0 auto 16px"}}/>
              <div style={{fontSize:".88rem",fontWeight:900,color:T.text,marginBottom:14}}>Add New Item to {addingTo}</div>
              {newItem.img&&<div style={{height:100,borderRadius:12,overflow:"hidden",marginBottom:10,border:`1px solid ${T.border}`}}><img src={newItem.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/></div>}
              <Field label="Name *" value={newItem.name} onChange={v=>setNewItem({...newItem,name:v})} placeholder="e.g. Palak Paneer"/>
              <Field label="Image URL" value={newItem.img} onChange={v=>setNewItem({...newItem,img:v})} placeholder="https://images.unsplash.com/..."/>
              <Toggle on={newItem.veg} onChange={v=>setNewItem({...newItem,veg:v})} label={newItem.veg?"🟢 Vegetarian":"🔴 Non-Vegetarian"}/>
              <button onClick={()=>addItem(addingTo)} style={{width:"100%",marginTop:14,padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontSize:".86rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>+ Add Item</button>
            </div>
          </div>
        )}

        <div style={{padding:"12px 14px"}}>
          {cats.map(([cat,label,icon])=>(
            <div key={cat} style={{marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontSize:".86rem",fontWeight:800,color:acc}}>{icon} {label} <span style={{fontSize:".66rem",color:T.muted,fontWeight:400}}>({food[cat].length} items)</span></div>
                <button onClick={()=>setAddingTo(cat)} style={{padding:"5px 12px",background:`${acc}18`,color:acc,border:`1px solid ${acc}44`,borderRadius:50,fontSize:".65rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>+ Add</button>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {food[cat].map(item=>(
                  <div key={item.id} onClick={()=>setEditItem({cat,item:{...item}})} style={{display:"flex",alignItems:"center",gap:10,background:T.card,borderRadius:14,padding:"10px 12px",border:`1px solid ${item.active?T.border:FIXED.red+"33"}`,cursor:"pointer",opacity:item.active?1:.6,transition:"opacity .2s"}}>
                    <div style={{width:52,height:52,borderRadius:12,overflow:"hidden",flexShrink:0,background:T.card2,border:`1px solid ${T.border}`}}>
                      {item.img?<img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>🍽️</div>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:".8rem",fontWeight:700,color:T.text}}>{item.name}</div>
                      <div style={{display:"flex",gap:5,marginTop:2,alignItems:"center"}}>
                        <div style={{width:7,height:7,borderRadius:1,background:item.veg?FIXED.green:FIXED.red}}/>
                        <span style={{fontSize:".62rem",color:T.muted}}>{item.veg?"Veg":"Non-Veg"}</span>
                        {!item.active&&<span style={{fontSize:".58rem",color:FIXED.red,fontWeight:600}}>· Hidden</span>}
                      </div>
                    </div>
                    <div style={{color:T.muted,fontSize:".75rem"}}>✏️</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PRICING / COMBOS ─────────────────────────────────────────────────────────
  if(section==="combos") return(
    <div style={sectionStyle}>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:T.card,border:`1px solid ${acc}`,borderRadius:12,padding:"10px 20px",fontSize:".8rem",fontWeight:700,color:acc,zIndex:999}}>{toast}</div>}
      <SectionHeader title="Pricing & Combinations" icon="💰"/>
      <div style={{padding:"12px 14px"}}>
        <div style={{background:T.card2,borderRadius:14,padding:"12px 14px",marginBottom:16,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".72rem",fontWeight:700,color:acc,marginBottom:3}}>How Pricing Works</div>
          <div style={{fontSize:".66rem",color:T.muted2,lineHeight:1.55}}>Set how many dishes in each course = a package price. The app auto-matches the user's selection to the right tier and shows the price.</div>
        </div>
        {/* Max guests */}
        <div style={{background:T.card,borderRadius:14,padding:"13px 14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".75rem",fontWeight:800,color:T.text,marginBottom:10}}>👥 Max Guests Per Booking</div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <input type="number" value={settings.maxGuests} onChange={e=>setSettings({...settings,maxGuests:Number(e.target.value)})}
              style={{width:80,padding:"9px 12px",border:`1px solid ${acc}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:"1rem",fontWeight:900,color:acc,background:T.card2,outline:"none",textAlign:"center"}}/>
            <div style={{fontSize:".72rem",color:T.muted,lineHeight:1.5}}>Maximum allowed per booking. Shown in the menu builder.</div>
          </div>
        </div>
        {/* Combo tiers */}
        {combos.map((c,i)=>(
          <div key={c.id} style={{background:T.card,borderRadius:18,padding:"14px",marginBottom:12,border:`1px solid ${c.active?acc+"44":T.border}`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <input value={c.label} onChange={e=>{const n=[...combos];n[i]={...n[i],label:e.target.value};setCombos(n);}}
                  style={{background:"transparent",border:"none",color:acc,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",fontWeight:900,outline:"none",width:80}}/>
                <span style={{fontSize:".65rem",color:T.muted}}>Package</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <span style={{fontSize:".72rem",color:T.muted}}>₹</span>
                  <input type="number" value={c.price} onChange={e=>{const n=[...combos];n[i]={...n[i],price:Number(e.target.value)};setCombos(n);}}
                    style={{width:64,padding:"5px 8px",border:`1px solid ${T.border}`,borderRadius:8,fontFamily:"'Poppins',sans-serif",fontSize:".88rem",fontWeight:900,color:T.text,background:T.card2,outline:"none",textAlign:"center"}}/>
                  <span style={{fontSize:".6rem",color:T.muted}}>/pp</span>
                </div>
                <Toggle on={c.active} onChange={v=>{const n=[...combos];n[i]={...n[i],active:v};setCombos(n);}} label=""/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
              {[["starters","🍢","Starters"],["mains","🍛","Mains"],["breads","🫓","Breads"],["rice","🍚","Rice"],["desserts","🍮","Desserts"]].map(([k,ic,lb])=>(
                <div key={k} style={{textAlign:"center"}}>
                  <div style={{fontSize:".68rem",marginBottom:3}}>{ic}</div>
                  <input type="number" min="0" max="10" value={c[k]} onChange={e=>{const n=[...combos];n[i]={...n[i],[k]:Number(e.target.value)};setCombos(n);}}
                    style={{width:"100%",padding:"5px 3px",border:`1px solid ${T.border}`,borderRadius:7,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",fontWeight:800,color:acc,background:T.card2,outline:"none",textAlign:"center"}}/>
                  <div style={{fontSize:".55rem",color:T.muted,marginTop:2}}>{lb}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={()=>{const id="c"+Date.now();setCombos([...combos,{id,label:"New",starters:2,mains:2,breads:1,rice:1,desserts:1,price:299,active:true}]);}} style={{width:"100%",padding:"11px",background:T.card2,color:acc,border:`1px solid ${acc}44`,borderRadius:50,fontSize:".8rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",marginBottom:10}}>+ Add Package Tier</button>
        <button onClick={save} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Save Pricing ✓</button>
      </div>
    </div>
  );

  // ── OFFERS ───────────────────────────────────────────────────────────────────
  if(section==="offers") return(
    <div style={sectionStyle}>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:T.card,border:`1px solid ${acc}`,borderRadius:12,padding:"10px 20px",fontSize:".8rem",fontWeight:700,color:acc,zIndex:999}}>{toast}</div>}
      <SectionHeader title="Offers & Discounts" icon="🎁"/>
      <div style={{padding:"12px 14px"}}>
        <div style={{background:T.card2,borderRadius:12,padding:"10px 13px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".66rem",color:T.muted2,lineHeight:1.55}}>Active offers appear in the menu builder. Users tap to apply the discount before submitting.</div>
        </div>
        {offers.map((o,i)=>(
          <div key={o.id} style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:10,border:`1px solid ${o.active?"#8B5CF644":T.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{flex:1,paddingRight:10}}>
                <input value={o.label} onChange={e=>{const n=[...offers];n[i]={...n[i],label:e.target.value};setOffers(n);}}
                  style={{background:"transparent",border:"none",color:T.text,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:800,outline:"none",width:"100%",marginBottom:3}}/>
                <input value={o.desc} onChange={e=>{const n=[...offers];n[i]={...n[i],desc:e.target.value};setOffers(n);}}
                  style={{background:"transparent",border:"none",color:T.muted2,fontFamily:"'Poppins',sans-serif",fontSize:".7rem",outline:"none",width:"100%"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <input type="number" min="0" max="50" value={o.discount} onChange={e=>{const n=[...offers];n[i]={...n[i],discount:Number(e.target.value)};setOffers(n);}}
                  style={{width:44,padding:"4px 6px",border:`1px solid ${T.border}`,borderRadius:7,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,color:acc,background:T.card2,outline:"none",textAlign:"center"}}/>
                <span style={{fontSize:".7rem",color:T.muted}}>%</span>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <Toggle on={o.active} onChange={v=>{const n=[...offers];n[i]={...n[i],active:v};setOffers(n);}} label={o.active?"Active":"Inactive"}/>
              <button onClick={()=>{setOffers(offers.filter((_,j)=>j!==i));showToast("Offer removed");}} style={{background:`${FIXED.red}18`,color:FIXED.red,border:`1px solid ${FIXED.red}33`,padding:"4px 11px",borderRadius:50,fontSize:".62rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Remove</button>
            </div>
          </div>
        ))}
        <button onClick={()=>setOffers([...offers,{id:"o"+Date.now(),label:"New Offer",desc:"Description",discount:10,active:true}])} style={{width:"100%",padding:"11px",background:T.card2,color:"#8B5CF6",border:`1px solid #8B5CF644`,borderRadius:50,fontSize:".8rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",marginBottom:10}}>+ Add Offer</button>
        <button onClick={save} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Save Offers ✓</button>
      </div>
    </div>
  );

  // ── BUSINESS INFO ────────────────────────────────────────────────────────────
  if(section==="business") return(
    <div style={sectionStyle}>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:T.card,border:`1px solid ${acc}`,borderRadius:12,padding:"10px 20px",fontSize:".8rem",fontWeight:700,color:acc,zIndex:999}}>{toast}</div>}
      <SectionHeader title="Business Info" icon="🏢"/>
      <div style={{padding:"12px 14px"}}>
        {[["Business Name","businessName","text","Mrs Chef"],["Tagline","tagline","text","Home Kitchen • Delhi NCR"],["Hero Text","heroText","text","Crafted for Your Special Moments"],["Phone Number","phone","tel","+91 XXXXX XXXXX"],["WhatsApp Number (no +)","whatsapp","text","91XXXXXXXXXX"],["Facebook Page URL","facebook","url","https://facebook.com/..."],["Zomato Link","zomato","url","https://zomato.com/..."],["City / Area","city","text","Delhi NCR"]].map(([lb,key,type,ph])=>(
          <Field key={key} label={lb} value={settings[key]||""} onChange={v=>setSettings({...settings,[key]:v})} type={type} placeholder={ph}/>
        ))}
        <div style={{marginBottom:12}}>
          <label style={{display:"block",fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase"}}>About Us Text</label>
          <textarea value={settings.about||""} onChange={e=>setSettings({...settings,about:e.target.value})} rows={5}
            style={{width:"100%",padding:"10px 13px",border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:T.text,background:T.card2,outline:"none",resize:"none"}}/>
        </div>
        <button onClick={save} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Save Info ✓</button>
      </div>
    </div>
  );

  // ── APPEARANCE / THEME ───────────────────────────────────────────────────────
  if(section==="theme") return(
    <div style={sectionStyle}>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:T.card,border:`1px solid ${acc}`,borderRadius:12,padding:"10px 20px",fontSize:".8rem",fontWeight:700,color:acc,zIndex:999}}>{toast}</div>}
      <SectionHeader title="Appearance" icon="🎨"/>
      <div style={{padding:"12px 14px"}}>
        {/* Theme toggle */}
        <div style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".78rem",fontWeight:800,color:T.text,marginBottom:12}}>App Theme</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[["dark","⬛ Dark Mode","#070707","#F0F0F0"],["light","⬜ Light Mode","#F5F5F5","#111111"]].map(([val,lb,bg,fg])=>(
              <div key={val} onClick={()=>setSettings({...settings,theme:val})} style={{borderRadius:14,padding:"14px",background:bg,border:`2px solid ${settings.theme===val?acc:"transparent"}`,cursor:"pointer",textAlign:"center",boxShadow:settings.theme===val?`0 0 12px ${acc}55`:"0 2px 8px rgba(0,0,0,.15)"}}>
                <div style={{fontSize:".8rem",fontWeight:700,color:fg,marginBottom:3}}>{lb}</div>
                <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                  {["#F0B429","#FF2D7E","#22C55E"].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Accent colour */}
        <div style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".78rem",fontWeight:800,color:T.text,marginBottom:12}}>Accent Colour</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
            {["#F0B429","#FF2D7E","#22C55E","#3B82F6","#8B5CF6","#F97316","#EF4444","#06B6D4","#EC4899","#14B8A6"].map(col=>(
              <div key={col} onClick={()=>setSettings({...settings,accent:col})} style={{width:36,height:36,borderRadius:"50%",background:col,cursor:"pointer",border:`3px solid ${settings.accent===col?"#fff":"transparent"}`,transform:settings.accent===col?"scale(1.2)":"scale(1)",transition:"all .2s",boxShadow:settings.accent===col?`0 0 14px ${col}99`:"none"}}/>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:".72rem",color:T.muted}}>Custom:</span>
            <input type="color" value={settings.accent} onChange={e=>setSettings({...settings,accent:e.target.value})}
              style={{width:40,height:32,borderRadius:8,border:`1px solid ${T.border}`,cursor:"pointer",background:"none",padding:2}}/>
            <input value={settings.accent} onChange={e=>setSettings({...settings,accent:e.target.value})}
              style={{flex:1,padding:"6px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/>
          </div>
        </div>
        {/* Preview */}
        <div style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".78rem",fontWeight:800,color:T.text,marginBottom:10}}>Preview</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>👩‍🍳</div>
            <div>
              <div style={{fontSize:"1rem",fontWeight:900,color:T.text}}>Mrs <span style={{color:acc}}>Chef</span></div>
              <div style={{fontSize:".62rem",color:T.muted}}>Home Kitchen • Delhi NCR</div>
            </div>
            <button style={{marginLeft:"auto",padding:"7px 14px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,border:"none",borderRadius:50,fontSize:".7rem",fontWeight:800,color:"#000",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Book Now</button>
          </div>
        </div>
        <button onClick={save} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Save Appearance ✓</button>
      </div>
    </div>
  );

  // ── PASSWORD ─────────────────────────────────────────────────────────────────
  if(section==="password") return(
    <div style={sectionStyle}>
      <SectionHeader title="Change Password" icon="🔐"/>
      <div style={{padding:"16px 14px"}}>
        <div style={{background:T.card,borderRadius:18,padding:"18px",border:`1px solid ${T.border}`}}>
          <div style={{marginBottom:12}}>
            <label style={{display:"block",fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase"}}>Current Password</label>
            <input type="password" value={pwForm.cur} onChange={e=>setPwForm({...pwForm,cur:e.target.value})}
              style={{width:"100%",padding:"10px 13px",border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",color:T.text,background:T.card2,outline:"none"}}/>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{display:"block",fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase"}}>New Password</label>
            <input type="password" value={pwForm.n1} onChange={e=>setPwForm({...pwForm,n1:e.target.value})}
              style={{width:"100%",padding:"10px 13px",border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",color:T.text,background:T.card2,outline:"none"}}/>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase"}}>Confirm New Password</label>
            <input type="password" value={pwForm.n2} onChange={e=>setPwForm({...pwForm,n2:e.target.value})}
              style={{width:"100%",padding:"10px 13px",border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",color:T.text,background:T.card2,outline:"none"}}/>
          </div>
          {pwMsg&&<div style={{fontSize:".76rem",color:pwMsg.includes("✅")?FIXED.green:FIXED.red,marginBottom:12,fontWeight:600,textAlign:"center"}}>{pwMsg}</div>}
          <button onClick={()=>{
            if(pwForm.cur!==settings.adminPassword){setPwMsg("❌ Current password incorrect");return;}
            if(pwForm.n1.length<6){setPwMsg("❌ New password min 6 characters");return;}
            if(pwForm.n1!==pwForm.n2){setPwMsg("❌ Passwords don't match");return;}
            setSettings({...settings,adminPassword:pwForm.n1});
            setPwMsg("✅ Password changed!");
            setPwForm({cur:"",n1:"",n2:""});
          }} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Update Password</button>
        </div>
        <div style={{marginTop:12,background:T.card2,borderRadius:12,padding:"11px 13px",border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".68rem",color:T.muted,lineHeight:1.55}}>⚠️ Use a strong password. If you forget it, you'll need to update it directly in the App.jsx source file.</div>
        </div>
      </div>
    </div>
  );

  // ── PAGES ────────────────────────────────────────────────────────────────────
  if(section==="pages") return(
    <div style={sectionStyle}>
      <SectionHeader title="Pages" icon="📄"/>
      <div style={{padding:"12px 14px"}}>
        {[{t:"Home",d:"Hero images, food entry cards, occasions, specialities",s:"Live"},
          {t:"Build Menu",d:"Semi-circle wheel + course selection",s:"Live"},
          {t:"Chef Box",d:"Meal box options",s:"Live"},
          {t:"Snack Fiesta",d:"Snack & platter selection",s:"Live"},
          {t:"Our Work",d:"Food photo showcase grid",s:"Live"},
          {t:"Reviews",d:"Customer testimonials",s:"Live"},
          {t:"About",d:"Company story & values",s:"Live"},
          {t:"Enquiry",d:"WhatsApp quick enquiry form",s:"Live"},
          {t:"Work Media",d:"Upload event photos & videos",s:"Soon"},
        ].map(p=>(
          <div key={p.t} style={{background:T.card,borderRadius:14,padding:"12px 14px",marginBottom:8,border:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:".8rem",fontWeight:700,color:T.text}}>{p.t}</div><div style={{fontSize:".63rem",color:T.muted,marginTop:2}}>{p.d}</div></div>
            <div style={{fontSize:".6rem",padding:"3px 10px",borderRadius:50,fontWeight:700,background:p.s==="Live"?"#15803D22":p.s==="Soon"?"#1E3A5F":"#1E1E1E",color:p.s==="Live"?FIXED.green:p.s==="Soon"?"#60A5FA":T.muted}}>{p.s}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const [settings,setSettings] = useState(DEF_SETTINGS);
  const [food,setFood]         = useState(DEF_FOOD);
  const [combos,setCombos]     = useState(DEF_COMBOS);
  const [offers,setOffers]     = useState(DEF_OFFERS);
  const [orders,setOrders]     = useState(DEF_ORDERS);

  const [screen,setScreen]     = useState("home");
  const [section,setSection]   = useState("home");
  const [heroIdx,setHeroIdx]   = useState(0);
  const [adminOpen,setAdminOpen]   = useState(false);
  const [adminAuth,setAdminAuth]   = useState(false);
  const [adminPw,setAdminPw]       = useState("");
  const [adminPwErr,setAdminPwErr] = useState(false);

  const [entry,setEntry]       = useState(null);
  const [step,setStep]         = useState(0);
  const [occasion,setOccasion] = useState(null);
  const [diet,setDiet]         = useState("both");
  const [date,setDate]         = useState("");
  const [dateErr,setDateErr]   = useState(false);
  const [pax,setPax]           = useState(10);
  const [sel,setSel]           = useState({starters:[],mains:[],breads:[],rice:[],desserts:[]});
  const [form,setForm]         = useState({name:"",phone:"",area:"Kalkaji",notes:""});
  const [sent,setSent]         = useState(false);
  const [enquiry,setEnquiry]   = useState({name:"",phone:"",occasion:"",guests:"",date:"",notes:""});
  const [enquirySent,setEnquirySent] = useState(false);

  const acc = settings.accent;
  const T   = settings.theme==="light" ? LIGHT : DARK;

  useEffect(()=>{const t=setInterval(()=>setHeroIdx(i=>(i+1)%HERO_IMGS.length),3500);return()=>clearInterval(t);},[]);
  useEffect(()=>{if(occasion?.vegOnly) setDiet("veg");},[occasion]);

  const filterFood = items => diet==="veg"?items.filter(i=>i.veg):diet==="nonveg"?items.filter(i=>!i.veg):items;
  const toggleSel  = (cat,item)=>{ const cur=sel[cat],ex=cur.find(i=>i.id===item.id); setSel({...sel,[cat]:ex?cur.filter(i=>i.id!==item.id):[...cur,item]}); };

  const completed={start:!!(occasion&&date&&pax>=1),starters:sel.starters.length>0,mains:sel.mains.length>0,breads:sel.breads.length>0,rice:sel.rice.length>0,desserts:sel.desserts.length>0};
  const allReady=completed.start&&completed.mains;

  const activeFoodItems = cat => (food[cat]||[]).filter(i=>i.active!==false);

  const startBuilder = e => {
    setEntry(e);setSel({starters:[],mains:[],breads:[],rice:[],desserts:[]});
    setStep(0);setOccasion(null);setDate("");setSent(false);setDiet("both");setPax(10);
    setScreen("builder");
  };

  const sendWA = () => {
    const num = settings.whatsapp.replace(/\D/g,"");
    const msg = encodeURIComponent(`Hi Mrs Chef! 🍽️\n\n👤 ${form.name}\n📞 ${form.phone}\n📅 ${date}\n🎉 ${occasion?.label}\n👥 ${pax} guests\n🥗 Diet: ${diet}\n📍 ${form.area}\n\n🍢 Starters: ${sel.starters.map(i=>i.name).join(", ")||"None"}\n🍛 Mains: ${sel.mains.map(i=>i.name).join(", ")||"None"}\n🫓 Breads: ${sel.breads.map(i=>i.name).join(", ")||"None"}\n🍚 Rice: ${sel.rice.map(i=>i.name).join(", ")||"None"}\n🍮 Desserts: ${sel.desserts.map(i=>i.name).join(", ")||"None"}\n\n📝 ${form.notes||"None"}`);
    setOrders(p=>[{id:Date.now(),name:form.name,phone:form.phone,date,occasion:occasion?.label,pax,diet,status:"New"},...p]);
    window.open(`https://wa.me/${num}?text=${msg}`,"_blank");
    setSent(true);
  };

  const sendEnquiry = () => {
    const num = settings.whatsapp.replace(/\D/g,"");
    const msg = encodeURIComponent(`Hi Mrs Chef!\n👤 ${enquiry.name}\n📞 ${enquiry.phone}\n🎉 ${enquiry.occasion}\n👥 ${enquiry.guests} guests\n📅 ${enquiry.date}\n📝 ${enquiry.notes||"None"}`);
    window.open(`https://wa.me/${num}?text=${msg}`,"_blank");
    setEnquirySent(true);
  };

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}body{background:${T.bg}}
    ::-webkit-scrollbar{width:0;height:0}
    @keyframes g1{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}
    @keyframes g2{0%,100%{transform:translateY(0)}50%{transform:translateY(22px)}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    input[type=date]::-webkit-calendar-picker-indicator{filter:${T===LIGHT?"invert(0)":"invert(.5)"};cursor:pointer}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${acc};cursor:pointer}
  `;

  const W={fontFamily:"'Poppins',sans-serif",background:T.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",color:T.text,overflowX:"hidden",position:"relative"};
  const NAV=[{id:"home",l:"Home",e:"🏠"},{id:"work",l:"Our Work",e:"📸"},{id:"reviews",l:"Reviews",e:"⭐"},{id:"about",l:"About",e:"👩‍🍳"},{id:"enquiry",l:"Enquiry",e:"💬"}];

  // ADMIN LOGIN
  if(adminOpen && !adminAuth) return(
    <div style={{...W,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"0 28px",gap:13}}>
      <style>{css}</style>
      <Logo size={72} accent={acc}/>
      <div style={{fontSize:"1.2rem",fontWeight:900,color:T.text}}>Admin <span style={{color:acc}}>Login</span></div>
      <input type="password" value={adminPw} onChange={e=>{setAdminPw(e.target.value);setAdminPwErr(false);}} placeholder="Enter password"
        onKeyDown={e=>{if(e.key==="Enter"){if(adminPw===settings.adminPassword){setAdminAuth(true);}else setAdminPwErr(true);}}}
        style={{width:"100%",padding:"12px 16px",border:`1.5px solid ${adminPwErr?FIXED.red:T.border}`,borderRadius:13,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",color:T.text,background:T.card,outline:"none",textAlign:"center",letterSpacing:".1em"}}/>
      {adminPwErr&&<div style={{fontSize:".72rem",color:FIXED.red,fontWeight:600}}>Wrong password</div>}
      <button onClick={()=>{if(adminPw===settings.adminPassword){setAdminAuth(true);}else setAdminPwErr(true);}} style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",fontWeight:900,cursor:"pointer"}}>Login →</button>
      <button onClick={()=>{setAdminOpen(false);setAdminPw("");setAdminPwErr(false);}} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontFamily:"'Poppins',sans-serif",fontSize:".76rem"}}>← Back to site</button>
    </div>
  );

  // ADMIN PANEL
  if(adminOpen && adminAuth) return(
    <>
      <style>{css}</style>
      <AdminPanel
        onExit={()=>{setAdminOpen(false);setAdminAuth(false);setAdminPw("");}}
        orders={orders} setOrders={setOrders}
        settings={settings} setSettings={setSettings}
        food={food} setFood={setFood}
        combos={combos} setCombos={setCombos}
        offers={offers} setOffers={setOffers}
      />
    </>
  );

  const Header=({back,title})=>(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 16px 10px"}}> 
      {back&&<button onClick={back} style={{background:T.card,border:`1px solid ${T.border}`,color:T.text,width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:".85rem",flexShrink:0}}>←</button>}
      {title
        ?<div style={{flex:1}}><div style={{fontSize:".56rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:1}}>{title.sub}</div><div style={{fontSize:".95rem",fontWeight:900,color:T.text}}>{title.main}</div></div>
        :<div style={{flex:1}}><div style={{fontSize:".56rem",color:T.muted,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",marginBottom:1}}>{settings.tagline}</div><div style={{fontSize:"1.5rem",fontWeight:900,letterSpacing:"-.5px",lineHeight:1,color:T.text}}>Mrs <span style={{color:acc}}>Chef</span></div></div>
      }
      <Logo size={42} accent={acc}/>
    </div>
  );

  const BottomNav=()=>(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:T.card,borderTop:`1px solid ${T.border}`,zIndex:200,paddingBottom:14}}>
      <div style={{display:"flex",overflowX:"auto",padding:"8px 8px 0",gap:1}}>
        {NAV.map(s=>(
          <button key={s.id} onClick={()=>{setSection(s.id);setScreen("home");}}
            style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 9px",borderRadius:10,background:screen==="home"&&section===s.id?`${acc}18`:"transparent",border:screen==="home"&&section===s.id?`1px solid ${acc}44`:"1px solid transparent",cursor:"pointer",transition:"all .2s"}}>
            <span style={{fontSize:".9rem"}}>{s.e}</span>
            <span style={{fontSize:".52rem",fontWeight:screen==="home"&&section===s.id?700:500,color:screen==="home"&&section===s.id?acc:T.muted,whiteSpace:"nowrap"}}>{s.l}</span>
          </button>
        ))}
        <a href={settings.facebook} target="_blank" rel="noreferrer" style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 9px",borderRadius:10,textDecoration:"none",border:"1px solid transparent"}}>
          <div style={{width:20,height:20,borderRadius:"50%",background:"#1877F2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",fontWeight:900,color:"#fff"}}>f</div>
          <span style={{fontSize:".52rem",fontWeight:500,color:T.muted}}>Facebook</span>
        </a>
        <button onClick={()=>setAdminOpen(true)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 9px",borderRadius:10,background:"transparent",border:"1px solid transparent",cursor:"pointer"}}>
          <span style={{fontSize:".9rem"}}>🔩</span>
          <span style={{fontSize:".52rem",fontWeight:500,color:T.muted}}>Settings</span>
        </button>
      </div>
    </div>
  );

  // ── BUILDER ───────────────────────────────────────────────────────────────
  if(screen==="builder"){
    const cur=BUILDER_STEPS[step];
    const curDishes=filterFood(activeFoodItems(cur.key)||[]);
    const curSel=sel[cur.key]||[];
    const goNext=()=>{
      if(cur.key==="start"){if(!date){setDateErr(true);return;}setDateErr(false);}
      if(step<BUILDER_STEPS.length-1) setStep(s=>s+1); else setScreen("confirm");
    };
    return(
      <div style={{...W,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <style>{css}</style>
        <GlowBg color={acc}/>
        <div style={{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"12px 14px 8px",flexShrink:0}}>
            <button onClick={()=>setScreen("home")} style={{background:T.card,border:`1px solid ${T.border}`,color:T.text,width:33,height:33,borderRadius:"50%",cursor:"pointer",fontSize:".82rem",flexShrink:0}}>←</button>
            <div style={{flex:1}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em"}}>Build Your Menu</div><div style={{fontSize:".9rem",fontWeight:900,color:T.text}}>{cur.emoji} {cur.label}</div></div>
            {allReady&&<button onClick={()=>setScreen("confirm")} style={{flexShrink:0,padding:"6px 12px",borderRadius:50,background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",fontSize:".65rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Review →</button>}
            <Logo size={34} accent={acc}/>
          </div>

          {cur.key==="start"&&(
            <div style={{flex:1,overflowY:"auto",padding:"0 14px 8px"}}>
              {occasion?.vegOnly&&<div style={{background:"linear-gradient(135deg,#4C1D95,#7C3AED)",borderRadius:14,padding:"11px 13px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:"1.4rem"}}>🕉️</span>
                <div><div style={{fontSize:".74rem",fontWeight:800,color:"#fff"}}>Satvik Mode Active</div><div style={{fontSize:".6rem",color:"rgba(255,255,255,.65)"}}>Pure vegetarian, no onion/garlic</div></div>
              </div>}
              <div style={{fontSize:".64rem",fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:7}}>Occasion *</div>
              <div style={{display:"flex",gap:7,overflowX:"auto",marginBottom:13,paddingBottom:2}}>
                {OCCASIONS.map(o=>(
                  <div key={o.id} onClick={()=>setOccasion(o)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
                    <div style={{width:50,height:50,borderRadius:14,background:occasion?.id===o.id?`${acc}22`:T.card2,border:`2px solid ${occasion?.id===o.id?acc:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",transition:"all .2s",boxShadow:occasion?.id===o.id?`0 0 12px ${acc}44`:"none"}}>{o.emoji}</div>
                    <div style={{fontSize:".57rem",fontWeight:occasion?.id===o.id?700:500,color:occasion?.id===o.id?acc:T.muted,textAlign:"center",whiteSpace:"nowrap"}}>{o.label}</div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{fontSize:".64rem",fontWeight:700,color:T.muted,textTransform:"uppercase"}}>Event Date <span style={{color:FIXED.red}}>*</span></div>
                  {dateErr&&<div style={{fontSize:".6rem",color:FIXED.red,fontWeight:600}}>⚠️ Required</div>}
                </div>
                <input type="date" value={date} onChange={e=>{setDate(e.target.value);setDateErr(false);}}
                  style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${dateErr?FIXED.red:date?acc+"55":T.border}`,borderRadius:12,fontFamily:"'Poppins',sans-serif",fontSize:".88rem",color:date?T.text:T.muted,background:T.card2,outline:"none",transition:"border-color .2s"}}/>
              </div>
              {/* PAX */}
              <div style={{marginBottom:12}}>
                <div style={{fontSize:".64rem",fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Number of Guests *</div>
                <div style={{background:T.card2,borderRadius:18,padding:"16px 14px",border:`1px solid ${T.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
                  <div style={{position:"relative",width:100,height:100}}>
                    <svg width="100" height="100" style={{position:"absolute",top:0,left:0}}>
                      <circle cx="50" cy="50" r="44" fill="none" stroke={T.card3} strokeWidth="6"/>
                      <circle cx="50" cy="50" r="44" fill="none" stroke={acc} strokeWidth="6" strokeDasharray={`${((pax-1)/(settings.maxGuests-1))*277} 277`} strokeLinecap="round" transform="rotate(-90 50 50)" style={{transition:"stroke-dasharray .3s"}}/>
                    </svg>
                    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                      <div style={{fontSize:"1.9rem",fontWeight:900,color:acc,lineHeight:1}}>{pax}</div>
                      <div style={{fontSize:".55rem",color:T.muted,fontWeight:600}}>guests</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <button onClick={()=>setPax(p=>Math.max(1,p-1))} style={{width:36,height:36,borderRadius:"50%",background:T.card3,border:`1px solid ${T.border}`,color:T.text,fontSize:"1.2rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center"}}>
                      {[5,10,15,20,25,30,settings.maxGuests].filter((v,i,a)=>a.indexOf(v)===i).map(n=>(
                        <button key={n} onClick={()=>setPax(n)} style={{padding:"4px 8px",borderRadius:8,border:`1px solid ${pax===n?acc:T.border}`,background:pax===n?`${acc}22`:"transparent",color:pax===n?acc:T.muted2,fontSize:".62rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",transition:"all .15s"}}>{n}</button>
                      ))}
                    </div>
                    <button onClick={()=>setPax(p=>Math.min(settings.maxGuests,p+1))} style={{width:36,height:36,borderRadius:"50%",background:T.card3,border:`1px solid ${T.border}`,color:T.text,fontSize:"1.2rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                  </div>
                  <input type="range" min="1" max={settings.maxGuests} value={pax} onChange={e=>setPax(Number(e.target.value))} style={{width:"100%",accentColor:acc,height:3,cursor:"pointer"}}/>
                  <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                    <span style={{fontSize:".58rem",color:T.muted}}>1</span>
                    <span style={{fontSize:".58rem",color:T.muted}}>Max {settings.maxGuests}</span>
                  </div>
                </div>
              </div>
              <div style={{fontSize:".64rem",fontWeight:700,color:T.muted,textTransform:"uppercase",marginBottom:7}}>Diet Preference</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {[["veg","🟢","Veg Only","Pure vegetarian"],["nonveg","🔴","Non-Veg","Meat included"],["both","🟡","Mixed","Veg + Non-Veg"],["satvik","🕉️","Satvik","No onion/garlic"]].map(([val,ic,lb,sub])=>(
                  <button key={val} onClick={()=>setDiet(val)} disabled={occasion?.vegOnly&&val!=="veg"&&val!=="satvik"}
                    style={{padding:"10px 8px",borderRadius:12,border:`1.5px solid ${diet===val?acc:T.border}`,background:diet===val?`${acc}18`:"transparent",cursor:occasion?.vegOnly&&val!=="veg"&&val!=="satvik"?"not-allowed":"pointer",opacity:occasion?.vegOnly&&val!=="veg"&&val!=="satvik"?.3:1,textAlign:"left",transition:"all .15s",fontFamily:"'Poppins',sans-serif"}}>
                    <div style={{fontSize:".78rem",fontWeight:700,color:diet===val?acc:T.text,marginBottom:2}}>{ic} {lb}</div>
                    <div style={{fontSize:".58rem",color:T.muted}}>{sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {cur.key!=="start"&&(
            <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
              <div style={{padding:"0 14px 5px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{fontSize:".62rem",color:T.muted}}>{curSel.length>0?`${curSel.length} selected`:"Tap a dish to add"}</div>
                {cur.key!=="mains"&&<button onClick={()=>setStep(s=>Math.min(BUILDER_STEPS.length-1,s+1))} style={{background:"transparent",border:`1px solid ${T.border}`,color:T.muted,padding:"4px 10px",borderRadius:50,fontSize:".6rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Skip →</button>}
              </div>
              {curSel.length>0&&(
                <div style={{padding:"0 14px 5px",flexShrink:0,display:"flex",gap:4,overflowX:"auto"}}>
                  {curSel.map(item=>(
                    <div key={item.id} onClick={()=>toggleSel(cur.key,item)} style={{flexShrink:0,display:"flex",alignItems:"center",gap:3,background:`${acc}18`,border:`1px solid ${acc}44`,borderRadius:50,padding:"2px 8px 2px 3px",cursor:"pointer"}}>
                      <img src={item.img} alt="" style={{width:13,height:13,borderRadius:"50%",objectFit:"cover"}}/>
                      <span style={{fontSize:".57rem",fontWeight:700,color:acc,whiteSpace:"nowrap"}}>{item.name}</span>
                      <span style={{fontSize:".52rem",color:T.muted}}>✕</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{flex:1,display:"flex",gap:10,overflowX:"auto",padding:"0 14px",alignItems:"center"}}>
                {curDishes.length===0?<div style={{textAlign:"center",width:"100%",color:T.muted}}><div style={{fontSize:"2rem",marginBottom:6}}>🥦</div><div style={{fontSize:".75rem"}}>No {diet} options here</div></div>:
                  curDishes.map(item=><DishCard key={item.id} item={item} selected={curSel} onToggle={i=>toggleSel(cur.key,i)} accent={acc}/>)}
              </div>
            </div>
          )}

          <div style={{padding:"6px 14px 5px",flexShrink:0}}>
            <button onClick={goNext} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:900,cursor:"pointer",boxShadow:`0 4px 16px ${acc}33`}}>
              {step<BUILDER_STEPS.length-1?`Next: ${BUILDER_STEPS[step+1].label} →`:"Review My Menu →"}
            </button>
          </div>

          <div style={{flexShrink:0,background:`linear-gradient(180deg,transparent,${T.card} 30%)`,paddingTop:2}}>
            <div style={{textAlign:"center",paddingTop:6}}><div style={{fontSize:".52rem",color:T.muted,fontWeight:500,letterSpacing:".1em",textTransform:"uppercase"}}>← Tap to switch course →</div></div>
            <SemiPieWheel items={BUILDER_STEPS} activeIdx={step} onSelect={setStep} accent={acc} completed={completed}/>
          </div>
        </div>
      </div>
    );
  }

  // ── CONFIRM ───────────────────────────────────────────────────────────────
  if(screen==="confirm") return(
    <div style={{...W,paddingBottom:40}}>
      <style>{css}</style>
      <GlowBg color={acc}/>
      <div style={{position:"relative",zIndex:1}}>
        {sent?(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"0 28px",textAlign:"center"}}>
            <div style={{fontSize:"3.2rem",marginBottom:4,animation:"bounce 1.2s ease infinite"}}>🎉</div>
            <div style={{width:72,height:72,borderRadius:"50%",background:`${acc}18`,border:`2px solid ${acc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",marginBottom:14,boxShadow:`0 0 32px ${acc}55`}}>✅</div>
            <div style={{fontSize:"1.35rem",fontWeight:900,marginBottom:5,color:T.text}}>Order <span style={{color:acc}}>Sent!</span></div>
            <div style={{fontSize:".8rem",color:T.muted2,lineHeight:1.7,marginBottom:16}}>Your custom menu has been sent. We confirm within 2 hours.</div>
            <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#16A34A,#15803D)",color:"#fff",padding:"12px",borderRadius:50,fontSize:".86rem",fontWeight:900,textDecoration:"none",display:"block",width:"100%",textAlign:"center",marginBottom:9}}>💬 Open WhatsApp</a>
            <button onClick={()=>{setSent(false);setSel({starters:[],mains:[],breads:[],rice:[],desserts:[]});setStep(0);setOccasion(null);setDate("");setScreen("home");}} style={{background:"transparent",color:T.muted,border:`1px solid ${T.border}`,padding:"10px",borderRadius:50,fontSize:".78rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif",width:"100%"}}>Plan Another</button>
          </div>
        ):(
          <>
            <Header back={()=>setScreen("builder")} title={{sub:"Final Step",main:"Review & Confirm"}}/>
            <div style={{margin:"0 13px 10px",background:T.card,borderRadius:18,padding:"13px",border:`1px solid ${T.border}`}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,textAlign:"center"}}>
                <div><div style={{fontSize:"1.2rem"}}>{occasion?.emoji||"🎉"}</div><div style={{fontSize:".68rem",fontWeight:700,marginTop:3,color:T.text}}>{occasion?.label||"—"}</div><div style={{fontSize:".56rem",color:T.muted}}>Occasion</div></div>
                <div><div style={{fontSize:".66rem",color:T.muted,marginTop:4}}>📅 {date||"—"}</div><div style={{fontSize:".66rem",color:T.muted,marginTop:4}}>👥 {pax} guests</div><div style={{fontSize:".66rem",color:T.muted,marginTop:4}}>🥗 {diet}</div></div>
                <div><div style={{fontSize:".7rem",fontWeight:700,color:acc,marginTop:4}}>{entry?.label}</div></div>
              </div>
            </div>
            {[["🍢","starters","Starters"],["🍛","mains","Mains"],["🫓","breads","Breads"],["🍚","rice","Rice"],["🍮","desserts","Desserts"]].map(([ic,key,lb])=>(
              <div key={key} style={{margin:"0 13px 8px",background:T.card,borderRadius:14,padding:"10px 12px",border:`1px solid ${T.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:sel[key].length>0?7:0}}>
                  <div style={{fontSize:".68rem",fontWeight:800,color:acc}}>{ic} {lb}</div>
                  <div style={{fontSize:".56rem",color:sel[key].length>0?FIXED.green:T.muted}}>{sel[key].length>0?`${sel[key].length} items`:"Skipped"}</div>
                </div>
                {sel[key].length>0&&<div style={{display:"flex",gap:6,overflowX:"auto"}}>
                  {sel[key].map(item=>(
                    <div key={item.id} style={{flexShrink:0,textAlign:"center",width:50}}>
                      <div style={{width:44,height:44,borderRadius:10,overflow:"hidden",border:`1.5px solid ${acc}44`,marginBottom:2}}><img src={item.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
                      <div style={{fontSize:".5rem",color:T.muted2,lineHeight:1.2,fontWeight:600}}>{item.name}</div>
                    </div>
                  ))}
                </div>}
              </div>
            ))}
            <div style={{margin:"0 13px",background:T.card,borderRadius:17,padding:"14px",border:`1px solid ${T.border}`}}>
              <div style={{fontSize:".8rem",fontWeight:800,marginBottom:11,color:T.text}}>Your Details</div>
              {[["Name *","text","name","Full name"],["Phone *","tel","phone","+91 XXXXX XXXXX"]].map(([lb,tp,k,ph])=>(
                <div key={k} style={{marginBottom:8}}>
                  <label style={{display:"block",fontSize:".59rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>{lb}</label>
                  <input type={tp} placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:T.text,background:T.card2,outline:"none"}}/>
                </div>
              ))}
              <div style={{marginBottom:8}}>
                <label style={{display:"block",fontSize:".59rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Area</label>
                <select value={form.area} onChange={e=>setForm({...form,area:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:T.text,background:T.card2,outline:"none"}}>
                  {AREAS.map(a=><option key={a}>{a}</option>)}
                </select>
              </div>
              <div style={{marginBottom:12}}>
                <label style={{display:"block",fontSize:".59rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Notes</label>
                <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Allergies, setup…" rows={2} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:T.text,background:T.card2,outline:"none",resize:"none"}}/>
              </div>
              <button onClick={()=>{if(form.name&&form.phone)sendWA();}} style={{width:"100%",padding:"12px",background:form.name&&form.phone?`linear-gradient(135deg,${acc},${FIXED.goldd})`:"#1A1A1A",color:form.name&&form.phone?"#000":T.muted,border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer",transition:"all .2s"}}>💬 Confirm via WhatsApp</button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ── HOME ──────────────────────────────────────────────────────────────────
  return(
    <div style={{...W,paddingBottom:90}}>
      <style>{css}</style>
      <GlowBg color={acc}/>
      <div style={{position:"relative",zIndex:1}}>
        <Header/>

        {section==="home"&&<>
          <div style={{position:"relative",height:244,margin:"0 12px",borderRadius:22,overflow:"hidden",boxShadow:`0 18px 50px rgba(0,0,0,.75)`}}>
            {HERO_IMGS.map((url,i)=>(
              <img key={i} src={url} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:i===heroIdx?1:0,transition:"opacity 1s ease",zIndex:i===heroIdx?1:0}}/>
            ))}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(7,7,7,.08) 0%,rgba(7,7,7,.88) 100%)",zIndex:2}}/>
            <div style={{position:"absolute",bottom:64,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5,zIndex:3}}>
              {HERO_IMGS.map((_,i)=><div key={i} style={{width:i===heroIdx?18:5,height:5,borderRadius:50,background:i===heroIdx?acc:"rgba(255,255,255,.3)",transition:"all .4s"}}/>)}
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
              <div style={{fontSize:"1.25rem",fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:12}}>{settings.heroText}</div>
              <button onClick={()=>startBuilder(FOOD_ENTRIES[0])} style={{background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",padding:"11px 20px",borderRadius:50,fontSize:".78rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif",boxShadow:`0 5px 18px ${acc}55`,display:"inline-flex",alignItems:"center",gap:7}}>🍽️ Build Your Menu →</button>
            </div>
          </div>

          {/* SPECIALITIES */}
          <div style={{padding:"15px 16px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div><div style={{fontSize:".56rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Signature Dishes</div><div style={{fontSize:".9rem",fontWeight:900,color:T.text}}>Our <span style={{color:acc}}>Specialities</span></div></div>
              <div style={{fontSize:".62rem",color:T.muted}}>Tap to explore</div>
            </div>
            <div style={{display:"flex",gap:11,overflowX:"auto",paddingBottom:4}}>
              {SPECIALITIES.map((s,i)=>(
                <div key={i} style={{flexShrink:0,width:155,borderRadius:18,overflow:"hidden",background:T.card2,border:`1px solid ${T.border}`,boxShadow:`0 6px 20px rgba(0,0,0,.5)`,cursor:"pointer"}} onClick={()=>startBuilder(FOOD_ENTRIES[0])}>
                  <div style={{position:"relative",height:105}}>
                    <img src={s.img} alt={s.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(0,0,0,.75))"}}/>
                    <div style={{position:"absolute",top:7,left:7,width:8,height:8,borderRadius:2,background:s.veg?FIXED.green:FIXED.red}}/>
                  </div>
                  <div style={{padding:"9px 11px 11px"}}>
                    <div style={{fontSize:".72rem",fontWeight:800,color:T.text,lineHeight:1.25,marginBottom:3}}>{s.name}</div>
                    <div style={{fontSize:".6rem",color:T.muted2,lineHeight:1.4}}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOD ENTRIES */}
          <div style={{padding:"14px 16px 0"}}>
            <div style={{fontSize:".86rem",fontWeight:800,marginBottom:11,color:T.text}}>What are you planning?</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {FOOD_ENTRIES.map(e=>(
                <div key={e.id} onClick={()=>startBuilder(e)} style={{borderRadius:20,overflow:"hidden",position:"relative",height:128,cursor:"pointer",boxShadow:`0 8px 28px rgba(0,0,0,.6)`,border:`1.5px solid rgba(255,255,255,.04)`}}>
                  <img src={e.img} alt={e.label} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(7,7,7,.86) 0%,rgba(7,7,7,.18) 100%)"}}/>
                  <div style={{position:"absolute",top:0,left:0,bottom:0,width:4,background:e.color,borderRadius:"20px 0 0 20px"}}/>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 18px",gap:13}}>
                    <div style={{width:50,height:50,borderRadius:"50%",background:`${e.color}22`,border:`2px solid ${e.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.45rem",flexShrink:0}}>{e.emoji}</div>
                    <div style={{flex:1}}><div style={{fontSize:"1.02rem",fontWeight:900,color:"#fff",marginBottom:3}}>{e.label}</div><div style={{fontSize:".7rem",color:"rgba(255,255,255,.52)"}}>{e.desc}</div></div>
                    <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".88rem",fontWeight:900,color:"#000",flexShrink:0}}>→</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,margin:"13px 12px 0"}}>
            <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#15803D,#16A34A)",borderRadius:15,padding:"12px",textDecoration:"none",display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:"1.25rem"}}>💬</span><div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>WhatsApp</div><div style={{fontSize:".54rem",color:"rgba(255,255,255,.6)"}}>Chat directly</div></div>
            </a>
            <a href={settings.zomato} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#B91C1C,#DC2626)",borderRadius:15,padding:"12px",textDecoration:"none",display:"flex",alignItems:"center",gap:9}}>
              <span style={{fontSize:"1.25rem"}}>🍕</span><div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>Zomato</div><div style={{fontSize:".54rem",color:"rgba(255,255,255,.6)"}}>Daily orders</div></div>
            </a>
          </div>

          <div style={{padding:"14px 16px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
              <div style={{fontSize:".86rem",fontWeight:800,color:T.text}}>Occasions</div>
              <div style={{fontSize:".6rem",color:T.muted}}>Tap to start</div>
            </div>
            <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:3}}>
              {OCCASIONS.map(o=>(
                <div key={o.id} onClick={()=>{setOccasion(o);startBuilder(FOOD_ENTRIES[0]);}} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer"}}>
                  <div style={{width:52,height:52,borderRadius:17,background:T.card2,border:`1.5px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.45rem"}}>{o.emoji}</div>
                  <div style={{fontSize:".58rem",fontWeight:500,color:T.muted2,textAlign:"center",whiteSpace:"nowrap"}}>{o.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"13px 16px 0"}}>
            <div style={{fontSize:".72rem",fontWeight:600,color:T.muted,marginBottom:6}}>📍 Serving Delhi NCR</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {AREAS.map(a=><div key={a} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:50,padding:"3px 9px",fontSize:".58rem",fontWeight:500,color:T.muted2}}>{a}</div>)}
            </div>
          </div>
        </>}

        {section==="work"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Real Events · Real Food</div><div style={{fontSize:"1.2rem",fontWeight:900,color:T.text}}>Our <span style={{color:acc}}>Work</span></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,padding:"0 12px"}}>
            {OUR_WORK.map((url,i)=>(
              <div key={i} style={{borderRadius:16,overflow:"hidden",aspectRatio:i===0?"2/1.1":"1",gridColumn:i===0?"span 2":"span 1",boxShadow:`0 5px 16px rgba(0,0,0,.6)`}}>
                <img src={url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              </div>
            ))}
          </div>
          <div style={{margin:"11px 12px 0",background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontSize:".58rem",color:"rgba(0,0,0,.45)"}}>Follow for more</div><div style={{fontSize:".78rem",fontWeight:900,color:"#000"}}>Mrs Chef on Facebook</div></div>
            <a href={settings.facebook} target="_blank" rel="noreferrer" style={{background:"#000",color:acc,padding:"7px 12px",borderRadius:50,fontSize:".66rem",fontWeight:800,textDecoration:"none"}}>Follow →</a>
          </div>
        </>}

        {section==="reviews"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Delhi NCR Loves Us</div><div style={{fontSize:"1.2rem",fontWeight:900,color:T.text}}>What <span style={{color:acc}}>They Say</span></div></div>
          <div style={{display:"flex",flexDirection:"column",gap:8,padding:"0 12px"}}>
            {REVIEWS.map((r,i)=>(
              <div key={i} style={{background:T.card,borderRadius:16,padding:"12px 13px",border:`1px solid ${T.border}`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${r.col},transparent)`}}/>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${r.col},${r.col}88)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:".86rem",flexShrink:0}}>{r.av}</div>
                  <div><div style={{fontSize:".78rem",fontWeight:700,color:T.text}}>{r.name}</div><div style={{fontSize:".58rem",color:FIXED.gold}}>{"★".repeat(r.stars)}<span style={{color:T.muted,fontWeight:400,marginLeft:4}}>📍 {r.loc}</span></div></div>
                </div>
                <div style={{fontSize:".74rem",color:T.muted2,lineHeight:1.62,fontStyle:"italic"}}>"{r.text}"</div>
              </div>
            ))}
          </div>
          <div style={{margin:"11px 12px 0",background:"linear-gradient(135deg,#1877F2,#1565C0)",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontSize:".58rem",color:"rgba(255,255,255,.55)"}}>More reviews</div><div style={{fontSize:".78rem",fontWeight:900,color:"#fff"}}>Our Facebook Page</div></div>
            <a href={settings.facebook} target="_blank" rel="noreferrer" style={{background:"#fff",color:"#1877F2",padding:"6px 12px",borderRadius:50,fontSize:".66rem",fontWeight:800,textDecoration:"none"}}>View →</a>
          </div>
        </>}

        {section==="about"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Our Story</div><div style={{fontSize:"1.2rem",fontWeight:900,color:T.text}}>About <span style={{color:acc}}>Us</span></div></div>
          <div style={{margin:"0 12px 12px",borderRadius:20,overflow:"hidden",height:190,position:"relative"}}>
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90" alt="Kitchen" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(7,7,7,.08) 0%,rgba(7,7,7,.65) 100%)"}}/>
            <div style={{position:"absolute",bottom:13,left:13,display:"flex",alignItems:"center",gap:9}}>
              <Logo size={40} accent={acc}/>
              <div><div style={{fontSize:".92rem",fontWeight:900,color:"#fff"}}>Mrs Chef</div><div style={{fontSize:".6rem",color:"rgba(255,255,255,.55)"}}>Delhi NCR</div></div>
            </div>
          </div>
          <div style={{margin:"0 12px 11px",background:T.card,borderRadius:16,padding:"14px",border:`1px solid ${T.border}`}}>
            <div style={{fontSize:".8rem",color:T.muted2,lineHeight:1.75}}>{settings.about}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,margin:"0 12px 11px"}}>
            {[["500+","Events"],["4.9★","Rating"],["5yrs","Exp."]].map(([v,l])=>(
              <div key={l} style={{background:T.card,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1px solid ${T.border}`}}>
                <div style={{fontSize:"1.05rem",fontWeight:900,color:acc}}>{v}</div><div style={{fontSize:".57rem",color:T.muted,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,margin:"0 12px"}}>
            {[["🥗","Fresh Daily","Local sourced"],["🏠","Home Style","Family recipes"],["📦","Hygienic","Packed safely"],["⭐","Consistent","Every event"]].map(([ic,h,d])=>(
              <div key={h} style={{background:T.card,borderRadius:12,padding:"11px",border:`1px solid ${T.border}`}}>
                <div style={{fontSize:"1.15rem",marginBottom:5}}>{ic}</div>
                <div style={{fontSize:".72rem",fontWeight:700,marginBottom:2,color:T.text}}>{h}</div>
                <div style={{fontSize:".58rem",color:T.muted,lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
        </>}

        {section==="enquiry"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Let's Talk</div><div style={{fontSize:"1.2rem",fontWeight:900,color:T.text}}>Make an <span style={{color:acc}}>Enquiry</span></div></div>
          {enquirySent?(
            <div style={{textAlign:"center",padding:"44px 24px"}}>
              <div style={{fontSize:"2.8rem",marginBottom:10,animation:"bounce 1.2s ease infinite"}}>🎉</div>
              <div style={{fontSize:"1.1rem",fontWeight:900,marginBottom:5,color:T.text}}>Enquiry <span style={{color:acc}}>Sent!</span></div>
              <div style={{fontSize:".78rem",color:T.muted2,lineHeight:1.7,marginBottom:18}}>We'll reach out within 2 hours on WhatsApp.</div>
              <button onClick={()=>setEnquirySent(false)} style={{background:`linear-gradient(135deg,${acc},${FIXED.goldd})`,color:"#000",border:"none",padding:"9px 20px",borderRadius:50,fontSize:".78rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>New Enquiry</button>
            </div>
          ):(
            <div style={{padding:"0 12px"}}>
              <div style={{background:T.card,borderRadius:18,padding:"14px",border:`1px solid ${T.border}`,marginBottom:10}}>
                <div style={{fontSize:".78rem",fontWeight:800,marginBottom:11,color:T.text}}>Quick Enquiry</div>
                {[["Name *","text","name","Your name"],["Phone *","tel","phone","+91 XXXXX XXXXX"]].map(([lb,tp,k,ph])=>(
                  <div key={k} style={{marginBottom:8}}>
                    <label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>{lb}</label>
                    <input type={tp} placeholder={ph} value={enquiry[k]} onChange={e=>setEnquiry({...enquiry,[k]:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/>
                  </div>
                ))}
                <div style={{marginBottom:8}}>
                  <label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Occasion</label>
                  <select value={enquiry.occasion} onChange={e=>setEnquiry({...enquiry,occasion:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}>
                    <option value="">Select</option>
                    {OCCASIONS.map(o=><option key={o.id} value={o.label}>{o.emoji} {o.label}</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                  <div><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Guests</label><input type="number" min="1" max={settings.maxGuests} placeholder={`Max ${settings.maxGuests}`} value={enquiry.guests} onChange={e=>setEnquiry({...enquiry,guests:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/></div>
                  <div><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Date</label><input type="date" value={enquiry.date} onChange={e=>setEnquiry({...enquiry,date:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/></div>
                </div>
                <div style={{marginBottom:12}}><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Message</label><textarea value={enquiry.notes} onChange={e=>setEnquiry({...enquiry,notes:e.target.value})} placeholder="Tell us about your event…" rows={3} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none",resize:"none"}}/></div>
                <button onClick={()=>{if(enquiry.name&&enquiry.phone)sendEnquiry();}} style={{width:"100%",padding:"12px",background:enquiry.name&&enquiry.phone?`linear-gradient(135deg,${acc},${FIXED.goldd})`:"#1A1A1A",color:enquiry.name&&enquiry.phone?"#000":T.muted,border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:900,cursor:"pointer",transition:"all .2s"}}>💬 Send via WhatsApp</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#15803D,#16A34A)",borderRadius:14,padding:"12px",textDecoration:"none",textAlign:"center",display:"block"}}><div style={{fontSize:"1.2rem",marginBottom:2}}>💬</div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>WhatsApp</div></a>
                <a href={settings.facebook} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#1877F2,#1565C0)",borderRadius:14,padding:"12px",textDecoration:"none",textAlign:"center",display:"block"}}><div style={{fontSize:"1.2rem",marginBottom:2}}>👥</div><div style={{fontSize:".68rem",fontWeight:800,color:"#fff"}}>Facebook</div></a>
              </div>
            </div>
          )}
        </>}

        <BottomNav/>
      </div>
    </div>
  );
}
