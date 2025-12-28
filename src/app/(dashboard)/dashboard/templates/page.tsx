"use client";

import {
  Layout,
  FileText,
  Plus,
  Code,
  Users,
  Briefcase,
  LayoutTemplate,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

// Template type definition
interface Template {
  id: string;
  name: string;
  description: string;
  audience: "Engineering" | "Product Manager" | "Leadership";
  focus: string;
  structure: string[];
  documentCount: number;
  isDefault: boolean;
}

// Placeholder template data based on CLAUDE.md
const templates: Template[] = [
  {
    id: "tpl-engineering",
    name: "Engineering Template",
    description:
      "Technical specifications with implementation details, edge cases, and dependencies.",
    audience: "Engineering",
    focus: "Technical feasibility, edge cases, dependencies",
    structure: ["Specs", "Diagrams", "Acceptance criteria"],
    documentCount: 5,
    isDefault: true,
  },
  {
    id: "tpl-product-manager",
    name: "Product Manager Template",
    description:
      "User-focused documentation emphasizing value proposition, scope definition, and tradeoff analysis.",
    audience: "Product Manager",
    focus: "User value, scope, tradeoffs",
    structure: ["Problem/solution", "Success metrics", "Roadmap fit"],
    documentCount: 4,
    isDefault: true,
  },
  {
    id: "tpl-leadership",
    name: "Leadership Template",
    description:
      "Executive-oriented summaries highlighting business impact, risk assessment, and resource needs.",
    audience: "Leadership",
    focus: "Business impact, risk, resource needs",
    structure: ["Executive summary", "ROI", "Timeline"],
    documentCount: 3,
    isDefault: true,
  },
];

// Audience icon mapping
const audienceIcons: Record<Template["audience"], typeof Code> = {
  Engineering: Code,
  "Product Manager": Users,
  Leadership: Briefcase,
};

// Audience color mapping
const audienceColors: Record<Template["audience"], string> = {
  Engineering: "bg-blue-500",
  "Product Manager": "bg-purple-500",
  Leadership: "bg-amber-500",
};

// Audience badge color mapping
const audienceBadgeColors: Record<Template["audience"], string> = {
  Engineering: "bg-blue-50 text-blue-700 border-blue-200",
  "Product Manager": "bg-purple-50 text-purple-700 border-purple-200",
  Leadership: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function TemplatesPage() {
  const { user } = useAuth();
  const hasTemplates = templates.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Templates</h2>
          <p className="mt-1 text-slate-500">
            Document structures tailored to different audience types.
          </p>
        </div>
        <Button disabled className="gap-2">
          <Plus className="h-4 w-4" />
          Create Template
          <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded">
            Coming soon
          </span>
        </Button>
      </div>

      {/* Templates Grid or Empty State */}
      {hasTemplates ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const AudienceIcon = audienceIcons[template.audience];
            return (
              <div
                key={template.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                {/* Header with icon and badge */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`${audienceColors[template.audience]} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <AudienceIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {template.isDefault && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        Default
                      </span>
                    )}
                  </div>
                </div>

                {/* Title and description */}
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Audience badge */}
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${audienceBadgeColors[template.audience]}`}
                  >
                    {template.audience}
                  </span>
                </div>

                {/* Focus area */}
                <div className="mt-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                    Focus
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{template.focus}</p>
                </div>

                {/* Structure tags */}
                <div className="mt-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                    Structure
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {template.structure.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with document count */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <FileText className="h-4 w-4" />
                    <span>
                      {template.documentCount}{" "}
                      {template.documentCount === 1 ? "document" : "documents"}
                    </span>
                  </div>
                  <button
                    disabled
                    className="text-sm text-slate-400 flex items-center gap-1 cursor-not-allowed"
                    title="Coming soon"
                  >
                    View
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <LayoutTemplate className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No templates yet
          </h3>
          <p className="mt-2 text-slate-500 max-w-md mx-auto">
            Templates define document structures tailored to different audiences.
            Create your first template to get started.
          </p>
          <Button disabled className="mt-6 gap-2">
            <Plus className="h-4 w-4" />
            Create Template
            <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded">
              Coming soon
            </span>
          </Button>
        </div>
      )}

      {/* Info section */}
      <div className="bg-green-50 rounded-xl border border-green-100 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
            <Layout className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-900">
              About Templates
            </h3>
            <p className="mt-2 text-green-700">
              Templates structure your PRD content for specific audiences. Each
              template defines what sections to include and how to frame
              information. Use the default templates or create custom ones to
              match your organization&apos;s needs.
            </p>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <Code className="h-4 w-4" />
                  Engineering
                </div>
                <p className="mt-1 text-sm text-green-700">
                  Technical specs, edge cases, dependencies
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 text-purple-700 font-medium">
                  <Users className="h-4 w-4" />
                  Product Managers
                </div>
                <p className="mt-1 text-sm text-green-700">
                  User value, scope, tradeoffs
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 text-amber-700 font-medium">
                  <Briefcase className="h-4 w-4" />
                  Leadership
                </div>
                <p className="mt-1 text-sm text-green-700">
                  Business impact, ROI, timeline
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
