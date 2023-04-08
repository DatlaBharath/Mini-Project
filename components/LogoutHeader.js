import Image from "next/image";
import logo from "../src/Imgs/bLOGO.png"
import {ConnectButton} from "@web3uikit/web3";
import { useRouter } from "next/router";
export default function LogoutHeader(){
    const router = useRouter();
    function handleClick(){
        router.push("/");
    }
    return(
        <div className="flex">
            <Image src={logo} className="w-36"/>
            <div className="flex ms-auto">
                <div className="w-fit my-auto">
                    <ConnectButton moralisAuth={false} />
                </div>
                <div className="ms-auto m-2">
                    <button className="p-1 rounded-2xl text-2xl bg-[#fca200] text-[#2c292b]" onClick={handleClick}>Logout</button>
                </div>
            </div>
        </div>
    );
}