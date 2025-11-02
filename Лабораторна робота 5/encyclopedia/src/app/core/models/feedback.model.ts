
export interface FeedbackFormData {
  fullName: string;
  email: string;
  age: number;
  education: EducationLevel;
  purpose: FeedbackPurpose;
  details: string;
  consent: boolean;
}

enum EducationLevel {
  COMPLETE = 'повна',
  INCOMPLETE = 'неповна',
  HIGHER = 'вища',
  PROFESSIONAL = 'професійна'
}

enum FeedbackPurpose {
  COOPERATION = 'співпраця',
  COMPLAINT = 'скарга на порушення права власності',
  SUGGESTION = 'пропозиція',
  ERROR = 'помилка'
}
