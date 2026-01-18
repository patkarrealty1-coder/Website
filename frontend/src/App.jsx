import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import SmoothScroll from './components/SmoothScroll'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Listings = lazy(() => import('./pages/Listings'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const Blog = lazy(() => import('./pages/Blog'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const WishlistDebug = lazy(() => import('./pages/WishlistDebug'))
const UserProfileModern = lazy(() => import('./pages/UserProfileModern'))
const ResidentialProperties = lazy(() => import('./pages/ResidentialProperties'))
const CommercialProperties = lazy(() => import('./pages/CommercialProperties'))
const Setup = lazy(() => import('./pages/Setup'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminProperties = lazy(() => import('./pages/AdminProperties'))
const AdminPropertyForm = lazy(() => import('./pages/AdminPropertyForm'))
const AdminPendingProperties = lazy(() => import('./pages/AdminPendingProperties'))
const AdminBlogs = lazy(() => import('./pages/AdminBlogs'))
const AdminBlogForm = lazy(() => import('./pages/AdminBlogForm'))
const AdminPendingBlogs = lazy(() => import('./pages/AdminPendingBlogs'))
const AdminProjects = lazy(() => import('./pages/AdminProjects'))
const AdminProjectForm = lazy(() => import('./pages/AdminProjectForm'))
const AdminFeaturedProperties = lazy(() => import('./pages/AdminFeaturedProperties'))
const AdminPageContent = lazy(() => import('./pages/AdminPageContent'))
const AdminLeads = lazy(() => import('./pages/AdminLeads'))
const AIRealEstateAgent = lazy(() => import('./pages/AIRealEstateAgent'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const OngoingProjects = lazy(() => import('./pages/OngoingProjects'))
const AdminOngoingProjects = lazy(() => import('./pages/AdminOngoingProjects'))
const AdminOngoingProjectForm = lazy(() => import('./pages/AdminOngoingProjectForm'))
const About = lazy(() => import('./pages/About'))
const BuyersInvestors = lazy(() => import('./pages/BuyersInvestors'))
const Sellers = lazy(() => import('./pages/Sellers'))
const Landlords = lazy(() => import('./pages/Landlords'))
const InvestmentAdvisory = lazy(() => import('./pages/InvestmentAdvisory'))
const LoanAssistance = lazy(() => import('./pages/LoanAssistance'))
const LegalDocumentation = lazy(() => import('./pages/LegalDocumentation'))
const Localities = lazy(() => import('./pages/Localities'))
const LocalityDetail = lazy(() => import('./pages/LocalityDetail'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Insights = lazy(() => import('./pages/Insights'))
const ShareRequirements = lazy(() => import('./pages/ShareRequirements'))
const AgentPartnership = lazy(() => import('./pages/AgentPartnership'))

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/management') || location.pathname === '/setup'

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
        <Routes>
          {/* Setup & Login Routes - Now with Navbar */}
          <Route path="/setup" element={<Setup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Management Routes - Now with Navbar */}
          <Route path="/management" element={<AdminDashboard />} />
          <Route path="/management/properties" element={<AdminProperties />} />
          <Route path="/management/properties/new" element={<AdminPropertyForm />} />
          <Route path="/management/properties/edit/:id" element={<AdminPropertyForm />} />
          <Route path="/management/pending-properties" element={<AdminPendingProperties />} />
          <Route path="/management/properties/review/:id" element={<AdminPropertyForm />} />
          <Route path="/management/blogs" element={<AdminBlogs />} />
          <Route path="/management/blogs/new" element={<AdminBlogForm />} />
          <Route path="/management/blogs/edit/:id" element={<AdminBlogForm />} />
          <Route path="/management/pending-blogs" element={<AdminPendingBlogs />} />
          <Route path="/management/blogs/review/:id" element={<AdminBlogForm />} />
          <Route path="/management/projects" element={<AdminProjects />} />
          <Route path="/management/projects/new" element={<AdminProjectForm />} />
          <Route path="/management/projects/edit/:id" element={<AdminProjectForm />} />
          <Route path="/management/ongoing-projects" element={<AdminOngoingProjects />} />
          <Route path="/management/ongoing-projects/new" element={<AdminOngoingProjectForm />} />
          <Route path="/management/ongoing-projects/edit/:id" element={<AdminOngoingProjectForm />} />
          <Route path="/management/featured-properties" element={<AdminFeaturedProperties />} />
          <Route path="/management/page-content" element={<AdminPageContent />} />
          <Route path="/management/leads" element={<AdminLeads />} />

          {/* AI Agent Route */}
          <Route path="/ai-agent" element={<AIRealEstateAgent />} />

          {/* Public Routes - With Smooth Scroll and Footer */}
          <Route path="/" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/listings" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Listings />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/ongoing-projects" element={
            <SmoothScroll>
              <main className="flex-grow">
                <OngoingProjects />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/residential" element={
            <SmoothScroll>
              <main className="flex-grow">
                <ResidentialProperties />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/commercial" element={
            <SmoothScroll>
              <main className="flex-grow">
                <CommercialProperties />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/property/:id" element={
            <SmoothScroll>
              <main className="flex-grow">
                <PropertyDetail />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/blog" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Blog />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/contact" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/privacy-policy" element={
            <SmoothScroll>
              <main className="flex-grow">
                <PrivacyPolicy />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/terms-conditions" element={
            <SmoothScroll>
              <main className="flex-grow">
                <TermsConditions />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/about" element={
            <SmoothScroll>
              <main className="flex-grow">
                <About />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          {/* Service Pages */}
          <Route path="/services/buyers-investors" element={
            <SmoothScroll>
              <main className="flex-grow">
                <BuyersInvestors />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/services/sellers" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Sellers />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/services/landlords" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Landlords />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/services/investment-advisory" element={
            <SmoothScroll>
              <main className="flex-grow">
                <InvestmentAdvisory />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/services/loan-assistance" element={
            <SmoothScroll>
              <main className="flex-grow">
                <LoanAssistance />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/services/legal-documentation" element={
            <SmoothScroll>
              <main className="flex-grow">
                <LegalDocumentation />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          {/* Locality Pages */}
          <Route path="/localities" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Localities />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/localities/:slug" element={
            <SmoothScroll>
              <main className="flex-grow">
                <LocalityDetail />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          {/* FAQ and Testimonials */}
          <Route path="/faq" element={
            <SmoothScroll>
              <main className="flex-grow">
                <FAQ />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/testimonials" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Testimonials />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          {/* Insights (Blog) Page */}
          <Route path="/insights" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Insights />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          {/* Share Requirements Page */}
          <Route path="/share-requirements" element={
            <SmoothScroll>
              <main className="flex-grow">
                <ShareRequirements />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          {/* Agent Partnership Page */}
          <Route path="/agent-partnership" element={
            <SmoothScroll>
              <main className="flex-grow">
                <AgentPartnership />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          {/* Buy and Rent routes - redirect to residential/commercial */}
          <Route path="/buy" element={
            <SmoothScroll>
              <main className="flex-grow">
                <ResidentialProperties />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/rent" element={
            <SmoothScroll>
              <main className="flex-grow">
                <ResidentialProperties />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/wishlist" element={
            <SmoothScroll>
              <main className="flex-grow">
                <Wishlist />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/wishlist-debug" element={
            <SmoothScroll>
              <main className="flex-grow">
                <WishlistDebug />
              </main>
              <Footer />
            </SmoothScroll>
          } />
          
          <Route path="/profile" element={
            <SmoothScroll>
              <main className="flex-grow">
                <UserProfileModern />
              </main>
              <Footer />
            </SmoothScroll>
          } />
        </Routes>
      </Suspense>
    </div>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
