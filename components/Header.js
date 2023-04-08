import Head from "next/head";
import Image from "next/image";
import logo from "../src/Imgs/bLOGO.png"
import {ConnectButton} from "@web3uikit/web3";
export default function Header(){
    return(
        <div className="flex">
            <Image src={logo} className="w-36"/>
            <div className="w-fit ms-auto my-auto">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    );
}