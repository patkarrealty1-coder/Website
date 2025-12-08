import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const FeaturesSection = () => {
  const [badgeRef, isBadgeVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [titleRef, isTitleVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [imageRef, isImageVisible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [feature1Ref, isFeature1Visible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [feature2Ref, isFeature2Visible] = useScrollAnimation({ threshold: 0.2, once: true })
  const [feature3Ref, isFeature3Visible] = useScrollAnimation({ threshold: 0.2, once: true })

  const features = [
    {
      title: 'Expert market knowledge',
      description: 'A real estate company with strong market expertise can offer valuable insights.'
    },
    {
      title: 'Strong communication',
      description: 'Clear and timely communication throughout the buying or selling process.'
    },
    {
      title: 'Professionalism',
      description: 'Maintaining high standards of professionalism in all interactions and transactions.'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              ref={badgeRef}
              className={`scroll-fade-in ${isBadgeVisible ? 'visible' : ''}`}
            >
              <span className="inline-block bg-black text-white text-sm font-medium px-4 py-1.5 rounded-full">
                Features
              </span>
            </div>

            {/* Title */}
            <div
              ref={titleRef}
              className={`scroll-fade-in scroll-stagger-1 ${isTitleVisible ? 'visible' : ''}`}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Discover our features
              </h2>
              <p className="text-gray-600">
                Features built to simplify your journey.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6 pt-4">
              <div
                ref={feature1Ref}
                className={`scroll-fade-in scroll-stagger-2 ${isFeature1Visible ? 'visible' : ''}`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {features[0].title}
                </h3>
                <p className="text-gray-600">
                  {features[0].description}
                </p>
              </div>

              <div
                ref={feature2Ref}
                className={`scroll-fade-in scroll-stagger-3 ${isFeature2Visible ? 'visible' : ''}`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {features[1].title}
                </h3>
                <p className="text-gray-600">
                  {features[1].description}
                </p>
              </div>

              <div
                ref={feature3Ref}
                className={`scroll-fade-in scroll-stagger-4 ${isFeature3Visible ? 'visible' : ''}`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {features[2].title}
                </h3>
                <p className="text-gray-600">
                  {features[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            ref={imageRef}
            className={`scroll-fade-in-right scroll-stagger-2 ${isImageVisible ? 'visible' : ''}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Modern luxury home with pool"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

