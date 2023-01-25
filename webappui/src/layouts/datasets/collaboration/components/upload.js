import React from "react";
import "./../../components/styles.css";
import "./collab_styles.css"
import SuiButton from "../../../../components/SuiButton";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const Upload = (props) => {

    const heightRef = useRef(null);
    const heightRef2 = useRef(null);
    const inputFile1 = useRef(null);
    const inputFile2 = useRef(null);


    //Régler le problème des useState
    const [folder_to_upload_label, setFolderToUploadLabel] = useState()
    const [folder_here_label, setFolderHereLabel] = useState(0);
    const [folder_to_upload_no_label, setFolderToUploadNoLabel] = useState()
    const [folder_here_no_label, setFolderHereNoLabel] = useState(0);

    const [reload, setReload] = useState(null);



    useEffect(() => {
        console.log("height", heightRef.current.offsetHeight + heightRef2.current.offsetHeight);
    }, [reload]);


    function fileSelectedHandlerNoLabel(e) {
        console.log(e.target.files[0].name)
        setFolderToUploadNoLabel(e.target.files[0])
        setFolderHereNoLabel(1);
    }

    function fileSelectedHandlerLabel(e) {
        console.log(e.target.files[0].name)
        setFolderToUploadLabel(e.target.files[0])
        setFolderHereLabel(1);
    }

    function handleSubmit_no_label(e) {
        e.preventDefault()

        const fd = new FormData();
        fd.append('file', folder_to_upload_no_label, "withoutlabel/" + folder_to_upload_no_label.name);
        const upload = axios.post("http://127.0.0.1:5001/v2/uploadFile/" + props.datasetname, fd)

        alert("Upload suceeded !");
        setFolderHereNoLabel(0);
        setReload(true);

    }

    function handleSubmit_label(e) {
        e.preventDefault()

        const fd = new FormData();
        fd.append('file', folder_to_upload_label, "withlabel/" + folder_to_upload_label.name);
        const upload = axios.post("http://127.0.0.1:5001/v2/uploadFile/" + props.datasetname, fd)


    }

    return (
        <div className="upload">
            <div ref={heightRef}>Branch Selected : Dev</div>
            <div className="container_button" ref={heightRef2}>
                <input onChange={fileSelectedHandlerNoLabel} type="file" accept="image/png, image/gif, image/jpeg, .zip" ref={inputFile1} style={{ display: 'none' }} />
                <SuiButton gradient="variant" color="dark" onClick={() => { inputFile1.current.click() }}>Upload image(s) without label</SuiButton>
                {folder_here_no_label == 1 &&
                    <SuiButton onClick={handleSubmit_no_label}>Submit</SuiButton>
                }
                <div className="vertical-separator"></div>
                <input onChange={fileSelectedHandlerLabel} type="file" accept="image/png, image/gif, image/jpeg, .zip" ref={inputFile2} style={{ display: 'none' }} disabled />
                <SuiButton gradient="variant" color="dark" onClick={() => { inputFile2.current.click() }}>Upload image(s) with label</SuiButton>
                <p className="info_dis">This functionality is not yet ready</p>
                {folder_here_label == 1 &&
                    <SuiButton onClick={handleSubmit_label}>Submit</SuiButton>
                }
            </div>
        </div>
    );
}


export default Upload;