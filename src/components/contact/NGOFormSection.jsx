import React, { useState } from 'react';
import { FiUsers, FiUser, FiGlobe, FiCheckSquare, FiFileText, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';

const FOCUS_AREAS = [
  'Education',
  'Skill Development',
  'Women Empowerment',
  'Rural Development',
  'Digital Literacy',
  'Health',
  'Sustainability',
];

const initialForm = {
  ngoName: '',
  registrationNumber: '',
  ngoType: '',
  website: '',
  contactName: '',
  role: '',
  email: '',
  phone: '',
  state: '',
  district: '',
  selectedFocus: [],
  yearsOperating: '',
  communitiesServed: '',
  studentsImpacted: '',
  collaborationProposal: '',
};

const NGOFormSection = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleCheckboxToggle = (item) => {
    setForm((curr) => {
      const exists = curr.selectedFocus.includes(item);
      const updated = exists
        ? curr.selectedFocus.filter((i) => i !== item)
        : [...curr.selectedFocus, item];
      return { ...curr, selectedFocus: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#10B981]">
          <FiCheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#071B4A] mb-2">NGO Proposal Submitted!</h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
          Thank you for joining forces with StepUp India. Our Team will review your proposal and contact your team shortly.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setForm(initialForm); }} 
          className="px-5 py-2.5 rounded-full bg-[#10B981] text-white text-xs font-semibold shadow hover:bg-emerald-600 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-poppins text-[#071B4A]">

      {/* 1. ORGANIZATION DETAILS */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiUsers className="text-sm text-[#10B981]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#10B981]">Organization Details</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              NGO Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ngoName"
              value={form.ngoName}
              onChange={handleChange}
              placeholder="e.g. Rural Literacy Trust"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Reg Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
              placeholder="12A/80G / DARPAN ID"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              NGO Type <span className="text-red-500">*</span>
            </label>
            <select
              name="ngoType"
              value={form.ngoType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
              required
            >
              <option value="">Select type</option>
              <option value="Trust">Trust</option>
              <option value="Society">Society</option>
              <option value="Section8">Section 8 Non-Profit</option>
              <option value="International">International Branch</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. CONTACT PERSON */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiUser className="text-sm text-[#10B981]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#10B981]">Contact Person</h3>
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
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Role / Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Executive Director"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
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
              placeholder="contact@ngo.org"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
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
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
              required
            />
          </div>
        </div>
      </div>

      {/* 3. OPERATIONAL GEOGRAPHY & EXPERIENCE */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiGlobe className="text-sm text-[#10B981]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#10B981]">Geography & Track Record</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">State & District</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="e.g. Telangana, Koraput"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Years Operating</label>
            <select
              name="yearsOperating"
              value={form.yearsOperating}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
            >
              <option value="">Select years</option>
              <option value="1-3">1 - 3 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5-10">5 - 10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Communities Served</label>
            <input
              type="text"
              name="communitiesServed"
              value={form.communitiesServed}
              onChange={handleChange}
              placeholder="e.g. 50+ Villages"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Students Impacted</label>
            <input
              type="text"
              name="studentsImpacted"
              value={form.studentsImpacted}
              onChange={handleChange}
              placeholder="e.g. 10,000+ Children"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>
        </div>
      </div>

      {/* 4. FOCUS AREAS (COMPACT INLINE CHECKBOX PILLS) */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-2 border-b border-gray-200">
          <FiCheckSquare className="text-sm text-[#10B981]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#10B981]">Focus Areas</h3>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {FOCUS_AREAS.map((item) => {
            const isChecked = form.selectedFocus.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => handleCheckboxToggle(item)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-medium transition ${
                  isChecked
                    ? 'border-[#10B981] bg-emerald-50 text-[#10B981] font-semibold'
                    : 'border-gray-200 bg-slate-50 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  isChecked ? 'border-[#10B981] bg-[#10B981] text-white' : 'border-gray-300 bg-white'
                }`}>
                </div>
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. COLLABORATION PROPOSAL & UPLOADS */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiFileText className="text-sm text-[#10B981]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#10B981]">Proposal & Uploads</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Describe Collaboration Proposal
            </label>
            <textarea
              name="collaborationProposal"
              rows={2}
              value={form.collaborationProposal}
              onChange={handleChange}
              placeholder="Describe how your NGO would like to collaborate with StepUp India on the ground..."
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 p-2.5 text-xs text-gray-800 outline-none transition focus:border-[#10B981] focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#10B981] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">Registration Cert (12A/80G)</span>
              <input type="file" accept=".pdf,.png,.jpg" className="text-[10px] text-gray-500" />
            </div>
            <div className="rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#10B981] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">Annual Report</span>
              <input type="file" accept=".pdf" className="text-[10px] text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA SUBMIT BUTTON */}
      <div className="pt-2 text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#10B981] via-[#0D9488] to-[#0284C7] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
        >
          <span>Become an NGO Partner</span>
        </button>
      </div>

    </form>
  );
};

export default NGOFormSection;
