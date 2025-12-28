"use client";

import { useState } from "react";
import { Settings, User, Lock, Trash2, Save, Mail, Globe, Palette } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { user } = useAuth();

  // Placeholder state for form fields
  const [name, setName] = useState(user?.name || "");
  const [defaultTemplate, setDefaultTemplate] = useState("engineering");
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [theme, setTheme] = useState("system");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
          <Settings className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-5">
          <User className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
        </div>

        <div className="space-y-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-xl font-semibold text-indigo-600">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <Button variant="outline" size="sm" disabled>
                Change Avatar
              </Button>
              <p className="text-xs text-slate-500 mt-1">Coming soon</p>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="max-w-md"
            />
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2 max-w-md">
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-slate-50"
              />
              <Mail className="h-4 w-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500">Email cannot be changed</p>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Preferences</h2>
        </div>

        <div className="space-y-4">
          {/* Default Template */}
          <div className="space-y-2">
            <Label htmlFor="defaultTemplate">Default Template</Label>
            <select
              id="defaultTemplate"
              value={defaultTemplate}
              onChange={(e) => setDefaultTemplate(e.target.value)}
              className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="engineering">Engineering</option>
              <option value="product">Product Managers</option>
              <option value="leadership">Leadership</option>
            </select>
          </div>

          {/* Default Language */}
          <div className="space-y-2">
            <Label htmlFor="defaultLanguage">Default Language</Label>
            <select
              id="defaultLanguage"
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              className="flex h-10 w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          {/* Theme (placeholder) */}
          <div className="space-y-2">
            <Label htmlFor="theme" className="flex items-center gap-2">
              Theme
              <span className="text-xs text-slate-400 font-normal">(Coming soon)</span>
            </Label>
            <div className="flex items-center gap-2 max-w-md">
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                disabled
                className="flex h-10 w-full rounded-md border border-input bg-slate-50 px-3 py-2 text-sm ring-offset-background opacity-50 cursor-not-allowed"
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
              <Palette className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-5">
          <Lock className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Account</h2>
        </div>

        <div className="space-y-4">
          {/* Change Password */}
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p className="font-medium text-slate-900">Change Password</p>
              <p className="text-sm text-slate-500">Update your password regularly for security</p>
            </div>
            <Button variant="outline" disabled>
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </div>

          {/* Danger Zone - Delete Account */}
          <div className="pt-4">
            <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-3">
              Danger Zone
            </h3>
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="font-medium text-red-900">Delete Account</p>
                <p className="text-sm text-red-700">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" disabled>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button disabled>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
