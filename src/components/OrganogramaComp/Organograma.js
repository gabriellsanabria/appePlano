// Organograma.js
import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './Organograma.scss'; // Arquivo CSS para estilos personalizados

const renderNode = (node) => (
  <TreeNode key={node.label} label={<div className="node-content">
    <div className="node-name">{node.name}</div>
    <div className="node-position">{node.position}</div>
  </div>}>
    {node.children && node.children.map(renderNode)}
  </TreeNode>
);

const Organograma = ({ hierarchy }) => (
  <Tree label={<div className="root-label">{hierarchy.label}</div>}>
    {hierarchy.children && hierarchy.children.map(renderNode)}
  </Tree>
);

export default Organograma;
