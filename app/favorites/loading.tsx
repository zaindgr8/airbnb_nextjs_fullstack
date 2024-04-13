import React from 'react'
import SkeletonCards from '../components/SkeletonCards'

const Loading = () => {
  return (
    <section className="container mx-auto p-10">
      <h2>Your Favorites</h2>
      <div className="grid grid-cols-3 mt-10">
        <SkeletonCards />
      </div>
    </section>
  );
}

export default Loading