import {useState, useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Header } from "../blocks/header";
import { Text } from "../blocks/text";
import { Checklist } from "../blocks/checklist";
import { Line } from "../blocks/line";
import { saveOrUpdateBlock,fetchBlocks,deleteBlockById } from "../api/blockApi";

const Page = () => {
    const { pageId } = useParams();
    const [blocks, setBlocks] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const dirtyRef = useRef({});
    const blocksRef = useRef(blocks);
    useEffect(() => {
  blocksRef.current = blocks;

}, [blocks]);
    const viewOptions = () => {
        setShowOptions(!showOptions);
    }
 


useEffect(() => {
  fetchBlocks(pageId).then((res) => {
    if (res.status === 200) {
    console.log(res.data.blocks)
      setBlocks(res.data.blocks);
    }
  });
}, [pageId]);

useEffect(() => {
  if (blocks.length === 0) return;

  
  const timeout = setTimeout(() => {
    savePage(blocks);
  }, 800);

  return () => clearTimeout(timeout);
}, [blocks]);
 
const createLine = () => {
    const id=Date.now() + Math.random();
    setBlocks((prevBlocks) => [...prevBlocks, {type:'line', id:id,content:'line'}]);
    dirtyRef.current = { ...dirtyRef.current, [id]: true };
    viewOptions()

}

const createHeadBlock = () => {
  setBlocks((prevBlocks) => [...prevBlocks, {type:'heading', id:Date.now() + Math.random()}]);
  viewOptions()
}

const createTextBlock = () => {
  setBlocks(prev => [
    ...prev,
    { type: "text", id: Date.now() + Math.random() },
  ]);
  viewOptions();
};


const savePage = async () =>{
  const dirtyBlocks = blocksRef.current.filter(block => dirtyRef.current[block.id]);

  if(dirtyBlocks.length === 0) return;


  for(let block of dirtyBlocks){
    if(block.type==='checklist'){
      block.content = JSON.stringify(block.content);
    }
    let res = await saveOrUpdateBlock({ ...block, pageId: pageId });
    if(res.status === 200){
            console.log(res.data)
        }
        else{
            console.log(res.data.error)
            
        }
    delete dirtyRef.current[block.id];  
  }
}






const createcheckListBlock = () => {
    setBlocks((prevBlocks) => [...prevBlocks, {type:'checklist', id:prevBlocks.length+1}]);
  viewOptions();
};


const getComponentData = (data)=>{
  // from child components
  setBlocks((prevBlocks) =>
    prevBlocks.map((block) =>
      block.id === data.id ? { ...block, content: data.content } : block
    )
  );
  // set dirty here
  dirtyRef.current = { ...dirtyRef.current, [data.id]: true };
}

const deleteBlock = (id)=>{
  console.log("id to delete",id);
  deleteBlockById(id,pageId).then((res)=>{
    if(res.status === 200){
      console.log("Block deleted successfully");
    }
  });
}



    return (
  <div className="flex h-screen ml-64">

    <Sidebar />

    <div className="flex-1 p-4 relative">

      {/* Page content scrollable */}
      <div className="pageContent w-full">

      {blocks.map((block) => (
        
        <div key={block.id} className="my-2">
          {block.type === 'text' && <Text
      key={block.id}
      block={block}
      updateBlock={getComponentData} deleteBlock={deleteBlock} 
    />}
          {block.type === 'heading' && <Header key={block.id} block={block}
      updateBlock={getComponentData} deleteBlock={deleteBlock} />}
          {block.type === 'checklist' && <Checklist key={block.id} block={block}
      updateBlock={getComponentData} deleteBlock={deleteBlock}  />}
          {block.type === 'line' && <Line key={block.id}  block={block} deleteBlock={deleteBlock} /> }
        </div>
      ))}

        
      </div>

      {/* + Button Outside */}
      <button 
        onClick={viewOptions}
        className="bg-white rounded-sm p-2 text-black shadow"
      >
        +
      </button>

      {/* Options Menu */}
      {showOptions && (    
      <div 
        id="options" 
        className="bg-white p-2 m-1 rounded shadow text-black w-40"
      >
        <ul>
          <li className="border-b p-1" onClick={createTextBlock}>Text</li>
          <li className="border-b p-1" onClick={createHeadBlock}>Heading</li>
          <li className="border-b p-1" onClick={createLine}>Line</li>
          <li className="border-b p-1" onClick={createcheckListBlock}>To-Do List</li>
        </ul>
      </div>
        )}

    </div>
  </div>
);


}

export default Page;