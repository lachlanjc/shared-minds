import Link from "next/link";

const WEEKS = [
  "Canvas: Friends Chat",
  "Spatial: LNG Export Globe",
  "Draggable: visionOS Windows",
  "Shareable: Friends Globe",
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 flex flex-col text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">
        {WEEKS.map((week, i) => (
          <Link
            key={i}
            href={`/${i + 1}`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-0 text-2xl font-semibold`}>
              <small className="block uppercase opacity-50">Week {i + 1}</small>
              {week}
            </h2>
            {/* <p className={`mb-0 mt-3 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p> */}
          </Link>
        ))}
      </div>
    </main>
  );
}
