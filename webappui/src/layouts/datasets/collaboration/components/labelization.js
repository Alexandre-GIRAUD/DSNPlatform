import React from "react";
import { Form } from "react-bootstrap";
import "./../../components/styles.css";
import SuiButton from "../../../../components/SuiButton";
import "./collab_styles.css"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PossibleLabels from "./possible_labels";


const Labelization = (props) => {

    var widthRef = useRef(null);
    var labelChosenRef = useRef(null);

    var canvasRef = React.useRef(null);
    var rect = {};
    var drag = false;
    var imageObj = null;

    const [image, setImage] = useState(null);
    const [labelized_image_to_upload, setLabelizedImage] = useState(null);
    let [label_array, setLabel_array] = useState(null);
    let [label_chosen, setLabel_chosen] = useState(null);



    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            init(URL.createObjectURL(event.target.files[0]));
            setLabelizedImage(event.target.files[0])
        }

    }


    const init = (url) => {
        imageObj = new Image();
        var ctx = canvasRef.current.getContext('2d');

        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0);
        };

        imageObj.src = url;

        var offsetLeft = window.innerWidth - widthRef.current.offsetWidth - 50;

        const mouseDown = (e) => {
            rect.startX = e.pageX - offsetLeft
            rect.startY = e.pageY - 1413
            drag = true;
        }

        const mouseUp = () => { drag = false; }

        const mouseMove = (e) => {

            if (drag) {
                ctx.clearRect(0, 0, 1000, 1000);
                ctx.drawImage(imageObj, 0, 0);
                rect.w = (e.pageX - offsetLeft) - rect.startX; // 295 is the width of the sidebar for my screen
                rect.h = (e.pageY - 1413) - rect.startY;
                ctx.strokeStyle = 'red';
                ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
            }
        }

        const mouseClick = () => {
            let coord_label = [rect.startX, rect.startY, rect.w, rect.h];
            setLabel_array(coord_label);
            setLabel_chosen(labelChosenRef);

        }

        canvasRef.current.addEventListener('mousedown', mouseDown, false);
        canvasRef.current.addEventListener('mouseup', mouseUp, false);
        canvasRef.current.addEventListener('mousemove', mouseMove, false);
        canvasRef.current.addEventListener('click', mouseClick, false);
    }

    const send_label_gcp = (e) => {
        e.preventDefault()
        const fd = new FormData();

        //Warning: Problem if image name contains space in name
        console.log(labelized_image_to_upload);

        fd.append('file', labelized_image_to_upload, "withlabel/" + labelized_image_to_upload.name);
        //const upload = axios.post("http://127.0.0.1:5001/v2/uploadFile/" + props.datasetname, fd)
        const upload = axios.post(`http://127.0.0.1:5001/v2/uploadLabelizedData/${props.datasetname}/${labelized_image_to_upload.name}/${label_array.toString()}/${labelChosenRef.current.value}`, fd)

    }

    return (
        <div class="labelization" ref={widthRef}>
            <div class="button_cl">
                <label for="image">Choose an image you want to labelize</label>
                <p><input className="input_image" type="file" accept="image/*" name="image" id="file" onChange={onImageChange}></input></p>
                <SuiButton gradient="variant" color="dark" id="send" onClick={send_label_gcp}>Send Labelized Data</SuiButton>
                <Form.Select ref={labelChosenRef}>
                    <PossibleLabels />
                </Form.Select>
            </div>
            <canvas id="canvas" ref={canvasRef} width="1000" height="1000"></canvas>
        </div>
    );
}


export default Labelization;