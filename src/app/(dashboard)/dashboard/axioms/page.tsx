"use client";

import { useState } from "react";
import { ListChecks, Plus, Edit, Trash2, Shield, Star } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

// Axiom type definition
interface Axiom {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

// Default axioms from CLAUDE.md
const defaultAxioms: Axiom[] = [
  {
    id: "default-1",
    name: "Be factual",
    description:
      "No speculation, no filler, no hedge words without justification",
    isDefault: true,
  },
  {
    id: "default-2",
    name: "Every sentence counts",
    description:
      "If it can be removed without losing meaning, remove it",
    isDefault: true,
  },
  {
    id: "default-3",
    name: "Serve the audience",
    description:
      "Frame information in terms the reader cares about",
    isDefault: true,
  },
  {
    id: "default-4",
    name: "Be actionable",
    description:
      "Readers should know what to do or decide after reading",
    isDefault: true,
  },
];

// Placeholder custom axioms
const customAxioms: Axiom[] = [];

export default function AxiomsPage() {
  const { user } = useAuth();
  const [axioms] = useState<Axiom[]>([...defaultAxioms, ...customAxioms]);

  const defaultAxiomsList = axioms.filter((a) => a.isDefault);
  const customAxiomsList = axioms.filter((a) => !a.isDefault);

  const handleDelete = (id: string) => {
    // Placeholder for delete functionality
    console.log("Delete axiom:", id);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
            <ListChecks className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Axioms</h1>
            <p className="mt-1 text-slate-500">
              Guiding principles that shape the quality and style of your PRD
              content.
            </p>
          </div>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Axiom
        </Button>
      </div>

      {/* Default Axioms Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900">
            Default Axioms
          </h2>
          <span className="text-sm text-slate-500">
            ({defaultAxiomsList.length})
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {defaultAxiomsList.map((axiom) => (
            <div
              key={axiom.id}
              className="bg-white rounded-xl border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {axiom.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      Default
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {axiom.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Axioms Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900">
            Custom Axioms
          </h2>
          <span className="text-sm text-slate-500">
            ({customAxiomsList.length})
          </span>
        </div>

        {customAxiomsList.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mx-auto">
              <ListChecks className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-slate-900">
              No custom axioms yet
            </h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              Create custom axioms to add organization-specific principles that
              guide your PRD content.
            </p>
            <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Axiom
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {customAxiomsList.map((axiom) => (
              <div
                key={axiom.id}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {axiom.name}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-600">
                        Custom
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {axiom.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <button
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit axiom"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(axiom.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete axiom"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-amber-50 rounded-xl border border-amber-100 p-6">
        <h3 className="text-lg font-semibold text-amber-900">
          What are Axioms?
        </h3>
        <p className="mt-2 text-amber-700">
          Axioms are guiding principles that ensure consistency and quality
          across all your PRD content. Default axioms provide a solid foundation
          for clear, actionable documentation. Add custom axioms to incorporate
          your organization&apos;s specific standards and values.
        </p>
      </div>
    </div>
  );
}
