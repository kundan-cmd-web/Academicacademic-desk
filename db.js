const DB='academic-desk',VERSION=1;
function open(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,VERSION);r.onupgradeneeded=()=>{const d=r.result;['events','submissions','queue','settings'].forEach(n=>d.objectStoreNames.contains(n)||d.createObjectStore(n,{keyPath:'id'}))};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function store(name,mode='readonly'){const db=await open();const tx=db.transaction(name,mode);return [tx.objectStore(name),tx]}
export async function all(name){const[s,t]=await store(name);return new Promise((res,rej)=>{const r=s.getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);t.oncomplete=()=>t.db.close()})}
export async function put(name,value){const[s,t]=await store(name,'readwrite');s.put(value);return new Promise((res,rej)=>{t.oncomplete=()=>{t.db.close();res(value)};t.onerror=()=>rej(t.error)})}
export async function remove(name,id){const[s,t]=await store(name,'readwrite');s.delete(id);return new Promise((res,rej)=>{t.oncomplete=()=>{t.db.close();res()};t.onerror=()=>rej(t.error)})}
export async function clear(name){const[s,t]=await store(name,'readwrite');s.clear();return new Promise((res,rej)=>{t.oncomplete=()=>{t.db.close();res()};t.onerror=()=>rej(t.error)})}
