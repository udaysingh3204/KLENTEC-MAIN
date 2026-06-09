import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ExitIntentPopup from '@/components/ExitIntentPopup'

const PublicLayout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <ExitIntentPopup />
    <Footer />
  </>
)

export default PublicLayout
