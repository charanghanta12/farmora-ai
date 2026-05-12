"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi' | 'te'

interface Translations {
  [key: string]: {
    en: string
    hi: string
    te: string
  }
}

export const translations: Translations = {
  // Navigation
  home: { en: 'Home', hi: 'होम', te: 'హోమ్' },
  marketplace: { en: 'Marketplace', hi: 'बाज़ार', te: 'మార్కెట్‌ప్లేస్' },
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డాష్‌బోర్డ్' },
  about: { en: 'About', hi: 'हमारे बारे में', te: 'మా గురించి' },
  contact: { en: 'Contact', hi: 'संपर्क', te: 'సంప్రదించండి' },
  login: { en: 'Login', hi: 'लॉगिन', te: 'లాగిన్' },
  signup: { en: 'Sign Up', hi: 'साइन अप', te: 'సైన్ అప్' },
  
  // Hero Section
  heroTitle: { 
    en: 'Sell Your Crops Directly', 
    hi: 'अपनी फसल सीधे बेचें', 
    te: 'మీ పంటను నేరుగా అమ్మండి' 
  },
  heroSubtitle: { 
    en: 'No Middlemen, Fair Prices, AI-Powered Insights', 
    hi: 'कोई बिचौलिया नहीं, उचित कीमत, AI-संचालित अंतर्दृष्टि', 
    te: 'మధ్యవర్తులు లేవు, న్యాయమైన ధరలు, AI-ఆధారిత అంతర్దృష్టులు' 
  },
  heroDescription: {
    en: 'Connect directly with buyers, restaurants, and exporters. Get AI price predictions and maximize your profits.',
    hi: 'खरीदारों, रेस्तरां और निर्यातकों से सीधे जुड़ें। AI मूल्य भविष्यवाणी प्राप्त करें और अपना लाभ अधिकतम करें।',
    te: 'కొనుగోలుదారులు, రెస్టారెంట్లు మరియు ఎగుమతిదారులతో నేరుగా కనెక్ట్ అవ్వండి. AI ధర అంచనాలు పొందండి మరియు మీ లాభాలను గరిష్టం చేయండి.'
  },
  
  // Buttons
  getStarted: { en: 'Get Started', hi: 'शुरू करें', te: 'ప్రారంభించండి' },
  learnMore: { en: 'Learn More', hi: 'और जानें', te: 'మరింత తెలుసుకోండి' },
  sellNow: { en: 'Sell Now', hi: 'अभी बेचें', te: 'ఇప్పుడు అమ్మండి' },
  buyNow: { en: 'Buy Now', hi: 'अभी खरीदें', te: 'ఇప్పుడు కొనండి' },
  viewAll: { en: 'View All', hi: 'सभी देखें', te: 'అన్నీ చూడండి' },
  
  // User Types
  farmer: { en: 'Farmer', hi: 'किसान', te: 'రైతు' },
  buyer: { en: 'Buyer', hi: 'खरीदार', te: 'కొనుగోలుదారు' },
  
  // Features
  aiPricePrediction: { 
    en: 'AI Price Prediction', 
    hi: 'AI मूल्य भविष्यवाणी', 
    te: 'AI ధర అంచనా' 
  },
  directSelling: { 
    en: 'Direct Selling', 
    hi: 'सीधी बिक्री', 
    te: 'ప్రత్యక్ష అమ్మకం' 
  },
  securePayments: { 
    en: 'Secure Payments', 
    hi: 'सुरक्षित भुगतान', 
    te: 'సురక్షిత చెల్లింపులు' 
  },
  realTimeTracking: { 
    en: 'Real-time Tracking', 
    hi: 'रीयल-टाइम ट्रैकिंग', 
    te: 'రియల్-టైమ్ ట్రాకింగ్' 
  },
  
  // Stats
  activeFarmers: { en: 'Active Farmers', hi: 'सक्रिय किसान', te: 'సక్రియ రైతులు' },
  totalTransactions: { en: 'Total Transactions', hi: 'कुल लेनदेन', te: 'మొత్తం లావాదేవీలు' },
  croresSaved: { en: 'Crores Saved', hi: 'करोड़ बचाए', te: 'కోట్లు ఆదా' },
  statesServed: { en: 'States Served', hi: 'राज्यों में सेवा', te: 'రాష్ట్రాలు సేవించబడ్డాయి' },
  
  // Categories
  vegetables: { en: 'Vegetables', hi: 'सब्जियां', te: 'కూరగాయలు' },
  fruits: { en: 'Fruits', hi: 'फल', te: 'పండ్లు' },
  grains: { en: 'Grains', hi: 'अनाज', te: 'ధాన్యాలు' },
  pulses: { en: 'Pulses', hi: 'दालें', te: 'పప్పులు' },
  spices: { en: 'Spices', hi: 'मसाले', te: 'సుగంధ ద్రవ్యాలు' },
  organic: { en: 'Organic', hi: 'जैविक', te: 'సేంద్రీయ' },
  
  // Dashboard
  myProducts: { en: 'My Products', hi: 'मेरे उत्पाद', te: 'నా ఉత్పత్తులు' },
  myOrders: { en: 'My Orders', hi: 'मेरे ऑर्डर', te: 'నా ఆర్డర్లు' },
  analytics: { en: 'Analytics', hi: 'विश्लेषण', te: 'విశ్లేషణలు' },
  earnings: { en: 'Earnings', hi: 'कमाई', te: 'సంపాదన' },
  messages: { en: 'Messages', hi: 'संदेश', te: 'సందేశాలు' },
  settings: { en: 'Settings', hi: 'सेटिंग्स', te: 'సెట్టింగ్‌లు' },
  
  // AI Features
  askAI: { en: 'Ask AI Assistant', hi: 'AI सहायक से पूछें', te: 'AI అసిస్టెంట్‌ను అడగండి' },
  priceAnalysis: { en: 'Price Analysis', hi: 'मूल्य विश्लेषण', te: 'ధర విశ్లేషణ' },
  demandForecast: { en: 'Demand Forecast', hi: 'मांग पूर्वानुमान', te: 'డిమాండ్ అంచనా' },
  marketInsights: { en: 'Market Insights', hi: 'बाजार अंतर्दृष्टि', te: 'మార్కెట్ అంతర్దృష్టులు' },
  
  // Forms
  email: { en: 'Email', hi: 'ईमेल', te: 'ఇమెయిల్' },
  password: { en: 'Password', hi: 'पासवर्ड', te: 'పాస్‌వర్డ్' },
  phone: { en: 'Phone Number', hi: 'फ़ोन नंबर', te: 'ఫోన్ నంబర్' },
  name: { en: 'Full Name', hi: 'पूरा नाम', te: 'పూర్తి పేరు' },
  location: { en: 'Location', hi: 'स्थान', te: 'స్థానం' },
  
  // Footer
  allRightsReserved: { 
    en: 'All rights reserved', 
    hi: 'सर्वाधिकार सुरक्षित', 
    te: 'అన్ని హక్కులు రిజర్వు చేయబడ్డాయి' 
  },
  privacyPolicy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति', te: 'గోప్యతా విధానం' },
  termsOfService: { en: 'Terms of Service', hi: 'सेवा की शर्तें', te: 'సేవా నిబంధనలు' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) return key
    return translation[language] || translation.en || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
