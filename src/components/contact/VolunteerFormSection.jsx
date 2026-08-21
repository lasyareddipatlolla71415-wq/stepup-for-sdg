import React, { useState } from 'react';
import { FiUser, FiAward, FiClock, FiHeart, FiFileText, FiCheckCircle } from 'react-icons/fi';

const SKILLS_OPTIONS = [
  'Teaching',
  'Programming',
  'Design',
  'Marketing',
  'Fundraising',
  'Photography',
  'Content Writing',
  'Event Management',
  'Social Media',
  'Counselling',
  'Translation',
  'Mentoring',
];

const INTEREST_AREAS = [
  'Teaching',
  'Workshops',
  'Career Guidance',
  'Digital Literacy',
  'Community Events',
  'Awareness Campaigns',
  'Fundraising',
];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  highestQualification: '',
  occupation: '',
  selectedSkills: [],
  availability: 'Weekends',
  state: '',
  city: '',
  selectedInterests: [],
  volunteerExperience: '',
  whyJoin: '',
};

const VolunteerFormSection = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleSkillsToggle = (item) => {
    setForm((curr) => {
      const exists = curr.selectedSkills.includes(item);
      const updated = exists
        ? curr.selectedSkills.filter((i) => i !== item)
        : [...curr.selectedSkills, item];
      return { ...curr, selectedSkills: updated };
    });
  };

  const handleInterestsToggle = (item) => {
    setForm((curr) => {
      const exists = curr.selectedInterests.includes(item);
      const updated = exists
        ? curr.selectedInterests.filter((i) => i !== item)
        : [...curr.selectedInterests, item];
      return { ...curr, selectedInterests: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="py-8 text-center font-poppins">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-[#3B82F6]">
          <FiCheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#071B4A] mb-2">Volunteer Registration Received!</h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mb-6">
          Welcome to StepUp! Our Volunteer Lead will reach out to schedule an onboarding session shortly.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setForm(initialForm); }} 
          className="px-5 py-2.5 rounded-full bg-[#3B82F6] text-white text-xs font-semibold shadow hover:bg-blue-600 transition"
        >
          Submit Another Registration
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-poppins text-[#071B4A]">

      {/* 1. PERSONAL INFORMATION */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiUser className="text-sm text-[#3B82F6]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#3B82F6]">Personal Information</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
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
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Age & Gender
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-20 rounded-lg border border-gray-200 bg-slate-50/80 px-2.5 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white"
              />
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-2.5 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white"
              >
                <option value="">Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Qualification</label>
            <select
              name="highestQualification"
              value={form.highestQualification}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">Select qualification</option>
              <option value="HighSchool">High School</option>
              <option value="Bachelors">Bachelor's Degree</option>
              <option value="Masters">Master's Degree</option>
              <option value="Doctorate">Doctorate / PhD</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Occupation / Organization</label>
            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              placeholder="e.g. Software Engineer / Student at KL University"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* 2. AVAILABILITY & LOCATION */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiClock className="text-sm text-[#3B82F6]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#3B82F6]">Availability & Location</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">Availability</label>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Monthly">Monthly Events</option>
              <option value="Remote">Remote / Virtual</option>
              <option value="Full Time">Full Time</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="e.g. Telangana"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Hyderabad"
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* 3. SKILLS & AREAS OF INTEREST (COMPACT INLINE CHECKBOX PILLS) */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 pb-1.5 mb-2 border-b border-gray-200">
            <FiAward className="text-sm text-[#3B82F6]" />
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#3B82F6]">Skills</h3>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {SKILLS_OPTIONS.map((item) => {
              const isChecked = form.selectedSkills.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleSkillsToggle(item)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition ${
                    isChecked
                      ? 'border-[#3B82F6] bg-blue-50 text-[#3B82F6] font-semibold'
                      : 'border-gray-200 bg-slate-50 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded flex items-center justify-center border ${
                    isChecked ? 'border-[#3B82F6] bg-[#3B82F6] text-white' : 'border-gray-300 bg-white'
                  }`}>
                  </div>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interests */}
        <div>
          <div className="flex items-center gap-2 pb-1.5 mb-2 border-b border-gray-200">
            <FiHeart className="text-sm text-[#3B82F6]" />
            <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#3B82F6]">Areas of Interest</h3>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {INTEREST_AREAS.map((item) => {
              const isChecked = form.selectedInterests.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => handleInterestsToggle(item)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition ${
                    isChecked
                      ? 'border-[#3B82F6] bg-blue-50 text-[#3B82F6] font-semibold'
                      : 'border-gray-200 bg-slate-50 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded flex items-center justify-center border ${
                    isChecked ? 'border-[#3B82F6] bg-[#3B82F6] text-white' : 'border-gray-300 bg-white'
                  }`}>
                  </div>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. EXPERIENCE & MOTIVATION */}
      <div>
        <div className="flex items-center gap-2 pb-1.5 mb-3 border-b border-gray-200">
          <FiFileText className="text-sm text-[#3B82F6]" />
          <h3 className="text-xs font-extrabold tracking-wider uppercase text-[#3B82F6]">Experience & Motivation</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Prior Volunteer Experience
            </label>
            <textarea
              name="volunteerExperience"
              rows={2}
              value={form.volunteerExperience}
              onChange={handleChange}
              placeholder="Describe any past teaching, volunteering or social work..."
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 p-2.5 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Why do you want to join StepUp?
            </label>
            <textarea
              name="whyJoin"
              rows={2}
              value={form.whyJoin}
              onChange={handleChange}
              placeholder="Share what motivates you to join StepUp education drives..."
              className="w-full rounded-lg border border-gray-200 bg-slate-50/80 p-2.5 text-xs text-gray-800 outline-none transition focus:border-[#3B82F6] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* CTA SUBMIT BUTTON */}
      <div className="pt-2 text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#10B981] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
        >
          <span>Join as a Volunteer</span>
        </button>
      </div>

    </form>
  );
};

export default VolunteerFormSection;
