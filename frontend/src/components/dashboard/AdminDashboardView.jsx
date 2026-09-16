import React from 'react';

export default function AdminDashboardView() {
  // Data for the 4 stat cards
  const stats = [
    { label: 'Knowledge Indexed', value: '1,284', trend: '+8.4%', icon: '▤' },
    { label: 'Questions Answered', value: '348', trend: 'this month', icon: '✧' },
    { label: 'Active Contributors', value: '42', trend: '+6 this week', icon: '☺' },
    { label: 'Answer Confidence', value: '92.6%', trend: '+2.1%', icon: '◎' },
  ];

  // Data for the recent questions list
  const questions = [
    { q: 'What changed in our pricing strategy this quarter?', u: 'Maya Novak', t: '8 min ago', src: 3 },
    { q: 'Summarise the remote work principles', u: 'Marcus Chen', t: 'Yesterday', src: 1 },
    { q: 'Who owns the onboarding experience?', u: 'Aisha Khan', t: 'Yesterday', src: 4 },
    { q: 'What are the key Q4 product bets?', u: 'David Okafor', t: 'Mon, 18 Nov', src: 6 },
  ];

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#7A8B8E', fontWeight: '600' }}>Monday, 24 November</p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '42px', color: '#173B3F', margin: '8px 0' }}>A good morning, Maya.</h1>
        <p style={{ color: '#7A8B8E', fontSize: '14px' }}>Here's what's happening across your team's memory.</p>
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

      {/* Two-column layout: Recent Questions (left) + Placeholder (right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

        {/* LEFT: Recent Questions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#173B3F' }}>Recent questions</h3>
            <button style={{ background: 'none', border: 'none', color: '#7A8B8E', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>View all →</button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E6E3D8', borderRadius: '16px', overflow: 'hidden' }}>
            {questions.map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 24px', borderBottom: i < questions.length - 1 ? '1px solid #F0EDE4' : 'none', cursor: 'pointer' }}>
                {/* Numbered index (01, 02, ...) */}
                <div style={{ fontFamily: 'Fraunces, serif', color: '#A0B0B3', fontSize: '14px', width: '24px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Question + meta */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#173B3F' }}>{q.q}</div>
                  <div style={{ fontSize: '12px', color: '#7A8B8E', marginTop: '4px' }}>{q.u} · {q.t} · {q.src} sources</div>
                </div>
                {/* Arrow */}
                <div style={{ color: '#A0B0B3' }}>↗</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Placeholder for next commit */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#173B3F' }}>Your knowledge</h3>
            <button style={{ background: 'none', border: 'none', color: '#7A8B8E', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>Browse →</button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E6E3D8', borderRadius: '16px', padding: '24px' }}>
            <p style={{ color: '#7A8B8E', fontSize: '14px' }}>Coverage chart coming next.</p>
          </div>
        </div>

      </div>
    </div>
  );
}