import SkeletonCard from './SkeletonCard'

const SkeletonList = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export default SkeletonList
