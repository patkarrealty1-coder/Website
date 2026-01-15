const mongoose = require('mongoose')
const PageContent = require('../models/PageContent')
require('dotenv').config()

const seedPageContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patkars-realty')
    console.log('MongoDB Connected')

    // FAQ Content from live page
    const faqContent = {
      pageType: 'faq',
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How do I schedule a property viewing?',
          answer: 'You can schedule a viewing by calling us at +91 91360 97299, filling out the contact form, or clicking the "Schedule a Consultation" button.',
          order: 0
        },
        {
          question: 'What areas do you serve?',
          answer: 'We primarily serve Mumbai\'s western suburbs including Charkop, Kandivali, Borivali, Malad, Goregaon, Andheri, Dahisar, and Oshiwara with deep local expertise.',
          order: 1
        },
        {
          question: 'Do you charge buyers any commission?',
          answer: 'No, we operate on a zero buyer commission model. Our services for buyers are completely free.',
          order: 2
        },
        {
          question: 'How long have you been in business?',
          answer: 'Patkar\'s Realty has been serving Mumbai families for over 30 years, building trust through three generations of clients.',
          order: 3
        },
        {
          question: 'Do you help with property financing?',
          answer: 'Yes, we provide loan assistance and work with leading banks to help you secure the best home loan rates and terms.',
          order: 4
        },
        {
          question: 'Are you MahaRERA certified?',
          answer: 'Yes, we are MahaRERA certified and compliant, ensuring complete legal safety and transparency in all transactions.',
          order: 5
        }
      ]
    }

    // Contact Content from live page
    const contactContent = {
      pageType: 'contact',
      title: 'Contact Us',
      contactInfo: {
        phone: '+91 91360 97299',
        email: 'support@patkarrealty.in',
        address: 'Patkar\'s Realty\nCharkop, Kandivali West\nMumbai, Maharashtra 400067',
        officeHours: 'Monday - Saturday: 10:00 AM - 7:00 PM\nSunday: Closed'
      }
    }

    // About Content from live page
    const aboutContent = {
      pageType: 'about',
      title: 'About Patkar\'s Realty',
      sections: [
        {
          heading: 'Our Story: Three Decades of Trust',
          content: 'In the early 1990s, Charkop was transforming. Mumbai\'s western suburbs were expanding, and families were ready to invest their life savings in their first homes.\n\nPatkar\'s Realty was founded on a simple principle: treat every client\'s investment as if it were your own family\'s. No pressure tactics. No hidden agendas. Just honest guidance for life\'s biggest financial decision.\n\nThe result? Over 30 years later, most of our business comes from referrals. Families return for their next purchase, then send their children, siblings, and friends. Three generations trusting one name—that\'s not marketing, that\'s validation.',
          order: 0
        },
        {
          heading: 'Our Mission',
          content: 'To protect your lifetime investment with expertise, integrity, and exclusive access—ensuring every family makes decisions they\'ll be proud of for decades.',
          order: 1
        },
        {
          heading: 'Our Values',
          content: 'Trust Through Action - We earn trust through consistent, ethical behavior—not marketing claims.\n\nYour Investment is Sacred - We understand that buying a home represents decades of savings.\n\nInformed Clients, Better Decisions - We believe in education over persuasion.\n\nRelationships Over Transactions - We measure success by families who return and refer.\n\nDeep Local Knowledge - We\'ve watched these neighborhoods grow for three decades.\n\nUncompromising Ethics - We\'ve built our reputation by saying no to questionable deals.',
          order: 2
        },
        {
          heading: 'The Founder\'s Philosophy: Client Interest, Always',
          content: 'The Defining Choice\n\nEarly in our journey, a young couple came to us with their entire savings—money that if lost, would set them back years. They fell in love with a property that looked perfect on paper. But something felt off. The builder had a questionable track record, and the project timeline seemed unrealistic.\n\nWe had two choices: close the deal and earn our commission, or tell them the truth.\n\nWe chose honesty. We walked away from that sale, costing us months of effort and a significant commission. But three years later, that project stalled. The builder went bankrupt, and investors lost everything.\n\nThat couple has since referred over a dozen families to us. Their children bought their first homes through us. Their trust became our foundation.\n\nGrowth Through Trust\n\nThis philosophy has shaped every aspect of our business. We have never advertised aggressively because we have never needed to. Our growth has been organic—one satisfied family telling another.\n\nMy colleague sent you his wife eight years back. These introductions carry more weight than any marketing campaign ever could.',
          order: 3
        },
        {
          heading: 'Our Coverage Areas',
          content: 'Serving Mumbai\'s Western Suburbs with deep local expertise:\n\nCharkop, Kandivali, Borivali, Malad, Goregaon, Andheri, Dahisar, Oshiwara',
          order: 4
        }
      ]
    }

    // Upsert FAQ
    await PageContent.findOneAndUpdate(
      { pageType: 'faq' },
      faqContent,
      { upsert: true, new: true }
    )
    console.log('✅ FAQ content seeded')

    // Upsert Contact
    await PageContent.findOneAndUpdate(
      { pageType: 'contact' },
      contactContent,
      { upsert: true, new: true }
    )
    console.log('✅ Contact content seeded')

    // Upsert About
    await PageContent.findOneAndUpdate(
      { pageType: 'about' },
      aboutContent,
      { upsert: true, new: true }
    )
    console.log('✅ About content seeded')

    // Privacy Policy Content
    const privacyPolicyContent = {
      pageType: 'privacy-policy',
      title: 'Privacy Policy',
      sections: [
        {
          heading: '1. Information We Collect',
          content: 'Voluntarily Provided by You:\n• Name\n• Mobile number\n• Email address\n• Budget, location and property requirements\n• Messages sent via WhatsApp, DMs, comments, or forms\n• Uploaded files (floor plans, documents, etc.)\n\nAutomatically Collected:\n• Analytics data from Instagram/Facebook/YouTube\n• Engagement metrics (likes, comments, shares)\n• Ad interaction data\n• Device type, region, approximate location\n\nNote: We do not collect sensitive financial or biometric data.',
          order: 0
        },
        {
          heading: '2. How We Use Your Information',
          content: 'We use the collected information to:\n• Respond to your enquiries\n• Provide property options and consultation\n• Share brochures, trends, price sheets, or project updates\n• Arrange site visits\n• Share relevant information via WhatsApp, SMS, or email\n• Improve ads, content, and user experience\n• Create custom audiences for digital advertising\n\nImportant: We never sell your personal information.',
          order: 1
        },
        {
          heading: '3. Sharing of Information',
          content: 'Your data may be shared only when required, such as:\n• With developers/channel partners to check availability or arrange visits\n• With WhatsApp Business, Meta, Google for communication and advertising\n• When requested by law enforcement\n\nWe do not share your data for unrelated marketing purposes.',
          order: 2
        },
        {
          heading: '4. Data Security',
          content: 'We take reasonable steps to protect your information by:\n• Securely storing contact data\n• Limiting access to authorized personnel\n• Using official communication tools (WhatsApp Business, Meta APIs)\n\nHowever, data shared on social media is also governed by the platform\'s own privacy policy.',
          order: 3
        },
        {
          heading: '5. Your Rights',
          content: 'You may:\n• Request deletion of your data\n• Request a copy of stored information\n• Opt out of WhatsApp or SMS updates\n• Unsubscribe from future marketing\n\nSend requests to: support@patkarrealty.in',
          order: 4
        },
        {
          heading: '6. Third-Party Links',
          content: 'Our pages may link to:\n• Developer project websites\n• Registration links\n• Google Drive / PDFs\n• Landing pages\n\nWe are not responsible for external privacy practices.',
          order: 5
        },
        {
          heading: '7. Updates to the Policy',
          content: 'We may update this policy at any time. The updated version will be posted publicly.\n\nThis Privacy Policy is effective as of February 2025. PatkarRealtyMumbai ("we", "us", "our") operates Instagram, Facebook, YouTube and other digital platforms to share real estate information and connect with homebuyers.',
          order: 6
        }
      ]
    }

    // Upsert Privacy Policy
    await PageContent.findOneAndUpdate(
      { pageType: 'privacy-policy' },
      privacyPolicyContent,
      { upsert: true, new: true }
    )
    console.log('✅ Privacy Policy content seeded')

    // Terms & Conditions Content
    const termsConditionsContent = {
      pageType: 'terms-conditions',
      title: 'Terms & Conditions',
      sections: [
        {
          heading: '1. Nature of Service',
          content: 'PatkarRealtyMumbai provides:\n• Real estate consultancy\n• Market information\n• Educational content\n• Property suggestions\n• Project walk-throughs\n\nNote: This content is informational only and not legal or financial advice.',
          order: 0
        },
        {
          heading: '2. Accuracy of Information',
          content: 'We try to provide accurate updates, but:\n• Prices and availability may change\n• Travel times are estimates\n• Redevelopment timelines vary\n• Users should verify all project details independently\n\nWe are not liable for any decisions made based solely on social media content.',
          order: 1
        },
        {
          heading: '3. User Responsibilities',
          content: 'By interacting with our pages, you agree:\n• Not to misuse the platform\n• Not to post abusive or misleading content\n• To provide accurate information when enquiring\n\nWe may restrict access or block users in case of misuse.',
          order: 2
        },
        {
          heading: '4. Intellectual Property',
          content: 'All content including:\n• Videos & reels\n• Photos\n• Market analysis\n• Brochures & reports\n• Branding (PatkarRealtyMumbai)\n\nis owned by us and cannot be copied or redistributed without permission.',
          order: 3
        },
        {
          heading: '5. Third-Party Content',
          content: 'We may feature:\n• Developer images\n• Market data\n• Real estate news\n\nPatkarRealtyMumbai is not responsible for external inaccuracies.',
          order: 4
        },
        {
          heading: '6. Communication Consent',
          content: 'By sending a DM, WhatsApp message, form submission, or interacting with ads, you agree to receive:\n• Property details\n• Brochures\n• Price updates\n• Follow-up communication\n\nYou may opt out anytime.',
          order: 5
        },
        {
          heading: '7. Disclaimer',
          content: 'PatkarRealtyMumbai is a real estate consultant/channel partner.\n\nActual sale agreements occur between buyer ↔ seller/developer.\n\nWe are not responsible for:\n• Delays in possession\n• Builder disputes\n• Price changes\n• Developer policies\n\nPlease evaluate independently before booking.',
          order: 6
        },
        {
          heading: '8. Contact',
          content: 'For any queries or concerns regarding these Terms & Conditions, please contact us at:\n\nEmail: support@patkarrealty.in\n\nThese Terms & Conditions are effective as of February 2025.',
          order: 7
        }
      ]
    }

    // Upsert Terms & Conditions
    await PageContent.findOneAndUpdate(
      { pageType: 'terms-conditions' },
      termsConditionsContent,
      { upsert: true, new: true }
    )
    console.log('✅ Terms & Conditions content seeded')

    console.log('\n🎉 All page content seeded successfully!')
    console.log('You can now edit this content at: http://localhost:5173/management/page-content')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding page content:', error)
    process.exit(1)
  }
}

seedPageContent()
