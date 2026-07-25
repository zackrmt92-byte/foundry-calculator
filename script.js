function calculateScore() {
  let total = 0;

  // 1. First Control Points (Fixed Checkboxes)
  const fcPoints = {
    imperial_fc: 9000,
    proto1_fc: 6000,
    proto2_fc: 6000,
    boiler_fc: 1200,
    transit_fc: 1200,
    merc_fc: 1200,
    munition_fc: 1200,
    rf1_fc: 3000,
    rf2_fc: 3000,
    rf3_fc: 3000,
    rf4_fc: 3000
  };

  for (let key in fcPoints) {
    if (document.getElementById(key).checked) {
      total += fcPoints[key];
    }
  }

  // 2. Workshops (4,800 points each)
  const workshopsLooted = parseInt(document.getElementById('workshops_count').value) || 0;
  total += workshopsLooted * 4800;

  // 3. Individual Building Minutes (Points Per Minute * Minutes Held)
  const ppmRates = {
    imperial_min: 1800,
    proto1_min: 1200,
    proto2_min: 1200,
    boiler_min: 240,
    transit_min: 240,
    merc_min: 240,
    munition_min: 240,
    rf1_min: 600,
    rf2_min: 600,
    rf3_min: 600,
    rf4_min: 600
  };

  for (let id in ppmRates) {
    const minutesHeld = parseFloat(document.getElementById(id).value) || 0;
    total += minutesHeld * ppmRates[id];
  }

  // Display Total
  document.getElementById('total-score').innerText = total.toLocaleString();
}
