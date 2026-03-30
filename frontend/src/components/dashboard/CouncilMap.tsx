import React from 'react';
import ReactFlow, { Background, Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: 'hub',
    data: { label: 'Organization Hub' },
    position: { x: 250, y: 150 },
    style: { background: '#1e293b', color: '#fff', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }
  },
  {
    id: 'hacker1',
    data: { label: 'Hacker-1' },
    position: { x: 50, y: 50 },
    style: { background: '#3b82f6', color: '#fff', borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'hacker2',
    data: { label: 'Hacker-2' },
    position: { x: 450, y: 50 },
    style: { background: '#10b981', color: '#fff', borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'builder',
    data: { label: 'Builder' },
    position: { x: 50, y: 250 },
    style: { background: '#8b5cf6', color: '#fff', borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'growth',
    data: { label: 'Growth' },
    position: { x: 450, y: 250 },
    style: { background: '#f59e0b', color: '#fff', borderRadius: '8px', padding: '10px' }
  },
];

const initialEdges = [
  { id: 'e1', source: 'hub', target: 'hacker1', animated: true },
  { id: 'e2', source: 'hub', target: 'hacker2', animated: true },
  { id: 'e3', source: 'hub', target: 'builder', animated: true },
  { id: 'e4', source: 'hub', target: 'growth', animated: true },
];

export const CouncilMap = () => {
  return (
    <div style={{ height: '500px', width: '100%', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
