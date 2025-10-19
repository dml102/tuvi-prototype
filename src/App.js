import React, { useState } from 'react';
import ResultCard from './ResultCard';

export default function App(){
  const [form, setForm] = useState({
    year: 1990, month:1, day:1, hour24:8, minute:0, isSolar:true, gender:'male'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch('/api/compute', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      const json = await res.json();
      setResult(json);
    } catch(err){
      alert('Lỗi khi gọi API: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{maxWidth:900, margin:'24px auto', padding:20}}>
      <h1>Tuvigenz - Xem Tử Vi</h1>
      <p style={{color:'#475569'}}>Nhập thông tin sinh để nhận lá số sơ bộ và luận giải ngắn.</p>
      <form onSubmit={submit} style={{background:'white', padding:16, borderRadius:8}}>
        <div className="grid">
          <label>Ngày<input type="number" value={form.day} onChange={e=>setForm({...form, day:+e.target.value})} /></label>
          <label>Tháng<input type="number" value={form.month} onChange={e=>setForm({...form, month:+e.target.value})} /></label>
          <label>Năm<input type="number" value={form.year} onChange={e=>setForm({...form, year:+e.target.value})} /></label>
          <label>Giờ (0-23)<input type="number" value={form.hour24} onChange={e=>setForm({...form, hour24:+e.target.value})} /></label>
          <label>Phút<input type="number" value={form.minute} onChange={e=>setForm({...form, minute:+e.target.value})} /></label>
          <label>Giới tính
            <select value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})}>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </label>
          <label>Loại lịch
            <select value={form.isSolar} onChange={e=>setForm({...form, isSolar: e.target.value === 'true'})}>
              <option value="true">Dương lịch</option>
              <option value="false">Âm lịch</option>
            </select>
          </label>
        </div>
        <div style={{marginTop:12}}>
          <button type="submit" disabled={loading}>{loading ? 'Đang tính...' : 'Xem tử vi'}</button>
        </div>
      </form>

      {result && <ResultCard data={result} />}
    </div>
  );
}
