import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AppLayout } from './components/layout/AppLayout';
import { IntroExperience } from './components/ui/IntroExperience';
import { CustomCursor } from './components/ui/CustomCursor';
import { PageTransition } from './components/layout/PageTransition';

import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { RobotDetail } from './pages/RobotDetail';
import { SavedRobots } from './pages/SavedRobots';
import { Compare } from './pages/Compare';
import { Matching } from './pages/Matching';
import { Dashboard } from './pages/Dashboard';
import { Inquiry } from './pages/Inquiry';
import { NotFound } from './pages/NotFound';
import { Manufacturers } from './pages/Manufacturers';
import { About } from './pages/About';
import { Resources } from './pages/Resources';

function App() {
  const location = useLocation();

  return (
    <>
      <IntroExperience />
      <CustomCursor />
      <Toaster 
        position="bottom-right" 
        toastOptions={{ 
          style: { background: '#0B1120', color: '#fff', border: '1px solid #1E293B', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } }
        }} 
      />
      
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="marketplace" element={<PageTransition><Marketplace /></PageTransition>} />
          <Route path="robot/:id" element={<PageTransition><RobotDetail /></PageTransition>} />
          <Route path="saved" element={<PageTransition><SavedRobots /></PageTransition>} />
          <Route path="compare" element={<PageTransition><Compare /></PageTransition>} />
          <Route path="matching" element={<PageTransition><Matching /></PageTransition>} />
          <Route path="dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="inquiry" element={<PageTransition><Inquiry /></PageTransition>} />
          <Route path="manufacturers" element={<PageTransition><Manufacturers /></PageTransition>} />
          <Route path="about" element={<PageTransition><About /></PageTransition>} />
          <Route path="resources" element={<PageTransition><Resources /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
