import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/Api";
import { Link } from "react-router";
import { Fragment } from "react";
import min from '../img/min.gif'
import errorpage from '../img/error.avif'

function Products() {
    const { data: products, isPending, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await getProducts('?limit=190')
            return res.data.products
        },
        // staleTime:10000,
        // refetchInterval:1000,
        refetchIntervalInBackground:1000,
        refetchOnWindowFocus:true 
    });

    if (isPending) {
        return (
            <>
                <div className=' h-screen w-full flex items-center justify-center'>
                    <img src={min} alt="loading......." className=' h-full w-full' />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="h-screen w-full flex items-center justify-center">
                    <img
                        src={errorpage}
                        alt="errorpage......."
                        className="h-full w-[90%] object-container"
                    />
                    {error.message}
                </div>
            </>
        );
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products && products.map((product) => (
                            <Fragment key={product.id}  >
                                <Link to={`/${product.id}`} className="group">
                                    <img
                                        alt={product.title}
                                        src={product.thumbnail}
                                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                                    />
                                    <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900 flex justify-between">
                                        Rs. {Math.floor(product.price)}
                                        <span className="mt-1 text-lg font-medium text-gray-900">
                                            {product.category}
                                        </span>
                                    </p>

                                </Link>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;
