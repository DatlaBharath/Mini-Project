import {useWeb3Contract} from "react-moralis";
import {abi, contractAddresses } from "../constants";
import { useState , useEffect} from "react";
import {useMoralis} from "react-moralis";
import { useRouter } from "next/router";

export default function LoginOUser(){
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState("");
    const {chainId : chainIdHex} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const router = useRouter();
    const ebvAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const {runContractFunction: ownerValidate} = useWeb3Contract({
        abi : abi,
        contractAddress : ebvAddress,
        functionName : "ownerValidate",
        params : {
            _username: username , 
            _address: address
        }
    })
    const handleValidation = async ()=>{
        const res = await ownerValidate();
        if(res){
            router.push('/user/owner');
        }
    }
    function handleInputChange(event) {
        setUsername(event.target.value);
    }
    useEffect(() => {
        const updateAddress = async () => {
          try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            setAddress(accounts[0]);
          } catch (err) {
            console.error(err);
          }
        }
        updateAddress();
        window.ethereum.on("accountsChanged", updateAddress);
    
        return () => {
          window.ethereum.removeListener("accountsChanged", updateAddress);
        };
      }, []);
    return (
        <div className="w-fit m-1 mx-auto">
        <div className="text-[#fca200] text-2xl w-fit mx-auto">INSTITUTE LOGIN</div>
        <div className="w-fit p-5 m-1 mx-auto bg-[#fca200] rounded-lg" >
            <label className="m-1 my-3 text-[#2c292b] text-xl">Enter UserName</label><br />
            <input type="text" className="m-1 b my-3 p-2 rounded-lg" placeholder="Enter UserName" onChange={handleInputChange}/><br />
            <div className="flex">
            <button className="bg-[#2c292b] text-[#fca200] py-2 px-4 rounded-lg my-3 mx-auto" onClick={handleValidation}>Login</button>
            </div>
        </div>
        </div>
    );
}