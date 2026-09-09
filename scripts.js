const LOW_STOCK_THRESHOLD = 2;
function isLow(p){ return p.stock <= (p.minStock != null ? p.minStock : LOW_STOCK_THRESHOLD); }

let searchTerm = '';
let currentPage = 1;

function onSearch(value){
  searchTerm = value;
  currentPage = 1;
  render();
}

function goToPage(p){
  currentPage = p;
  render();
}

function renderPagination(totalPages){
  const el = document.getElementById('pagination');
  if(!el) return;
  if(totalPages <= 1){ el.innerHTML = ''; return; }

  let html = `<button class="page-btn" onclick="goToPage(${currentPage-1})" ${currentPage===1?'disabled':''}>&#8249;</button>`;

  const pages = [];
  for(let i=1;i<=totalPages;i++){
    if(i===1 || i===totalPages || Math.abs(i-currentPage)<=1) pages.push(i);
  }
  let lastShown = 0;
  pages.forEach(p=>{
    if(lastShown && p - lastShown > 1) html += `<span class="page-ellipsis">…</span>`;
    html += `<button class="page-btn ${p===currentPage?'active':''}" onclick="goToPage(${p})">${p}</button>`;
    lastShown = p;
  });

  html += `<button class="page-btn" onclick="goToPage(${currentPage+1})" ${currentPage===totalPages?'disabled':''}>&#8250;</button>`;
  el.innerHTML = html;
}
const CAT_COLORS = ['#CF8A4C','#8FA06B','#D9B15B','#6E9AAE','#E08571','#A78BC4'];

function loadData(){
  const raw = localStorage.getItem('frutossecos_data');
  if(raw){ try{ return JSON.parse(raw); }catch(e){} }
  return null;
}
function saveData(){
  localStorage.setItem('frutossecos_data', JSON.stringify(state));
  scheduleDriveSync();
}

let state = loadData();
if(!state){
  state = {
    categories: [
      {id:'c_F', name:'Frutos secos', letter:'F', color:'#CF8A4C'},
      {id:'c_M', name:'Maní', letter:'M', color:'#6E9AAE'},
      {id:'c_D', name:'Frutas desecadas', letter:'D', color:'#E08571'},
      {id:'c_G', name:'Granola', letter:'G', color:'#D9B15B'},
      {id:'c_MX', name:'Mixes', letter:'MX', color:'#A78BC4'},
      {id:'c_O', name:'Otros', letter:'O', color:'#8FA06B'},
    ],
    products: [
      {id:'p1', name:'Almendra Carmel 27/30', catId:'c_F', price:0, stock:200, minStock:150},
      {id:'p2', name:'Almendra guara calibre 3', catId:'c_F', price:18700, stock:0, minStock:150},
      {id:'p3', name:'Almendra guara calibre 6', catId:'c_F', price:0, stock:300, minStock:200},
      {id:'p4', name:'Almendra marinada simil non parei', catId:'c_F', price:0, stock:0, minStock:150},
      {id:'p5', name:'Almendra non parei ramillada', catId:'c_F', price:0, stock:0, minStock:150},
      {id:'p6', name:'Avellanas 9/11', catId:'c_F', price:26600, stock:0, minStock:2},
      {id:'p7', name:'Castaña Caju P3', catId:'c_F', price:0, stock:226.8, minStock:150},
      {id:'p8', name:'Castaña Caju W4 PPP', catId:'c_F', price:0, stock:680.4, minStock:200},
      {id:'p9', name:'Nuez cuarto Extra light', catId:'c_F', price:13500, stock:0, minStock:2},
      {id:'p10', name:'Nuez cuarto light', catId:'c_F', price:0, stock:0, minStock:2},
      {id:'p11', name:'Nuez mariposa extra light', catId:'c_F', price:15000, stock:0, minStock:2},
      {id:'p12', name:'Nuez mariposa light', catId:'c_F', price:13800, stock:480, minStock:2},
      {id:'p13', name:'Pistacho', catId:'c_F', price:29900, stock:0, minStock:2},
      {id:'p14', name:'Mani con sal economico', catId:'c_M', price:1800, stock:100, minStock:2},
      {id:'p15', name:'Mani con sal premiun', catId:'c_M', price:2150, stock:250, minStock:2},
      {id:'p16', name:'Mani crudo', catId:'c_M', price:2300, stock:0, minStock:2},
      {id:'p17', name:'Mani sin sal economico', catId:'c_M', price:1750, stock:400, minStock:2},
      {id:'p18', name:'Mani sin sal premiun', catId:'c_M', price:2150, stock:750, minStock:2},
      {id:'p19', name:'mani saborizado', catId:'c_M', price:0, stock:0, minStock:2},
      {id:'p20', name:'Arandanos rojos azucarados', catId:'c_D', price:0, stock:0, minStock:150},
      {id:'p21', name:'Chips de banana entero PPP', catId:'c_D', price:0, stock:238, minStock:100},
      {id:'p22', name:'Ciruela d\'agen sin carozo', catId:'c_D', price:7400, stock:185, minStock:200},
      {id:'p23', name:'Datiles con carozo(egipto)', catId:'c_D', price:5890, stock:0, minStock:2},
      {id:'p24', name:'Datiles con carozo(paquistani)', catId:'c_D', price:6030, stock:0, minStock:2},
      {id:'p25', name:'Higos grandes', catId:'c_D', price:0, stock:0, minStock:2},
      {id:'p26', name:'Medallon durazno grande', catId:'c_D', price:11500, stock:0, minStock:2},
      {id:'p27', name:'Papaya premiun multicolor', catId:'c_D', price:0, stock:7, minStock:2},
      {id:'p28', name:'Pasas de uva flame económica', catId:'c_D', price:3250, stock:1000, minStock:2},
      {id:'p29', name:'Pasas de uva flame premium', catId:'c_D', price:0, stock:900, minStock:2},
      {id:'p30', name:'Pasas rubias de primera', catId:'c_D', price:0, stock:0, minStock:2},
      {id:'p31', name:'Tomate deshidratado de primera', catId:'c_D', price:15870, stock:0, minStock:2},
      {id:'p32', name:'Granola Pasta de mani (9 ingredientes)', catId:'c_G', price:0, stock:0, minStock:2},
      {id:'p33', name:'Granola Proteica(15 ingredientes)', catId:'c_G', price:0, stock:0, minStock:2},
      {id:'p34', name:'Granola tradicional (13 ingredientes)', catId:'c_G', price:0, stock:0, minStock:2},
      {id:'p35', name:'Mix energetico comun (nuez light, almendra, mani sin sal, pasas flame y pasas rubias, castañas de caju)', catId:'c_MX', price:5600, stock:0, minStock:2},
      {id:'p36', name:'Mix energetico premium (nuez extra light, almendra, mani sin sal, pasas flame y pasas rubias, castañas de caju, avellanas)', catId:'c_MX', price:8250, stock:0, minStock:2},
      {id:'p37', name:'Mix tropical comun (nuez light, almendra, mani sin sal, bananas chips, papaya/anana, pasas flame y pasas rubias)', catId:'c_MX', price:5900, stock:0, minStock:2},
      {id:'p38', name:'Mix tropical premium ( nuez extra light, almendra, mani sin sal, bananas chips, papaya/anana, pasas flame y pasas rubias, castañas de caju', catId:'c_MX', price:7650, stock:0, minStock:2},
      {id:'p39', name:'Bolson Mixto de frutas 1era', catId:'c_O', price:0, stock:0, minStock:2},
    ],
    stockLoads: [],
    sales: [],
    mixes: [],
    cajaMovements: []
  };
  saveData();
}

function money(n){ return '$' + Number(n).toLocaleString('es-AR', {minimumFractionDigits:0, maximumFractionDigits:2}); }
function kg(n){ return Number(n).toLocaleString('es-AR', {minimumFractionDigits:0, maximumFractionDigits:2}); }
function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', {day:'2-digit', month:'2-digit'}) + ' ' + d.toLocaleTimeString('es-AR', {hour:'2-digit', minute:'2-digit'});
}
function escapeHtml(str){ const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(showToast._h);
  showToast._h = setTimeout(()=> t.classList.remove('show'), 2200);
}

function switchView(name){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  document.querySelector(`.nav-btn[data-view="${name}"]`).classList.add('active');
}

/* ---------- CATEGORIES ---------- */
function addCategory(e){
  e.preventDefault();
  const name = document.getElementById('catName').value.trim();
  const letter = document.getElementById('catLetter').value.trim().toUpperCase();
  if(!name || !letter) return;
  const color = CAT_COLORS[state.categories.length % CAT_COLORS.length];
  state.categories.push({id: Date.now().toString(36), name, letter, color});
  saveData();
  document.getElementById('catName').value=''; document.getElementById('catLetter').value='';
  render();
}
function removeCategory(id){
  if(state.products.some(p=>p.catId===id)){
    showToast('No se puede borrar: hay productos con esta categoría');
    return;
  }
  state.categories = state.categories.filter(c=>c.id!==id);
  saveData(); render();
}
function catFor(id){ return state.categories.find(c=>c.id===id); }

/* ---------- PRODUCTS ---------- */
function addProduct(e){
  e.preventDefault();
  const name = document.getElementById('newName').value.trim();
  const catId = document.getElementById('newCat').value;
  const price = parseFloat(document.getElementById('newPrice').value);
  const minStockRaw = document.getElementById('newMinStock').value;
  const minStock = minStockRaw === '' ? LOW_STOCK_THRESHOLD : parseFloat(minStockRaw);
  if(!name || isNaN(price)) return;
  state.products.push({id: Date.now().toString(36), name, catId, price, stock: 0, minStock});
  saveData();
  document.getElementById('newName').value=''; document.getElementById('newPrice').value=''; document.getElementById('newMinStock').value='2';
  showToast(`"${name}" agregado al inventario`);
  render();
}
function updateMinStock(id, value){
  const p = state.products.find(x=>x.id===id);
  const val = parseFloat(value);
  if(!p || isNaN(val) || val<0) return;
  p.minStock = val; saveData(); render();
}
function updatePrice(id, value){
  const p = state.products.find(x=>x.id===id);
  const val = parseFloat(value);
  if(!p || isNaN(val) || val<0) return;
  p.price = val; saveData(); renderStats();
}
function updateStockDirect(id, value){
  const p = state.products.find(x=>x.id===id);
  const val = parseFloat(value);
  if(!p || isNaN(val) || val<0) return;
  p.stock = val; saveData(); render();
}
function removeProduct(id){
  const p = state.products.find(x=>x.id===id);
  if(!p) return;
  if(!confirm(`¿Eliminar "${p.name}"?`)) return;
  state.products = state.products.filter(x=>x.id!==id);
  saveData(); render();
}

/* ---------- STOCK LOADS ---------- */
function registerStockLoad(e){
  e.preventDefault();
  const productId = document.getElementById('loadProduct').value;
  const qty = parseFloat(document.getElementById('loadQty').value);
  const p = state.products.find(x=>x.id===productId);
  if(!p || isNaN(qty) || qty<=0) return;
  p.stock = Math.round((p.stock + qty)*1000)/1000;
  state.stockLoads.unshift({id: Date.now().toString(36), productId: p.id, productName: p.name, qty, date: new Date().toISOString()});
  saveData();
  document.getElementById('loadQty').value='';
  showToast(`Sumaste ${kg(qty)} kg de ${p.name} al stock`);
  render();
}

let editingLoadId = null;
function editLoad(id){
  editingLoadId = (editingLoadId === id) ? null : id;
  render();
}
function cancelEditLoad(){ editingLoadId = null; render(); }
function saveEditLoad(id){
  const load = state.stockLoads.find(l=>l.id===id);
  if(!load) return;
  const input = document.getElementById('editLoadQty_'+id);
  const newQty = parseFloat(input.value);
  if(isNaN(newQty) || newQty<=0){ showToast('Ingresá una cantidad válida'); return; }
  const p = state.products.find(x=>x.id===load.productId) || state.products.find(x=>x.name===load.productName);
  if(p){
    const delta = newQty - load.qty;
    p.stock = Math.round((p.stock + delta)*1000)/1000;
    if(p.stock < 0) p.stock = 0;
  }
  load.qty = newQty;
  editingLoadId = null;
  saveData();
  showToast('Carga actualizada');
  render();
}
function deleteLoad(id){
  const load = state.stockLoads.find(l=>l.id===id);
  if(!load) return;
  if(!confirm(`¿Eliminar esta carga de ${kg(load.qty)} kg de ${load.productName}? Se restará del stock actual.`)) return;
  const p = state.products.find(x=>x.id===load.productId) || state.products.find(x=>x.name===load.productName);
  if(p){
    p.stock = Math.round((p.stock - load.qty)*1000)/1000;
    if(p.stock < 0) p.stock = 0;
  }
  state.stockLoads = state.stockLoads.filter(l=>l.id!==id);
  saveData();
  showToast('Carga eliminada');
  render();
}

/* ---------- SALES (products + mixes) ---------- */
function registerSale(e){
  e.preventDefault();
  const val = document.getElementById('saleItem').value; // "p:id" or "m:id"
  const qty = parseFloat(document.getElementById('saleQty').value);
  if(!val || isNaN(qty) || qty<=0) return;
  const [type, id] = val.split(':');

  if(type === 'p'){
    const p = state.products.find(x=>x.id===id);
    if(!p) return;
    if(qty > p.stock){ showToast(`No hay suficiente stock de "${p.name}" (quedan ${kg(p.stock)} kg)`); return; }
    p.stock = Math.round((p.stock - qty)*1000)/1000;
    const total = qty * p.price;
    state.sales.unshift({id: Date.now().toString(36), type:'p', refId: p.id, name: p.name, qty, unitPrice: p.price, total, date: new Date().toISOString()});
    showToast(`Venta registrada: ${kg(qty)} kg de ${p.name} — ${money(total)}`);
  } else {
    const mix = state.mixes.find(x=>x.id===id);
    if(!mix) return;
    // check stock for all components first
    for(const c of mix.components){
      const p = state.products.find(x=>x.id===c.productId);
      if(!p || (c.qtyPerUnit*qty) > p.stock){
        showToast(`No hay suficiente stock para armar "${mix.name}"`);
        return;
      }
    }
    mix.components.forEach(c=>{
      const p = state.products.find(x=>x.id===c.productId);
      p.stock = Math.round((p.stock - c.qtyPerUnit*qty)*1000)/1000;
    });
    const total = qty * mix.price;
    state.sales.unshift({id: Date.now().toString(36), type:'m', refId: mix.id, name: mix.name + ' (mix)', qty, unitPrice: mix.price, total, date: new Date().toISOString(), components: mix.components.map(c=>({productId:c.productId, qtyPerUnit:c.qtyPerUnit}))});
    showToast(`Venta registrada: ${kg(qty)} de ${mix.name} — ${money(total)}`);
  }

  saveData();
  document.getElementById('saleQty').value='';
  render();
}

function restoreSaleStock(sale){
  if(sale.type === 'p'){
    const p = state.products.find(x=>x.id===sale.refId) || state.products.find(x=>x.name===sale.name);
    if(p){ p.stock = Math.round((p.stock + sale.qty)*1000)/1000; }
  } else if(sale.type === 'm' && sale.components){
    sale.components.forEach(c=>{
      const p = state.products.find(x=>x.id===c.productId);
      if(p){ p.stock = Math.round((p.stock + c.qtyPerUnit*sale.qty)*1000)/1000; }
    });
  }
}
function deductSaleStock(sale, qty){
  if(sale.type === 'p'){
    const p = state.products.find(x=>x.id===sale.refId) || state.products.find(x=>x.name===sale.name);
    if(!p) return true;
    if(qty > p.stock) return false;
    p.stock = Math.round((p.stock - qty)*1000)/1000;
    return true;
  } else if(sale.type === 'm' && sale.components){
    for(const c of sale.components){
      const p = state.products.find(x=>x.id===c.productId);
      if(!p || (c.qtyPerUnit*qty) > p.stock) return false;
    }
    sale.components.forEach(c=>{
      const p = state.products.find(x=>x.id===c.productId);
      p.stock = Math.round((p.stock - c.qtyPerUnit*qty)*1000)/1000;
    });
    return true;
  }
  return true;
}

let editingSaleId = null;
function editSale(id){
  editingSaleId = (editingSaleId === id) ? null : id;
  render();
}
function cancelEditSale(){ editingSaleId = null; render(); }
function saveEditSale(id){
  const sale = state.sales.find(s=>s.id===id);
  if(!sale) return;
  const input = document.getElementById('editSaleQty_'+id);
  const newQty = parseFloat(input.value);
  if(isNaN(newQty) || newQty<=0){ showToast('Ingresá una cantidad válida'); return; }

  // revert old stock impact first, then try to apply new qty
  restoreSaleStock(sale);
  const ok = deductSaleStock(sale, newQty);
  if(!ok){
    // rollback: reapply original qty
    deductSaleStock(sale, sale.qty);
    showToast('No hay stock suficiente para esa cantidad');
    render();
    return;
  }
  sale.qty = newQty;
  sale.total = Math.round(newQty * sale.unitPrice);
  editingSaleId = null;
  saveData();
  showToast('Venta actualizada');
  render();
}
function deleteSale(id){
  const sale = state.sales.find(s=>s.id===id);
  if(!sale) return;
  if(!confirm(`¿Eliminar esta venta de "${sale.name}"? El stock se repone automáticamente.`)) return;
  restoreSaleStock(sale);
  state.sales = state.sales.filter(s=>s.id!==id);
  saveData();
  showToast('Venta eliminada y stock repuesto');
  render();
}

/* ---------- MIXES ---------- */
let editingMixId = null;
function addMixComponentRow(prefill){
  const wrap = document.getElementById('mixComponents');
  const row = document.createElement('div');
  row.className = 'mix-comp-row';
  const options = state.products.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('');
  row.innerHTML = `
    <select class="mix-comp-product">${options}</select>
    <input type="number" class="mix-comp-qty" placeholder="kg por unidad" min="0.01" step="0.01" value="${prefill && prefill.qtyPerUnit!=null ? prefill.qtyPerUnit : ''}">
    <button type="button" class="btn-ghost" onclick="this.parentElement.remove()">quitar</button>
  `;
  if(prefill && prefill.productId){
    row.querySelector('.mix-comp-product').value = prefill.productId;
  }
  wrap.appendChild(row);
}
function saveMix(){
  const name = document.getElementById('mixName').value.trim();
  const rows = document.querySelectorAll('#mixComponents .mix-comp-row');
  if(!name || rows.length === 0){ showToast('Poné un nombre y al menos un producto'); return; }
  const components = [];
  let price = 0;
  rows.forEach(row=>{
    const productId = row.querySelector('.mix-comp-product').value;
    const q = parseFloat(row.querySelector('.mix-comp-qty').value);
    if(productId && !isNaN(q) && q>0){
      components.push({productId, qtyPerUnit: q});
      const p = state.products.find(x=>x.id===productId);
      if(p) price += p.price * q;
    }
  });
  if(components.length===0){ showToast('Cargá al menos una cantidad válida'); return; }

  if(editingMixId){
    const mix = state.mixes.find(m=>m.id===editingMixId);
    if(mix){
      mix.name = name;
      mix.components = components;
      mix.price = Math.round(price);
      showToast(`Mix "${name}" actualizado`);
    }
    editingMixId = null;
  } else {
    state.mixes.push({id: Date.now().toString(36), name, components, price: Math.round(price)});
    showToast(`Mix "${name}" creado`);
  }

  saveData();
  document.getElementById('mixName').value='';
  document.getElementById('mixComponents').innerHTML = '';
  document.getElementById('mixFormTitle').textContent = 'Crear mix';
  document.getElementById('mixSaveBtn').textContent = 'Guardar mix';
  document.getElementById('mixCancelBtn').style.display = 'none';
  render();
}
function editMix(id){
  const mix = state.mixes.find(m=>m.id===id);
  if(!mix) return;
  editingMixId = id;
  switchView('mixes');
  document.getElementById('mixName').value = mix.name;
  document.getElementById('mixComponents').innerHTML = '';
  mix.components.forEach(c => addMixComponentRow(c));
  document.getElementById('mixFormTitle').textContent = 'Editar mix';
  document.getElementById('mixSaveBtn').textContent = 'Guardar cambios';
  document.getElementById('mixCancelBtn').style.display = 'inline-block';
  window.scrollTo(0,0);
}
function cancelEditMix(){
  editingMixId = null;
  document.getElementById('mixName').value='';
  document.getElementById('mixComponents').innerHTML = '';
  document.getElementById('mixFormTitle').textContent = 'Crear mix';
  document.getElementById('mixSaveBtn').textContent = 'Guardar mix';
  document.getElementById('mixCancelBtn').style.display = 'none';
}
function removeMix(id){
  if(!confirm('¿Eliminar este mix?')) return;
  state.mixes = state.mixes.filter(m=>m.id!==id);
  if(editingMixId === id) cancelEditMix();
  saveData(); render();
}

/* ---------- CAJA / CAPITAL ---------- */
function registerMovement(e){
  e.preventDefault();
  const desc = document.getElementById('movDesc').value.trim();
  const amount = parseFloat(document.getElementById('movAmount').value);
  if(!desc || isNaN(amount)) return;
  state.cajaMovements.unshift({id: Date.now().toString(36), desc, amount, date: new Date().toISOString()});
  saveData();
  document.getElementById('movDesc').value=''; document.getElementById('movAmount').value='';
  render();
}

let editingMovId = null;
function editMov(id){
  editingMovId = (editingMovId === id) ? null : id;
  render();
}
function cancelEditMov(){ editingMovId = null; render(); }
function saveEditMov(id){
  const mov = state.cajaMovements.find(m=>m.id===id);
  if(!mov) return;
  const descInput = document.getElementById('editMovDesc_'+id);
  const amountInput = document.getElementById('editMovAmount_'+id);
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  if(!desc || isNaN(amount)){ showToast('Completá descripción y monto'); return; }
  mov.desc = desc;
  mov.amount = amount;
  editingMovId = null;
  saveData();
  showToast('Movimiento actualizado');
  render();
}
function deleteMov(id){
  if(!confirm('¿Eliminar este movimiento?')) return;
  state.cajaMovements = state.cajaMovements.filter(m=>m.id!==id);
  saveData();
  showToast('Movimiento eliminado');
  render();
}

function exportBackup(){
  const dataStr = JSON.stringify(state, null, 2);
  const blob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const fecha = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = `cipamix-backup-${fecha}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Copia de seguridad descargada');
}

function importBackup(event){
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    let imported;
    try{
      imported = JSON.parse(e.target.result);
    }catch(err){
      showToast('El archivo no es una copia de seguridad válida');
      event.target.value = '';
      return;
    }
    const hasExpectedShape = imported && Array.isArray(imported.products) && Array.isArray(imported.sales);
    if(!hasExpectedShape){
      showToast('El archivo no tiene el formato esperado');
      event.target.value = '';
      return;
    }
    if(!confirm('Esto va a REEMPLAZAR todos los datos actuales por los de la copia de seguridad. ¿Continuar?')){
      event.target.value = '';
      return;
    }
    state = imported;
    if(!state.categories) state.categories = [];
    if(!state.products) state.products = [];
    if(!state.stockLoads) state.stockLoads = [];
    if(!state.sales) state.sales = [];
    if(!state.mixes) state.mixes = [];
    if(!state.cajaMovements) state.cajaMovements = [];
    saveData();
    event.target.value = '';
    showToast('Copia de seguridad restaurada');
    render();
  };
  reader.readAsText(file);
}

function resetAll(){
  if(!confirm('Esto borra TODOS los datos guardados (productos, ventas, mixes, caja). ¿Continuar?')) return;
  localStorage.removeItem('frutossecos_data');
  location.reload();
}

/* ---------- RENDER ---------- */
function renderStats(){
  const totalStockValue = state.products.reduce((s,p)=> s + p.price*p.stock, 0);
  const todayStr = new Date().toDateString();
  const todaySales = state.sales.filter(s => new Date(s.date).toDateString() === todayStr);
  const todayTotal = todaySales.reduce((s,x)=> s + x.total, 0);
  const lowCount = state.products.filter(isLow).length;

  document.getElementById('statRow').innerHTML = `
    <div class="stat"><div class="num">${state.products.length}</div><div class="label">productos</div></div>
    <div class="stat"><div class="num">${money(totalStockValue)}</div><div class="label">valor del stock</div></div>
    <div class="stat"><div class="num">${money(todayTotal)}</div><div class="label">vendido hoy</div></div>
    <div class="stat"><div class="num" style="color:${lowCount>0?'var(--danger)':'var(--olive-dark)'}">${lowCount}</div><div class="label">con poco stock</div></div>
  `;

  const salesTotal = state.sales.reduce((s,x)=>s+x.total,0);
  const movTotal = state.cajaMovements.reduce((s,x)=>s+x.amount,0);
  const balance = salesTotal + movTotal;
  document.getElementById('cajaStatRow').innerHTML = `
    <div class="stat"><div class="num">${money(salesTotal)}</div><div class="label">total ventas</div></div>
    <div class="stat"><div class="num">${money(movTotal)}</div><div class="label">movimientos manuales</div></div>
    <div class="stat"><div class="num" style="color:var(--walnut-dark)">${money(balance)}</div><div class="label">balance / caja</div></div>
  `;
}

function render(){
  // categories select + list
  const newCat = document.getElementById('newCat');
  newCat.innerHTML = state.categories.map(c=>`<option value="${c.id}">${c.letter} — ${escapeHtml(c.name)}</option>`).join('');

  document.getElementById('catList').innerHTML = state.categories.map(c=>`
    <span class="cat-pill">
      <span class="badge" style="background:${c.color}; width:18px;height:18px;font-size:9.5px;">${c.letter}</span>
      ${escapeHtml(c.name)}
      <button class="btn-ghost" onclick="removeCategory('${c.id}')">x</button>
    </span>
  `).join('') || '<div class="empty">Sin categorías</div>';

  // inventory table (search + pagination)
  const body = document.getElementById('inventoryBody');
  const empty = document.getElementById('emptyInv');

  const term = (searchTerm || '').trim().toLowerCase();
  const filtered = term
    ? state.products.filter(p => p.name.toLowerCase().includes(term))
    : state.products;

  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if(currentPage > totalPages) currentPage = totalPages;
  if(currentPage < 1) currentPage = 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  if(filtered.length===0){ body.innerHTML=''; empty.style.display='block'; }
  else{
    empty.style.display='none';
    body.innerHTML = pageItems.map(p=>{
      const cat = catFor(p.catId);
      return `
      <tr class="${isLow(p)?'low-stock':''}">
        <td>
          <div class="prod-name">
            ${cat ? `<span class="badge" style="background:${cat.color}">${cat.letter}</span>` : ''}
            ${escapeHtml(p.name)}
            ${isLow(p) ? '<span class="low-badge">POCO STOCK</span>' : ''}
          </div>
        </td>
        <td><input type="number" min="0" step="1" value="${p.price}" style="width:90px" onchange="updatePrice('${p.id}', this.value)"></td>
        <td><input type="number" min="0" step="0.1" value="${p.stock}" style="width:70px; text-align:center;" onchange="updateStockDirect('${p.id}', this.value)"></td>
        <td><input type="number" min="0" step="0.1" value="${p.minStock != null ? p.minStock : LOW_STOCK_THRESHOLD}" style="width:65px; text-align:center;" onchange="updateMinStock('${p.id}', this.value)"></td>
        <td><button class="btn-ghost" onclick="removeProduct('${p.id}')">quitar</button></td>
      </tr>`;
    }).join('');
  }

  renderPagination(totalPages);

  // stock load product select
  document.getElementById('loadProduct').innerHTML = state.products.map(p=>`<option value="${p.id}">${escapeHtml(p.name)} (stock: ${kg(p.stock)} kg)</option>`).join('');

  // stock load history
  const loadLog = document.getElementById('loadLog');
  const emptyLoads = document.getElementById('emptyLoads');
  if(state.stockLoads.length===0){ loadLog.innerHTML=''; emptyLoads.style.display='block'; }
  else{
    emptyLoads.style.display='none';
    loadLog.innerHTML = state.stockLoads.slice(0,40).map(l=>{
      if(editingLoadId === l.id){
        return `
        <div class="edit-row">
          <span class="edit-label">${escapeHtml(l.productName)}</span>
          <input type="number" id="editLoadQty_${l.id}" min="0.01" step="0.01" value="${l.qty}">
          <button class="btn-primary" style="padding:5px 10px;" onclick="saveEditLoad('${l.id}')">Guardar</button>
          <button class="btn-outline" style="padding:5px 10px;" onclick="cancelEditLoad()">Cancelar</button>
        </div>`;
      }
      return `
      <div class="log-row">
        <div>${escapeHtml(l.productName)}<div class="log-meta">${formatDate(l.date)}</div></div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="amt-pos">+${kg(l.qty)} kg</div>
          <div class="log-actions">
            <button class="icon-btn" title="Editar" onclick="editLoad('${l.id}')">✎</button>
            <button class="icon-btn danger" title="Eliminar" onclick="deleteLoad('${l.id}')">✕</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  // sale item select: products + mixes
  const saleSel = document.getElementById('saleItem');
  const prevVal = saleSel.value;
  let opts = state.products.map(p=>`<option value="p:${p.id}">${escapeHtml(p.name)} — ${money(p.price)}/kg (stock: ${kg(p.stock)} kg)</option>`).join('');
  if(state.mixes.length){
    opts += state.mixes.map(m=>`<option value="m:${m.id}">${escapeHtml(m.name)} (mix) — ${money(m.price)}/unidad</option>`).join('');
  }
  saleSel.innerHTML = opts;
  if(prevVal) saleSel.value = prevVal;

  // sale log
  const saleLog = document.getElementById('saleLog');
  const emptySales = document.getElementById('emptySales');
  if(state.sales.length===0){ saleLog.innerHTML=''; emptySales.style.display='block'; }
  else{
    emptySales.style.display='none';
    saleLog.innerHTML = state.sales.slice(0,40).map(s=>{
      if(editingSaleId === s.id){
        return `
        <div class="edit-row">
          <span class="edit-label">${escapeHtml(s.name)}</span>
          <input type="number" id="editSaleQty_${s.id}" min="0.01" step="0.01" value="${s.qty}">
          <button class="btn-primary" style="padding:5px 10px;" onclick="saveEditSale('${s.id}')">Guardar</button>
          <button class="btn-outline" style="padding:5px 10px;" onclick="cancelEditSale()">Cancelar</button>
        </div>`;
      }
      return `
      <div class="log-row">
        <div>${escapeHtml(s.name)} — ${kg(s.qty)}<div class="log-meta">${formatDate(s.date)}</div></div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="amt-pos">${money(s.total)}</div>
          <div class="log-actions">
            <button class="icon-btn" title="Editar" onclick="editSale('${s.id}')">✎</button>
            <button class="icon-btn danger" title="Eliminar" onclick="deleteSale('${s.id}')">✕</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  // mixes list
  const mixList = document.getElementById('mixList');
  const emptyMixes = document.getElementById('emptyMixes');
  if(state.mixes.length===0){ mixList.innerHTML=''; emptyMixes.style.display='block'; }
  else{
    emptyMixes.style.display='none';
    mixList.innerHTML = state.mixes.map(m=>`
      <div class="panel" style="margin-bottom:10px; background:var(--bg);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>${escapeHtml(m.name)}</strong>
          <div>
            <span style="margin-right:10px; color:var(--ink-soft); font-size:12.5px;">${money(m.price)}/unidad</span>
            <button class="btn-ghost" style="color:var(--ink-soft);" onclick="editMix('${m.id}')">editar</button>
            <button class="btn-ghost" onclick="removeMix('${m.id}')">eliminar</button>
          </div>
        </div>
        <div style="margin-top:6px; font-size:12.5px; color:var(--ink-soft);">
          ${m.components.map(c=>{
            const p = state.products.find(x=>x.id===c.productId);
            return p ? `${escapeHtml(p.name)}: ${kg(c.qtyPerUnit)} kg` : '';
          }).join(' · ')}
        </div>
      </div>
    `).join('');
  }

  // caja log
  const cajaLog = document.getElementById('cajaLog');
  const emptyCaja = document.getElementById('emptyCaja');
  const combined = [
    ...state.sales.map(s=>({kind:'venta', desc: `Venta: ${s.name}`, amount: s.total, date: s.date})),
    ...state.cajaMovements.map(m=>({kind:'mov', id: m.id, desc: m.desc, amount: m.amount, date: m.date}))
  ].sort((a,b)=> new Date(b.date) - new Date(a.date));
  if(combined.length===0){ cajaLog.innerHTML=''; emptyCaja.style.display='block'; }
  else{
    emptyCaja.style.display='none';
    cajaLog.innerHTML = combined.slice(0,50).map(m=>{
      if(m.kind === 'mov' && editingMovId === m.id){
        return `
        <div class="edit-row">
          <input type="text" id="editMovDesc_${m.id}" value="${escapeHtml(m.desc)}" style="flex:1;">
          <input type="number" id="editMovAmount_${m.id}" step="1" value="${m.amount}">
          <button class="btn-primary" style="padding:5px 10px;" onclick="saveEditMov('${m.id}')">Guardar</button>
          <button class="btn-outline" style="padding:5px 10px;" onclick="cancelEditMov()">Cancelar</button>
        </div>`;
      }
      return `
      <div class="log-row">
        <div>${escapeHtml(m.desc)}<div class="log-meta">${formatDate(m.date)}${m.kind==='venta' ? ' · editar desde Ventas' : ''}</div></div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="${m.amount>=0?'amt-pos':'amt-neg'}">${m.amount>=0?'+':''}${money(m.amount)}</div>
          ${m.kind === 'mov' ? `
          <div class="log-actions">
            <button class="icon-btn" title="Editar" onclick="editMov('${m.id}')">✎</button>
            <button class="icon-btn danger" title="Eliminar" onclick="deleteMov('${m.id}')">✕</button>
          </div>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  renderStats();
}

render();

/* ================= GOOGLE DRIVE SYNC ================= */
const GOOGLE_CLIENT_ID = '706708036465-bj73qo1ifpkma6s8rrfcnh4n1ongn66s.apps.googleusercontent.com';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const DRIVE_FILENAME = 'cipamix-data.json';

let driveTokenClient = null;
let driveAccessToken = null;
let driveFileId = null;
let driveSyncTimer = null;
let driveSyncing = false;

function setDriveStatus(text){
  const el = document.getElementById('driveStatus');
  if(el) el.textContent = text;
}

function connectDrive(){
  if(!window.google || !google.accounts || !google.accounts.oauth2){
    showToast('Google todavía no cargó, esperá un segundo y probá de nuevo');
    return;
  }
  if(!driveTokenClient){
    driveTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: DRIVE_SCOPE,
      callback: async (resp) => {
        if(resp.error){
          setDriveStatus('☁ No se pudo conectar');
          showToast('No se pudo conectar con Google Drive');
          return;
        }
        driveAccessToken = resp.access_token;
        setDriveStatus('☁ Conectando...');
        await driveInitialSync();
      }
    });
  }
  driveTokenClient.requestAccessToken({ prompt: driveAccessToken ? '' : 'consent' });
}

async function driveApiFetch(url, options){
  options = options || {};
  options.headers = Object.assign({}, options.headers, {
    'Authorization': 'Bearer ' + driveAccessToken
  });
  return fetch(url, options);
}

async function driveFindFile(){
  const q = encodeURIComponent(`name='${DRIVE_FILENAME}' and trashed=false`);
  const res = await driveApiFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&spaces=drive&fields=files(id,name,modifiedTime)`);
  if(!res.ok) throw new Error('No se pudo buscar el archivo en Drive');
  const data = await res.json();
  return (data.files && data.files.length) ? data.files[0] : null;
}

async function driveDownloadFile(fileId){
  const res = await driveApiFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
  if(!res.ok) throw new Error('No se pudo descargar el archivo de Drive');
  return res.json();
}

async function driveCreateFile(contentObj){
  const boundary = 'cipamix_boundary';
  const metadata = { name: DRIVE_FILENAME, mimeType: 'application/json' };
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(contentObj)}\r\n` +
    `--${boundary}--`;
  const res = await driveApiFetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body
  });
  if(!res.ok) throw new Error('No se pudo crear el archivo en Drive');
  const data = await res.json();
  return data.id;
}

async function driveUpdateFile(fileId, contentObj){
  const res = await driveApiFetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contentObj)
  });
  if(!res.ok) throw new Error('No se pudo actualizar el archivo en Drive');
}

async function driveInitialSync(){
  try{
    const existing = await driveFindFile();
    if(existing){
      driveFileId = existing.id;
      const remoteData = await driveDownloadFile(driveFileId);
      const hasLocalData = state.products.length || state.sales.length || state.stockLoads.length || state.mixes.length || state.cajaMovements.length;
      const hasRemoteData = remoteData && (remoteData.products||[]).length;
      if(hasLocalData && !hasRemoteData){
        await driveUpdateFile(driveFileId, state);
      } else if(remoteData && (hasRemoteData || !hasLocalData)){
        state = remoteData;
        if(!state.categories) state.categories = [];
        if(!state.products) state.products = [];
        if(!state.stockLoads) state.stockLoads = [];
        if(!state.sales) state.sales = [];
        if(!state.mixes) state.mixes = [];
        if(!state.cajaMovements) state.cajaMovements = [];
        localStorage.setItem('frutossecos_data', JSON.stringify(state));
        render();
      }
    } else {
      driveFileId = await driveCreateFile(state);
    }
    setDriveStatus('☁ Conectado — se guarda solo');
    showToast('Conectado a Google Drive');
  } catch(err){
    console.error(err);
    setDriveStatus('☁ Error de conexión');
    showToast('Hubo un problema conectando con Drive');
  }
}

function scheduleDriveSync(){
  if(!driveAccessToken || !driveFileId) return;
  clearTimeout(driveSyncTimer);
  driveSyncTimer = setTimeout(async () => {
    if(driveSyncing) return;
    driveSyncing = true;
    try{
      await driveUpdateFile(driveFileId, state);
      setDriveStatus('☁ Guardado ' + new Date().toLocaleTimeString('es-AR', {hour:'2-digit', minute:'2-digit'}));
    } catch(err){
      console.error(err);
      setDriveStatus('☁ Error al guardar');
    } finally {
      driveSyncing = false;
    }
  }, 1200);
}
