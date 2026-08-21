import React, { useState } from 'react';
import { FiBookOpen, FiUser, FiCheckSquare, FiFileText, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';

const SUPPORT_OPTIONS = [
  'Smart Classroom',
  'Digital Learning',
  'Teacher Training',
  'STEM Lab',
  'Scholarships',
  'Infrastructure',
  'Internet Connectivity',
];

const initialForm = {
  institutionName: '',
  institutionType: '',
  boardAffiliation: '',
  website: '',
  establishedYear: '',
  state: '',
  city: '',
  totalStudents: '',
  totalTeachers: '',
  locationType: 'Urban',
  managementType: 'Private',
  principalName: '',
  designation: '',
  email: '',
  phone: '',
  selectedSupport: [],
  aboutSchool: '',
};

const SchoolFormSection = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleCheckboxToggle = (item) => {
    setForm((curr) => {
      const exists = curr.selectedSupport.includes(item);
      const updated = exists
        ? curr.selectedSupport.filter((i) => i !== item)
        : [...curr.selectedSupport, item];
      return { ...curr, selectedSupport: updated };
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-[#06B6D4]">
          <FiCheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#071B4A] mb-2">Application Submitted!</h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
          Thank you for applying to join the StepUp Education Network. Our Team will verify details and contact your school.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setForm(initialForm); }} 
          className="px-5 py-2.5 rounded-full bg-[#06B6D4] text-white text-xs font-semibold shadow hover:bg-cyan-600 transition"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-poppins text-[#071B4A]">

      {/* 1. INSTITUTION DETAILS */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiBookOpen className="text-sm text-[#06B6D4]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">Institution Details</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Institution Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="institutionName"
              value={form.institutionName}
              onChange={handleChange}
              placeholder="e.g. St. Xavier School"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Institution Type <span className="text-red-500">*</span>
            </label>
            <select
              name="institutionType"
              value={form.institutionType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              required
            >
              <option value="">Select type</option>
              <option value="Primary">Primary School (K-5)</option>
              <option value="Secondary">Secondary (6-10)</option>
              <option value="HigherSecondary">Higher Secondary (11-12)</option>
              <option value="College">College / University</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Board / Affiliation
            </label>
            <select
              name="boardAffiliation"
              value={form.boardAffiliation}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
            >
              <option value="">Select board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE / ISC</option>
              <option value="StateBoard">State Board</option>
              <option value="IB">IB / International</option>
              <option value="UGC">UGC / AICTE</option>
            </select>
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
              placeholder="https://yourschool.edu"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">State & City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Hyderabad, Telangana"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
            />
          </div>
        </div>
      </div>

      {/* 2. STATISTICS & CONTACT PERSON */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Statistics */}
        <div>
          <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
            <FiCheckSquare className="text-sm text-[#06B6D4]" />
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">Statistics & Management</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Total Students
              </label>
              <select
                name="totalStudents"
                value={form.totalStudents}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              >
                <option value="">Select range</option>
                <option value="Under500">Under 500</option>
                <option value="500-1000">500 - 1,000</option>
                <option value="1000-2500">1,000 - 2,500</option>
                <option value="2500+">2,500+</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Total Teachers
              </label>
              <input
                type="number"
                name="totalTeachers"
                value={form.totalTeachers}
                onChange={handleChange}
                placeholder="e.g. 45"
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Location</label>
              <select
                name="locationType"
                value={form.locationType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              >
                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
                <option value="Semi-Urban">Semi-Urban</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Management</label>
              <select
                name="managementType"
                value={form.managementType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
              >
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="Aided">Aided</option>
                <option value="NGO">NGO Run</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div>
          <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
            <FiUser className="text-sm text-[#06B6D4]" />
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">Contact Person</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Principal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="principalName"
                value={form.principalName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
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
                placeholder="e.g. Principal"
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
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
                placeholder="principal@school.edu"
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
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
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUPPORT REQUIRED (COMPACT INLINE CHECKBOX PILLS) */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-2 border-b border-gray-200">
          <FiCheckSquare className="text-sm text-[#06B6D4]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">Support Required</h3>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {SUPPORT_OPTIONS.map((item) => {
            const isChecked = form.selectedSupport.includes(item);
            return (
              <button
                type="button"
                key={item}
                onClick={() => handleCheckboxToggle(item)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-medium transition ${
                  isChecked
                    ? 'border-[#06B6D4] bg-cyan-50 text-[#06B6D4] font-semibold'
                    : 'border-gray-200 bg-slate-50 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                  isChecked ? 'border-[#06B6D4] bg-[#06B6D4] text-white' : 'border-gray-300 bg-white'
                }`}>
                </div>
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. ABOUT SCHOOL & UPLOADS */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiFileText className="text-sm text-[#06B6D4]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#06B6D4]">About School & Uploads</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              About Your School & Needs
            </label>
            <textarea
              name="aboutSchool"
              rows={2}
              value={form.aboutSchool}
              onChange={handleChange}
              placeholder="Tell us more about your school's needs, student background, and key goals..."
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 p-2.5 text-xs text-gray-800 outline-none transition focus:border-[#06B6D4] focus:bg-white focus:ring-2 focus:ring-cyan-500/10"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#06B6D4] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">School Brochure</span>
              <input type="file" accept=".pdf" className="text-[10px] text-gray-500" />
            </div>
            <div className="rounded-lg border border-dashed border-gray-300 bg-slate-50/80 p-2 text-center hover:border-[#06B6D4] transition">
              <span className="block text-[10px] font-bold text-gray-700 uppercase">Recognition Certificate</span>
              <input type="file" accept=".pdf,.jpg,.png" className="text-[10px] text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA SUBMIT BUTTON */}
      <div className="pt-2 text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#06B6D4] via-[#0284C7] to-[#10B981] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
        >
          <span>Apply as an Institution</span>
        </button>
      </div>

    </form>
  );
};

export default SchoolFormSection;
