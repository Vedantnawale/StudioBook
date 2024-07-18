
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, createReview, updateReview, deleteReview } from '../../Redux/Slices/ReviewSlice.js';
import Star from '../../Components/Star.jsx';
import ReviewForm from '../../Components/ReviewForm.jsx';

const Reviews = ({ totalStars = 5 }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const reviewStatus = useSelector((state) => state.reviews.status);
  const error = useSelector((state) => state.reviews.error);
  const userData = useSelector((state) => state?.auth?.data);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (reviewStatus === 'idle') {
      dispatch(fetchReviews());
    }
  }, [reviewStatus, dispatch]);

  const handleSubmit = () => {
    if (rating > 0 && feedback.trim() !== '') {
      const review = { rating, feedback };
      if (editIndex !== null) {
        const id = reviews[editIndex]._id;
        dispatch(updateReview({ id, review }));
        setEditIndex(null);
      } else {
        dispatch(createReview(review));
      }
      setSubmitted(true);
      setRating(0);
      setFeedback('');
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  const handleEdit = (index) => {
    setRating(reviews[index].rating);
    setFeedback(reviews[index].feedback);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const id = reviews[index]._id;
    dispatch(deleteReview(id));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Leave a Review</h2>
      <ReviewForm
        rating={rating}
        setRating={setRating}
        feedback={feedback}
        setFeedback={setFeedback}
        handleSubmit={handleSubmit}
        submitted={submitted}
      />
      <h2 className="text-2xl font-bold text-center mb-6">Reviews</h2>
      <div className='flex flex-col'>
        {reviewStatus === 'loading' ? (
          <p>Loading...</p>
        ) : reviewStatus === 'failed' ? (
          <p>{error}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={review._id} className="mb-6 p-2 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full border border-gray-300"
                  src={userData?.avatar?.secure_url}
                  alt="user profile"
                />
                <h3 className='ml-4 font-bold text-gray-600'>{userData?.fullName}</h3>
              </div>
              <div className="flex mb-2">
                {Array.from({ length: totalStars }, (v, i) => (
                  <Star key={i} filled={i < review.rating} />
                ))}
              </div>
              <p className='text-gray-500'>{review.feedback}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleEdit(index)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
