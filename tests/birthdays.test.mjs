import test from "node:test";
import assert from "node:assert/strict";
import { createCelebration, readCelebration, storageKey, addBirthday } from "../docs/birthday-local.js";
const date = new Date("2026-10-02T16:00:00Z");
test("personal greeting accepts today and rejects another date", () => {
  assert.equal(createCelebration({name:"Venkatarathi",month:10,day:2},date).name,"Venkatarathi");
  assert.throws(()=>createCelebration({name:"Venkatarathi",month:10,day:3},date));
  assert.throws(()=>createCelebration({name:"<script>",month:10,day:2},date));
});
test("saved greeting survives reload but expires at Eastern midnight", () => {
  const map=new Map(); const storage={getItem:k=>map.get(k),removeItem:k=>map.delete(k)};
  map.set(storageKey,JSON.stringify(createCelebration({name:"Venkatarathi",month:10,day:2},date)));
  assert.equal(readCelebration(storage,new Date("2026-10-03T03:59:59Z")).birthdays[0].name,"Venkatarathi");
  assert.equal(readCelebration(storage,new Date("2026-10-03T04:00:00Z")),null);
  assert.equal(map.size,0);
});
test("multiple birthdays append, deduplicate, persist, and expire together",()=>{
  let record = null;
  for(const name of ["Alex","Morgan","Taylor","Sam"]) record=addBirthday(record,{name,month:10,day:2},date);
  assert.equal(record.birthdays.length,4);
  assert.throws(()=>addBirthday(record,{name:"alex",month:10,day:2},date));
  const storage={getItem:()=>JSON.stringify(record),removeItem:()=>{}};
  assert.equal(readCelebration(storage,date).birthdays.length,4);
  assert.equal(readCelebration(storage,new Date("2026-10-03T04:00:00Z")),null);
});
test("corrupt or unavailable browser storage fails safely",()=>{
  assert.equal(readCelebration({getItem:()=>"bad-json"},date),null);
  assert.equal(readCelebration({getItem:()=>{throw Error("blocked");}},date),null);
});
