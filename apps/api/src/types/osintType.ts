import { ISkillConfig, ISkill, ISkillExecutor } from "./SkillbaseType.js";

export type OsintSearchType =
  | "person"
  | "building"
  | "object"
  | "vehicle"
  | "email"
  | "phone"
  | "domain"
  | "image"
  | "location";

export interface OsintSearchParams {
  target: string;
  type: OsintSearchType;
  sources?: string[];
}

export interface OsintResult {
  target: string;
  type: string;
  findings: {
    name?: string;
    emails?: string[];
    phones?: string[];
    socialProfiles?: string[];
    images?: string[];
    locations?: string[];
    relatedDomains?: string[];
    metadata?: Record<string, unknown>;
  };
  confidence: number;
  sources: string[];
}

export interface OsintConfig extends ISkillConfig {
  defaultSources?: string[];
}

export interface IOSINTSkill
  extends ISkill,
    ISkillExecutor<OsintSearchParams, OsintResult> {
  search(params: OsintSearchParams): Promise<OsintResult>;
  analyzeRisk(profile: {
    name?: string;
    emails?: string[];
    socialProfiles?: string[];
  }): Promise<{
    riskScore: number;
    riskFactors: string[];
    recommendations: string[];
  }>;
}
