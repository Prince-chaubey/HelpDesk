import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 w-full max-w-4xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome to HelpDesk Mini!</h1>
        <p className="text-gray-100">
          This is your dashboard. Track tickets, comments, and manage your projects easily.
        </p>
      </div>

     
<div className="bg-gray-800 rounded-2xl p-8 w-full max-w-4xl shadow-lg">
  <h2 className="text-2xl font-semibold mb-4 text-white">About HelpDesk Mini</h2>
  <p className="text-gray-300 mb-2">
    HelpDesk Mini is a sleek and efficient ticketing system designed to streamline issue tracking and team collaboration. 
    It allows users to submit, manage, and monitor support tickets, ensuring that problems are resolved quickly and transparently.
  </p>
  <p className="text-gray-300 mb-2">
    Teams can communicate seamlessly through ticket comments, assign responsibilities, and prioritize tasks, 
    making project management more organized and effective.
  </p>

</div>


<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
    <p className="text-gray-400 mb-2">Open Tickets</p>
    <p className="text-2xl font-bold text-indigo-400">12</p>
    <p className="text-sm text-gray-500 mt-1">High: 3 | Medium: 5 | Low: 4</p>
  </div>

  <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
    <p className="text-gray-400 mb-2">Closed Tickets</p>
    <p className="text-2xl font-bold text-green-400">37</p>
    <p className="text-sm text-gray-500 mt-1">Resolved this week: 8</p>
  </div>

  <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
    <p className="text-gray-400 mb-2">Total Comments</p>
    <p className="text-2xl font-bold text-yellow-400">48</p>
    <p className="text-sm text-gray-500 mt-1">Pending review: 5</p>
  </div>
</div>
    </div>
  );
};

export default HomePage;
