export interface ReportCreateDto {
  comment_id: string;
  post_id: string;
  type: number;
}

export enum ReportType {
  Spam = 1,
  Violence = 2,
  UnauthorizedSales = 3,
  Trouble = 4,
  Terrorism = 5,
  FakeInformation = 6,
  Others = 7,
}
