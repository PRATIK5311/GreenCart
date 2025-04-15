// import React from 'react'
// import ProductCard from './ProductCard'
// import { useAppContext } from '../context/AppContext';

// const BestSeller = () => {
//     const { products } = useAppContext();
//   return (
//     <div className='mt-16'>
//       <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
//         {products.filter((product)=> product.inStock).slice(0,5).map((product, index)=>(
//             <ProductCard key={index} product={product}/>
//         ))}
        
//       </div>
//     </div>
//   )
// }

// export default BestSeller




import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();

  // Get top 5 in-stock products
  const bestSellers = products.filter(product => product.inStock).slice(0, 5);

  return (
    <section className="mt-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Best Sellers
      </h2>

      {bestSellers.length > 0 ? (
        // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
          {bestSellers.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No best sellers available right now.</p>
      )}
    </section>
  );
};

export default BestSeller;