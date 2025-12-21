import { Link } from 'react-router-dom'
import { Shield, Heart, BookOpen, Users, MapPin, Scale, Phone, Mail, Clock } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust Through Action',
      description: 'We earn trust through consistent, ethical behavior—not marketing claims. Every recommendation we make is one we would give to our own family.'
    },
    {
      icon: Heart,
      title: 'Your Investment is Sacred',
      description: 'We understand that for most families, buying a home represents decades of savings. We treat every transaction with the gravity it deserves.'
    },
    {
      icon: BookOpen,
      title: 'Informed Clients, Better Decisions',
      description: 'We believe in education over persuasion. When you understand the market, legalities, and options, you make better decisions—and that benefits everyone.'
    },
    {
      icon: Users,
      title: 'Relationships Over Transactions',
      description: 'We measure success not by deals closed, but by families who return and refer. A single satisfied client is worth more than a hundred quick sales.'
    },
    {
      icon: MapPin,
      title: 'Deep Local Knowledge',
      description: 'We don\'t just sell properties in these neighborhoods—we\'ve watched them grow for three decades. This insight helps you make decisions others can\'t.'
    },
    {
      icon: Scale,
      title: 'Uncompromising Ethics',
      description: 'Some opportunities aren\'t worth taking. We\'ve built our reputation by saying no to questionable deals, even when they were profitable.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Patkar's Realty</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three decades of trust, integrity, and client-first service in Mumbai's western suburbs.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story: Three Decades of Trust</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              In the early 1990s, Charkop was transforming. Mumbai's western suburbs were expanding, and families were ready to invest their life savings in their first homes.
            </p>
            <p>
              Patkar's Realty was founded on a simple principle: <strong>treat every client's investment as if it were your own family's</strong>. No pressure tactics. No hidden agendas. Just honest guidance for life's biggest financial decision.
            </p>
            <p>
              This approach wasn't the easiest path. We've recommended clients wait during market peaks. We've suggested smaller homes within comfortable budgets when larger ones meant higher commissions. We've walked away from builder partnerships that offered lucrative incentives but questionable delivery.
            </p>
            <p>
              The result? Over 30 years later, most of our business comes from referrals. Families return for their next purchase, then send their children, siblings, and friends. <strong>Three generations trusting one name</strong>—that's not marketing, that's validation.
            </p>
            <p>
              We've grown with our neighborhoods—watching Charkop, Kandivali, Borivali, and Malad evolve from developing suburbs to thriving communities. Through every market cycle, our commitment remained constant: <strong>your interest before our commission</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            To protect your lifetime investment with expertise, integrity, and exclusive access—ensuring every family makes decisions they'll be proud of for decades.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Philosophy */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">The Founder's Philosophy: Client Interest, Always</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-white/10">
            <h3 className="text-xl font-semibold" style={{ color: '#D4AF37' }}>The Defining Choice</h3>
            <p className="text-gray-300">
              Early in our journey, a young couple came to us with their entire savings—money they'd accumulated over years of careful planning. They had their hearts set on a property that, frankly, was beyond their comfortable budget.
            </p>
            <p className="text-gray-300">
              The commission on that sale would have been significant. The couple was ready to sign. But we knew the EMI burden would strain their finances for years, leaving no room for emergencies or their children's education.
            </p>
            <p className="text-gray-300">
              We recommended a smaller property in the same area. They were disappointed initially. But three years later, when an unexpected medical emergency arose, they had the savings to handle it without losing their home.
            </p>
            <p className="text-gray-300">
              That couple has since referred over a dozen families to us. Their children bought their first homes through us. That single act of putting their interest first created a relationship spanning decades.
            </p>
            <h3 className="text-xl font-semibold mt-8" style={{ color: '#D4AF37' }}>Growth Through Trust</h3>
            <p className="text-gray-300">
              This philosophy has shaped every aspect of our business. We've never advertised aggressively because we've never needed to. Our growth has been organic—one satisfied family telling another.
            </p>
            <p className="text-gray-300">
              Today, when we meet new clients, we often hear: "My parents bought their home through you" or "My colleague said you're the only agent they trust." These introductions carry more weight than any marketing campaign.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Coverage Areas</h2>
          <p className="text-gray-600 mb-8">Serving Mumbai's Western Suburbs with deep local expertise</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Charkop', 'Kandivali', 'Borivali', 'Malad', 'Goregaon', 'Andheri', 'Dahisar'].map((area) => (
              <span key={area} className="px-6 py-3 bg-blue-50 text-blue-700 rounded-full font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Patkar's Realty Difference?</h2>
          <p className="text-xl text-gray-300 mb-8">Book your free consultation today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+919136097299"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About