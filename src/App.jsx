import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Lawn from './pages/Lawn'
import ResidentialInstall from './pages/ResidentialInstall'
import Faqs from './pages/Faqs'
import SuFaqs from './pages/SuFaqs'
import BdFaqs from './pages/BdFaqs'
import Thanks from './pages/Thanks'
import Testimonials from './pages/Testimonials'
import TestimonialsAll from './pages/TestimonialsAll'
import Team from './pages/Team'
import Jobs from './pages/Jobs'
import PayInvoice from './pages/PayInvoice'
import PaymentSubmitted from './pages/PaymentSubmitted'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import LawnQuote from './pages/LawnQuote'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lawn-care/" element={<Lawn />} />
          <Route path="/installation/" element={<ResidentialInstall />} />
          <Route path="/faqs/" element={<Faqs />} />
          <Route path="/startup-questions/" element={<SuFaqs />} />
          <Route path="/shut-down-questions/" element={<BdFaqs />} />
          <Route path="/thanks/" element={<Thanks />} />
          <Route path="/testimonials/" element={<Testimonials />} />
          <Route path="/testimonials-all/" element={<TestimonialsAll />} />
          <Route path="/team/" element={<Team />} />
          <Route path="/careers/" element={<Jobs />} />
          <Route path="/payment/" element={<PayInvoice />} />
          <Route path="/payment_submitted/" element={<PaymentSubmitted />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/quote/" element={<Quote />} />
          <Route path="/lawn-quote/" element={<LawnQuote />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
