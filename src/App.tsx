import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import MockupBuilder from "./pages/MockupBuilder";
import Domains from "./pages/Domains";
import Pricing from "./pages/Pricing";
import Process from "./pages/Process";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ServiceRequest from "./pages/ServiceRequest";
import WebsiteAudit from "./pages/WebsiteAudit";
import Estimate from "./pages/Estimate";
import LeadWorkflow from "./pages/LeadWorkflow";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/request/:serviceId" element={<ServiceRequest />} />
        <Route path="/mockup-builder" element={<MockupBuilder />} />
        <Route path="/mockup" element={<MockupBuilder />} />
        <Route path="/domain-help" element={<Domains />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/website-audit" element={<WebsiteAudit />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/lead-workflow" element={<LeadWorkflow />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/process" element={<Process />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
