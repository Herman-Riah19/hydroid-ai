import { headersAuthFetch } from "@/utils/header-fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class WeaponServices {
  static async createWeapon(
    weaponData: {
      name: string;
      category: string;
      subcategory?: string;
      manufacturer?: string;
      country?: string;
      yearIntroduced?: string;
      description?: string;
      history?: string;
      use?: string;
      caliber?: string;
      weight?: string;
      length?: string;
      barrelLength?: string;
      muzzleVelocity?: string;
      effectiveRange?: string;
      capacity?: string;
      action?: string;
      images?: string;
      videos?: string;
      isAutomatic?: boolean;
      isPremium?: boolean;
      sources?: string;
    },
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/premium/weapons`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(weaponData),
    });
    return res.json();
  }

  static async getAllWeapons(
    token: string,
    params?: {
      category?: string;
      manufacturer?: string;
      name?: string;
      premium?: boolean;
    },
  ) {
    const header = headersAuthFetch(token);
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.manufacturer)
      queryParams.append("manufacturer", params.manufacturer);
    if (params?.name) queryParams.append("name", params.name);
    if (params?.premium) queryParams.append("premium", "true");

    const url = queryParams.toString()
      ? `${API_URL}/api/premium/weapons?${queryParams}`
      : `${API_URL}/api/premium/weapons`;

    const res = await fetch(url, header);
    return res.json();
  }

  static async getWeaponById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/premium/weapons/${id}`, header);
    return res.json();
  }

  static async updateWeapon(id: string, weaponData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/premium/weapons/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(weaponData),
    });
    return res.json();
  }

  static async deleteWeapon(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${API_URL}/api/premium/weapons/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }
}
