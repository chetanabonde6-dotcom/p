export function pct(a:number,b:number){return b>0?((a/b)*100).toFixed(1)+"%":"N/A"}
export function date(v?:string){if(!v)return "Unavailable";const d=new Date(v);return Number.isNaN(d.getTime())?"Unavailable":d.toLocaleString()}
export function text(v:unknown){return v===null||v===undefined||v===""?"Unavailable":String(v)}
