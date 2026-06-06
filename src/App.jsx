import { useState, useEffect, useRef } from "react";

// ── THEMES ────────────────────────────────────────────────────────────────────
const DARK  = {bg:"#070707",card:"#101010",card2:"#171717",card3:"#222",border:"#1E1E1E",text:"#F0F0F0",muted:"#555",muted2:"#888"};
const LIGHT = {bg:"#F4F4F4",card:"#FFFFFF",card2:"#EBEBEB",card3:"#E0E0E0",border:"#DEDEDE",text:"#111",muted:"#999",muted2:"#666"};
const G     = {gold:"#F0B429",goldd:"#C8940A",green:"#22C55E",red:"#EF4444",pink:"#FF2D7E",blue:"#3B82F6",purple:"#8B5CF6"};

const ALL_OCCASIONS = ["birthday","bachelor","prewedding","corporate","pooja","satvik","kitty","farewell"];

// ── DEFAULT DATA ──────────────────────────────────────────────────────────────
const DEF_REVIEWS = [
  {id:"r1",name:"Priya S.", loc:"Kalkaji",  stars:5,text:"Best home food at any event. The biryani was absolutely divine!",av:"P",col:"#FF6B6B"},
  {id:"r2",name:"Rahul M.", loc:"Saket",    stars:5,text:"Chef Box for 50 people — always hot, hygienic and delicious.",   av:"R",col:"#4FC3F7"},
  {id:"r3",name:"Ananya K.",loc:"Gurgaon",  stars:5,text:"Every single guest was raving about the food. Outstanding!",     av:"A",col:"#C9A84C"},
  {id:"r4",name:"Vikram N.",loc:"Faridabad",stars:5,text:"Snack Fiesta was the highlight of our birthday party!",          av:"V",col:"#CE93D8"},
  {id:"r5",name:"Sunita G.",loc:"Noida",    stars:5,text:"Satvik box for pooja — so pure and delicious. Loved it!",        av:"S",col:"#22C55E"},
  {id:"r6",name:"Deepak R.",loc:"Gr. Noida",stars:5,text:"Tiffin service — tastes like maa ke haath ka khana every day!",  av:"D",col:"#FFB74D"},
];

const DEF_AREAS = ["Kalkaji","Saket","CR Park","Lajpat Nagar","Gurgaon","Faridabad","Noida","Greater Noida","Dwarka","Vasant Kunj"];

const DEF_SETTINGS = {
  businessName:"Mrs Chef", tagline:"Home Kitchen • Delhi NCR",
  heroText:"Crafted for Your Special Moments",
  phone:"+91 8700 642925", whatsapp:"918700642925",
  facebook:"https://www.facebook.com/share/1aFfHn8N7D/",
  zomato:"https://link.zomato.com/xqzv/rshare?id=13826583030563af3",
  gstin:"07AAAAA0000A1Z5", gstPercent:5,
  about:"Mrs Chef started as a labour of love — home-cooked food made with the finest ingredients and decades of kitchen wisdom.",
  accent:"#F0B429", theme:"dark", adminPassword:"mrschef2025", maxGuests:40,
  founderImg:"", heroImg:"", logoImg:"", eventsCount:"100+", founderName:"Chef Sunita",
  founderNote:"Founder & Head Chef · 15+ years experience · Delhi NCR",
};

// occasions:[] means visible to ALL. Add specific ids to restrict.
const DEF_FOOD = {
  starters:[
    {id:"s1", name:"Paneer Tikka",        veg:true, img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=85", active:true, occasions:[]},
    {id:"s2", name:"Chicken Tikka",       veg:false,img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","kitty","farewell","prewedding"]},
    {id:"s3", name:"Samosa Chaat",        veg:true, img:"https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&q=85", active:true, occasions:[]},
    {id:"s4", name:"Veg Seekh Kebab",     veg:true, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=85", active:true, occasions:[]},
    {id:"s5", name:"Fish Amritsari",      veg:false,img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","kitty","farewell"]},
    {id:"s6", name:"Dahi Ke Sholey",      veg:true, img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=85", active:true, occasions:[]},
    {id:"s7", name:"Kuttu Puri",          veg:true, img:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=85", active:true, occasions:["pooja","satvik"]},
    {id:"s8", name:"Aloo Tikki Chaat",    veg:true, img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=85", active:true, occasions:[]},
    {id:"s9", name:"Chicken Malai Tikka", veg:false,img:"https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","kitty","farewell","prewedding"]},
    {id:"s10",name:"Hara Bhara Kebab",    veg:true, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=85", active:true, occasions:[]},
    {id:"s11",name:"Bhel Puri",           veg:true, img:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=85", active:true, occasions:["birthday","kitty","farewell"]},
    {id:"s12",name:"Mutton Seekh Kebab",  veg:false,img:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","farewell"]},
  ],
  mains:[
    {id:"m1", name:"Dal Makhani",              veg:true, img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=85", active:true, occasions:[]},
    {id:"m2", name:"Paneer Butter Masala",     veg:true, img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=85", active:true, occasions:[]},
    {id:"m3", name:"Lucknowi Biryani",         veg:false,img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=85", active:true, occasions:["birthday","bachelor","prewedding","corporate","kitty","farewell"]},
    {id:"m4", name:"Chicken Curry",            veg:false,img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","kitty","farewell"]},
    {id:"m5", name:"Rajma Masala",             veg:true, img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=85", active:true, occasions:[]},
    {id:"m6", name:"Mutton Rogan Josh",        veg:false,img:"https://images.unsplash.com/photo-1545247181-516773cae754?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","farewell"]},
    {id:"m7", name:"Saag Aloo",               veg:true, img:"https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=500&q=85", active:true, occasions:["pooja","satvik"]},
    {id:"m8", name:"Lauki Kofta",             veg:true, img:"https://images.unsplash.com/photo-1512058534688-8e2eb6ecdcc4?w=500&q=85", active:true, occasions:["pooja","satvik"]},
    {id:"m9", name:"Kadai Paneer",            veg:true, img:"https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=500&q=85", active:true, occasions:[]},
    {id:"m10",name:"Butter Chicken",          veg:false,img:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&q=85", active:true, occasions:["birthday","bachelor","prewedding","corporate","kitty","farewell"]},
    {id:"m11",name:"Veg Biryani",             veg:true, img:"https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500&q=85", active:true, occasions:[]},
    {id:"m12",name:"Chole Masala",            veg:true, img:"https://images.unsplash.com/photo-1601050690117-ef4e6e2bef5d?w=500&q=85", active:true, occasions:[]},
    {id:"m13",name:"Matar Paneer",            veg:true, img:"https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=500&q=85", active:true, occasions:["pooja","satvik","birthday","kitty"]},
    {id:"m14",name:"Chicken Korma",           veg:false,img:"https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=500&q=85", active:true, occasions:["birthday","prewedding","corporate","farewell"]},
    {id:"m15",name:"Aloo Gobi",               veg:true, img:"https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&q=85", active:true, occasions:["pooja","satvik"]},
    {id:"m16",name:"Fish Curry",              veg:false,img:"https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","farewell"]},
  ],
  breads:[
    {id:"b1", name:"Butter Naan",         veg:true,img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=85", active:true, occasions:[]},
    {id:"b2", name:"Laccha Paratha",      veg:true,img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=85", active:true, occasions:[]},
    {id:"b3", name:"Garlic Naan",         veg:true,img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=85", active:true, occasions:["birthday","bachelor","corporate","kitty","prewedding","farewell"]},
    {id:"b4", name:"Tandoori Roti",       veg:true,img:"https://images.unsplash.com/photo-1601050690117-ef4e6e2bef5d?w=500&q=85", active:true, occasions:[]},
    {id:"b5", name:"Puri",                veg:true,img:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=85", active:true, occasions:["pooja","satvik"]},
    {id:"b6", name:"Missi Roti",          veg:true,img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=85", active:true, occasions:["pooja","satvik","corporate"]},
    {id:"b7", name:"Stuffed Paratha",     veg:true,img:"https://images.unsplash.com/photo-1512058533999-6fa6c4d96b50?w=500&q=85", active:true, occasions:["birthday","kitty","farewell"]},
    {id:"b8", name:"Roomali Roti",        veg:true,img:"https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=85", active:true, occasions:["birthday","bachelor","prewedding","corporate"]},
  ],
  rice:[
    {id:"r1", name:"Steamed Basmati",     veg:true,img:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&q=85", active:true, occasions:[]},
    {id:"r2", name:"Veg Pulao",           veg:true,img:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=85", active:true, occasions:[]},
    {id:"r3", name:"Jeera Rice",          veg:true,img:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=85", active:true, occasions:[]},
    {id:"r4", name:"Matar Pulao",         veg:true,img:"https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500&q=85", active:true, occasions:[]},
    {id:"r5", name:"Saffron Rice",        veg:true,img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=85", active:true, occasions:["birthday","prewedding","corporate","farewell"]},
    {id:"r6", name:"Veg Fried Rice",      veg:true,img:"https://images.unsplash.com/photo-1512058533999-6fa6c4d96b50?w=500&q=85", active:true, occasions:["birthday","kitty","bachelor"]},
  ],
  desserts:[
    {id:"d1", name:"Gulab Jamun",         veg:true,img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=85", active:true, occasions:[]},
    {id:"d2", name:"Rasmalai",            veg:true,img:"https://images.unsplash.com/photo-1571167530149-c1105da4c2fd?w=500&q=85", active:true, occasions:[]},
    {id:"d3", name:"Gajar Ka Halwa",      veg:true,img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=85", active:true, occasions:[]},
    {id:"d4", name:"Kheer",               veg:true,img:"https://images.unsplash.com/photo-1610474222888-8e4af2e4bc13?w=500&q=85", active:true, occasions:[]},
    {id:"d5", name:"Halwa Prasad",        veg:true,img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=85", active:true, occasions:["pooja","satvik"]},
    {id:"d6", name:"Mango Kulfi",         veg:true,img:"https://images.unsplash.com/photo-1488900128323-21503983a07e?w=500&q=85", active:true, occasions:["birthday","kitty","bachelor","farewell"]},
    {id:"d7", name:"Ras Malai Cake",      veg:true,img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=85", active:true, occasions:["birthday","prewedding","farewell"]},
    {id:"d8", name:"Shahi Tukda",         veg:true,img:"https://images.unsplash.com/photo-1571167530149-c1105da4c2fd?w=500&q=85", active:true, occasions:["birthday","prewedding","corporate"]},
  ],
};

const DEF_COMBOS = [
  {id:"c1",label:"Classic",starters:2,mains:2,breads:1,rice:1,desserts:1,price:249,active:true},
  {id:"c2",label:"Feast",  starters:3,mains:3,breads:2,rice:1,desserts:2,price:349,active:true},
  {id:"c3",label:"Grand",  starters:4,mains:4,breads:2,rice:2,desserts:3,price:449,active:true},
  {id:"c4",label:"Royal",  starters:5,mains:5,breads:3,rice:2,desserts:4,price:599,active:true},
];

const DEF_OFFERS = [
  {id:"o1",label:"Early Bird",desc:"Book 30+ days in advance",discount:10,active:true},
  {id:"o2",label:"Loyalty",   desc:"3rd event with us",       discount:15,active:true},
];

const HERO_IMGS = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=90",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=90",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=90",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&q=90",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900&q=90",
];

const FOOD_ENTRIES = [
  {id:"menu", label:"Build Menu",   emoji:"🍽️",img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=90",desc:"Custom multi-course menu",color:"#F0B429"},
  {id:"box",  label:"Chef Box",     emoji:"📦",img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=700&q=90",desc:"Individual meal boxes",   color:"#22C55E"},
  {id:"snack",label:"Snack Fiesta", emoji:"🎉",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&q=90",desc:"Platters & high tea",     color:"#FF6B6B"},
];

const OCCASIONS = [
  {id:"birthday",  label:"Birthday",        emoji:"🎂"},
  {id:"bachelor",  label:"Bachelor's Party",emoji:"🥳"},
  {id:"prewedding",label:"Pre-Wedding",     emoji:"💐"},
  {id:"corporate", label:"Corporate",       emoji:"🏢"},
  {id:"pooja",     label:"Pooja",           emoji:"🪔",vegOnly:true},
  {id:"satvik",    label:"Satvik",          emoji:"🕉️",vegOnly:true},
  {id:"kitty",     label:"Kitty Party",     emoji:"🥂"},
  {id:"farewell",  label:"Farewell",        emoji:"🌟"},
];

// Reviews now managed via state (DEF_REVIEWS above)

const OUR_WORK=[
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=85",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=85",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=85",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=85",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=85",
];

const SPECIALITIES=[
  {name:"Lucknowi Dum Biryani",   desc:"Slow-cooked saffron dum biryani with whole spices",          img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=85",veg:false},
  {name:"Dal Makhani",            desc:"Overnight slow-simmered black lentils in butter & cream",     img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=85",veg:true},
  {name:"Paneer Butter Masala",   desc:"Silky tomato-butter gravy with soft paneer",                 img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=85",veg:true},
  {name:"Mutton Rogan Josh",      desc:"Kashmir-style slow-cooked mutton in fragrant spices",         img:"https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=85",veg:false},
  {name:"Gajar Ka Halwa",         desc:"Home-style carrot halwa in pure desi ghee",                  img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=85",veg:true},
  {name:"Chicken Tikka Masala",   desc:"Tandoori chicken in smoky vibrant tomato masala",             img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=85",veg:false},
];

// Areas now managed via state (DEF_AREAS above)
const BUILDER_STEPS=[
  {key:"start",      label:"Let's Start",  emoji:"🌟"},
  {key:"starters",   label:"Starters",     emoji:"🍢"},
  {key:"mains",      label:"Mains",        emoji:"🍛"},
  {key:"breads",     label:"Breads",       emoji:"🫓"},
  {key:"rice",       label:"Rice",         emoji:"🍚"},
  {key:"desserts",   label:"Desserts",     emoji:"🍮"},
  {key:"condiments", label:"Condiments",   emoji:"🫙"},
];

const DEF_CONDIMENTS = [
  {id:"c1",name:"Green Chutney",   veg:true, img:"https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=400&q=80",active:true,occasions:[]},
  {id:"c2",name:"Tamarind Chutney",veg:true, img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80",active:true,occasions:[]},
  {id:"c3",name:"Raita",           veg:true, img:"https://images.unsplash.com/photo-1571167530149-c1105da4c2fd?w=400&q=80",active:true,occasions:[]},
  {id:"c4",name:"Papad",           veg:true, img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80",active:true,occasions:[]},
  {id:"c5",name:"Pickle",          veg:true, img:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80",active:true,occasions:[]},
  {id:"c6",name:"Salad",           veg:true, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",active:true,occasions:[]},
  {id:"c7",name:"Onion Rings",     veg:true, img:"https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&q=80",active:true,occasions:[]},
  {id:"c8",name:"Lemon Wedges",    veg:true, img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",active:true,occasions:[]},
];

// ── WHEEL ─────────────────────────────────────────────────────────────────────
function SemiPieWheel({items,activeIdx,onSelect,accent,completed}){
  const W=340,H=185,cx=W/2,cy=H+8,outerR=158,innerR=54,n=items.length,stp=Math.PI/n;
  const polar=(a,r)=>({x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)});
  const segPath=(i,pop)=>{
    const a1=Math.PI+i*stp+0.03,a2=Math.PI+(i+1)*stp-0.03,ouR=pop?outerR+14:outerR;
    const p1=polar(a1,ouR),p2=polar(a2,ouR),p3=polar(a2,innerR),p4=polar(a1,innerR);
    return`M${p1.x} ${p1.y} A${ouR} ${ouR} 0 0 1 ${p2.x} ${p2.y} L${p3.x} ${p3.y} A${innerR} ${innerR} 0 0 0 ${p4.x} ${p4.y}Z`;
  };
  const mid=(i,pop)=>{const a=Math.PI+(i+0.5)*stp,r=((pop?outerR+14:outerR)+innerR)/2+(pop?3:0);return polar(a,r);};
  const ticks=Array.from({length:33},(_,i)=>Math.PI+(i/32)*Math.PI);
  return(
    <div style={{display:"flex",justifyContent:"center",overflow:"visible"}}>
      <svg width={W} height={H+12} viewBox={`0 ${H-H} ${W} ${H+12}`} style={{overflow:"visible",touchAction:"none"}}>
        <defs>
          <radialGradient id="hub-g" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fff"/><stop offset="55%" stopColor="#ccc"/><stop offset="100%" stopColor="#888"/></radialGradient>
          <radialGradient id="ring-g" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={accent}/><stop offset="100%" stopColor={G.goldd}/></radialGradient>
          {items.map((_,i)=><radialGradient key={i} id={`sg${i}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={accent}/><stop offset="100%" stopColor={G.goldd}/></radialGradient>)}
        </defs>
        <circle cx={cx} cy={cy} r={outerR+32} fill="none" stroke={`${accent}12`} strokeWidth="24"/>
        {ticks.map((ta,i)=>{const p1=polar(ta,outerR+13),p2=polar(ta,outerR+(i%4===0?23:17));return<line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={i%4===0?"rgba(255,255,255,.32)":"rgba(255,255,255,.1)"} strokeWidth={i%4===0?1.8:1} strokeLinecap="round"/>;})}
        <path d={`M${polar(Math.PI,outerR+13).x} ${polar(Math.PI,outerR+13).y} A${outerR+13} ${outerR+13} 0 0 1 ${polar(0,outerR+13).x} ${polar(0,outerR+13).y}`} fill="none" stroke={`${accent}55`} strokeWidth="1.5"/>
        {items.map((_,i)=>{if(!i)return null;const a=Math.PI+i*stp,p1=polar(a,innerR+1),p2=polar(a,outerR-1);return<line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#000" strokeWidth="1.5" opacity=".5"/>;  })}
        {items.map((item,i)=>{
          const isA=i===activeIdx,isDone=completed?.[item.key],m=mid(i,isA);
          return(<g key={item.key} onClick={()=>onSelect(i)} style={{cursor:"pointer"}}>
            <path d={segPath(i,isA)} fill={isA?`url(#sg${i})`:isDone?"#182814":"#161616"} stroke={isA?accent:isDone?"#2A3818":"#232323"} strokeWidth={isA?2:1} style={{filter:isA?`drop-shadow(0 -5px 14px ${accent}99)`:"none",transition:"all .22s"}}/>
            <text x={m.x} y={m.y-10} textAnchor="middle" dominantBaseline="middle" fontSize={isA?"20":"14"} style={{userSelect:"none",pointerEvents:"none"}}>{item.emoji}</text>
            <text x={m.x} y={m.y+11} textAnchor="middle" dominantBaseline="middle" fontSize="7" fontWeight={isA?"800":"500"} fill={isA?"#000":isDone?G.green:"#777"} fontFamily="'Poppins',sans-serif" style={{userSelect:"none",pointerEvents:"none"}}>{item.label}</text>
            {isDone&&!isA&&<><circle cx={m.x+12} cy={m.y-16} r="7" fill={G.green}/><text x={m.x+12} y={m.y-16} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="900" style={{pointerEvents:"none"}}>✓</text></>}
          </g>);
        })}
        <circle cx={cx} cy={cy} r={innerR+7} fill="url(#ring-g)" style={{filter:`drop-shadow(0 0 14px ${accent}88)`}}/>
        <circle cx={cx} cy={cy} r={innerR} fill="url(#hub-g)" style={{filter:"drop-shadow(0 3px 8px rgba(0,0,0,.6))"}}/>
        <text x={cx} y={cy-9} textAnchor="middle" fontSize="9" fontWeight="800" fill={G.goldd} fontFamily="'Poppins',sans-serif" style={{userSelect:"none",pointerEvents:"none"}}>{items[activeIdx]?.label}</text>
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
      <div style={{position:"absolute",top:6,left:6,width:9,height:9,borderRadius:2,background:item.veg?G.green:G.red}}/>
      {on&&<div style={{position:"absolute",top:6,right:6,width:18,height:18,borderRadius:"50%",background:accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".55rem",fontWeight:900,color:"#000"}}>✓</div>}
      <div style={{padding:"8px 10px 10px"}}><div style={{fontSize:".71rem",fontWeight:700,color:"#F0F0F0",lineHeight:1.25}}>{item.name}</div></div>
    </div>
  );
}

function Logo({size=44,accent,src="/logo.jpg"}){
  const [err,setErr]=useState(false);
  return(
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",border:`2px solid ${accent}55`,boxShadow:`0 0 16px ${accent}33`,flexShrink:0}}>
      {!err?<img src={src} alt="Mrs Chef" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={()=>setErr(true)}/>
        :<div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#FF2D7E,#9B1B4B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.36+"rem"}}>👩‍🍳</div>}
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

// ── KOT PRINT VIEW ────────────────────────────────────────────────────────────
function KOTView({order,settings,onClose}){
  const now=new Date();
  const kotNo="KOT-"+order.id.toString().slice(-4);
  const all={starters:order.sel?.starters||[],mains:order.sel?.mains||[],breads:order.sel?.breads||[],rice:order.sel?.rice||[],desserts:order.sel?.desserts||[]};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:360,padding:"20px",fontFamily:"'Courier New',monospace",color:"#000",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        {/* KOT Header */}
        <div style={{textAlign:"center",borderBottom:"2px dashed #000",paddingBottom:10,marginBottom:10}}>
          <div style={{fontSize:"1.1rem",fontWeight:900,letterSpacing:2}}>KITCHEN ORDER TICKET</div>
          <div style={{fontSize:".75rem",fontWeight:700,marginTop:3}}>{settings.businessName}</div>
          <div style={{fontSize:".68rem",marginTop:2}}>{kotNo}</div>
          <div style={{fontSize:".65rem",color:"#555",marginTop:2}}>{now.toLocaleString()}</div>
        </div>
        {/* Order info */}
        <div style={{fontSize:".72rem",marginBottom:8,lineHeight:1.7}}>
          <div>Customer: <strong>{order.name}</strong></div>
          <div>Event: <strong>{order.occasion}</strong> · Date: <strong>{order.date}</strong></div>
          <div>Guests: <strong>{order.pax}</strong> · Diet: <strong>{order.diet}</strong></div>
        </div>
        <div style={{borderTop:"1px dashed #000",paddingTop:8,marginBottom:8}}/>
        {/* Items by course */}
        {[["🍢 STARTERS","starters"],["🍛 MAINS","mains"],["🫓 BREADS","breads"],["🍚 RICE","rice"],["🍮 DESSERTS","desserts"]].map(([lb,key])=>all[key].length>0&&(
          <div key={key} style={{marginBottom:8}}>
            <div style={{fontSize:".72rem",fontWeight:900,textDecoration:"underline",marginBottom:4}}>{lb}</div>
            {all[key].map((item,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:".72rem",marginBottom:2}}>
                <span>{item.veg?"[V]":"[NV]"} {item.name}</span>
                <span>×{order.pax}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{borderTop:"2px dashed #000",paddingTop:8,marginTop:8}}>
          <div style={{fontSize:".68rem",textAlign:"center",color:"#555"}}>— Please prepare all items for {order.pax} guests —</div>
          <div style={{fontSize:".65rem",textAlign:"center",color:"#888",marginTop:4}}>Printed: {now.toLocaleTimeString()}</div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <button onClick={()=>window.print()} style={{flex:1,padding:"10px",background:"#000",color:"#fff",border:"none",borderRadius:8,fontSize:".78rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>🖨️ Print KOT</button>
          <button onClick={onClose} style={{padding:"10px 16px",background:"#f0f0f0",color:"#333",border:"none",borderRadius:8,fontSize:".78rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── BILL / INVOICE VIEW ───────────────────────────────────────────────────────
function BillView({order,settings,combos,onClose}){
  const now=new Date();
  const billNo="INV-"+order.id.toString().slice(-6);
  const all=[...(order.sel?.starters||[]),(order.sel?.mains||[]),(order.sel?.breads||[]),(order.sel?.rice||[]),(order.sel?.desserts||[])].flat();
  const tier=combos.find(c=>c.active)|| combos[0];
  const ppRate=order.pricePerPerson||tier?.price||299;
  const subtotal=ppRate*(order.pax||1);
  const gstRate=settings.gstPercent||5;
  const gstAmt=Math.round(subtotal*gstRate/100);
  const total=subtotal+gstAmt;
  const discount=order.discountAmt||0;
  const finalTotal=total-discount;

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:380,padding:"20px",fontFamily:"'Poppins',sans-serif",color:"#000",maxHeight:"92vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        {/* Bill Header */}
        <div style={{textAlign:"center",marginBottom:14}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#FF2D7E,#9B1B4B)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",margin:"0 auto 8px"}}>👩‍🍳</div>
          <div style={{fontSize:"1.2rem",fontWeight:900,color:"#111"}}>{settings.businessName}</div>
          <div style={{fontSize:".68rem",color:"#666",marginTop:2}}>{settings.tagline}</div>
          <div style={{fontSize:".64rem",color:"#999",marginTop:1}}>📞 {settings.phone}</div>
          {settings.gstin&&<div style={{fontSize:".62rem",color:"#999"}}>GSTIN: {settings.gstin}</div>}
        </div>
        <div style={{border:"1.5px dashed #ddd",margin:"10px 0"}}/>
        {/* Bill details */}
        <div style={{background:"#f9f9f9",borderRadius:10,padding:"10px 12px",marginBottom:10,fontSize:".72rem",lineHeight:1.8}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#888"}}>Invoice No.</span><strong>{billNo}</strong></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#888"}}>Date</span><strong>{now.toLocaleDateString()}</strong></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#888"}}>Customer</span><strong>{order.name}</strong></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#888"}}>Phone</span><strong>{order.phone}</strong></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#888"}}>Event</span><strong>{order.occasion} · {order.date}</strong></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#888"}}>Area</span><strong>{order.area||"—"}</strong></div>
        </div>
        {/* Items */}
        <div style={{marginBottom:10}}>
          <div style={{fontSize:".7rem",fontWeight:700,color:"#333",marginBottom:6,borderBottom:"1px solid #eee",paddingBottom:4}}>Order Summary</div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:".68rem",color:"#888",marginBottom:4}}>
            <span>Package Rate</span><span>₹{ppRate}/person × {order.pax} guests</span>
          </div>
          {all.length>0&&(
            <div style={{fontSize:".66rem",color:"#555",lineHeight:1.7,marginBottom:6}}>
              {[["Starters","starters"],["Mains","mains"],["Breads","breads"],["Rice","rice"],["Desserts","desserts"]].map(([lb,key])=>
                (order.sel?.[key]||[]).length>0&&<div key={key}><strong>{lb}:</strong> {(order.sel?.[key]||[]).map(i=>i.name).join(", ")}</div>
              )}
            </div>
          )}
        </div>
        <div style={{border:"1px dashed #ddd",margin:"8px 0"}}/>
        {/* Pricing */}
        <div style={{fontSize:".74rem",lineHeight:2}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#666"}}>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#666"}}>GST ({gstRate}%)</span><span>₹{gstAmt.toLocaleString()}</span></div>
          {discount>0&&<div style={{display:"flex",justifyContent:"space-between",color:G.green}}><span>Discount</span><span>−₹{discount.toLocaleString()}</span></div>}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:8,padding:"10px 12px",background:G.gold+"18",borderRadius:10,border:`1.5px solid ${G.gold}44`}}>
          <span style={{fontSize:".88rem",fontWeight:900}}>Total</span>
          <span style={{fontSize:"1.1rem",fontWeight:900,color:G.goldd}}>₹{finalTotal.toLocaleString()}</span>
        </div>
        {/* GST breakdown */}
        <div style={{fontSize:".6rem",color:"#aaa",marginTop:8,textAlign:"center"}}>
          CGST ({gstRate/2}%) + SGST ({gstRate/2}%) | HSN: 996334
        </div>
        <div style={{border:"1px dashed #ddd",margin:"10px 0"}}/>
        <div style={{fontSize:".64rem",color:"#aaa",textAlign:"center",lineHeight:1.6}}>
          Thank you for choosing {settings.businessName}!<br/>Food that feels like home 🍽️
        </div>
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <button onClick={()=>window.print()} style={{flex:1,padding:"10px",background:"#111",color:"#fff",border:"none",borderRadius:8,fontSize:".78rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>🖨️ Print Bill</button>
          <button onClick={onClose} style={{padding:"10px 14px",background:"#f0f0f0",color:"#333",border:"none",borderRadius:8,fontSize:".78rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── ORDER FORM (manual offline entry) ────────────────────────────────────────
function ManualOrderForm({onSave,onClose,T,acc,food,combos}){
  const [f,setF]=useState({name:"",phone:"",date:"",occasion:"birthday",pax:10,diet:"both",area:"Kalkaji",notes:"",pricePerPerson:249,discountAmt:0});
  const [sel,setSel]=useState({starters:[],mains:[],breads:[],rice:[],desserts:[]});
  const [selStep,setSelStep]=useState("starters");
  const cats=["starters","mains","breads","rice","desserts"];
  const toggle=(cat,item)=>{const cur=sel[cat],ex=cur.find(i=>i.id===item.id);setSel({...sel,[cat]:ex?cur.filter(i=>i.id!==item.id):[...cur,item]});};
  const save=()=>{
    if(!f.name||!f.phone){alert("Name and phone required");return;}
    onSave({id:Date.now(),...f,sel,status:"New",source:"Manual",time:new Date().toLocaleTimeString()});
  };
  const inputS={width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:T.text,background:T.card2,outline:"none"};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:550,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:T.bg,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:430,maxHeight:"92vh",overflowY:"auto",padding:"18px 16px 30px"}} onClick={e=>e.stopPropagation()}>
        <div style={{height:4,width:40,background:T.card3,borderRadius:50,margin:"0 auto 14px"}}/>
        <div style={{fontSize:".95rem",fontWeight:900,color:T.text,marginBottom:14}}>📋 New Manual Order</div>

        {/* Customer details */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:9}}>
          {[["Customer Name","text","name"],["Phone","tel","phone"],["Event Date","date","date"],["Area","text","area"]].map(([lb,tp,k])=>(
            <div key={k} style={{gridColumn:k==="name"||k==="phone"?"span 1":"span 1"}}>
              <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>{lb}</div>
              <input type={tp} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} style={inputS}/>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:9}}>
          <div>
            <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Occasion</div>
            <select value={f.occasion} onChange={e=>setF({...f,occasion:e.target.value})} style={inputS}>
              {OCCASIONS.map(o=><option key={o.id} value={o.id}>{o.emoji} {o.label}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Guests</div>
            <input type="number" value={f.pax} onChange={e=>setF({...f,pax:Number(e.target.value)})} style={inputS}/>
          </div>
          <div>
            <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Diet</div>
            <select value={f.diet} onChange={e=>setF({...f,diet:e.target.value})} style={inputS}>
              {[["both","Mixed"],["veg","Veg"],["nonveg","Non-Veg"],["satvik","Satvik"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Course selection */}
        <div style={{fontSize:".72rem",fontWeight:700,color:acc,marginBottom:8}}>Select Dishes</div>
        <div style={{display:"flex",gap:5,marginBottom:10,overflowX:"auto"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setSelStep(c)} style={{flexShrink:0,padding:"5px 11px",borderRadius:50,border:`1px solid ${selStep===c?acc:T.border}`,background:selStep===c?`${acc}22`:"transparent",color:selStep===c?acc:T.muted,fontSize:".66rem",fontWeight:600,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>
              {c} {sel[c].length>0&&`(${sel[c].length})`}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:10}}>
          {(food[selStep]||[]).filter(i=>i.active!==false).map(item=>{
            const on=!!sel[selStep].find(i=>i.id===item.id);
            return(
              <div key={item.id} onClick={()=>toggle(selStep,item)} style={{flexShrink:0,width:100,borderRadius:12,overflow:"hidden",cursor:"pointer",border:`2px solid ${on?acc:"transparent"}`,background:T.card2,transition:"all .18s"}}>
                <img src={item.img} alt={item.name} style={{width:"100%",height:66,objectFit:"cover",display:"block"}} onError={e=>e.target.style.display="none"}/>
                <div style={{padding:"5px 6px 7px"}}>
                  <div style={{fontSize:".6rem",fontWeight:700,color:T.text,lineHeight:1.2}}>{item.name}</div>
                  <div style={{width:6,height:6,borderRadius:1,background:item.veg?G.green:G.red,marginTop:2}}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:9}}>
          <div>
            <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>₹ Rate /person</div>
            <input type="number" value={f.pricePerPerson} onChange={e=>setF({...f,pricePerPerson:Number(e.target.value)})} style={inputS}/>
          </div>
          <div>
            <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Discount ₹</div>
            <input type="number" value={f.discountAmt} onChange={e=>setF({...f,discountAmt:Number(e.target.value)})} style={inputS}/>
          </div>
        </div>
        {/* Notes */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Notes</div>
          <textarea value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} rows={2} placeholder="Special requirements…" style={{...inputS,resize:"none"}}/>
        </div>
        {/* Total preview */}
        <div style={{background:`${acc}18`,borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",border:`1px solid ${acc}33`}}>
          <span style={{fontSize:".76rem",color:T.muted}}>Est. Total (excl. GST)</span>
          <span style={{fontSize:".95rem",fontWeight:900,color:acc}}>₹{((f.pricePerPerson*f.pax)-f.discountAmt).toLocaleString()}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
          <button onClick={save} style={{padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontSize:".84rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Save Order ✓</button>
          <button onClick={onClose} style={{padding:"12px",background:T.card2,color:T.muted2,border:`1px solid ${T.border}`,borderRadius:50,fontSize:".84rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
// ── IMAGE UPLOADER — converts photo to base64 data URL (works offline, no server needed)
function ImageUploader({label, currentImg, onUpload, T, acc, G, size="medium"}){
  const [preview,    setPreview]    = useState(currentImg||"");
  const [urlInput,   setUrlInput]   = useState("");
  const [tab,        setTab]        = useState("upload");
  const [uploading,  setUploading]  = useState(false);
  const [msg,        setMsg]        = useState("");
  const fileRef = useRef(null);

  const h = size==="large"?180:size==="logo"?100:130;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    setUploading(true);
    setMsg("Loading photo...");
    try {
      // Step 1: Read as base64 and show preview immediately
      const dataUrl = await new Promise((res,rej)=>{
        const reader = new FileReader();
        reader.onload  = ()=>res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });
      // Show preview right away — works even without internet
      setPreview(dataUrl);
      onUpload(dataUrl);
      setMsg("✅ Photo loaded and saved!");

      // Step 2: Try imgbb for a permanent hosted URL
      // Get a FREE key at imgbb.com/api — takes 1 minute
      // Replace the key below with your own
      const IMGBB_KEY = "your_imgbb_key_here";
      if(IMGBB_KEY !== "your_imgbb_key_here"){
        try {
          setMsg("Uploading to cloud...");
          const b64 = dataUrl.split(",")[1];
          const fd  = new FormData();
          fd.append("image", b64);
          const res  = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,{method:"POST",body:fd});
          const data = await res.json();
          if(data?.success && data?.data?.display_url){
            const url = data.data.display_url;
            setPreview(url);
            onUpload(url);
            setMsg("✅ Uploaded to cloud — permanent URL saved!");
          }
        } catch(e){
          setMsg("✅ Photo saved locally (cloud upload skipped)");
        }
      }
    } catch(e){
      setMsg("❌ Could not load photo — try again");
    }
    setUploading(false);
    // Reset file input so same file can be re-selected
    if(fileRef.current) fileRef.current.value = "";
  };

  const handleUrl = () => {
    if(!urlInput.trim()){ setMsg("⚠️ Paste a URL first"); return; }
    setPreview(urlInput.trim());
    onUpload(urlInput.trim());
    setUrlInput("");
    setMsg("✅ URL saved!");
  };

  return(
    <div style={{marginBottom:16}}>
      <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:6,
        textTransform:"uppercase",letterSpacing:".05em"}}>{label}</div>

      {/* Preview */}
      {preview&&(
        <div style={{height:h,borderRadius:12,overflow:"hidden",marginBottom:10,
          border:`1.5px solid ${acc}44`,position:"relative",background:T.card2}}>
          <img src={preview} alt="preview" style={{width:"100%",height:"100%",
            objectFit:size==="logo"?"contain":"cover"}}
            onError={()=>{setPreview("");onUpload("");}}/>
          <button onClick={()=>{setPreview("");onUpload("");setMsg("");}}
            style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,.65)",
              border:"none",color:"#fff",width:26,height:26,borderRadius:"50%",
              cursor:"pointer",fontSize:".72rem",display:"flex",alignItems:"center",
              justifyContent:"center"}}>✕</button>
        </div>
      )}

      {/* Tab switcher */}
      <div style={{display:"flex",gap:5,marginBottom:9}}>
        {[["upload","📷 Upload Photo"],["url","🔗 Paste URL"]].map(([t,lb])=>(
          <button key={t} onClick={()=>{setTab(t);setMsg("");}}
            style={{flex:1,padding:"8px",border:`1px solid ${tab===t?acc:T.border}`,
              borderRadius:9,background:tab===t?`${acc}18`:"transparent",
              color:tab===t?acc:T.muted,fontSize:".7rem",fontWeight:tab===t?700:500,
              cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>{lb}</button>
        ))}
      </div>

      {/* Upload tab — NO capture attribute so user can choose camera OR gallery */}
      {tab==="upload"&&(
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFile}
            style={{display:"none"}}
          />
          <button
            onClick={()=>fileRef.current?.click()}
            disabled={uploading}
            style={{width:"100%",padding:"13px",
              background:uploading?T.card3:T.card2,
              color:uploading?T.muted:T.text,
              border:`2px dashed ${uploading?acc:T.border}`,
              borderRadius:11,cursor:uploading?"wait":"pointer",
              fontFamily:"'Poppins',sans-serif",fontSize:".82rem",fontWeight:600,
              transition:"all .2s"}}>
            {uploading?"⏳ Loading photo...":"📷 Choose Photo from Camera or Gallery"}
          </button>
          {msg&&<div style={{fontSize:".66rem",marginTop:7,textAlign:"center",fontWeight:600,
            color:msg.includes("✅")?G.green:msg.includes("❌")?G.red:T.muted}}>{msg}</div>}
          <div style={{fontSize:".6rem",color:T.muted,marginTop:5,textAlign:"center",lineHeight:1.5}}>
            Tap to open gallery or take a photo
          </div>
        </div>
      )}

      {/* URL tab */}
      {tab==="url"&&(
        <div>
          <div style={{display:"flex",gap:7}}>
            <input
              value={urlInput}
              onChange={e=>setUrlInput(e.target.value)}
              placeholder="https://i.ibb.co/... or any image URL"
              style={{flex:1,padding:"10px 11px",border:`1px solid ${T.border}`,
                borderRadius:9,fontFamily:"'Poppins',sans-serif",fontSize:".78rem",
                color:T.text,background:T.card2,outline:"none"}}
            />
            <button onClick={handleUrl}
              style={{padding:"10px 14px",background:`linear-gradient(135deg,${acc},${G.goldd})`,
                color:"#000",border:"none",borderRadius:9,fontSize:".76rem",fontWeight:800,
                cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Use</button>
          </div>
          {msg&&<div style={{fontSize:".66rem",marginTop:6,fontWeight:600,
            color:msg.includes("✅")?G.green:msg.includes("⚠️")?G.red:T.muted}}>{msg}</div>}
          <div style={{fontSize:".6rem",color:T.muted,marginTop:5,lineHeight:1.5}}>
            Upload photo to imgbb.com first → copy Direct Link → paste above
          </div>
        </div>
      )}
    </div>
  );
}


function BusinessForm({settings, setSettings, T, acc, G, show, onBack}){
  // Individual state per field — changing one field does NOT re-render others
  // This is the only reliable way to prevent cursor loss on mobile
  const [businessName, setBusinessName] = useState(settings.businessName||"");
  const [tagline,      setTagline]      = useState(settings.tagline||"");
  const [heroText,     setHeroText]     = useState(settings.heroText||"");
  const [phone,        setPhone]        = useState(settings.phone||"");
  const [whatsapp,     setWhatsapp]     = useState(settings.whatsapp||"");
  const [facebook,     setFacebook]     = useState(settings.facebook||"");
  const [zomato,       setZomato]       = useState(settings.zomato||"");
  const [city,         setCity]         = useState(settings.city||"");
  const [gstin,        setGstin]        = useState(settings.gstin||"");
  const [gstPercent,   setGstPercent]   = useState(String(settings.gstPercent||"5"));
  const [founderName,  setFounderName]  = useState(settings.founderName||"");
  const [founderNote,  setFounderNote]  = useState(settings.founderNote||"");
  const [eventsCount,  setEventsCount]  = useState(settings.eventsCount||"100+");
  const [about,        setAbout]        = useState(settings.about||"");
  const [logoImg,      setLogoImg]      = useState(settings.logoImg||"");
  const [heroImg,      setHeroImg]      = useState(settings.heroImg||"");
  const [founderImg,   setFounderImg]   = useState(settings.founderImg||"");
  const [saved,        setSaved]        = useState(false);

  const IS = {
    width:"100%", padding:"11px 13px",
    border:`1px solid ${T.border}`, borderRadius:11,
    fontFamily:"'Poppins',sans-serif", fontSize:".86rem",
    color:T.text, background:T.card2, outline:"none",
  };

  const saveAll = () => {
    setSettings(s=>({
      ...s,
      businessName, tagline, heroText, phone, whatsapp,
      facebook, zomato, city, gstin,
      gstPercent: Number(gstPercent)||5,
      founderName, founderNote, eventsCount, about,
      logoImg, heroImg, founderImg,
    }));
    setSaved(true);
    setTimeout(()=>setSaved(false), 2500);
    show("✅ Business info saved!");
  };

  // Each field is its own isolated input component with its own setter
  // React memo prevents other fields re-rendering when one changes
  const F = ({label, value, onChange, type="text", rows}) => (
    <div style={{marginBottom:13}}>
      <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:5,
        textTransform:"uppercase",letterSpacing:".05em"}}>{label}</div>
      {rows
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows}
            style={{...IS,resize:"none",lineHeight:1.65}}/>
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} style={IS}/>
      }
    </div>
  );

  return(
    <div style={{fontFamily:"'Poppins',sans-serif",background:T.bg,minHeight:"100vh",
      maxWidth:430,margin:"0 auto",color:T.text,overflowX:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 16px",
        borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,background:T.bg,zIndex:10}}>
        <button onClick={onBack} style={{background:T.card2,border:`1px solid ${T.border}`,
          color:T.text,width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:".9rem"}}>←</button>
        <div style={{fontSize:"1rem",fontWeight:900,color:T.text}}>🏢 Business Info</div>
        {saved&&<div style={{marginLeft:"auto",fontSize:".72rem",color:G.green,fontWeight:700}}>✅ Saved!</div>}
      </div>
      <div style={{padding:"14px"}}>
        <F label="Business Name"           value={businessName} onChange={setBusinessName}/>
        <F label="Tagline"                 value={tagline}      onChange={setTagline}/>
        <F label="Hero Text"               value={heroText}     onChange={setHeroText}/>
        <F label="Phone Number"            value={phone}        onChange={setPhone} type="tel"/>
        <F label="WhatsApp (digits only, no +)" value={whatsapp} onChange={setWhatsapp} type="tel"/>
        <F label="Facebook URL"            value={facebook}     onChange={setFacebook} type="url"/>
        <F label="Zomato Link"             value={zomato}       onChange={setZomato} type="url"/>
        <F label="City / Area"             value={city}         onChange={setCity}/>
        <F label="GSTIN"                   value={gstin}        onChange={setGstin}/>
        <F label="GST %"                   value={gstPercent}   onChange={setGstPercent} type="number"/>
        <F label="Founder / Chef Name"     value={founderName}  onChange={setFounderName}/>
        <F label="Founder Title & Note"    value={founderNote}  onChange={setFounderNote}/>
        <F label="Events Count (e.g. 100+)" value={eventsCount} onChange={setEventsCount}/>
        <F label="About Us Text"           value={about}        onChange={setAbout} rows={6}/>
        <ImageUploader label="App Logo"             currentImg={logoImg}   onUpload={setLogoImg}   T={T} acc={acc} G={G} size="logo"/>
        <ImageUploader label="Home Screen Hero Photo" currentImg={heroImg} onUpload={setHeroImg}   T={T} acc={acc} G={G} size="large"/>
        <ImageUploader label="Founder / Chef Photo" currentImg={founderImg} onUpload={setFounderImg} T={T} acc={acc} G={G} size="medium"/>
        <button onClick={saveAll}
          style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${acc},${G.goldd})`,
            color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",
            fontSize:".88rem",fontWeight:900,cursor:"pointer",marginTop:4}}>
          Save All Info ✓
        </button>
        <div style={{textAlign:"center",fontSize:".63rem",color:T.muted,marginTop:8,marginBottom:24}}>
          Tap Save after making all changes
        </div>
      </div>
    </div>
  );
}


function AdminPanel({onExit,orders,setOrders,settings,setSettings,food,setFood,combos,setCombos,offers,setOffers,reviews,setReviews,areas,setAreas}){
  const [sec,setSec]         = useState(null);
  const [editItem,setEditItem]= useState(null);
  const [addingTo,setAddingTo]= useState(null);
  const [newItem,setNewItem]  = useState({name:"",veg:true,img:"",active:true,occasions:[]});
  const [pwForm,setPwForm]    = useState({cur:"",n1:"",n2:""});
  const [pwMsg,setPwMsg]      = useState("");
  const [toast,setToast]      = useState("");
  const [kotOrder,setKotOrder]= useState(null);
  const [billOrder,setBillOrder]=useState(null);
  const [showManual,setShowManual]=useState(false);

  const acc=settings.accent;
  const T=settings.theme==="light"?LIGHT:DARK;
  const show=m=>{setToast(m);setTimeout(()=>setToast(""),2500);};

  const updItem=(cat,id,ch)=>setFood({...food,[cat]:food[cat].map(i=>i.id===id?{...i,...ch}:i)});
  const delItem=(cat,id)=>{setFood({...food,[cat]:food[cat].filter(i=>i.id!==id)});setEditItem(null);show("🗑️ Removed");};
  const addItem=(cat)=>{
    if(!newItem.name){show("⚠️ Name required");return;}
    setFood({...food,[cat]:[...food[cat],{...newItem,id:cat[0]+Date.now()}]});
    setNewItem({name:"",veg:true,img:"",active:true,occasions:[]});setAddingTo(null);show("✅ Added!");
  };



  const S={fontFamily:"'Poppins',sans-serif",background:T.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",color:T.text,overflowX:"hidden"};
  const Toast=()=>toast?<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:T.card,border:`1px solid ${acc}`,borderRadius:12,padding:"10px 20px",fontSize:".8rem",fontWeight:700,color:acc,zIndex:999,whiteSpace:"nowrap"}}>{toast}</div>:null;

  // DASHBOARD
  if(!sec) return(
    <div style={S}>
      <Toast/>
      {kotOrder&&<KOTView order={kotOrder} settings={settings} onClose={()=>setKotOrder(null)}/>}
      {billOrder&&<BillView order={billOrder} settings={settings} combos={combos} onClose={()=>setBillOrder(null)}/>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo size={38} accent={acc}/>
          <div><div style={{fontSize:".58rem",color:T.muted,textTransform:"uppercase"}}>Admin Panel</div><div style={{fontSize:"1rem",fontWeight:900,color:acc}}>Mrs Chef</div></div>
        </div>
        <button onClick={onExit} style={{background:T.card2,border:`1px solid ${T.border}`,color:T.muted2,padding:"6px 14px",borderRadius:50,fontSize:".7rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Exit ✕</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,padding:"12px 14px",borderBottom:`1px solid ${T.border}`}}>
        {[[orders.length,"📦","Total"],[orders.filter(o=>o.status==="New").length,"🆕","Pending"],[orders.filter(o=>o.status==="Confirmed").length,"✅","Done"]].map(([n,ic,lb])=>(
          <div key={lb} style={{background:T.card2,borderRadius:12,padding:"10px",textAlign:"center",border:`1px solid ${T.border}`}}>
            <div style={{fontSize:".9rem"}}>{ic}</div>
            <div style={{fontSize:"1.3rem",fontWeight:900,color:acc,lineHeight:1.1}}>{n}</div>
            <div style={{fontSize:".58rem",color:T.muted,marginTop:2}}>{lb}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"14px"}}>
        {[
          {k:"orders",    ic:"📦",lb:"Order Management",col:G.blue,  badge:orders.filter(o=>o.status==="New").length},
          {k:"menu",      ic:"🍽️",lb:"Menu Items",      col:acc,     badge:0},
          {k:"combos",    ic:"💰",lb:"Pricing",         col:G.green, badge:0},
          {k:"offers",    ic:"🎁",lb:"Offers",          col:G.purple,badge:0},
          {k:"business",  ic:"🏢",lb:"Business Info",   col:"#F97316",badge:0},
          {k:"appearance",ic:"🎨",lb:"Appearance",      col:"#EC4899",badge:0},
          {k:"password",  ic:"🔐",lb:"Password",        col:G.red,   badge:0},
          {k:"reviews",   ic:"⭐",lb:"Reviews",         col:"#FFB74D",badge:0},
          {k:"areas",     ic:"📍",lb:"Serving Areas",   col:"#22C55E",badge:0},
          {k:"pages",     ic:"📄",lb:"Pages",           col:"#06B6D4",badge:0},
        ].map(t=>(
          <div key={t.k} onClick={()=>setSec(t.k)} style={{background:T.card,borderRadius:18,padding:"16px 14px",border:`1px solid ${T.border}`,cursor:"pointer",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${t.col},${t.col}66)`}}/>
            {t.badge>0&&<div style={{position:"absolute",top:10,right:10,background:G.red,color:"#fff",fontSize:".58rem",fontWeight:800,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{t.badge}</div>}
            <div style={{fontSize:"1.6rem",marginBottom:8}}>{t.ic}</div>
            <div style={{fontSize:".8rem",fontWeight:800,color:T.text}}>{t.lb}</div>
            <div style={{fontSize:".58rem",color:T.muted,marginTop:2}}>Tap to manage →</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── ORDER MANAGEMENT ────────────────────────────────────────────────────────
  if(sec==="orders") return(
    <div style={S}>
      <Toast/>
      {kotOrder&&<KOTView order={kotOrder} settings={settings} onClose={()=>setKotOrder(null)}/>}
      {billOrder&&<BillView order={billOrder} settings={settings} combos={combos} onClose={()=>setBillOrder(null)}/>}
      {showManual&&<ManualOrderForm T={T} acc={acc} food={food} combos={combos} onClose={()=>setShowManual(false)} onSave={o=>{setOrders(p=>[o,...p]);setShowManual(false);show("✅ Order saved!");}}/>}
      <AdminSHdr T={T} onBack={()=>setSec(null)} title="Order Management" icon="📦"/>
      {/* Tabs row */}
      <div style={{padding:"10px 14px",display:"flex",gap:7,alignItems:"center",borderBottom:`1px solid ${T.border}`}}>
        <button onClick={()=>setShowManual(true)} style={{padding:"8px 16px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontSize:".76rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif",display:"flex",alignItems:"center",gap:5}}>
          <span>+</span> New Manual Order
        </button>
        <div style={{flex:1,fontSize:".66rem",color:T.muted}}>Site + offline orders</div>
      </div>
      <div style={{padding:"10px 14px"}}>
        {orders.length===0?<div style={{textAlign:"center",padding:"48px 0",color:T.muted}}><div style={{fontSize:"3rem",marginBottom:10}}>📭</div><div>No orders yet</div><div style={{fontSize:".72rem",marginTop:4}}>Tap "+ New Manual Order" to add</div></div>:
        orders.map(o=>(
          <div key={o.id} style={{background:T.card,borderRadius:18,padding:"13px 14px",marginBottom:12,border:`1px solid ${T.border}`}}>
            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:7}}>
              <div>
                <div style={{fontSize:".86rem",fontWeight:800,color:T.text}}>{o.name}</div>
                <div style={{fontSize:".62rem",color:T.muted,marginTop:1}}>📞 {o.phone} · 📍 {o.area||"—"}</div>
              </div>
              <div style={{display:"flex",gap:4,flexDirection:"column",alignItems:"flex-end"}}>
                <span style={{fontSize:".58rem",background:o.status==="New"?`${acc}22`:o.status==="Confirmed"?"#15803D22":"#3B82F622",color:o.status==="New"?acc:o.status==="Confirmed"?G.green:G.blue,padding:"2px 9px",borderRadius:50,fontWeight:700}}>{o.status}</span>
                {o.source==="Manual"&&<span style={{fontSize:".55rem",color:T.muted,background:T.card2,padding:"1px 6px",borderRadius:50}}>Offline</span>}
              </div>
            </div>
            {/* Details */}
            <div style={{background:T.card2,borderRadius:10,padding:"8px 10px",marginBottom:8,fontSize:".66rem",color:T.muted2,lineHeight:1.7}}>
              <div>🎉 {o.occasion} · 📅 {o.date} · 👥 {o.pax} guests · 🥗 {o.diet}</div>
              {o.sel&&<div>🍽️ {[...(o.sel.starters||[]),(o.sel.mains||[]),(o.sel.breads||[]),(o.sel.rice||[]),(o.sel.desserts||[])].flat().map(i=>i.name).join(", ")||"No items"}</div>}
              {(o.pricePerPerson||0)>0&&<div style={{color:acc,fontWeight:700}}>₹{o.pricePerPerson}/pp × {o.pax} = ₹{(o.pricePerPerson*o.pax).toLocaleString()}</div>}
            </div>
            {/* Actions */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5}}>
              <button onClick={()=>setOrders(orders.map(x=>x.id===o.id?{...x,status:"Confirmed"}:x))} style={{padding:"7px 4px",background:"#15803D18",color:G.green,border:`1px solid #15803D44`,borderRadius:8,fontSize:".6rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",textAlign:"center"}}>✅ Confirm</button>
              <button onClick={()=>setKotOrder(o)} style={{padding:"7px 4px",background:`${G.blue}18`,color:G.blue,border:`1px solid ${G.blue}44`,borderRadius:8,fontSize:".6rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",textAlign:"center"}}>🗒️ KOT</button>
              <button onClick={()=>setBillOrder(o)} style={{padding:"7px 4px",background:`${acc}18`,color:acc,border:`1px solid ${acc}44`,borderRadius:8,fontSize:".6rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",textAlign:"center"}}>🧾 Bill</button>
              <button onClick={()=>setOrders(orders.filter(x=>x.id!==o.id))} style={{padding:"7px 4px",background:`${G.red}18`,color:G.red,border:`1px solid ${G.red}33`,borderRadius:8,fontSize:".6rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif",textAlign:"center"}}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── MENU ITEMS (with occasion filter) ──────────────────────────────────────
  if(sec==="menu"){
    const cats=[["starters","Starters","🍢"],["mains","Mains","🍛"],["breads","Breads","🫓"],["rice","Rice","🍚"],["desserts","Desserts","🍮"]];
    const OccasionPicker=({selected=[],onChange})=>(
      <div style={{marginBottom:0}}>
        <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:6,textTransform:"uppercase"}}>Visible for Occasions</div>
        <div style={{fontSize:".62rem",color:T.muted2,marginBottom:7,lineHeight:1.45}}>Empty = visible for <strong>all</strong> occasions. Select specific ones to restrict.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {OCCASIONS.map(o=>{
            const checked=selected.includes(o.id);
            return(              <div key={o.id} onClick={()=>{const n=checked?selected.filter(x=>x!==o.id):[...selected,o.id];onChange(n);}}
                style={{padding:"5px 10px",borderRadius:50,border:`1.5px solid ${checked?acc:T.border}`,background:checked?`${acc}22`:"transparent",cursor:"pointer",fontSize:".66rem",fontWeight:checked?700:500,color:checked?acc:T.muted,transition:"all .15s"}}>
                {o.emoji} {o.label}
              </div>
            );
          })}
        </div>
        {selected.length>0&&<div style={{fontSize:".6rem",color:acc,marginTop:6,fontWeight:600}}>✓ Restricted to {selected.length} occasion{selected.length>1?"s":""}</div>}
        {selected.length===0&&<div style={{fontSize:".6rem",color:T.muted2,marginTop:6}}>✓ Visible for all occasions</div>}
      </div>
    );
    return(
      <div style={S}>
        <Toast/><AdminSHdr T={T} onBack={()=>setSec(null)} title="Menu Items" icon="🍽️"/>

        {/* Edit sheet */}
        {editItem&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:500,display:"flex",alignItems:"flex-end"}} onClick={()=>setEditItem(null)}>
            <div style={{background:T.card,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:430,padding:"18px 18px 30px",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{height:4,width:40,background:T.card3,borderRadius:50,margin:"0 auto 14px"}}/>
              <div style={{fontSize:".9rem",fontWeight:900,color:T.text,marginBottom:12}}>Edit: {editItem.item.name}</div>
              {/* Image preview */}
              <div style={{height:120,borderRadius:14,overflow:"hidden",marginBottom:12,background:T.card2,border:`1px solid ${T.border}`,position:"relative"}}>
                {editItem.item.img
                  ?<img src={editItem.item.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                  :<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:T.muted,fontSize:".74rem"}}>No image · paste URL below</div>}
                <div style={{position:"absolute",top:7,left:7,width:10,height:10,borderRadius:2,background:editItem.item.veg?G.green:G.red}}/>
              </div>
              <AdminInp T={T} label="Dish Name" value={editItem.item.name} onChange={v=>setEditItem({...editItem,item:{...editItem.item,name:v}})}/>
              <ImageUploader label="Dish Photo" currentImg={editItem.item.img||""} onUpload={v=>setEditItem({...editItem,item:{...editItem.item,img:v}})} T={T} acc={acc} G={G} size="medium"/>
              <AdminTog T={T} acc={acc} on={editItem.item.veg} onChange={v=>setEditItem({...editItem,item:{...editItem.item,veg:v}})} label={editItem.item.veg?"🟢 Vegetarian":"🔴 Non-Vegetarian"}/>
              <AdminTog T={T} acc={acc} on={editItem.item.active} onChange={v=>setEditItem({...editItem,item:{...editItem.item,active:v}})} label={editItem.item.active?"✅ Visible to customers":"⏸️ Hidden"}/>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12,marginTop:2}}>
                <OccasionPicker selected={editItem.item.occasions||[]} onChange={v=>setEditItem({...editItem,item:{...editItem.item,occasions:v}})}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginTop:16}}>
                <button onClick={()=>{updItem(editItem.cat,editItem.item.id,editItem.item);setEditItem(null);show("✅ Saved!");}} style={{padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontSize:".84rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Save ✓</button>
                <button onClick={()=>delItem(editItem.cat,editItem.item.id)} style={{padding:"12px",background:`${G.red}18`,color:G.red,border:`1px solid ${G.red}33`,borderRadius:50,fontSize:".84rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Delete 🗑️</button>
              </div>
            </div>
          </div>
        )}

        {/* Add sheet */}
        {addingTo&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:500,display:"flex",alignItems:"flex-end"}} onClick={()=>setAddingTo(null)}>
            <div style={{background:T.card,borderRadius:"22px 22px 0 0",width:"100%",maxWidth:430,padding:"18px 18px 30px",maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
              <div style={{height:4,width:40,background:T.card3,borderRadius:50,margin:"0 auto 14px"}}/>
              <div style={{fontSize:".9rem",fontWeight:900,color:T.text,marginBottom:12}}>Add to {addingTo}</div>
              <AdminInp T={T} label="Dish Name *" value={newItem.name} onChange={v=>setNewItem(p=>({...p,name:v}))} ph="e.g. Kuttu Puri"/>
              <ImageUploader label="Dish Photo" currentImg={newItem.img||""} onUpload={v=>setNewItem(n=>({...n,img:v}))} T={T} acc={acc} G={G} size="medium"/>
              <AdminTog T={T} acc={acc} on={newItem.veg} onChange={v=>setNewItem({...newItem,veg:v})} label={newItem.veg?"🟢 Vegetarian":"🔴 Non-Vegetarian"}/>
              <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12,marginTop:2}}>
                <OccasionPicker selected={newItem.occasions||[]} onChange={v=>setNewItem({...newItem,occasions:v})}/>
              </div>
              <button onClick={()=>addItem(addingTo)} style={{width:"100%",marginTop:14,padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontSize:".86rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>+ Add Item</button>
            </div>
          </div>
        )}

        <div style={{padding:"10px 14px"}}>
          {cats.map(([cat,label,icon])=>(
            <div key={cat} style={{marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontSize:".88rem",fontWeight:800,color:acc}}>{icon} {label} <span style={{fontSize:".66rem",color:T.muted,fontWeight:400}}>({food[cat].length})</span></div>
                <button onClick={()=>setAddingTo(cat)} style={{padding:"5px 13px",background:`${acc}18`,color:acc,border:`1px solid ${acc}44`,borderRadius:50,fontSize:".66rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>+ Add</button>
              </div>
              {food[cat].map(item=>{
                const restricted=(item.occasions||[]).length>0;
                return(
                  <div key={item.id} onClick={()=>setEditItem({cat,item:{...item,occasions:item.occasions||[]}})} style={{display:"flex",alignItems:"center",gap:10,background:T.card,borderRadius:14,padding:"10px 12px",marginBottom:7,border:`1px solid ${item.active?T.border:G.red+"33"}`,cursor:"pointer",opacity:item.active?1:.55}}>
                    <div style={{width:52,height:52,borderRadius:12,overflow:"hidden",flexShrink:0,background:T.card2,border:`1px solid ${T.border}`}}>
                      {item.img?<img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>:<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>🍽️</div>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:".8rem",fontWeight:700,color:T.text}}>{item.name}</div>
                      <div style={{display:"flex",gap:5,marginTop:2,alignItems:"center",flexWrap:"wrap"}}>
                        <div style={{width:7,height:7,borderRadius:1,background:item.veg?G.green:G.red}}/>
                        <span style={{fontSize:".62rem",color:T.muted}}>{item.veg?"Veg":"NV"}</span>
                        {!item.active&&<span style={{fontSize:".58rem",color:G.red,fontWeight:600}}>· Hidden</span>}
                        {restricted
                          ?<span style={{fontSize:".58rem",color:acc,fontWeight:600,background:`${acc}18`,padding:"1px 6px",borderRadius:50}}>🎯 {(item.occasions||[]).length} occasions</span>
                          :<span style={{fontSize:".58rem",color:T.muted}}>· All occasions</span>}
                      </div>
                    </div>
                    <span style={{fontSize:".8rem",color:T.muted}}>✏️</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PRICING ─────────────────────────────────────────────────────────────────
  if(sec==="combos") return(
    <div style={S}>
      <Toast/><AdminSHdr T={T} onBack={()=>setSec(null)} title="Pricing & Combinations" icon="💰"/>
      <div style={{padding:"12px 14px"}}>
        <div style={{background:T.card,borderRadius:14,padding:"12px 14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".76rem",fontWeight:800,color:T.text,marginBottom:7}}>👥 Max Guests per Booking</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <input type="number" value={settings.maxGuests} onChange={e=>setSettings({...settings,maxGuests:Number(e.target.value)})}
              style={{width:80,padding:"9px",border:`1px solid ${acc}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:"1.1rem",fontWeight:900,color:acc,background:T.card2,outline:"none",textAlign:"center"}}/>
            <div style={{fontSize:".7rem",color:T.muted}}>Max guests per booking</div>
          </div>
        </div>
        <div style={{background:T.card,borderRadius:14,padding:"12px 14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".76rem",fontWeight:800,color:T.text,marginBottom:4}}>GST Settings</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:".7rem",color:T.muted}}>GST %</div>
            <input type="number" value={settings.gstPercent||5} onChange={e=>setSettings({...settings,gstPercent:Number(e.target.value)})}
              style={{width:64,padding:"7px 10px",border:`1px solid ${T.border}`,borderRadius:9,fontFamily:"'Poppins',sans-serif",fontSize:".88rem",fontWeight:900,color:T.text,background:T.card2,outline:"none",textAlign:"center"}}/>
            <div style={{fontSize:".7rem",color:T.muted}}>GSTIN</div>
            <input value={settings.gstin||""} onChange={e=>setSettings({...settings,gstin:e.target.value})}
              style={{flex:1,padding:"7px 10px",border:`1px solid ${T.border}`,borderRadius:9,fontFamily:"'Poppins',sans-serif",fontSize:".78rem",color:T.text,background:T.card2,outline:"none"}}/>
          </div>
        </div>
        {combos.map((c,i)=>(
          <div key={c.id} style={{background:T.card,borderRadius:18,padding:"14px",marginBottom:12,border:`1px solid ${c.active?acc+"55":T.border}`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <input value={c.label} onChange={e=>{const n=[...combos];n[i]={...n[i],label:e.target.value};setCombos(n);}} style={{background:"transparent",border:"none",color:acc,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",fontWeight:900,outline:"none",width:80}}/>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:3}}>
                  <span style={{fontSize:".7rem",color:T.muted}}>₹</span>
                  <input type="number" value={c.price} onChange={e=>{const n=[...combos];n[i]={...n[i],price:Number(e.target.value)};setCombos(n);}} style={{width:62,padding:"5px 6px",border:`1px solid ${T.border}`,borderRadius:8,fontFamily:"'Poppins',sans-serif",fontSize:".88rem",fontWeight:900,color:T.text,background:T.card2,outline:"none",textAlign:"center"}}/>
                  <span style={{fontSize:".62rem",color:T.muted}}>/pp</span>
                </div>
                <div onClick={()=>{const n=[...combos];n[i]={...n[i],active:!n[i].active};setCombos(n);}} style={{width:40,height:22,borderRadius:50,background:c.active?acc:T.card3,position:"relative",cursor:"pointer",transition:"background .2s"}}>
                  <div style={{position:"absolute",top:2,left:c.active?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s"}}/>
                </div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
              {[["starters","🍢"],["mains","🍛"],["breads","🫓"],["rice","🍚"],["desserts","🍮"]].map(([k,ic])=>(
                <div key={k} style={{textAlign:"center"}}>
                  <div style={{fontSize:".7rem",marginBottom:3}}>{ic}</div>
                  <input type="number" min="0" max="10" value={c[k]} onChange={e=>{const n=[...combos];n[i]={...n[i],[k]:Number(e.target.value)};setCombos(n);}} style={{width:"100%",padding:"5px 2px",border:`1px solid ${T.border}`,borderRadius:7,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",fontWeight:800,color:acc,background:T.card2,outline:"none",textAlign:"center"}}/>
                  <div style={{fontSize:".55rem",color:T.muted,marginTop:2,textTransform:"capitalize"}}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={()=>setCombos([...combos,{id:"c"+Date.now(),label:"New",starters:2,mains:2,breads:1,rice:1,desserts:1,price:299,active:true}])} style={{width:"100%",padding:"11px",background:T.card2,color:acc,border:`1px solid ${acc}44`,borderRadius:50,fontSize:".8rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",marginBottom:10}}>+ Add Package</button>
        <button onClick={()=>show("✅ Pricing saved!")} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Save Pricing ✓</button>
      </div>
    </div>
  );

  // ── OFFERS ───────────────────────────────────────────────────────────────────
  if(sec==="offers") return(
    <div style={S}>
      <Toast/><AdminSHdr T={T} onBack={()=>setSec(null)} title="Offers & Discounts" icon="🎁"/>
      <div style={{padding:"12px 14px"}}>
        {offers.map((o,i)=>(
          <div key={o.id} style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:10,border:`1px solid ${o.active?"#8B5CF644":T.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{flex:1,paddingRight:10}}>
                <input value={o.label} onChange={e=>{const n=[...offers];n[i]={...n[i],label:e.target.value};setOffers(n);}} style={{background:"transparent",border:"none",color:T.text,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:800,outline:"none",width:"100%",marginBottom:3}}/>
                <input value={o.desc} onChange={e=>{const n=[...offers];n[i]={...n[i],desc:e.target.value};setOffers(n);}} style={{background:"transparent",border:"none",color:T.muted2,fontFamily:"'Poppins',sans-serif",fontSize:".7rem",outline:"none",width:"100%"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <input type="number" min="0" max="50" value={o.discount} onChange={e=>{const n=[...offers];n[i]={...n[i],discount:Number(e.target.value)};setOffers(n);}} style={{width:42,padding:"4px 5px",border:`1px solid ${T.border}`,borderRadius:7,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,color:acc,background:T.card2,outline:"none",textAlign:"center"}}/>
                <span style={{fontSize:".7rem",color:T.muted}}>%</span>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div onClick={()=>{const n=[...offers];n[i]={...n[i],active:!n[i].active};setOffers(n);}} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
                <div style={{width:40,height:22,borderRadius:50,background:o.active?G.purple:T.card3,position:"relative",transition:"background .2s"}}>
                  <div style={{position:"absolute",top:2,left:o.active?20:2,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s"}}/>
                </div>
                <span style={{fontSize:".72rem",color:o.active?G.purple:T.muted,fontFamily:"'Poppins',sans-serif"}}>{o.active?"Active":"Off"}</span>
              </div>
              <button onClick={()=>{setOffers(offers.filter((_,j)=>j!==i));show("Removed");}} style={{background:`${G.red}18`,color:G.red,border:`1px solid ${G.red}33`,padding:"4px 12px",borderRadius:50,fontSize:".63rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Remove</button>
            </div>
          </div>
        ))}
        <button onClick={()=>setOffers([...offers,{id:"o"+Date.now(),label:"New Offer",desc:"Description",discount:10,active:true}])} style={{width:"100%",padding:"11px",background:T.card2,color:G.purple,border:`1px solid ${G.purple}44`,borderRadius:50,fontSize:".8rem",fontWeight:700,cursor:"pointer",fontFamily:"'Poppins',sans-serif",marginBottom:10}}>+ Add Offer</button>
        <button onClick={()=>show("✅ Saved!")} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Save Offers ✓</button>
      </div>
    </div>
  );

  // ── BUSINESS — standalone component, no hooks-in-if violation ───────────────
  if(sec==="business") return(
    <BusinessForm
      settings={settings} setSettings={setSettings}
      T={T} acc={acc} G={G} show={show}
      onBack={()=>setSec(null)}
    />
  );

  // ── APPEARANCE ───────────────────────────────────────────────────────────────
  if(sec==="appearance") return(
    <div style={S}>
      <Toast/><AdminSHdr T={T} onBack={()=>setSec(null)} title="Appearance" icon="🎨"/>
      <div style={{padding:"12px 14px"}}>
        <div style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".78rem",fontWeight:800,color:T.text,marginBottom:12}}>App Theme</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[["dark","⬛ Dark","#0A0A0A","#F0F0F0"],["light","⬜ Light","#F4F4F4","#111"]].map(([val,lb,bg,fg])=>(
              <div key={val} onClick={()=>setSettings({...settings,theme:val})} style={{borderRadius:14,padding:"14px",background:bg,border:`2px solid ${settings.theme===val?acc:"transparent"}`,cursor:"pointer",textAlign:"center",boxShadow:settings.theme===val?`0 0 14px ${acc}55`:"0 2px 8px rgba(0,0,0,.15)"}}>
                <div style={{fontSize:".82rem",fontWeight:700,color:fg,marginBottom:6}}>{lb}</div>
                <div style={{display:"flex",gap:4,justifyContent:"center"}}>{[acc,G.green,G.red].map(c=><div key={c} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".78rem",fontWeight:800,color:T.text,marginBottom:12}}>Accent Colour</div>
          <div style={{display:"flex",gap:9,flexWrap:"wrap",marginBottom:14}}>
            {["#F0B429","#FF2D7E","#22C55E","#3B82F6","#8B5CF6","#F97316","#EF4444","#06B6D4","#EC4899","#14B8A6"].map(col=>(
              <div key={col} onClick={()=>setSettings({...settings,accent:col})} style={{width:34,height:34,borderRadius:"50%",background:col,cursor:"pointer",border:`3px solid ${settings.accent===col?"#fff":"transparent"}`,transform:settings.accent===col?"scale(1.2)":"scale(1)",transition:"all .2s",boxShadow:settings.accent===col?`0 0 14px ${col}99`:"none"}}/>
            ))}
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input type="color" value={settings.accent} onChange={e=>setSettings({...settings,accent:e.target.value})} style={{width:40,height:32,borderRadius:8,border:`1px solid ${T.border}`,cursor:"pointer",padding:2}}/>
            <input value={settings.accent} onChange={e=>setSettings({...settings,accent:e.target.value})} style={{flex:1,padding:"7px 10px",border:`1px solid ${T.border}`,borderRadius:8,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/>
          </div>
        </div>
        {/* Preview */}
        <div style={{background:T.card,borderRadius:16,padding:"14px",marginBottom:14,border:`1px solid ${T.border}`}}>
          <div style={{fontSize:".76rem",fontWeight:800,color:T.text,marginBottom:10}}>Preview</div>
          <div style={{display:"flex",gap:8,alignItems:"center",background:T.bg,borderRadius:12,padding:"12px"}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${acc},${G.goldd})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>👩‍🍳</div>
            <div><div style={{fontSize:".95rem",fontWeight:900,color:T.text}}>Mrs <span style={{color:acc}}>Chef</span></div><div style={{fontSize:".6rem",color:T.muted}}>Home Kitchen</div></div>
            <button style={{marginLeft:"auto",padding:"7px 14px",background:`linear-gradient(135deg,${acc},${G.goldd})`,border:"none",borderRadius:50,fontSize:".7rem",fontWeight:800,color:"#000",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Book Now</button>
          </div>
        </div>
        <button onClick={()=>show("✅ Saved!")} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Save ✓</button>
      </div>
    </div>
  );

  // ── PASSWORD ─────────────────────────────────────────────────────────────────
  if(sec==="password") return(
    <div style={S}>
      <AdminSHdr T={T} onBack={()=>setSec(null)} title="Change Password" icon="🔐"/>
      <div style={{padding:"14px"}}>
        <div style={{background:T.card,borderRadius:18,padding:"18px",border:`1px solid ${T.border}`}}>
          {[["Current Password","cur"],["New Password","n1"],["Confirm New","n2"]].map(([lb,k])=>(
            <div key={k} style={{marginBottom:12}}>
              <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase"}}>{lb}</div>
              <input type="password" value={pwForm[k]} onChange={e=>setPwForm({...pwForm,[k]:e.target.value})} style={{width:"100%",padding:"10px 13px",border:`1px solid ${T.border}`,borderRadius:11,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",color:T.text,background:T.card2,outline:"none"}}/>
            </div>
          ))}
          {pwMsg&&<div style={{fontSize:".76rem",color:pwMsg.includes("✅")?G.green:G.red,marginBottom:12,fontWeight:600,textAlign:"center"}}>{pwMsg}</div>}
          <button onClick={()=>{
            if(pwForm.cur!==settings.adminPassword){setPwMsg("❌ Current password wrong");return;}
            if(pwForm.n1.length<6){setPwMsg("❌ Min 6 characters");return;}
            if(pwForm.n1!==pwForm.n2){setPwMsg("❌ Passwords don't match");return;}
            setSettings({...settings,adminPassword:pwForm.n1});setPwMsg("✅ Updated!");setPwForm({cur:"",n1:"",n2:""});
          }} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer"}}>Update Password</button>
        </div>
      </div>
    </div>
  );

  // ── REVIEWS ─────────────────────────────────────────────────────────────────
  if(sec==="reviews") return <ReviewsSection reviews={reviews} setReviews={setReviews} T={T} acc={acc} G={G} onBack={()=>setSec(null)}/>;
  if(sec==="areas") return <AreasSection areas={areas} setAreas={setAreas} T={T} acc={acc} G={G} onBack={()=>setSec(null)}/>;
  if(sec==="pages") return(
    <div style={S}>
      <AdminSHdr T={T} onBack={()=>setSec(null)} title="Pages" icon="📄"/>
      <div style={{padding:"12px 14px"}}>
        {[{t:"Home",d:"Hero, specialities, food entry cards, occasions",s:"Live"},
          {t:"Build Menu",d:"Semi-circle wheel + occasion-filtered dishes",s:"Live"},
          {t:"Our Work",d:"Food photo showcase",s:"Live"},
          {t:"Reviews",d:"Customer testimonials",s:"Live"},
          {t:"About",d:"Company story & values",s:"Live"},
          {t:"Enquiry",d:"WhatsApp quick form",s:"Live"},
          {t:"Order Management",d:"Site + offline orders, KOT, billing",s:"Live"},
          {t:"Work Media",d:"Event photo/video uploads",s:"Soon"},
        ].map(p=>(
          <div key={p.t} style={{background:T.card,borderRadius:14,padding:"12px 14px",marginBottom:8,border:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:".8rem",fontWeight:700,color:T.text}}>{p.t}</div><div style={{fontSize:".63rem",color:T.muted,marginTop:2}}>{p.d}</div></div>
            <div style={{fontSize:".6rem",padding:"3px 10px",borderRadius:50,fontWeight:700,background:p.s==="Live"?"#15803D22":"#1E3A5F",color:p.s==="Live"?G.green:"#60A5FA"}}>{p.s}</div>
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
  const [orders,setOrders]     = useState([]);
  const [reviews,setReviews]   = useState(DEF_REVIEWS);
  const [areas,setAreas]       = useState(DEF_AREAS);
  const [condiments,setCondiments] = useState(DEF_CONDIMENTS);

  const [screen,setScreen]     = useState("home");
  const [section,setSection]   = useState("home");
  const [heroIdx,setHeroIdx]   = useState(0);
  const [adminOpen,setAdminOpen]   = useState(false);
  const [adminAuth,setAdminAuth]   = useState(false);
  const [adminPw,setAdminPw]       = useState("");
  const [adminErr,setAdminErr]     = useState(false);

  const [entry,setEntry]       = useState(null);
  const [chefBoxSel,setChefBoxSel] = useState([]);
  const [step,setStep]         = useState(0);
  const [occasion,setOccasion] = useState(null);
  const [diet,setDiet]         = useState("both");
  const [date,setDate]         = useState("");
  const [dateErr,setDateErr]   = useState(false);
  const [pax,setPax]           = useState(10);
  const [sel,setSel]           = useState({starters:[],mains:[],breads:[],rice:[],desserts:[],condiments:[]});
  const [form,setForm]         = useState({name:"",phone:"",area:"Kalkaji",notes:""});
  const [sent,setSent]         = useState(false);
  const [enquiry,setEnquiry]   = useState({name:"",phone:"",occasion:"",guests:"",date:"",notes:""});
  const [enquirySent,setEnquirySent] = useState(false);

  const acc = settings.accent;
  const T   = settings.theme==="light" ? LIGHT : DARK;

  // ── LIVE PRICE CALCULATOR ────────────────────────────────────────────────
  const calcPrice = (curSel, paxCount) => {
    // Try to match a combo tier
    const matched = [...combos].filter(c=>c.active).sort((a,b)=>b.price-a.price).find(c=>
      (curSel.starters?.length||0)>=c.starters &&
      (curSel.mains?.length||0)>=c.mains &&
      (curSel.breads?.length||0)>=c.breads &&
      (curSel.rice?.length||0)>=c.rice &&
      (curSel.desserts?.length||0)>=c.desserts
    );
    if(matched) return { tier:matched.label, ppRate:matched.price, total:matched.price*(paxCount||1) };
    // Fallback: base 199 + per-item rates
    const BASE=199, S=50, M=50, B=20, R=30, D=30;
    const pp = BASE +
      (curSel.starters?.length||0)*S +
      (curSel.mains?.length||0)*M +
      (curSel.breads?.length||0)*B +
      (curSel.rice?.length||0)*R +
      (curSel.desserts?.length||0)*D;
    return { tier:"Custom", ppRate:pp, total:pp*(paxCount||1) };
  };

  useEffect(()=>{const t=setInterval(()=>setHeroIdx(i=>(i+1)%HERO_IMGS.length),3500);return()=>clearInterval(t);},[]);
  useEffect(()=>{if(occasion?.vegOnly) setDiet("veg");},[occasion]);

  // Filter dishes by diet AND occasion
  // Use state arrays (editable via admin)
  const AREAS = areas;
  const REVIEWS = reviews;

  const filterFood = items => {
    let filtered = diet==="veg"?items.filter(i=>i.veg):diet==="nonveg"?items.filter(i=>!i.veg):items;
    if(occasion){
      filtered = filtered.filter(i=>{
        const occ = i.occasions||[];
        return occ.length===0 || occ.includes(occasion.id);
      });
    }
    return filtered.filter(i=>i.active!==false);
  };

  const toggleSel=(cat,item)=>{const cur=sel[cat]||[],ex=cur.find(i=>i.id===item.id);setSel(s=>({...s,[cat]:ex?cur.filter(i=>i.id!==item.id):[...cur,item]}));};
  const isChefBox=entry?.id==="box";
  const completed={start:!!((occasion||isChefBox)&&date&&pax>=1),starters:sel.starters.length>0,mains:sel.mains.length>0,breads:sel.breads.length>0,rice:sel.rice.length>0,desserts:sel.desserts.length>0,condiments:sel.condiments.length>0};
  const allReady=completed.start&&completed.mains;

  const startBuilder=e=>{setEntry(e);setSel({starters:[],mains:[],breads:[],rice:[],desserts:[],condiments:[]});setStep(0);setOccasion(null);setDate("");setSent(false);setDiet("both");setPax(10);setScreen("builder");};

  const sendWA=()=>{
    const num=settings.whatsapp.replace(/\D/g,"");
    const msg=encodeURIComponent(`Hi Mrs Chef! 🍽️\n\n👤 ${form.name}\n📞 ${form.phone}\n📅 ${date}\n🎉 ${occasion?.label}\n👥 ${pax} guests\n🥗 Diet: ${diet}\n📍 ${form.area}\n\n🍢 Starters: ${sel.starters.map(i=>i.name).join(", ")||"None"}\n🍛 Mains: ${sel.mains.map(i=>i.name).join(", ")||"None"}\n🫓 Breads: ${sel.breads.map(i=>i.name).join(", ")||"None"}\n🍚 Rice: ${sel.rice.map(i=>i.name).join(", ")||"None"}\n🍮 Desserts: ${sel.desserts.map(i=>i.name).join(", ")||"None"}\n🫙 Condiments: ${sel.condiments.map(i=>i.name).join(", ")||"None"}\n\n📝 ${form.notes||"None"}`);
    setOrders(p=>[{id:Date.now(),name:form.name,phone:form.phone,date,occasion:occasion?.label,pax,diet,sel,area:form.area,status:"New",source:"Site",time:new Date().toLocaleTimeString()},...p]);
    window.open(`https://wa.me/${num}?text=${msg}`,"_blank");setSent(true);
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
      <input type="password" value={adminPw} onChange={e=>{setAdminPw(e.target.value);setAdminErr(false);}} placeholder="Enter password"
        onKeyDown={e=>{if(e.key==="Enter"){adminPw===settings.adminPassword?setAdminAuth(true):setAdminErr(true);}}}
        style={{width:"100%",padding:"12px 16px",border:`1.5px solid ${adminErr?G.red:T.border}`,borderRadius:13,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",color:T.text,background:T.card,outline:"none",textAlign:"center",letterSpacing:".1em"}}/>
      {adminErr&&<div style={{fontSize:".72rem",color:G.red,fontWeight:600}}>Wrong password</div>}
      <button onClick={()=>{adminPw===settings.adminPassword?setAdminAuth(true):setAdminErr(true);}} style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".9rem",fontWeight:900,cursor:"pointer"}}>Login →</button>
      <button onClick={()=>{setAdminOpen(false);setAdminPw("");setAdminErr(false);}} style={{background:"none",border:"none",color:T.muted,cursor:"pointer",fontFamily:"'Poppins',sans-serif",fontSize:".76rem"}}>← Back</button>
    </div>
  );

  // ADMIN PANEL
  if(adminOpen && adminAuth) return(
    <>
      <style>{css}</style>
      <AdminPanel onExit={()=>{setAdminOpen(false);setAdminAuth(false);setAdminPw("");}} orders={orders} setOrders={setOrders} settings={settings} setSettings={setSettings} food={food} setFood={setFood} combos={combos} setCombos={setCombos} offers={offers} setOffers={setOffers} reviews={reviews} setReviews={setReviews} areas={areas} setAreas={setAreas}/>
    </>
  );

  const Header=({back,title})=>(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 16px 10px"}}>
      {back&&<button onClick={back} style={{background:T.card,border:`1px solid ${T.border}`,color:T.text,width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:".85rem",flexShrink:0}}>←</button>}
      {title
        ?<div style={{flex:1}}><div style={{fontSize:".56rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:1}}>{title.sub}</div><div style={{fontSize:".95rem",fontWeight:900,color:T.text}}>{title.main}</div></div>
        :<div style={{flex:1}}><div style={{fontSize:".56rem",color:T.muted,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",marginBottom:1}}>{settings.tagline}</div><div style={{fontSize:"1.5rem",fontWeight:900,letterSpacing:"-.5px",lineHeight:1,color:T.text}}>Mrs <span style={{color:acc}}>Chef</span></div></div>}
      <Logo size={42} accent={acc} src={settings.logoImg||'/logo.jpg'}/>
    </div>
  );

  const BottomNav=()=>(
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:T.card,borderTop:`1px solid ${T.border}`,zIndex:200,paddingBottom:14}}>
      <div style={{display:"flex",overflowX:"auto",padding:"8px 8px 0",gap:1}}>
        {NAV.map(s=>(
          <button key={s.id} onClick={()=>{setSection(s.id);setScreen("home");}} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 9px",borderRadius:10,background:screen==="home"&&section===s.id?`${acc}18`:"transparent",border:screen==="home"&&section===s.id?`1px solid ${acc}44`:"1px solid transparent",cursor:"pointer",transition:"all .2s"}}>
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

  // ── CHEF BOX PICKER (5 items mandatory) ──────────────────────────────────
  if(screen==="builder" && entry?.id==="box"){
    const allFoodItems = [...(food.starters||[]),...(food.mains||[]),...(food.breads||[]),...(food.rice||[]),...(food.desserts||[])].filter(i=>i.active!==false);
    const filteredBox  = filterFood(allFoodItems);
    const toggleBox    = (item)=>{
      const ex=chefBoxSel.find(i=>i.id===item.id);
      if(ex) setChefBoxSel(chefBoxSel.filter(i=>i.id!==item.id));
      else if(chefBoxSel.length<5) setChefBoxSel([...chefBoxSel,item]);
    };
    const canConfirm   = chefBoxSel.length===5 && date && pax>=1;
    return(
      <div style={{...W,paddingBottom:20}}>
        <style>{css}</style>
        <GlowBg color={acc}/>
        <div style={{position:"relative",zIndex:1}}>
          {/* Header */}
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"14px 14px 10px"}}>
            <button onClick={()=>{setScreen("home");setChefBoxSel([]);}} style={{background:T.card,border:`1px solid ${T.border}`,color:T.text,width:33,height:33,borderRadius:"50%",cursor:"pointer",fontSize:".82rem",flexShrink:0}}>←</button>
            <div style={{flex:1}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase"}}>Build Your Order</div><div style={{fontSize:".9rem",fontWeight:900,color:T.text}}>📦 Chef Box</div></div>
            <Logo size={34} accent={acc} src={settings.logoImg||"/logo.jpg"}/>
          </div>
          {/* Progress pill */}
          <div style={{margin:"0 14px 12px"}}>
            <div style={{background:T.card2,borderRadius:14,padding:"10px 14px",border:`1px solid ${chefBoxSel.length===5?acc+"55":T.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{fontSize:".72rem",fontWeight:800,color:chefBoxSel.length===5?acc:T.text}}>{chefBoxSel.length}/5 items selected {chefBoxSel.length===5?"✓":""}</div>                <div style={{fontSize:".68rem",color:T.muted}}>Exactly 5 required</div>
              </div>
              <div style={{display:"flex",gap:6}}>
                {Array.from({length:5},(_,i)=>(
                  <div key={i} style={{flex:1,height:5,borderRadius:50,background:i<chefBoxSel.length?acc:T.card3,transition:"background .2s"}}/>
                ))}
              </div>
            </div>
          </div>
          {/* Date + Pax quick row */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,margin:"0 14px 12px"}}>
            <div>
              <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase"}}>Event Date *</div>
              <input type="date" value={date} onChange={e=>{setDate(e.target.value);setDateErr(false);}} style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${date?acc+"55":T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",color:date?T.text:T.muted,background:T.card2,outline:"none"}}/>
            </div>
            <div>
              <div style={{fontSize:".6rem",fontWeight:700,color:T.muted,marginBottom:4,textTransform:"uppercase"}}>Guests</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>setPax(p=>Math.max(1,p-1))} style={{width:30,height:34,background:T.card2,border:`1px solid ${T.border}`,borderRadius:8,color:T.text,fontSize:"1rem",cursor:"pointer"}}>−</button>
                <div style={{flex:1,textAlign:"center",fontSize:".9rem",fontWeight:800,color:acc}}>{pax}</div>
                <button onClick={()=>setPax(p=>Math.min(settings.maxGuests,p+1))} style={{width:30,height:34,background:T.card2,border:`1px solid ${T.border}`,borderRadius:8,color:T.text,fontSize:"1rem",cursor:"pointer"}}>+</button>
              </div>
            </div>
          </div>
          {/* Selected chips */}
          {chefBoxSel.length>0&&<div style={{display:"flex",gap:5,overflowX:"auto",padding:"0 14px 9px"}}>
            {chefBoxSel.map(item=>(
              <div key={item.id} onClick={()=>toggleBox(item)} style={{flexShrink:0,display:"flex",alignItems:"center",gap:4,background:`${acc}18`,border:`1px solid ${acc}44`,borderRadius:50,padding:"3px 9px 3px 4px",cursor:"pointer"}}>
                <img src={item.img} alt="" style={{width:16,height:16,borderRadius:"50%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                <span style={{fontSize:".62rem",fontWeight:700,color:acc,whiteSpace:"nowrap"}}>{item.name}</span>
                <span style={{fontSize:".55rem",color:T.muted}}>✕</span>
              </div>
            ))}
          </div>}
          {/* All dishes grid */}
          <div style={{padding:"0 14px",display:"flex",gap:9,flexWrap:"wrap",justifyContent:"space-between"}}>
            {filteredBox.map(item=>{
              const on=!!chefBoxSel.find(i=>i.id===item.id);
              const maxed=!on&&chefBoxSel.length>=5;
              return(
                <div key={item.id} onClick={()=>!maxed&&toggleBox(item)} style={{width:"47%",borderRadius:14,overflow:"hidden",cursor:maxed?"not-allowed":"pointer",border:`2px solid ${on?acc:"transparent"}`,background:T.card2,opacity:maxed?.45:1,transform:on?"scale(1.02)":"scale(1)",transition:"all .18s",marginBottom:3}}>
                  <div style={{position:"relative",height:84}}>
                    <img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>e.target.src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300"}/>
                    <div style={{position:"absolute",top:5,left:5,width:8,height:8,borderRadius:2,background:item.veg?"#22C55E":"#EF4444"}}/>
                    {on&&<div style={{position:"absolute",top:5,right:5,width:20,height:20,borderRadius:"50%",background:acc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".6rem",fontWeight:900,color:"#000"}}>✓</div>}
                  </div>
                  <div style={{padding:"7px 9px 9px",fontSize:".7rem",fontWeight:700,color:T.text,lineHeight:1.2}}>{item.name}</div>
                </div>
              );
            })}
          </div>
          {/* Confirm button */}
          <div style={{padding:"12px 14px 0"}}>
            {!canConfirm&&<div style={{textAlign:"center",fontSize:".65rem",color:T.muted,marginBottom:7}}>{chefBoxSel.length<5?`Select ${5-chefBoxSel.length} more item${5-chefBoxSel.length!==1?"s":""}`:!date?"Please select event date":""}</div>}
            <button onClick={()=>{if(canConfirm){setSel({starters:chefBoxSel,mains:[],breads:[],rice:[],desserts:[],condiments:[]});setScreen("confirm");}}} style={{width:"100%",padding:"13px",background:canConfirm?`linear-gradient(135deg,${acc},${G.goldd})`:"#1A1A1A",color:canConfirm?"#000":T.muted,border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:canConfirm?"pointer":"not-allowed",transition:"all .2s"}}>
              {canConfirm?"Review My Box →":"Select exactly 5 items"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── BUILDER ───────────────────────────────────────────────────────────────
  if(screen==="builder"){
    const cur=BUILDER_STEPS[step];
    const curDishes=cur.key==="condiments"?condiments.filter(i=>i.active!==false):filterFood(food[cur.key]||[]);
    const curSel=sel[cur.key]||[];
    const goNext=()=>{
      if(cur.key==="start"){if(!date){setDateErr(true);return;}setDateErr(false);}
      if(step<BUILDER_STEPS.length-1) setStep(s=>s+1);
      else setScreen("confirm");
    };
    return(
      <div style={{...W,height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <style>{css}</style>
        <GlowBg color={acc}/>
        <div style={{position:"relative",zIndex:1,flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",gap:9,padding:"12px 14px 8px",flexShrink:0}}>
            <button onClick={()=>setScreen("home")} style={{background:T.card,border:`1px solid ${T.border}`,color:T.text,width:33,height:33,borderRadius:"50%",cursor:"pointer",fontSize:".82rem",flexShrink:0}}>←</button>
            <div style={{flex:1}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em"}}>Build Your Menu</div><div style={{fontSize:".9rem",fontWeight:900,color:T.text}}>{cur.emoji} {cur.label}</div></div>
            {allReady&&<button onClick={()=>setScreen("confirm")} style={{flexShrink:0,padding:"6px 12px",borderRadius:50,background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",fontSize:".65rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Review →</button>}
            <Logo size={34} accent={acc}/>
          </div>

          {/* ── LIVE PRICE BAR ── */}
          {(cur.key!=="start")&&(()=>{
            const {tier,ppRate,total}=calcPrice(sel,pax);
            return(
              <div style={{padding:"0 14px 6px",flexShrink:0}}>
                <div style={{background:T.card2,borderRadius:12,padding:"8px 13px",border:`1px solid ${acc}33`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:".58rem",color:T.muted}}>{tier} Package</div>
                    <div style={{fontSize:".7rem",fontWeight:800,color:acc}}>₹{ppRate}/pp × {pax} guests</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:".58rem",color:T.muted}}>Est. Total</div>
                    <div style={{fontSize:".9rem",fontWeight:900,color:acc}}>₹{total.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            );
          })()}
          {cur.key==="start"&&(
            <div style={{flex:1,overflowY:"auto",padding:"0 14px 8px"}}>
              {occasion?.vegOnly&&<div style={{background:"linear-gradient(135deg,#4C1D95,#7C3AED)",borderRadius:14,padding:"11px 13px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:"1.4rem"}}>🕉️</span>
                <div><div style={{fontSize:".74rem",fontWeight:800,color:"#fff"}}>Satvik Mode Active</div><div style={{fontSize:".6rem",color:"rgba(255,255,255,.65)"}}>Menu filtered for this occasion</div></div>
              </div>}
              <div style={{fontSize:".64rem",fontWeight:700,color:T.muted,textTransform:"uppercase",marginBottom:7}}>Occasion *</div>
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
                  <div style={{fontSize:".64rem",fontWeight:700,color:T.muted,textTransform:"uppercase"}}>Event Date <span style={{color:G.red}}>*</span></div>
                  {dateErr&&<div style={{fontSize:".6rem",color:G.red,fontWeight:600}}>⚠️ Required</div>}
                </div>
                <input type="date" value={date} onChange={e=>{setDate(e.target.value);setDateErr(false);}} style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${dateErr?G.red:date?acc+"55":T.border}`,borderRadius:12,fontFamily:"'Poppins',sans-serif",fontSize:".88rem",color:date?T.text:T.muted,background:T.card2,outline:"none",transition:"border-color .2s"}}/>
              </div>
              {/* PAX */}
              <div style={{marginBottom:12}}>
                <div style={{fontSize:".64rem",fontWeight:700,color:T.muted,textTransform:"uppercase",marginBottom:8}}>Number of Guests *</div>
                <div style={{background:T.card2,borderRadius:18,padding:"16px 14px",border:`1px solid ${T.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
                  <div style={{position:"relative",width:100,height:100}}>
                    <svg width="100" height="100" style={{position:"absolute",top:0,left:0}}>
                      <circle cx="50" cy="50" r="44" fill="none" stroke={T.card3} strokeWidth="6"/>
                      <circle cx="50" cy="50" r="44" fill="none" stroke={acc} strokeWidth="6" strokeDasharray={`${((pax-1)/(settings.maxGuests-1))*277} 277`} strokeLinecap="round" transform="rotate(-90 50 50)" style={{transition:"stroke-dasharray .3s"}}/>
                    </svg>
                    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                      <div style={{fontSize:"1.9rem",fontWeight:900,color:acc,lineHeight:1}}>{pax}</div>
                      <div style={{fontSize:".55rem",color:T.muted}}>guests</div>
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
                <div>
                  <div style={{fontSize:".62rem",color:T.muted}}>{curSel.length>0?`${curSel.length} selected`:"Tap a dish to add"}</div>
                  {occasion&&<div style={{fontSize:".57rem",color:acc,marginTop:1}}>🎯 Filtered for {occasion.label}</div>}
                </div>
                {(cur.key!=="mains")&&<button onClick={()=>setStep(s=>Math.min(BUILDER_STEPS.length-1,s+1))} style={{background:"transparent",border:`1px solid ${T.border}`,color:T.muted,padding:"4px 10px",borderRadius:50,fontSize:".6rem",cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Skip →</button>}
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
                {curDishes.length===0
                  ?<div style={{textAlign:"center",width:"100%",color:T.muted}}><div style={{fontSize:"2rem",marginBottom:6}}>🍽️</div><div style={{fontSize:".75rem"}}>No dishes for this occasion/diet</div><div style={{fontSize:".62rem",marginTop:3}}>Go back to "Let's Start" to adjust</div></div>
                  :curDishes.map(item=><DishCard key={item.id} item={item} selected={curSel} onToggle={i=>toggleSel(cur.key,i)} accent={acc}/>)}
              </div>
            </div>
          )}

          <div style={{padding:"6px 14px 5px",flexShrink:0}}>
            <button onClick={goNext} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:900,cursor:"pointer",boxShadow:`0 4px 16px ${acc}33`}}>
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
            <div style={{width:72,height:72,borderRadius:"50%",background:`${acc}18`,border:`2px solid ${acc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",marginBottom:14}}>✅</div>
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
                <div><div style={{fontSize:"1.2rem"}}>{occasion?.emoji||entry?.emoji||"🎉"}</div><div style={{fontSize:".68rem",fontWeight:700,marginTop:3,color:T.text}}>{occasion?.label||entry?.label||"General"}</div><div style={{fontSize:".56rem",color:T.muted}}>Occasion</div></div>
                <div><div style={{fontSize:".63rem",color:T.muted,marginTop:4}}>📅 {date}</div><div style={{fontSize:".63rem",color:T.muted,marginTop:4}}>👥 {pax} guests</div><div style={{fontSize:".63rem",color:T.muted,marginTop:4}}>🥗 {diet}</div></div>
                <div>
                <div style={{fontSize:".7rem",fontWeight:700,color:acc,marginTop:4}}>{entry?.label}</div>
                {(()=>{const p=calcPrice(sel,pax);return(<><div style={{fontSize:"1rem",fontWeight:900,color:acc,marginTop:4}}>₹{p.total.toLocaleString()}</div><div style={{fontSize:".58rem",color:T.muted}}>₹{p.ppRate}/pp · {pax} guests</div><div style={{fontSize:".58rem",color:T.muted2}}>{p.tier} pkg</div></>);})()}
              </div>
              </div>
            </div>
            {[["🍢","starters","Starters"],["🍛","mains","Mains"],["🫓","breads","Breads"],["🍚","rice","Rice"],["🍮","desserts","Desserts"],["🫙","condiments","Condiments"]].map(([ic,key,lb])=>(
              <div key={key} style={{margin:"0 13px 8px",background:T.card,borderRadius:14,padding:"10px 12px",border:`1px solid ${T.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:sel[key].length>0?7:0}}>
                  <div style={{fontSize:".68rem",fontWeight:800,color:acc}}>{ic} {lb}</div>
                  <div style={{fontSize:".56rem",color:sel[key].length>0?G.green:T.muted}}>{sel[key].length>0?`${sel[key].length} items`:"Skipped"}</div>
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
              <button onClick={()=>{if(form.name&&form.phone)sendWA();}} style={{width:"100%",padding:"12px",background:form.name&&form.phone?`linear-gradient(135deg,${acc},${G.goldd})`:"#1A1A1A",color:form.name&&form.phone?"#000":T.muted,border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".86rem",fontWeight:900,cursor:"pointer",transition:"all .2s"}}>💬 Confirm via WhatsApp</button>
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
            {(settings.heroImg?[settings.heroImg,...HERO_IMGS]:HERO_IMGS).map((url,i)=><img key={i} src={url} alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:i===heroIdx?1:0,transition:"opacity 1s ease",zIndex:i===heroIdx?1:0}}/>)}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(7,7,7,.08) 0%,rgba(7,7,7,.88) 100%)",zIndex:2}}/>
            <div style={{position:"absolute",bottom:64,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5,zIndex:3}}>
              {HERO_IMGS.map((_,i)=><div key={i} style={{width:i===heroIdx?18:5,height:5,borderRadius:50,background:i===heroIdx?acc:"rgba(255,255,255,.3)",transition:"all .4s"}}/>)}
            </div>
            <div style={{position:"absolute",top:12,right:12,display:"flex",flexDirection:"column",gap:4,zIndex:3}}>
              {[["⭐ 4.9","Rating"],[settings.eventsCount||"100+","Events"],["NCR","Serving"]].map(([v,l])=>(
                <div key={l} style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.07)",borderRadius:9,padding:"3px 8px",textAlign:"right"}}>
                  <div style={{fontSize:".66rem",fontWeight:800,color:acc}}>{v}</div>
                  <div style={{fontSize:".48rem",color:"rgba(255,255,255,.38)"}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{position:"absolute",bottom:15,left:15,right:15,zIndex:3}}>
              <div style={{fontSize:"1.25rem",fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:12}}>{settings.heroText}</div>
              <button onClick={()=>startBuilder(FOOD_ENTRIES[0])} style={{background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",padding:"11px 20px",borderRadius:50,fontSize:".78rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif",boxShadow:`0 5px 18px ${acc}55`,display:"inline-flex",alignItems:"center",gap:7}}>🍽️ Build Your Menu →</button>
            </div>
          </div>

          {/* Specialities */}
          <div style={{padding:"15px 16px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div><div style={{fontSize:".56rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Signature Dishes</div><div style={{fontSize:".9rem",fontWeight:900,color:T.text}}>Our <span style={{color:acc}}>Specialities</span></div></div>
            </div>
            <div style={{display:"flex",gap:11,overflowX:"auto",paddingBottom:4}}>
              {SPECIALITIES.map((s,i)=>(
                <div key={i} onClick={()=>startBuilder(FOOD_ENTRIES[0])} style={{flexShrink:0,width:155,borderRadius:18,overflow:"hidden",background:T.card2,border:`1px solid ${T.border}`,cursor:"pointer"}}>
                  <div style={{position:"relative",height:105}}>
                    <img src={s.img} alt={s.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(0,0,0,.75))"}}/>
                    <div style={{position:"absolute",top:7,left:7,width:8,height:8,borderRadius:2,background:s.veg?G.green:G.red}}/>
                  </div>
                  <div style={{padding:"9px 11px 11px"}}>
                    <div style={{fontSize:".72rem",fontWeight:800,color:T.text,lineHeight:1.25,marginBottom:3}}>{s.name}</div>
                    <div style={{fontSize:".6rem",color:T.muted2,lineHeight:1.4}}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food entries */}
          <div style={{padding:"14px 16px 0"}}>
            <div style={{fontSize:".86rem",fontWeight:800,marginBottom:11,color:T.text}}>What are you planning?</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {FOOD_ENTRIES.map(e=>(
                <div key={e.id} onClick={()=>startBuilder(e)} style={{borderRadius:20,overflow:"hidden",position:"relative",height:128,cursor:"pointer",boxShadow:`0 8px 28px rgba(0,0,0,.6)`}}>
                  <img src={e.img} alt={e.label} style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(7,7,7,.86) 0%,rgba(7,7,7,.18) 100%)"}}/>
                  <div style={{position:"absolute",top:0,left:0,bottom:0,width:4,background:e.color,borderRadius:"20px 0 0 20px"}}/>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 18px",gap:13}}>
                    <div style={{width:50,height:50,borderRadius:"50%",background:`${e.color}22`,border:`2px solid ${e.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.45rem",flexShrink:0}}>{e.emoji}</div>
                    <div style={{flex:1}}><div style={{fontSize:"1.02rem",fontWeight:900,color:"#fff",marginBottom:3}}>{e.label}</div><div style={{fontSize:".7rem",color:"rgba(255,255,255,.52)"}}>{e.desc}</div></div>
                    <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${acc},${G.goldd})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".88rem",fontWeight:900,color:"#000",flexShrink:0}}>→</div>
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
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}><div style={{fontSize:".86rem",fontWeight:800,color:T.text}}>Occasions</div><div style={{fontSize:".6rem",color:T.muted}}>Tap to start</div></div>
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
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{AREAS.map(a=><div key={a} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:50,padding:"3px 9px",fontSize:".58rem",fontWeight:500,color:T.muted2}}>{a}</div>)}</div>
          </div>
        </>}

        {section==="work"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Real Events · Real Food</div><div style={{fontSize:"1.2rem",fontWeight:900,color:T.text}}>Our <span style={{color:acc}}>Work</span></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,padding:"0 12px"}}>
            {OUR_WORK.map((url,i)=>(
              <div key={i} style={{borderRadius:16,overflow:"hidden",aspectRatio:i===0?"2/1.1":"1",gridColumn:i===0?"span 2":"span 1"}}>
                <img src={url} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              </div>
            ))}
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
                  <div><div style={{fontSize:".78rem",fontWeight:700,color:T.text}}>{r.name}</div><div style={{fontSize:".58rem",color:G.gold}}>{"★".repeat(r.stars)}<span style={{color:T.muted,marginLeft:4}}>📍 {r.loc}</span></div></div>
                </div>
                <div style={{fontSize:".74rem",color:T.muted2,lineHeight:1.62,fontStyle:"italic"}}>"{r.text}"</div>
              </div>
            ))}
          </div>
        </>}

        {section==="about"&&<>
          <div style={{padding:"0 16px 11px"}}><div style={{fontSize:".54rem",color:T.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Our Story</div><div style={{fontSize:"1.2rem",fontWeight:900,color:T.text}}>About <span style={{color:acc}}>Us</span></div></div>

          {/* Article-style: small founder image left, info right */}
          <div style={{margin:"0 12px 12px",background:T.card,borderRadius:18,padding:"14px",border:`1px solid ${T.border}`,display:"flex",gap:13,alignItems:"flex-start"}}>
            <div style={{flexShrink:0,width:80,height:80,borderRadius:16,overflow:"hidden",border:`2px solid ${acc}44`,background:T.card2}}>
              <img src={settings.founderImg||"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=85"} alt="Founder" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:".92rem",fontWeight:900,color:T.text,lineHeight:1.2,marginBottom:3}}>{settings.founderName||"Chef Sunita"}</div>
              <div style={{fontSize:".65rem",color:acc,fontWeight:600,marginBottom:6}}>{settings.founderNote||"Founder & Head Chef · Delhi NCR"}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {[["⭐",settings.eventsCount||"100+","Events"],["🏠","Home","Kitchen"],["📍","Delhi","NCR"]].map(([ic,v,l])=>(
                  <div key={l} style={{background:T.card2,borderRadius:8,padding:"3px 8px",textAlign:"center"}}>
                    <div style={{fontSize:".62rem",fontWeight:700,color:T.text}}>{ic} {v}</div>
                    <div style={{fontSize:".52rem",color:T.muted}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About text */}
          <div style={{margin:"0 12px 11px",background:T.card,borderRadius:16,padding:"14px",border:`1px solid ${T.border}`}}>
            <div style={{fontSize:".8rem",color:T.muted2,lineHeight:1.75}}>{settings.about}</div>
          </div>

          {/* Values grid */}
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
              <div style={{fontSize:"1.1rem",fontWeight:900,marginBottom:5,color:T.text}}>Sent! <span style={{color:acc}}>We'll call soon.</span></div>
              <button onClick={()=>setEnquirySent(false)} style={{background:`linear-gradient(135deg,${acc},${G.goldd})`,color:"#000",border:"none",padding:"9px 20px",borderRadius:50,fontSize:".78rem",fontWeight:900,cursor:"pointer",fontFamily:"'Poppins',sans-serif",marginTop:12}}>New Enquiry</button>
            </div>
          ):(
            <div style={{padding:"0 12px"}}>
              <div style={{background:T.card,borderRadius:18,padding:"14px",border:`1px solid ${T.border}`,marginBottom:10}}>
                {[["Name *","text","name","Your name"],["Phone *","tel","phone","+91 XXXXX XXXXX"]].map(([lb,tp,k,ph])=>(
                  <div key={k} style={{marginBottom:8}}>
                    <label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>{lb}</label>
                    <input type={tp} placeholder={ph} value={enquiry[k]} onChange={e=>setEnquiry({...enquiry,[k]:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/>
                  </div>
                ))}
                <div style={{marginBottom:8}}>
                  <label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Occasion</label>
                  <select value={enquiry.occasion} onChange={e=>setEnquiry({...enquiry,occasion:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}>
                    <option value="">Select</option>{OCCASIONS.map(o=><option key={o.id} value={o.label}>{o.emoji} {o.label}</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                  <div><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Guests</label><input type="number" value={enquiry.guests} onChange={e=>setEnquiry({...enquiry,guests:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/></div>
                  <div><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Date</label><input type="date" value={enquiry.date} onChange={e=>setEnquiry({...enquiry,date:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none"}}/></div>
                </div>
                <div style={{marginBottom:12}}><label style={{display:"block",fontSize:".58rem",fontWeight:700,color:T.muted,marginBottom:3,textTransform:"uppercase"}}>Message</label><textarea value={enquiry.notes} onChange={e=>setEnquiry({...enquiry,notes:e.target.value})} placeholder="Tell us about your event…" rows={3} style={{width:"100%",padding:"9px 11px",border:`1px solid ${T.border}`,borderRadius:10,fontFamily:"'Poppins',sans-serif",fontSize:".8rem",color:T.text,background:T.card2,outline:"none",resize:"none"}}/></div>
                <button onClick={()=>{if(enquiry.name&&enquiry.phone){const num=settings.whatsapp.replace(/\D/g,"");const msg=encodeURIComponent(`Hi Mrs Chef!\n👤 ${enquiry.name}\n📞 ${enquiry.phone}\n🎉 ${enquiry.occasion}\n👥 ${enquiry.guests} guests\n📅 ${enquiry.date}\n📝 ${enquiry.notes||"None"}`);window.open(`https://wa.me/${num}?text=${msg}`,"_blank");setEnquirySent(true);}}} style={{width:"100%",padding:"12px",background:enquiry.name&&enquiry.phone?`linear-gradient(135deg,${acc},${G.goldd})`:"#1A1A1A",color:enquiry.name&&enquiry.phone?"#000":T.muted,border:"none",borderRadius:50,fontFamily:"'Poppins',sans-serif",fontSize:".84rem",fontWeight:900,cursor:"pointer",transition:"all .2s"}}>💬 Send via WhatsApp</button>
              </div>
            </div>
          )}
        </>}

        <BottomNav/>
      </div>
    </div>
  );
}