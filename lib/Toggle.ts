import { create } from 'zustand'

interface sidebar{
    toogled:boolean,
    open:()=>void,
    close:()=>void
}
  const sidebarSlice  = create<sidebar>((set) => ({
    toogled: true,
    open:()=> set({toogled:false}),
    close:()=>set({toogled:true})
}))
export default sidebarSlice;