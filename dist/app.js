const jobs=[
 {id:1,title:"Heavy Vehicle Driver",company:"Kaveri Logistics",location:"Bengaluru",type:"Full-time",industry:"Transport",pay:"₹28,000–34,000/mo",tag:"Urgent",description:"Operate assigned heavy vehicles on regional routes. Valid HMV licence and two years of experience required."},
 {id:2,title:"Warehouse Picker & Packer",company:"Northstar Supply Co.",location:"Chennai",type:"Full-time",industry:"Logistics",pay:"₹18,000–22,000/mo",tag:"New",description:"Pick, scan and pack orders in an organised warehouse. Rotational shifts with transport provided."},
 {id:3,title:"Personal Car Driver",company:"Private household",location:"Hyderabad",type:"Full-time",industry:"Transport",pay:"₹22,000–27,000/mo",tag:"Verified",description:"Experienced city driver needed for a family. Clean driving record and flexible availability preferred."},
 {id:4,title:"Delivery Rider",company:"SwiftDrop Services",location:"Bengaluru",type:"Daily wage",industry:"Retail",pay:"₹900–1,200/day",tag:"Urgent",description:"Local parcel deliveries with flexible shifts. Own two-wheeler, licence and smartphone required."},
 {id:5,title:"Forklift Operator",company:"Metro Industrial Park",location:"Pune",type:"Contract",industry:"Manufacturing",pay:"₹24,000–29,000/mo",tag:"Verified",description:"Certified operator required for loading and inventory movement in a modern industrial facility."},
 {id:6,title:"Loading Helper",company:"CityMove Transport",location:"Chennai",type:"Daily wage",industry:"Logistics",pay:"₹800–1,000/day",tag:"New",description:"Assist the transport team with safe loading and unloading. Weekly payments and meals provided."}
];

const list=document.querySelector('#jobList');
let filters={role:'',location:'',type:'All',industry:''};
function renderJobs(){
 const shown=jobs.filter(j=>`${j.title} ${j.company} ${j.industry}`.toLowerCase().includes(filters.role)&&j.location.toLowerCase().includes(filters.location)&&(filters.type==='All'||j.type===filters.type)&&(!filters.industry||j.industry===filters.industry));
 list.innerHTML=shown.map(j=>`<article class="job-card"><span class="job-tag">${j.tag}</span><button class="save-job" data-save="${j.id}" aria-label="Save ${j.title}">♡</button><h3>${j.title}</h3><div class="job-company">${j.company} · Verified employer</div><div class="job-details"><span>⌖ ${j.location}</span><span>◷ ${j.type}</span></div><div class="job-bottom"><strong>${j.pay}</strong><button data-job="${j.id}">View role →</button></div></article>`).join('');
 document.querySelector('#jobCount').textContent=`${shown.length} ${shown.length===1?'opportunity':'opportunities'}`;
 document.querySelector('#emptyState').hidden=shown.length>0;
}
renderJobs();

document.querySelector('#jobSearch').addEventListener('submit',e=>{e.preventDefault();filters.role=document.querySelector('#roleInput').value.trim().toLowerCase();filters.location=document.querySelector('#locationInput').value.trim().toLowerCase();filters.type=document.querySelector('#typeInput').value;filters.industry='';renderJobs()});
document.querySelector('#clearSearch').addEventListener('click',()=>{filters={role:'',location:'',type:'All',industry:''};document.querySelector('#jobSearch').reset();renderJobs()});
document.querySelectorAll('[data-industry]').forEach(button=>button.addEventListener('click',()=>{filters={role:'',location:'',type:'All',industry:button.dataset.industry};document.querySelector('#jobSearch').reset();renderJobs();document.querySelector('#jobs').scrollIntoView()}));
document.querySelectorAll('[data-scroll]').forEach(button=>button.addEventListener('click',()=>document.querySelector(`#${button.dataset.scroll}`).scrollIntoView()));

const modal=document.querySelector('#modal'),modalContent=document.querySelector('#modalContent');
function openModal(html){modalContent.innerHTML=html;modal.showModal();modalContent.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();modal.close();toast('Thank you. Your prototype request has been captured.');e.target.reset()})}
function formTemplate(kind){
 if(kind==='hire')return `<div class="modal-body"><span class="eyebrow">Employer enquiry</span><h2>Build your workforce with Vinkos.</h2><p>Share your requirement and our team can start planning the right hiring approach.</p><form class="form-grid"><label>Company name<input required placeholder="Your organisation"></label><label>Contact person<input required placeholder="Your name"></label><label>Workforce required<input required placeholder="e.g. 15 warehouse staff"></label><label>Location<input required placeholder="City or worksite"></label><label>Employment type<select><option>Contract staffing</option><option>Permanent recruitment</option><option>Daily workforce</option><option>Bulk hiring</option></select></label><label>Mobile number<input required inputmode="tel" placeholder="+91 98765 43210"></label><label class="full">Requirement details<textarea placeholder="Skills, shift, experience and joining date"></textarea></label><button class="button button-primary" type="submit">Submit requirement</button></form></div>`;
 if(kind==='profile')return `<div class="modal-body"><span class="eyebrow">Candidate profile</span><h2>Tell us what work suits you.</h2><p>Create a simple profile using your mobile number. This prototype does not store submitted data.</p><form class="form-grid"><label>Full name<input required placeholder="Your name"></label><label>Mobile number<input required inputmode="tel" placeholder="+91 98765 43210"></label><label>Primary skill<input required placeholder="Driver, operator, helper…"></label><label>Preferred city<input required placeholder="City or area"></label><label>Experience<select><option>Fresher</option><option>1–2 years</option><option>3–5 years</option><option>6+ years</option></select></label><label>Availability<select><option>Available now</option><option>Within 15 days</option><option>Within 30 days</option></select></label><button class="button button-primary" type="submit">Create profile</button></form></div>`;
 return `<div class="modal-body"><span class="eyebrow">Contact Vinkos</span><h2>How can we help?</h2><p>For job safety, hiring support or general questions, leave a callback request.</p><form class="form-grid"><label>Your name<input required placeholder="Name"></label><label>Mobile number<input required inputmode="tel" placeholder="+91 98765 43210"></label><label class="full">Message<textarea required placeholder="Tell us what you need"></textarea></label><button class="button button-primary" type="submit">Request callback</button></form></div>`;
}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openModal(formTemplate(button.dataset.open))));
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
list.addEventListener('click',e=>{
 const jobButton=e.target.closest('[data-job]');
 if(jobButton){const j=jobs.find(item=>item.id===Number(jobButton.dataset.job));openModal(`<div class="modal-body"><div class="modal-job-head"><span class="eyebrow">${j.company}</span><h2>${j.title}</h2></div><div class="modal-tags"><span>⌖ ${j.location}</span><span>◷ ${j.type}</span><span>✓ Verified employer</span></div><p>${j.description}</p><h3>${j.pay}</h3><form class="form-grid"><label class="full">Mobile number<input required inputmode="tel" placeholder="We’ll send an OTP"></label><button class="button button-primary" type="submit">Apply for this role</button></form></div>`)}
 const save=e.target.closest('[data-save]');
 if(save){save.classList.toggle('saved');save.textContent=save.classList.contains('saved')?'♥':'♡';toast(save.classList.contains('saved')?'Job saved':'Removed from saved jobs')}
});
function toast(message){const element=document.querySelector('#toast');element.textContent=message;element.classList.add('show');setTimeout(()=>element.classList.remove('show'),2500)}
document.querySelector('.menu-button').addEventListener('click',e=>{const header=document.querySelector('.site-header');header.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',header.classList.contains('open'))});
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.site-header').classList.remove('open')));
