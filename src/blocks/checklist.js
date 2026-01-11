import { useState } from "react";

export const Checklist = ({block,updateBlock,deleteBlock}) => {
  const [items, setItems] = useState([{ id: Date.now(), text: "" ,status:false}]);
  if(typeof block.content === 'string' && block.type==='checklist' ){
    block.content = JSON.parse(block.content);
    setItems(block.content);
  }

  const updateText = (id, value) => {
  setItems(prev => {
    const nextItems = prev.map(item =>
      item.id === id ? { ...item, text: value } : item
    );

    updateBlock({ id: block.id, content: nextItems });
    return nextItems;
  });
};


const updateStatus = (id, checked) => {
  setItems(prev => {
    const nextItems = prev.map(item =>
      item.id === id ? { ...item, status: checked } : item
    );

    updateBlock({ id: block.id, content: nextItems });
    return nextItems;
  });
};

  const deleteItem = (id) => {

    setItems(prev => {
      const nextItems = prev.filter(item => item.id !== id);
      updateBlock({ id: block.id, content: nextItems });
      return nextItems;
    })

  };

  const addItem = () => {
    setItems(prev => {
      const nextItems = [...prev, { id: Date.now(), text: "" }];
      updateBlock({ id: block.id, content: nextItems });
      return nextItems;
    });

  };

  return (
    <div className="checklist-block w-full bg-black text-white rounded-md p-3 mt-3">
        <div className="mb-5"><b>To Do List</b></div> <span
          className="mr-3 ml-3 cursor-pointer hover:text-red-500"
          onClick={(e) => {
            e.target.parentElement.remove();
            deleteBlock(block.id);
          }}
        >
          🗑️
        </span>
      {items.map((item) => (
        <div
          key={item.id}
          className="checklist-item flex items-center mb-2"
        >
          <input type="checkbox" className="mr-3 w-4 h-4" checked={item.status} onClick={(e)=>{updateStatus(item.id,e.target.checked)}} />

          <input
            type="text"
            value={item.text}
            onChange={(e) => updateText(item.id, e.target.value)}
            className="flex-1 bg-black text-white border-b border-gray-600 focus:outline-none"
            placeholder="To-do item..."
          />

          <span
            className="ml-3 cursor-pointer hover:text-red-500"
            onClick={() => deleteItem(item.id)}
          >
            🗑️
          </span>
        </div>
      ))}

      <button
        onClick={addItem}
        className="add-check-item text-sm mt-2 p-1 bg-gray-800 rounded-md"
      >
        + Add Item
      </button>
       
    </div>
  );
};
