import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, MessageCircle } from 'lucide-react'

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState('general')
  const [openQuestion, setOpenQuestion] = useState(null)

  const categories = {
    general: {
      title: 'General Real Estate',
      faqs: [
        {
          q: 'What is the difference between buying and renting?',
          a: 'Buying means you own the property and build equity over time, but requires a large upfront investment and ongoing maintenance costs. Renting offers flexibility and lower initial costs, but you don\'t build equity. Buying is ideal for long-term stability (5+ years), while renting suits those who need flexibility or are saving for a down payment.'
        },
        {
          q: 'How much should I budget for a property in Mumbai?',
          a: 'In Mumbai\'s western suburbs, budget ₹50 lakhs - ₹1 crore for a 1-2 BHK, ₹1-2 crores for a 3 BHK, and ₹2 crores+ for larger homes. Beyond the property price, budget 8-10% for stamp duty and registration, 1-2% for brokerage, and additional costs for interior work, legal fees, and moving expenses.'
        },
        {
          q: 'What are closing costs?',
          a: 'Closing costs include stamp duty (5-6% in Maharashtra), registration fees (1%), legal fees, property valuation charges, and brokerage (typically 1-2%). For a ₹1 crore property, expect ₹8-10 lakhs in closing costs. Some costs like stamp duty vary based on gender and property type.'
        },
        {
          q: 'Should I buy an under-construction or ready-to-move property?',
          a: 'Under-construction properties are 15-20% cheaper and offer flexible payment plans, but carry completion risk and GST (5%). Ready-to-move properties cost more but offer immediate possession, no GST, and you can inspect before buying. Choose based on your timeline, budget, and risk tolerance.'
        },
        {
          q: 'What is RERA and why does it matter?',
          a: 'RERA (Real Estate Regulatory Authority) protects homebuyers by mandating project registration, transparent pricing, and timely delivery. Always verify a project\'s RERA registration number on maharera.mahaonline.gov.in. RERA-registered projects offer legal recourse if builders delay or deviate from promises.'
        },
        {
          q: 'How do I verify if a property has clear title?',
          a: 'Check the property\'s title deed, encumbrance certificate (shows no pending loans/disputes), and 7/12 extract (for land). Hire a lawyer to verify ownership chain for 30 years. Ensure the seller has proper authorization to sell and all previous transactions are properly registered.'
        },
        {
          q: 'What is carpet area vs built-up area?',
          a: 'Carpet area is the actual usable floor space (wall-to-wall). Built-up area includes carpet area plus walls and balconies. Super built-up area adds common areas like lobbies and amenities. Always ask for carpet area when comparing properties, as it reflects actual living space.'
        }
      ]
    },
    legal: {
      title: 'Legal & Documentation',
      faqs: [
        {
          q: 'What is stamp duty in Maharashtra?',
          a: 'Stamp duty in Maharashtra is 5% for men and 4% for women (for properties up to ₹30 lakhs). Registration charges are 1% of the property value. For joint ownership with a woman as the first owner, you can avail the lower rate. Metro Mumbai has a 1% metro cess additional charge.'
        },
        {
          q: 'How long does property registration take?',
          a: 'Property registration typically takes 1-2 weeks from document submission. You need to book an appointment at the Sub-Registrar office, pay stamp duty online, and appear with the seller and witnesses. The actual registration process takes 2-3 hours on the appointment day.'
        },
        {
          q: 'What documents do I need to buy property?',
          a: 'Buyer needs: PAN card, Aadhaar card, address proof, passport-size photos, and bank statements. For the property: sale deed, title deed, encumbrance certificate, property tax receipts, NOC from society, completion certificate, and occupancy certificate. Your lawyer will verify all documents.'
        },
        {
          q: 'What is an encumbrance certificate?',
          a: 'An encumbrance certificate (EC) shows all transactions related to a property for a specified period. It confirms there are no pending loans, mortgages, or legal disputes. Banks require a 13-year EC for home loans. You can obtain it from the Sub-Registrar office for ₹100-200.'
        },
        {
          q: 'Do I need a lawyer for property purchase?',
          a: 'Yes, hiring a property lawyer is highly recommended. They verify title documents, check for legal issues, review agreements, and ensure proper registration. Legal fees are typically ₹10,000-50,000 depending on property value. This investment protects you from future disputes.'
        },
        {
          q: 'What is a sale agreement vs sale deed?',
          a: 'A sale agreement is a preliminary contract outlining terms and conditions, signed when you pay the token amount. The sale deed is the final document that transfers ownership, executed after full payment and registered at the Sub-Registrar office. Both are legally binding.'
        },
        {
          q: 'What is a Society NOC and why is it required?',
          a: 'A Society No Objection Certificate confirms the housing society has no objection to the sale and that all dues are cleared. Banks require it for home loans. It also facilitates membership transfer. Obtain it from the society\'s managing committee before finalizing the purchase.'
        }
      ]
    },
    loan: {
      title: 'Loan & Finance',
      faqs: [
        {
          q: 'What is my loan eligibility?',
          a: 'Banks typically offer loans up to 80-90% of property value. Your eligibility depends on income (EMI should be <40% of monthly income), credit score (750+ preferred), age (21-65 years), and existing liabilities. Use our EMI calculator or contact us for a detailed eligibility assessment.'
        },
        {
          q: 'What is the current home loan interest rate?',
          a: 'Current home loan rates range from 8.40% to 9.80% per annum, varying by bank, loan amount, and your credit profile. Rates are lower for women borrowers and salaried professionals. We help you compare offers from multiple banks to get the best rate.'
        },
        {
          q: 'What is the difference between fixed and floating rates?',
          a: 'Fixed rates remain constant throughout the loan tenure, offering payment predictability but typically starting 1-2% higher. Floating rates fluctuate with market conditions, usually starting lower but can increase. Most borrowers choose floating rates as they tend to be more economical long-term.'
        },
        {
          q: 'How much down payment do I need?',
          a: 'Banks finance 75-90% of property value, so you need 10-25% as down payment. For a ₹1 crore property, expect ₹10-25 lakhs down payment plus ₹8-10 lakhs for stamp duty and other costs. Total upfront requirement: ₹18-35 lakhs. Higher down payment reduces EMI and interest burden.'
        },
        {
          q: 'Can I get a home loan if I\'m self-employed?',
          a: 'Yes, self-employed individuals can get home loans, but banks require 2-3 years of ITR, business proof, and bank statements. Loan eligibility may be slightly lower than salaried individuals. Maintain good credit score and show stable income for better approval chances.'
        },
        {
          q: 'What is pre-EMI vs full EMI?',
          a: 'For under-construction properties, pre-EMI means you pay only interest on the disbursed amount until possession. Full EMI (principal + interest) starts after possession. Pre-EMI is lower but doesn\'t reduce principal. You can choose to pay full EMI to reduce overall interest.'
        },
        {
          q: 'How can I improve my loan eligibility?',
          a: 'Improve credit score to 750+, reduce existing debts, add a co-applicant (spouse/parent), increase down payment, choose longer tenure, or show additional income sources. Maintain stable employment and clean banking records. We can guide you on specific steps based on your situation.'
        }
      ]
    },
    locality: {
      title: 'Locality Insights',
      faqs: [
        {
          q: 'Which is better: Charkop or Kandivali?',
          a: 'Both are excellent choices. Charkop offers more affordable options (₹12,500-16,000/sq ft) with good metro connectivity and peaceful residential environment. Kandivali West is more established (₹15,000-18,000/sq ft) with better commercial infrastructure, malls, and IT parks. Choose based on budget and lifestyle preferences.'
        },
        {
          q: 'What are the best societies in Borivali?',
          a: 'Top societies in Borivali include Oberoi Splendor, Raheja Vistas, Ekta Parksville, Sheth Vasant Oasis, and Rustomjee Urbania. These offer premium amenities, good maintenance, and strong appreciation. For mid-range options, consider Evershine Millennium Paradise, Shree Krishna Vatika, and Lokhandwala Minerva.'
        },
        {
          q: 'How is the connectivity in Charkop?',
          a: 'Charkop has excellent connectivity with its own metro station on Line 2A, connecting to Dahisar and Andheri. Kandivali railway station is 10-15 minutes away. Western Express Highway and Link Road provide road connectivity. Multiple BEST bus routes serve the area. Overall, very well-connected for daily commute.'
        },
        {
          q: 'Which locality has the best appreciation potential?',
          a: 'Charkop Sector 8 and Dahisar East show strong appreciation potential due to upcoming metro connectivity and new developments. Borivali East is also growing rapidly. Established areas like Kandivali West and Borivali West offer steady 5-7% annual appreciation with lower risk.'
        },
        {
          q: 'Are there good schools in these localities?',
          a: 'Yes, the western suburbs have excellent schools. Top options include Ryan International, Oberoi International, Thakur School of Global Education, Arya Vidya Mandir, Podar International, and JBCN International. Most localities have 4-5 good schools within 2-3 km radius.'
        },
        {
          q: 'What about hospitals and healthcare facilities?',
          a: 'Major hospitals include Shree Sai Hospital (Kandivali), Bhaktivedanta Hospital (Mira Road), Apex Hospital (Borivali), and Lifeline Hospital (Malad). Most localities have multiple clinics, diagnostic centers, and 24-hour pharmacies. Healthcare infrastructure is well-developed across western suburbs.'
        }
      ]
    }
  }

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about real estate in Mumbai
          </p>
        </div>
      </section>

      {/* AI Chat Widget Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center border-2 border-blue-200">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ask Our AI Assistant</h2>
            <p className="text-gray-600 mb-6">
              Get instant answers to your real estate questions with our AI-powered assistant
            </p>
            <Link
              to="/ai-agent"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chat with AI Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {Object.keys(categories).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setOpenCategory(key)
                  setOpenQuestion(null)
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  openCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {categories[key].title}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-4">
            {categories[openCategory].faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openQuestion === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openQuestion === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Our team is here to help you with personalized guidance
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

export default FAQ
