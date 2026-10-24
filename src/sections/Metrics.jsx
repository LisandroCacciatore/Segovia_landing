import { metrics } from '../data/hero.js';

export default function Metrics() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl relative">
      <div className="w-full max-w-[1240px] mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg md:gap-space-xl">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="flex flex-col items-start p-space-md bg-surface-container rounded-xl shadow-sm"
            >
              <span className="font-stat-number text-stat-number-mobile md:text-stat-number text-primary">
                {metric.value}
              </span>
              <span className="font-body-sm text-on-surface font-semibold pt-space-xs">
                {metric.title}
              </span>
              <span className="font-body-sm text-on-surface-variant">{metric.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
