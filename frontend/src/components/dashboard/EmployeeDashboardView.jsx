import React from 'react';

export default function EmployeeDashboardView() {
  // Personal stats — this employee's own activity
  const stats = [
    { label: 'Questions Asked', value: '48', trend: '+12 this month', icon: '✧' },
    { label: 'Documents Viewed', value: '156', trend: '+8 this week', icon: '▤' },
    { label: 'Answers Rated', value: '32', trend: '94% helpful', icon: '★' },
    { label: 'Team Activity', value: '12', trend: 'new this week', icon: '☺' },
  ];

  // This employee's recent questions
  const questions = [
    { q: 'What is our parental leave policy?', t: '2 hours ago', src: 3 },
    { q: 'How do I request API access?', t: 'Yesterday', src: 2 },
    { q: 'Where is the onboarding checklist?', t: 'Yesterday', src: 1 },
    { q: 'What are the Q4 team priorities?', t: 'Mon, 25 Nov', src: 4 },
  ];

  return (
    <div style={{ padding: '32px' }}>
      {/* Header — personal greeting */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#7A8B8E', fontWeight: '600' }}>Monday, 24 November</p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '42px', color: '#173B3F', margin: '8px 0' }}>Good morning, Alex.</h1>
        <p style={{ color: '#7A8B8E', fontSize: '14px' }}>Here's what's happening with your knowledge workspace.</p>
      </div>

      {/* Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #E6E3D8', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '22px', color: '#173B3F', marginBottom: '16px' }}>{stat.icon}</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '34px', color: '#173B3F' }}>{stat.value}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#A0B0B3', fontWeight: '600' }}>{stat.label}</span>
              <span style={{ fontSize: '12px', color: '#2E7D5B', fontWeight: '600' }}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout: My questions (left) + Quick actions (right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

        {/* LEFT: My recent questions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#173B3F' }}>My recent questions</h3>
            <button style={{ background: 'none', border: 'none', color: '#7A8B8E', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>View all →</button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E6E3D8', borderRadius: '16px', overflow: 'hidden' }}>
            {questions.map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 24px', borderBottom: i < questions.length - 1 ? '1px solid #F0EDE4' : 'none', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F0F5F4', color: '#173B3F', display: 'grid', placeItems: 'center', fontSize: '14px', flexShrink: 0 }}>✧</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#173B3F' }}>{q.q}</div>
                  <div style={{ fontSize: '12px', color: '#7A8B8E', marginTop: '4px' }}>{q.t} · {q.src} sources</div>
                </div>
                <div style={{ color: '#A0B0B3' }}>↗</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Quick actions panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#173B3F' }}>Quick actions</h3>
          </div>

          {/* Ask EKA card — prominent dark CTA */}
          <div style={{ background: '#173B3F', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px', color: '#fff' }}>✧</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Ask EKA</div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', marginBottom: '16px' }}>
              Get grounded answers from your organisation's knowledge base.
            </p>
            <button style={{ width: '100%', padding: '12px', background: '#F3C543', border: 'none', borderRadius: '10px', color: '#173B3F', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              + Start new question
            </button>
          </div>

          {/* Browse documents card */}
          <div style={{ background: '#FBFAF6', border: '1px solid #E6E3D8', borderLeft: '4px solid #F3C543', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '12px', color: '#7A8B8E', marginBottom: '8px' }}>📚 Browse documents</div>
            <p style={{ fontSize: '13px', color: '#173B3F', lineHeight: '1.5' }}>
              Explore the 8,942 documents in your knowledge base.
            </p>
            <button style={{ marginTop: '12px', background: 'none', border: 'none', color: '#173B3F', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: 0 }}>
              Browse →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}