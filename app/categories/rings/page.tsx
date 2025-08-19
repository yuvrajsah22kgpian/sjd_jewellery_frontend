'use client';
import ProductsPage from '../../../components/ProductPage';


export default function JewelryCollectionPage() {
  return (
    <ProductsPage 
      heroLine1="Natural Diamond Jewelry Collection"
      heroLine2="Discover our exquisite collection of handcrafted diamond jewelry"
      defaultExpandedFilter="category"
      pageSize={12}
      defaultFilters={{}}
    />
  );
}
