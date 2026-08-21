import React, { useState } from 'react';
import { FiUser, FiDollarSign, FiFileText, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

const initialForm = {
  companyName: '',
  industrySector: '',
  website: '',
  companySize: '',
  headquarters: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
  annualBudget: '',
  preferredSDG: '',
  preferredProgram: '',
  fundingDuration: '',
  geographicPreference: '',
  csrObjectives: '',
  expectedOutcomes: '',
  reportingFrequency: '',
  additionalNotes: '',
};

const CSRFormSection = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
          <FiCheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#071B4A] mb-2">CSR Application Submitted!</h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
          Thank you for partnering with StepUp India. Our CSR Team will reach out to you within 24 hours.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setForm(initialForm); }} 
          className="px-5 py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-semibold shadow hover:bg-blue-700 transition"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-poppins text-[#071B4A]">

      {/* 1. COMPANY INFORMATION */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <HiOutlineOfficeBuilding className="text-sm text-[#2563EB]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#2563EB]">Company Information</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company name"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Industry / Sector <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="industrySector"
              value={form.industrySector}
              onChange={handleChange}
              placeholder="e.g. IT, Tech, FMCG"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://company.com"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Company Size
            </label>
            <select
              name="companySize"
              value={form.companySize}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">Select size</option>
              <option value="1-50">1 - 50</option>
              <option value="51-200">51 - 200</option>
              <option value="201-1000">201 - 1000</option>
              <option value="1000+">1000+ Employees</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Headquarters Location
            </label>
            <input
              type="text"
              name="headquarters"
              value={form.headquarters}
              onChange={handleChange}
              placeholder="e.g. Mumbai, Maharashtra"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* 2. CONTACT PERSON */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiUser className="text-sm text-[#2563EB]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#2563EB]">Contact Person</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. CSR Head"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Official Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="csr@company.com"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>
        </div>
      </div>

      {/* 3. CSR PARTNERSHIP & SDG */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiDollarSign className="text-sm text-[#2563EB]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#2563EB]">Partnership Details</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Annual CSR Budget
            </label>
            <select
              name="annualBudget"
              value={form.annualBudget}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">Select budget</option>
              <option value="5L-25L">₹5 Lakhs - ₹25 Lakhs</option>
              <option value="25L-1Cr">₹25 Lakhs - ₹1 Crore</option>
              <option value="1Cr-5Cr">₹1 Crore - ₹5 Crores</option>
              <option value="5Cr+">₹5 Crores+</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Preferred SDG Goal
            </label>
            <select
              name="preferredSDG"
              value={form.preferredSDG}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">Select SDG</option>
              <option value="SDG4">SDG 4: Quality Education</option>
              <option value="SDG1">SDG 1: No Poverty</option>
              <option value="SDG5">SDG 5: Gender Equality</option>
              <option value="SDG8">SDG 8: Decent Work</option>
              <option value="SDG13">SDG 13: Climate Action</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Preferred Program
            </label>
            <select
              name="preferredProgram"
              value={form.preferredProgram}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">Select program</option>
              <option value="DigitalClassrooms">Smart Classrooms</option>
              <option value="TeacherTraining">Teacher Training</option>
              <option value="STEMLab">STEM Innovation Labs</option>
              <option value="Scholarships">Girls Scholarships</option>
              <option value="Infrastructure">School Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Funding Duration
            </label>
            <select
              name="fundingDuration"
              value={form.fundingDuration}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">Select duration</option>
              <option value="1Year">1 Year</option>
              <option value="2Years">2 Years</option>
              <option value="3+Years">3+ Years Multi-Year</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Geographic Preference
            </label>
            <input
              type="text"
              name="geographicPreference"
              value={form.geographicPreference}
              onChange={handleChange}
              placeholder="e.g. Telangana, Maharashtra, PAN India"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* 4. REQUIREMENTS, NOTES & ATTACHMENTS */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiFileText className="text-sm text-[#2563EB]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#2563EB]">Project Requirements & Attachments</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              CSR Objectives & Outcomes
            </label>
            <textarea
              name="csrObjectives"
              rows={2}
              value={form.csrObjectives}
              onChange={handleChange}
              placeholder="Describe key CSR mandates, target metrics, or expected impact..."
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 p-2.5 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Additional Notes & Reporting Frequency
            </label>
            <textarea
              name="additionalNotes"
              rows={2}
              value={form.additionalNotes}
              onChange={handleChange}
              placeholder="Specify reporting frequency (Monthly/Quarterly) or special requests..."
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 p-2.5 text-xs text-gray-800 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-1">
            <div className="flex-1 min-w-[200px] rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#2563EB] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">CSR Policy (PDF)</span>
              <input type="file" accept=".pdf" className="text-[10px] text-gray-500" />
            </div>
            <div className="flex-1 min-w-[200px] rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#2563EB] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">Company Profile</span>
              <input type="file" accept=".pdf,.ppt,.pptx" className="text-[10px] text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA SUBMIT BUTTON */}
      <div className="pt-2 text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#10B981] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
        >
          <span>Submit CSR Partnership Request</span>
        </button>
      </div>

    </form>
  );
};

export default CSRFormSection;
