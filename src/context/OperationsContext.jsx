import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { incidents as seedIncidents, volunteers as seedVolunteers } from '../data/mockData';

const Ctx = createContext(null);
export const useOperations = () => useContext(Ctx);

export function OperationsProvider({ children }) {
  const [incidents, setIncidents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Listen to Incidents
    const qIncidents = query(collection(db, 'incidents'), orderBy('createdAt', 'desc'));
    const unsubIncidents = onSnapshot(qIncidents, (snapshot) => {
      // Fallback: If empty, we can just set local state to seed (or write to DB)
      // Since order is by createdAt, writing without it might be tricky. We'll just read.
      if (snapshot.empty) {
        setIncidents(seedIncidents); // fallback to local mock if DB is empty
      } else {
        setIncidents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    });

    // Listen to Volunteers
    const unsubVolunteers = onSnapshot(collection(db, 'volunteers'), (snapshot) => {
      if (snapshot.empty) {
        setVolunteers(seedVolunteers); // fallback to local mock if DB is empty
      } else {
        setVolunteers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    });

    // Listen to Assignments
    const qAssignments = query(collection(db, 'assignments'), orderBy('createdAt', 'desc'));
    const unsubAssignments = onSnapshot(qAssignments, (snapshot) => {
      setAssignments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Listen to Announcements
    const qAnnouncements = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const unsubAnnouncements = onSnapshot(qAnnouncements, (snapshot) => {
      setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubIncidents();
      unsubVolunteers();
      unsubAssignments();
      unsubAnnouncements();
    };
  }, []);

  /* Public API */
  const createIncident = async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'incidents'), {
        ...data,
        status: 'open',
        reporter: 'AI Assistant', // Could be dynamic
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: serverTimestamp()
      });
      return { success: true, incidentId: docRef.id, message: `Incident "${data.title}" created (${data.severity.toUpperCase()}) in ${data.zone}. Response team notified.` };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  const updateIncident = async (data) => {
    try {
      // If we are still using mock data (id is integer), skip firestore update
      if (typeof data.id === 'number') {
         return { success: true, message: `Incident #${data.id} updated (local mock)` };
      }
      const incidentRef = doc(db, 'incidents', data.id);
      await updateDoc(incidentRef, data);
      return { success: true, message: `Incident #${data.id} updated to status: ${data.status}` };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  const assignVolunteer = async (data) => {
    const available = volunteers.find(v => v.status !== 'active' || v.zone !== data.zone);
    const vol = available || volunteers[0];
    if (!vol) return { success: false, message: 'No volunteers available' };

    try {
      if (typeof vol.id === 'string') {
        const volRef = doc(db, 'volunteers', vol.id);
        await updateDoc(volRef, { zone: data.zone, status: 'active', task: data.task });
      }
      
      await addDoc(collection(db, 'assignments'), {
        ...data,
        volunteerId: vol.id,
        volunteerName: vol.name,
        time: new Date().toISOString(),
        createdAt: serverTimestamp()
      });

      return { success: true, message: `${vol.name} assigned to ${data.zone} — task: "${data.task}" (${data.priority || 'normal'} priority)` };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  const logAnnouncement = async (data) => {
    try {
      await addDoc(collection(db, 'announcements'), {
        ...data,
        time: new Date().toISOString(),
        createdAt: serverTimestamp()
      });
      return { success: true, message: `PA broadcast scheduled for ${data.target_zone} (${data.message_type})` };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  return (
    <Ctx.Provider value={{ incidents, volunteers, assignments, announcements, createIncident, updateIncident, assignVolunteer, logAnnouncement }}>
      {children}
    </Ctx.Provider>
  );
}
