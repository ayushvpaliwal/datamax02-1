import './Node.css'

import ColorSelectorNode1 from './ColorSelectorNode1';
import ColorSelectorNode2 from './ColorSelectorNode2';
import CustomNode from './CustomNode';

import React from 'react';


const nodeTypes = {
    selectorNode1: ColorSelectorNode1,
    selectorNode2: ColorSelectorNode2,
    // selectorNode3: CustomNode,

};

const Node = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, "selectorNode1")} draggable>
                Custom Node 1
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, "selectorNode2")} draggable>
                Custom Node 2
            </div>
        </>
    );
};

export default Node
