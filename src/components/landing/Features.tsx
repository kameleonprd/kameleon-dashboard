import { Compass, LayoutTemplate, UserCircle2 } from 'lucide-react';

const features = [
  {
    icon: Compass,
    title: 'Guiding Principles',
    subtitle: 'Axioms',
    description:
      'Writing rules that ensure clarity and impact. Be factual, make every sentence count, serve your audience, and stay actionable.',
    color: 'violet',
  },
  {
    icon: LayoutTemplate,
    title: 'Audience-Ready Structures',
    subtitle: 'Templates',
    description:
      'Document formats tailored to Engineering, Product, or Leadership. Each template focuses on what that audience cares about most.',
    color: 'purple',
  },
  {
    icon: UserCircle2,
    title: 'Reviewer Calibration',
    subtitle: 'Personas',
    description:
      'Build profiles from real feedback to match individual preferences. Capture tone, depth, terminology, and approval patterns.',
    color: 'fuchsia',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Three Pillars of Perfect PRDs
          </h2>
          <p className="text-lg text-gray-600">
            Combine guiding principles, structured templates, and personalized
            profiles to create documents that resonate with every stakeholder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl group-hover:from-violet-200 group-hover:to-purple-200 transition-colors">
                    <Icon className="w-7 h-7 text-violet-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-2">
                  <span className="text-sm font-medium text-violet-600">
                    {feature.subtitle}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
