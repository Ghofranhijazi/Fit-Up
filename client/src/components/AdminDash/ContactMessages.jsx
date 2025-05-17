import React, { useEffect, useState } from 'react';
import { Mail, User, Clock, Loader2, RefreshCw } from 'lucide-react';

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/contact/allcontact');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
    {/* Header & Refresh */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Contact Messages</h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">View all customer inquiries</p>
      </div>
      <button
        onClick={fetchMessages}
        disabled={loading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-xs hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-sm sm:text-base"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        Refresh
      </button>
    </div>

    {/* Loading */}
    {loading ? (
      <div className="flex justify-center items-center h-48 sm:h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    ) : messages.length === 0 ? (
      <div className="bg-slate-50 rounded-lg p-6 sm:p-8 text-center border border-slate-200">
        <Mail className="mx-auto h-10 w-10 text-slate-400" />
        <h3 className="mt-3 text-lg font-medium text-slate-700">No messages yet</h3>
        <p className="text-sm text-slate-500 mt-1">Customer messages will appear here</p>
      </div>
    ) : (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow">
        {/* Desktop Table Header */}
        <div className="hidden sm:grid grid-cols-12 bg-slate-50 p-4 border-b border-slate-200">
          <div className="col-span-3 font-medium text-sm text-slate-600">Sender</div>
          <div className="col-span-2 font-medium text-sm text-slate-600">Email</div>
          <div className="col-span-3 font-medium text-sm text-slate-600">Subject</div>
          <div className="col-span-3 font-medium text-sm text-slate-600">Message</div>
          <div className="col-span-1 font-medium text-sm text-slate-600">Date</div>
        </div>

        <div className="divide-y divide-slate-100">
          {messages.map((msg) => (
            <div key={msg.id} className="grid grid-cols-1 sm:grid-cols-12 gap-y-3 sm:gap-0 p-4 hover:bg-slate-50 transition-colors">
              {/* Mobile Layout */}
           <div className="sm:hidden space-y-2">
  <div className="flex items-start gap-2">
    <div className="bg-blue-100 p-1.5 rounded-full">
      <User className="h-4 w-4 text-blue-600" />
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-800 whitespace-pre-wrap break-words">{msg.name}</p>
      <p className="text-xs text-slate-500 whitespace-pre-wrap break-words">{msg.email}</p>
    </div>
  </div>
  <div className="text-sm text-slate-700 whitespace-pre-wrap break-words">
    <strong>Subject:</strong> {msg.subject}
  </div>
  <div className="text-sm text-slate-600 whitespace-pre-wrap break-words">
    <strong>Message:</strong> {msg.message}
  </div>
  <div className="flex items-center text-xs text-slate-400">
    <Clock className="h-3 w-3 mr-1" />
    {formatDate(msg.createdAt)}
  </div>
</div>


              {/* Desktop Layout */}
              <div className="hidden sm:flex col-span-3 items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-slate-800 truncate whitespace-pre-wrap break-words">{msg.name}</span>
              </div>
              <div className="hidden sm:flex col-span-2 items-center text-slate-600 text-sm truncate whitespace-pre-wrap break-words">
                {msg.email}
              </div>
              <div className="hidden sm:flex col-span-3 items-center text-slate-700 text-sm truncate whitespace-pre-wrap break-words ml-3">
                {msg.subject}
              </div>
              <div className="hidden sm:flex col-span-3 items-center text-slate-600 text-sm truncate whitespace-pre-wrap break-words">
                {msg.message}
              </div>
              <div className="hidden sm:flex col-span-1 items-center text-slate-400 text-xs whitespace-pre-wrap break-words">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(msg.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

}