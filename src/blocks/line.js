export const Line = ({block,deleteBlock})=>{
   
    return <div key={block.id} className="text-block flex-1 w-full bg-black text-white rounded-md p-3 mt-3 flex flex-col justify-between">
        <hr className="w-full border-gray-600" />

        <span
          className="mr-3 cursor-pointer hover:text-red-500 self-end"
          onClick={(e) => {
            e.target.parentElement.remove(); deleteBlock(block.id);
          }}
        >
          🗑️
        </span>
    </div>
}