import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FileText, TrendingUp, DollarSign, BarChart2, LogIn, LogOut, PlusCircle, Trash2, Edit } from 'lucide-react';
import { Box } from '@mui/material';
import { DashboardScreen } from './screens/Dashboard/DashboardScreen';
import { LedgerScreen } from './screens/Ledger/LedgerScreen';
import { ExpenseScreen } from './screens/Expenses/ExpenseScreen';
import { BankConnectionScreen } from './screens/BankConnection/BankConnectionScreen.jsx';
import { ForecastScreen } from './screens/Forecast/ForecastScreen';
import { AIAnalysisScreen } from './screens/AIAnalysis/AIAnalysisScreen.jsx';
import { DocumentationScreen } from './screens/Documentation/DocumentationScreen';
import { HelpScreen } from './screens/Help/HelpScreen';
import { LoginScreen } from './screens/Login/LoginScreen';
import { Sidebar } from './components/Sidebar/Sidebar';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCECHzviIjhyjo95ManCp6tr5UpRogxv8g",
  authDomain: "hitfluence-finance-ledger.firebaseapp.com",
  projectId: "hitfluence-finance-ledger",
  storageBucket: "hitfluence-finance-ledger.firebasestorage.app",
  messagingSenderId: "792395858143",
  appId: "1:792395858143:web:8f8ce63732844df5e2a96a",
  measurementId: "G-X40ZVNNHXZ"
};

// Firebase Initialization
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default function App() {
  const [user, setUser] = React.useState(null);
  const [loadingAuth, setLoadingAuth] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('dashboard');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  if (loadingAuth) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          backgroundColor: '#050624',
          color: 'white',
          fontSize: '24px',
          fontWeight: 800
        }}
      >
        Loading HitFinance...
      </Box>
    );
  }

  const renderPageContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen userId={user.uid} user={user} />;
      case 'ledger':
        return <LedgerScreen userId={user.uid} />;
      case 'expenses':
        return <ExpenseScreen userId={user.uid} />;
      case 'bank-connect':
        return <BankConnectionScreen userId={user.uid} />;
      case 'forecast':
        return <ForecastScreen userId={user.uid} />;
      case 'ai-analysis':
        return <AIAnalysisScreen userId={user.uid} />;
      case 'documentation':
        return <DocumentationScreen userId={user.uid} />;
      case 'help':
        return <HelpScreen userId={user.uid} />;
      default:
        return <DashboardScreen userId={user.uid} user={user} />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#050624",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
      }}
    >
      {user ? (
        <>
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            handleLogout={handleLogout} 
            user={user} 
          />
          <Box
            component="main"
            sx={{
              flex: 1,
              p: 4,
              backgroundColor: "#050624",
              overflow: "auto",
            }}
          >
            {renderPageContent()}
          </Box>
        </>
      ) : (
        <LoginScreen handleLogin={handleLogin} />
      )}
    </Box>
  );
}
