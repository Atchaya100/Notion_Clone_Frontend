import  { useRef } from "react";
export const Text = ({ block, updateBlock,deleteBlock }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div className="text-block w-full bg-black text-white rounded-md p-3 mt-3 flex items-start">
      <textarea
        ref={textareaRef}
        value={block.content}
        onChange={(e) =>
          updateBlock({ id: block.id, content: e.target.value })
        }
        onInput={handleInput}
        className="w-full h-15 bg-black rounded-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder="Add your text here..."
      />

      <span
        className="mr-3 ml-3 cursor-pointer hover:text-red-500"
        onClick={ (e) => {console.log(e); e.target.parentElement.remove(); deleteBlock(block.id);}}
      >
        🗑️
      </span>
    </div>
  );
};
