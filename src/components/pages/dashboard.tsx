"use client";

import React from 'react';

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Component Library</h1>
        <p className="text-base-content/70 mt-2">
          A collection of UI components styled with daisyUI and Tailwind CSS.
        </p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body space-y-6">
            
            {/* Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-base-content/60 uppercase tracking-wider">Brand Colors</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn">Default</button>
                <button className="btn btn-neutral">Neutral</button>
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-link">Link</button>
              </div>
            </div>

            {/* State Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-base-content/60 uppercase tracking-wider">State Colors</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-info">Info</button>
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-error">Error</button>
              </div>
            </div>

            {/* Outline */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-base-content/60 uppercase tracking-wider">Outline</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-outline">Default</button>
                <button className="btn btn-outline btn-primary">Primary</button>
                <button className="btn btn-outline btn-secondary">Secondary</button>
                <button className="btn btn-outline btn-accent">Accent</button>
              </div>
            </div>
            
            {/* Shapes */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-base-content/60 uppercase tracking-wider">Shapes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button className="btn btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button className="btn btn-wide">Wide Button</button>
                <button className="btn btn-block">Block Button</button>
              </div>
            </div>

            {/* States */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-base-content/60 uppercase tracking-wider">States</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">Active</button>
                <button className="btn btn-primary" disabled>Disabled</button>
                <button className="btn btn-primary">
                  <span className="loading loading-spinner"></span>
                  Loading
                </button>
                <button className="btn no-animation">No Animation</button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-base-content/60 uppercase tracking-wider">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="btn btn-lg btn-primary">Large</button>
                <button className="btn btn-md btn-primary">Normal</button>
                <button className="btn btn-sm btn-primary">Small</button>
                <button className="btn btn-xs btn-primary">Tiny</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Form Inputs Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Text Inputs */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">Text Fields</h3>
              <div className="space-y-4 mt-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">What is your name?</span>
                  </div>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Email address</span>
                    <span className="label-text-alt">Required</span>
                  </div>
                  <input type="email" placeholder="john@example.com" className="input input-bordered input-primary w-full" />
                  <div className="label">
                    <span className="label-text-alt text-error"></span>
                  </div>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Bio</span>
                  </div>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Tell us about yourself"></textarea>
                </label>
              </div>
            </div>
          </div>

          {/* Selection Controls */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">Selection Controls</h3>
              <div className="space-y-6 mt-4">
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
                    <span className="label-text">Remember me</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input type="radio" name="radio-1" className="radio radio-primary" defaultChecked />
                    <span className="label-text">Option 1</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-4">
                    <input type="radio" name="radio-1" className="radio radio-primary" />
                    <span className="label-text">Option 2</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-between">
                    <span className="label-text">Enable Notifications</span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                </div>

                <select className="select select-bordered w-full max-w-xs" defaultValue="Pick your favorite anime">
                  <option disabled>Pick your favorite anime</option>
                  <option>One Piece</option>
                  <option>Naruto</option>
                  <option>Death Note</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Display Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Display</h2>
        
        {/* Stats */}
        <div className="stats shadow w-full bg-base-100 border border-base-200">
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
            <div className="stat-desc">14% more than last month</div>
          </div>
          
          <div className="stat">
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks Done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>

        {/* Table */}
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br/>
                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                  </td>
                  <td>Purple</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src="https://img.daisyui.com/images/profile/demo/3@94.webp" alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Brice Swyre</div>
                        <div className="text-sm opacity-50">China</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Carroll Group
                    <br/>
                    <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                  </td>
                  <td>Red</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Feedback</h2>
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body space-y-4">
            <div role="alert" className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>New software update available.</span>
            </div>
            <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Your purchase has been confirmed!</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="loading loading-spinner loading-lg"></span>
              <span className="loading loading-dots loading-lg"></span>
              <span className="loading loading-ring loading-lg"></span>
            </div>
            <progress className="progress progress-primary w-full" value="70" max="100"></progress>
          </div>
        </div>
      </section>
    </div>
  );
};
