"use client";

import Link from "next/link";
import { Users, Plus, User, Calendar, BookOpen } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

// Placeholder data for sample personas
const samplePersonas = [
  {
    id: "1",
    name: "Christian",
    role: "SVP of Product",
    department: "Executive",
    description:
      "Prefers high-level executive summaries with clear ROI metrics and strategic alignment.",
    calibrationExamples: 12,
    createdAt: "2024-12-15",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Engineering Lead",
    department: "Engineering",
    description:
      "Focuses on technical feasibility, edge cases, and implementation details. Values precise specifications.",
    calibrationExamples: 8,
    createdAt: "2024-12-10",
  },
  {
    id: "3",
    name: "Marcus Johnson",
    role: "Senior Product Manager",
    department: "Product",
    description:
      "Emphasizes user value, success metrics, and roadmap alignment. Appreciates clear scope boundaries.",
    calibrationExamples: 5,
    createdAt: "2024-12-08",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    role: "VP of Design",
    department: "Design",
    description:
      "Values user-centric framing and clear UX rationale. Prefers visual references when possible.",
    calibrationExamples: 3,
    createdAt: "2024-12-01",
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PersonasPage() {
  const { user } = useAuth();

  // In a real app, this would come from an API
  const personas = samplePersonas;
  const hasPersonas = personas.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Personas</h1>
          <p className="mt-1 text-slate-500">
            Manage reviewer profiles built from real feedback examples.
          </p>
        </div>
        <Link href="/dashboard/personas/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Persona
          </Button>
        </Link>
      </div>

      {/* Content */}
      {hasPersonas ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map((persona) => (
            <Link
              key={persona.id}
              href={`/dashboard/personas/${persona.id}`}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                    {persona.name}
                  </h3>
                  <p className="text-sm text-slate-500 truncate">
                    {persona.role}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                {persona.description}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{persona.calibrationExamples} examples</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(persona.createdAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center">
            <Users className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No personas yet
          </h3>
          <p className="mt-2 text-slate-500 max-w-md mx-auto">
            Create your first persona by providing examples of feedback from a
            specific reviewer. The system will learn their preferences and help
            you write documents that resonate with them.
          </p>
          <Link href="/dashboard/personas/new" className="inline-block mt-6">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Persona
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
