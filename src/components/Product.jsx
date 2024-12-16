import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/Api';
import { useParams } from 'react-router';
import { Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';


function Product() {
    const { productId } = useParams()


    const { data: product, isPending, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            try {
                const res = await getProducts(`/${productId}`);
                console.log(res.data);
                // Ensure we return valid data (even if empty or undefined)
                return res.data || [];
            } catch (err) {
                console.error('Error fetching product:', err);
                // Return an empty array or fallback data in case of an error
                return [];
            }
        },
        staleTime:10000,
    })


    if (isPending) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />

            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    // Check if product exists and has a thumbnail
    if (!product || !product.thumbnail) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">Product not found or missing image</Typography>
            </Box>
        );
    }

    return (
        <div className='w-full flex items-center justify-center h-screen'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.thumbnail}  // Ensure the product has a thumbnail
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: <strong>${product.price.toFixed(2)}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Discount: <strong>{product.discountPercentage}%</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {product.rating} ⭐
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Availability: {product.availabilityStatus}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Product;