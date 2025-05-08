import ProductCard from './ProductCard';

function ProductGrid({ skins }) {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skins.map((skin) => (
              <ProductCard key={skin.id} skin={skin} />
          ))}
      </div>
  );
}

export default ProductGrid;