import { Link } from 'react-router-dom'
import { UserCheck, FileText, CreditCard, CheckCircle } from 'lucide-react'

const Landlords = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Landlord Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive support for property owners and landlords
          </p>
        </div>
      </section>

      {/* Tenant Screening */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tenant Screening</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Thorough background verification and reference checks to ensure reliable tenants
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Employment verification and income assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Previous landlord references and rental history</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Identity and address verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Police verification assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Credit and financial background checks</span>
                </li>
              </ul>

              <div className="mt-6 bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Why Tenant Screening Matters</h3>
                <p className="text-gray-600">
                  A reliable tenant means consistent rent payments, proper property maintenance, and peace of mind. Our thorough screening process has helped landlords avoid problematic tenancies and maintain long-term, hassle-free rental relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Agreement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Rental Agreement</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Legally compliant rental agreements drafted and registered
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Comprehensive 11-month or long-term lease agreements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Clear terms on rent, deposit, maintenance, and responsibilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lock-in period and notice period clauses</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Stamp duty payment and registration assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Digital and physical copies for all parties</span>
                </li>
              </ul>

              <div className="mt-6 bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Legal Protection</h3>
                <p className="text-gray-600">
                  A properly drafted and registered rental agreement protects both landlord and tenant. It provides legal recourse in case of disputes and ensures clarity on all terms from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Collection Support */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Collection Support</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Guidance on rent collection and deposit management
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advice on security deposit amounts and handling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Rent payment tracking and reminder systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Digital payment setup (UPI, bank transfers, cheques)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Rent receipt generation and documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Guidance on handling late payments and defaults</span>
                </li>
              </ul>

              <div className="mt-6 bg-yellow-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Best Practices</h3>
                <p className="text-gray-600">
                  We recommend setting up automated payment systems and maintaining clear documentation. This reduces friction, ensures timely payments, and provides a clear audit trail for tax purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Landlord Services</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Marketing</h3>
              <p className="text-gray-600">
                Professional listing creation with high-quality photos, detailed descriptions, and multi-platform promotion to attract quality tenants quickly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rent Optimization</h3>
              <p className="text-gray-600">
                Market analysis to determine optimal rental rates that maximize income while ensuring quick occupancy and tenant retention.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Inspection</h3>
              <p className="text-gray-600">
                Pre-rental and post-rental property condition documentation to protect your interests and ensure proper handover procedures.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Maintenance Coordination</h3>
              <p className="text-gray-600">
                Guidance on handling maintenance requests, emergency repairs, and coordinating with service providers for property upkeep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Managing Your Rental Property?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Let us handle the complexities while you enjoy hassle-free rental income
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Get Landlord Support
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landlords
