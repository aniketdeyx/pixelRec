import { XataClient } from "@/xata";
import { drizzle } from "drizzle-orm/xata-http";


const xata = new XataClient();
export const db = drizzle(xata)
