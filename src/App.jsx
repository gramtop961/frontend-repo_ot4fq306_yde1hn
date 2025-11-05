import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VehicleGrid from './components/VehicleGrid';
import VehicleForm from './components/VehicleForm';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const onCreated = useCallback(() => setRefreshKey((k) => k + 1), []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <Navbar />
      <main>
        <Hero />
        <VehicleGrid refreshKey={refreshKey} />
        <VehicleForm onCreated={onCreated} />
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Driftline — Buy and sell cars with style.
        </div>
      </footer>
    </div>
  );
}

export default App;
