
export type RiskLevel = 'Low' | 'Medium' | 'High';

const STORAGE_KEY = 'user_risk_profile_level';

export const db = {
  saveRiskLevel: (level: string) => {
    // Normalize the string from AI to one of the three levels
    let normalizedLevel: RiskLevel = 'Low';
    const lower = level.toLowerCase();
    
    if (lower.includes('high') || lower.includes('aggressive') || lower.includes('growth') || lower.includes('جريء') || lower.includes('مغامر')) {
      normalizedLevel = 'High';
    } else if (lower.includes('medium') || lower.includes('moderate') || lower.includes('balanced') || lower.includes('متوسط') || lower.includes('متوازن')) {
      normalizedLevel = 'Medium';
    } else {
      normalizedLevel = 'Low'; // Default to Low/Conservative
    }

    localStorage.setItem(STORAGE_KEY, normalizedLevel);
    console.log(`[DB] Saved Risk Level: ${normalizedLevel}`);
  },

  getRiskLevel: (): RiskLevel | null => {
    return localStorage.getItem(STORAGE_KEY) as RiskLevel | null;
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
