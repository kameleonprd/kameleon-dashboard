import {
  FileText,
  UserCheck,
  PenTool,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Select a Template',
    description:
      'Choose a document structure tailored to your audience: Engineering, Product, or Leadership.',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Choose the Reviewer Persona',
    description:
      'Select from your calibrated profiles to match the specific reviewer who will approve your document.',
  },
  {
    number: '03',
    icon: PenTool,
    title: 'Write Your Draft',
    description:
      'Focus on the content. Write naturally without worrying about style adjustments.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'System Adapts Content',
    description:
      'Axioms, template structure, and persona preferences automatically transform your draft.',
  },
  {
    number: '05',
    icon: CheckCircle2,
    title: 'Model Reviewer Validates',
    description:
      'An AI reviewer simulates stakeholder feedback before you send, catching issues early.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            From draft to approval in five simple steps. Write once, adapt
            automatically, ship confidently.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-200 via-purple-200 to-violet-200" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  <div className="flex flex-col items-center text-center">
                    {/* Step Number & Icon */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-white rounded-2xl shadow-lg shadow-violet-100 border border-violet-100 flex items-center justify-center relative z-10">
                        <Icon className="w-8 h-8 text-violet-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (mobile/tablet) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center text-violet-300">
                      <svg
                        className="w-6 h-6 rotate-90"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
