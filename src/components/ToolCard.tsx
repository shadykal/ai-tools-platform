'use client';

import Link from 'next/link';
import { AITool } from '@/types/tools';

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={tool.route}>
      <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 h-full">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

        {/* Content */}
        <div className="relative p-6 h-full flex flex-col justify-between">
          {/* Icon and Header */}
          <div>
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {tool.description}
            </p>
          </div>

          {/* Features */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <ul className="space-y-2">
              {tool.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <span className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              ابدأ الآن
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
