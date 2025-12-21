import { Link } from 'react-router-dom'
import { FileText, Scale, Building, CheckCircle } from 'lucide-react'

const LegalDocumentation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal & Documentation Assistance</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert legal support for hassle-free property transactions
          </p>
        </div>
      </section>

      {/* Sale Agreement Support */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sale Agreement Support</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Expert review and guidance on purchase agreements to protect your interests
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Comprehensive review of sale deed and agreement terms</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Verification of seller's ownership and clear title</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Ensuring all clauses protect buyer's rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Guidance on payment schedules and possession timelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Stamp duty calculation and registration assistance</span>
                </li>
              </ul>

              <div className="mt-6 bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What We Check</h3>
                <p className="text-gray-600 mb-3">
                  Our legal experts thoroughly review all documentation to ensure:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Property has clear and marketable title</li>
                  <li>• No pending litigation or encumbrances</li>
                  <li>• All approvals from relevant authorities are in place</li>
                  <li>• Builder/seller has proper authorization to sell</li>
                  <li>• Agreement terms are fair and legally sound</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Agreement Drafting */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scale className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Rental Agreement Drafting</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Legally sound rental contracts that protect both landlord and tenant
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Customized rental agreements based on your requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Clear terms on rent, deposit, maintenance, and utilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lock-in period, notice period, and renewal clauses</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Stamp duty payment and registration at Sub-Registrar office</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Digital and physical copies for all parties</span>
                </li>
              </ul>

              <div className="mt-6 bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">11-Month vs Long-Term Agreements</h3>
                <p className="text-gray-600">
                  We help you choose between 11-month leave and license agreements (no registration required if rent is below ₹10,000/month) or longer-term registered lease agreements based on your specific needs and legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer Documentation */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Transfer Documentation</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Smooth property transfer process with complete documentation support
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sale Deed Registration</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Preparation of sale deed document</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Stamp duty and registration fee calculation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Appointment booking at Sub-Registrar office</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Coordination with buyer, seller, and witnesses</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Mutation & Name Transfer</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Property tax records update with municipal corporation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Electricity and water connection name transfer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Society membership transfer and share certificate</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Post-Registration Support</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Obtaining certified copies of registered documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Encumbrance certificate for clear title proof</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">7/12 extract and property card updates (for land)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Society NOC Assistance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Society NOC Assistance</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Help obtaining No Objection Certificates from housing societies
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Liaison with society management committee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Preparation and submission of required documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Follow-up for timely NOC issuance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Clearance of society dues and outstanding payments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Share certificate transfer coordination</span>
                </li>
              </ul>

              <div className="mt-6 bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Why Society NOC Matters</h3>
                <p className="text-gray-600">
                  Most banks require a Society NOC before approving home loans. It confirms that the property has no pending dues and the society has no objection to the sale. We ensure this critical document is obtained smoothly and on time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance for Your Property Transaction?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Our legal experts are here to guide you through every document
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Get Legal Assistance
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LegalDocumentation
