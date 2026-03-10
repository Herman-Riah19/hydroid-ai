import { headersAuthFetch } from "@/utils/header-fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class OsintServices {
  static async createSearch(
    searchData: {
      userId: string;
      searchType: string;
      query: string;
      source?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/search`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(searchData),
    });
    return res.json();
  }

  static async getAllSearches(
    token: string,
    params?: { userId?: string; type?: string },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.userId) queryParams.append("userId", params.userId);
    if (params?.type) queryParams.append("type", params.type);

    const url = queryParams.toString()
      ? `${API_URL}/api/osint/searches?${queryParams}`
      : `${API_URL}/api/osint/searches`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getSearchById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/searches/${id}`, header);
    return res.json();
  }

  static async completeSearch(
    id: string,
    data: { results: string; confidence?: number },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/searches/${id}/complete`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(data),
    });
    return res.json();
  }

  static async failSearch(id: string, error: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/searches/${id}/fail`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify({ error }),
    });
    return res.json();
  }
}

export class HumanProfileServices {
  static async createProfile(
    profileData: {
      name?: string;
      aliases?: string;
      dateOfBirth?: string;
      placeOfBirth?: string;
      profession?: string;
      socialMedia?: string;
      images?: string;
      knownAssociates?: string;
      locations?: string;
      description?: string;
      sources?: string;
      riskScore?: number;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/humans`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(profileData),
    });
    return res.json();
  }

  static async getAllProfiles(
    token: string,
    params?: { name?: string; profession?: string },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.name) queryParams.append("name", params.name);
    if (params?.profession) queryParams.append("profession", params.profession);

    const url = queryParams.toString()
      ? `${API_URL}/api/osint/humans?${queryParams}`
      : `${API_URL}/api/osint/humans`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getProfileById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/humans/${id}`, header);
    return res.json();
  }

  static async updateProfile(id: string, profileData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/humans/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(profileData),
    });
    return res.json();
  }

  static async deleteProfile(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/humans/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }
}

export class BuildingServices {
  static async createBuilding(
    buildingData: {
      name?: string;
      address?: string;
      city?: string;
      country?: string;
      buildingType?: string;
      constructionYear?: string;
      architect?: string;
      coordinates?: string;
      owner?: string;
      usage?: string;
      images?: string;
      description?: string;
      sources?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/buildings`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(buildingData),
    });
    return res.json();
  }

  static async getAllBuildings(
    token: string,
    params?: { name?: string; city?: string; type?: string },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.name) queryParams.append("name", params.name);
    if (params?.city) queryParams.append("city", params.city);
    if (params?.type) queryParams.append("type", params.type);

    const url = queryParams.toString()
      ? `${API_URL}/api/osint/buildings?${queryParams}`
      : `${API_URL}/api/osint/buildings`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getBuildingById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/buildings/${id}`, header);
    return res.json();
  }

  static async updateBuilding(id: string, buildingData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/buildings/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(buildingData),
    });
    return res.json();
  }

  static async deleteBuilding(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/buildings/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }
}

export class ObjectServices {
  static async createObject(
    objectData: {
      name?: string;
      category?: string;
      brand?: string;
      model?: string;
      description?: string;
      specifications?: string;
      images?: string;
      estimatedValue?: string;
      rarity?: string;
      origin?: string;
      sources?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/objects`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(objectData),
    });
    return res.json();
  }

  static async getAllObjects(
    token: string,
    params?: { name?: string; category?: string; brand?: string },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.name) queryParams.append("name", params.name);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.brand) queryParams.append("brand", params.brand);

    const url = queryParams.toString()
      ? `${API_URL}/api/osint/objects?${queryParams}`
      : `${API_URL}/api/osint/objects`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getObjectById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/objects/${id}`, header);
    return res.json();
  }

  static async updateObject(id: string, objectData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/objects/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(objectData),
    });
    return res.json();
  }

  static async deleteObject(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/osint/objects/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }
}
