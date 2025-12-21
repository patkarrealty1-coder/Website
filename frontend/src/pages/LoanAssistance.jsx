import { useState } from 'react'
import { Building2, Calculator, FileCheck, CheckCircle } from 'lucide-react'

const LoanAssistance = () => {
  const [loanData, setLoanData] = useState({
    principal: '',
    interestRate: '',
    tenure: ''
  })
  const [emi, setEmi] = useState(null)

  const calculateEMI = (e) => {
    e.preventDefault()
    const P = parseFloat(loanData.principal)
    const r = parseFloat(loanData.interestRate) / 12 / 100
    const n = parseFloat(loanData.tenure) * 12

    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalAmount = emiValue * n
    const totalInterest = totalAmount - P

    setEmi({
      monthly: Math.round(emiValue),
      total: Math.round(totalAmount),
      interest: Math.round(totalInterest)
    })
  }

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value })
  }

  const banks = [
    { name: 'HDFC Bank', rate: '8.50% - 9.50%' },
    { name: 'ICICI Bank', rate: '8.40% - 9.45%' },
    { name: 'State Bank of India', rate: '8.50% - 9.65%' },
    { name: 'Axis Bank', rate: '8.75% - 9.60%' },
    { name: 'Kotak Mahindra Bank', rate: '8.70% - 9.50%' },
    { name: 'Bank of Baroda', rate: '8.40% - 9.55%' },
    { name: 'Punjab National Bank', rate: '8.50% - 9.70%' },
    { name: 'LIC Housing Finance', rate: '8.50% - 9.80%' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Property Loan Assistance</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert guidance for home loans with competitive rates from top banks
          </p>
        </div>
      </section>

      {/* Bank Tie-ups */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Bank Tie-ups</h2>
              <p className="text-xl text-gray-600 mb-8">
                We work with leading banks and financial institutions to get you the best loan terms
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {banks.map((bank, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-1">{bank.name}</h3>
                    <p className="text-sm text-gray-600">Interest Rate: {bank.rate}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Why Choose Our Loan Assistance?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Compare offers from multiple banks to get the best rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pre-approved loans for faster processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Assistance with documentation and application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Higher loan eligibility through our bank relationships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calculator className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">EMI Calculator</h2>
              <p className="text-gray-600">Calculate your monthly EMI and total interest</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <form onSubmit={calculateEMI} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (Principal) *
                </label>
                <input
                  type="number"
                  name="principal"
                  required
                  value={loanData.principal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 5000000"
                />
                <p className="text-sm text-gray-500 mt-1">Enter amount in rupees</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% per annum) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="interestRate"
                  required
                  value={loanData.interestRate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 8.5"
                />
                <p className="text-sm text-gray-500 mt-1">Current rates range from 8.4% to 9.8%</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure (Years) *
                </label>
                <input
                  type="number"
                  name="tenure"
                  required
                  value={loanData.tenure}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 20"
                />
                <p className="text-sm text-gray-500 mt-1">Typical tenure is 15-30 years</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Calculate EMI
              </button>
            </form>

            {emi && (
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your EMI Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monthly EMI:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{emi.monthly.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Amount Payable:</span>
                    <span className="text-lg font-semibold text-gray-900">₹{emi.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Interest:</span>
                    <span className="text-lg font-semibold text-gray-900">₹{emi.interest.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guidance */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileCheck className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Step-by-Step Guidance</h2>
              <p className="text-xl text-gray-600 mb-8">
                From documentation to disbursement, we guide you through every step
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Assessment</h3>
                    <p className="text-gray-600">
                      We evaluate your income, credit score, and existing liabilities to determine your loan eligibility and optimal loan amount.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation Support</h3>
                    <p className="text-gray-600">
                      Complete checklist of required documents: ID proof, address proof, income proof (salary slips, ITR), bank statements, property documents.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank Selection & Application</h3>
                    <p className="text-gray-600">
                      We help you choose the best bank based on interest rates, processing fees, and approval likelihood. Then assist with application submission.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Valuation & Legal Check</h3>
                    <p className="text-gray-600">
                      Bank conducts property valuation and legal verification. We coordinate with the bank and ensure all requirements are met promptly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sanction & Disbursement</h3>
                    <p className="text-gray-600">
                      Once approved, we help with sanction letter review, final documentation, and coordinate the loan disbursement process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Calculate Your Eligibility</h2>
          <p className="text-gray-200 mb-8">
            Get a free loan eligibility assessment and personalized bank recommendations
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Get Loan Assistance
          </a>
        </div>
      </section>
    </div>
  )
}

export default LoanAssistance
