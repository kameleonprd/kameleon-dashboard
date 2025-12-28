"use client";

import Link from "next/link";
import {
  FileText,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Clock,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

// Document status types
type DocumentStatus = "draft" | "in_review" | "approved";

// Document interface
interface Document {
  id: string;
  title: string;
  template: string;
  status: DocumentStatus;
  lastModified: string;
}

// Placeholder documents data
const documents: Document[] = [
  {
    id: "1",
    title: "Q4 Product Roadmap PRD",
    template: "Leadership",
    status: "approved",
    lastModified: "2 hours ago",
  },
  {
    id: "2",
    title: "Mobile App Feature Specification",
    template: "Engineering",
    status: "in_review",
    lastModified: "1 day ago",
  },
  {
    id: "3",
    title: "User Authentication Redesign",
    template: "Product Manager",
    status: "draft",
    lastModified: "3 days ago",
  },
  {
    id: "4",
    title: "API Integration Guidelines",
    template: "Engineering",
    status: "draft",
    lastModified: "1 week ago",
  },
];

// Status badge component
function StatusBadge({ status }: { status: DocumentStatus }) {
  const statusStyles = {
    draft: "bg-slate-100 text-slate-700",
    in_review: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    draft: "Draft",
    in_review: "In Review",
    approved: "Approved",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">
        No documents yet
      </h3>
      <p className="text-slate-500 mb-6 max-w-sm mx-auto">
        Create your first PRD document to get started with AI-assisted authoring.
      </p>
      <Link href="/dashboard/documents/new">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Document
        </Button>
      </Link>
    </div>
  );
}

export default function DocumentsPage() {
  const { user } = useAuth();
  const hasDocuments = documents.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Documents</h2>
          <p className="mt-1 text-slate-500">
            Manage your PRD documents and track their review status.
          </p>
        </div>
        <Link href="/dashboard/documents/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Document
          </Button>
        </Link>
      </div>

      {/* Documents List or Empty State */}
      {hasDocuments ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Template</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Last Modified</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
              >
                {/* Title */}
                <div className="col-span-5">
                  <Link
                    href={`/dashboard/documents/${doc.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {doc.title}
                    </span>
                  </Link>
                </div>

                {/* Template */}
                <div className="col-span-2 text-sm text-slate-600">
                  {doc.template}
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <StatusBadge status={doc.status} />
                </div>

                {/* Last Modified */}
                <div className="col-span-2 flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>{doc.lastModified}</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end">
                  <div className="flex items-center gap-1">
                    <Link href={`/dashboard/documents/${doc.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-slate-500" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/documents/${doc.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4 text-slate-500" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-slate-500 hover:text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
