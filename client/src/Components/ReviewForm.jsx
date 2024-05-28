import React from 'react';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import Star from './Star';

const ReviewForm = ({ rating, setRating, feedback, setFeedback, handleSubmit, submitted }) => {
  const userData = useSelector((state) => state?.auth?.data);

  const handleRatingClick = (i) => {
    if (!submitted) {
      setRating(i + 1);
    } else {
      toast.error('You can only give feedback once!');
    }
  };

  const handleFormSubmit = () => {
    if (!submitted) {
      const feedbackData = {
        rating,
        feedback,
        fullName: userData?.fullName,
        profile: userData?.avatar?.secure_url
      };
      console.log(feedbackData);
      handleSubmit(feedbackData);
    } else {
      toast.error('You can only give feedback once!');
    }
  };

  return (
    <div className="mb-8">
      <Toaster />
      <div className="flex justify-center mb-4">
        {Array.from({ length: 5 }, (v, i) => (
          <Star
            key={i}
            filled={i < rating}
            onClick={() => handleRatingClick(i)}
          />
        ))}
      </div>
      <p className="text-center mb-4">Rating: {rating} out of 5</p>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Leave your feedback here..."
        rows="4"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        disabled={submitted}
      />
      <button
        onClick={handleFormSubmit}
        disabled={submitted}
        className="block mx-auto px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Submit
      </button>
      {submitted && <p className="text-center mt-4">Thank you for your feedback!</p>}
    </div>
  );
};

export default ReviewForm;
