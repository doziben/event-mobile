export type priviledge = "freemium" | "premium" | "elite";

export interface CategoryDto {
  name: string;
  media: string;
  previledge: priviledge;
  license: string;
}
export interface CategoryDataObj {
  _id: string;
  name: string;
  parent: string;
  media: string;
  previledge: priviledge; //typo err from api :(
  formId: string;
  license: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceDataObj {
  _id: string;
  name: string;
  parent: string;
  media: string;
  previledge: priviledge; //typo err from api :(
  license: string;
  createdAt: Date;
  updatedAt: Date;
}
