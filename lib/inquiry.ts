export const PROJECT_TYPES = [
  "Web",
  "Mobile",
  "Data/ML",
  "IoT",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Not sure yet",
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$8,000",
  "$8,000+",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type BudgetRange = (typeof BUDGET_RANGES)[number];

export type InquiryPayload = {
  name: string;
  email: string;
  projectType: ProjectType;
  budget: BudgetRange;
  timeline: string;
  brief: string;
};

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<keyof InquiryPayload, string>>;
};

export const initialInquiryState: InquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

function getFormValue(formData: FormData, key: keyof InquiryPayload): string {
  return String(formData.get(key) ?? "").trim();
}

export function parseInquiry(
  formData: FormData,
): { data: InquiryPayload | null; fieldErrors: InquiryState["fieldErrors"] } {
  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const projectType = getFormValue(formData, "projectType");
  const budget = getFormValue(formData, "budget");
  const timeline = getFormValue(formData, "timeline");
  const brief = getFormValue(formData, "brief");
  const fieldErrors: InquiryState["fieldErrors"] = {};

  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "Enter a name between 2 and 80 characters.";
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!PROJECT_TYPES.includes(projectType as ProjectType)) {
    fieldErrors.projectType = "Choose a project type.";
  }

  if (!BUDGET_RANGES.includes(budget as BudgetRange)) {
    fieldErrors.budget = "Choose a budget range.";
  }

  if (timeline.length < 2 || timeline.length > 80) {
    fieldErrors.timeline = "Enter a timeline between 2 and 80 characters.";
  }

  if (brief.length < 20 || brief.length > 3000) {
    fieldErrors.brief = "Enter a project brief between 20 and 3000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { data: null, fieldErrors };
  }

  return {
    data: {
      name,
      email,
      projectType: projectType as ProjectType,
      budget: budget as BudgetRange,
      timeline,
      brief,
    },
    fieldErrors,
  };
}
