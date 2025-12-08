import React from 'react'
import { Link } from 'react-router-dom'
import { Award, Users, Home, Star, ArrowRight, CheckCircle } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Home, label: 'Properties Sold', value: '500+' },
    { icon: Users, label: 'Happy Clients', value: '1000+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Star, label: 'Client Rating', value: '4.9/5' }
  ]

  const teamMembers = [
    {
      name: 'Rajesh Patkar',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      description: 'With over 15 years in real estate, Rajesh leads our team with expertise and dedication.'
    },
    {
      name: 'Priya Sharma',
      role: 'Senior Property Consultant',
      image: '/api/placeholder/300/300',
      description: 'Priya specializes in luxury properties and has helped hundreds of families find their dream homes.'
    },
    {
      name: 'Amit Kumar',
      role: 'Investment Advisor',
      image: '/api/placeholder/300/300',
      description: 'Amit provides expert guidance on property investments and market analysis.'
    }
  ]

  const values = [
    {
      title: 'Integrity',
      description: 'We believe in honest, transparent dealings with all our clients.',
      icon: CheckCircle
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service.',
      icon: Star
    },
    {
      title: 'Innovation',
      description: 'We embrace technology to provide the best real estate experience.',
      icon: Award
    },
    {
      title: 'Client-First',
      description: 'Your needs and satisfaction are our top priority.',
      icon: Users
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Patkar's Realty
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Your trusted partner in finding the perfect home. We've been helping families 
            and investors discover exceptional properties for over 15 years.
          </p>
          <div className="flex justify-center">
            <Link to="/contact" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2008 by Rajesh Patkar, Patkar's Realty began as a small family business 
                  with a simple mission: to help people find their perfect home. What started as a 
                  one-person operation has grown into Mumbai's most trusted real estate agency.
                </p>
                <p>
                  Over the years, we've built our reputation on three core principles: integrity, 
                  expertise, and personalized service. We understand that buying or selling a home 
                  is one of life's biggest decisions, and we're here to guide you through every step 
                  of the process.
                </p>
                <p>
                  Today, our team of experienced professionals continues to uphold the values that 
                  Rajesh instilled from day one. We're not just about transactions – we're about 
                  building relationships and helping our clients achieve their real estate dreams.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Patkar's Realty Office"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we serve our clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced professionals are here to help you with all your real estate needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            To provide exceptional real estate services that exceed our clients' expectations, 
            while building lasting relationships based on trust, integrity, and results. We're 
            committed to making your real estate journey as smooth and successful as possible.
          </p>
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Patkar's Realty?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Local Expertise</h4>
                  <p className="text-gray-600">Deep knowledge of Mumbai's real estate market</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Personalized Service</h4>
                  <p className="text-gray-600">Tailored solutions for your unique needs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Proven Track Record</h4>
                  <p className="text-gray-600">15+ years of successful transactions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">End-to-End Support</h4>
                  <p className="text-gray-600">From search to closing, we're with you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let our experienced team help you navigate the real estate market with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Browse Properties
            </Link>
            <Link to="/contact" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
