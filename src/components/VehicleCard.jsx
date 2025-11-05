export default function VehicleCard({ vehicle, backendUrl }) {
  const { make, model, year, price, description, image_urls = [] } = vehicle;
  const mainImage = image_urls[0] ? `${backendUrl}${image_urls[0]}` : null;

  return (
    <div className="group rounded-xl border border-neutral-200/70 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition">
      <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        {mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mainImage} alt={`${make} ${model}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {year} {make} {model}
          </h3>
          <span className="text-red-600 font-bold">${price.toLocaleString()}</span>
        </div>
        {description && (
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
}
