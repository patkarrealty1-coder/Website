const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Price/Details */}
        <div className="flex gap-4">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        
        {/* Button */}
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default SkeletonCard
