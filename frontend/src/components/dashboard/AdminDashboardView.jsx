import React from 'react';

export default function AdminDashboardView() {
  const stats = [
    { label: 'Knowledge Indexed', value: '1,284', trend: '+8.4%', icon: '▤' },
    { label: 'Questions Answered', value: '348', trend: 'this month', icon: '✧' },
    { label: 'Active Contributors', value: '42', trend: '+6 this week', icon: '☺' },
    { label: 'Answer Confidence', value: '92.6%', trend: '+2.1%', icon: '◎' },
  ];

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', color: '#7A8B8E', fontWeight: '600' }}>Monday, 24 November</p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '42px', color: '#173B3F', margin: '8px 0' }}>A good morning, Maya.</h1>
        <p style={{ color: '#7A8B8E', fontSize: '14px' }}>Here's what's happening across your team's memory.</p>
      </div>

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