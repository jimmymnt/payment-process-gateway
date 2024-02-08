"use client"
import React, {useEffect, useState} from 'react';
import SearchProducts from "@/components/Product/SearchProducts";
import Link from "next/link";
import Loading from "@/components/Loading";
import api from "@/utils/Api";
import {Pagination} from "flowbite-react";
import ProductCard from "@/components/Product/ProductCard";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const paginate = (page) => {
    setCurrentPage(page);
    setLoading(true);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (currentPage !== undefined) {
          setLoading(true);
          const response = await api.get(`/products?skip=${(currentPage - 1) * 10}&limit=${limit}`);

          const {data} = response;
          setProducts(data.products);
          setTotal(data.total);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts().then();
  }, [currentPage, limit]);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  return (
    <div className="mx-auto py-14 sm:py-14">
      <SearchProducts/>
      <Loading loading={loading}>
        <div
          className="items-center my-8 grid grid-cols-1 gap-x-6 gap-y-10 mt-10 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            products && products.map(product => {
              return (
                <ProductCard key={product.id} product={product}/>
              )
            })
          }
        </div>
      </Loading>
      <h2 className="sr-only">Products</h2>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={currentPage} totalPages={total} onPageChange={paginate}/>
      </div>
    </div>
  );
};

export default Page;