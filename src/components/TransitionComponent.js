import React, {useRef, useState, useEffect} from 'react';
import { useRecoilState } from 'recoil';

const TransitionComponent = (props) => {

    let leftRef = useRef(null);
    let rightRef = useRef(null);

    return(
        <>
            <ul className="transition-secondary">
                <li ref={el => (leftRef = el)}></li>
                <li ref={el => (rightRef = el)}></li>
            </ul>
            <ul className="transition">
                <li ref={el => (leftRef = el)}></li>
                <li ref={el => (rightRef = el)}></li>
            </ul>
        </>
    )
}


export default TransitionComponent;