'use client';

import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  MiniMap
} from 'reactflow';
import useStore from '@/stores/useStore';
import { nodeTypes } from '@/components/nodes';
import { Button } from '@/components/ui/button';

// Mock initial nodes
const initialNodes = [
  { id: '1', type: 'productFusion', position: { x: 100, y: 100 }, data: { image: null } },
  { id: '2', type: 'resize', position: { x: 400, y: 100 }, data: { format: 'Story (9:16)' } },
  { id: '3', type: 'brand', position: { x: 100, y: 300 }, data: { colors: ['#000', '#fff', '#ff0000'], font: 'Inter' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
];

function Editor() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
    setSelectedNode
  } = useStore();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  const onGenerate = async () => {
    try {
        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            body: JSON.stringify({
                prompt: 'A futuristic shoe in neon city',
                workspaceId: 'some-uuid'
            })
        });
        const data = await response.json();
        console.log('Generated:', data);
        alert('Generation started! Check console.');
    } catch (e) {
        console.error(e);
        alert('Error starting generation');
    }
  };

  return (
    <div className="h-full flex">
       {/* Node Toolbox (Contextual Sidebar) */}
       <div className="w-64 border-r p-4 bg-card hidden md:block">
         <h2 className="font-bold mb-4">Nodes</h2>
         <div className="space-y-2">
            <div className="p-2 border rounded cursor-grab bg-white shadow-sm">Product Fusion</div>
            <div className="p-2 border rounded cursor-grab bg-white shadow-sm">Brand Guardrails</div>
            <div className="p-2 border rounded cursor-grab bg-white shadow-sm">Resize</div>
            <div className="p-2 border rounded cursor-grab bg-white shadow-sm">Text to Image</div>
         </div>
       </div>

       {/* Canvas */}
       <div className="flex-1 relative bg-gray-50">
         <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button onClick={onGenerate}>Generate (1 Credit)</Button>
         </div>
         <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => setSelectedNode(node)}
            fitView
         >
            <Background />
            <Controls />
            <MiniMap />
         </ReactFlow>
       </div>

       {/* Properties Panel */}
       <div className="w-64 border-l p-4 bg-card hidden lg:block">
          <h2 className="font-bold mb-4">Properties</h2>
          <p className="text-sm text-muted-foreground">Select a node to edit properties.</p>
       </div>
    </div>
  );
}

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <ReactFlowProvider>
      <Editor />
    </ReactFlowProvider>
  );
}
