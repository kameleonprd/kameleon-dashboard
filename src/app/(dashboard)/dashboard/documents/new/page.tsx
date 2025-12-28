"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, ArrowLeft } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Template options
const templates = [
  { id: "engineering", label: "Engineering", description: "Technical specs, diagrams, acceptance criteria" },
  { id: "product-manager", label: "Product Manager", description: "Problem/solution, success metrics, roadmap fit" },
  { id: "leadership", label: "Leadership", description: "Executive summary, ROI, timeline" },
];

// Persona options (placeholder data)
const personas = [
  { id: "christian-svp", label: "Christian (SVP)", description: "Prefers concise, business-focused content" },
  { id: "sarah-eng", label: "Sarah (Eng Lead)", description: "Values technical depth and edge cases" },
  { id: "mike-pm", label: "Mike (PM)", description: "Focuses on user value and metrics" },
  { id: "none", label: "No Persona", description: "Use template defaults without persona adaptation" },
];

export default function NewDocumentPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !selectedTemplate) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call to create document
    console.log({
      title,
      template: selectedTemplate,
      persona: selectedPersona,
    });

    // Navigate to documents list (or to the new document editor in the future)
    router.push("/dashboard/documents");
  };

  const isFormValid = title.trim() && selectedTemplate;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/documents"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documents
        </Link>
        <h2 className="text-2xl font-bold text-slate-900">Create New Document</h2>
        <p className="mt-1 text-slate-500">
          Start a new PRD with AI-assisted authoring tailored to your audience.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Title */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-slate-700">
                Document Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Q4 Product Roadmap PRD"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <Label className="text-slate-700 mb-3 block">Template</Label>
          <p className="text-sm text-slate-500 mb-4">
            Choose a template based on your target audience.
          </p>
          <div className="space-y-3">
            {templates.map((template) => (
              <label
                key={template.id}
                className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="template"
                  value={template.id}
                  checked={selectedTemplate === template.id}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <div className="font-medium text-slate-900">{template.label}</div>
                  <div className="text-sm text-slate-500">{template.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Persona Selection */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <Label className="text-slate-700 mb-3 block">Target Persona</Label>
          <p className="text-sm text-slate-500 mb-4">
            Select a reviewer persona to adapt the document to their preferences.
          </p>
          <div className="space-y-3">
            {personas.map((persona) => (
              <label
                key={persona.id}
                className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPersona === persona.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="persona"
                  value={persona.id}
                  checked={selectedPersona === persona.id}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <div className="font-medium text-slate-900">{persona.label}</div>
                  <div className="text-sm text-slate-500">{persona.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            isLoading={isSubmitting}
          >
            <FileText className="h-4 w-4 mr-2" />
            Create Document
          </Button>
          <Link href="/dashboard/documents">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
