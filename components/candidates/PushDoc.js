import {useWeb3Contract, useMoralis} from "react-moralis";
import {abi, contractAddresses } from "../../constants";
import { useNotification } from "@web3uikit/core";
export default function PushDoc(props){
    const dispatch = useNotification()
    const {chainId : chainIdHex} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const ebvAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const {runContractFunction: documentPush} = useWeb3Contract({
        abi : abi,
        contractAddress : ebvAddress,
        functionName : "documentPush",
        params : {
            _docName: props.name
        }
    })
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Document Pushed!",
            title: "Push Status",
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
        <div className="flex bg-[#fca200] m-2 p-4 rounded-2xl">
            <div className=" ">
                <div className="text-2xl text-[#2c292b] w-fit">Document Name : {props.name}</div>
                <div className="text-2xl text-[#2c292b] w-fit">Document Id : {props.id}</div>
            </div>
            <button className="bg-[#2c292b] text-[#fca200] m-auto p-4 rounded-2xl" onClick={async () =>{
                await documentPush({
                    onSuccess : handleSuccess,
                    onError : (error) => {alert(error)},
                })
            }}>Push</button>
        </div>

    )
}