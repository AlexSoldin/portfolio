"use client";

import { useState, FormEvent, useCallback } from "react";
import { API_ENDPOINTS } from "@/config";

interface SubmitStatus {
  type: "success" | "error" | null;
  message: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface UseContactFormReturn {
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  resetStatus: () => void;
}

export function useContactForm(): UseContactFormReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  const resetStatus = useCallback(() => {
    setSubmitStatus({ type: null, message: "" });
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string | undefined,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });
        e.currentTarget.reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, submitStatus, handleSubmit, resetStatus };
}

