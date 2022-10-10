import React, { Component, useEffect, useRef, useState } from 'react'
import ScriptTag from 'react-script-tag';

//three imports
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

//dependencies import
import { loadTexture, loadSound, loadUI, createTexts, DrawTexture, DrawLbl, loadUIRect, Rect2RectIntersection, cirCirCollition, CircRectsOverlap, upWithKeyboard, dealWithKeyboard, createColor, loadModel } from './dependencies/Basic'
import { Game } from './dependencies/Game'
import { Particle, aniparticle, setupScene } from './dependencies/particle'
import { AssetLoader } from './dependencies/AssetLoader'
// import './dependencies/App.css'
import ShareComponent from '../../components/shareComp/share';


const WrapRide = () => {
    const elemWrapper = useRef(null);
    const mGame = useRef(null);
    const [openShare, setOpenShare] = useState(false);
    const [msg, setMsg] = useState('')
    useEffect(() => {
        mGame.current = new Game(elemWrapper.current, setOpenShare, setMsg);
    }, [])
    return (
        <>
         {/*   <button type="button" style={{zIndex:2,position:"absolute",left:"70%",top:"5%"}}>X</button>*/}
         <div ref={elemWrapper}></div>
         <ShareComponent msg={msg} initPopup={openShare} resetPop={setOpenShare}/>
        </>
    )
}

export default WrapRide;

/* class index extends Component {
    constructor(props) {
        super(props)
        this.elem = React.createRef()
        this.state = {

        }
    }

    componentDidMount() {
        let this_ = this
        var mGame;
        console.log("componentDidMount");
        window.onload = function () {
            console.log("constructor Start");
            if (mGame === undefined)
                mGame = new Game(this_.elem.current);
        };
        function callAds() {
            console.log("callAds");
            //   FbPlayableAd.onCTAClick();

        }
    }

    render() {
        return (
            <div ref={this.elem} >

            </div>
        )
    }
}

export default index */
