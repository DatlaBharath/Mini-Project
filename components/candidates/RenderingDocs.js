export default function RenderingDocs(props){
    return(
        <div className=" bg-[#fca200] m-2 p-4 rounded-2xl">
            <div className="text-2xl text-[#2c292b] w-fit">Document Name : {props.name}</div>
            <div className="text-2xl text-[#2c292b] w-fit">Document Id : {props.id}</div>
        </div>
    )
}