import { Link } from 'react-router-dom'
import { TrendingUp, Globe, Calculator, CheckCircle } from 'lucide-react'

const InvestmentAdvisory = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-24 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Investment Advisory</h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Strategic real estate investment guidance for maximum returns
          </p>
        </div>
      </section>

      {/* Real Estate Investment Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Estate Investment Principles</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Return on Investment (ROI)</h3>
                  <p className="text-gray-600">
                    ROI measures the profitability of your investment. In real estate, this includes rental income, property appreciation, and tax benefits. A good ROI in Mumbai typically ranges from 8-12% annually when combining rental yield and capital appreciation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Capital Appreciation</h3>
                  <p className="text-gray-600">
                    Property value growth over time. Mumbai's western suburbs have shown consistent appreciation of 5-8% annually over the past decade. Location, infrastructure development, and market cycles significantly impact appreciation rates.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Rental Yield</h3>
                  <p className="text-gray-600">
                    Annual rental income as a percentage of property value. Mumbai typically offers 2-3% rental yields. While lower than some cities, the strong appreciation potential makes it attractive for long-term investors.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Investment Horizon</h3>
                  <p className="text-gray-600">
                    Real estate is a long-term investment. Optimal holding periods are 5-10 years to maximize appreciation and minimize transaction costs. Short-term flipping is risky and tax-inefficient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI-Focused Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calculator className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">ROI-Focused Opportunities in Mumbai</h2>
              <p className="text-xl text-gray-600 mb-6">
                High-growth areas in Mumbai's western suburbs offering strong investment potential
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Charkop & Kandivali</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Metro connectivity boosting property values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Established residential infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Strong rental demand from IT professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Expected appreciation: 6-8% annually</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Borivali & Dahisar</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Proximity to National Park and green spaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Excellent connectivity via Western Express Highway</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Growing commercial hubs nearby</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Expected appreciation: 5-7% annually</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Commercial Properties</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Higher rental yields (4-6%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Long-term lease agreements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Growing demand for retail and office spaces</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Under-Construction Projects</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Lower entry prices (15-20% discount)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Flexible payment plans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Higher appreciation potential upon completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NRI Investment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">NRI Investment Services</h2>
              <p className="text-xl text-gray-600 mb-6">
                Special guidance for Non-Resident Indians investing in Mumbai real estate
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Remote Property Management</h3>
                  <p className="text-gray-600">
                    Complete property management services including tenant screening, rent collection, maintenance coordination, and regular property inspections. Stay updated with monthly reports and photos.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal & Documentation Support</h3>
                  <p className="text-gray-600">
                    Assistance with NRI-specific documentation including PAN card, NRE/NRO accounts, FEMA compliance, and power of attorney arrangements. We handle all paperwork while you're abroad.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Virtual Site Visits</h3>
                  <p className="text-gray-600">
                    Live video tours of properties, detailed photo documentation, and comprehensive locality reports. Make informed decisions from anywhere in the world.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Repatriation Guidance</h3>
                  <p className="text-gray-600">
                    Expert advice on fund repatriation, tax implications, and optimal structuring of your investment for maximum returns and compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Real Estate Portfolio?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a consultation with our investment advisors
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: '#D4AF37', color: '#111827' }}
          >
            Book Investment Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default InvestmentAdvisory
