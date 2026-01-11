import {React,useEffect,useContext,useState, act} from "react";
import "./Sidebar.css"; // Create a CSS file for styling
import { createPage,fetchPages,updateName} from "../api/pageApi";
import { AuthContext } from "../utils/AuthContext";
import { Home, Edit  } from "lucide-react"
import { Link } from "react-router-dom";

export default function Sidebar() {
   const {user,setActivePage,activePage} = useContext(AuthContext);
   const [pages,setPages] = useState([])
   console.log("Active Page:", activePage);

    const getPages = async () => {
    try {
      const pages = await fetchPages(user.id);
      setPages(pages.data.pages);
    } catch (err) {
      console.error("Error fetching pages:", err);
    }
  };

   useEffect(() => {
 

  getPages();
}, []);

   const createNew = async () => {
       await createPage({page_name:'Untitled',createdBy:user.id})
       getPages();
   }

   const editable = async (e,page_id) => {
       //  make it editable
       e.stopPropagation();
       e.preventDefault();
         const pageItem = e.target.closest('.sidebar-item').querySelector('span');
            const currentName = pageItem.innerText;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentName.replace('🗂️ ', '');
            input.className = 'edit-input';
            pageItem.innerText = '';
            pageItem.appendChild(input);
            input.focus();

            input.addEventListener('blur', async () => {
                const newName = input.value.trim() || 'Untitled';
                pageItem.innerText = `🗂️ ${newName}`;
                let pageId = page_id
                await updateName(pageId,newName);
                console.log(newName)
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    input.blur();
                }
            });
   }

    return (
        <aside className="sidebar">
            <ul className="sidebar-menu">
                <li className="sidebar-item">
                    <a href="#home" className="sidebar-link flex items-center gap-2"><Home size={14}/> Home</a>
                </li>
                <li className="sidebar-item"  onClick={createNew}>
                    <button className="sidebar-link new-page-btn">+ New Page</button>
                </li>
                {
                pages.map((page)=>(
                  <li
  className={`sidebar-item ${activePage === page.page_name ? "active" : ""}`}
  key={page._id}
>
                    <Link className="sidebar-link flex items-center justify-between gap-2" onClick={()=>{setActivePage(page.page_name)}} to={`/page/${page._id}`}>
 
  <span>🗂️ {page.page_name}</span>
  <Edit size={14} onClick={(e)=>{editable(e,page._id)}} />
</Link>

                </li>
                ))
                }
            </ul>
        </aside>
    );
}
