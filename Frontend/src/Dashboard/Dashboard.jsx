import React, { useState, useEffect } from "react";
import API from "../api";

// Ticket Card Component
const TicketCard = ({ ticket, openDetails }) => {
  const statusColor = {
    Open: "bg-green-500",
    "In Progress": "bg-blue-500",
    Closed: "bg-gray-500",
    Overdue: "bg-red-500",
  };

  return (
    <div
      className="bg-gray-800/70 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-lg 
      p-5 cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition duration-300"
      onClick={() => openDetails(ticket)}
    >
      <h3 className="text-xl font-semibold text-white mb-1">{ticket.title}</h3>
      <p className="text-gray-300 mb-3 line-clamp-2">{ticket.description}</p>
      <p className="flex justify-between items-center text-sm text-gray-400">
        <span>
          Priority:{" "}
          <b
            className={`${
              ticket.priority === "High"
                ? "text-red-400"
                : ticket.priority === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {ticket.priority}
          </b>
        </span>
        <span
          className={`px-3 py-1 rounded-full text-white ${
            statusColor[ticket.status]
          } font-medium text-xs`}
        >
          {ticket.status}
        </span>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Due: {new Date(ticket.dueDate).toLocaleString()}
      </p>
    </div>
  );
};

// Ticket Details Modal Component
const TicketDetailsModal = ({ ticket, closeModal }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await API.get(`/tickets/${ticket._id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [ticket._id]);

  const addComment = async () => {
    if (!text) return;
    try {
      const res = await API.post(`/tickets/${ticket._id}/comments`, { text });
      setComments([...comments, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-gray-900/95 border border-gray-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-gray-100">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-2 text-white">{ticket.title}</h2>
        <p className="mb-2 text-gray-300">{ticket.description}</p>
        <p className="mb-2 text-sm">
          Priority:{" "}
          <b
            className={`${
              ticket.priority === "High"
                ? "text-red-400"
                : ticket.priority === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {ticket.priority}
          </b>{" "}
          | Status:{" "}
          <span className="px-2 py-1 rounded-full bg-indigo-600 text-white text-xs">
            {ticket.status}
          </span>
        </p>
        <p className="mb-4 text-xs text-gray-500">
          Due: {new Date(ticket.dueDate).toLocaleString()}
        </p>

        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-white text-lg">Comments</h3>
          <div className="max-h-44 overflow-y-auto border-t border-b border-gray-700 py-2 mb-2 pr-2 custom-scrollbar">
            {comments.map((c) => (
              <div key={c._id} className="mb-3 border-b border-gray-700 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-indigo-400">
                    {c.userId.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-300">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="flex mt-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={addComment}
              className="bg-indigo-600 hover:bg-indigo-500 px-5 rounded-r-lg font-semibold text-white transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Page
export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get("/tickets");
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center tracking-wide">
        🎫 Ticket Dashboard
      </h1>
      {tickets.length === 0 ? (
        <p className="text-gray-400 text-center mt-20 text-lg">
          No tickets available yet...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((t) => (
            <TicketCard key={t._id} ticket={t} openDetails={setSelectedTicket} />
          ))}
        </div>
      )}

      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          closeModal={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
