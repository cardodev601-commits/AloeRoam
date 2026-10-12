import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      <section className="max-w-5xl mx-auto px-6 py-24">

        <h1 className="text-6xl font-bold text-[#174D3A]">
          AloeRoam
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Discover local events, promotions
          and services around you.
        </p>

        <div className="mt-10 flex gap-4">

          <a>
            Privacy Policy
          </a>

          <a>
            Support
          </a>

        </div>

      </section>

    </main>
  );
}