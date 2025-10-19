import React from 'react';

export default function ResultCard({ data }){
  return (
    <div style={{marginTop:20, padding:16, borderRadius:8, background:'white'}}>
      <h2>Kết quả</h2>
      <div style={{display:'flex', gap:20, flexWrap:'wrap'}}>
        <div style={{flex:'1 1 300px'}}>
          <h3>Thông tin</h3>
          <p><strong>Input:</strong> {data.input.year}/{data.input.month}/{data.input.day} {data.input.hour24}:{String(data.input.minute).padStart(2,'0')}</p>
          <p><strong>Âm lịch:</strong> {data.lunar.lunarDay}/{data.lunar.lunarMonth}/{data.lunar.lunarYear} {data.lunar.isLeap ? '(Nhuận)' : ''}</p>
        </div>
        <div style={{flex:'1 1 300px'}}>
          <h3>Phân tích</h3>
          <p><strong>Năm:</strong> {data.yearCan} {data.yearChi}</p>
          <p><strong>Giờ chi:</strong> {data.hourChi}</p>
          <p><strong>Cung Mệnh (sơ bộ):</strong> {data.menh}</p>
          <p><strong>Ngũ hành:</strong> {data.element}</p>
        </div>
      </div>

      {data.snippets && data.snippets.length > 0 && (
        <div style={{marginTop:12}}>
          <h3>Luận giải</h3>
          {data.snippets.map((s,i)=>(<p key={i}>- {s}</p>))}
        </div>
      )}

      <div style={{marginTop:12, color:'#92400e'}}>
        <strong>Ghi chú:</strong> Đây là kết quả sơ bộ. Để chính xác theo sách, cần chuẩn hoá thêm bảng và luật an sao.
      </div>
    </div>
  );
}
