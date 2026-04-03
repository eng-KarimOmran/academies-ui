import type { Platform } from "./enums";

export interface SocialMediaLink {
  id: string;
  platform: Platform;
  url: string;
  academyId: string;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
}

export interface Academy {
  id: string;
  name: string;
  phone: string;
  address: string;
  instaPay: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcademyDetails extends Academy {
  socialMediaPlatforms: SocialMediaLink[];
  owners: Owner[];
}
