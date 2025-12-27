// backend/services/riskScore.service.js

exports.calculateRiskScore = (requests) => {
  let score = 0;

  requests.forEach((r) => {
    if (r.type === "corrective") score += 2;
    if (r.durationHours && r.durationHours > 3) score += 1.5;
  });

  return Math.min(Math.round(score * 10), 100);
};
