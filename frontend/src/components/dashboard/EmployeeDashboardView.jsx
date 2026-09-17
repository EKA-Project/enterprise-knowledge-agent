import React from 'react';

export default function EmployeeDashboardView() {
  // Personal stats — this employee's own activity
  const stats = [
    { label: 'Questions Asked', value: '48', trend: '+12 this month', icon: '✧' },
    { label: 'Documents Viewed', value: '156', trend: '+8 this week', icon: '▤' },
    { label: 'Answers Rated', value: '32', trend: '94% helpful', icon: '★' },
    { label: 'Team Activity', value: '12', trend: 'new this week', icon: '☺' },
  ];

  return (
    <div style={{ padding: '32px' }}>
      {/* Header — personal greeting */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#7A8B8E', fontWeight: '600' }}>Monday, 24 November</p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '42px', color: '#173B3F', margin: '8px 0' }}>Good morning, Alex.</h1>
        <p style={{ color: '#7A8B8E', fontSize: '14px' }}>Here's what's happening with your knowledge workspace.</p>
      </div>

      {/* Stat Cards Grid — 4 personal stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
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
    </div>
  );
}