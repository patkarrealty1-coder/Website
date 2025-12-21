import React, { useState, useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'
import FeaturedLuxuryProperties from '../components/FeaturedLuxuryProperties'
import FeaturesSection from '../components/FeaturesSection'
import ProjectsSection from '../components/ProjectsSection'
import OngoingProjectsSection from '../components/OngoingProjectsSection'
import BlogSection from '../components/BlogSection'

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const searchRef = useRef(null)
  const propertiesRef = useRef(null)

  // Mock data for featured properties
  const mockProperties = [
    {
      _id: '1',
      title: 'Crestview estate',
      price: 270000,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 2450,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80']
    },
    {
      _id: '2',
      title: 'Sunset bluff',
      price: 22500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1850,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80']
    },
    {
      _id: '3',
      title: 'Silver birch',
      price: 12000,
      bedrooms: 4,
      bathrooms: 4,
      sqft: 1450,
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80']
    },
    {
      _id: '4',
      title: 'Nova residence',
      price: 14500,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1550,
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80']
    },
    {
      _id: '5',
      title: 'Misty meadows',
      price: 125000,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2150,
      images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80']
    },
    {
      _id: '6',
      title: 'Rosewood manor',
      price: 320000,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1850,
      images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80']
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedProperties(mockProperties)
      setLoading(false)
    }, 1000)
  }, [])

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const scrollToProperties = () => {
    propertiesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onExploreClick={scrollToSearch} />

      {/* Search Section */}
      <div ref={searchRef}>
        <SearchSection />
      </div>

      {/* Featured Luxury Properties */}
      <div ref={propertiesRef}>
        <FeaturedLuxuryProperties />
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Completed Projects Section */}
      <ProjectsSection />

      {/* Ongoing Projects Section */}
      <OngoingProjectsSection />

      {/* Blog Section */}
      <BlogSection />
    </div>
  )
}

export default Home
