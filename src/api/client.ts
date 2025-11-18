import axios from "axios";

import { config } from "../config";
import type {
  BootstrapStateResponse,
  CredentialRequest,
  DataSourceResponse,
  DetectionTimelineResponse,
  QuarterPresetsResponse,
  SettingDefinitionGroup,
  SettingValueResponse
} from "./types";

let adminToken: string | null = null;

const http = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10_000
});

http.interceptors.request.use((requestConfig) => {
  if (adminToken) {
    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${adminToken}`
    };
  }
  return requestConfig;
});

export function setAdminAuthToken(token: string | null): void {
  adminToken = token;
}

export async function fetchTimeline(params: {
  bucketMinutes?: number;
  limit?: number;
  before?: string;
  after?: string;
}): Promise<DetectionTimelineResponse> {
  const { bucketMinutes, ...rest } = params;
  const queryParams = {
    ...rest,
    ...(typeof bucketMinutes === "number" ? { bucket_minutes: bucketMinutes } : {})
  };
  const response = await http.get<DetectionTimelineResponse>("/detections/timeline", {
    params: queryParams
  });
  return response.data;
}

export async function fetchQuarters(date?: string): Promise<QuarterPresetsResponse> {
  const response = await http.get<QuarterPresetsResponse>("/detections/quarters", {
    params: { date }
  });
  return response.data;
}

// Admin endpoints

export async function fetchAdminSettings(): Promise<SettingValueResponse[]> {
  const response = await http.get<SettingValueResponse[]>("/admin/settings");
  return response.data;
}

export async function fetchSettingDefinitions(): Promise<SettingDefinitionGroup[]> {
  const response = await http.get<SettingDefinitionGroup[]>("/admin/settings/definitions");
  return response.data;
}

export async function updateSettingValue(
  key: string,
  value: unknown,
  scope = "global",
  scopeRef?: string | null
): Promise<SettingValueResponse> {
  const response = await http.put<SettingValueResponse>(`/admin/settings/${key}`, {
    value,
    scope,
    scope_ref: scopeRef ?? undefined
  });
  return response.data;
}

export async function deleteScopedSetting(key: string, scope: string, scopeRef: string): Promise<void> {
  await http.delete(`/admin/settings/${key}/scopes/${scope}/${encodeURIComponent(scopeRef)}`);
}

export async function clearSettingsCache(): Promise<void> {
  await http.post("/admin/settings/cache/clear", {});
}

export async function fetchBootstrapState(): Promise<BootstrapStateResponse> {
  const response = await http.get<BootstrapStateResponse>("/admin/settings/bootstrap/state");
  return response.data;
}

export async function updateDataSourceCredentials(
  name: string,
  payload: CredentialRequest
): Promise<DataSourceResponse> {
  const response = await http.post<DataSourceResponse>(
    `/admin/settings/data-sources/${encodeURIComponent(name)}/credentials`,
    payload
  );
  return response.data;
}
