const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
document.addEventListener('DOMContentLoaded',()=>{
 const menu=$('#menuButton'),nav=$('#nav');
 if(menu&&nav)menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
 const form=$('#enquiryForm');
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const fb=$('#formFeedback');if(fb)fb.textContent='This demo form does not send messages yet. Please contact the college through verified official contact details.'});
 const year=$('#year');if(year)year.textContent=new Date().getFullYear();
 updateCollegeStatus();
 window.setInterval(updateCollegeStatus, 60000);
 loadContent();
});
async function loadContent(){
 try{
  const r=await fetch('./content.json',{cache:'no-store'});if(!r.ok)return;
  const d=await r.json();
  $$('[data-field]').forEach(el=>{
   const k=el.dataset.field;if(d[k]===undefined)return;
   if(['collegeHistory','principalMessage'].includes(k)){
    el.innerHTML=String(d[k]).split(/\n\s*\n/).map(p=>'<p>'+escapeHtml(p).replace(/\n/g,'<br>')+'</p>').join('');
   }else if(k==='heroTitle'||k==='aboutTitle'||k==='historyTitle'||k==='noticesTitle'){
    const bits=String(d[k]).split('|');el.textContent='';el.append(document.createTextNode(bits[0]||''));if(bits[1]){el.append(document.createElement('br'));const em=document.createElement('em');em.textContent=bits[1];el.append(em)}
   }else el.textContent=d[k];
  });
  if(d.facebookUrl){const frame=$('.facebook-feed-wrap iframe');if(frame)frame.src='https://www.facebook.com/plugins/page.php?href='+encodeURIComponent(d.facebookUrl)+'&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true';const link=$('[data-field-href="facebookUrl"]');if(link)link.href=d.facebookUrl}
  const design=d.design||{};const root=document.documentElement;
  const vars={primaryColor:'--primary-color',accentColor:'--accent-color',pageColor:'--page-background',textColor:'--text-color',headingColor:'--heading-color'};
  Object.entries(vars).forEach(([key,v])=>{if(design[key])root.style.setProperty(v,design[key])});
  if(design.headingSize)root.style.setProperty('--heading-size',design.headingSize+'px');
  if(design.bodySize)root.style.setProperty('--body-size',design.bodySize+'px');
  if(design.photoHeight)root.style.setProperty('--photo-height',design.photoHeight+'px');
  if(design.photoFit)root.style.setProperty('--photo-fit',design.photoFit);
  if(design.heroPhoto){const hero=$('.hero');if(hero)hero.style.backgroundImage='linear-gradient(90deg,#062f28e8,#062f28a0 55%,#062f2850),url("'+design.heroPhoto+'")';const cp=$('.campus-photo');if(cp)cp.style.backgroundImage='url("'+design.heroPhoto+'")'}
  if(design.logoPhoto)$$('.college-logo').forEach(img=>img.src=design.logoPhoto);
  if(d.principalPhoto&&typeof d.principalPhoto==='string'&&d.principalPhoto.startsWith('data:image')){const p=$('.principal-photo');if(p)p.src=d.principalPhoto}
  if(d.heroImage&&!d.design?.heroPhoto){const hero=$('.hero');if(hero)hero.style.backgroundImage='linear-gradient(90deg,#062f28e8,#062f28a0 55%,#062f2850),url("'+d.heroImage+'")'}
  if(Array.isArray(d.news)&&d.news.length){const list=$('.notice-list');if(list){list.innerHTML='';d.news.forEach((n,i)=>{const a=document.createElement('article');a.innerHTML='<div class="notice-no">'+String(i+1).padStart(2,'0')+'</div><div class="notice-body"><span></span><h3></h3><p></p></div><div class="notice-icon">↗</div>';$('.notice-body span',a).textContent=n.category||'COLLEGE NEWS';$('.notice-body h3',a).textContent=n.title||'';$('.notice-body p',a).textContent=n.description||'';list.append(a)})}}

  // Apply section-specific design choices from the admin editor.
  const sectionMap={
    'home':'#home','about':'#about','history':'#history','principal':'#principal',
    'academics':'#academics','admissions':'#admissions','notices':'#notices',
    'campus':'#campus','facebook-updates':'#facebook-updates','contact':'#contact',
    'find-us':'#find-us','footer':'.footer'
  };
  Object.entries(d.sectionStyles||{}).forEach(([key,style])=>{
    const selector=sectionMap[key]; if(!selector||!style)return;
    const section=$(selector); if(!section)return;
    if(style.backgroundColor)section.style.backgroundColor=style.backgroundColor;
    if(style.textColor)section.style.color=style.textColor;
    $$('h1,h2,h3',section).forEach(h=>{
      if(style.headingColor)h.style.color=style.headingColor;
      if(style.headingSize)h.style.fontSize=style.headingSize+'px';
    });
    $$('p,li,span,small',section).forEach(el=>{
      if(style.textColor)el.style.color=style.textColor;
      if(style.bodySize)el.style.fontSize=style.bodySize+'px';
    });
  });
  // Menu styling
  if(d.menu){
    const m=d.menu,nav=$('#nav'),header=$('.header');
    if(nav){
      if(m.menuColor)nav.style.backgroundColor=m.menuColor;
      $$('a',nav).forEach(a=>{
        if(m.menuTextColor)a.style.color=m.menuTextColor;
        if(m.menuFontSize)a.style.fontSize=m.menuFontSize+'px';
        a.style.borderRadius=m.menuStyle==='pill'?'999px':m.menuStyle==='boxed'?'5px':'0';
        a.style.padding=m.menuStyle==='pill'?'9px 13px':m.menuStyle==='boxed'?'9px 11px':'';
        a.style.borderBottom=m.menuStyle==='underline'?'2px solid transparent':'';
        a.addEventListener('mouseenter',()=>{if(m.menuHoverColor){a.style.color=m.menuHoverColor;if(m.menuStyle==='underline')a.style.borderBottomColor=m.menuHoverColor}});
        a.addEventListener('mouseleave',()=>{if(m.menuTextColor)a.style.color=m.menuTextColor;if(m.menuStyle==='underline')a.style.borderBottomColor='transparent'});
      });
      const contact=$('.nav-contact',nav);
      if(contact&&m.menuContactColor){contact.style.backgroundColor=m.menuContactColor;contact.style.color='#ffffff'}
    }
    if(header&&m.menuColor)header.style.backgroundColor=m.menuColor;
  }
 }catch(e){console.warn('Website content could not be loaded:',e)}
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}


// College status is calculated using the college's displayed weekly schedule
// and the Asia/Karachi time zone, regardless of the visitor's device time zone.
function updateCollegeStatus(){
 const status=$('#collegeStatusText');
 const note=$('#collegeStatusNote');
 const dot=$('#collegeStatusDot');
 if(!status||!note||!dot)return;
 try{
  const now=new Date();
  const parts=new Intl.DateTimeFormat('en-US',{
   timeZone:'Asia/Karachi',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'
  }).formatToParts(now).reduce((o,p)=>(o[p.type]=p.value,o),{});
  const dayMap={Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:0};
  const day=dayMap[parts.weekday];
  const minuteOfDay=Number(parts.hour)*60+Number(parts.minute);
  const opensAt=8*60, closesAt=14*60;
  const clock=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Karachi',hour:'numeric',minute:'2-digit',hour12:true}).format(now);
  const isWorkingDay=day>=1&&day<=6;
  if(isWorkingDay&&minuteOfDay>=opensAt&&minuteOfDay<closesAt){
   status.textContent='College office is currently OPEN';
   note.textContent='Listed closing time: 2:00 PM · Pakistan time ('+clock+')';
   dot.classList.add('is-open');dot.classList.remove('is-closed');
  }else{
   status.textContent='College office is currently CLOSED';
   let next='';
   if(day===0) next='Next listed opening: Monday at 8:00 AM';
   else if(day>=1&&day<=5&&minuteOfDay<opensAt) next='Listed opening time: today at 8:00 AM';
   else if(day>=1&&day<=5) next='Next listed opening: tomorrow at 8:00 AM';
   else if(day===6&&minuteOfDay<opensAt) next='Listed opening time: today at 8:00 AM';
   else if(day===6) next='Next listed opening: Monday at 8:00 AM';
   note.textContent=next+' · Pakistan time ('+clock+')';
   dot.classList.add('is-closed');dot.classList.remove('is-open');
  }
 }catch(err){
  status.textContent='Office status unavailable';
  note.textContent='Please check the listed hours: Monday–Saturday, 8:00 AM–2:00 PM (Pakistan time).';
  dot.classList.remove('is-open','is-closed');
 }
}
