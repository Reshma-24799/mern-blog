import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const res = await fetch('/api/post/getposts');
          const data = await res.json();
          if(res.ok){
              setPosts(data.posts);
          } 
      } catch (error) {
          console.log(error.message);
      }
  }
  fetchPosts();
  },[])
  return (
    <div>
      <div className="flex flex-col gap-6  p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
          <p className="text-grap-500 text-sm sm:text-md">Welcome to our cozy corner of creativity! Here, we're delighted to unravel
           the threads of imagination and share our passion for the art of crochet with you. Whether you're a seasoned hook wielder or
            just beginning your journey into the world of yarn, our blog is your haven for inspiration, tutorials,
             and endless patterns to ignite your crafting adventures
          </p>
          <Link to='/search' className='text-sm sm:text-md text-teal-500 font-bold hover:underline'>
            View all posts
          </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
          <CallToAction />
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='flex flex-wrap gap-4'>
                  {posts.map((post) => (
                    <PostCard 
                      key={post._id}
                      post={post}
                    />
                  ))}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
 