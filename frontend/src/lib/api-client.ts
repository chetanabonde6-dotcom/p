// Provisional adapter: backend team must approve endpoints and payloads before live use.
import type {ScanRequest,ScanResponse} from "@/types/api";
export const base=process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/,"") || "";
export class ApiError extends Error{constructor(message:string,public status?:number){super(message);this.name="ApiError"}}
export async function request<T>(path:string,options:RequestInit={},timeout=12000):Promise<T>{
 if(!base)throw new ApiError("Backend URL not configured. Set NEXT_PUBLIC_API_BASE_URL.");
 const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),timeout);
 try{const res=await fetch(base+path,{...options,credentials:"include",headers:{"Accept":"application/json",...(options.body?{"Content-Type":"application/json"}:{}),...options.headers},signal:ctrl.signal,cache:"no-store"});
 if(!res.ok)throw new ApiError(res.status===401||res.status===403?"Access denied. Sign in with an authorized account.":`Backend returned HTTP ${res.status}`,res.status);
 const data:unknown=await res.json();return data as T;
 }catch(e){if(e instanceof ApiError)throw e;throw new ApiError(e instanceof Error&&e.name==="AbortError"?"Backend timed out.": "Cannot reach backend. Check URL, CORS, and service status.");}finally{clearTimeout(timer)}
}
export const api={scan:(body:ScanRequest)=>request<ScanResponse>("/api/v1/scan",{method:"POST",body:JSON.stringify(body)}),get:<T>(path:string)=>request<T>(path),post:<T>(path:string,body:unknown)=>request<T>(path,{method:"POST",body:JSON.stringify(body)}),put:<T>(path:string,body:unknown)=>request<T>(path,{method:"PUT",body:JSON.stringify(body)})};
