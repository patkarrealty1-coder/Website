import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh & Priya Mehta',
      property: '3BHK in Kandivali West',
      year: '2019',
      rating: 5,
      text: 'The Patkar team helped us find our dream home in 2019. Their honest advice and deep local knowledge made all the difference. They never pushed us towards expensive options and always kept our budget and needs in mind.',
      image: null
    },
    {
      name: 'Sunil Desai',
      property: 'Multiple Properties',
      year: '2008 - 2023',
      rating: 5,
      text: 'We\'ve worked with Patkar\'s Realty for over 15 years—first our home, then our investment property. Unmatched integrity. They treat your money like their own and give advice that\'s in your best interest, not theirs.',
      image: null
    },
    {
      name: 'Anjali Sharma',
      property: '2BHK in Charkop Sector 3',
      year: '2021',
      rating: 5,
      text: 'As a first-time homebuyer, I was overwhelmed by the process. Patkar\'s team guided me through every step—from loan approval to final registration. Their patience and expertise made what seemed impossible, achievable.',
      image: null
    },
    {
      name: 'Vikram Patel',
      property: 'Commercial Space in Borivali',
      year: '2020',
      rating: 5,
      text: 'Bought a commercial property for my business through Patkar\'s Realty. Their market knowledge and negotiation skills saved me lakhs. The legal documentation support was thorough and professional. Highly recommended for commercial investments.',
      image: null
    },
    {
      name: 'Meera & Arun Kulkarni',
      property: '4BHK in Borivali West',
      year: '2018',
      rating: 5,
      text: 'We were relocating from Pune and didn\'t know Mumbai well. Patkar\'s team not only found us the perfect home but also educated us about the locality, schools, and amenities. Five years later, we couldn\'t be happier with our choice.',
      image: null
    },
    {
      name: 'Ramesh Iyer',
      property: 'Investment Property in Charkop',
      year: '2017',
      rating: 5,
      text: 'Invested in a property based on their recommendation in 2017. The appreciation has been exactly as they predicted. Their understanding of market trends and growth areas is exceptional. Now planning my second investment with them.',
      image: null
    },
    {
      name: 'Neha Joshi (NRI)',
      property: '2BHK in Kandivali',
      year: '2022',
      rating: 5,
      text: 'Living in the US, I needed someone trustworthy to handle my property purchase in Mumbai. Patkar\'s team managed everything—from site visits via video calls to complete documentation. They made remote property buying stress-free.',
      image: null
    },
    {
      name: 'Sanjay & Kavita Rao',
      property: '3BHK in Charkop Sector 1',
      year: '2016',
      rating: 5,
      text: 'What impressed us most was their honesty. They advised us to wait three months when prices were inflated, even though it meant delaying their commission. That\'s when we knew we were dealing with the right people. Seven years later, still grateful.',
      image: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three generations of families trust Patkar's Realty
          </p>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">30+</p>
              <p className="text-gray-600">Years of Trust</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">1000+</p>
              <p className="text-gray-600">Happy Families</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">85%</p>
              <p className="text-gray-600">Referral Business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <Quote className="h-10 w-10 text-blue-200 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.property}</p>
                  <p className="text-sm text-blue-600 mt-1">Year: {testimonial.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">See More Reviews on Google</h2>
          <p className="text-gray-600 mb-8">
            Read what our clients say about us on Google Reviews
          </p>
          <div className="bg-gray-100 rounded-xl p-12">
            <p className="text-gray-500 mb-4">Google Reviews Widget</p>
            <p className="text-sm text-gray-400">Integration coming soon</p>
          </div>
        </div>
      </section>

      {/* Video Testimonials Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Video Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-300 rounded-xl h-64 flex items-center justify-center">
                <p className="text-gray-600">Video Testimonial {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Family of Happy Clients?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Experience the Patkar's Realty difference for yourself
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
