import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import WishlistDebug from './pages/WishlistDebug'
import UserProfileModern from './pages/UserProfileModern'
import ResidentialProperties from './pages/ResidentialProperties'
import CommercialProperties from './pages/CommercialProperties'
import Setup from './pages/Setup'
import AdminDashboard from './pages/AdminDashboard'
import AdminProperties from './pages/AdminProperties'
import AdminPropertyForm from './pages/AdminPropertyForm'
import AdminPendingProperties from './pages/AdminPendingProperties'
import AdminBlogs from './pages/AdminBlogs'
import AdminBlogForm from './pages/AdminBlogForm'
import AdminPendingBlogs from './pages/AdminPendingBlogs'
import AdminProjects from './pages/AdminProjects'
import AdminProjectForm from './pages/AdminProjectForm'
import AdminFeaturedProperties from './pages/AdminFeaturedProperties'
import AdminPageContent from './pages/AdminPageContent'
import AdminLeads from './pages/AdminLeads'
import AIRealEstateAgent from './pages/AIRealEstateAgent'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import OngoingProjects from './pages/OngoingProjects'
import AdminOngoingProjects from './pages/AdminOngoingProjects'
import AdminOngoingProjectForm from './pages/AdminOngoingProjectForm'
import SmoothScroll from './components/SmoothScroll'
import About from './pages/About'
import BuyersInvestors from './pages/BuyersInvestors'
import Sellers from './pages/Sellers'
import Landlords from './pages/Landlords'
import InvestmentAdvisory from './pages/InvestmentAdvisory'
import LoanAssistance from './pages/LoanAssistance'
import LegalDocumentation from './pages/LegalDocumentation'
import Localities from './pages/Localities'
import LocalityDetail from './pages/LocalityDetail'
import FAQ from './pages/FAQ'
import Testimonials from './pages/Testimonials'
import Insights from './pages/Insights'
import ShareRequirements from './pages/ShareRequirements'
import AgentPartnership from './pages/AgentPartnership'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/management') || location.pathname === '/setup'

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
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
