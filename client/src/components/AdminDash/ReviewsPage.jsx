import { useEffect, useState } from "react";
import axios from "axios";
import { User, Star, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";

function ReviewsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/comment/comments", { withCredentials: true })
      .then(res => {
        setComments(res.data);
        setError(null);
      })
      .catch(err => {
        console.error("Error fetching comments:", err);
        setError("Failed to load reviews");
      })
      .finally(() => setLoading(false));
  };

 const handleDelete = (id) => {
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure you want to delete this review?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          axios.delete(`http://localhost:5000/api/comment/comments/${id}`, { withCredentials: true })
            .then(() => {
              setComments(comments.filter(c => c.id !== id));
              toast.success("Review deleted successfully");
            })
            .catch(() => {
              toast.error("Failed to delete review");
            });
        }
      },
      {
        label: 'Cancel',
        onClick: () => { /* do nothing */ }
      }
    ]
  });
};

 return (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Review Management</h1>
        <p className="text-sm sm:text-base text-stone-500 mt-1">Monitor and moderate user feedback</p>
      </div>
      <button
        onClick={fetchReviews}
        disabled={loading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-sm sm:text-base"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        )}
        Refresh
      </button>
    </div>

    {/* Error Message */}
    {error && (
      <div className="mb-6 p-3 bg-stone-100 border-l-4 border-stone-400 rounded-r">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />
          <p className="text-sm sm:text-base text-stone-700">{error}</p>
        </div>
      </div>
    )}

    {/* Loading State */}
    {loading ? (
      <div className="flex justify-center py-12 sm:py-16">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-stone-400" />
      </div>
    ) : comments.length === 0 ? (
      /* Empty State */
      <div className="bg-stone-50 rounded-lg p-6 sm:p-8 text-center border border-stone-200">
        <svg
          className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h3 className="mt-3 text-base sm:text-lg font-medium text-stone-700">No reviews available</h3>
        <p className="mt-1 text-sm sm:text-base text-stone-500">Submitted reviews will appear here</p>
      </div>
    ) : (
    /* Reviews List */
<div className="space-y-4 sm:space-y-6">
  {comments.map((review) => (
    <div 
      key={review.id} 
      className="bg-white p-4 sm:p-5 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
        <div className="flex items-start gap-3 w-full sm:w-auto">
          <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full flex-shrink-0">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
          </div>
          <div className="min-w-0"> {/* إضافة min-w-0 لمنع تمدد النص */}
            <h3 className="text-sm sm:text-base font-medium text-stone-800 truncate"> {/* إضافة truncate للنصوص الطويلة */}
              {review.username}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center mt-1 gap-2 sm:gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-stone-300"}`}
                  />
                ))}
              </div>
              <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${review.gymId ? "bg-pink-100 text-pink-800" : "bg-blue-100 text-blue-800"}`}>
                {review.gymId ? "GYM" : "NURSERY"}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleDelete(review.id)}
          className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm bg-red-100 text-red-800 hover:bg-red-200 transition-colors self-end sm:self-auto flex-shrink-0"
        >
          Delete
        </button>
      </div>

      {review.text && (
        <p className="mt-3 text-sm sm:text-base text-stone-700 break-words whitespace-pre-wrap"> 
          {/* إضافة break-words و whitespace-pre-wrap للتفاف النص */}
          {review.text}
        </p>
      )}

      <div className="mt-3 text-xs text-stone-400">
        {new Date(review.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </div>
    </div>
  ))}
</div>
    )}
  </div>
);
}

export default ReviewsPage;