"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { db, OperationType, handleFirestoreError } from "@/lib/firebase";
import { collection, getDocs, setDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";

interface Exam {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  status: "active" | "upcoming" | "closed";
  date: string;
  createdAt: number;
}

export default function ExamsDashboard() {
  const { user, isAdmin, loading, logOut } = useAuth();
  const router = useRouter();
  
  const [exams, setExams] = useState<Exam[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExam, setNewExam] = useState<Partial<Exam>>({
    status: "active",
  });
  const [saving, setSaving] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const [viewAsStudent, setViewAsStudent] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* Removed automatic redirect to prevent losing context on reload
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);
  */

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, "exams"), (snapshot) => {
        const fetchedExams: Exam[] = [];
        snapshot.forEach((doc) => {
          fetchedExams.push({ id: doc.id, ...doc.data() } as Exam);
        });
        setExams(fetchedExams.sort((a, b) => b.createdAt - a.createdAt));
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, "exams");
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleAddExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExam.title || !newExam.description || !newExam.questionsCount || !newExam.durationMinutes || !newExam.date) return;
    
    setSaving(true);
    try {
      const examId = Date.now().toString() + "-" + Math.floor(Math.random() * 1000);
      const examData = {
        title: newExam.title,
        description: newExam.description,
        questionsCount: Number(newExam.questionsCount),
        durationMinutes: Number(newExam.durationMinutes),
        status: newExam.status || "active",
        date: newExam.date,
        createdAt: Date.now()
      };
      await setDoc(doc(db, "exams", examId), examData);
      setShowAddModal(false);
      setNewExam({ status: "active" });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "exams");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;
    try {
      await deleteDoc(doc(db, "exams", id));
    } catch (error) {
       handleFirestoreError(error, OperationType.DELETE, `exams/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#299A8E] flex items-center justify-center font-bold">
        LOADING...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white text-[#299A8E] flex flex-col items-center justify-center p-8 text-center text-xl font-bold gap-6">
        <div>Please log in to view your dashboard.</div>
        <Link href="/login" className="px-8 py-3 bg-[#E27D22] text-white text-sm font-black rounded-full transition-transform hover:-translate-y-1 uppercase tracking-wide">
          Go to Login
        </Link>
      </div>
    );
  }

  const activeExamsCount = exams.filter(e => e.status === "active").length;
  const displayAsAdmin = isAdmin && !viewAsStudent;

  return (
    <div className="min-h-screen flex font-sans select-none bg-white text-[#299A8E]">
      <aside className="w-72 bg-white border-r border-[#299A8E]/10 flex flex-col p-8 fixed h-full z-10 hidden md:flex shadow-sm">
        <div className="mb-12">
          <Link
            href="/"
            className="text-xl font-bold tracking-widest text-[#299A8E] mb-1 block uppercase"
          >
            MUSLIM AFGHAN
          </Link>
          <div className="text-[10px] font-medium uppercase tracking-[0.3em] opacity-60">
            {displayAsAdmin ? "Admin Panel" : "Student Panel"}
          </div>
        </div>

        <nav className="space-y-6 flex-1">
          <div className="space-y-2">
            <Link
              href="/exams"
              className="block text-sm text-[#E27D22] font-bold py-3 px-4 bg-[#E27D22]/10 border-l-4 border-[#E27D22] rounded-r-lg"
            >
              My Profile
            </Link>
            <a
              href="#"
              className="block text-sm text-[#1E1E1E] opacity-70 hover:opacity-100 font-medium hover:bg-black/5 hover:text-[#299A8E] transition-colors py-3 px-4 rounded-lg"
            >
              Transcripts & Results
            </a>
            <a
              href="#"
              className="block text-sm text-[#1E1E1E] opacity-70 hover:opacity-100 font-medium hover:bg-black/5 hover:text-[#299A8E] transition-colors py-3 px-4 rounded-lg"
            >
              Active Courses
            </a>
            
            {isAdmin && (
              <div className="pt-6 mt-6 border-t border-black/5">
                <div className="text-xs font-bold text-[#299A8E] uppercase tracking-widest mb-3 px-4">Admin Controls</div>
                <button
                  onClick={() => setViewAsStudent(!viewAsStudent)}
                  className="w-full text-left block text-sm text-[#1E1E1E] font-bold hover:bg-[#299A8E]/10 text-[#299A8E] transition-colors py-3 px-4 rounded-lg mb-2"
                >
                  {viewAsStudent ? "Switch to Admin View" : "Preview as Student"}
                </button>
                {displayAsAdmin && (
                  <>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="w-full text-left block text-sm text-[#1E1E1E] font-bold hover:bg-[#299A8E]/10 text-[#299A8E] transition-colors py-3 px-4 rounded-lg"
                    >
                      + Add New Exam
                    </button>
                    <a
                      href="#"
                      className="block text-sm text-[#1E1E1E] font-bold hover:bg-[#299A8E]/10 text-[#299A8E] transition-colors py-3 px-4 rounded-lg"
                    >
                      Manage Users
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-black/5">
          <button
            onClick={logOut}
            className="text-sm text-red-600 opacity-90 hover:opacity-100 flex items-center gap-2 font-bold p-2 hover:bg-red-50 rounded-lg w-full transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col p-8 md:p-12 md:ml-72 relative">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black mb-2 tracking-tight text-[#299A8E] uppercase">
              Hello, {user.displayName || "User"}
            </h1>
            <p className="text-sm font-medium opacity-70 text-[#1E1E1E]">
              Welcome to your {displayAsAdmin ? "admin" : "student"} dashboard ({user.email})
            </p>
          </div>
          {currentTime && (
            <div className="text-xl font-black text-[#E27D22] font-sans tracking-tight bg-white px-4 py-2 rounded-xl border-2 border-[#299A8E]/20 shadow-[0_4px_12px_rgba(41,154,142,0.1)]">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </header>
        
        {displayAsAdmin && (
           <section className="bg-white rounded-3xl border-2 border-[#299A8E] p-8 shadow-xl shadow-black/5 mb-10">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-[#299A8E] tracking-wide uppercase">
                  Admin Overview
                </h2>
                <div className="text-xs px-3 py-1 font-bold bg-[#299A8E]/10 text-[#299A8E] rounded-full uppercase tracking-widest">
                  Admin Active
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-[#299A8E]/20 p-6 rounded-2xl flex flex-col">
                   <span className="text-3xl font-black text-[#E27D22]">{exams.length}</span>
                   <span className="text-sm font-bold opacity-60 uppercase tracking-wider mt-1 text-[#299A8E]">Total Exams</span>
                </div>
                <div className="bg-white border-2 border-[#299A8E]/20 p-6 rounded-2xl flex flex-col">
                   <span className="text-3xl font-black text-[#E27D22]">1</span>
                   <span className="text-sm font-bold opacity-60 uppercase tracking-wider mt-1 text-[#299A8E]">Registered Students</span>
                </div>
                <button onClick={() => setShowAddModal(true)} className="bg-[#299A8E] text-white p-6 rounded-2xl flex flex-col items-center justify-center hover:bg-[#207D73] transition-colors shadow-lg hover:shadow-xl">
                   <span className="text-lg font-black uppercase tracking-wide">+ Add Exam</span>
                </button>
             </div>
           </section>
        )}

        <div className="mt-12 text-center relative z-10 p-4 rounded-3xl bg-gradient-to-r from-[#299A8E]/5 to-[#E27D22]/5">
           <Link href="/" className="inline-block px-8 py-3 bg-white/40 backdrop-blur-md border border-[#299A8E]/30 text-[#299A8E] text-sm font-black rounded-full transition-all hover:bg-white/60 uppercase tracking-widest shadow-[0_4px_16px_rgba(41,154,142,0.1)]">
             ← Back to Home
           </Link>
        </div>

        {showAddModal && displayAsAdmin && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
               <h2 className="text-2xl font-black uppercase text-[#299A8E] mb-6 border-b pb-4">Create New Exam</h2>
               <form onSubmit={handleAddExam} className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Title</label>
                   <input required type="text" value={newExam.title || ""} onChange={e => setNewExam({...newExam, title: e.target.value})} className="w-full bg-white px-4 py-3 rounded-xl border-2 border-[#299A8E]/20 focus:outline-none focus:border-[#299A8E] text-[#299A8E]" placeholder="Math Midterm" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Description</label>
                   <textarea required value={newExam.description || ""} onChange={e => setNewExam({...newExam, description: e.target.value})} className="w-full bg-white px-4 py-3 rounded-xl border-2 border-[#299A8E]/20 focus:outline-none focus:border-[#299A8E] text-[#299A8E]" placeholder="Covering chapters 1-5" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Questions</label>
                     <input required type="number" value={newExam.questionsCount || ""} onChange={e => setNewExam({...newExam, questionsCount: parseInt(e.target.value)})} className="w-full bg-white px-4 py-3 rounded-xl border-2 border-[#299A8E]/20 focus:outline-none focus:border-[#299A8E] text-[#299A8E]" placeholder="50" min="1" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Duration (Min)</label>
                     <input required type="number" value={newExam.durationMinutes || ""} onChange={e => setNewExam({...newExam, durationMinutes: parseInt(e.target.value)})} className="w-full bg-white px-4 py-3 rounded-xl border-2 border-[#299A8E]/20 focus:outline-none focus:border-[#299A8E] text-[#299A8E]" placeholder="60" min="1" />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Status</label>
                     <select value={newExam.status || "active"} onChange={e => setNewExam({...newExam, status: e.target.value as any})} className="w-full bg-white px-4 py-3 rounded-xl border-2 border-[#299A8E]/20 focus:outline-none focus:border-[#299A8E] text-[#299A8E]">
                       <option value="active">Active</option>
                       <option value="upcoming">Upcoming</option>
                       <option value="closed">Closed</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Date</label>
                     <input required type="date" value={newExam.date || ""} onChange={e => setNewExam({...newExam, date: e.target.value})} className="w-full bg-white px-4 py-3 rounded-xl border-2 border-[#299A8E]/20 focus:outline-none focus:border-[#299A8E] text-[#299A8E]" />
                   </div>
                 </div>
                 
                 <div className="flex gap-4 pt-4">
                   <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 px-4 bg-black/5 text-[#1E1E1E] font-bold rounded-xl hover:bg-black/10 transition-colors uppercase">Cancel</button>
                   <button type="submit" disabled={saving} className="flex-1 py-3 px-4 bg-[#299A8E] text-white font-bold rounded-xl hover:bg-[#207D73] transition-colors uppercase disabled:opacity-50">
                     {saving ? "Saving..." : "Create Exam"}
                   </button>
                 </div>
               </form>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
