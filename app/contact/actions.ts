"use server";

import { parseInquiry, type InquiryState } from "@/lib/inquiry";

const submissionError: InquiryState = {
  status: "error",
  message:
    "The inquiry form is not configured yet. Please email ralphvincentrodriguez@sksu.edu.ph.",
  fieldErrors: {},
};

export async function submitInquiry(
  _previousState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const { data, fieldErrors } = parseInquiry(formData);
  if (!data) {
    return {
      status: "error",
      message: "Please correct the highlighted fields before submitting.",
      fieldErrors,
    };
  }

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    return { ...submissionError };
  }

  const payload = new FormData();
  for (const [key, entry] of Object.entries(data)) {
    payload.set(key, entry);
  }
  payload.set("_subject", `Portfolio inquiry from ${data.name}`);

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
      cache: "no-store",
    });

    if (!response.ok) {
      return { ...submissionError };
    }

    return {
      status: "success",
      message:
        "Your inquiry has been sent successfully. I will review your requirements and respond within 1–2 business days.",
      fieldErrors: {},
    };
  } catch {
    return { ...submissionError };
  }
}
