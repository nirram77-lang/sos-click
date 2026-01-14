import React, { useState, useEffect } from 'react';
import { Phone, User, Settings, MapPin, X, ChevronRight, Trash2, Plus, Save, Camera, Check, Globe, HelpCircle, LogOut } from 'lucide-react';

// Database simulation with localStorage
const useDatabase = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    return localStorage.getItem('sos_onboarding_complete') === 'true';
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('sos_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      age: '',
      bloodType: '',
      chronicDiseases: '',
      allergies: '',
      medications: ''
    };
  });

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('sos_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sos_settings');
    return saved ? JSON.parse(saved) : {
      language: 'he',
      autoLocationSharing: true,
      notifications: true,
      accessibilityMode: false,
      darkMode: false,
      dataUsageLimit: false,
      offlineAccess: true
    };
  });

  useEffect(() => {
    localStorage.setItem('sos_onboarding_complete', onboardingComplete);
  }, [onboardingComplete]);

  useEffect(() => {
    localStorage.setItem('sos_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sos_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('sos_settings', JSON.stringify(settings));
  }, [settings]);

  return { profile, setProfile, contacts, setContacts, settings, setSettings, onboardingComplete, setOnboardingComplete };
};

const translations = {
  he: {
    appTitle: 'אפליקציית חירום',
    emergencyProfile: 'פרופיל חירום',
    medicalInfo: 'מידע רפואי',
    emergencyCall: 'שיחת חירום',
    sendingLocation: 'שולח מיקום...',
    emergencyContacts: 'אנשי קשר לחירום',
    editProfile: 'עריכת פרופיל חירום',
    manageContacts: 'ניהול אנשי קשר',
    languages: 'שפות',
    advancedSettings: 'הגדרות מתקדמות',
    helpAbout: 'עזרה / מידע',
    bloodType: 'סוג דם',
    chronicDiseases: 'מחלות כרוניות',
    allergies: 'אלרגיות',
    medications: 'תרופות',
    save: 'שמור',
    cancel: 'ביטול',
    back: 'חזור',
    edit: 'עריכה',
    delete: 'מחיקה',
    add: 'הוסף',
    yearsOld: 'שנים',
    personalInfo: 'מידע אישי',
    fullName: 'שם מלא',
    autoLocationSharing: 'שיתוף מיקום אוטומטי',
    notifications: 'התראות',
    accessibilityMode: 'מצב נגישות',
    darkMode: 'מצב כהה',
    dataUsageLimit: 'הגבלת נתונים',
    offlineAccess: 'גישה לא מקוונת',
    saveChanges: 'שמור שינויים',
    hebrew: 'עברית',
    english: 'English',
    relation: 'קרבה',
    viewOnMobile: 'לחוויה מיטבית, פתח באייפון או בטאבלט'
  },
  en: {
    appTitle: 'Emergency App',
    emergencyProfile: 'Emergency Profile',
    medicalInfo: 'Medical Info',
    emergencyCall: 'Emergency Call',
    sendingLocation: 'Sending location...',
    emergencyContacts: 'Emergency Contacts',
    editProfile: 'Edit Emergency Profile',
    manageContacts: 'Manage Contacts',
    languages: 'Languages',
    advancedSettings: 'Advanced Settings',
    helpAbout: 'Help / About',
    bloodType: 'Blood Type',
    chronicDiseases: 'Chronic Diseases',
    allergies: 'Allergies',
    medications: 'Medications',
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    yearsOld: 'years old',
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    autoLocationSharing: 'Auto Location Sharing',
    notifications: 'Notifications',
    accessibilityMode: 'Accessibility Mode',
    darkMode: 'Dark Mode',
    dataUsageLimit: 'Data Usage Limit',
    offlineAccess: 'Offline Access',
    saveChanges: 'Save Changes',
    hebrew: 'עברית',
    english: 'English',
    relation: 'Relation',
    viewOnMobile: 'For best experience, open on mobile device'
  }
};

function App() {
  const { profile, setProfile, contacts, setContacts, settings, setSettings, onboardingComplete, setOnboardingComplete } = useDatabase();
  const [currentScreen, setCurrentScreen] = useState(onboardingComplete ? 'home' : 'onboarding');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sendingLocation, setSendingLocation] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem('sos_premium') === 'true';
  });
  // eslint-disable-next-line no-unused-vars
  const activatePremium = () => setIsPremium(true);
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('sos_profile_image') || null;
  });
  const [onboardingData, setOnboardingData] = useState({
    name: profile.name || '',
    age: profile.age || '',
    bloodType: profile.bloodType || '',
    allergies: profile.allergies || '',
    chronicDiseases: profile.chronicDiseases || '',
    medications: profile.medications || '',
    contactName: '',
    contactPhone: '',
    contactRelation: ''
  });

  // Save premium status
  useEffect(() => {
    localStorage.setItem('sos_premium', isPremium);
  }, [isPremium]);

  // Save profile image to localStorage
  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('sos_profile_image', profileImage);
    }
  }, [profileImage]);

  // Handle back button
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      
      if (menuOpen) {
        setMenuOpen(false);
        window.history.pushState(null, '', window.location.pathname);
        return;
      }
      
      if (currentScreen === 'onboarding' && onboardingStep > 0) {
        setOnboardingStep(prev => prev - 1);
        window.history.pushState(null, '', window.location.pathname);
        return;
      }
      
      if (['edit-profile', 'contacts', 'languages', 'settings', 'help', 'premium'].includes(currentScreen)) {
        setCurrentScreen('home');
        window.history.pushState(null, '', window.location.pathname);
        return;
      }
      
      if (currentScreen === 'profile') {
        setCurrentScreen('home');
        window.history.pushState(null, '', window.location.pathname);
        return;
      }
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [currentScreen, menuOpen, onboardingStep]);

  const language = settings.language;
  const t = translations[language];

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    setMenuOpen(false);
  };

  const handleEmergencyCall = () => {
    setSendingLocation(true);
    if (settings.autoLocationSharing) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error('Location error:', error)
      );
    }
    setTimeout(() => {
      window.location.href = 'tel:101';
      setSendingLocation(false);
    }, 2000);
  };

  // Onboarding Screen - Simple & Beautiful
  const OnboardingScreen = () => {
    const steps = [
      {
        icon: '🆘',
        title: language === 'he' ? 'ברוכים הבאים' : 'Welcome',
        subtitle: language === 'he' ? 'SOS Click יכול להציל חיים' : 'SOS Click can save lives',
        description: language === 'he' 
          ? 'במצב חירום, המידע שלך יהיה זמין במיידי לצוותי הצלה'
          : 'In an emergency, your info will be instantly available to rescue teams'
      },
      {
        icon: '👤',
        title: language === 'he' ? 'הפרטים שלך' : 'Your Details',
        fields: ['name', 'age', 'bloodType']
      },
      {
        icon: '⚠️',
        title: language === 'he' ? 'מידע רפואי' : 'Medical Info',
        fields: ['allergies', 'chronicDiseases', 'medications']
      },
      {
        icon: '📞',
        title: language === 'he' ? 'איש קשר לחירום' : 'Emergency Contact',
        fields: ['contactName', 'contactPhone', 'contactRelation']
      }
    ];

    const fieldLabels = {
      he: {
        name: 'שם מלא',
        age: 'גיל',
        bloodType: 'סוג דם (למשל: A+)',
        allergies: 'אלרגיות (אם יש)',
        chronicDiseases: 'מחלות כרוניות (אם יש)',
        medications: 'תרופות קבועות (אם יש)',
        contactName: 'שם איש קשר',
        contactPhone: 'טלפון',
        contactRelation: 'קרבה (בן/בת זוג, הורה...)'
      },
      en: {
        name: 'Full Name',
        age: 'Age',
        bloodType: 'Blood Type (e.g. A+)',
        allergies: 'Allergies (if any)',
        chronicDiseases: 'Chronic Diseases (if any)',
        medications: 'Current Medications (if any)',
        contactName: 'Contact Name',
        contactPhone: 'Phone',
        contactRelation: 'Relation (spouse, parent...)'
      }
    };

    const handleNext = () => {
      // First, save current input values from DOM
      const currentStepData = steps[onboardingStep];
      if (currentStepData.fields) {
        const newData = {...onboardingData};
        currentStepData.fields.forEach(field => {
          const input = document.getElementById(`input-${field}`);
          if (input) {
            newData[field] = input.value;
          }
        });
        setOnboardingData(newData);
        
        if (onboardingStep < steps.length - 1) {
          setOnboardingStep(onboardingStep + 1);
        } else {
          // Save all data
          setProfile({
            name: newData.name,
            age: newData.age,
            bloodType: newData.bloodType,
            allergies: newData.allergies,
            chronicDiseases: newData.chronicDiseases,
            medications: newData.medications
          });
          
          if (newData.contactName && newData.contactPhone) {
            setContacts([{
              id: Date.now(),
              name: newData.contactName,
              phone: newData.contactPhone,
              relation: newData.contactRelation || (language === 'he' ? 'איש קשר' : 'Contact')
            }]);
          }
          
          setOnboardingComplete(true);
          setCurrentScreen('profile');
        }
      } else {
        if (onboardingStep < steps.length - 1) {
          setOnboardingStep(onboardingStep + 1);
        }
      }
    };

    const handleSkip = () => {
      setOnboardingComplete(true);
      setCurrentScreen('home');
    };

    const currentStep = steps[onboardingStep];
    const isLastStep = onboardingStep === steps.length - 1;
    const isFirstStep = onboardingStep === 0;

    return (
      <div style={{ 
        background: '#0d1829',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingTop: 'env(safe-area-inset-top)'
      }}>
        {/* Progress Bar */}
        <div style={{ padding: '10px 20px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                style={{ 
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background: idx <= onboardingStep ? '#FF8C00' : 'rgba(255,140,0,0.2)',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content - Flex grow to fill space */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          {/* Hero Logo */}
          {currentStep.icon === '🆘' && (
            <img src="/logo-sos.png" alt="SOS Click" style={{ 
              width: '180px', 
              height: '180px', 
              objectFit: 'contain',
              borderRadius: '50%',
              filter: 'drop-shadow(0 0 30px rgba(255,140,0,0.5))',
              marginBottom: '20px'
            }} />
          )}

          {/* Profile Photo Upload */}
          {currentStep.icon === '👤' && (
            <label style={{ cursor: 'pointer', marginBottom: '15px' }}>
              <input 
                type="file" 
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfileImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: profileImage ? `url(${profileImage}) center/cover` : 'linear-gradient(145deg, #162544 0%, #0d1829 100%)',
                border: '2px solid rgba(255,140,0,0.5)',
                boxShadow: '0 0 30px rgba(255,140,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {!profileImage && <User size={45} color="rgba(255,140,0,0.7)" />}
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  background: '#FF8C00',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Camera size={16} color="#0d1829" />
                </div>
              </div>
            </label>
          )}

          {/* Other Icons */}
          {currentStep.icon !== '🆘' && currentStep.icon !== '👤' && (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #162544 0%, #0d1829 100%)',
              border: '2px solid rgba(255,140,0,0.5)',
              boxShadow: '0 0 30px rgba(255,140,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <span style={{ fontSize: '36px' }}>{currentStep.icon}</span>
            </div>
          )}

          {/* Title */}
          <h1 style={{ 
            color: '#FF8C00', 
            fontSize: '26px', 
            fontWeight: 900, 
            marginBottom: '10px',
            direction: language === 'he' ? 'rtl' : 'ltr'
          }}>
            {currentStep.title}
          </h1>

          {/* Welcome Step Text */}
          {isFirstStep && (
            <div style={{ direction: language === 'he' ? 'rtl' : 'ltr' }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', marginBottom: '8px' }}>
                {currentStep.subtitle}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', maxWidth: '300px' }}>
                {currentStep.description}
              </p>
            </div>
          )}

          {/* Form Fields */}
          {currentStep.fields && (
            <div style={{ width: '100%', maxWidth: '320px', marginTop: '10px', direction: language === 'he' ? 'rtl' : 'ltr' }}>
              {currentStep.fields.map((field) => (
                <input
                  key={`${onboardingStep}-${field}`}
                  id={`input-${field}`}
                  type={field === 'age' ? 'number' : field === 'contactPhone' ? 'tel' : 'text'}
                  defaultValue={onboardingData[field]}
                  onBlur={(e) => setOnboardingData(prev => ({...prev, [field]: e.target.value}))}
                  placeholder={fieldLabels[language][field]}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,140,0,0.3)',
                    color: 'white',
                    marginBottom: '12px',
                    outline: 'none'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Button - At Bottom */}
        <div style={{ 
          padding: '20px', 
          paddingBottom: 'max(20px, env(safe-area-inset-bottom))'
        }}>
          <button
            onClick={handleNext}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '18px',
              background: 'linear-gradient(135deg, #FF8C00 0%, #e67e00 100%)',
              boxShadow: '0 0 25px rgba(255,140,0,0.4)',
              color: '#0d1829',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isLastStep 
              ? (language === 'he' ? 'סיום ושמירה ✓' : 'Finish & Save ✓')
              : (language === 'he' ? 'המשך →' : 'Continue →')
            }
          </button>
          
          {!isFirstStep && (
            <button
              onClick={handleSkip}
              style={{ 
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,140,0,0.6)',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {language === 'he' ? 'דלג והשלם אחר כך' : 'Skip, complete later'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const HomeScreen = () => (
    <div style={{ 
      direction: language === 'he' ? 'rtl' : 'ltr',
      background: '#0d1829',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Main Content - Centered Logo */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Big Beautiful Logo */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <img 
            src="/logo-sos.png" 
            alt="SOS Click" 
            style={{ 
              width: 'min(70vw, 280px)', 
              height: 'min(70vw, 280px)', 
              objectFit: 'contain',
              borderRadius: '50%',
              filter: 'drop-shadow(0 0 40px rgba(255,140,0,0.4))'
            }} 
          />
        </div>
        
        {/* Sending Location Indicator */}
        {sendingLocation && (
          <div style={{
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: '16px',
            padding: '16px 24px',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <MapPin size={28} style={{ color: '#3b82f6', animation: 'spin 1s linear infinite' }} />
            </div>
            <p style={{ color: '#93c5fd', fontSize: '16px', fontWeight: 500 }}>{t.sendingLocation}</p>
          </div>
        )}
      </div>

      {/* Bottom Section - Premium Bronze Style */}
      <div style={{
        background: 'linear-gradient(to top, rgba(205,127,50,0.15) 0%, rgba(255,140,0,0.05) 50%, transparent 100%)',
        borderTop: '1px solid rgba(205,127,50,0.4)',
        padding: '20px',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))'
      }}>
        {/* App URL - Shimmering Bronze */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <p style={{ 
            color: '#CD7F32',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '2px',
            textShadow: '0 0 10px rgba(205,127,50,0.5)',
            animation: 'shimmer 2s ease-in-out infinite'
          }}>
            www.sosclick.app
          </p>
        </div>
        
        {/* Bottom Navigation - Bronze Theme */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(205,127,50,0.1) 0%, rgba(255,140,0,0.05) 100%)',
          borderRadius: '20px',
          padding: '12px',
          border: '1px solid rgba(205,127,50,0.3)',
          boxShadow: '0 0 30px rgba(205,127,50,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}>
          {/* Emergency Call */}
          <button
            onClick={handleEmergencyCall}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <div style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #CD7F32 0%, #B8860B 50%, #DAA520 100%)',
              boxShadow: '0 0 25px rgba(205,127,50,0.6), inset 0 2px 4px rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(218,165,32,0.5)'
            }}>
              <Phone size={26} color="#0d1829" />
            </div>
            <span style={{ color: '#CD7F32', fontSize: '11px', fontWeight: 600 }}>חירום</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigateTo('profile')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <div style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, rgba(205,127,50,0.2) 0%, rgba(184,134,11,0.1) 100%)',
              border: '2px solid rgba(205,127,50,0.4)',
              boxShadow: '0 0 15px rgba(205,127,50,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={26} color="#CD7F32" />
            </div>
            <span style={{ color: 'rgba(205,127,50,0.7)', fontSize: '11px', fontWeight: 600 }}>פרופיל</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <div style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, rgba(205,127,50,0.2) 0%, rgba(184,134,11,0.1) 100%)',
              border: '2px solid rgba(205,127,50,0.4)',
              boxShadow: '0 0 15px rgba(205,127,50,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Settings size={26} color="#CD7F32" />
            </div>
            <span style={{ color: 'rgba(205,127,50,0.7)', fontSize: '11px', fontWeight: 600 }}>הגדרות</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => {
    const [expandedSection, setExpandedSection] = useState(null);
    
    const patientCardLabels = {
      he: {
        patientCard: 'כרטיס מטופל',
        bloodType: 'סוג דם',
        age: 'גיל',
        allergiesAlert: 'אלרגיות',
        chronicConditions: 'מחלות כרוניות',
        currentMedications: 'תרופות קבועות',
        emergencyContacts: 'אנשי קשר לחירום',
        noAllergies: 'אין אלרגיות ידועות',
        noConditions: 'אין מחלות כרוניות',
        noMedications: 'לא נוטל תרופות',
        tapForMore: 'לחץ לפרטים'
      },
      en: {
        patientCard: 'Patient Card',
        bloodType: 'Blood Type',
        age: 'Age',
        allergiesAlert: 'Allergies',
        chronicConditions: 'Chronic Conditions',
        currentMedications: 'Current Medications',
        emergencyContacts: 'Emergency Contacts',
        noAllergies: 'No known allergies',
        noConditions: 'No chronic conditions',
        noMedications: 'No current medications',
        tapForMore: 'Tap for details'
      }
    };
    const labels = patientCardLabels[language];

    const toggleSection = (section) => {
      setExpandedSection(expandedSection === section ? null : section);
    };

    const InfoSection = ({ id, icon, title, content, titleColor, noContent }) => {
      const isExpanded = expandedSection === id;
      const hasLongContent = content && content.length > 25;
      const displayContent = content || noContent;
      
      return (
        <div 
          onClick={() => hasLongContent && toggleSection(id)}
          className={`p-4 transition-all ${hasLongContent ? 'cursor-pointer active:opacity-80' : ''}`}
          style={{ borderBottom: '1px solid rgba(255,140,0,0.1)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <h3 className="font-bold text-base" style={{ color: titleColor }}>{title}</h3>
            </div>
            {hasLongContent && (
              <ChevronRight 
                size={18} 
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                style={{ color: 'rgba(255,140,0,0.5)' }} 
              />
            )}
          </div>
          <div className={`mt-2 overflow-hidden transition-all duration-300 ${isExpanded || !hasLongContent ? 'max-h-40' : 'max-h-6'}`}>
            <p className={`text-sm font-medium text-white/90 ${!isExpanded && hasLongContent ? 'truncate' : 'whitespace-pre-wrap'}`}>
              {displayContent}
            </p>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen pb-24" style={{ 
        direction: language === 'he' ? 'rtl' : 'ltr',
        background: '#0d1829'
      }}>
        
        {/* Logo Header */}
        <div className="pt-6 pb-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{
            background: 'linear-gradient(145deg, #162544 0%, #0d1829 100%)',
            border: '2px solid rgba(255,140,0,0.5)',
            boxShadow: '0 0 40px rgba(255,140,0,0.25), inset 0 0 20px rgba(255,140,0,0.1)'
          }}>
            <img src="/logo-sos.png" alt="SOS Click" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-widest" style={{ color: '#FF8C00' }}>SOS CLICK</h1>
        </div>

        {/* Main Patient Card */}
        <div className="mx-4 rounded-3xl overflow-hidden" style={{
          background: '#0d1829',
          border: '1px solid rgba(255,140,0,0.2)',
          boxShadow: '0 0 50px rgba(255,140,0,0.1)'
        }}>
          
          {/* Name & Blood Type Header */}
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,140,0,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #FF8C00 0%, #e67e00 100%)',
                boxShadow: '0 0 20px rgba(255,140,0,0.4)'
              }}>
                <User size={26} style={{ color: '#0d1829' }} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                <p className="text-sm" style={{ color: '#FF8C00' }}>{labels.age}: {profile.age}</p>
              </div>
            </div>
            
            {/* Blood Type Badge */}
            <div className="rounded-xl px-4 py-2 text-center" style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              boxShadow: '0 0 15px rgba(220,38,38,0.4)'
            }}>
              <p className="text-red-200 text-xs mb-0.5">{labels.bloodType}</p>
              <p className="text-white text-2xl font-black">{profile.bloodType}</p>
            </div>
          </div>

          {/* Medical Info Sections with Dropdowns */}
          <InfoSection 
            id="allergies"
            icon="⚠️"
            title={labels.allergiesAlert}
            content={profile.allergies}
            titleColor="#f87171"
            noContent={labels.noAllergies}
          />
          
          <InfoSection 
            id="conditions"
            icon="🏥"
            title={labels.chronicConditions}
            content={profile.chronicDiseases}
            titleColor="#FF8C00"
            noContent={labels.noConditions}
          />
          
          <InfoSection 
            id="medications"
            icon="💊"
            title={labels.currentMedications}
            content={profile.medications}
            titleColor="#60a5fa"
            noContent={labels.noMedications}
          />

          {/* Emergency Contacts */}
          <div className="p-4">
            <h3 className="font-bold text-base mb-3 flex items-center gap-2" style={{ color: '#22c55e' }}>
              <span className="text-xl">📞</span> {labels.emergencyContacts}
            </h3>
            <div className="space-y-2">
              {contacts.map(contact => (
                <a 
                  key={contact.id} 
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-between p-3 rounded-xl transition-all active:scale-98"
                  style={{
                    background: 'rgba(255,140,0,0.05)',
                    border: '1px solid rgba(255,140,0,0.15)'
                  }}
                >
                  <div>
                    <p className="font-bold text-white text-sm">{contact.name}</p>
                    <p className="text-gray-400 text-xs">{contact.relation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">{contact.phone}</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                    }}>
                      <Phone size={18} className="text-white" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 text-center" style={{ borderTop: '1px solid rgba(255,140,0,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,140,0,0.5)' }}>SOS Click • {labels.patientCard}</p>
          </div>
        </div>

        {/* Emergency Call Button */}
        <div className="mx-4 mt-4">
          <button
            onClick={() => window.location.href = 'tel:101'}
            className="w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #FF8C00 0%, #e67e00 100%)',
              boxShadow: '0 0 30px rgba(255,140,0,0.4)',
              color: '#0d1829'
            }}
          >
            <Phone size={22} />
            {language === 'he' ? 'חייג 101 עכשיו' : 'Call 101 Now'}
          </button>
        </div>
      </div>
    );
  };

  const EditProfileScreen = () => {
    const [formData, setFormData] = useState(profile);

    const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
      setProfile(formData);
      navigateTo('profile');
    };

    const inputStyle = {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,140,0,0.3)',
      color: 'white'
    };

    return (
      <div className="min-h-screen p-4 sm:p-6" style={{ 
        direction: language === 'he' ? 'rtl' : 'ltr',
        background: '#0d1829'
      }}>
        <button onClick={() => navigateTo('profile')} className="mb-4 sm:mb-6 flex items-center gap-2 transition-all" style={{ color: '#FF8C00' }}>
          <ChevronRight className={language === 'he' ? '' : 'rotate-180'} size={20} />
          <span className="text-sm sm:text-base">{t.back}</span>
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: '#FF8C00' }}>{t.editProfile}</h1>

        <div className="rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6" style={{
          background: 'rgba(255,140,0,0.03)',
          border: '1px solid rgba(255,140,0,0.2)'
        }}>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">{t.personalInfo}</h3>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{
              background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)',
              boxShadow: '0 0 20px rgba(255,140,0,0.4)'
            }}>
              <Camera size={28} className="sm:w-8 sm:h-8" style={{ color: '#0a1628' }} />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t.fullName}
              className="w-full p-3 text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder={t.yearsOld}
              className="w-full p-3 text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6" style={{
          background: 'rgba(255,140,0,0.03)',
          border: '1px solid rgba(255,140,0,0.2)'
        }}>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">{t.medicalInfo}</h3>
          
          <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
              value={formData.bloodType}
              onChange={(e) => handleChange('bloodType', e.target.value)}
              placeholder={t.bloodType}
              className="w-full p-3 text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <input
              type="text"
              value={formData.chronicDiseases}
              onChange={(e) => handleChange('chronicDiseases', e.target.value)}
              placeholder={t.chronicDiseases}
              className="w-full p-3 text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <input
              type="text"
              value={formData.allergies}
              onChange={(e) => handleChange('allergies', e.target.value)}
              placeholder={t.allergies}
              className="w-full p-3 text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
            <input
              type="text"
              value={formData.medications}
              onChange={(e) => handleChange('medications', e.target.value)}
              placeholder={t.medications}
              className="w-full p-3 text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <button onClick={handleSave} className="flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base" style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            boxShadow: '0 0 20px rgba(34,197,94,0.3)',
            color: 'white'
          }}>
            <Save size={18} className="sm:w-5 sm:h-5" />
            {t.save}
          </button>
          <button onClick={() => navigateTo('profile')} className="flex-1 py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base" style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white'
          }}>
            <X size={18} className="sm:w-5 sm:h-5" />
            {t.cancel}
          </button>
        </div>
      </div>
    );
  };

  const ContactsScreen = () => {
    const deleteContact = (id) => {
      setContacts(contacts.filter(c => c.id !== id));
    };

    const addContact = () => {
      const newContact = {
        id: Date.now(),
        name: language === 'he' ? 'איש קשר חדש' : 'New Contact',
        relation: language === 'he' ? 'קרבה' : 'Relation',
        phone: '050-0000000'
      };
      setContacts([...contacts, newContact]);
    };

    return (
      <div className="min-h-screen p-4 sm:p-6 pb-24" style={{ 
        direction: language === 'he' ? 'rtl' : 'ltr',
        background: '#0d1829'
      }}>
        <button onClick={() => navigateTo('home')} className="mb-4 sm:mb-6 flex items-center gap-2 transition-all" style={{ color: '#FF8C00' }}>
          <ChevronRight className={language === 'he' ? '' : 'rotate-180'} size={20} />
          <span className="text-sm sm:text-base">{t.back}</span>
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center" style={{ color: '#FF8C00' }}>{t.manageContacts}</h1>

        <div className="space-y-3 sm:space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="rounded-2xl p-3 sm:p-4 flex items-center justify-between" style={{
              background: 'rgba(255,140,0,0.03)',
              border: '1px solid rgba(255,140,0,0.2)'
            }}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)'
                }}>
                  <span className="text-base sm:text-lg font-bold" style={{ color: '#0a1628' }}>
                    {contact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-lg text-white">{contact.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{contact.relation}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${contact.phone}`} className="p-2 sm:p-3 rounded-full" style={{
                  background: 'rgba(59,130,246,0.2)',
                  border: '1px solid rgba(59,130,246,0.3)'
                }}>
                  <Phone size={16} className="sm:w-5 sm:h-5" style={{ color: '#3b82f6' }} />
                </a>
                <button onClick={() => deleteContact(contact.id)} className="p-2 sm:p-3 rounded-full" style={{
                  background: 'rgba(220,38,38,0.2)',
                  border: '1px solid rgba(220,38,38,0.3)'
                }}>
                  <Trash2 size={16} className="sm:w-5 sm:h-5" style={{ color: '#dc2626' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addContact} className="fixed bottom-20 left-1/2 transform -translate-x-1/2 px-5 py-3 sm:px-6 sm:py-4 rounded-full shadow-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-bold" style={{
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)',
          boxShadow: '0 0 30px rgba(255,140,0,0.4)',
          color: '#0a1628'
        }}>
          <Plus size={20} className="sm:w-6 sm:h-6" />
          <span>{t.add}</span>
        </button>
      </div>
    );
  };

  const LanguageScreen = () => {
    const langs = [
      { code: 'he', name: 'עברית' },
      { code: 'en', name: 'English' }
    ];

    return (
      <div className="min-h-screen p-4 sm:p-6" style={{ 
        direction: language === 'he' ? 'rtl' : 'ltr',
        background: '#0d1829'
      }}>
        <button onClick={() => navigateTo('home')} className="mb-4 sm:mb-6 flex items-center gap-2 transition-all" style={{ color: '#FF8C00' }}>
          <ChevronRight className={language === 'he' ? '' : 'rotate-180'} size={20} />
          <span className="text-sm sm:text-base">{t.back}</span>
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" style={{ color: '#FF8C00' }}>{t.languages}</h1>

        <div className="space-y-3 sm:space-y-4">
          {langs.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSettings({ ...settings, language: lang.code });
                setTimeout(() => navigateTo('home'), 300);
              }}
              className="w-full rounded-2xl p-5 sm:p-6 flex items-center justify-between transition-all"
              style={{
                background: 'rgba(255,140,0,0.03)',
                border: language === lang.code ? '2px solid #FF8C00' : '1px solid rgba(255,140,0,0.2)',
                boxShadow: language === lang.code ? '0 0 20px rgba(255,140,0,0.3)' : 'none'
              }}
            >
              <span className="text-xl sm:text-2xl font-medium text-white">{lang.name}</span>
              {language === lang.code && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)'
                }}>
                  <Check size={20} className="sm:w-6 sm:h-6" style={{ color: '#0a1628' }} />
                </div>
              )}
              {language !== lang.code && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 rounded-full" style={{ borderColor: 'rgba(255,140,0,0.3)' }}></div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const SettingsScreen = () => {
    const ToggleSwitch = ({ enabled, onToggle }) => (
      <button onClick={onToggle} className="relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors" style={{
        background: enabled ? 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)' : 'rgba(255,255,255,0.2)'
      }}>
        <div className={`absolute top-0.5 sm:top-1 w-6 h-6 rounded-full shadow transition-transform ${enabled ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5 sm:translate-x-1'}`} style={{
          background: enabled ? '#0a1628' : 'white'
        }} />
      </button>
    );

    const SettingRow = ({ label, settingKey }) => (
      <div className="flex items-center justify-between p-3 sm:p-4 last:border-b-0" style={{ borderBottom: '1px solid rgba(255,140,0,0.1)' }}>
        <span className="text-sm sm:text-lg font-medium text-white">{label}</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm" style={{ color: settings[settingKey] ? '#FF8C00' : '#6b7280' }}>{settings[settingKey] ? 'on' : 'off'}</span>
          <ToggleSwitch enabled={settings[settingKey]} onToggle={() => setSettings({ ...settings, [settingKey]: !settings[settingKey] })} />
        </div>
      </div>
    );

    return (
      <div className="min-h-screen p-4 sm:p-6" style={{ 
        direction: language === 'he' ? 'rtl' : 'ltr',
        background: '#0d1829'
      }}>
        <button onClick={() => navigateTo('home')} className="mb-4 sm:mb-6 flex items-center gap-2 transition-all" style={{ color: '#FF8C00' }}>
          <ChevronRight className={language === 'he' ? '' : 'rotate-180'} size={20} />
          <span className="text-sm sm:text-base">{t.back}</span>
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center" style={{ color: '#FF8C00' }}>{t.advancedSettings}</h1>

        <div className="rounded-3xl overflow-hidden mb-4 sm:mb-6" style={{
          background: 'rgba(255,140,0,0.03)',
          border: '1px solid rgba(255,140,0,0.2)'
        }}>
          <SettingRow label={t.autoLocationSharing} settingKey="autoLocationSharing" />
          <SettingRow label={t.accessibilityMode} settingKey="accessibilityMode" />
          <SettingRow label={t.notifications} settingKey="notifications" />
          <SettingRow label={t.darkMode} settingKey="darkMode" />
          <SettingRow label={t.dataUsageLimit} settingKey="dataUsageLimit" />
          <SettingRow label={t.offlineAccess} settingKey="offlineAccess" />
        </div>

        <button onClick={() => navigateTo('home')} className="w-full py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base" style={{
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B00 100%)',
          boxShadow: '0 0 20px rgba(255,140,0,0.3)',
          color: '#0a1628'
        }}>
          {t.saveChanges}
        </button>
      </div>
    );
  };

  const HelpScreen = () => (
    <div className="min-h-screen p-4 sm:p-6" style={{ 
      direction: language === 'he' ? 'rtl' : 'ltr',
      background: '#0d1829'
    }}>
      <button onClick={() => navigateTo('home')} className="mb-4 sm:mb-6 flex items-center gap-2 transition-all" style={{ color: '#FF8C00' }}>
        <ChevronRight className={language === 'he' ? '' : 'rotate-180'} size={20} />
        <span className="text-sm sm:text-base">{t.back}</span>
      </button>
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center" style={{ color: '#FF8C00' }}>{t.helpAbout}</h1>
      
      <div className="rounded-3xl p-4 sm:p-6" style={{
        background: 'rgba(255,140,0,0.03)',
        border: '1px solid rgba(255,140,0,0.2)'
      }}>
        <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-gray-300">
          {language === 'he' 
            ? 'SOS Click מספקת גישה מהירה למידע חיוני במצבי חירום. היא מעוצבת להיות ידידותית למשתמש ואמינה.'
            : 'SOS Click provides quick access to essential emergency information. It is designed to be user-friendly and reliable.'}
        </p>
        
        <div className="text-center text-xs sm:text-sm pt-4 sm:pt-6" style={{ borderTop: '1px solid rgba(255,140,0,0.2)' }}>
          <p className="font-semibold" style={{ color: '#FF8C00' }}>Version 1.0.0</p>
          <p className="mt-2 text-gray-400">© 2025 SOS Click</p>
          <p className="mt-3 font-medium" style={{ color: '#22c55e' }}>✅ Database: Active</p>
        </div>
      </div>
    </div>
  );

  // Premium Payment Screen
  const PremiumScreen = () => {
    const features = language === 'he' ? [
      { icon: '👥', title: 'אנשי קשר ללא הגבלה', desc: 'הוסף כמה אנשי קשר לחירום שתרצה' },
      { icon: '🎨', title: 'טפט מותאם אישית', desc: 'צור טפט עם QR Code בפינה' },
      { icon: '🖨️', title: 'כרטיס להדפסה', desc: 'הדפס QR להדבקה על הטלפון' },
      { icon: '📋', title: 'היסטוריה רפואית', desc: 'שמור היסטוריה רפואית מלאה' },
      { icon: '☁️', title: 'גיבוי בענן', desc: 'המידע שלך מגובה ומאובטח' },
      { icon: '🚫', title: 'ללא פרסומות', desc: 'חוויה נקייה לחלוטין' }
    ] : [
      { icon: '👥', title: 'Unlimited Contacts', desc: 'Add as many emergency contacts as you need' },
      { icon: '🎨', title: 'Custom Wallpaper', desc: 'Create wallpaper with QR Code in corner' },
      { icon: '🖨️', title: 'Printable Card', desc: 'Print QR to stick on your phone' },
      { icon: '📋', title: 'Medical History', desc: 'Save complete medical history' },
      { icon: '☁️', title: 'Cloud Backup', desc: 'Your data is backed up and secure' },
      { icon: '🚫', title: 'No Ads', desc: 'Completely clean experience' }
    ];

    const handleBitPayment = () => {
      // Bit payment link - replace with your actual Bit link
      window.open('https://www.bitpay.co.il/app/sosclick', '_blank');
    };

    return (
      <div style={{ 
        direction: language === 'he' ? 'rtl' : 'ltr',
        background: '#0d1829',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ padding: '16px 20px' }}>
          <button 
            onClick={() => navigateTo('home')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#CD7F32',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <ChevronRight className={language === 'he' ? '' : 'rotate-180'} size={20} />
            <span>{t.back}</span>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '0 20px', overflow: 'auto' }}>
          {/* Premium Badge */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              background: 'linear-gradient(145deg, #CD7F32 0%, #B8860B 50%, #DAA520 100%)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(205,127,50,0.5)',
              margin: '0 auto 16px'
            }}>
              <span style={{ fontSize: '40px' }}>👑</span>
            </div>
            <h1 style={{ 
              color: '#CD7F32', 
              fontSize: '28px', 
              fontWeight: 900,
              marginBottom: '8px',
              textShadow: '0 0 20px rgba(205,127,50,0.3)'
            }}>
              {language === 'he' ? 'SOS Click Premium' : 'SOS Click Premium'}
            </h1>
            <p style={{ color: 'rgba(205,127,50,0.7)', fontSize: '14px' }}>
              {language === 'he' ? 'שדרג את ההגנה שלך' : 'Upgrade your protection'}
            </p>
          </div>

          {/* Features */}
          <div style={{ marginBottom: '24px' }}>
            {features.map((feature, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                marginBottom: '8px',
                background: 'rgba(205,127,50,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(205,127,50,0.2)'
              }}>
                <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                <div>
                  <p style={{ color: '#CD7F32', fontWeight: 700, fontSize: '14px' }}>{feature.title}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(205,127,50,0.1) 0%, rgba(184,134,11,0.05) 100%)',
            borderRadius: '20px',
            border: '2px solid rgba(205,127,50,0.3)',
            marginBottom: '20px'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>
              {language === 'he' ? 'מחיר חד פעמי' : 'One-time payment'}
            </p>
            <p style={{ 
              color: '#DAA520', 
              fontSize: '48px', 
              fontWeight: 900,
              textShadow: '0 0 20px rgba(218,165,32,0.4)'
            }}>
              {language === 'he' ? '₪9.90' : '$2.90'}
            </p>
            <p style={{ color: 'rgba(205,127,50,0.7)', fontSize: '12px' }}>
              {language === 'he' ? 'לכל החיים • ללא מנוי' : 'Lifetime • No subscription'}
            </p>
          </div>
        </div>

        {/* Payment Button */}
        <div style={{ 
          padding: '20px',
          paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
          background: 'linear-gradient(to top, rgba(205,127,50,0.1) 0%, transparent 100%)'
        }}>
          <button
            onClick={handleBitPayment}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '16px',
              fontWeight: 800,
              fontSize: '18px',
              background: 'linear-gradient(145deg, #CD7F32 0%, #B8860B 50%, #DAA520 100%)',
              boxShadow: '0 0 30px rgba(205,127,50,0.5), inset 0 2px 4px rgba(255,255,255,0.3)',
              color: '#0d1829',
              border: '2px solid rgba(218,165,32,0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <span>💳</span>
            {language === 'he' ? 'שלם עכשיו עם Bit' : 'Pay Now with Bit'}
          </button>
          
          <p style={{ 
            textAlign: 'center', 
            color: 'rgba(205,127,50,0.5)', 
            fontSize: '11px',
            marginTop: '12px'
          }}>
            {language === 'he' 
              ? 'התשלום מאובטח • אישור מיידי' 
              : 'Secure payment • Instant activation'}
          </p>
        </div>
      </div>
    );
  };

  const MenuScreen = () => {
    const MenuButton = ({ icon, text, onClick }) => (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          border: '1px solid rgba(255,140,0,0.2)'
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span style={{ color: '#FF8C00' }}>{icon}</span>
          <span className="text-base sm:text-lg font-medium text-white">{text}</span>
        </div>
        <ChevronRight size={20} className={language === 'he' ? 'rotate-180' : ''} style={{ color: '#FF8C00' }} />
      </button>
    );

    return (
      <div className="fixed inset-0 z-50 p-4 sm:p-6" style={{ 
        direction: language === 'he' ? 'rtl' : 'ltr',
        background: '#0d1829'
      }}>
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#FF8C00' }}>SOS Click</h1>
          <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full transition-all" style={{
            background: 'rgba(255,140,0,0.1)',
            border: '1px solid rgba(255,140,0,0.3)'
          }}>
            <X size={24} style={{ color: '#FF8C00' }} />
          </button>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          <MenuButton icon={<User size={20} />} text={t.editProfile} onClick={() => navigateTo('edit-profile')} />
          <MenuButton icon={<Phone size={20} />} text={t.manageContacts} onClick={() => navigateTo('contacts')} />
          <MenuButton icon={<Globe size={20} />} text={t.languages} onClick={() => navigateTo('languages')} />
          <MenuButton icon={<Settings size={20} />} text={t.advancedSettings} onClick={() => navigateTo('settings')} />
          <MenuButton icon={<HelpCircle size={20} />} text={t.helpAbout} onClick={() => navigateTo('help')} />
          
          {/* Premium Button */}
          {!isPremium && (
            <button
              onClick={() => navigateTo('premium')}
              className="w-full flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all mt-4"
              style={{
                background: 'linear-gradient(135deg, rgba(205,127,50,0.2) 0%, rgba(184,134,11,0.1) 100%)',
                border: '2px solid rgba(205,127,50,0.4)',
                boxShadow: '0 0 20px rgba(205,127,50,0.2)'
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span style={{ fontSize: '20px' }}>👑</span>
                <span className="text-base sm:text-lg font-bold" style={{ color: '#CD7F32' }}>
                  {language === 'he' ? 'שדרג לPremium' : 'Upgrade to Premium'}
                </span>
              </div>
              <ChevronRight size={20} className={language === 'he' ? 'rotate-180' : ''} style={{ color: '#CD7F32' }} />
            </button>
          )}
          
          {/* Logout Button */}
          <button
            onClick={() => {
              if (window.confirm(language === 'he' ? 'האם אתה בטוח שברצונך להתנתק?' : 'Are you sure you want to logout?')) {
                setOnboardingComplete(false);
                setCurrentScreen('onboarding');
                setOnboardingStep(0);
                setMenuOpen(false);
              }
            }}
            className="w-full flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all mt-4"
            style={{
              background: 'rgba(255,140,0,0.05)',
              border: '1px solid rgba(255,140,0,0.2)'
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <LogOut size={20} style={{ color: '#FF8C00' }} />
              <span className="text-base sm:text-lg font-medium text-white">
                {language === 'he' ? 'התנתקות' : 'Logout'}
              </span>
            </div>
          </button>
          
          {/* Delete Account Button */}
          <button
            onClick={() => {
              if (window.confirm(language === 'he' 
                ? 'האם אתה בטוח שברצונך למחוק את החשבון? כל המידע יימחק לצמיתות!' 
                : 'Are you sure you want to delete your account? All data will be permanently deleted!')) {
                // Clear all localStorage
                localStorage.removeItem('sos_onboarding_complete');
                localStorage.removeItem('sos_profile');
                localStorage.removeItem('sos_contacts');
                localStorage.removeItem('sos_settings');
                localStorage.removeItem('sos_premium');
                localStorage.removeItem('sos_profile_image');
                // Reset state
                setProfile({ name: '', age: '', bloodType: '', chronicDiseases: '', allergies: '', medications: '' });
                setContacts([]);
                setOnboardingComplete(false);
                setCurrentScreen('onboarding');
                setOnboardingStep(0);
                setMenuOpen(false);
              }
            }}
            className="w-full flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all mt-2"
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)'
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <Trash2 size={20} style={{ color: '#ef4444' }} />
              <span className="text-base sm:text-lg font-medium" style={{ color: '#ef4444' }}>
                {language === 'he' ? 'מחיקת חשבון' : 'Delete Account'}
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding': return <OnboardingScreen />;
      case 'home': return <HomeScreen />;
      case 'profile': return <ProfileScreen />;
      case 'edit-profile': return <EditProfileScreen />;
      case 'contacts': return <ContactsScreen />;
      case 'languages': return <LanguageScreen />;
      case 'settings': return <SettingsScreen />;
      case 'help': return <HelpScreen />;
      case 'premium': return <PremiumScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div style={{ 
      background: '#0d1829', 
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      direction: 'ltr'
    }}>
      {/* Mobile Container - Centered */}
      <div style={{
        width: '100%',
        maxWidth: '448px',
        minHeight: '100vh',
        position: 'relative',
        background: '#0d1829',
        boxShadow: '0 0 60px rgba(255,140,0,0.15)',
        margin: '0 auto'
      }}>
        {menuOpen && <MenuScreen />}
        {renderScreen()}
        
        {!menuOpen && !['onboarding', 'edit-profile', 'contacts', 'languages', 'settings', 'help'].includes(currentScreen) && (
          <nav style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '448px',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '12px 24px',
            background: 'linear-gradient(180deg, rgba(10,22,40,0.95) 0%, #0a1628 100%)',
            borderTop: '1px solid rgba(255,140,0,0.2)',
            backdropFilter: 'blur(10px)',
            zIndex: 40
          }}>
            <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Phone size={22} style={{ color: currentScreen === 'home' ? '#FF8C00' : '#4a5568' }} />
            </button>
            <button onClick={() => setCurrentScreen('profile')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <User size={22} style={{ color: currentScreen === 'profile' ? '#FF8C00' : '#4a5568' }} />
            </button>
            <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Settings size={22} style={{ color: '#4a5568' }} />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}

export default App;