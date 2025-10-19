const solarlunar = require('solarlunar');

// Simple helper tables
const hourToChi = [
  {chi:'Tý', start:23, end:1},
  {chi:'Sửu', start:1,  end:3},
  {chi:'Dần', start:3,  end:5},
  {chi:'Mão', start:5,  end:7},
  {chi:'Thìn',start:7,  end:9},
  {chi:'Tỵ',  start:9,  end:11},
  {chi:'Ngọ', start:11, end:13},
  {chi:'Mùi', start:13, end:15},
  {chi:'Thân',start:15, end:17},
  {chi:'Dậu', start:17, end:19},
  {chi:'Tuất',start:19, end:21},
  {chi:'Hợi', start:21, end:23},
];

const cans = ['Canh','Tân','Nhâm','Quý','Giáp','Ất','Bính','Đinh','Mậu','Kỷ'];
const chis = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

function findHourChi(hour24){
  for(const h of hourToChi){
    if(h.start > h.end){
      if(hour24 >= h.start || hour24 < h.end) return h.chi;
    } else {
      if(hour24 >= h.start && hour24 < h.end) return h.chi;
    }
  }
  return null;
}

function canOfYear(year){
  const idx = (year + 6) % 10;
  return cans[idx];
}

function chiOfYear(year){
  return chis[(year + 8) % 12];
}

function anCungMenh(monthIndex1to12, hourChi){
  const cung = ['Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi','Tý','Sửu'];
  const startIdx = 0;
  const idxAfterCountingMonth = (startIdx + (monthIndex1to12 - 1)) % 12;
  const hourPos = cung.indexOf(hourChi);
  if(hourPos === -1) return cung[idxAfterCountingMonth];
  const idxTý = cung.indexOf('Tý');
  const steps = ( (idxTý - hourPos) + 12 ) % 12;
  const menhIdx = (idxAfterCountingMonth - steps + 12) % 12;
  return cung[menhIdx];
}

const canToElement = {
  'Giáp':'Mộc','Ất':'Mộc',
  'Bính':'Hỏa','Đinh':'Hỏa',
  'Mậu':'Thổ','Kỷ':'Thổ',
  'Canh':'Kim','Tân':'Kim',
  'Nhâm':'Thủy','Quý':'Thủy'
};

function simpleSnippets(result){
  const out = [];
  if(result.hourChi === 'Tý') out.push("Giờ Tý: người sinh giờ Tý thường nhanh nhẹn, hoạt bát và thích khám phá.");
  if(result.menh === 'Dần') out.push("Cung Mệnh ở Dần: bản tính can đảm, thích mạo hiểm; cần chú ý quan hệ gia đình.");
  // Add a few generic snippets
  if(result.element) out.push("Ngũ hành bản mệnh: " + result.element + ".");
  return out;
}

module.exports = (req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  try{
    const body = req.method === 'GET' ? req.query : req.body || {};
    const year = Number(body.year) || 1990;
    const month = Number(body.month) || 1;
    const day = Number(body.day) || 1;
    const hour24 = Number(body.hour24) || 8;
    const minute = Number(body.minute) || 0;
    const isSolar = (body.isSolar === undefined) ? true : (body.isSolar === true || body.isSolar === 'true');
    const gender = body.gender || 'male';

    let lunar;
    if(isSolar){
      lunar = solarlunar.solar2lunar(year, month, day);
    } else {
      lunar = { lunarYear: year, lunarMonth: month, lunarDay: day, isLeap:false };
    }

    const yCan = canOfYear(Number(lunar.lunarYear));
    const yChi = chiOfYear(Number(lunar.lunarYear));
    const hChi = findHourChi(hour24);
    const menh = anCungMenh(lunar.lunarMonth, hChi);
    const element = canToElement[yCan.split('')[0]] || null;

    const out = {
      input: { year, month, day, hour24, minute, isSolar, gender },
      lunar,
      yearCan: yCan,
      yearChi: yChi,
      hourChi: hChi,
      menh,
      element,
      snippets: simpleSnippets({hourChi:hChi, menh, element})
    };

    res.status(200).json(out);
  } catch(e){
    res.status(500).json({ error: e.message });
  }
};
