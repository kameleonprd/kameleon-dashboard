"use client";

import Link from "next/link";
import {
  FileText,
  Users,
  Layout,
  ListChecks,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

// Quick stats placeholder data
const stats = [
  {
    label: "Documents",
    value: "12",
    icon: FileText,
    href: "/dashboard/documents",
    color: "bg-blue-500",
  },
  {
    label: "Personas",
    value: "5",
    icon: Users,
    href: "/dashboard/personas",
    color: "bg-purple-500",
  },
  {
    label: "Templates",
    value: "3",
    icon: Layout,
    href: "/dashboard/templates",
    color: "bg-green-500",
  },
  {
    label: "Axioms",
    value: "4",
    icon: ListChecks,
    href: "/dashboard/axioms",
    color: "bg-amber-500",
  },
];

// Recent activity placeholder data
const recentActivity = [
  {
    id: "1",
    action: "Created",
    item: "Q4 Product Roadmap PRD",
    time: "2 hours ago",
    type: "document",
  },
  {
    id: "2",
    action: "Updated",
    item: "Christian (SVP) persona",
    time: "5 hours ago",
    type: "persona",
  },
  {
    id: "3",
    action: "Created",
    item: "Engineering Template",
    time: "1 day ago",
    type: "template",
  },
  {
    id: "4",
    action: "Modified",
    item: "Be factual axiom",
    time: "2 days ago",
    type: "axiom",
  },
  {
    id: "5",
    action: "Created",
    item: "Mobile App Feature PRD",
    time: "3 days ago",
    type: "document",
  },
];

// Quick action cards
const quickActions = [
  {
    title: "Create New Document",
    description: "Start a new PRD with AI assistance",
    href: "/dashboard/documents/new",
    icon: FileText,
  },
  {
    title: "Add Persona",
    description: "Create a reviewer profile from examples",
    href: "/dashboard/personas/new",
    icon: Users,
  },
  {
    title: "Manage Templates",
    description: "Customize document structures",
    href: "/dashboard/templates",
    icon: Layout,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome back, {firstName}!
        </h2>
        <p className="mt-1 text-slate-500">
          Your PRD authoring assistant that adapts to reviewer preferences.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Activity
            </h3>
            <Link
              href="/dashboard/documents"
              className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                <p className="text-sm text-slate-900">
                  <span className="text-slate-500">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.item}</span>
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Getting Started Tips */}
      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
        <h3 className="text-lg font-semibold text-indigo-900">
          Getting Started
        </h3>
        <p className="mt-2 text-indigo-700">
          Kameleon helps you write PRDs that resonate with specific reviewers.
          Start by creating personas from real feedback examples, then use them
          when drafting documents.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/dashboard/personas/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Users className="h-4 w-4" />
            Create Your First Persona
          </Link>
          <Link
            href="/dashboard/documents/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 text-sm font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Start a New Document
          </Link>
        </div>
      </div>
    </div>
  );
}
