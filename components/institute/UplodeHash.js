import {useWeb3Contract, useMoralis} from "react-moralis";
import {abi, contractAddresses } from "../../constants";
import { useState } from "react"
import { useNotification } from "@web3uikit/core";

export default function UplodeHash(){
    const dispatch = useNotification();
    const [DocName, setDocName] = useState("");
    const [DocId, setDocId] = useState("");
    function handleDocNameChange(event) {
        setDocName(event.target.value);
    }
    function handleDocIdChange(event) {
        setDocId(event.target.value);
    }
    const {chainId : chainIdHex} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const ebvAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const {runContractFunction: hashArray} = useWeb3Contract({
        abi : abi,
        contractAddress : ebvAddress,
        functionName : "hashArray",
        params : {
            _docName: DocName ,
            _docId: DocId
        }
    })
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Hash Uploaded",
            title: "Uplode Status",
            position: "topL",
        })
    }
    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="bg-[#fca200] rounded-xl m-2 p-2">
        <div>
        <div className="text-[#f0ede9]"></div>
            <div className="text-3xl text-[#2c292b]" >Document Name : <input type="text" className="m-1 b my-3 p-2 rounded-lg ms-auto" placeholder="Enter DocName" onChange={handleDocNameChange} /></div>
            
            <div className="text-3xl text-[#2c292b]" >Document IdNo : <input type="text" className="m-1 b my-3 p-2 rounded-lg ms-auto" placeholder="Enter DocId" onChange={handleDocIdChange}/></div>
            
            <button className="bg-[#2c292b] hover:bg-[#171516] text-[#fca200] py-2 px-4 text-xl rounded-lg my-3 mx-auto" onClick={async () =>{
                await hashArray({
                    onSuccess : handleSuccess,
                    onError : (error) => {alert(error)},
                })
            }}>Upload</button>
        </div>
        </div>
    )
}