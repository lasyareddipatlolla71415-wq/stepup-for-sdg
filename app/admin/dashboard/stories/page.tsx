'use client'

import { useEffect, useState } from 'react'
import { useDashboardTheme } from '../ThemeContext'
import { getStories, saveStories, type Story } from '@/app/lib/adminStore'

const CATEGORIES = ['Education', 'Water', 'Fellowship', 'Community', 'Sustainability', 'Health', 'Other']

const EMPTY_FORM: Omit<Story, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '', excerpt: '', content: '', author: '', category: 'Education', image: '', published: false,
}

export default function StoriesPage() {
  const { dark } = useDashboardTheme()
  const [stories, setStories] = useState<Story[]>([])
  const [modal, setModal] = useState<'create' | 'edit' | null>(null)
  const [form, setForm] = useState<Omit<Story, 'id' | 'createdAt' | 'updatedAt'>>(EMPTY_FORM)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const reload = () => setStories(getStories())
  useEffect(() => { reload() }, [])

  const c = {
    bg:          dark ? '#0f1117' : '#f5f6fa',
    surface:     dark ? '#1a1d27' : '#ffffff',
    surfaceAlt:  dark ? '#1f2335' : '#f8f9fc',
    border:      dark ? 'rgba(255,255,255,.07)' : '#e8eaf0',
    textPrimary: dark ? '#f0f2f8' : '#111827',
    textMuted:   dark ? '#4a5168' : '#9ca3af',
    textSecond:  dark ? '#8891aa' : '#6b7280',
    shadow:      dark ? '0 2px 12px rgba(0,0,0,.4)' : '0 1px 6px rgba(17,24,39,.07)',
  }

  const card = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.shadow }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: `1px solid ${c.border}`, background: c.surfaceAlt,
    color: c.textPrimary, fontSize: 13, fontFamily: 'inherit', outline: 'none',
  }

  const openCreate = () => {
    setForm(EMPTY_FORM)
    setEditId(null)
    setModal('create')
  }

  const openEdit = (s: Story) => {
    setForm({ title: s.title, excerpt: s.excerpt, content: s.content, author: s.author, category: s.category, image: s.image, published: s.published })
    setEditId(s.id)
    setModal('edit')
  }

  const handleSave = () => {
    const all = getStories()
    const now = new Date().toISOString().split('T')[0]
    if (modal === 'create') {
      saveStories([{ ...form, id: Date.now(), createdAt: now, updatedAt: now }, ...all])
    } else if (modal === 'edit' && editId !== null) {
      saveStories(all.map(s => s.id === editId ? { ...s, ...form, updatedAt: now } : s))
    }
    reload()
    setModal(null)
  }

  const handleDelete = (id: number) => {
    saveStories(getStories().filter(s => s.id !== id))
    reload()
    setDeleteId(null)
  }

  const togglePublish = (id: number) => {
    const all = getStories()
    saveStories(all.map(s => s.id === id ? { ...s, published: !s.published } : s))
    reload()
  }

  const filtered = stories.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.author.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  const published = stories.filter(s => s.published).length

  return (
    <div style={{ padding: '28px', background: c.bg, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.textPrimary }}>Stories Management</div>
          <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3 }}>Create and manage impact stories shown on the public stories page</div>
        </div>
        <button onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 9, border: 'none', background: '#3b6ef6', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Story
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Stories', value: stories.length, color: '#3b6ef6' },
          { label: 'Published',     value: published,       color: '#10b981' },
          { label: 'Drafts',        value: stories.length - published, color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, padding: '18px 22px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color }} />
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: c.textMuted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: '8px 14px', marginBottom: 18, width: 320 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stories..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: c.textSecond, width: '100%', fontFamily: 'inherit' }} />
      </div>

      {/* Stories Table */}
      <div style={{ ...card, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px', gap: 8, padding: '10px 22px', background: c.surfaceAlt, borderBottom: `1px solid ${c.border}` }}>
          {['Title', 'Author', 'Category', 'Created', 'Status', 'Actions'].map(h => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 700, color: c.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: c.textMuted, fontSize: 13 }}>No stories found.</div>
        ) : filtered.map((s, i) => (
          <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px', gap: 8, padding: '14px 22px', borderBottom: i < filtered.length - 1 ? `1px solid ${c.border}` : 'none', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{s.title}</div>
              <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 280 }}>{s.excerpt}</div>
            </div>
            <div style={{ fontSize: 12.5, color: c.textSecond }}>{s.author}</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#8b5cf6', background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 6, padding: '2px 8px', width: 'fit-content' }}>{s.category}</span>
            <div style={{ fontSize: 12, color: c.textMuted }}>{s.createdAt}</div>
            <div>
              <button onClick={() => togglePublish(s.id)} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: s.published ? 'rgba(16,185,129,.1)' : 'rgba(245,158,11,.1)', color: s.published ? '#10b981' : '#f59e0b' }}>
                {s.published ? '● Published' : '○ Draft'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => openEdit(s)} style={{ padding: '5px 10px', borderRadius: 6, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
              <button onClick={() => setDeleteId(s.id)} style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid rgba(239,68,68,.3)', background: 'rgba(239,68,68,.08)', color: '#ef4444', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Del</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModal(null)}>
          <div style={{ ...card, width: 560, padding: '28px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary, marginBottom: 20 }}>
              {modal === 'create' ? 'Create New Story' : 'Edit Story'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 5 }}>Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} placeholder="Story title" />
              </div>
              <div>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 5 }}>Excerpt</label>
                <input value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} style={inputStyle} placeholder="Short summary shown on listing page" />
              </div>
              <div>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 5 }}>Content</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Full story content" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 5 }}>Author</label>
                  <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} style={inputStyle} placeholder="Author name" />
                </div>
                <div>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 5 }}>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle }}>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: c.textMuted, display: 'block', marginBottom: 5 }}>Image URL (optional)</label>
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} style={inputStyle} placeholder="https://..." />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
                <span style={{ fontSize: 13, color: c.textPrimary, fontWeight: 500 }}>Publish immediately</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button onClick={handleSave} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#3b6ef6', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {modal === 'create' ? 'Create Story' : 'Save Changes'}
              </button>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDeleteId(null)}>
          <div style={{ ...card, width: 360, padding: '28px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🗑️</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary, marginBottom: 8 }}>Delete Story?</div>
            <div style={{ fontSize: 12.5, color: c.textMuted, marginBottom: 22 }}>This action cannot be undone.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textPrimary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
