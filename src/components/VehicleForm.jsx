import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function VehicleForm({ onCreated }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
  const [form, setForm] = useState({ make: '', model: '', year: '', price: '', description: '' });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const fd = new FormData();
      fd.append('make', form.make);
      fd.append('model', form.model);
      fd.append('year', String(form.year));
      fd.append('price', String(form.price));
      if (form.description) fd.append('description', form.description);
      for (const f of files) {
        fd.append('images', f);
      }
      const res = await fetch(`${backendUrl}/vehicles`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Failed to create vehicle');
      await res.json();
      setMessage('Vehicle listed successfully!');
      setForm({ make: '', model: '', year: '', price: '', description: '' });
      setFiles([]);
      onCreated?.();
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="sell" className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">List your car</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Enter details and upload a few photos. New listings appear instantly.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Make</label>
              <input name="make" value={form.make} onChange={update} required className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., Tesla" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Model</label>
              <input name="model" value={form.model} onChange={update} required className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., Model 3" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Year</label>
              <input name="year" type="number" min="1900" max="2100" value={form.year} onChange={update} required className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., 2021" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Price (USD)</label>
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={update} required className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., 35000" />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-sm font-medium">Description</label>
              <textarea name="description" value={form.description} onChange={update} rows={4} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500" placeholder="Condition, mileage, features..." />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-sm font-medium">Photos</label>
              <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
              <p className="text-xs text-neutral-500">You can select multiple images.</p>
            </div>
            <div className="sm:col-span-2">
              <button disabled={submitting} type="submit" className="inline-flex items-center justify-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-2.5 text-sm font-medium shadow hover:opacity-90 transition">
                {submitting ? 'Listing...' : 'Publish listing'}
              </button>
              {message && <span className="ml-3 text-sm text-neutral-600 dark:text-neutral-300">{message}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
