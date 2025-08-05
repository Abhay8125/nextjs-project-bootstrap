"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/Product";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const fallbackImage = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/898107aa-dcbc-4d01-a55d-cbab806294c6.png";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Product not found');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 300);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-8">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Product Not Found</h1>
            <p className="text-red-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
            <div className="space-x-4">
              <button
                onClick={() => router.back()}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push('/products')}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <button onClick={() => router.push('/')} className="hover:text-gray-700">
              Home
            </button>
          </li>
          <li>/</li>
          <li>
            <button onClick={() => router.push('/products')} className="hover:text-gray-700">
              Products
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900 capitalize">{product.category}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={imageError ? "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/898107aa-dcbc-4d01-a55d-cbab806294c6.png" : product.image}
            alt={`Detailed product image for ${product.title}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">★ {product.rating.rate}</span>
              <span className="text-sm text-gray-400">({product.rating.count} reviews)</span>
            </div>
          </div>

          <div className="prose prose-sm text-gray-700">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
