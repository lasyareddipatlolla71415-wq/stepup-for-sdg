'use client'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export type VolunteerSubmission = {
  id: number
  fullName: string
  email: string
  phone: string
  city: string
  skills: string
  availability: string
  motivation: string
  submittedAt: string
  status: SubmissionStatus
}

export type EventRequest = {
  id: number
  fullName: string
  email: string
  phone: string
  organization: string
  eventType: string
  location: string
  audience: string
  details: string
  submittedAt: string
}

export type ContactMessage = {
  id: number
  from: string
  email: string
  phone?: string
  subject: string
  body: string
  time: string
  date: string
  unread: boolean
  tag: 'Contact' | 'Partner' | 'School' | 'NGO'
  avatar: string
}

export type PartnershipSubmission = {
  id: number
  fullName: string
  organization: string
  email: string
  type: string
  message: string
  submittedAt: string
  status: SubmissionStatus
}

export type DonationRecord = {
  id: number
  name: string
  email: string
  phone: string
  amount: number
  message: string
  method: string
  donatedAt: string
}

export type FellowshipListing = {
  id: number
  orgName: string
  website: string
  contact: string
  email: string
  role: string
  type: string
  location: string
  duration: string
  compensation: string
  description: string
  submittedAt: string
  status: SubmissionStatus
}

export type WaterConservationRegistration = {
  id: number
  fullName: string
  email: string
  phone: string
  city: string
  role: string
  siteName: string
  siteType: string
  siteLocation: string
  waterSource: string
  participants: string
  motivation: string
  submittedAt: string
  status: SubmissionStatus
}

export type NewsletterSubscriber = {
  id: number
  email: string
  source: string
  subscribedAt: string
}

export type Story = {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  image: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export type SdgEducationRegistration = {
  id: number
  schoolName: string
  schoolType: string
  contactName: string
  email: string
  phone: string
  city: string
  state: string
  studentCount: string
  grade: string
  message: string
  submittedAt: string
  status: SubmissionStatus
}

export type SustainabilityRegistration = {
  id: number
  fullName: string
  email: string
  phone: string
  country: string
  organization: string
  submittedAt: string
  status: SubmissionStatus
}

export type CertificateSubmission = {
  id: number
  fullName: string
  email: string
  course: string
  fileName: string
  fileDataUrl: string
  submittedAt: string
  status: SubmissionStatus
}

export type CleanCommunityRegistration = {
  id: number
  orgName: string
  orgType: string
  contactName: string
  email: string
  phone: string
  city: string
  state: string
  size: string
  sdgFocus: string
  message: string
  submittedAt: string
  status: SubmissionStatus
}

export type AdminStats = {
  totalPartners: number
  totalProjects: number
  totalEvents: number
  totalStudents: number
  schoolsSupported: number
  pendingRequests: number
  activeCampaigns: number
  studentContributions: number
}

export type SiteStats = {
  studentsEmpowered: number
  institutionsConnected: number
  ngoPartners: number
  corporatePartners: number
  communitiesImpacted: number
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEYS = {
  contacts: 'stepup_contact_messages',
  partnerships: 'stepup_partnership_submissions',
  volunteers: 'stepup_volunteer_submissions',
  eventRequests: 'stepup_event_requests',
  stats: 'stepup_admin_stats',
  siteStats: 'stepup_site_stats',
  donations: 'stepup_donations',
  fellowships: 'stepup_fellowship_listings',
  waterConservation: 'stepup_water_conservation_registrations',
  newsletter: 'stepup_newsletter_subscribers',
  stories: 'stepup_stories',
  sdgEducation: 'stepup_sdg_education_registrations',
  sustainability: 'stepup_sustainability_registrations',
  cleanCommunity: 'stepup_clean_community_registrations',
  certificates: 'stepup_certificate_submissions',
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const DEFAULT_CONTACTS: ContactMessage[] = [
  { id: 1, from: 'GreenEarth NGO', email: 'contact@greenearth.org', subject: 'Partnership Application Follow-up', body: 'Hello, we submitted our partnership application 3 days ago and wanted to check on its status. We are very eager to collaborate on SDG 13 initiatives.', time: '10:32 AM', date: 'Today', unread: true, tag: 'Partner', avatar: 'G' },
  { id: 2, from: 'Bright Futures Academy', email: 'admin@brightfutures.edu', subject: 'SDG 4 Program Enrollment Query', body: 'We would like to enroll our school in the SDG 4 Quality Education program. Could you please send us the requirements and onboarding steps?', time: '9:15 AM', date: 'Today', unread: true, tag: 'School', avatar: 'B' },
  { id: 3, from: 'EcoSolutions Ltd', email: 'info@ecosolutions.com', subject: 'Q3 Impact Report Submission', body: 'Please find attached our Q3 impact report for the Clean Water Access project. All milestones have been achieved ahead of schedule.', time: 'Yesterday', date: 'Yesterday', unread: false, tag: 'Partner', avatar: 'E' },
  { id: 4, from: 'Hope Foundation', email: 'team@hopefoundation.org', subject: 'Funding Collaboration Proposal', body: 'We are reaching out to propose a joint funding initiative for SDG 1 and SDG 2.', time: 'Mon', date: 'Mon', unread: false, tag: 'Partner', avatar: 'H' },
]

const DEFAULT_PARTNERSHIPS: PartnershipSubmission[] = [
  { id: 1, fullName: 'Maria Rodriguez', organization: 'Sunrise Cooperative', email: 'maria@sunrise.org', type: 'NGO', message: 'We want to collaborate on SDG 2 — Zero Hunger initiatives in rural communities.', submittedAt: '2024-09-21', status: 'pending' },
  { id: 2, fullName: 'Daniel Park', organization: 'OceanGuard Initiative', email: 'daniel@oceanguard.org', type: 'NGO', message: 'Interested in partnering on Life Below Water programs.', submittedAt: '2024-09-18', status: 'pending' },
  { id: 3, fullName: 'Aisha Bello', organization: 'Lagos Youth Lab', email: 'aisha@lagosyouth.org', type: 'NGO', message: 'We run quality education programs for youth in Lagos and would love to align with SDG 4.', submittedAt: '2024-09-12', status: 'pending' },
]

const DEFAULT_STORIES: Story[] = [
  { id: 1, title: 'How SDG Education Changed a Village', excerpt: 'A story of transformation through quality education in rural Telangana.', content: 'Full story content here...', author: 'Eswar Vardhan', category: 'Education', image: '', published: true, createdAt: '2024-08-01', updatedAt: '2024-08-01' },
  { id: 2, title: 'Water Conservation Success in Hyderabad', excerpt: '200 families now have access to clean water thanks to our program.', content: 'Full story content here...', author: 'Vijay Vedantam', category: 'Water', image: '', published: true, createdAt: '2024-09-10', updatedAt: '2024-09-10' },
]

const DEFAULT_STATS: AdminStats = {
  totalPartners: 1248,
  totalProjects: 386,
  totalEvents: 156,
  totalStudents: 12450,
  schoolsSupported: 142,
  pendingRequests: 24,
  activeCampaigns: 38,
  studentContributions: 4820,
}

const DEFAULT_SITE_STATS: SiteStats = {
  studentsEmpowered: 25000,
  institutionsConnected: 300,
  ngoPartners: 150,
  corporatePartners: 40,
  communitiesImpacted: 500,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback))
      return fallback
    }
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export function getContactMessages(): ContactMessage[] {
  return load(KEYS.contacts, DEFAULT_CONTACTS)
}

export function addContactMessage(msg: Omit<ContactMessage, 'id' | 'unread' | 'avatar'>) {
  const messages = getContactMessages()
  const newMsg: ContactMessage = {
    ...msg,
    id: Date.now(),
    unread: true,
    avatar: msg.from.charAt(0).toUpperCase(),
  }
  save(KEYS.contacts, [newMsg, ...messages])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function markContactRead(id: number) {
  const messages = getContactMessages()
  save(KEYS.contacts, messages.map(m => m.id === id ? { ...m, unread: false } : m))
}

export function saveContactMessages(messages: ContactMessage[]) {
  save(KEYS.contacts, messages)
}

// ─── Partnership Submissions ──────────────────────────────────────────────────

export function getPartnershipSubmissions(): PartnershipSubmission[] {
  return load(KEYS.partnerships, DEFAULT_PARTNERSHIPS)
}

export function addPartnershipSubmission(sub: Omit<PartnershipSubmission, 'id' | 'submittedAt' | 'status'>) {
  const submissions = getPartnershipSubmissions()
  const newSub: PartnershipSubmission = {
    ...sub,
    id: Date.now(),
    submittedAt: new Date().toISOString().split('T')[0],
    status: 'pending',
  }
  save(KEYS.partnerships, [newSub, ...submissions])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updatePartnershipStatus(id: number, status: SubmissionStatus) {
  const list = getPartnershipSubmissions()
  save(KEYS.partnerships, list.map(p => p.id === id ? { ...p, status } : p))
}

// ─── Admin Stats ──────────────────────────────────────────────────────────────

export function getAdminStats(): AdminStats {
  return load(KEYS.stats, DEFAULT_STATS)
}

export function updateAdminStats(patch: Partial<AdminStats>) {
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, ...patch })
}

export function getSiteStats(): SiteStats {
  return load(KEYS.siteStats, DEFAULT_SITE_STATS)
}

export function updateSiteStats(patch: Partial<SiteStats>) {
  const stats = getSiteStats()
  save(KEYS.siteStats, { ...stats, ...patch })
}

// ─── Volunteer Submissions ─────────────────────────────────────────────────────

export function getVolunteerSubmissions(): VolunteerSubmission[] {
  return load(KEYS.volunteers, [])
}

export function addVolunteerSubmission(v: Omit<VolunteerSubmission, 'id' | 'submittedAt' | 'status'>) {
  const list = getVolunteerSubmissions()
  save(KEYS.volunteers, [{ ...v, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0], status: 'pending' as SubmissionStatus }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updateVolunteerStatus(id: number, status: SubmissionStatus) {
  const list = getVolunteerSubmissions()
  save(KEYS.volunteers, list.map(v => v.id === id ? { ...v, status } : v))
}

// ─── Event Requests ─────────────────────────────────────────────────────────────

export function getEventRequests(): EventRequest[] {
  return load(KEYS.eventRequests, [])
}

export function addEventRequest(r: Omit<EventRequest, 'id' | 'submittedAt'>) {
  const list = getEventRequests()
  save(KEYS.eventRequests, [{ ...r, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0] }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

// ─── Donations ────────────────────────────────────────────────────────────────

export function getDonations(): DonationRecord[] {
  return load(KEYS.donations, [])
}

export function addDonation(d: Omit<DonationRecord, 'id' | 'donatedAt'>) {
  const list = getDonations()
  save(KEYS.donations, [{ ...d, id: Date.now(), donatedAt: new Date().toISOString() }, ...list])
}

// ─── Fellowship Listings ──────────────────────────────────────────────────────

export function getFellowshipListings(): FellowshipListing[] {
  return load(KEYS.fellowships, [])
}

export function addFellowshipListing(f: Omit<FellowshipListing, 'id' | 'submittedAt' | 'status'>) {
  const list = getFellowshipListings()
  save(KEYS.fellowships, [{ ...f, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0], status: 'pending' as SubmissionStatus }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updateFellowshipStatus(id: number, status: SubmissionStatus) {
  const list = getFellowshipListings()
  save(KEYS.fellowships, list.map(f => f.id === id ? { ...f, status } : f))
}

// ─── Water Conservation Registrations ────────────────────────────────────────

export function getWaterConservationRegistrations(): WaterConservationRegistration[] {
  return load(KEYS.waterConservation, [])
}

export function addWaterConservationRegistration(r: Omit<WaterConservationRegistration, 'id' | 'submittedAt' | 'status'>) {
  const list = getWaterConservationRegistrations()
  save(KEYS.waterConservation, [{ ...r, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0], status: 'pending' as SubmissionStatus }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updateWaterConservationStatus(id: number, status: SubmissionStatus) {
  const list = getWaterConservationRegistrations()
  save(KEYS.waterConservation, list.map(r => r.id === id ? { ...r, status } : r))
}

// ─── Newsletter Subscribers ───────────────────────────────────────────────────

export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  return load(KEYS.newsletter, [])
}

export function addNewsletterSubscriber(email: string, source: string) {
  const list = getNewsletterSubscribers()
  if (list.find(s => s.email === email)) return
  save(KEYS.newsletter, [{ id: Date.now(), email, source, subscribedAt: new Date().toISOString().split('T')[0] }, ...list])
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export function getStories(): Story[] {
  return load(KEYS.stories, DEFAULT_STORIES)
}

export function saveStories(stories: Story[]) {
  save(KEYS.stories, stories)
}

// ─── SDG Education Registrations ───────────────────────────────────────────────

export function getSdgEducationRegistrations(): SdgEducationRegistration[] {
  return load(KEYS.sdgEducation, [])
}

export function addSdgEducationRegistration(r: Omit<SdgEducationRegistration, 'id' | 'submittedAt' | 'status'>) {
  const list = getSdgEducationRegistrations()
  save(KEYS.sdgEducation, [{ ...r, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0], status: 'pending' as SubmissionStatus }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updateSdgEducationStatus(id: number, status: SubmissionStatus) {
  const list = getSdgEducationRegistrations()
  save(KEYS.sdgEducation, list.map(r => r.id === id ? { ...r, status } : r))
}

// ─── Sustainability Registrations ──────────────────────────────────────────────────

export function getSustainabilityRegistrations(): SustainabilityRegistration[] {
  return load(KEYS.sustainability, [])
}

export function addSustainabilityRegistration(r: Omit<SustainabilityRegistration, 'id' | 'submittedAt' | 'status'>) {
  const list = getSustainabilityRegistrations()
  save(KEYS.sustainability, [{ ...r, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0], status: 'pending' as SubmissionStatus }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updateSustainabilityStatus(id: number, status: SubmissionStatus) {
  const list = getSustainabilityRegistrations()
  save(KEYS.sustainability, list.map(r => r.id === id ? { ...r, status } : r))
}

// ─── Clean Community Registrations ────────────────────────────────────────────────

export function getCleanCommunityRegistrations(): CleanCommunityRegistration[] {
  return load(KEYS.cleanCommunity, [])
}

export function addCleanCommunityRegistration(r: Omit<CleanCommunityRegistration, 'id' | 'submittedAt' | 'status'>) {
  const list = getCleanCommunityRegistrations()
  save(KEYS.cleanCommunity, [{ ...r, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0], status: 'pending' as SubmissionStatus }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updateCleanCommunityStatus(id: number, status: SubmissionStatus) {
  const list = getCleanCommunityRegistrations()
  save(KEYS.cleanCommunity, list.map(r => r.id === id ? { ...r, status } : r))
}

// ─── Certificate Submissions ───────────────────────────────────────────────────

export function getCertificateSubmissions(): CertificateSubmission[] {
  return load(KEYS.certificates, [])
}

export function addCertificateSubmission(r: Omit<CertificateSubmission, 'id' | 'submittedAt' | 'status'>) {
  const list = getCertificateSubmissions()
  save(KEYS.certificates, [{ ...r, id: Date.now(), submittedAt: new Date().toISOString().split('T')[0], status: 'pending' as SubmissionStatus }, ...list])
  const stats = getAdminStats()
  save(KEYS.stats, { ...stats, pendingRequests: stats.pendingRequests + 1 })
}

export function updateCertificateStatus(id: number, status: SubmissionStatus) {
  const list = getCertificateSubmissions()
  save(KEYS.certificates, list.map(r => r.id === id ? { ...r, status } : r))
}
