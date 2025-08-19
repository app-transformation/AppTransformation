export interface InitiativeData {
  initiativeId: string;
  workstreamId: string;
  status: string;
  stage: string;
  ownerId: string;
  previousApproverId: string;
  description?: string;
  intendedDate: string;
  aspiredDate: string;
  actualDate?: string;
  weeklyMeetingFlag: boolean;
  needAttention: boolean;
  priorityMarker?: string;
  createdAt: string;
  totalExpenditure?: number;
  totalEarning?: number;
  netImpact?: number;
  fields: InitiativeField[];
}

export interface InitiativeField {
  id: string;
  parentId: string; // InitiativeId
  fieldId: string;
  fieldName: string;
  fieldValue: string;
  createdAt: string;
}