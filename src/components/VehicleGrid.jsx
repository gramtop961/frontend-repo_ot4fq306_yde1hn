import { useEffect, useState } from 'react';
import VehicleCard from './VehicleCard';

export default function VehicleGrid({ refreshKey }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVehicles() {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/vehicles`);
      const data = await res.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch vehicles', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  if (loading) {
    return (
      <section id="catalog" className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Available vehicles</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">Loading catalog...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-12 md:py-16 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:3xl font-bold tracking-tight text-neutral-900 dark:text-white">Available vehicles</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">Browse newly listed cars from verified sellers.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.length === 0 ? (
            <div className="col-span-full text-neutral-600 dark:text-neutral-300">No vehicles yet. Be the first to list!</div>
          ) : (
            vehicles.map((v) => <VehicleCard key={v.id} vehicle={v} backendUrl={backendUrl} />)
          )}
        </div>
      </div>
    </section>
  );
}
