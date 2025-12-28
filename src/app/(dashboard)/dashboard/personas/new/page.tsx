"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, BookOpen, Info } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewPersonaPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, this would create the persona via API
    // For now, redirect back to the personas list
    router.push("/dashboard/personas");
  };

  const isFormValid =
    formData.name.trim() !== "" && formData.role.trim() !== "";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard/personas"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Personas
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create New Persona</h1>
        <p className="mt-1 text-slate-500">
          Define a reviewer profile to help tailor PRDs to their preferences.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Basic Information</h2>
              <p className="text-sm text-slate-500">
                Identify the reviewer this persona represents
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Christian, Sarah Chen"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                Role / Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="role"
                name="role"
                placeholder="e.g., SVP of Product, Engineering Lead"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                placeholder="e.g., Engineering, Product, Executive"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Describe this reviewer's communication preferences, what they focus on, and what makes documents resonate with them..."
                value={formData.description}
                onChange={handleChange}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Calibration Examples Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                Calibration Examples
              </h2>
              <p className="text-sm text-slate-500">
                Train the system on this reviewer's preferences
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-700 mb-1">
                  Add examples after creating the persona
                </p>
                <p>
                  Once you create this persona, you'll be able to add calibration
                  examples including:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-500">
                  <li>Documents they liked with notes on what worked</li>
                  <li>Documents they pushed back on with their feedback</li>
                  <li>Before/after revision examples</li>
                  <li>Specific phrases or terminology they prefer</li>
                </ul>
                <p className="mt-2 text-slate-500">
                  The more examples you provide, the better the system can adapt
                  documents to this reviewer's preferences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link href="/dashboard/personas">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            isLoading={isSubmitting}
          >
            Create Persona
          </Button>
        </div>
      </form>
    </div>
  );
}
