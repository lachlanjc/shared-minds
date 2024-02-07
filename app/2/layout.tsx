import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { STATUS_COLORS } from "./terminals";

export const metadata: Metadata = {
  title: "LNG Exports",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={GeistMono.className}>
      {children}
      <h1 className="absolute left-12 top-12 text-2xl font-bold text-white">
        Natural gas exports from Cove Point, MD in 2023
      </h1>
      <div
        className="absolute bottom-12 left-12 flex flex-col gap-2"
        aria-hidden
      >
        <h2 className="mb-0 text-xs font-bold uppercase tracking-widest text-white">
          Export terminal colors
        </h2>
        <dl>
          {Object.keys(STATUS_COLORS)
            .reverse()
            .map((status, i) => (
              <div
                key={status}
                className={`mt-1 flex items-center justify-start gap-2 text-xs text-white/70`}
              >
                <div
                  className={`h-3 w-3 rounded-full`}
                  style={{
                    backgroundColor:
                      STATUS_COLORS[status as keyof typeof STATUS_COLORS],
                  }}
                />
                <dd className="capitalize">{status.replace("-", " ")}</dd>
              </div>
            ))}
        </dl>
      </div>
    </div>
  );
}
