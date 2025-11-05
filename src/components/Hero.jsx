import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[70vh] md:min-h-[80vh] bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Find your next ride
          </h1>
          <p className="mt-4 text-neutral-300 max-w-xl">
            A curated marketplace for exceptional cars. Browse a growing catalog or list your vehicle in minutes.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#catalog" className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 px-5 py-3 text-sm font-medium shadow hover:opacity-90 transition">
              Explore catalog
            </a>
            <a href="#sell" className="inline-flex items-center justify-center rounded-md bg-red-600 text-white px-5 py-3 text-sm font-medium shadow hover:bg-red-500 transition">
              List your car
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
    </section>
  );
}
