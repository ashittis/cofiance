export type FormData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  industries: string[];
  availability: string;
  experience: string;
};

export type Step = 0 | 1 | 2 | "success";
