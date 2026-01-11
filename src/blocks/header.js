import  { useEffect, useState } from "react";
export const Header = ({ block, updateBlock,deleteBlock })=>{
    const [value,setValue] = useState('Add Your Heading')
    useEffect(()=>{
         if(block.content){
        setValue(block.content)
    }
    },[])
 


    return <div className="text-block w-full bg-black text-white rounded-md p-3 mt-3 flex items-start">
        <textarea 
          className="w-full h-15 text-2xl bg-black rounded-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder={value} value={value}
          onChange={  (e)=>{  setValue(e.target.value);updateBlock({ id: block.id, content: e.target.value })}}
        ></textarea>

        <span
          className="mr-3 ml-3 cursor-pointer hover:text-red-500"
          onClick={(e) => {
            e.target.parentElement.remove();
            deleteBlock(block.id);
          }}
        >
          🗑️
        </span>
    </div>
}