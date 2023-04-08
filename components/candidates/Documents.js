import RenderingDocs from "./RenderingDocs"
import UplodeDoc from "./UplodeDoc"
import Verify from "./Verify";
import PushDoc from "./PushDoc";
import { useState , useEffect } from "react";
export default function Documents(props){
    const [selectedButton, setSelectedButton] = useState('button1');
    const [p, setp] = useState(props.ren)
    const [p1, setp1] = useState(props.ver)
    const [p2, setp2] = useState(props.nver)

    function handleButton1Click() {
        setSelectedButton('button1');
    }

    function handleButton2Click() {
        setSelectedButton('button2');
    }

    useEffect(() => {
        setp(props.ren);
      });
      useEffect(() => {
        setp1(props.ver);
      });
      useEffect(() => {
        setp2(props.nver);
      });
    return(
        <div className="flex ">
            <div className="m-2 p-2 w-fit">
                {p?.map((doc)=>{
                    return(<RenderingDocs name={doc[0]} id={doc[1]}/>)
                })}
            </div>
            <div className="m-2 p-2 w-fit mx-auto">
                <UplodeDoc />
                <div className="flex my-8">
                <button className={`mx-auto text-3xl text-${selectedButton == 'button1' ? '[#f0ede9]' : '[#fca200]'}`} onClick={handleButton1Click}>Verify</button>
                <button className={`mx-auto text-3xl text-${selectedButton == 'button2' ? '[#f0ede9]' : '[#fca200]'}`} onClick={handleButton2Click}>Push Document</button>
                </div>
                {selectedButton == 'button1' && <div>
                {p1?.map((doc)=>{
                    return(<Verify name={doc[0]} id={doc[1]}/>)
                })}
                </div>}
                {selectedButton == 'button2' && <div>
                {p2?.map((doc)=>{
                    return(<PushDoc name={doc[0]} id={doc[1]}/>)
                })}
                </div>}
            </div>
        </div>
    )
}