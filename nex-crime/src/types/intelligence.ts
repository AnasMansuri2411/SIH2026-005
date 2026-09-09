export type EntityType = 
  | 'PERSON'
  | 'PHONE'
  | 'VEHICLE'
  | 'LOCATION'
  | 'BANK_ACCOUNT'
  | 'ORGANIZATION'
  | 'CRIME'
  | 'EVENT';

export type RelationshipType =
  | 'CALLED'
  | 'TRANSFERRED'
  | 'OWNED'
  | 'LOCATED_AT'
  | 'ASSOCIATED_WITH'
  | 'TRAVELLED_TO'
  | 'REGISTERED_TO'
  | 'CONNECTED_TO'
  | 'PARTICIPATED_IN';

export type EvidenceStatus = 'RAW_DATA' | 'AI_INFERRED' | 'HUMAN_VERIFIED';

export type RoleType = 'INVESTIGATOR' | 'ANALYST' | 'SUPERVISOR' | 'AUDITOR';

export interface XAiFactor {
  factor: string;
  contribution: number; // percentage, e.g. 34
  source: string;
  timestamp: string;
  confidence: number;
  description: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  confidence: number; // 0 to 1
  firstSeen: string;
  lastSeen: string;
  aliases?: string[];
  status: EvidenceStatus;
  communityCluster: 'ALPHA_SYNDICATE' | 'MULE_NETWORK' | 'SHELL_CORP' | 'LOGISTICS_PROXY' | 'EXTERNAL';
  riskScore: number; // 0 to 100
  // Inter-centrality metrics
  interCentralityScore?: number;
  betweennessScore?: number;
  degreeScore?: number;
  isDisruptionCandidate?: boolean;
  // Specific entity attributes
  attributes: {
    roleTitle?: string;
    nationality?: string;
    identNumber?: string; // Fictional synthetic ID
    phoneNumber?: string;
    carrier?: string;
    accountNumber?: string;
    bankName?: string;
    balanceINR?: number;
    regNumber?: string;
    vehicleModel?: string;
    coordinates?: [number, number]; // [lat, lng]
    address?: string;
    cin?: string; // Corporate ID
    incorporationDate?: string;
    crimeCategory?: string;
    ipcSection?: string;
    eventTime?: string;
  };
  associatedIds?: {
    phones?: string[];
    vehicles?: string[];
    accounts?: string[];
    locations?: string[];
    organizations?: string[];
  };
  xaiExplanation?: {
    summary: string;
    evidenceSubgraphNodeIds: string[];
    factors: XAiFactor[];
  };
  // Rendering coordinates (if precomputed or simulated)
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  confidence: number;
  status: EvidenceStatus;
  dataSource: 'FIR' | 'CDR' | 'FIN_INT' | 'GPS' | 'SURVEILLANCE' | 'OSINT';
  timestamp: string;
  properties?: {
    amountINR?: number;
    callDurationSec?: number;
    callCount?: number;
    direction?: 'INCOMING' | 'OUTGOING' | 'MUTUAL';
    overlapHours?: number;
    notes?: string;
  };
}

export interface IntelligenceCase {
  id: string;
  codeName: string;
  title: string;
  leadInvestigator: string;
  department: string;
  classification: string;
  status: 'ACTIVE_INVESTIGATION' | 'PENDING_REVIEW' | 'ARCHIVED';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  dateOpened: string;
  summary: string;
  targetSyndicate: string;
  stats: {
    totalEntities: number;
    totalRelationships: number;
    flaggedSignals: number;
    financialFlowINR: number;
    locationsTracked: number;
  };
}

export interface IntelligenceAlert {
  id: string;
  timestamp: string;
  category: 'HIGH_PRIORITY' | 'NETWORK_SIGNAL' | 'FINANCIAL_SIGNAL' | 'TEMPORAL_SIGNAL' | 'ENTITY_RESOLUTION' | 'DATA_QUALITY';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  relatedEntityIds: string[];
  title: string;
  reason: string;
  confidence: number;
  source: string;
  status: 'NEW' | 'INVESTIGATING' | 'ACKNOWLEDGED' | 'DISMISSED';
}

export interface ResolutionCandidate {
  id: string;
  candidateA: {
    id: string;
    label: string;
    type: EntityType;
    source: string;
    ident: string;
  };
  candidateB: {
    id: string;
    label: string;
    type: EntityType;
    source: string;
    ident: string;
  };
  similarityPercentage: number;
  matchingFactors: {
    nameSimilarity: number;
    phoneOverlap: number;
    locationOverlap: number;
    transactionPattern: number;
    graphTopology: number;
    aliasSimilarity: number;
  };
  aiRecommendation: string;
  status: 'PENDING' | 'MERGED' | 'REJECTED';
}

export interface FederatedNode {
  id: string;
  jurisdiction: string;
  stateCode: string;
  agencyName: string;
  localDatasetRecords: number;
  localModelVersion: string;
  trainingStatus: 'TRAINING' | 'SYNCED' | 'AGGREGATING' | 'IDLE';
  lastSync: string;
  privacyStatus: 'ZERO_KNOWLEDGE_PROVEN' | 'DIFFERENTIAL_PRIVACY_ACTIVE' | 'HOMOMORPHIC_READY';
  gradientsExchanged: number;
  latencyMs: number;
  dataCustodyLocation: string;
}

export interface ChainOfCustodyBlock {
  blockIndex: number;
  timestamp: string;
  actor: string;
  role: RoleType;
  action: string;
  recordId: string;
  previousHash: string;
  blockHash: string;
  merkleRoot: string;
  integrityStatus: 'VERIFIED_IMMUTABLE' | 'PENDING_BLOCK';
  details: string;
}

export interface DataQualityMetric {
  metric: string;
  value: number;
  target: number;
  status: 'OPTIMAL' | 'WARNING' | 'ATTENTION';
  description: string;
}
