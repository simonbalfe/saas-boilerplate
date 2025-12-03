"use client";

import React from 'react';

export const Themes = () => {
  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Themes & Components</h1>
          <p className="text-base-content/70">Theme preview and component showcase</p>
        </div>
        <div className="flex gap-2 items-center">
           <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-50 p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto">
              {themes.map((theme) => (
                <li key={theme}>
                  <input 
                    type="radio" 
                    name="theme-dropdown" 
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start" 
                    aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)} 
                    value={theme} 
                  />
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-primary">Primary Action</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats shadow w-full bg-base-100">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div className="stat-title">New Tasks</div>
          <div className="stat-value text-accent">86%</div>
          <div className="stat-desc text-accent">31 tasks remaining</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Content & Tables */}
        <div className="space-y-8">
          {/* Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card Title</h2>
              <p>A card component with a shadow and rounded corners. Great for displaying content blocks.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                <button className="btn btn-ghost">More Info</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: UI Elements */}
        <div className="space-y-8">
          {/* Buttons Grid */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Buttons & Brands</h2>
              <div className="flex flex-wrap gap-2">
                <button className="btn">Default</button>
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-info">Info</button>
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-error">Error</button>
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-link">Link</button>
                <button className="btn btn-outline btn-primary">Outline</button>
                <button className="btn btn-active btn-primary">Active</button>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Form Controls</h2>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Text Input</span>
                  <span className="label-text-alt">Top Right</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text">Select</span>
                </label>
                <select className="select select-bordered" defaultValue="Pick one">
                  <option disabled>Pick one</option>
                  <option>Star Wars</option>
                  <option>Harry Potter</option>
                  <option>Lord of the Rings</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Toggle</span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Checkbox</span>
                    <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                 <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Radio 1</span>
                    <input type="radio" name="radio-10" className="radio checked:bg-error" defaultChecked />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Radio 2</span>
                    <input type="radio" name="radio-10" className="radio checked:bg-info" defaultChecked />
                  </label>
                </div>
              </div>

               <div className="mt-4">
                <input type="range" min="0" max="100" defaultValue="40" className="range range-primary" />
              </div>
            </div>
          </div>

          {/* Alerts & Progress */}
           <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Feedback</h2>
              <div className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>New software update available.</span>
              </div>
              <div className="alert alert-success mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Your purchase has been confirmed!</span>
              </div>
              
              <div className="flex flex-col gap-2 mt-4">
                 <progress className="progress progress-primary w-full" value="40" max="100"></progress>
                 <progress className="progress progress-secondary w-full" value="70" max="100"></progress>
                 <progress className="progress progress-accent w-full" value="100" max="100"></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

