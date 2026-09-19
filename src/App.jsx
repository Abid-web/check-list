import { useState } from 'react';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="app-container">
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        username="Haithem"
      />
      
      <main className="main-content">
        <div className="header-section">
          <h1 className="display-title">Productivity Hub</h1>
          <p className="header-subtitle">Active View: {activeTab}</p>
        </div>

        {activeTab === 'Home' && (
          <div className="placeholder-card">
            <h2>Welcome to your Workspace</h2>
            <p>Select a view from the navigation menu above to manage your tasks, notes, or application settings.</p>
          </div>
        )}

        {activeTab === 'Tasks' && <TaskList />}

        {activeTab === 'Notes' && <NoteList />}

        {activeTab === 'Settings' && (
          <div className="placeholder-card">
            <h2>Application Settings</h2>
            <p>Customize your workspace theme and preference options here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
