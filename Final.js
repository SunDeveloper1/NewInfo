import React ,{useState,useRef, useEffect} from 'react'
import { select } from 'underscore';


function NewEdit() {

    const [content, setContent] = useState(
        "The order with id <%=ordernumber%> has been placed at <%=createdat%>"
      );
      const divRef = useRef(null);
      const regex = /\<\%\=(.*?)\%\>/g;
      useEffect(()=>{
        const newContent = content.replace(regex, (match, placeholder) => {
          const select = document.createElement("select");
          select.setAttribute("class","selectedItem")
          const option1=document.createElement("option")
          const option2=document.createElement("option");
          option1.setAttribute("value","Ram")
          option2.setAttribute("value","Shyam")
          option1.innerText="Ram"
          option2.innerText="Shyam"
          select.appendChild(option1)
          select.appendChild(option2);

          option1.addEventListener("click",()=>{
            console.log("changed")
          })
          return select.outerHTML; // Replace placeholder with empty string in content
        });
        setContent(newContent);
        // console.log("elements",document.querySelectorAll(".selectedItem").forEach(element=>{
        //   return element.selectedOptions[0].innerText
        // }))
        document.querySelectorAll(".selectedItem")?.forEach(element=>{

          element.addEventListener("click",(e)=>{
            console.log("changed")
            element.setAttribute("value",e.target.value)

          });

        })

       

       
      },[content])

      const handleInput=()=>{
        
        //content accessing
      //  const events=document.querySelector('.selectedItem')?.addEventListener("change",(event)=>{
      //     console.log("value==",event.target.value)
      //  })

        let innerContent=divRef.current.innerHTML
          console.log("innerContent",innerContent)
          let regex='/$/g'
        if(innerContent.includes("$")){
        const newContent = innerContent.replace('$', (match, placeholder) => {
          const select = document.createElement("select");
          select.setAttribute("class","selectedItem")
          const option1=document.createElement("option")
          const option2=document.createElement("option");
          option1.setAttribute("value","Noida")
          option2.setAttribute("value","Chennai")
          option1.innerText="Noida"
          option2.innerText="Chennai"
          select.appendChild(option1)
          select.appendChild(option2);
          return select.outerHTML; // Replace placeholder with empty string in content
        });
        setContent(newContent)
      }
        
      }
      const handleClick = () => {

        const selects=document.querySelectorAll("select")
        console.log("select",selects)
        selects.forEach(select=>{
          console.log("innerSekect",select)
          select.replaceWith(select.value)
        })
        // let content1=divRef.current
        // // const selectedItems=document.querySelectorAll(".selectedItem")?.forEach(element=>{
        // //   console.log("element",element)
        // // })
        // // 
        // const parser=new DOMParser();
        // const doc=parser.parseFromString(content1,'text/html')
        // console.log("doc",doc)
        // const selects=doc.querySelectorAll("select")
        // console.log("selected",selects)
        // selects.forEach(select=>{
        //   select.replaceWith(select.value)
        // })
        // const newString = doc;
        // console.log(newString)
        }
      
  return (
    <>
    <div
        className='editor'
        id="editor"
        ref={divRef}
        contentEditable="true"
        onInput={handleInput}
        dangerouslySetInnerHTML={{
            __html:content
        }}
    >

    </div>
    <button className='btn' onClick={handleClick}>Save</button>
    </>
  )
}

export default NewEdit
