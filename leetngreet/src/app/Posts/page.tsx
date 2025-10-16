"use client"; // This tells Next.js this component runs in the browser



/**
 * Landing page - a simple welcome page with a call to action to log in or sign up
 */
export default function HomePage() {
  // useSession() gives access to the user's session info

 
  return (
    <div className="bg-red-500">Feed Page home
      <h1>Welcome to LeetNGreet</h1>
      <p>Your Coding Journey Isn't Something You Have To Make Alone.</p>
    </div>
  );
}