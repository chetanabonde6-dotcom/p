"use client";
import {useEffect,useState,useCallback} from "react";import {api} from "@/lib/api-client";
export function useRemote<T>(path:string){const [data,setData]=useState<T|null>(null),[busy,setBusy]=useState(true),[error,setError]=useState("");const reload=useCallback(async()=>{setBusy(true);setError("");try{setData(await api.get<T>(path))}catch(e){setData(null);setError(e instanceof Error?e.message:"Request failed")}finally{setBusy(false)}},[path]);useEffect(()=>{void reload()},[reload]);return {data,busy,error,reload}}
export function State({busy,error,empty}:{busy:boolean;error:string;empty?:boolean}){if(busy)return <div role="status" className="empty">Loading backend data…</div>;if(error)return <div role="alert" className="error">{error}</div>;if(empty)return <div className="empty">No records available.</div>;return null}
export function Heading({title,description}:{title:string;description:string}){return <div className="mb-7"><h1>{title}</h1><p className="muted mt-2">{description}</p></div>}
export function Notice(){return <p className="text-xs text-amber-300 mt-3">Provisional API mapping: endpoints and response fields require backend confirmation.</p>}
