import React ,{ useState} from 'react'
import _ from 'underscore'
export default function Home() {
  const [content,setContent]=useState("The order with id <%=ordernumber%> has been placed at <%=createdat%>")
  
  const btncreator=()=>{
    let btn=document.createElement("select")
    btn.id=(Math.random()).toString()
    btn.className="selectbox"
    let option=document.createElement("option")
    option.text="Select"
    option.setAttribute("value", "vivek");
    let option2=document.createElement("option")
    option2.setAttribute("value", "bablu");
    option2.text="Select1"
    btn.appendChild(option2)

    return btn

}


  const handleChange=(e)=>{
    let value=_.unescape(e.target.innerHTML);
    console.log("initalvalue",value)

    let varArr=value.match(/<%=[A-Za-z0-9_.]+%>/g)

    if(varArr && varArr.length >0){
        
      varArr.forEach((variable,index)=>{
        let selectbtn=document.createElement("select")
        selectbtn.innerHTML=`
        <option><%=requestNumber%></option>
        <option><%=incidentNumber%></option>
        `
        value=value.replace(variable,btncreator().outerHTML)
      })
    }

    if(varArr.includes('$')){
      value=value.replace('$',"<span tabindex='0' role='link' class='varModify' style='font-weight: 600;'><%=Select%></span>")
    }
    console.log("finalvalue",value)
    setContent(value)



  }
  
  return (
    <>
     <main>
      <div
        id="subject"
        className="subject"
        contentEditable="true"
        onBlur={handleChange}
        dangerouslySetInnerHTML={{
        __html:content
        }}>
      </div>
     </main>
    </>
  );
}
