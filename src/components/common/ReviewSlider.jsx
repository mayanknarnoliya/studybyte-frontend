import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from 'swiper';
import ReactStars from 'react-stars';
import { FaStar } from 'react-icons/fa';
import { getRatingAndReviews } from '../../services/operations/ratingAndReviews';

export const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            const data = await getRatingAndReviews();
            if (data) setReviews(data);
        }
        fetchAllReviews();
    }, []);

    return (
        <div className="text-white w-full">
            <div className="my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent mx-auto">
                <Swiper 
                    // Slides ke beech mein gap badhaya hai
                    spaceBetween={25}
                    slidesPerView={1}
                    loop={reviews.length > 1}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        // Screen size ke hisaab se slides fix ki hain
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1260: { slidesPerView: 4 },
                    }}
                    modules={[Autoplay, FreeMode, Pagination]}
                    className="w-full"
                >
                    {reviews?.map((review, index) => (
                        <SwiperSlide key={index}>
                            {/* Card structure ko fix kiya gaya hai (min-height aur padding) */}
                            <div className="flex flex-col gap-3 bg-richblack-800 p-4 text-[14px] text-richblack-25 rounded-md min-h-[180px]">
                                
                                {/* User Info Section */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={review?.user?.image 
                                            ? review?.user?.image 
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                        alt="user"
                                        className='h-9 w-9 rounded-full object-cover'
                                    />
                                    <div className="flex flex-col">
                                        <h1 className="font-semibold text-richblack-5">
                                            {`${review?.user?.firstName} ${review?.user?.lastName}`}
                                        </h1>
                                        <h2 className="text-[12px] font-medium text-richblack-500">
                                            {review?.course?.courseName}
                                        </h2>
                                    </div>
                                </div>
                                
                                {/* Review Text - truncate logic fix */}
                                <p className="font-medium text-richblack-25">
                                    {review?.review.split(" ").length > truncateWords 
                                        ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...` 
                                        : review?.review
                                    }
                                </p>
                                
                                {/* Rating Section */}
                                <div className="flex items-center gap-2 mt-auto">
                                    <h3 className="font-semibold text-yellow-100">
                                        {review?.rating.toFixed(1)}
                                    </h3>
                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={20}
                                        edit={false}
                                        activeColor='#ffd700'
                                        emptyIcon={<FaStar/>}
                                        fullIcon={<FaStar/>}
                                    />  
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}