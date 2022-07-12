import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls } from 'react-flow-renderer';
// import Canvas from './Offcanvas';

// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FillerNodeForm from "./FillerNodeForm"
import ColorSelectorNode1 from "./ColorSelectorNode1";
import ColorSelectorNode2 from "./ColorSelectorNode2";
import "../index.css";



const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
    sourcePosition: 'right',
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const initBgColor = "#AED6F1 ";
const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode1: ColorSelectorNode1,
  selectorNode2: ColorSelectorNode2
};



const Middle = () => {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [offCanvasData, setOffCanvasData] = useState([])
  const [showoffCanvas, setShowOffcanvas] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds), console.log(params)), []);

  const [bgColor] = useState(initBgColor);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    // console.log(event.clientX, event.clientY)
    // console.log(event)
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    // console.log(reactFlowBounds.left)
    // console.log(event.clientX)

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
      sourcePosition: 'right',
      targetPosition: 'left',
    };

    // console.log(newNode)

    setNodes((nds) => nds.concat(newNode));
  },
    [reactFlowInstance]
  );

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          const color = event.target.value;

          return {
            ...node,
            data: {
              ...node.data,
              color
            }
          };
        })
      );
    };

    setNodes([
      {
        id: "1",
        type: "selectorNode1",
        data: { onChange: onChange, color: initBgColor },
        position: { x: 0, y: 50 },
        sourcePosition: "right"
      },
      {
        id: "2",
        type: "selectorNode2",
        data: { color: initBgColor },
        style: { border: "1px solid #777", padding: 10 },
        position: { x: 300, y: 50 }
      },
      {
        id: "3",
        type: "selectorNode2",
        data: { color: initBgColor },
        position: { x: 650, y: 25 },
        targetPosition: "left"
      }
    ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        style: { stroke: "#fff" }
      },
      {
        id: "e2a-3",
        source: "2",
        target: "3",
        sourceHandle: "a",
        style: { stroke: "#fff" }
      },
      {
        id: "e2b-4",
        source: "2",
        target: "4",
        sourceHandle: "b",
        style: { stroke: "#fff" }
      }
    ]);
  }, []);

  const onNodeDoubleClick = (event, node) => {
    console.log(node)
    setOffCanvasData(node)
    toggleFalseTrue()
  }

  const toggleFalseTrue = () => {
    setShowOffcanvas(handleShow)
  }

  const OffcanvasContent = () => {
    return (
      <>

        <Offcanvas class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"
          show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FillerNodeForm>

            </FillerNodeForm>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            style={{ height: 600, background: bgColor }}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDoubleClick={onNodeDoubleClick}
            // style={{ background: bgColor }}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultZoom={1.5}
            fitView
            attributionPosition="bottom-left"
          >
            {show ? <OffcanvasContent /> : null}
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider >
    </div >
  )
}

export default Middle


//
