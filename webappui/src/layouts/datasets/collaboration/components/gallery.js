import React from "react";
import no_img from './pics/screen_no_img.png'
import { useState, useRef, useEffect } from "react";
import PossibleLabels from "./possible_labels";
import SuiButton from "../../../../components/SuiButton";
import axios from 'axios';
import { Form } from "react-bootstrap";
import "./collab_styles.css"



const Gallery = (props) => {

    let [picList, setPicList] = useState(props.list_images);
    console.log("rendering entered");
    let [index, setIndex] = useState(0);
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


    const init = (url) => {
        imageObj = new Image();
        var ctx = canvasRef.current.getContext('2d');

        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0);
        };
        console.log("https://storage.googleapis.com/" + props.datasetname + "/withoutlabel/" + url);
        imageObj.src = "https://storage.googleapis.com/" + props.datasetname + "/withoutlabel/" + url;

        var offsetLeft = window.innerWidth - widthRef.current.offsetWidth - 50;

        const mouseDown = (e) => {
            rect.startX = e.pageX - offsetLeft
            rect.startY = e.pageY - 363
            drag = true;
        }

        const mouseUp = () => { drag = false; }

        const mouseMove = (e) => {
            if (drag) {
                ctx.clearRect(0, 0, 1500, 1500);
                ctx.drawImage(imageObj, 0, 0);
                rect.w = (e.pageX - offsetLeft) - rect.startX; // 295 is the width of the sidebar for my screen
                rect.h = (e.pageY - 363) - rect.startY;
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

    const onClickNext = () => {
        console.log("go to the next picture");
        if (index + 1 === picList.length) {
            setIndex(0)
        } else {
            var current_index = index;
            setIndex(current_index + 1);
        }
        var ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, 1500, 1500);

    }
    const onClickPrevious = () => {
        if (index - 1 === -1) {
            setIndex(picList.length - 1)
        } else {
            var current_index = index;
            setIndex(current_index - 1)
        }
        var ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, 1500, 1500);
    }

    const [rerender, setRerender] = useState(false);

    const send_label_gcp = async (e) => {
        e.preventDefault()
        const fd = new FormData();

        //Warning: Problem if image name contains space in name" 
        console.log(labelized_image_to_upload);
        const tmp_file = await fetch(labelized_image_to_upload);
        // here image is url/location of image
        const blob = await tmp_file.blob();
        const file = new File([blob], labelized_image_to_upload, { type: blob.type });
        fd.append('file', file, "withlabel/" + file.name);
        const upload = axios.post("http://127.0.0.1:5001/v2/uploadFile/" + props.datasetname, fd)

        var current_list = picList;

        // This is done to remove the labelized image from the gallery, we should also remove it from the non-labelized bucket
        current_list.splice(index, 1);
        setPicList(current_list);
        console.log(index);
        if (index + 1 === picList.length) {
            if (picList.length === 0) {
                setIndex(10);
            }
            else {
                setIndex(10);
                setIndex(0);
            }
        } else {
            var current_index = index;
            setIndex(current_index + 1);
        }
        var ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, 1500, 1500);
        setRerender(!rerender);
    }


    useEffect(() => {
        if (picList.length === 0) {
            console.log("Entered no images anymore");
            setPicList([no_img])
            setIndex(0)
            setImage(picList[index]);
            init(picList[index]);
        }
        else {
            console.log("Images found")
            console.log(index);
            console.log(picList);
            setImage(picList[index]);
            init(picList[index]);
            setLabelizedImage(picList[index])
        }
    }, [index, picList]);


    return (
        <div ref={widthRef}>
            <canvas id="canvas_gallery" ref={canvasRef} width="1500" height="700"></canvas>
            <br />
            <div class="buttons_gallery">
                <button style={{ "fontSize": "18px" }} onClick={onClickPrevious}> Previous </button>
                <button style={{ "marginLeft": "5px", "fontSize": "18px" }} onClick={onClickNext}> Next </button>
                <br />
                <SuiButton gradient="variant" color="dark" id="send" onClick={send_label_gcp}>Send Labelized Data</SuiButton>
                <Form.Select ref={labelChosenRef}>
                    <PossibleLabels />
                </Form.Select>
            </div>
        </div >
    );
}


export default Gallery;