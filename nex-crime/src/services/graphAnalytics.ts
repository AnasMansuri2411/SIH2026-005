import { GraphNode, GraphEdge } from '../types/intelligence';

export interface MultiHopResult {
  nodeIds: Set<string>;
  edgeIds: Set<string>;
  hopDistances: Map<string, number>;
}

export interface DisruptionResult {
  targetNode: GraphNode;
  preComponentsCount: number;
  postComponentsCount: number;
  efficiencyLossPercentage: number;
  severedEdgesCount: number;
  disruptedFinancialVolumeINR: number;
  isolatedClusters: {
    clusterName: string;
    nodeIds: string[];
    riskSummary: string;
  }[];
}

/**
 * Perform BFS to retrieve all nodes and edges within `maxHops` from startNodeId
 */
export function getMultiHopSubgraph(
  startNodeId: string,
  maxHops: number,
  edges: GraphEdge[]
): MultiHopResult {
  const visited = new Map<string, number>(); // nodeId -> distance
  const edgeIds = new Set<string>();
  const queue: Array<{ id: string; hop: number }> = [{ id: startNodeId, hop: 0 }];
  visited.set(startNodeId, 0);

  // Build adjacency list
  const adj = new Map<string, Array<{ neighbor: string; edgeId: string }>>();
  for (const edge of edges) {
    if (!adj.has(edge.source)) adj.set(edge.source, []);
    if (!adj.has(edge.target)) adj.set(edge.target, []);
    adj.get(edge.source)!.push({ neighbor: edge.target, edgeId: edge.id });
    adj.get(edge.target)!.push({ neighbor: edge.source, edgeId: edge.id });
  }

  while (queue.length > 0) {
    const { id, hop } = queue.shift()!;
    if (hop >= maxHops) continue;

    const neighbors = adj.get(id) || [];
    for (const { neighbor, edgeId } of neighbors) {
      edgeIds.add(edgeId);
      if (!visited.has(neighbor)) {
        visited.set(neighbor, hop + 1);
        queue.push({ id: neighbor, hop: hop + 1 });
      }
    }
  }

  return {
    nodeIds: new Set(visited.keys()),
    edgeIds,
    hopDistances: visited,
  };
}

/**
 * Shortest path between two nodes using unweighted BFS
 */
export function findShortestPath(
  sourceId: string,
  targetId: string,
  edges: GraphEdge[]
): { pathNodeIds: string[]; pathEdgeIds: string[] } | null {
  if (sourceId === targetId) {
    return { pathNodeIds: [sourceId], pathEdgeIds: [] };
  }

  const adj = new Map<string, Array<{ neighbor: string; edgeId: string }>>();
  for (const edge of edges) {
    if (!adj.has(edge.source)) adj.set(edge.source, []);
    if (!adj.has(edge.target)) adj.set(edge.target, []);
    adj.get(edge.source)!.push({ neighbor: edge.target, edgeId: edge.id });
    adj.get(edge.target)!.push({ neighbor: edge.source, edgeId: edge.id });
  }

  const queue: string[] = [sourceId];
  const visited = new Set<string>([sourceId]);
  const parent = new Map<string, { node: string; edgeId: string }>();

  let found = false;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (curr === targetId) {
      found = true;
      break;
    }
    const neighbors = adj.get(curr) || [];
    for (const { neighbor, edgeId } of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, { node: curr, edgeId });
        queue.push(neighbor);
      }
    }
  }

  if (!found) return null;

  const pathNodeIds: string[] = [];
  const pathEdgeIds: string[] = [];
  let curr = targetId;

  while (curr !== sourceId) {
    pathNodeIds.unshift(curr);
    const p = parent.get(curr)!;
    pathEdgeIds.unshift(p.edgeId);
    curr = p.node;
  }
  pathNodeIds.unshift(sourceId);

  return { pathNodeIds, pathEdgeIds };
}

/**
 * Find connected components for a set of nodes and edges
 */
export function getConnectedComponents(nodeIds: string[], edges: GraphEdge[]): string[][] {
  const adj = new Map<string, string[]>();
  const activeNodes = new Set(nodeIds);

  for (const n of nodeIds) adj.set(n, []);
  for (const edge of edges) {
    if (activeNodes.has(edge.source) && activeNodes.has(edge.target)) {
      adj.get(edge.source)!.push(edge.target);
      adj.get(edge.target)!.push(edge.source);
    }
  }

  const visited = new Set<string>();
  const components: string[][] = [];

  for (const n of nodeIds) {
    if (!visited.has(n)) {
      const component: string[] = [];
      const q = [n];
      visited.add(n);
      while (q.length > 0) {
        const curr = q.shift()!;
        component.push(curr);
        for (const neighbor of adj.get(curr) || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            q.push(neighbor);
          }
        }
      }
      components.push(component);
    }
  }

  return components;
}

/**
 * Inter-Centrality Network Disruption Analysis
 * Simulates neutralizing targetNodeId and calculates structural fragmentation
 */
export function simulateInterCentralityDisruption(
  targetNodeId: string,
  nodes: GraphNode[],
  edges: GraphEdge[]
): DisruptionResult | null {
  const targetNode = nodes.find(n => n.id === targetNodeId);
  if (!targetNode) return null;

  const allNodeIds = nodes.map(n => n.id);
  const preComponents = getConnectedComponents(allNodeIds, edges);

  // Edges directly connected to target
  const severedEdges = edges.filter(e => e.source === targetNodeId || e.target === targetNodeId);

  // Calculate sum of financial transfers disrupted
  const disruptedFinancialVolumeINR = severedEdges.reduce((sum, edge) => {
    return sum + (edge.properties?.amountINR || 0);
  }, 0);

  // Remove targetNode and connected edges
  const remainingNodeIds = allNodeIds.filter(id => id !== targetNodeId);
  const remainingEdges = edges.filter(e => e.source !== targetNodeId && e.target !== targetNodeId);
  const postComponents = getConnectedComponents(remainingNodeIds, remainingEdges);

  // Classify isolated sub-clusters
  const isolatedClusters = postComponents.map((comp, idx) => {
    const compNodes = nodes.filter(n => comp.includes(n.id));
    const types = compNodes.map(n => n.type);
    let clusterName = `Sub-Network ${String.fromCharCode(65 + idx)}`;
    let riskSummary = 'Isolated operational cluster';

    if (types.includes('BANK_ACCOUNT')) {
      clusterName = `Cluster ${String.fromCharCode(65 + idx)}: Hawala / Financial Wing`;
      riskSummary = 'Disconnected from logistics transport; funds immobilized.';
    } else if (types.includes('VEHICLE')) {
      clusterName = `Cluster ${String.fromCharCode(65 + idx)}: Ground Freight Transport`;
      riskSummary = 'Lacks syndicate coordination and fuel financing.';
    } else if (types.includes('LOCATION')) {
      clusterName = `Cluster ${String.fromCharCode(65 + idx)}: Port & Staging Transit`;
      riskSummary = 'Unmanifested cargo stagnant at inland container depot.';
    }

    return {
      clusterName,
      nodeIds: comp,
      riskSummary,
    };
  });

  // Structural efficiency loss estimate based on betweenness
  const efficiencyLoss = Math.min(
    95,
    Math.round(((targetNode.interCentralityScore || 0.75) * 85) + (severedEdges.length * 2))
  );

  return {
    targetNode,
    preComponentsCount: preComponents.length,
    postComponentsCount: postComponents.length,
    efficiencyLossPercentage: efficiencyLoss,
    severedEdgesCount: severedEdges.length,
    disruptedFinancialVolumeINR,
    isolatedClusters,
  };
}
