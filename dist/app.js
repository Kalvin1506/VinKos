const jobs=[
 {id:1,title:"Heavy Vehicle Driver",company:"Kaveri Logistics",initials:"KL",location:"Bengaluru",type:"Full-time",tag:"Urgent",pay:"₹28,000–34,000/mo",detail:"Drive assigned heavy vehicles on regional routes. Valid HMV licence and two years of experience required."},
 {id:2,title:"Warehouse Picker & Packer",company:"Northstar Supply Co.",initials:"NS",location:"Chennai",type:"Full-time",tag:"Verified",pay:"₹18,000–22,000/mo",detail:"Pick, scan and pack orders in an organised warehouse. Rotational shifts with transport provided."},
 {id:3,title:"Personal Car Driver",company:"Private household",initials:"PH",location:"Hyderabad",type:"Full-time",tag:"New",pay:"₹22,000–27,000/mo",detail:"Experienced city driver needed for a family. Clean driving record and flexible availability preferred."},
 {id:4,title:"Delivery Rider",company:"SwiftDrop Services",initials:"SD",location:"Bengaluru",type:"Daily wage",tag:"Urgent",pay:"₹900–1,200/day",detail:"Local parcel deliveries with flexible shifts. Own two-wheeler, licence and smartphone required."},
 {id:5,title:"Forklift Operator",company:"Metro Industrial Park",initials:"MI",location:"Pune",type:"Full-time",tag:"Verified",pay:"₹24,000–29,000/mo",detail:"Certified operator required for loading and inventory movement in a modern industrial facility."},
 {id:6,title:"Loading Helper",company:"CityMove Transport",initials:"CT",location:"Chennai",type:"Daily wage",tag:"New",pay:"₹800–1,000/day",detail:"Assist the transport team with safe loading and unloading. Weekly payments and meals provided."}
];

const list=document.querySelector('#jobList');
let currentFilter='All',query='',place='';
function renderJobs(){
 const shown=jobs.filter(j=>(currentFilter==='All'||j.tag===currentFilter||j.type===currentFilter)&&(`${j.title} ${j.company}`.toLowerCase().includes(query))&&j.location.toLowerCase().includes(place));
 list.innerHTML=shown.map(j=>`<article class="job-card"><span class="job-badge">${j.tag}</span><button class="job-save" data-save="${j.id}" aria-label="Save ${j.title}">♡</button><div class="company-row"><div class="company-logo">${j.initials}</div><div><strong>${j.company}</strong><small>Verified employer</small></div></div><h3>${j.title}</h3><div class="job-details"><span>⌖ ${j.location}</span><span>◷ ${j.type}</span></div><div class="job-pay"><strong>${j.pay}</strong><button data-job="${j.id}">View job →</button></div></article>`).join('');
 document.querySelector('#emptyState').hidden=shown.length>0;
}
renderJobs();

document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentFilter=b.dataset.filter;renderJobs()}));
document.querySelectorAll('.category').forEach(b=>b.addEventListener('click',()=>{query=b.dataset.category.toLowerCase();document.querySelector('#searchRole').value=b.dataset.category;renderJobs();document.querySelector('#jobs').scrollIntoView()}));
document.querySelector('#heroSearch').addEventListener('submit',e=>{e.preventDefault();query=document.querySelector('#searchRole').value.trim().toLowerCase();place=document.querySelector('#searchLocation').value.trim().toLowerCase();renderJobs();document.querySelector('#jobs').scrollIntoView()});

const modal=document.querySelector('#modal'),content=document.querySelector('#modalContent');
function openModal(html){content.innerHTML=html;modal.showModal();content.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();modal.close();toast('Thanks! This prototype has captured your request.');e.target.reset()})}
function formTemplate(kind){
 if(kind==='post')return `<div class="modal-body"><span class="kicker">Employer request</span><h2>Who do you need?</h2><p>Share a few details and our team can begin matching suitable workers.</p><form class="form-grid"><label>Job role<input required placeholder="e.g. Heavy vehicle driver"></label><label>Number of workers<input required type="number" min="1" value="1"></label><label>Location<input required placeholder="City or work site"></label><label>Job type<select><option>Full-time</option><option>Contract</option><option>Daily wage</option><option>Part-time</option></select></label><label class="full">Requirement details<textarea placeholder="Shift, experience, licence, joining date…"></textarea></label><label>Contact name<input required placeholder="Your name"></label><label>Mobile number<input required inputmode="tel" placeholder="+91 98765 43210"></label><button class="button button-dark" type="submit">Submit manpower request</button></form></div>`;
 if(kind==='signin')return `<div class="modal-body"><span class="kicker">Welcome back</span><h2>Sign in with mobile</h2><p>For this prototype, any 10-digit mobile number will demonstrate the next step.</p><form class="form-grid"><label class="full">Mobile number<input required pattern="[0-9]{10}" inputmode="numeric" placeholder="9876543210"></label><button class="button button-dark" type="submit">Continue with OTP</button></form></div>`;
 return `<div class="modal-body"><span class="kicker">Vinkos support</span><h2>Request a callback</h2><p>Tell us how to reach you and what kind of manpower you need.</p><form class="form-grid"><label>Your name<input required placeholder="Name"></label><label>Mobile number<input required inputmode="tel" placeholder="+91 98765 43210"></label><label class="full">Requirement<textarea placeholder="Briefly describe your requirement"></textarea></label><button class="button button-dark" type="submit">Request callback</button></form></div>`;
}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openModal(formTemplate(b.dataset.open))));
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
list.addEventListener('click',e=>{
 const jobButton=e.target.closest('[data-job]'); if(jobButton){const j=jobs.find(x=>x.id===+jobButton.dataset.job);openModal(`<div class="modal-body"><div class="modal-job-top"><div class="company-logo">${j.initials}</div><div><span class="kicker">${j.company}</span><h2>${j.title}</h2></div></div><div class="modal-tags"><span>⌖ ${j.location}</span><span>◷ ${j.type}</span><span>✓ Verified employer</span></div><p>${j.detail}</p><div class="modal-pay"><strong>${j.pay}</strong></div><form class="form-grid"><label class="full">Your mobile number<input required inputmode="tel" placeholder="We’ll send an OTP"></label><button class="button button-dark" type="submit">Apply for this job</button></form></div>`)}
 const save=e.target.closest('[data-save]');if(save){save.classList.toggle('saved');save.textContent=save.classList.contains('saved')?'♥':'♡';toast(save.classList.contains('saved')?'Job saved':'Removed from saved jobs')}
});
function toast(message){const t=document.querySelector('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
document.querySelectorAll('[data-scroll-jobs]').forEach(b=>b.addEventListener('click',()=>document.querySelector('#jobs').scrollIntoView()));
document.querySelectorAll('[data-intent]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-intent]').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');if(b.dataset.intent==='hire')openModal(formTemplate('post'))}));
document.querySelector('.menu-button').addEventListener('click',e=>{const h=document.querySelector('.site-header');h.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',h.classList.contains('open'))});
